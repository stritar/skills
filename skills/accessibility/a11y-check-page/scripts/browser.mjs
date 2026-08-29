#!/usr/bin/env node
// Playwright と Chromium を「環境に依存せず」に見つけて起動するための共通ヘルパー。
//
// このスキルは Playwright MCP を前提にしているが、axe.min.js のように大きすぎて
// browser_evaluate に一度に渡せないものは、Bash から Playwright を直接動かす方が確実である
// (SKILL.md 手順4)。その際に run-axe.mjs / focus-walk.mjs から使う。
//
// このパッケージ自体は playwright に依存していない。実行時には以下の順で探す。
//   1. 環境変数 PLAYWRIGHT_MODULE で明示されたモジュール指定子/パス
//   2. import('playwright') / import('playwright-core') (どこかにインストールされていれば)
//   3. Playwright MCP (@playwright/mcp) が持ち込む playwright-core を、npx キャッシュや
//      グローバル node_modules から探す
// Chromium の実行ファイルも、Playwright 同梱のものが無ければ ms-playwright キャッシュから探し、
// それでも無ければ Chrome/Edge のチャネルを試す。

import { existsSync, readdirSync, statSync } from "node:fs";
import { homedir, platform } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);

/** 与えられた specifier / パスから chromium を取り出す。失敗したら null。 */
async function tryImportChromium(specifier) {
  try {
    let target = specifier;
    // ディレクトリやファイルパスなら file URL に変換して import する
    if (specifier.includes("/") || specifier.includes("\\")) {
      let entry = specifier;
      if (existsSync(entry) && statSync(entry).isDirectory()) {
        // package のディレクトリを指している場合は require.resolve で解決する
        try {
          entry = require.resolve(specifier);
        } catch {
          entry = join(specifier, "index.js");
        }
      }
      target = pathToFileURL(entry).href;
    }
    const mod = await import(target);
    // CommonJS の Playwright は名前付き export を持たず default にぶら下がる
    return mod.chromium ?? mod.default?.chromium ?? null;
  } catch {
    return null;
  }
}

/** npx キャッシュやグローバル node_modules から playwright(-core) のディレクトリを探す */
function findPlaywrightDirs() {
  const dirs = [];
  const roots = [];

  // npm/pnpm のグローバル root
  for (const env of ["npm_config_prefix", "PNPM_HOME"]) {
    if (process.env[env]) roots.push(join(process.env[env], "lib", "node_modules"), join(process.env[env], "node_modules"));
  }
  roots.push(join(homedir(), ".npm", "_npx")); // npx キャッシュ (ハッシュ名のサブディレクトリ)
  roots.push("/usr/local/lib/node_modules", "/usr/lib/node_modules", "/opt/homebrew/lib/node_modules");

  const names = ["playwright", "playwright-core"];
  for (const root of roots) {
    if (!existsSync(root)) continue;
    // 直下
    for (const n of names) {
      const p = join(root, n);
      if (existsSync(join(p, "package.json"))) dirs.push(p);
    }
    // npx キャッシュは <root>/<hash>/node_modules/<name>
    let sub = [];
    try {
      sub = readdirSync(root, { withFileTypes: true }).filter((e) => e.isDirectory());
    } catch {
      sub = [];
    }
    for (const e of sub) {
      for (const n of names) {
        const p = join(root, e.name, "node_modules", n);
        if (existsSync(join(p, "package.json"))) dirs.push(p);
      }
    }
  }
  return dirs;
}

/** chromium オブジェクトを取得する。見つからなければ例外。 */
export async function getChromium() {
  const attempts = [];
  if (process.env.PLAYWRIGHT_MODULE) attempts.push(process.env.PLAYWRIGHT_MODULE);
  attempts.push("playwright", "playwright-core");
  attempts.push(...findPlaywrightDirs());

  for (const a of attempts) {
    const chromium = await tryImportChromium(a);
    if (chromium) return chromium;
  }
  throw new Error(
    "Playwright が見つかりませんでした。以下のいずれかを行ってください。\n" +
      "  - 環境変数 PLAYWRIGHT_MODULE に playwright(-core) のパスを指定する\n" +
      "  - `npm i -g playwright` などでインストールする\n" +
      "  - あるいはこのスクリプトを使わず、Playwright MCP 側で axe を注入する\n" +
      "    (assets/axe.min.js の内容を browser_evaluate で評価する)"
  );
}

