// Markdown link extraction and checking.
// Relative links are always checked against the filesystem. Absolute URLs are
// checked only with --online, and failures are warnings — the web being flaky
// must never fail an offline validation run.

import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

export function extractLinks(markdown) {
  const links = [];
  const lines = markdown.split('\n');
  let inFence = false;
  lines.forEach((line, i) => {
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; return; }
    if (inFence) return;
    for (const m of line.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      links.push({ target: m[1], line: i + 1 });
    }
    for (const m of line.matchAll(/<(https?:\/\/[^>\s]+)>/g)) {
      links.push({ target: m[1], line: i + 1 });
    }
  });
  return links;
}

export function isAbsoluteUrl(target) {
  return /^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('//');
}

export function checkRelativeLink(target, fromFile) {
  const clean = decodeURIComponent(target.split('#')[0].split('?')[0]);
  if (clean === '') return { ok: true }; // pure fragment link
  const resolved = join(dirname(fromFile), clean);
  return existsSync(resolved) ? { ok: true } : { ok: false, resolved };
}

export async function checkUrl(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
    if (res.status === 405 || res.status === 403) {
      res = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal });
    }
    return { ok: res.ok || res.status === 429, status: res.status };
  } catch (e) {
    return { ok: false, status: 0, error: e.message };
  } finally {
    clearTimeout(timer);
  }
}
