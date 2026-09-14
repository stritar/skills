#!/usr/bin/env node
// Repeats Tab / Shift+Tab on the keyboard, recording the focus position and focus indicator at
// each step under the actual :focus-visible applied state, and outputs it as JSON (material for
// KBD-07 focus order / KBD-08 focus visibility / KBD-09 focus concealment).
//
// The same thing can be done with Playwright MCP using browser_press_key + browser_evaluate,
// but when there are many elements this incurs a round trip per step. This script is useful
// when you want to walk through many elements at once. Suited to states reproducible from the
// URL alone; check states such as a modal being open on the MCP side.
//
// Usage:
//   node focus-walk.mjs <url> [options]
//
// Options:
//   --max <n>       Maximum number of times to press Tab (default: 60)
//   --reverse       Walk in reverse with Shift+Tab (default: forward)
//   --width <px>    Viewport width (default: 1280)
//   --height <px>   Viewport height (default: 900)
//   --wait <state>  load|domcontentloaded|networkidle (default: networkidle)
//   --out <file>    File to write the result to (default: stdout)
//   --help          Show this help
//
// Each output step: tag, role, type, name, selector, tabIndex, rect, visible,
//                   outline, boxShadow, focusIndicator (whether there is a visible indicator)
// focusIndicator is an approximation of whether there is either an outline or a box-shadow.
// Also confirm final visibility with a screenshot. What matters for KBD-08 is "is it visible".

import { writeFile } from "node:fs/promises";
import { launchChromium } from "./browser.mjs";

const USAGE = `Usage:
  node focus-walk.mjs <url> [options]

Options:
  --max <n>       Maximum number of times to press Tab (default: 60)
  --reverse       Walk in reverse with Shift+Tab
  --width <px>    Viewport width (default: 1280)
  --height <px>   Viewport height (default: 900)
  --wait <state>  load|domcontentloaded|networkidle (default: networkidle)
  --out <file>    File to write the result to (default: stdout)
  --help          Show this help
`;

/** Returns info about the currently focused element in the page. Equivalent to the playwright-workflow.md snippet. */
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
    else if (a.startsWith("--")) throw new Error(`Unknown option: ${a}`);
    else if (!opts.url) opts.url = a;
    else throw new Error(`Extra argument: ${a}`);
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
      process.stderr.write(`Wrote to ${opts.out} (${steps.length} steps, ${noInd} with no indicator)\n`);
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
