// Shared drift check between catalog/index.json and its generated artifacts.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, loadIndex } from './index-io.mjs';
import { buildAll } from './generate.mjs';

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
  return drift;
}
