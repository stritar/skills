#!/usr/bin/env node
// Common helper for finding and launching Playwright and Chromium in an "environment-independent" way.
//
// This skill assumes Playwright MCP, but for something too large to pass to browser_evaluate
// in one go, like axe.min.js, it is more reliable to run Playwright directly from Bash
// (SKILL.md Step 4). It is used from run-axe.mjs / focus-walk.mjs in that case.
//
// This package itself does not depend on playwright. At runtime it looks in the following order.
//   1. The module specifier/path given explicitly via the PLAYWRIGHT_MODULE environment variable
//   2. import('playwright') / import('playwright-core') (if installed anywhere)
//   3. The playwright-core brought in by Playwright MCP (@playwright/mcp), searched for in the
//      npx cache or the global node_modules
// For the Chromium executable too, if none is bundled with Playwright, it searches the
// ms-playwright cache, and failing that, tries the Chrome/Edge channels.

import { existsSync, readdirSync, statSync } from "node:fs";
import { homedir, platform } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);

/** Extract chromium from the given specifier / path. Returns null on failure. */
async function tryImportChromium(specifier) {
  try {
    let target = specifier;
    // If it's a directory or file path, convert it to a file URL before importing
    if (specifier.includes("/") || specifier.includes("\\")) {
      let entry = specifier;
      if (existsSync(entry) && statSync(entry).isDirectory()) {
        // If it points to a package directory, resolve it with require.resolve
        try {
          entry = require.resolve(specifier);
        } catch {
          entry = join(specifier, "index.js");
        }
      }
      target = pathToFileURL(entry).href;
    }
    const mod = await import(target);
    // CommonJS Playwright has no named exports and hangs off default instead
    return mod.chromium ?? mod.default?.chromium ?? null;
  } catch {
    return null;
  }
}

/** Search the npx cache and global node_modules for a playwright(-core) directory */
function findPlaywrightDirs() {
  const dirs = [];
  const roots = [];

  // npm/pnpm global root
  for (const env of ["npm_config_prefix", "PNPM_HOME"]) {
    if (process.env[env]) roots.push(join(process.env[env], "lib", "node_modules"), join(process.env[env], "node_modules"));
  }
  roots.push(join(homedir(), ".npm", "_npx")); // npx cache (subdirectories named by hash)
  roots.push("/usr/local/lib/node_modules", "/usr/lib/node_modules", "/opt/homebrew/lib/node_modules");

  const names = ["playwright", "playwright-core"];
  for (const root of roots) {
    if (!existsSync(root)) continue;
    // Directly under root
    for (const n of names) {
      const p = join(root, n);
      if (existsSync(join(p, "package.json"))) dirs.push(p);
    }
    // The npx cache is <root>/<hash>/node_modules/<name>
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

/** Obtain the chromium object. Throws if not found. */
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
    "Could not find Playwright. Do one of the following.\n" +
      "  - Set the PLAYWRIGHT_MODULE environment variable to the path of playwright(-core)\n" +
      "  - Install it with `npm i -g playwright` or similar\n" +
      "  - Or, instead of using this script, inject axe from the Playwright MCP side\n" +
      "    (evaluate the contents of assets/axe.min.js with browser_evaluate)"
  );
}

/** Search the ms-playwright cache for a Chromium-family executable (largest build number first) */
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
  // Prefer the headless shell, then regular chromium. Largest build number first.
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
    // Fallback: scan one level into the directory and pick up by executable name
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
 * Launch Chromium and return { browser }.
 * Tries the browser bundled with Playwright first, then the ms-playwright cache, and finally
 * the Chrome/Edge channels.
 * @param {object} [opts] Additional options passed to chromium.launch
 */
export async function launchChromium(opts = {}) {
  const chromium = await getChromium();
  const launchOpts = { headless: true, ...opts };

  // 1. Launch directly (browser bundled with Playwright)
  try {
    return await chromium.launch(launchOpts);
  } catch (e1) {
    // 2. Look for an executable in the ms-playwright cache and retry
    const cached = findCachedChromium();
    if (cached) {
      try {
        return await chromium.launch({ ...launchOpts, executablePath: cached });
      } catch {
        /* next */
      }
    }
    // 3. A Chrome / Edge channel installed on the system
    for (const channel of ["chrome", "chromium", "msedge"]) {
      try {
        return await chromium.launch({ ...launchOpts, channel });
      } catch {
        /* next */
      }
    }
    throw new Error(
      "Could not launch Chromium. A browser may not be installed.\n" +
        "  - Run `npx playwright install chromium`\n" +
        "  - Or set the cache location with the PLAYWRIGHT_BROWSERS_PATH environment variable\n" +
        `Original error: ${e1.message}`
    );
  }
}
