import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { ROOT, loadIndex } from '../scripts/lib/index-io.mjs';
import { buildDocsManifest, extractMarkdownLinks, renderLlmsTxt, writeDocsContent } from '../scripts/lib/docs-content.mjs';
import { RESERVED_IDS, createLinkResolver } from '../scripts/lib/docs-links.mjs';

const manifest = buildDocsManifest();
const BLOB = 'https://github.com/owner/repo/blob/main';

// A throwaway repository holding only the files a test names.
function fixture(t, files, { index = { skills: [] } } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'docs-content-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const [rel, content] of Object.entries(files)) {
    mkdirSync(dirname(join(root, rel)), { recursive: true });
    writeFileSync(join(root, rel), content);
  }
  return {
    root,
    index,
    categoryOrder: ['research', 'testing'],
    categoryLabels: { research: 'User research', testing: 'Testing and evaluation' },
    categoryScopes: { research: 'Interviews and synthesis' },
    repo: { slug: 'owner/repo', url: 'https://github.com/owner/repo', blobBase: BLOB },
  };
}

function skillMd(name, { description = `The ${name} skill. It does one thing.`, body = '# Title\n\nText.\n' } = {}) {
  return `---\nname: ${name}\n${description ? `description: ${description}\n` : ''}---\n\n${body}`;
}

// ---- the real skills ----

test('every SKILL.md on disk gets a page, including every active catalog skill', () => {
  const onDisk = [];
  for (const category of readdirSync(join(ROOT, 'skills'))) {
    const dir = join(ROOT, 'skills', category);
    if (category.startsWith('.') || !existsSync(dir)) continue;
    for (const id of readdirSync(dir)) {
      if (existsSync(join(dir, id, 'SKILL.md'))) onDisk.push(`skills/${category}/${id}`);
    }
  }
  const deprecated = new Set(loadIndex().skills.filter((s) => s.status === 'deprecated').map((s) => s.path));
  assert.deepEqual(
    manifest.skills.map((s) => s.path).sort(),
    onDisk.filter((p) => !deprecated.has(p)).sort(),
  );
  const published = new Set(manifest.skills.map((s) => s.path));
  for (const s of loadIndex().skills) {
    if (s.status !== 'deprecated') assert.ok(published.has(s.path), `${s.id} has no page`);
  }
});

test('page and raw URLs are unique regardless of case, page URLs have no dots, and no id takes a site route', () => {
  const seen = new Set();
  const claim = (url) => {
    assert.ok(!seen.has(url.toLowerCase()), `${url} is used twice`);
    seen.add(url.toLowerCase());
  };
  for (const s of manifest.skills) {
    assert.ok(!RESERVED_IDS.includes(s.id), `${s.id} is a reserved route`);
    claim(s.url);
    claim(s.rawUrl);
    for (const f of s.files) {
      if (f.url) {
        claim(f.url);
        assert.match(f.url, /^\/[A-Za-z0-9_/-]+\/$/, `${f.url} is not a dot-free page URL`);
      }
      if (f.rawUrl) claim(f.rawUrl);
    }
  }
});

test('every relative link in the published Markdown resolves', () => {
  assert.deepEqual(manifest.brokenLinks, []);
});

test('no browser-active file is offered through the raw mirror', () => {
  for (const s of manifest.skills) {
    for (const f of s.files) {
      if (/\.(?:html?|svg|xml)$/i.test(f.path)) assert.equal(f.rawUrl, undefined, `${s.id}/${f.path} would run on the site`);
    }
  }
});

test('llms.txt lists every skill once, under its category, with an absolute raw link', () => {
  const txt = renderLlmsTxt(manifest, { siteUrl: 'https://example.com/skills/' });
  assert.ok(txt.startsWith(`# ${manifest.title}\n`));
  assert.ok(txt.endsWith('\n'));
  // Summaries quote the skills' own descriptions; only the copy around them is ours.
  const ownCopy = txt.split('\n').filter((l) => !l.startsWith('- ['));
  assert.ok(!ownCopy.some((l) => l.includes('—')), 'the text around the list uses no em dashes');
  for (const s of manifest.skills) {
    const line = `- [${s.name}](https://example.com/skills/raw/${s.id}/SKILL.md)`;
    assert.equal(txt.split('\n').filter((l) => l.startsWith(line)).length, 1, `${s.id} is not listed exactly once`);
  }
  assert.equal(txt.split('\n').filter((l) => l.startsWith('## ')).length, manifest.categories.length);
});

