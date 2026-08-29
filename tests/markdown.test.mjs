import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { renderMarkdown, slug } from '../scripts/lib/markdown.mjs';
import { parseFrontmatter } from '../scripts/lib/frontmatter.mjs';
import { ROOT } from '../scripts/lib/index-io.mjs';

const html = (src, opts) => renderMarkdown(src, opts).html;

test('headings carry ids and honour headingOffset', () => {
  assert.equal(html('# Title'), '<h1 id="title">Title</h1>');
  assert.equal(html('# Title', { headingOffset: 1 }), '<h2 id="title">Title</h2>');
  // Never past h6.
  assert.match(html('###### Deep', { headingOffset: 2 }), /^<h6 /);
});

test('heading ids are unique, non-empty and keep non-ASCII letters', () => {
  const { headings } = renderMarkdown('## 手順\n\n## 手順\n\n## !!!\n');
  assert.deepEqual(headings.map((h) => h.id), ['手順', '手順-2', 'section-3']);
});

test('reservedIds are kept out of the heading pool', () => {
  const { headings } = renderMarkdown('## Install', { reservedIds: ['install'] });
  assert.equal(headings[0].id, 'install-2');
});

test('fenced code escapes its contents and never interprets them', () => {
  const out = html('```html\n<div class="x">#not a heading</div>\n| not | a table |\n---\n```');
  assert.match(out, /<pre><code class="language-html">/);
  assert.match(out, /&lt;div class=&quot;x&quot;&gt;#not a heading&lt;\/div&gt;/);
  assert.doesNotMatch(out, /<h1|<table|<hr>/);
});

test('a closing script tag inside a fence stays literal', () => {
  const out = html('```js\nconst s = "</script>";\n```');
  assert.match(out, /&lt;\/script&gt;/);
  assert.doesNotMatch(out, /<\/script>/);
});

test('code fence language is filtered to a safe class', () => {
  assert.match(html('```js"onload=x\ny\n```'), /class="language-jsonloadx"/);
});

test('tables: optional leading pipe, empty cells, alignment', () => {
  const out = html('| | B |\n|---|:-:|\n| 1 | 2 |');
  assert.match(out, /<th><\/th><th style="text-align:center">B<\/th>/);
  assert.match(out, /<td>1<\/td><td style="text-align:center">2<\/td>/);
});

test('table cells may contain escaped and code-span pipes', () => {
  const out = html('| a | b |\n|---|---|\n| x \\| y | `p\\|q` |');
  assert.match(out, /<td>x \| y<\/td>/);
  // GFM unescapes \| in a cell before inline parsing, code spans included.
  assert.match(out, /<code>p\|q<\/code>/);
  // Exactly two body cells: the pipes must not have split the row.
  assert.equal((out.match(/<td>/g) || []).length, 2);
});

test('short rows are padded to the header width', () => {
  const out = html('| a | b | c |\n|---|---|---|\n| 1 |');
  assert.equal((out.match(/<td>/g) || []).length, 3);
});

test('nested lists use relative indent, not a fixed step', () => {
  for (const pad of ['  ', '   ', '    ', '       ']) {
    const out = html(`- top\n${pad}- nested`);
    assert.equal((out.match(/<ul>/g) || []).length, 2, `indent ${pad.length}`);
    assert.match(out, /nested/);
  }
});

test('ordered lists keep a non-default start', () => {
  assert.match(html('3. three\n4. four'), /<ol start="3">/);
  assert.doesNotMatch(html('1. one'), /start=/);
});

test('task list items render a disabled checkbox', () => {
  const out = html('- [ ] todo\n- [x] done');
  assert.match(out, /<input type="checkbox" disabled> todo/);
  assert.match(out, /<input type="checkbox" disabled checked> done/);
});

test('blockquotes render their contents as markdown', () => {
  assert.match(html('> **bold** quote'), /<blockquote>\n<p><strong>bold<\/strong> quote<\/p>\n<\/blockquote>/);
});

test('--- is always a thematic break, never a setext underline', () => {
  const out = html('Some text\n\n---\n\nMore');
  assert.match(out, /<hr>/);
  assert.doesNotMatch(out, /<h[12]/);
});

test('emphasis, and snake_case is not italicised', () => {
  assert.match(html('**b** and *i*'), /<strong>b<\/strong> and <em>i<\/em>/);
  assert.equal(html('use snake_case_name here'), '<p>use snake_case_name here</p>');
  assert.match(html('_real_ emphasis'), /<em>real<\/em>/);
});

test('code spans support multi-backtick delimiters', () => {
  assert.match(html('``a ` b``'), /<code>a ` b<\/code>/);
});

test('relative links resolve against linkBase, fragments stay local', () => {
  const opts = { linkBase: 'https://example.test/base/' };
  assert.match(html('[a](refs/a.md)', opts), /href="https:\/\/example\.test\/base\/refs\/a\.md"/);
  assert.match(html('[a](./a.md#frag)', opts), /href="https:\/\/example\.test\/base\/a\.md#frag"/);
  assert.match(html('[a](#local)', opts), /href="#local"/);
  assert.match(html('[a](https://other.test/)', opts), /href="https:\/\/other\.test\/"/);
});

test('unsupported link schemes are not turned into links', () => {
  // The text stays visible, but it never becomes a link.
  const out = html('[click](javascript:alert(1))');
  assert.doesNotMatch(out, /<a /);
  assert.doesNotMatch(out, /href=/);
});

test('prose HTML is shown as text, and entities are not double-escaped', () => {
  assert.match(html('Just use <button>.'), /Just use &lt;button&gt;\./);
  assert.equal(html('a &amp; b'), '<p>a &amp; b</p>');
  assert.equal(html('a & b'), '<p>a &amp; b</p>');
});

test('HTML comments are dropped', () => {
  assert.equal(html('<!-- hidden -->\n\nvisible'), '<p>visible</p>');
  assert.equal(html('<!-- multi\nline -->\n\nvisible'), '<p>visible</p>');
});

test('slug keeps letters of any script and drops punctuation', () => {
  assert.equal(slug('Hello, World!'), 'hello-world');
  assert.equal(slug('`code` heading'), 'code-heading');
  assert.equal(slug('手順'), '手順');
});

// ---- corpus ----

function everySkillBody() {
  const out = [];
  const base = join(ROOT, 'skills');
  for (const cat of readdirSync(base)) {
    const catDir = join(base, cat);
    if (!statSync(catDir).isDirectory()) continue;
    for (const id of readdirSync(catDir)) {
      const p = join(catDir, id, 'SKILL.md');
      try { statSync(p); } catch { continue; }
      out.push({ cat, id, body: parseFrontmatter(readFileSync(p, 'utf8')).body });
    }
  }
  return out;
}

const ALLOWED_TAGS = new Set([
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'pre', 'code', 'strong',
  'em', 'a', 'blockquote', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'input',
]);

test('every SKILL.md renders to safe, well-formed, fully-resolved HTML', () => {
  const bodies = everySkillBody();
  assert.ok(bodies.length > 0, 'no skills found');
  for (const { cat, id, body } of bodies) {
    const { html: out, headings } = renderMarkdown(body, {
      linkBase: `https://github.com/x/y/blob/main/skills/${cat}/${id}/`,
      headingOffset: 1,
    });

    for (const m of out.matchAll(/<\/?([a-zA-Z][a-zA-Z0-9]*)/g)) {
      assert.ok(ALLOWED_TAGS.has(m[1].toLowerCase()), `${id} emitted <${m[1]}>`);
    }
    for (const [, href] of out.matchAll(/href="([^"]*)"/g)) {
      assert.match(href, /^(?:https?:|mailto:|#)/i, `${id} left an unresolved href: ${href}`);
    }
    const ids = headings.map((h) => h.id);
    assert.equal(new Set(ids).size, ids.length, `${id} has duplicate heading ids`);
    assert.ok(ids.every(Boolean), `${id} has an empty heading id`);
    for (const t of ['pre', 'table', 'ul', 'ol', 'blockquote']) {
      const o = (out.match(new RegExp(`<${t}\\b`, 'g')) || []).length;
      const c = (out.match(new RegExp(`</${t}>`, 'g')) || []).length;
      assert.equal(o, c, `${id} has unbalanced <${t}>`);
    }
    assert.ok(!out.includes(String.fromCharCode(0)), `${id} leaked a code-span placeholder`);
  }
});

test('rendering is deterministic', () => {
  const { body } = { body: everySkillBody()[0].body };
  assert.equal(html(body), html(body));
});
