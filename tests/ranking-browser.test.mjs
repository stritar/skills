import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import { ROOT, loadIndex } from '../scripts/lib/index-io.mjs';
import { toClassicScript } from '../scripts/lib/browser-bundle.mjs';
import { scoreEntry, compareResults, WEIGHTS } from '../scripts/lib/ranking.mjs';

const RANKING_SRC = join(ROOT, 'scripts', 'lib', 'ranking.mjs');
const EXPORTS = ['tokenize', 'scoreEntry', 'compareResults', 'WEIGHTS'];

function browserRanking() {
  const code = toClassicScript(readFileSync(RANKING_SRC, 'utf8'), {
    namespace: 'Ranking',
    exports: EXPORTS,
    source: 'scripts/lib/ranking.mjs',
  });
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox);
  return sandbox.window.Ranking;
}

// Objects built inside the vm come from another realm, so their prototypes are
// never reference-equal to ours. Compare values, not realms.
const plain = (x) => JSON.parse(JSON.stringify(x));

test('the converted script exposes exactly the ranking API', () => {
  const r = browserRanking();
  assert.deepEqual(Object.keys(r).sort(), [...EXPORTS].sort());
  assert.deepEqual(plain(r.WEIGHTS), WEIGHTS);
});

test('the converted script leaks nothing but its namespace', () => {
  const code = toClassicScript(readFileSync(RANKING_SRC, 'utf8'), {
    namespace: 'Ranking', exports: EXPORTS, source: 'x',
  });
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox);
  assert.deepEqual(Object.keys(sandbox).filter((k) => k !== 'window'), []);
});

test('the browser copy scores identically to the module across the corpus', () => {
  const r = browserRanking();
  const entries = loadIndex().skills;
  assert.ok(entries.length > 0);

  const queries = new Set(['', '   ', '!!!', 'a', 'ACCESSIBLE FORMS', 'dark mode contrast', '日本語']);
  for (const e of entries) {
    queries.add(e.id);
    queries.add(e.category);
    for (const t of e.tags) queries.add(t);
    if (e.triggers[0]) queries.add(e.triggers[0]);
  }

  let compared = 0;
  for (const q of queries) {
    for (const e of entries) {
      assert.deepEqual(plain(r.scoreEntry(q, e)), scoreEntry(q, e), `scoreEntry(${JSON.stringify(q)}, ${e.id})`);
      compared++;
    }
  }
  assert.ok(compared > 10000, `expected a broad sweep, only compared ${compared}`);
});

test('the browser copy sorts result sets identically', () => {
  const r = browserRanking();
  const entries = loadIndex().skills;
  for (const q of ['accessibility', 'design system tokens', 'animate']) {
    const build = (score) => entries
      .map((entry) => ({ entry, score: score(q, entry).score }))
      .filter((x) => x.score > 0);
    const mine = build(scoreEntry).sort(compareResults).map((x) => x.entry.id);
    const theirs = build(r.scoreEntry).sort(r.compareResults).map((x) => x.entry.id);
    assert.deepEqual(theirs, mine, `ordering differs for "${q}"`);
  }
});

test('the shipped ranking.js matches what the transform produces', () => {
  const expected = toClassicScript(readFileSync(RANKING_SRC, 'utf8'), {
    namespace: 'Ranking',
    exports: EXPORTS,
    source: 'scripts/lib/ranking.mjs',
  });
  const actual = readFileSync(join(ROOT, 'docs', 'assets', 'ranking.js'), 'utf8');
  assert.equal(actual, expected, 'run `npm run catalog:build`');
});

test('a module the transform cannot convert fails loudly', () => {
  assert.throws(
    () => toClassicScript('import x from "y";\nexport const a = 1;\n', { namespace: 'N', exports: ['a'], source: 's' }),
    /no plain-JS form/,
  );
  assert.throws(
    () => toClassicScript('export default function () {}\n', { namespace: 'N', exports: ['a'], source: 's' }),
    /no plain-JS form/,
  );
  assert.throws(
    () => toClassicScript('export const a = 1;\n', { namespace: 'N', exports: ['a', 'missing'], source: 's' }),
    /never declares it/,
  );
});