/** ms-playwright キャッシュから Chromium 系の実行ファイルを探す (ビルド番号の大きい順) */
function findCachedChromium() {
  const base =
    process.env.PLAYWRIGHT_BROWSERS_PATH ||
    (platform() === "win32"
      ? join(homedir(), "AppData", "Local", "ms-playwright")
      : platform() === "darwin"
        ? join(homedir(), "Library", "Caches", "ms-playwright")
        : join(homedir(), ".cache", "ms-playwright"));
  if (!existsSync(base)) return null;

  let entries = [];
  try {
    entries = readdirSync(base, { withFileTypes: true }).filter((e) => e.isDirectory());
  } catch {
    return null;
  }
  const buildNo = (name) => {
    const m = name.match(/-(\d+)$/);
    return m ? parseInt(m[1], 10) : 0;
  };
  // headless shell を優先し、次に通常の chromium。ビルド番号の大きい順。
  const prefer = (name) => (name.startsWith("chromium_headless_shell") ? 2 : name.startsWith("chromium") ? 1 : 0);
  const dirs = entries
    .filter((e) => e.name.startsWith("chromium"))
    .sort((a, b) => prefer(b.name) - prefer(a.name) || buildNo(b.name) - buildNo(a.name))
    .map((e) => join(base, e.name));

  const candidates =
    platform() === "win32"
      ? ["chrome-headless-shell-win/chrome-headless-shell.exe", "chrome-win/chrome.exe"]
      : platform() === "darwin"
        ? [
            "chrome-headless-shell-mac-arm64/chrome-headless-shell",
            "chrome-headless-shell-mac-x64/chrome-headless-shell",
            "chrome-mac/Chromium.app/Contents/MacOS/Chromium",
          ]
        : [
            "chrome-headless-shell-linux/chrome-headless-shell",
            "chrome-linux/chrome",
            "chrome-linux/headless_shell",
          ];

  for (const dir of dirs) {
    for (const rel of candidates) {
      const p = join(dir, ...rel.split("/"));
      if (existsSync(p)) return p;
    }
    // 予備: ディレクトリ内を1階層だけ走査して実行ファイル名で拾う
    try {
      for (const sub of readdirSync(dir, { withFileTypes: true })) {
        if (!sub.isDirectory()) continue;
        for (const bin of ["chrome-headless-shell", "headless_shell", "chrome"]) {
          const p = join(dir, sub.name, bin);
          if (existsSync(p)) return p;
        }
      }
    } catch {
      /* ignore */
    }
  }
  return null;
}

/**
 * Chromium を起動して { browser } を返す。
 * まず Playwright 同梱ブラウザ、次に ms-playwright キャッシュ、最後に Chrome/Edge チャネルを試す。
 * @param {object} [opts] chromium.launch に渡す追加オプション
 */
export async function launchChromium(opts = {}) {
  const chromium = await getChromium();
  const launchOpts = { headless: true, ...opts };

  // 1. 素直に起動 (Playwright 同梱ブラウザ)
  try {
    return await chromium.launch(launchOpts);
  } catch (e1) {
    // 2. ms-playwright キャッシュから実行ファイルを探して再試行
    const cached = findCachedChromium();
    if (cached) {
      try {
        return await chromium.launch({ ...launchOpts, executablePath: cached });
      } catch {
        /* 次へ */
      }
    }
    // 3. システムにインストールされた Chrome / Edge チャネル
    for (const channel of ["chrome", "chromium", "msedge"]) {
      try {
        return await chromium.launch({ ...launchOpts, channel });
      } catch {
        /* 次へ */
      }
    }
    throw new Error(
      "Chromium を起動できませんでした。ブラウザがインストールされていない可能性があります。\n" +
        "  - `npx playwright install chromium` を実行する\n" +
        "  - もしくは環境変数 PLAYWRIGHT_BROWSERS_PATH でキャッシュ場所を指定する\n" +
        `元のエラー: ${e1.message}`
    );
  }
}
