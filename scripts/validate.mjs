#!/usr/bin/env node
// Full repository validation: catalog/index.json integrity, index↔filesystem
// agreement, SKILL.md frontmatter, provenance completeness, taxonomy
// conformance, secret scan, link checks, and generated-file sync.
//
// Usage: npm run validate [-- --online]
//   --online  also check absolute URLs (HEAD requests; failures are warnings)
//
// Exit code 1 on any error; warnings never fail the run.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, basename, relative } from 'node:path';
import { ROOT, loadIndex, loadSchema, loadTagVocabulary, categoriesFromSchema } from './lib/index-io.mjs';
import { validateAgainstSchema } from './lib/schema-validate.mjs';
import { parseFrontmatter } from './lib/frontmatter.mjs';
import { scanText, isProbablyBinary } from './lib/secrets.mjs';
import { extractLinks, isAbsoluteUrl, checkRelativeLink, checkUrl } from './lib/links.mjs';
import { checkGenerated } from './lib/check-generated.mjs';

const SPEC_FRONTMATTER_FIELDS = new Set(['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools']);
const ORIGINAL_ALLOWED_TOP_LEVEL = new Set(['SKILL.md', 'references', 'scripts', 'assets']);

const online = process.argv.includes('--online');
const errors = [];
const warnings = [];
const err = (ctx, msg) => errors.push(`[${ctx}] ${msg}`);
const warn = (ctx, msg) => warnings.push(`[${ctx}] ${msg}`);
// Per-entry error counts, used by the verified-status gate.
const entryErrorCount = new Map();
const entryErr = (id, ctx, msg) => {
  err(ctx, msg);
  entryErrorCount.set(id, (entryErrorCount.get(id) ?? 0) + 1);
};

// ---- 1. Index parses and conforms to the schema ----
let index = null;
let schema = null;
try {
  index = loadIndex();
} catch (e) {
  err('index', `catalog/index.json failed to parse: ${e.message}`);
}
try {
  schema = loadSchema();
} catch (e) {
  err('schema', `catalog/schema.json failed to parse: ${e.message}`);
}
if (index && schema) {
  for (const e of validateAgainstSchema(index, schema)) {
    err('schema', `${e.path}: ${e.message}`);
  }
}

let tagVocab = new Set();
try {
  tagVocab = loadTagVocabulary();
} catch (e) {
  err('taxonomy', e.message);
}

