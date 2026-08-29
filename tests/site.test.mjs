import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, loadIndex } from '../scripts/lib/index-io.mjs';
import { buildAll, GENERATED_DIRS } from '../scripts/lib/generate.mjs';
import { orphans } from '../scripts/lib/check-generated.mjs';

const index = loadIndex();
const outputs = buildAll(index);
const active = index.skills.filter((s) => s.status !== 'deprecated');
const pages = Object.keys(outputs).filter((k) => k.startsWith('docs/skills/'));

test('every active skill gets a page, and every page has a skill', () => {
  const expected = active.map((s) => `docs/skills/${s.id}.html`).sort();
  assert.deepEqual(pages.sort(), expected);
});

test('the index page and its assets are generated', () => {
  assert.ok(outputs['docs/index.html'], 'no index page');
  assert.ok(outputs['docs/assets/ranking.js'], 'no ranking script');
});

test('hand-authored assets exist and are not generated', () => {
  for (const f of ['docs/assets/site.css', 'docs/assets/site.js', 'docs/.nojekyll']) {
    assert.ok(existsSync(join(ROOT, f)), `${f} is missing`);
    assert.ok(!(f in outputs), `${f} must not be generated`);
  }
});

test('no generated file still contains the <owner> placeholder', () => {
  for (const [rel, content] of Object.entries(outputs)) {
    assert.ok(!content.includes('<owner>'), `${rel} still says <owner>`);
  }
});

test('every card links to a page that exists', () => {
  const html = outputs['docs/index.html'];
  const hrefs = [...html.matchAll(/href="skills\/([^"]+)"/g)].map((m) => `docs/skills/${m[1]}`);
  assert.ok(hrefs.length >= active.length, 'index does not link every skill');
  for (const h of hrefs) assert.ok(outputs[h], `index links ${h}, which is not generated`);
});

test('every "works with" link resolves to a generated page', () => {
  for (const s of active) {
    const html = outputs[`docs/skills/${s.id}.html`];
    for (const id of s.relatedSkills) {
      assert.ok(outputs[`docs/skills/${id}.html`], `${s.id} relates to ${id}, which has no page`);
      assert.ok(html.includes(`href="${id}.html"`), `${s.id} does not link related skill ${id}`);
    }
  }
});

test('the embedded data blob parses and cannot end its script element', () => {
  const html = outputs['docs/index.html'];
  const m = html.match(/<script type="application\/json" id="skills-data">([\s\S]*?)<\/script>/);
  assert.ok(m, 'no data blob');
  const blob = m[1];
  assert.ok(!blob.includes('<'), 'the blob contains a raw "<", which can terminate the script element');
  const parsed = JSON.parse(blob);
  assert.equal(parsed.length, active.length);
  // Scoring reads these, so they must survive the trim.
  for (const key of ['id', 'name', 'description', 'category', 'tags', 'triggers', 'inputs', 'outputs']) {
    assert.ok(key in parsed[0], `the blob drops ${key}, which scoreEntry reads`);
  }
});

test('a skill whose body contains </script> is still safely embedded', () => {
  // Two vendored skills quote a closing script tag in example code.
  const risky = active.filter((s) => outputs[`docs/skills/${s.id}.html`].includes('&lt;/script&gt;'));
  assert.ok(risky.length > 0, 'expected at least one skill quoting a script tag');
  for (const s of risky) {
    const html = outputs[`docs/skills/${s.id}.html`];
    const scripts = html.match(/<script\b/g) || [];
    const closes = html.match(/<\/script>/g) || [];
    assert.equal(scripts.length, closes.length, `${s.id} has unbalanced script elements`);
  }
});

test('no generated page contains an executable scheme in an href', () => {
  for (const [rel, content] of Object.entries(outputs)) {
    if (!rel.endsWith('.html')) continue;
    assert.ok(!/href="\s*(?:javascript|data|vbscript):/i.test(content), `${rel} has an unsafe href`);
  }
});

test('pages declare a charset, a viewport and a single h1', () => {
  for (const [rel, content] of Object.entries(outputs)) {
    if (!rel.endsWith('.html')) continue;
    assert.match(content, /<meta charset="utf-8">/, `${rel} has no charset`);
    assert.match(content, /name="viewport"/, `${rel} has no viewport`);
    assert.equal((content.match(/<h1[ >]/g) || []).length, 1, `${rel} must have exactly one h1`);
    assert.match(content, /class="skip-link"/, `${rel} has no skip link`);
  }
});

test('generated pages carry the marker comment', () => {
  for (const [rel, content] of Object.entries(outputs)) {
    if (!rel.endsWith('.html')) continue;
    assert.match(content, /GENERATED FILE/, `${rel} has no generated-file marker`);
  }
});

test('building twice produces byte-identical output', () => {
  const again = buildAll(loadIndex());
  assert.deepEqual(Object.keys(again).sort(), Object.keys(outputs).sort());
  for (const [rel, content] of Object.entries(again)) {
    assert.equal(content, outputs[rel], `${rel} is not deterministic`);
  }
});

test('orphan detection notices a page with no skill behind it', () => {
  assert.deepEqual(orphans(outputs), [], 'the working tree already has an orphaned page');
  const pruned = { ...outputs };
  const victim = `docs/skills/${active[0].id}.html`;
  delete pruned[victim];
  assert.deepEqual(orphans(pruned), [victim], 'a removed skill must be reported as an orphan');
});

test('GENERATED_DIRS covers where the per-skill pages are written', () => {
  assert.ok(GENERATED_DIRS.includes('docs/skills'));
});
