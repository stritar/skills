// Checks the static export in site/out/ before it is deployed. Zero
// dependencies; run after `npm run build` (CI does).
//
// Errors: a page, raw file or llms.txt target is missing; a raw SKILL.md
// differs from its source; a browser-active file sits in the raw mirror; the
// search index is not JSON; an internal link or asset does not resolve; a
// fragment the site generated (a heading anchor, the table of contents) points
// at no id.
// Warnings: a fragment a skill author wrote that matches no heading. Those live
// in vendored files that are kept byte-identical, so they are reported, not
// failed.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const siteDir = dirname(dirname(fileURLToPath(import.meta.url)));
const repoRoot = dirname(siteDir);
const outDir = join(siteDir, 'out');
const errors = [];
const warnings = [];

if (!existsSync(join(outDir, 'index.html'))) {
  console.error('No export found in site/out. Run `npm run build` first.');
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(join(siteDir, '.content', 'manifest.json'), 'utf8'));
const indexHtml = readFileSync(join(outDir, 'index.html'), 'utf8');
const basePath = (/(?:src|href)="([^"]*?)\/_next\//.exec(indexHtml)?.[1] ?? '').replace(/\/+$/, '');

const outFile = (sitePath) => join(outDir, ...decodeURIComponent(sitePath).split('/').filter(Boolean));
const pageFile = (url) => join(outFile(url), 'index.html');
const htmlCache = new Map();
const readHtml = (file) => {
  if (!htmlCache.has(file)) htmlCache.set(file, readFileSync(file, 'utf8'));
  return htmlCache.get(file);
};

// ---- every page the manifest promises ----

const pages = [
  ...manifest.skills.map((s) => ({ url: s.url, title: s.name })),
  ...manifest.skills.flatMap((s) => s.files.filter((f) => f.url).map((f) => ({ url: f.url, title: f.path }))),
];
for (const { url, title } of pages) {
  const file = pageFile(url);
  if (!existsSync(file)) {
    errors.push(`missing page ${url}`);
    continue;
  }
  const html = readHtml(file);
  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) errors.push(`${url} has ${h1s.length} h1 elements`);
  if (!html.includes(escapeHtml(title))) errors.push(`${url} does not show its title "${title}"`);
}

// ---- the raw mirror ----

for (const s of manifest.skills) {
  const mirrored = outFile(s.rawUrl);
  if (!existsSync(mirrored)) {
    errors.push(`missing raw file ${s.rawUrl}`);
  } else if (!readFileSync(mirrored).equals(readFileSync(join(repoRoot, s.path, 'SKILL.md')))) {
    errors.push(`${s.rawUrl} differs from ${s.path}/SKILL.md`);
  }
  for (const f of s.files) {
    if (f.rawUrl && !existsSync(outFile(f.rawUrl))) errors.push(`missing raw file ${f.rawUrl}`);
  }
}
for (const file of walk(join(outDir, 'raw'))) {
  if (/\.(?:html?|xhtml?|xht|svg|xml)$/i.test(file)) errors.push(`browser-active file in the raw mirror: ${file.slice(outDir.length)}`);
}

// ---- llms.txt and search ----

const llmsFile = join(outDir, 'llms.txt');
if (!existsSync(llmsFile)) {
  errors.push('missing llms.txt');
} else {
  const llms = readFileSync(llmsFile, 'utf8');
  const urls = [...llms.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => m[1]);
  if (urls.length !== manifest.skills.length) errors.push(`llms.txt links ${urls.length} files for ${manifest.skills.length} skills`);
  for (const u of urls) {
    const { pathname } = new URL(u);
    if (basePath && !pathname.startsWith(`${basePath}/`)) {
      errors.push(`llms.txt link ${u} is outside the base path ${basePath}`);
      continue;
    }
    if (!existsSync(outFile(pathname.slice(basePath.length)))) errors.push(`llms.txt link ${u} has no file`);
  }
}

const searchFile = join(outDir, 'api', 'search.json');
try {
  const bytes = readFileSync(searchFile);
  const data = JSON.parse(bytes.toString('utf8'));
  if (!data || typeof data !== 'object') errors.push('api/search.json is not a JSON object');
  const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;
  console.log(`search index: ${mb(bytes.length)}, ${mb(gzipSync(bytes).length)} gzipped`);
} catch (e) {
  errors.push(`api/search.json is not readable JSON: ${e.message}`);
}

// ---- internal links, assets and fragments in every exported page ----

// Fragments that skill authors wrote, which may legitimately miss a heading.
const authored = new Set();
for (const text of [...manifest.skills.map((s) => s.body), ...manifest.documents.map((d) => d.body)]) {
  for (const m of text.matchAll(/\]\(([^)\s]*#[^)\s]+)\)/g)) authored.add(m[1].slice(m[1].indexOf('#') + 1));
}

const idsOf = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => decodeEntities(m[1])));
let linkCount = 0;
for (const file of walk(outDir)) {
  if (!file.endsWith('.html') || file.startsWith(join(outDir, 'raw'))) continue;
  const html = readHtml(file);
  const where = file.slice(outDir.length);
  for (const m of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
    const value = decodeEntities(m[2]);
    if (/^\s*javascript:/i.test(value)) errors.push(`${where}: javascript: URL`);
    if (!value.startsWith('/') || value.startsWith('//')) {
      if (value.startsWith('#') && value.length > 1) checkFragment(where, html, value.slice(1));
      continue;
    }
    linkCount++;
    if (basePath && !value.startsWith(`${basePath}/`)) {
      errors.push(`${where}: ${value} ignores the base path ${basePath}`);
      continue;
    }
    const [pathPart, fragment] = value.slice(basePath.length).split('#');
    const cleanPath = pathPart.split('?')[0];
    const target = outFile(cleanPath);
    let targetHtml = null;
    if (cleanPath.endsWith('/') || cleanPath === '') {
      if (existsSync(join(target, 'index.html'))) targetHtml = join(target, 'index.html');
      else errors.push(`${where}: link to missing page ${value}`);
    } else if (existsSync(target)) {
      if (target.endsWith('.html')) targetHtml = target;
    } else if (existsSync(join(target, 'index.html'))) {
      targetHtml = join(target, 'index.html');
    } else {
      errors.push(`${where}: ${m[1]} to missing file ${value}`);
    }
    if (fragment && targetHtml) checkFragment(where, readHtml(targetHtml), fragment, value);
  }
}

function checkFragment(where, targetHtml, fragment, shown = `#${fragment}`) {
  const id = decodeURIComponent(fragment);
  if (idsOf(targetHtml).has(id)) return;
  (authored.has(fragment) ? warnings : errors).push(`${where}: ${shown} matches no id`);
}

for (const w of [...new Set(warnings)]) console.log(`warning: ${w}`);
for (const e of [...new Set(errors)]) console.error(`error: ${e}`);
console.log(
  `check-export: ${pages.length} pages, ${linkCount} internal links, base path "${basePath}": ` +
    `${new Set(errors).size} error(s), ${new Set(warnings).size} warning(s)`,
);
process.exit(errors.length ? 1 : 0);

function* walk(dir) {
  if (!existsSync(dir)) return;
  for (const d of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, d.name);
    if (d.isDirectory()) yield* walk(p);
    else yield p;
  }
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function decodeEntities(s) {
  return s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}