if (index && schema) {
  const categories = categoriesFromSchema(schema);
  const skills = index.skills;
  const ids = new Map();

  // ---- 2. Uniqueness ----
  for (const s of skills) {
    if (ids.has(s.id)) entryErr(s.id, 'unique', `duplicate id "${s.id}"`);
    ids.set(s.id, s);
  }
  const paths = new Set();
  for (const s of skills) {
    if (paths.has(s.path)) entryErr(s.id, 'unique', `duplicate path "${s.path}"`);
    paths.add(s.path);
  }

  for (const s of skills) {
    const ctx = s.id ?? s.path ?? '?';

    // ---- 3. Path/id/category agreement with the filesystem ----
    const dir = join(ROOT, s.path);
    const skillMd = join(dir, 'SKILL.md');
    if (!existsSync(skillMd)) {
      entryErr(s.id, ctx, `${s.path}/SKILL.md does not exist`);
      continue; // Everything below needs the file.
    }
    if (basename(s.path) !== s.id) entryErr(s.id, ctx, `id "${s.id}" != directory name "${basename(s.path)}"`);
    const parent = s.path.split('/')[1];
    if (parent !== s.category) entryErr(s.id, ctx, `category "${s.category}" != parent directory "${parent}"`);

    // ---- 5. Frontmatter ----
    const raw = readFileSync(skillMd, 'utf8');
    const { data: fm, error: fmError } = parseFrontmatter(raw);
    if (fmError) {
      entryErr(s.id, ctx, `frontmatter: ${fmError}`);
    } else {
      if (typeof fm.name !== 'string' || fm.name === '') entryErr(s.id, ctx, 'frontmatter is missing `name`');
      else {
        if (fm.name !== s.name) entryErr(s.id, ctx, `frontmatter name "${fm.name}" != index name "${s.name}"`);
        if (fm.name !== basename(s.path)) entryErr(s.id, ctx, `frontmatter name "${fm.name}" != directory name "${basename(s.path)}"`);
        if (fm.name.length > 64) entryErr(s.id, ctx, 'frontmatter name exceeds 64 characters');
        if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.name)) entryErr(s.id, ctx, `frontmatter name "${fm.name}" is not lowercase kebab-case`);
      }
      if (typeof fm.description !== 'string' || fm.description === '') entryErr(s.id, ctx, 'frontmatter is missing `description`');
      else if (fm.description.length > 1024) entryErr(s.id, ctx, `frontmatter description is ${fm.description.length} chars (max 1024)`);

      // ---- 6. Non-spec frontmatter fields policy ----
      const nonSpec = Object.keys(fm).filter((k) => !SPEC_FRONTMATTER_FIELDS.has(k));
      if (nonSpec.length > 0) {
        if (s.source.type === 'original') {
          entryErr(s.id, ctx, `original skill uses non-spec frontmatter fields: ${nonSpec.join(', ')}`);
        } else {
          warn(ctx, `third-party skill uses non-spec frontmatter fields (kept as upstream): ${nonSpec.join(', ')}`);
          if (s.compatibility.includes('claude-ai')) {
            entryErr(s.id, ctx, 'claims claude-ai compatibility but uses non-spec frontmatter fields (hard error on claude.ai upload)');
          }
        }
      }
    }

    // ---- 7. Size guidance ----
    const lineCount = raw.split('\n').length;
    if (lineCount > 500) warn(ctx, `SKILL.md is ${lineCount} lines (spec recommends <500)`);

    // ---- 8. Related skills resolve ----
    for (const rel of s.relatedSkills) {
      if (rel === s.id) entryErr(s.id, ctx, 'relatedSkills contains the skill itself');
      else if (!skills.some((o) => o.id === rel)) entryErr(s.id, ctx, `relatedSkills references unknown id "${rel}"`);
    }

    // ---- 9. Tags in taxonomy ----
    for (const t of s.tags) {
      if (!tagVocab.has(t)) entryErr(s.id, ctx, `tag "${t}" is not in catalog/taxonomy.md`);
    }

    // ---- 10. Provenance ----
    const src = s.source;
    if (src.type === 'third-party') {
      for (const field of ['repository', 'url', 'author', 'licenseFile', 'upstreamPath', 'upstreamCommit', 'retrievedAt']) {
        if (src[field] == null) entryErr(s.id, ctx, `third-party skill is missing source.${field}`);
      }
      if (src.licenseFile != null && !existsSync(join(dir, src.licenseFile))) {
        entryErr(s.id, ctx, `source.licenseFile "${src.licenseFile}" does not exist in ${s.path}/`);
      }
    } else {
      for (const field of ['repository', 'upstreamPath', 'upstreamCommit']) {
        if (src[field] != null) entryErr(s.id, ctx, `original skill must have null source.${field}`);
      }
      if (src.license !== 'MIT') entryErr(s.id, ctx, `original skill must carry the repository license (MIT), got "${src.license}"`);
    }
    if (src.modified !== (src.modifications.length > 0)) {
      entryErr(s.id, ctx, `source.modified (${src.modified}) disagrees with modifications list (${src.modifications.length} entries)`);
    }

    // ---- 13. Links resolve (relative always; absolute only with --online) ----
    for (const file of walkFiles(dir)) {
      if (!file.endsWith('.md')) continue;
      const md = readFileSync(file, 'utf8');
      for (const link of extractLinks(md)) {
        if (isAbsoluteUrl(link.target)) continue; // collected for --online below
        const res = checkRelativeLink(link.target, file);
        if (!res.ok) entryErr(s.id, ctx, `${relative(ROOT, file)}:${link.line} broken relative link "${link.target}"`);
      }
    }

    // ---- 14. Resource layout ----
    const topLevel = readdirSync(dir);
    if (src.type === 'original') {
      for (const item of topLevel) {
        if (!ORIGINAL_ALLOWED_TOP_LEVEL.has(item)) {
          entryErr(s.id, ctx, `original skill has unexpected top-level item "${item}" (allowed: SKILL.md, references/, scripts/, assets/)`);
        }
      }
    }
    for (const file of walkFiles(dir)) {
      const depth = relative(dir, file).split('/').length;
      if (depth > 3) warn(ctx, `deeply nested resource (${relative(ROOT, file)}) — spec recommends resources one level deep`);
    }
  }

  // ---- 4. Reverse check: filesystem → index ----
  const skillsRoot = join(ROOT, 'skills');
  if (existsSync(skillsRoot)) {
    for (const cat of readdirSync(skillsRoot)) {
      const catDir = join(skillsRoot, cat);
      if (!statSync(catDir).isDirectory()) {
        warn('fs', `unexpected file skills/${cat}`);
        continue;
      }
      if (!categories.includes(cat)) err('fs', `skills/${cat}/ is not a category from catalog/taxonomy.md`);
      for (const id of readdirSync(catDir)) {
        const skillDir = join(catDir, id);
        if (!statSync(skillDir).isDirectory()) {
          warn('fs', `unexpected file skills/${cat}/${id}`);
          continue;
        }
        if (!existsSync(join(skillDir, 'SKILL.md'))) err('fs', `skills/${cat}/${id}/ has no SKILL.md`);
        if (!skills.some((s) => s.path === `skills/${cat}/${id}`)) {
          err('fs', `skills/${cat}/${id} is on disk but not in catalog/index.json`);
        }
      }
    }
  }

  // ---- 11. Verified-status gate ----
  for (const s of skills) {
    if (s.status === 'verified' && (entryErrorCount.get(s.id) ?? 0) > 0) {
      err(s.id, 'status is "verified" but the entry has validation errors — downgrade to "draft" or fix them');
    }
  }
}

