#!/usr/bin/env node
// Uses the bundled axe.min.js to run axe-core on the page at the given URL and outputs the result as JSON.
//
// This skill's basic approach is browser operation via Playwright MCP, but axe.min.js
// (roughly 570KB) can be too large to pass to browser_evaluate in one go. Use this as a
// reliable alternative in that case (SKILL.md Step 4 / references/playwright-workflow.md
// "Running axe-core").
//
// The target tags and output format are kept aligned with the playwright-workflow.md snippet.
// No CDN is used; the bundled assets/axe.min.js is always loaded (supply-chain precaution).
//
// Usage:
//   node run-axe.mjs <url> [options]
//
// Options:
//   --width <px>       Viewport width (default: 1280)
//   --height <px>      Viewport height (default: 900)
//   --wait <state>     goto wait condition load|domcontentloaded|networkidle (default: networkidle)
//   --nodes <n>        Max number of nodes to output per rule (default: 10)
//   --out <file>       File to write the result to (default: stdout)
//   --help             Show this help
//
// To target a screen in a changed state (e.g. a modal opened), create that state on the
// Playwright MCP side first, then inject axe. This script is suited to the initial display,
// or a state reproducible from the URL alone.

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { launchChromium } from "./browser.mjs";

const AXE_PATH = fileURLToPath(new URL("../assets/axe.min.js", import.meta.url));

const USAGE = `Usage:
  node run-axe.mjs <url> [options]

Options:
  --width <px>    Viewport width (default: 1280)
  --height <px>   Viewport height (default: 900)
  --wait <state>  load|domcontentloaded|networkidle (default: networkidle)
  --nodes <n>     Max number of nodes per rule (default: 10)
  --out <file>    File to write the result to (default: stdout)
  --help          Show this help

Target tags: wcag2a wcag2aa wcag21a wcag21aa wcag22aa best-practice
`;

/** axe run within the page. Same output shape as the playwright-workflow.md snippet. */
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
  if (!existsSync(AXE_PATH)) {
    process.stderr.write(
      `assets/axe.min.js not found: ${AXE_PATH}\n` +
        "The build (pnpm build) may not have been run, or the skill may not be laid out correctly.\n"
    );
    return 1;
  }

  const axeSource = await readFile(AXE_PATH, "utf8");
  const browser = await launchChromium();
  try {
    const page = await browser.newPage({ viewport: { width: opts.width, height: opts.height } });
    await page.goto(opts.url, { waitUntil: opts.wait });
    await page.evaluate(axeSource); // Define axe on the page
    const result = await page.evaluate(axeRunner(opts.nodes), opts.nodes);
    result.viewport = { width: opts.width, height: opts.height };

    const json = JSON.stringify(result, null, 2);
    if (opts.out) {
      await writeFile(opts.out, json + "\n", "utf8");
      process.stderr.write(
        `Wrote to ${opts.out} (violations: ${result.violations.length}, incomplete: ${result.incomplete.length})\n`
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
