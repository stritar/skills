// Builds the content of the documentation site (site/) from the skill files.
//
// The skills on disk are the source: every skills/<category>/<id>/SKILL.md is a
// page whether or not catalog/index.json lists it yet, so a new skill shows up
// on the next site build without another step. The catalog only adds the
// website metadata that SKILL.md frontmatter does not carry (tags, triggers,
// provenance, ...); a value missing from both is left out, never invented.
//
// buildDocsManifest is a pure function of the files it reads (sorted walks, no
// clock), so two builds of the same tree are identical. writeDocsContent is the
// only function that writes, and only under the site directory it is handed.

import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROOT, loadIndex, loadSchema, categoriesFromSchema, loadCategoryScopes } from './index-io.mjs';
import { CATEGORY_LABELS } from './generate.mjs';
import { parseFrontmatter } from './frontmatter.mjs';
import { scanText, isProbablyBinary } from './secrets.mjs';
import { firstSentence } from './site.mjs';
import { RESERVED_IDS, createLinkResolver, filePageUrl, isBrowserActive, rawUrl, skillUrl } from './docs-links.mjs';

const LIB_DIR = dirname(fileURLToPath(import.meta.url));

// Never published: dependency and cache folders a skill may have picked up
// locally, compiled Python, and anything whose name starts with a dot
// (.claude/, .gitignore, .env).
const SKIPPED_NAMES = new Set(['node_modules', '__pycache__']);
const SKIPPED_FILE = /\.pyc$/i;

// Binary even when the first bytes happen to contain no NUL byte.
const BINARY_EXT = /\.(?:ttf|otf|woff2?|eot|pdf|gz|tgz|zip|tar|png|jpe?g|gif|webp|ico|mp3|mp4|wav|webm)$/i;

// A text file up to this size gets a source-view page; a larger one is offered
// through the raw mirror only.
export const PREVIEW_LIMIT = 256 * 1024;

export const SITE_TITLE = 'Product-design skills';

export function defaultInputs() {
  return {
    root: ROOT,
    index: loadIndex(),
    categoryOrder: categoriesFromSchema(loadSchema()),
    categoryLabels: CATEGORY_LABELS,
    categoryScopes: loadCategoryScopes(),
    repo: repoFromPackageJson(JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))),
  };
}

// Source links need the real repository, so it is read from package.json.
// Without one the site shows no source links rather than guessed ones.
export function repoFromPackageJson(pkg) {
  const url = pkg && pkg.repository && (typeof pkg.repository === 'string' ? pkg.repository : pkg.repository.url);
  const m = String(url || '').match(/github\.com[/:]([^/]+)\/([^/.]+)/);
  if (!m) return null;
  const slug = `${m[1]}/${m[2]}`;
  return { slug, url: `https://github.com/${slug}`, blobBase: `https://github.com/${slug}/blob/main` };
}

