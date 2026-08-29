#!/usr/bin/env node
// 同梱の axe.min.js を使って、指定 URL のページで axe-core を実行し、結果を JSON で出力する。
//
// このスキルの基本は Playwright MCP でのブラウザ操作だが、axe.min.js (約 570KB) は
// browser_evaluate に一度に渡すには大きすぎることがある。その場合の確実な代替として使う
// (SKILL.md 手順4 / references/playwright-workflow.md「axe-core の実行」)。
//
// 対象タグ・出力形式は playwright-workflow.md のスニペットと揃えてある。CDN は使わず、
// 常に同梱の assets/axe.min.js を読み込む (サプライチェーン対策)。
//
// 使い方:
//   node run-axe.mjs <url> [オプション]
//
// オプション:
//   --width <px>       ビューポート幅 (既定: 1280)
//   --height <px>      ビューポート高さ (既定: 900)
//   --wait <state>     goto の待機条件 load|domcontentloaded|networkidle (既定: networkidle)
//   --nodes <n>        1 ルールあたり出力するノード数の上限 (既定: 10)
//   --out <file>       結果をファイルに書き出す (既定: 標準出力)
//   --help             このヘルプを表示
//
// 状態を変えた画面 (モーダルを開いた等) を対象にしたい場合は、Playwright MCP 側でその状態を
// 作ってから axe を注入する。このスクリプトは初期表示や、URL だけで再現できる状態に向く。

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { launchChromium } from "./browser.mjs";

const AXE_PATH = fileURLToPath(new URL("../assets/axe.min.js", import.meta.url));

const USAGE = `使い方:
  node run-axe.mjs <url> [オプション]

オプション:
  --width <px>    ビューポート幅 (既定: 1280)
  --height <px>   ビューポート高さ (既定: 900)
  --wait <state>  load|domcontentloaded|networkidle (既定: networkidle)
  --nodes <n>     1 ルールあたりのノード数上限 (既定: 10)
  --out <file>    結果の出力先ファイル (既定: 標準出力)
  --help          このヘルプを表示

対象タグ: wcag2a wcag2aa wcag21a wcag21aa wcag22aa best-practice
`;

/** ページ内で実行する axe。playwright-workflow.md のスニペットと同一の出力形。 */
function axeRunner(maxNodes) {
  return async (limit) => {
    const r = await axe.run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"],
      },
      resultTypes: ["violations", "incomplete"],
    });
    const node = (n) => ({ target: n.target, html: n.html.slice(0, 300), failureSummary: n.failureSummary });
    return {
      version: axe.version,
      url: location.href,
      violations: r.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        tags: v.tags,
        total: v.nodes.length,
        nodes: v.nodes.slice(0, limit).map(node),
      })),
      incomplete: r.incomplete.map((v) => ({
        id: v.id,
        help: v.help,
        total: v.nodes.length,
        nodes: v.nodes.slice(0, limit).map((n) => ({ target: n.target, html: n.html.slice(0, 200) })),
      })),
    };
  };
}

function parseArgs(argv) {
  const opts = { width: 1280, height: 900, wait: "networkidle", nodes: 10, out: null, url: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") return { help: true };
    else if (a === "--width") opts.width = parseInt(argv[++i], 10);
    else if (a === "--height") opts.height = parseInt(argv[++i], 10);
    else if (a === "--wait") opts.wait = argv[++i];
    else if (a === "--nodes") opts.nodes = parseInt(argv[++i], 10);
    else if (a === "--out") opts.out = argv[++i];
    else if (a.startsWith("--")) throw new Error(`不明なオプション: ${a}`);
    else if (!opts.url) opts.url = a;
    else throw new Error(`余分な引数: ${a}`);
  }
  return opts;
}

async function main(argv) {
  let opts;
  try {
    opts = parseArgs(argv);
  } catch (e) {
    process.stderr.write(`${e.message}\n\n${USAGE}`);
    return 1;
  }
  if (opts.help || !opts.url) {
    process.stdout.write(USAGE);
    return opts.help ? 0 : 1;
  }
  if (!existsSync(AXE_PATH)) {
    process.stderr.write(
      `assets/axe.min.js が見つかりません: ${AXE_PATH}\n` +
        "ビルド (pnpm build) が済んでいないか、スキルが正しく配置されていない可能性があります。\n"
    );
    return 1;
  }

  const axeSource = await readFile(AXE_PATH, "utf8");
  const browser = await launchChromium();
  try {
    const page = await browser.newPage({ viewport: { width: opts.width, height: opts.height } });
    await page.goto(opts.url, { waitUntil: opts.wait });
    await page.evaluate(axeSource); // ページに axe を定義する
    const result = await page.evaluate(axeRunner(opts.nodes), opts.nodes);
    result.viewport = { width: opts.width, height: opts.height };

    const json = JSON.stringify(result, null, 2);
    if (opts.out) {
      await writeFile(opts.out, json + "\n", "utf8");
      process.stderr.write(
        `${opts.out} に書き出しました (violations: ${result.violations.length}, incomplete: ${result.incomplete.length})\n`
      );
    } else {
      process.stdout.write(json + "\n");
    }
    return 0;
  } finally {
    await browser.close();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main(process.argv.slice(2)).then(
    (code) => {
      process.exitCode = code;
    },
    (e) => {
      process.stderr.write(`${e.message}\n`);
      process.exitCode = 1;
    }
  );
}
