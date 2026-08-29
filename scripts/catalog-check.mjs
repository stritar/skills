#!/usr/bin/env node
// Verifies that every generated artifact matches catalog/index.json exactly.
// Exits non-zero on drift so it can gate commits and CI.

import { checkGenerated } from './lib/check-generated.mjs';

const drift = checkGenerated();
if (drift.length === 0) {
  console.log('generated files are in sync with catalog/index.json');
} else {
  // A stale build drifts one page per skill; showing all of them would bury
  // the instruction that fixes every one.
  const shown = drift.slice(0, 5);
  for (const d of shown) console.error(`DRIFT: ${d}`);
  if (drift.length > shown.length) {
    console.error(`DRIFT: ...and ${drift.length - shown.length} more`);
  }
  console.error('\nRun `npm run catalog:build` and commit the result.');
  process.exit(1);
}