export function buildDocsManifest(inputs = defaultInputs()) {
  const { root, index, categoryOrder = [], categoryLabels = {}, categoryScopes = {}, repo = null } = inputs;
  const warnings = [];
  const catalogByPath = new Map((index?.skills ?? []).map((s) => [s.path, s]));
  const discovered = new Set();
  const ids = new Map();
  const skills = [];

  for (const { category, id } of discoverSkillDirs(root)) {
    const path = `skills/${category}/${id}`;
    discovered.add(path);
    const lower = id.toLowerCase();
    if (ids.has(lower)) throw new Error(`duplicate skill id "${id}": ${ids.get(lower)} and ${path}`);
    ids.set(lower, path);
    if (RESERVED_IDS.includes(lower)) throw new Error(`${path}: the id "${id}" is reserved by a site route`);

    const entry = catalogByPath.get(path) ?? null;
    if (entry?.status === 'deprecated') continue;

    const raw = readFileSync(join(root, path, 'SKILL.md'), 'utf8');
    const { data, body, error } = parseFrontmatter(raw);
    if (error) throw new Error(`${path}/SKILL.md: frontmatter ${error}`);
    failOnSecrets(raw, `${path}/SKILL.md`, warnings);

    if (!entry) warnings.push(`[${id}] ${path} is not in catalog/index.json, so its page has no catalog metadata`);
    else if (entry.category !== category) warnings.push(`[${id}] catalog category "${entry.category}" differs from its folder "${category}"`);

    const name = text(data.name) ?? id;
    if (name !== id) warnings.push(`[${id}] frontmatter name "${name}" differs from its folder name`);
    const description = text(data.description) ?? text(entry?.description);
    if (!description) warnings.push(`[${id}] has no description in its frontmatter or the catalog`);

    const { files, excluded } = collectFiles(root, path, id, repo, warnings);
    skills.push({
      id,
      name,
      category,
      path,
      url: skillUrl(id),
      rawUrl: rawUrl(id, 'SKILL.md'),
      sourceUrl: repo ? `${repo.blobBase}/${encodePath(path)}/SKILL.md` : null,
      description,
      summary: description ? firstSentence(description) : null,
      meta: skillMeta(data, entry),
      bodyLine: lineCount(raw) - lineCount(body) + 1,
      body,
      files,
      excluded,
    });
  }

  for (const e of index?.skills ?? []) {
    if (e.status !== 'deprecated' && !discovered.has(e.path)) {
      warnings.push(`[${e.id}] catalog/index.json lists ${e.path}, which has no SKILL.md`);
    }
  }

  const published = new Set(skills.map((s) => s.id));
  for (const s of skills) {
    if (!s.meta.relatedSkills) continue;
    const related = s.meta.relatedSkills.filter((r) => published.has(r));
    if (related.length) s.meta.relatedSkills = related;
    else delete s.meta.relatedSkills;
  }

  const present = new Set(skills.map((s) => s.category));
  const unknown = [...present].filter((c) => !categoryOrder.includes(c)).sort(compare);
  for (const c of unknown) warnings.push(`category folder "${c}" is not in the catalog schema`);
  const order = [...categoryOrder.filter((c) => present.has(c)), ...unknown];
  skills.sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category) || compare(a.id, b.id));
  const categories = order.map((slug) => ({
    slug,
    label: categoryLabels[slug] ?? titleCase(slug),
    scope: categoryScopes[slug] ?? null,
    skills: skills.filter((s) => s.category === slug).map((s) => s.id),
  }));

  claimUrls(skills);

  const documents = [];
  for (const s of skills) {
    for (const f of s.files) {
      if (f.kind !== 'markdown') continue;
      const file = `${s.path}/${f.path}`;
      const raw = readFileSync(join(root, file), 'utf8');
      const body = documentBody(raw, file, warnings);
      documents.push({
        url: f.url,
        skillId: s.id,
        path: f.path,
        bodyLine: lineCount(raw) - lineCount(body) + 1,
        body,
      });
    }
  }

  const brokenLinks = [];
  const resolver = createLinkResolver(skills, { blobBase: repo?.blobBase ?? null });
  const check = (skill, docPath, body, bodyLine) => {
    for (const { target, line } of extractMarkdownLinks(body)) {
      const where = { file: `${skill.path}/${docPath}`, line: bodyLine + line - 1, target };
      const r = resolver.resolveLink(target, { skillId: skill.id, docPath });
      if (r.type === 'broken') brokenLinks.push(where);
      else if (r.type === 'unsafe') warnings.push(`${where.file}:${where.line}: link with an unsafe scheme is shown as text: ${target}`);
      else if (r.type === 'repo' && !existsSync(join(root, repoPathOf(r.href, repo)))) brokenLinks.push(where);
    }
  };
  const byId = new Map(skills.map((s) => [s.id, s]));
  for (const s of skills) check(s, 'SKILL.md', s.body, s.bodyLine);
  for (const d of documents) check(byId.get(d.skillId), d.path, d.body, d.bodyLine);

  return {
    version: 1,
    title: SITE_TITLE,
    repo,
    counts: {
      skills: skills.length,
      categories: categories.length,
      documents: documents.length,
      files: skills.reduce((n, s) => n + s.files.length, 0),
    },
    categories,
    skills,
    documents,
    warnings,
    brokenLinks,
  };
}

// llms.txt: a plain index an agent or a person can read to find each skill's
// raw instructions. It lists; it does not install anything.
export function renderLlmsTxt(manifest, { siteUrl }) {
  const base = String(siteUrl).replace(/\/+$/, '');
  const byId = new Map(manifest.skills.map((s) => [s.id, s]));
  const lines = [
    `# ${manifest.title}`,
    '',
    `> ${count(manifest.skills.length, 'agent skill', 'agent skills')} for product design work, in ${count(manifest.categories.length, 'category', 'categories')}. Each link below opens the raw SKILL.md file with that skill's full instructions.`,
    '',
    `Browse and search the same skills at ${base}/. A skill's supporting files are listed on its page and served under ${base}/raw/<skill-id>/.`,
  ];
  for (const c of manifest.categories) {
    lines.push('', `## ${c.label}`, '');
    for (const id of c.skills) {
      const s = byId.get(id);
      const note = s.summary ? `: ${s.summary.replace(/\s+/g, ' ')}` : '';
      lines.push(`- [${s.name.replace(/([[\]])/g, '\\$1')}](${base}${s.rawUrl})${note}`);
    }
  }
  return `${lines.join('\n')}\n`;
}

