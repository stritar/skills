#!/usr/bin/env node
// Regenerates every derived artifact from catalog/index.json.

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { ROOT, loadIndex } from './lib/index-io.mjs';
import { buildAll } from './lib/generate.mjs';

const outputs = buildAll(loadIndex());
for (const [rel, content] of Object.entries(outputs)) {
  const path = join(ROOT, rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  console.log(`wrote ${rel}`);
}
