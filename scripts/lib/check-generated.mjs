// Shared drift check between catalog/index.json and its generated artifacts.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { ROOT, loadIndex } from './index-io.mjs';
import { buildAll, GENERATED_DIRS } from './generate.mjs';

export function checkGenerated() {
  const drift = [];
  let outputs;
  try {
    outputs = buildAll(loadIndex());
  } catch (e) {
    return [`cannot build from catalog/index.json: ${e.message}`];
  }
  for (const [rel, expected] of Object.entries(outputs)) {
    const path = join(ROOT, rel);
    if (!existsSync(path)) {
      drift.push(`${rel} is missing`);
      continue;
    }
    const actual = readFileSync(path, 'utf8');
    if (actual !== expected) drift.push(`${rel} differs from what catalog/index.json generates`);
  }
  for (const rel of orphans(outputs)) {
    drift.push(`${rel} is left over from a skill that is no longer in the catalog`);
  }
  return drift;
}

// Files inside a fully-generated directory that this build did not produce.
// Without this, deleting or renaming a skill would leave its page published
// for ever while catalog:check still reported everything in sync.
export function orphans(outputs) {
  const expected = new Set(Object.keys(outputs));
  const found = [];
  for (const dir of GENERATED_DIRS) {
    const abs = join(ROOT, dir);
    if (!existsSync(abs)) continue;
    for (const name of readdirSync(abs)) {
      const path = join(abs, name);
      if (!statSync(path).isFile()) continue;
      const rel = relative(ROOT, path).split(sep).join('/');
      if (!expected.has(rel)) found.push(rel);
    }
  }
  return found.sort();
}