// Regenerates everything the site reads, all of it gitignored:
//   <siteDir>/.content/manifest.json      pages, metadata and Markdown bodies
//   <siteDir>/.content/files/<id>/...      text files shown as source views
//   <siteDir>/.content/ranking.mjs         byte copies of the shared modules,
//   <siteDir>/.content/docs-links.mjs      so the site has no second copy of either
//   <siteDir>/public/raw/<id>/...          the raw mirror
//   <siteDir>/public/llms.txt
export function writeDocsContent({ siteDir, siteUrl, inputs = defaultInputs() }) {
  const manifest = buildDocsManifest(inputs);
  const contentDir = join(siteDir, '.content');
  const rawDir = join(siteDir, 'public', 'raw');
  const llmsFile = join(siteDir, 'public', 'llms.txt');
  for (const p of [contentDir, rawDir, llmsFile]) rmSync(p, { recursive: true, force: true });

  const copy = (from, to) => {
    mkdirSync(dirname(to), { recursive: true });
    copyFileSync(from, to);
  };
  for (const s of manifest.skills) {
    copy(join(inputs.root, s.path, 'SKILL.md'), join(rawDir, s.id, 'SKILL.md'));
    for (const f of s.files) {
      const from = join(inputs.root, s.path, f.path);
      if (f.rawUrl) copy(from, join(rawDir, s.id, f.path));
      if (f.kind === 'text' && f.url) copy(from, join(contentDir, 'files', s.id, f.path));
    }
  }
  mkdirSync(contentDir, { recursive: true });
  writeFileSync(join(contentDir, 'manifest.json'), `${JSON.stringify(manifest)}\n`);
  for (const lib of ['ranking.mjs', 'docs-links.mjs']) copyFileSync(join(LIB_DIR, lib), join(contentDir, lib));
  writeFileSync(llmsFile, renderLlmsTxt(manifest, { siteUrl }));
  return manifest;
}

