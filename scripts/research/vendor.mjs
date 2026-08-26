#!/usr/bin/env node
// Deterministic vendoring from inspection manifests.
//
// Reads research/manifests/*.json with verdict "vendor", fetches every file at
// its SHA-pinned raw URL, verifies the git blob SHA when the manifest provides
// one, writes the skill directory, and merges the manifest's proposedEntry
// into catalog/index.json with status "draft".
//
// Usage: node scripts/research/vendor.mjs [--only <id>] [--force]

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { ROOT, loadIndex, loadSchema, categoriesFromSchema } from '../lib/index-io.mjs';

const MANIFEST_DIR = join(ROOT, 'research', 'manifests');
const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
const force = args.includes('--force');

function gitBlobSha(buf) {
  return createHash('sha1').update(`blob ${buf.length}\0`).update(buf).digest('hex');
}

async function fetchRaw(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

const index = loadIndex();
const categories = categoriesFromSchema(loadSchema());
let vendored = 0;
let skipped = 0;
let failed = 0;

for (const file of readdirSync(MANIFEST_DIR).sort()) {
  if (!file.endsWith('.json')) continue;
  const manifest = JSON.parse(readFileSync(join(MANIFEST_DIR, file), 'utf8'));
  if (manifest.verdict !== 'vendor') continue;
  if (only && manifest.id !== only) continue;

  const dest = join(ROOT, 'skills', manifest.category, manifest.id);
  if (existsSync(join(dest, 'SKILL.md')) && !force) {
    skipped++;
    continue;
  }
  if (!categories.includes(manifest.category)) {
    console.error(`SKIP ${manifest.id}: unknown category "${manifest.category}"`);
    failed++;
    continue;
  }
  if (!/^[0-9a-f]{40}$/.test(manifest.upstream?.commit ?? '')) {
    console.error(`SKIP ${manifest.id}: upstream.commit is not a 40-hex SHA`);
    failed++;
    continue;
  }

  try {
    const writes = [];
    for (const f of manifest.files) {
      if (f.dest.includes('..') || f.dest.startsWith('/')) throw new Error(`unsafe dest path ${f.dest}`);
      const buf = await fetchRaw(f.rawUrl);
      if (f.blobSha && gitBlobSha(buf) !== f.blobSha) {
        throw new Error(`blob SHA mismatch for ${f.dest} (${f.rawUrl})`);
      }
      writes.push([join(dest, f.dest), buf]);
    }
    // All fetches verified before anything is written — no partial skills.
    for (const [path, buf] of writes) {
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, buf);
    }
    const entry = manifest.proposedEntry;
    const existing = index.skills.findIndex((s) => s.id === entry.id);
    if (existing >= 0) index.skills.splice(existing, 1);
    entry.status = 'draft';
    index.skills.push(entry);
    vendored++;
    console.log(`vendored ${manifest.id} (${manifest.files.length} files) -> skills/${manifest.category}/${manifest.id}`);
  } catch (e) {
    failed++;
    console.error(`FAILED ${manifest.id}: ${e.message}`);
  }
}

// Stable index ordering: category enum order, then id.
index.skills.sort((a, b) => {
  const ca = categories.indexOf(a.category);
  const cb = categories.indexOf(b.category);
  if (ca !== cb) return ca - cb;
  return a.id < b.id ? -1 : 1;
});
writeFileSync(join(ROOT, 'catalog', 'index.json'), JSON.stringify(index, null, 2) + '\n');
console.log(`\n${vendored} vendored, ${skipped} already present, ${failed} failed. Now run: npm run catalog:build && npm run validate`);
if (failed > 0) process.exit(1);
