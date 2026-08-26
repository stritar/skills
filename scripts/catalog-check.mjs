#!/usr/bin/env node
// Verifies that every generated artifact matches catalog/index.json exactly.
// Exits non-zero on drift so it can gate commits and CI.

import { checkGenerated } from './lib/check-generated.mjs';

const drift = checkGenerated();
if (drift.length === 0) {
  console.log('generated files are in sync with catalog/index.json');
} else {
  for (const d of drift) console.error(`DRIFT: ${d}`);
  console.error('\nRun `npm run catalog:build` and commit the result.');
  process.exit(1);
}