test('the manifest is identical on every build', () => {
  assert.deepEqual(buildDocsManifest(), manifest);
});

// ---- behaviour on fixtures ----

test('a skill missing from the catalog and without a description is published with nothing invented', (t) => {
  const inputs = fixture(t, { 'skills/research/new-skill/SKILL.md': skillMd('new-skill', { description: null }) });
  const m = buildDocsManifest(inputs);
  assert.equal(m.skills.length, 1);
  const [s] = m.skills;
  assert.equal(s.description, null);
  assert.equal(s.summary, null);
  assert.deepEqual(s.meta, {});
  assert.ok(m.warnings.some((w) => w.includes('not in catalog/index.json')));
  assert.ok(m.warnings.some((w) => w.includes('no description')));
  assert.ok(!renderLlmsTxt(m, { siteUrl: 'https://x.test' }).includes('new-skill/SKILL.md):'), 'no summary is made up');
});

test('catalog metadata is joined by path, and empty or unknown values stay absent', (t) => {
  const entry = {
    id: 'joined', path: 'skills/testing/joined', category: 'testing', description: 'From the catalog. More.',
    tags: ['usability'], triggers: [], inputs: ['a prototype'], outputs: [], dependencies: [],
    compatibility: ['claude-code'], relatedSkills: ['not-a-skill'], recommended: true, maturity: 'stable',
    status: 'verified', source: { type: 'original', author: 'Someone', license: 'MIT', url: null, repository: null, modified: false },
  };
  const inputs = fixture(t, { 'skills/testing/joined/SKILL.md': skillMd('joined', { description: null }) }, { index: { skills: [entry] } });
  const [s] = buildDocsManifest(inputs).skills;
  assert.equal(s.description, 'From the catalog. More.');
  assert.equal(s.summary, 'From the catalog.');
  assert.deepEqual(s.meta, {
    tags: ['usability'], inputs: ['a prototype'], compatibility: ['claude-code'], recommended: true,
    maturity: 'stable', status: 'verified', source: { type: 'original', author: 'Someone', license: 'MIT', modified: false },
  });
});

test('a duplicate skill id in two categories stops the build and names both folders', (t) => {
  const inputs = fixture(t, {
    'skills/research/twin/SKILL.md': skillMd('twin'),
    'skills/testing/twin/SKILL.md': skillMd('twin'),
  });
  assert.throws(() => buildDocsManifest(inputs), /duplicate skill id "twin": skills\/research\/twin and skills\/testing\/twin/);
});

test('a skill id that would shadow a site route stops the build', (t) => {
  const inputs = fixture(t, { 'skills/research/raw/SKILL.md': skillMd('raw') });
  assert.throws(() => buildDocsManifest(inputs), /reserved/);
});

test('broken inline, reference-style and angle-bracket links are reported at their line; code is ignored', (t) => {
  const body = [
    '# Links', // body line 2 (line 1 is the blank after the fence)
    '[fine](references/guide.md#part) and [gone](missing.md)',
    '[by reference][ref] and [spaced](<no such file.md>)',
    '',
    '[ref]: old/removed.md',
    '`[not a link](inline-code.md)`',
    '````md',
    '```json',
    '[inside a fence](fenced.md)',
    '```',
    '````',
    '',
  ].join('\n');
  const inputs = fixture(t, {
    'skills/research/links/SKILL.md': skillMd('links', { body }),
    'skills/research/links/references/guide.md': '# Guide\n\n## Part\n',
  });
  const m = buildDocsManifest(inputs);
  // Frontmatter is lines 1-4 and a blank line follows, so body line 2 is file line 6.
  assert.deepEqual(m.brokenLinks, [
    { file: 'skills/research/links/SKILL.md', line: 7, target: 'missing.md' },
    { file: 'skills/research/links/SKILL.md', line: 8, target: 'no such file.md' },
    { file: 'skills/research/links/SKILL.md', line: 10, target: 'old/removed.md' },
  ]);
  const { resolveLink } = createLinkResolver(m.skills, { blobBase: BLOB });
  assert.deepEqual(resolveLink('references/guide.md#part', { skillId: 'links', docPath: 'SKILL.md' }), {
    type: 'page', href: '/links/references/guide/#part',
  });
});