// ---- 12. Secret scan over skills/ and scripts/ ----
for (const base of ['skills', 'scripts']) {
  const dir = join(ROOT, base);
  if (!existsSync(dir)) continue;
  for (const file of walkFiles(dir)) {
    const buf = readFileSync(file);
    if (isProbablyBinary(buf)) continue;
    for (const f of scanText(buf.toString('utf8'), relative(ROOT, file))) {
      (f.severity === 'error' ? err : warn)('secrets', `${f.file}:${f.line} matches ${f.pattern}`);
    }
  }
}

// ---- 15. Generated files in sync ----
for (const d of checkGenerated()) err('generated', d);

// ---- 13b. Online link check (optional; warnings only) ----
if (online && index) {
  const urls = new Set();
  for (const s of index.skills) {
    if (s.source.url) urls.add(s.source.url);
    const dir = join(ROOT, s.path);
    if (!existsSync(dir)) continue;
    for (const file of walkFiles(dir)) {
      if (!file.endsWith('.md')) continue;
      for (const link of extractLinks(readFileSync(file, 'utf8'))) {
        if (isAbsoluteUrl(link.target) && /^https?:/i.test(link.target)) urls.add(link.target);
      }
    }
  }
  console.log(`checking ${urls.size} unique URLs (failures are warnings)...`);
  for (const url of urls) {
    const res = await checkUrl(url);
    if (!res.ok) warn('links-online', `${url} -> ${res.status || res.error}`);
  }
}

// ---- Report ----
for (const w of warnings) console.log(`warning ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);
console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)` +
  (index ? ` across ${index.skills.length} skill(s)` : ''));
if (errors.length > 0) process.exit(1);

function walkFiles(dir) {
  const out = [];
  for (const item of readdirSync(dir)) {
    const p = join(dir, item);
    if (statSync(p).isDirectory()) out.push(...walkFiles(p));
    else out.push(p);
  }
  return out;
}
