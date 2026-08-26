import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

test('npm run validate passes on the committed repository', () => {
  // Throws (non-zero exit) if validation fails.
  const out = execFileSync(process.execPath, [join(ROOT, 'scripts', 'validate.mjs')], { encoding: 'utf8' });
  assert.match(out, /0 error\(s\)/);
});

test('catalog:check passes on the committed repository', () => {
  const out = execFileSync(process.execPath, [join(ROOT, 'scripts', 'catalog-check.mjs')], { encoding: 'utf8' });
  assert.match(out, /in sync/);
});

test('search returns valid JSON and respects filters', () => {
  const out = execFileSync(process.execPath, [join(ROOT, 'scripts', 'search.mjs'), 'accessibility', '--json'], { encoding: 'utf8' });
  const results = JSON.parse(out);
  assert.ok(Array.isArray(results));
  for (const r of results) {
    assert.ok(typeof r.id === 'string');
    assert.ok(typeof r.score === 'number');
    assert.ok(r.path.endsWith('/SKILL.md'));
  }
});
