#!/usr/bin/env node
// Regenerates every derived artifact from catalog/index.json.

import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { ROOT, loadIndex } from './lib/index-io.mjs';
import { buildAll } from './lib/generate.mjs';
import { orphans } from './lib/check-generated.mjs';

const outputs = buildAll(loadIndex());
for (const [rel, content] of Object.entries(outputs)) {
  const path = join(ROOT, rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}
console.log(`wrote ${Object.keys(outputs).length} generated files`);

// A renamed or removed skill leaves its old page behind; drop it so the
// published site never links to a skill that is no longer in the catalog.
for (const rel of orphans(outputs)) {
  rmSync(join(ROOT, rel));
  console.log(`removed ${rel} (no longer in the catalog)`);
}
