import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFrontmatter } from '../scripts/lib/frontmatter.mjs';

test('parses plain scalars and body', () => {
  const { data, body, error } = parseFrontmatter('---\nname: wcag-audit\ndescription: Audits pages\n---\n# Title\n');
  assert.equal(error, null);
  assert.equal(data.name, 'wcag-audit');
  assert.equal(data.description, 'Audits pages');
  assert.equal(body.trim(), '# Title');
});

test('parses folded block scalar (>-) into one line', () => {
  const raw = '---\nname: x\ndescription: >-\n  First part\n  second part.\n  More here.\n---\nbody';
  const { data, error } = parseFrontmatter(raw);
  assert.equal(error, null);
  assert.equal(data.description, 'First part second part. More here.');
});

test('parses literal block scalar (|)', () => {
  const raw = '---\nname: x\nnotes: |\n  line one\n  line two\n---\n';
  const { data } = parseFrontmatter(raw);
  assert.equal(data.notes, 'line one\nline two\n');
});

test('handles description containing a colon', () => {
  const { data, error } = parseFrontmatter('---\ndescription: Use when: reviewing forms\n---\n');
  assert.equal(error, null);
  assert.equal(data.description, 'Use when: reviewing forms');
});

test('parses quoted strings', () => {
  const { data } = parseFrontmatter('---\ndescription: "Reviews: forms, tables"\nother: \'it\'\'s fine\'\n---\n');
  assert.equal(data.description, 'Reviews: forms, tables');
  assert.equal(data.other, "it's fine");
});

test('parses lists (block and flow)', () => {
  const raw = '---\ntags:\n  - a11y\n  - forms\nflow: [one, two]\n---\n';
  const { data } = parseFrontmatter(raw);
  assert.deepEqual(data.tags, ['a11y', 'forms']);
  assert.deepEqual(data.flow, ['one', 'two']);
});

test('parses one-level maps and booleans', () => {
  const raw = '---\nmetadata:\n  author: jane\n  version: "1.0"\ndisable-model-invocation: true\n---\n';
  const { data } = parseFrontmatter(raw);
  assert.deepEqual(data.metadata, { author: 'jane', version: '1.0' });
  assert.equal(data['disable-model-invocation'], true);
});

test('errors on missing fence', () => {
  const { error } = parseFrontmatter('# Just markdown\n');
  assert.match(error, /no frontmatter/);
});

test('errors on unterminated frontmatter', () => {
  const { error } = parseFrontmatter('---\nname: x\n');
  assert.match(error, /unterminated/);
});

test('errors on two-level nesting', () => {
  const { error } = parseFrontmatter('---\na:\n  b:\n    c: 1\n---\n');
  assert.match(error, /not supported|nesting/);
});