// Link destinations in Markdown prose, with the line each sits on. Fenced code
// follows CommonMark closely enough for the corpus: a fence closes only on a
// bare run of the same character at least as long, so a ```json line inside a
// ```` block does not end it. Inline code is blanked out first.
export function extractMarkdownLinks(markdown) {
  const links = [];
  let fence = null;
  markdown.split('\n').forEach((rawLine, i) => {
    const line = rawLine.replace(/\r$/, '');
    const f = /^(\s*)(`{3,}|~{3,})(.*)$/.exec(line);
    if (fence) {
      if (f && f[2][0] === fence.char && f[2].length >= fence.length && f[3].trim() === '' && f[1].length <= fence.indent + 3) {
        fence = null;
      }
      return;
    }
    if (f && !(f[2][0] === '`' && f[3].includes('`'))) {
      fence = { char: f[2][0], length: f[2].length, indent: f[1].length };
      return;
    }
    const prose = line.replace(/(`+)([\s\S]*?[^`])\1(?!`)/g, (m) => ' '.repeat(m.length));
    for (const m of prose.matchAll(/!?\[(?:[^\]\\]|\\.)*\]\(\s*(<[^>]*>|[^\s()]+(?:\([^\s()]*\)[^\s()]*)*)(?:\s+(?:"[^"]*"|'[^']*'|\([^)]*\)))?\s*\)/g)) {
      links.push({ target: unbracket(m[1]), line: i + 1 });
    }
    const def = /^ {0,3}\[(?:[^\]\\]|\\.)+\]:\s*(<[^>]*>|\S+)/.exec(prose);
    if (def) links.push({ target: unbracket(def[1]), line: i + 1 });
  });
  return links;
}

function discoverSkillDirs(root) {
  const base = join(root, 'skills');
  const found = [];
  for (const category of listDir(base)) {
    if (!category.isDirectory() || category.name.startsWith('.')) continue;
    for (const skill of listDir(join(base, category.name))) {
      if (!skill.isDirectory() || skill.name.startsWith('.')) continue;
      if (existsSync(join(base, category.name, skill.name, 'SKILL.md'))) {
        found.push({ category: category.name, id: skill.name });
      }
    }
  }
  return found;
}

function collectFiles(root, skillPath, id, repo, warnings) {
  const files = [];
  const excluded = [];
  const walk = (rel) => {
    for (const d of listDir(join(root, skillPath, rel))) {
      const childRel = rel ? `${rel}/${d.name}` : d.name;
      if (childRel === 'SKILL.md') continue;
      const skipped = d.name.startsWith('.') || SKIPPED_NAMES.has(d.name) || SKIPPED_FILE.test(d.name);
      if (skipped || d.isSymbolicLink() || !(d.isDirectory() || d.isFile())) {
        excluded.push(childRel);
        continue;
      }
      if (d.isDirectory()) {
        walk(childRel);
        continue;
      }
      const buf = readFileSync(join(root, skillPath, childRel));
      const binary = BINARY_EXT.test(d.name) || isProbablyBinary(buf);
      if (!binary) failOnSecrets(buf.toString('utf8'), `${skillPath}/${childRel}`, warnings);
      const kind = binary ? 'binary' : /\.md$/i.test(d.name) ? 'markdown' : 'text';
      const file = { path: childRel, kind, size: buf.length };
      if (kind === 'markdown' || (kind === 'text' && buf.length <= PREVIEW_LIMIT)) file.url = filePageUrl(id, childRel);
      if (!isBrowserActive(childRel)) file.rawUrl = rawUrl(id, childRel);
      if (repo) file.sourceUrl = `${repo.blobBase}/${encodePath(`${skillPath}/${childRel}`)}`;
      files.push(file);
    }
  };
  walk('');
  return { files, excluded };
}

// Two files whose pages differ only by case, or by characters a URL segment
// cannot keep ("icons.html" and "icons-html"), would overwrite each other in
// the static export, and on a case-insensitive disk so would two raw files.
function claimUrls(skills) {
  const owners = new Map();
  const claim = (url, owner) => {
    const key = url.toLowerCase();
    if (owners.has(key)) throw new Error(`${owners.get(key)} and ${owner} would both be published at ${url}`);
    owners.set(key, owner);
  };
  for (const s of skills) {
    claim(s.url, `${s.path}/SKILL.md`);
    claim(s.rawUrl, `${s.path}/SKILL.md`);
    for (const f of s.files) {
      if (f.url) claim(f.url, `${s.path}/${f.path}`);
      if (f.rawUrl) claim(f.rawUrl, `${s.path}/${f.path}`);
    }
  }
}

// A nested Markdown file may open with its own frontmatter. The page hides it;
// the raw file keeps it.
function documentBody(raw, file, warnings) {
  if (!/^---\r?\n/.test(raw)) return raw;
  const { body, error } = parseFrontmatter(raw);
  if (!error) return body;
  if (error.startsWith('unterminated')) return raw;
  warnings.push(`${file}: its frontmatter could not be parsed (${error}), so the page hides it and the raw file keeps it`);
  return body;
}

function skillMeta(data, entry) {
  const meta = {};
  if (entry) {
    meta.tags = list(entry.tags);
    meta.triggers = list(entry.triggers);
    meta.inputs = list(entry.inputs);
    meta.outputs = list(entry.outputs);
    meta.dependencies = list(entry.dependencies);
    meta.compatibility = list(entry.compatibility);
    meta.relatedSkills = list(entry.relatedSkills);
    meta.recommended = entry.recommended === true;
    meta.maturity = text(entry.maturity);
    meta.status = text(entry.status);
    if (entry.source) {
      meta.source = compact({
        type: text(entry.source.type),
        author: text(entry.source.author),
        license: text(entry.source.license),
        url: text(entry.source.url),
        repository: text(entry.source.repository),
        modified: entry.source.modified === true,
      });
    }
  } else if (text(data.license)) {
    meta.license = text(data.license);
  }
  return compact(meta);
}

function failOnSecrets(content, file, warnings) {
  for (const f of scanText(content, file)) {
    if (f.severity === 'error') {
      throw new Error(`${file}:${f.line}: looks like a credential (${f.pattern}); refusing to publish it`);
    }
    warnings.push(`${file}:${f.line}: possible credential (${f.pattern}); published because the match is only a warning`);
  }
}

function repoPathOf(href, repo) {
  return decodeURIComponent(href.slice(repo.blobBase.length + 1).split('#')[0]);
}

function listDir(dir) {
  return readdirSync(dir, { withFileTypes: true }).sort((a, b) => compare(a.name, b.name));
}

function compare(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function text(value) {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : null;
}

function list(value) {
  return Array.isArray(value) && value.length > 0 ? value.map(String) : null;
}

function compact(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null && v !== undefined));
}

function lineCount(s) {
  return s.split('\n').length;
}

function encodePath(path) {
  return path.split('/').map(encodeURIComponent).join('/');
}

function unbracket(target) {
  return target.replace(/^<([\s\S]*)>$/, '$1');
}

function titleCase(slug) {
  const words = slug.split('-');
  return [words[0].charAt(0).toUpperCase() + words[0].slice(1), ...words.slice(1)].join(' ');
}

function count(n, one, many) {
  return `${n} ${n === 1 ? one : many}`;
}
