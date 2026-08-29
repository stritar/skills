#!/usr/bin/env node
// キーボードで Tab / Shift+Tab を繰り返し、各ステップのフォーカス位置とフォーカスインジケーターを
// 実際の :focus-visible 適用状態で記録して JSON 出力する (KBD-07 フォーカス順序 /
// KBD-08 フォーカスの可視性 / KBD-09 フォーカスの隠蔽の材料)。
//
// Playwright MCP でも browser_press_key + browser_evaluate で同じことはできるが、要素数が多いと
// 1 ステップごとに往復が発生する。多数の要素をまとめて巡回したいときにこのスクリプトが有効。
// URL だけで再現できる状態向け。モーダルを開いた状態などは MCP 側で確認する。
//
// 使い方:
//   node focus-walk.mjs <url> [オプション]
//
// オプション:
//   --max <n>       Tab を押す最大回数 (既定: 60)
//   --reverse       Shift+Tab で逆方向に巡回する (既定: 順方向)
//   --width <px>    ビューポート幅 (既定: 1280)
//   --height <px>   ビューポート高さ (既定: 900)
//   --wait <state>  load|domcontentloaded|networkidle (既定: networkidle)
//   --out <file>    結果の出力先ファイル (既定: 標準出力)
//   --help          このヘルプを表示
//
// 出力の各ステップ: tag, role, type, name, selector, tabIndex, rect, visible,
//                   outline, boxShadow, focusIndicator (見た目の指標があるか)
// focusIndicator は outline か box-shadow のどちらかがあるかの近似。最終的な視認性は
// スクリーンショットでも確認すること。KBD-08 は「見えるか」が本質。

import { writeFile } from "node:fs/promises";
import { launchChromium } from "./browser.mjs";

const USAGE = `使い方:
  node focus-walk.mjs <url> [オプション]

オプション:
  --max <n>       Tab を押す最大回数 (既定: 60)
  --reverse       Shift+Tab で逆方向に巡回する
  --width <px>    ビューポート幅 (既定: 1280)
  --height <px>   ビューポート高さ (既定: 900)
  --wait <state>  load|domcontentloaded|networkidle (既定: networkidle)
  --out <file>    結果の出力先ファイル (既定: 標準出力)
  --help          このヘルプを表示
`;

/** ページ内で現在のフォーカス要素の情報を返す。playwright-workflow.md のスニペット相当。 */
function inspectActive() {
  const el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement) {
    return { none: true, tag: el ? el.tagName.toLowerCase() : null };
  }
  const s = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  const hasOutline = s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0;
  const hasShadow = !!s.boxShadow && s.boxShadow !== "none";
  const cls = typeof el.className === "string" ? el.className.split(" ")[0] : "";
  return {
    tag: el.tagName.toLowerCase(),
    role: el.getAttribute("role"),
    type: el.getAttribute("type"),
    name: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 80),
    selector: el.id ? `#${el.id}` : cls ? `${el.tagName.toLowerCase()}.${cls}` : el.tagName.toLowerCase(),
    tabIndex: el.tabIndex,
    rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
    visible:
      r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && s.visibility !== "hidden" && s.opacity !== "0",
    outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor}`,
    boxShadow: (s.boxShadow || "none").slice(0, 60),
    focusIndicator: hasOutline || hasShadow,
  };
}

function parseArgs(argv) {
  const opts = { max: 60, reverse: false, width: 1280, height: 900, wait: "networkidle", out: null, url: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") return { help: true };
    else if (a === "--max") opts.max = parseInt(argv[++i], 10);
    else if (a === "--reverse") opts.reverse = true;
    else if (a === "--width") opts.width = parseInt(argv[++i], 10);
    else if (a === "--height") opts.height = parseInt(argv[++i], 10);
    else if (a === "--wait") opts.wait = argv[++i];
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

  const key = opts.reverse ? "Shift+Tab" : "Tab";
  const browser = await launchChromium();
  try {
    const page = await browser.newPage({ viewport: { width: opts.width, height: opts.height } });
    await page.goto(opts.url, { waitUntil: opts.wait });

    const steps = [];
    for (let i = 0; i < opts.max; i++) {
      await page.keyboard.press(key);
      const info = await page.evaluate(inspectActive);
      steps.push({ i, ...info });
    }

    const result = {
      url: opts.url,
      direction: opts.reverse ? "reverse (Shift+Tab)" : "forward (Tab)",
      viewport: { width: opts.width, height: opts.height },
      steps,
    };
    const json = JSON.stringify(result, null, 2);
    if (opts.out) {
      await writeFile(opts.out, json + "\n", "utf8");
      const noInd = steps.filter((s) => !s.none && !s.focusIndicator).length;
      process.stderr.write(`${opts.out} に書き出しました (${steps.length} ステップ, インジケーター無し ${noInd} 件)\n`);
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
