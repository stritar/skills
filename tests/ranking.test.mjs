import test from 'node:test';
import assert from 'node:assert/strict';
import { scoreEntry, compareResults } from '../scripts/lib/ranking.mjs';

const entry = (over = {}) => ({
  id: 'accessible-form-review',
  name: 'accessible-form-review',
  description: 'Reviews forms for semantic, keyboard, screen-reader and validation issues.',
  category: 'accessibility',
  tags: ['a11y', 'forms', 'wcag'],
  triggers: ['review this form', 'audit form accessibility'],
  inputs: ['source code'],
  outputs: ['findings'],
  recommended: false,
  status: 'draft',
  ...over,
});

test('exact name match dominates', () => {
  const exact = scoreEntry('accessible-form-review', entry());
  const partial = scoreEntry('form review', entry());
  assert.ok(exact.score > partial.score);
  assert.ok(exact.matched.includes('name'));
});

test('tag and category matches score', () => {
  const r = scoreEntry('accessibility wcag', entry());
  assert.ok(r.score > 0);
  assert.ok(r.matched.includes('category'));
  assert.ok(r.matched.includes('tags'));
});

test('trigger phrase match scores high', () => {
  const r = scoreEntry('audit form accessibility', entry());
  assert.ok(r.matched.includes('triggers'));
  assert.ok(r.score >= 60);
});

test('unrelated query scores zero', () => {
  const r = scoreEntry('kubernetes deployment', entry());
  assert.equal(r.score, 0);
});

test('recommended and verified add bonuses only on a match', () => {
  const base = scoreEntry('forms', entry()).score;
  const boosted = scoreEntry('forms', entry({ recommended: true, status: 'verified' })).score;
  assert.equal(boosted, base + 5);
  assert.equal(scoreEntry('kubernetes', entry({ recommended: true, status: 'verified' })).score, 0);
});

test('deterministic: same input, same score', () => {
  for (let i = 0; i < 3; i++) {
    assert.equal(scoreEntry('accessible forms', entry()).score, scoreEntry('accessible forms', entry()).score);
  }
});

test('tie-break: recommended first, then id ascending', () => {
  const a = { score: 10, entry: entry({ id: 'bbb', recommended: false }) };
  const b = { score: 10, entry: entry({ id: 'aaa', recommended: false }) };
  const c = { score: 10, entry: entry({ id: 'zzz', recommended: true }) };
  const sorted = [a, b, c].sort(compareResults);
  assert.deepEqual(sorted.map((r) => r.entry.id), ['zzz', 'aaa', 'bbb']);
});