test('extractMarkdownLinks keeps the target of a four-backtick block closed only by a matching fence', () => {
  const md = '````\n```\n[a](inside.md)\n````\n[b](outside.md)\n';
  assert.deepEqual(extractMarkdownLinks(md).map((l) => l.target), ['outside.md']);
});

test('supporting files: dotfiles and dependency folders are skipped, HTML gets a page but no raw copy', (t) => {
  const inputs = fixture(t, {
    'skills/research/files/SKILL.md': skillMd('files'),
    'skills/research/files/.env': 'TOKEN=not-published',
    'skills/research/files/.claude/rules/house.md': '# Rules\n',
    'skills/research/files/node_modules/dep/index.js': 'module.exports = 1;\n',
    'skills/research/files/scripts/__pycache__/run.cpython.pyc': 'x',
    'skills/research/files/scripts/run.py': 'print("hi")\n',
    'skills/research/files/assets/demo.html': '<script>alert(1)</script>\n',
    'skills/research/files/fonts/Face.ttf': Buffer.from([0, 1, 0, 0, 0, 16]),
    'skills/research/files/references/guide.md': '# Guide\n',
  });
  const [s] = buildDocsManifest(inputs).skills;
  const byPath = Object.fromEntries(s.files.map((f) => [f.path, f]));
  assert.deepEqual(Object.keys(byPath), ['assets/demo.html', 'fonts/Face.ttf', 'references/guide.md', 'scripts/run.py']);
  assert.deepEqual(s.excluded, ['.claude', '.env', 'node_modules', 'scripts/__pycache__']);
  assert.equal(byPath['assets/demo.html'].url, '/files/assets/demo-html/');
  assert.equal(byPath['assets/demo.html'].rawUrl, undefined);
  assert.equal(byPath['scripts/run.py'].url, '/files/scripts/run-py/');
  assert.equal(byPath['scripts/run.py'].rawUrl, '/raw/files/scripts/run.py');
  assert.equal(byPath['fonts/Face.ttf'].kind, 'binary');
  assert.equal(byPath['fonts/Face.ttf'].url, undefined);
  assert.equal(byPath['references/guide.md'].url, '/files/references/guide/');
});

test('a credential in a published file stops the build', (t) => {
  const inputs = fixture(t, {
    'skills/research/leaky/SKILL.md': skillMd('leaky'),
    'skills/research/leaky/references/setup.md': `Use AKIA${'ABCDEFGHIJKLMNOP'} to sign in.\n`,
  });
  assert.throws(() => buildDocsManifest(inputs), /looks like a credential/);
});

test('links and inline code resolve to the page, raw file, repository or nothing the site renders', (t) => {
  const inputs = fixture(t, {
    'skills/research/alpha/SKILL.md': skillMd('alpha'),
    'skills/research/alpha/references/guide.md': '# Guide\n',
    'skills/research/alpha/scripts/run.py': 'print(1)\n',
    'skills/research/alpha/.claude/rules/house.md': '# Rules\n',
    'skills/testing/beta-skill/SKILL.md': skillMd('beta-skill'),
  });
  const m = buildDocsManifest(inputs);
  const { resolveLink, resolveCode } = createLinkResolver(m.skills, { blobBase: BLOB });
  const at = { skillId: 'alpha', docPath: 'references/guide.md' };
  assert.deepEqual(resolveLink('../scripts/run.py', at), { type: 'page', href: '/alpha/scripts/run-py/' });
  assert.deepEqual(resolveLink('../SKILL.md#setup', at), { type: 'page', href: '/alpha/#setup' });
  assert.deepEqual(resolveLink('../../../testing/beta-skill/SKILL.md', at), { type: 'page', href: '/beta-skill/' });
  assert.deepEqual(resolveLink('../.claude/rules/house.md', at), { type: 'repo', href: `${BLOB}/skills/research/alpha/.claude/rules/house.md` });
  assert.deepEqual(resolveLink('../scripts', at), { type: 'page', href: '/alpha/#supporting-files' });
  assert.deepEqual(resolveLink('javascript:alert(1)', at), { type: 'unsafe', href: null });
  assert.deepEqual(resolveLink('#local', at), { type: 'anchor', href: '#local' });
  assert.deepEqual(resolveLink('https://example.com/x', at), { type: 'external', href: 'https://example.com/x' });

  const root = { skillId: 'alpha', docPath: 'SKILL.md' };
  assert.deepEqual(resolveCode('scripts/run.py', root), { type: 'page', href: '/alpha/scripts/run-py/' });
  assert.deepEqual(resolveCode('.claude/skills/alpha/references/guide.md', root), { type: 'page', href: '/alpha/references/guide/' });
  assert.deepEqual(resolveCode('beta-skill', root), { type: 'page', href: '/beta-skill/' });
  assert.equal(resolveCode('package.json', root), null);
  assert.equal(resolveCode('scripts/*.py', root), null);
  assert.equal(resolveCode('alpha', root), null);
});

