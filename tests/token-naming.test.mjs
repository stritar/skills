import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCRIPT = join(__dirname, '..', 'skills', 'design-systems', 'token-naming', 'scripts', 'check-token-names.mjs');
const FIXTURES = join(__dirname, 'fixtures', 'token-naming');

function run(args) {
  return spawnSync(process.execPath, [SCRIPT, ...args], { encoding: 'utf8' });
}

function runJson(args) {
  const res = run([...args, '--json']);
  let parsed = null;
  try { parsed = JSON.parse(res.stdout); } catch { /* left null on parse failure */ }
  return { ...res, parsed };
}

function ruleCounts(findings) {
  const counts = {};
  for (const f of findings) counts[f.rule] = (counts[f.rule] ?? 0) + 1;
  return counts;
}

test('clean.json produces zero findings under full tiers and grammar', () => {
  const { status, parsed } = runJson([
    join(FIXTURES, 'clean.json'),
    '--tiers', 'primitive=primitive,semantic=semantic,component=component',
    '--grammar', '^(primitive|semantic|component)\\.[a-z][a-zA-Z]*(\\.[a-z0-9][a-zA-Z0-9-]*)+$',
  ]);
  assert.equal(status, 0);
  assert.deepEqual(parsed.findings, []);
});

test('mixed-scales.json flags two sibling groups that mix naming scales', () => {
  const { status, parsed } = runJson([join(FIXTURES, 'mixed-scales.json')]);
  assert.equal(status, 1);
  assert.deepEqual(ruleCounts(parsed.findings), { 'mixed-scale-siblings': 2 });
});

test('component-to-primitive.json flags a tier skip, a numbered semantic, and an unresolved alias', () => {
  const { status, parsed } = runJson([
    join(FIXTURES, 'component-to-primitive.json'),
    '--tiers', 'primitive=primitive,semantic=semantic,component=component',
  ]);
  assert.equal(status, 1);
  assert.deepEqual(ruleCounts(parsed.findings), {
    'component-references-primitive': 1,
    'numbered-semantic': 1,
    'unresolved-alias': 1,
  });
});

test('raw-composite.json flags the one raw (non-alias) part inside a composite token', () => {
  const { status, parsed } = runJson([join(FIXTURES, 'raw-composite.json')]);
  assert.equal(status, 1);
  assert.deepEqual(ruleCounts(parsed.findings), { 'raw-value-in-composite': 1 });
});

test('numbered-semantic.css flags a numbered semantic custom property and an unresolved var()', () => {
  const { status, parsed } = runJson([
    join(FIXTURES, 'numbered-semantic.css'),
    '--tiers', 'primitive=neutral,semantic=color',
  ]);
  assert.equal(status, 1);
  assert.deepEqual(ruleCounts(parsed.findings), {
    'numbered-semantic': 1,
    'unresolved-alias': 1,
  });
});

test('running with no arguments exits 2 (usage error)', () => {
  const res = run([]);
  assert.equal(res.status, 2);
});

test('opinion word "primary" flags both semantic tokens that use it', () => {
  const { status, parsed } = runJson([
    join(FIXTURES, 'clean.json'),
    '--tiers', 'primitive=primitive,semantic=semantic,component=component',
    '--opinion-words', 'primary',
  ]);
  assert.equal(status, 1);
  assert.deepEqual(ruleCounts(parsed.findings), { 'opinion-word-at-semantic-tier': 2 });
});