test('nested Markdown frontmatter is hidden on the page and kept in the raw file', (t) => {
  const withFm = '---\nname: nested\ndescription: A nested file.\n---\n# Nested\n';
  const inputs = fixture(t, {
    'skills/research/fm/SKILL.md': skillMd('fm'),
    'skills/research/fm/references/nested.md': withFm,
  });
  const siteDir = mkdtempSync(join(tmpdir(), 'docs-site-'));
  t.after(() => rmSync(siteDir, { recursive: true, force: true }));
  const m = writeDocsContent({ siteDir, siteUrl: 'https://x.test', inputs });
  assert.equal(m.documents[0].body, '# Nested\n');
  assert.equal(readFileSync(join(siteDir, 'public/raw/fm/references/nested.md'), 'utf8'), withFm);
});

test('writeDocsContent mirrors files byte for byte, keeps HTML out of the mirror and leaves nothing stale', (t) => {
  const files = {
    'skills/research/one/SKILL.md': skillMd('one'),
    'skills/research/one/assets/page.html': '<p>hi</p>\n',
    'skills/research/one/fonts/Face.ttf': Buffer.from([0, 1, 2, 3]),
    'skills/testing/two/SKILL.md': skillMd('two'),
  };
  const inputs = fixture(t, files);
  const siteDir = mkdtempSync(join(tmpdir(), 'docs-site-'));
  t.after(() => rmSync(siteDir, { recursive: true, force: true }));

  writeDocsContent({ siteDir, siteUrl: 'https://x.test/skills', inputs });
  assert.equal(readFileSync(join(siteDir, 'public/raw/one/SKILL.md'), 'utf8'), files['skills/research/one/SKILL.md']);
  assert.deepEqual(readFileSync(join(siteDir, 'public/raw/one/fonts/Face.ttf')), files['skills/research/one/fonts/Face.ttf']);
  assert.ok(!existsSync(join(siteDir, 'public/raw/one/assets/page.html')));
  assert.ok(existsSync(join(siteDir, '.content/files/one/assets/page.html')));
  for (const lib of ['ranking.mjs', 'docs-links.mjs']) {
    assert.equal(readFileSync(join(siteDir, '.content', lib), 'utf8'), readFileSync(join(ROOT, 'scripts/lib', lib), 'utf8'));
  }
  assert.ok(readFileSync(join(siteDir, 'public/llms.txt'), 'utf8').includes('https://x.test/skills/raw/two/SKILL.md'));

  rmSync(join(inputs.root, 'skills/testing/two'), { recursive: true });
  writeDocsContent({ siteDir, siteUrl: 'https://x.test/skills', inputs });
  assert.ok(!existsSync(join(siteDir, 'public/raw/two')), 'a removed skill stays published');
  assert.ok(!readFileSync(join(siteDir, 'public/llms.txt'), 'utf8').includes('/raw/two/'));
});

test('a skill added to the folder appears on the next build with its page and llms.txt line', (t) => {
  const inputs = fixture(t, { 'skills/research/first/SKILL.md': skillMd('first') });
  assert.deepEqual(buildDocsManifest(inputs).skills.map((s) => s.url), ['/first/']);
  mkdirSync(join(inputs.root, 'skills/testing/added'), { recursive: true });
  writeFileSync(join(inputs.root, 'skills/testing/added/SKILL.md'), skillMd('added'));
  const m = buildDocsManifest(inputs);
  assert.deepEqual(m.skills.map((s) => s.url), ['/first/', '/added/']);
  assert.deepEqual(m.categories.map((c) => [c.label, c.skills]), [['User research', ['first']], ['Testing and evaluation', ['added']]]);
  assert.ok(renderLlmsTxt(m, { siteUrl: 'https://x.test' }).includes('- [added](https://x.test/raw/added/SKILL.md): The added skill.'));
});
