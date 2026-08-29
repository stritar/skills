// Builds the browsable web edition of the catalog.
//
// Pure: every input is injected, nothing is read from disk here, no clock and
// no randomness, so catalog:check can byte-diff the result. generate.mjs is
// the only I/O boundary.
//
// Two page kinds are produced:
//   docs/index.html          the browse app, one card per skill
//   docs/skills/<id>.html    one page per skill, with its full instructions
//
// Every card is real HTML, so the page works with JavaScript switched off and
// is readable by crawlers; site.js only filters what is already there.

import { renderMarkdown, escapeAll as esc } from './markdown.mjs';

export const SKILL_PAGES_DIR = 'docs/skills';

const MARKER = '<!-- GENERATED FILE — do not edit. Source of truth: catalog/index.json. Regenerate with `npm run catalog:build`. -->';

export function buildSite({ index, categories, categoryLabels, categoryScopes, bodies, repo }) {
  const skills = [...index.skills]
    .filter((s) => s.status !== 'deprecated')
    .sort((a, b) => {
      const ca = categories.indexOf(a.category);
      const cb = categories.indexOf(b.category);
      if (ca !== cb) return ca - cb;
      return a.id < b.id ? -1 : 1;
    });

  const ctx = { skills, categories, categoryLabels, categoryScopes, repo };
  const out = { 'docs/index.html': indexPage(ctx) };
  for (const skill of skills) {
    const body = bodies.get(skill.id);
    if (body === undefined) {
      throw new Error(`[${skill.id}] no SKILL.md body was supplied to buildSite`);
    }
    try {
      out[`${SKILL_PAGES_DIR}/${skill.id}.html`] = detailPage(skill, body, ctx);
    } catch (e) {
      // Name the skill, or a renderer bug on one file hides every other drift.
      throw new Error(`[${skill.id}] could not build its page: ${e.message}`);
    }
  }
  return out;
}

// ---- shell ----

function page({ title, description, head = '', body, depth }) {
  const up = depth === 0 ? '' : '../'.repeat(depth);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
${MARKER}
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="stylesheet" href="${up}assets/site.css">
${head}</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${body}
</body>
</html>
`;
}

// A label sitting next to a glyph gets its own padded box, and the container
// sets no gap: the glyph and the text then sit at different insets from the
// edge, and the label never shifts when the glyph is absent.
function iconLabel(icon, label, cls = '') {
  const glyph = icon ? `<span class="il-icon" aria-hidden="true">${icon}</span>` : '';
  return `<span class="${cls ? `il ${cls}` : 'il'}">${glyph}<span class="il-label">${label}</span></span>`;
}

const RECOMMENDED = iconLabel('★', 'Recommended', 'badge badge-rec');

function depBucket(skill) {
  if (skill.dependencies.length === 0) return 'none';
  for (const key of ['playwright', 'browser', 'python', 'node']) {
    if (skill.dependencies.some((d) => d === key || d.startsWith(`${key}:`))) return key;
  }
  return 'other';
}

const DEP_LABELS = {
  none: 'No extra tooling',
  node: 'Needs Node',
  python: 'Needs Python',
  browser: 'Needs a browser',
  playwright: 'Needs Playwright',
  other: 'Other tooling',
};

function depBadge(s) {
  return s.dependencies.length ? iconLabel('', esc(DEP_LABELS[depBucket(s)]), 'badge badge-dep') : '';
}

// A command in a box with a Copy button beside it. The button is script-only;
// without script the text is still selectable.
function cmdBlock(cmd, { primary = false } = {}) {
  const cls = primary ? 'button button-primary copy js-only' : 'button copy js-only';
  return `<div class="cmd"><pre><code>${esc(cmd)}</code></pre><button type="button" class="${cls}" data-copy="${esc(cmd)}">${iconLabel('', 'Copy')}</button></div>`;
}

// The first sentence of a description, for the one line a card or lede can
// afford. Descriptions here open with what the skill does and go on to
// detail, so the first sentence is the useful one. Most are a single long
// sentence whose opening clause ends at a colon ("Web typography guidance:
// font-format rules, …"); that clause is the summary. Only when there is no
// such clause is the text cut on a word.
export function firstSentence(text, max = 160) {
  // A full stop ends a sentence unless it closes an abbreviation.
  const m = /(?<!\b(?:e\.g|i\.e|etc|vs|cf))\.\s+(?=[A-Z("'])/.exec(text);
  let out = m ? text.slice(0, m.index + 1) : text;
  if (out.length <= max) return out;
  const colon = out.indexOf(': ');
  if (colon >= 20 && colon <= max) return `${out.slice(0, colon)}.`;
  // Failing that, the last clause boundary that does not leave a bracket
  // open: the start of a bracketed aside, or a comma that introduces a new
  // clause rather than the next item of a list ("a bundled, install-free
  // engine" must not be cut at its comma).
  const boundaries = [];
  const CLAUSE = /, (?=(?:then|and|or|but|so|with|which|who|plus|including|from|via|not|rather|where|when|while|\w+ing)\b)| \(/g;
  for (const re = CLAUSE; ;) {
    const b = re.exec(out);
    if (!b || b.index > max) break;
    if (b.index >= 60) boundaries.push(b.index);
  }
  for (const i of boundaries.reverse()) {
    const head = out.slice(0, i);
    if ((head.match(/\(/g) || []).length === (head.match(/\)/g) || []).length) {
      return `${head}.`;
    }
  }
  const cut = out.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

// ---- index ----

function indexPage(ctx) {
  const { skills, categories, categoryLabels, categoryScopes, repo } = ctx;
  const counts = new Map();
  for (const s of skills) counts.set(s.category, (counts.get(s.category) || 0) + 1);
  const used = categories.filter((c) => counts.get(c));

  const facets = buildFacets(skills, { used, categoryLabels });
  const main = facets.filter((g) => !g.more);
  const more = facets.filter((g) => g.more);

  // Without script the category filter cannot work, so the same list is a
  // set of anchors that scroll to each section instead.
  const nav = used.map((c) => {
    const n = counts.get(c);
    return `<li><a href="#cat-${esc(c)}"><span class="cat-name">${esc(categoryLabels[c] || c)}</span> <span class="count">${n}</span></a></li>`;
  }).join('\n');

  const sections = used.map((c) => {
    const inCat = skills.filter((s) => s.category === c);
    const scope = categoryScopes[c];
    return `<section class="cat" id="cat-${esc(c)}" data-category="${esc(c)}">
<h2>${esc(categoryLabels[c] || c)} <span class="count">${inCat.length}</span></h2>
${scope ? `<p class="cat-scope">${esc(scope)}</p>` : ''}
<ul class="cards">
${inCat.map((s) => card(s, ctx)).join('\n')}
</ul>
</section>`;
  }).join('\n');

  const originals = skills.filter((s) => s.source.type === 'original').length;

  const body = `<header class="site-head">
<p class="eyebrow label-caps">Skill library</p>
<h1>Product design skills</h1>
<p class="lede">${skills.length} skills that make a coding agent better at product design work: research, information architecture, interaction and visual design, design systems, accessibility, content design, testing and design QA.</p>
<div class="intro">
<div class="intro-col">
<h2 class="label-caps">What a skill is</h2>
<p>A folder with a <code>SKILL.md</code> that an agent such as Claude Code, Codex or Cursor reads when a task matches. It carries the method, the checks and the output format, so the agent does the work the way a specialist would.</p>
</div>
<div class="intro-col">
<h2 class="label-caps">How to install one</h2>
<p>Pick a skill below, then run its command. This one installs any skill by id into every agent found on your machine:</p>
${cmdBlock(`npx skills add ${repo.slug} --skill <id>`, { primary: true })}
</div>
</div>
<p class="sub">${skills.length - originals} vendored from upstream projects with full provenance, ${originals} written here.
<a href="https://github.com/${esc(repo.slug)}">GitHub</a> ·
<a href="${esc(repo.blobBase)}/docs/install/generic.md">Install notes</a> ·
<a href="${esc(repo.blobBase)}/CONTRIBUTING.md">Contribute</a></p>
</header>

<div class="search-bar">
<form id="search-form" role="search" action="#main">
<label for="q">Search skills</label>
<input type="search" id="q" name="q" autocomplete="off" spellcheck="false"
  placeholder="What are you trying to do? e.g. accessible forms, dark mode contrast">
<p class="hint">Matches names, tags, categories and the tasks each skill is for. Press <kbd>/</kbd> to search.</p>
</form>
</div>

<div class="layout">
<nav class="sidebar" aria-labelledby="filters-head">
<h2 id="filters-head" class="label-caps">Filters</h2>
${main.map(facetGroup).join('\n')}
${more.length ? `<details class="facet-more js-only">
<summary>More filters</summary>
${more.map(facetGroup).join('\n')}
</details>` : ''}
<div class="no-js">
<h2 class="nav-head label-caps">Categories</h2>
<ul class="cat-nav">
${nav}
</ul>
</div>
</nav>

<main id="main">
<div class="results-head">
<p id="result-count" class="result-count" aria-live="polite" role="status">${skills.length} skills</p>
<ul id="active-filters" class="chips" aria-label="Active filters" hidden></ul>
<button type="button" id="clear-filters" class="button js-only" hidden>Clear all</button>
</div>
<div id="no-results" class="no-results" hidden>
<p>No skills match. Remove a filter above, or start again.</p>
<button type="button" class="button" data-clear>Clear all filters</button>
</div>
${sections}
</main>
</div>

<footer class="site-foot">
<p>Generated from <code>catalog/index.json</code> in <a href="https://github.com/${esc(repo.slug)}">${esc(repo.slug)}</a>. Each skill keeps its upstream licence; see the source note on any skill page.</p>
</footer>

<script type="application/json" id="skills-data">${dataBlob(skills)}</script>
<script src="assets/ranking.js"></script>
<script src="assets/site.js"></script>`;

  return page({
    title: 'Product design skills',
    description: `A searchable catalogue of ${skills.length} agent skills for product design work.`,
    body,
    depth: 0,
  });
}

function card(s, ctx) {
  const { categoryLabels } = ctx;
  const triggers = s.triggers.slice(0, 2);
  const tags = s.tags.slice(0, 4);
  const badges = [s.recommended ? RECOMMENDED : '', depBadge(s)].filter(Boolean).join('');
  return `<li class="card" data-id="${esc(s.id)}">
<div class="card-head">
<h3><a class="card-link" href="skills/${esc(s.id)}.html">${esc(s.id)}</a></h3>
<span class="card-cat">${esc(categoryLabels[s.category] || s.category)}</span>
</div>
<p class="card-sum">${esc(firstSentence(s.description))}</p>
${triggers.length ? `<p class="use-when"><span class="label-caps">Use when</span> ${triggers.map((t) => esc(t)).join(' <span class="sep" aria-hidden="true">·</span> ')}</p>` : ''}
${badges ? `<p class="card-meta">${badges}</p>` : ''}
<ul class="tags">${tags.map((t) => `<li><button type="button" class="tag js-only" aria-pressed="false" data-tag="${esc(t)}">${esc(t)}</button><span class="tag no-js">${esc(t)}</span></li>`).join('')}</ul>
</li>`;
}

// ---- facets ----

// Only a filter that can actually divide the catalogue is worth showing: at
// least two values, and a minority holding at least 5% of the skills. The rule
// keeps the sidebar honest as the library grows. The category group is exempt:
// it is the primary way in, and a category with one skill is still a place.
function buildFacets(skills, { used, categoryLabels }) {
  const groups = [
    {
      key: 'category',
      legend: 'Category',
      type: 'radio',
      keepAll: true,
      values: () => [['', 'All categories'], ...used.map((c) => [c, categoryLabels[c] || c])],
      test: (s) => [s.category],
    },
    {
      key: 'recommended',
      legend: 'Recommended',
      values: () => [['yes', 'Recommended only']],
      test: (s) => (s.recommended ? ['yes'] : []),
    },
    {
      key: 'deps',
      legend: 'Tooling',
      values: (c) => [...c.keys()].sort().map((k) => [k, DEP_LABELS[k] || k]),
      test: (s) => [depBucket(s)],
    },
    {
      key: 'license',
      legend: 'Licence',
      more: true,
      values: (c) => [...c.keys()].sort().map((k) => [k, k]),
      test: (s) => [s.source.license],
    },
    {
      key: 'origin',
      legend: 'Origin',
      more: true,
      values: () => [['original', 'Written here'], ['third-party', 'Vendored upstream']],
      test: (s) => [s.source.type],
    },
    {
      key: 'claude-ai',
      legend: 'Client',
      more: true,
      values: () => [['yes', 'Uploadable to claude.ai']],
      test: (s) => (s.compatibility.includes('claude-ai') ? ['yes'] : []),
    },
  ];

  const out = [];
  for (const g of groups) {
    const valueCounts = new Map();
    for (const s of skills) for (const v of g.test(s)) valueCounts.set(v, (valueCounts.get(v) || 0) + 1);
    if (valueCounts.size === 0) continue;
    const total = skills.length;
    if (!g.keepAll) {
      const smallest = Math.min(...[...valueCounts.values()], valueCounts.size === 1 ? total - [...valueCounts.values()][0] : Infinity);
      if (valueCounts.size < 2 && smallest / total < 0.05) continue;
      if (valueCounts.size >= 2 && Math.min(...valueCounts.values()) / total < 0.05) {
        // Keep the group, drop values too small to be useful on their own.
        for (const [k, n] of [...valueCounts]) if (n / total < 0.02) valueCounts.delete(k);
        if (valueCounts.size < 2) continue;
      }
    }
    if (g.key === 'category') valueCounts.set('', total);
    const values = g.values(valueCounts).filter(([v]) => valueCounts.has(v));
    if (values.length === 0) continue;
    out.push({ key: g.key, legend: g.legend, type: g.type || 'checkbox', more: !!g.more, values, counts: valueCounts });
  }
  return out;
}

function facetGroup(g) {
  const items = g.values.map(([value, label]) => {
    const checked = g.type === 'radio' && value === '' ? ' checked' : '';
    return `<li>
<label class="facet"><input type="${g.type}" name="${esc(g.key)}" value="${esc(value)}"${checked}>
<span class="facet-label">${esc(label)}</span> <span class="count">${g.counts.get(value)}</span></label>
</li>`;
  }).join('\n');
  return `<fieldset class="facet-group js-only" data-facet="${esc(g.key)}">
<legend class="label-caps">${esc(g.legend)}</legend>
<ul>${items}</ul>
</fieldset>`;
}

// The JSON lives in a <script> element, whose contents are tokenised as script
// data whatever the type is: a literal "</script" anywhere in a description or
// body would end the element early. Escaping "<" removes that whole class of
// bug, and JSON.parse turns < back into "<".
function dataBlob(skills) {
  const compact = skills.map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    category: s.category,
    tags: s.tags,
    triggers: s.triggers,
    inputs: s.inputs,
    outputs: s.outputs,
    recommended: s.recommended,
    status: s.status,
    license: s.source.license,
    origin: s.source.type,
    deps: depBucket(s),
    claudeAi: s.compatibility.includes('claude-ai'),
  }));
  return JSON.stringify(compact).replace(/</g, '\\u003c');
}

// ---- detail ----

function detailPage(s, rawBody, ctx) {
  const { categoryLabels, repo } = ctx;
  const blob = `${repo.blobBase}/${s.path}`;
  const reserved = ['main', 'install', 'about', 'source', 'related', 'contents', 'skip-link', 'instructions'];
  const { html: bodyHtml, headings } = renderMarkdown(rawBody, {
    linkBase: `${blob}/`,
    headingOffset: 1,
    reservedIds: reserved,
  });

  // Bodies are inconsistent about whether they open with an h1 or dive
  // straight into sections, so the contents list is built from the shallowest
  // level actually present, widening by one when that alone says too little.
  const toc = tableOfContents(headings);
  const related = s.relatedSkills
    .map((id) => ctx.skills.find((x) => x.id === id))
    .filter(Boolean);

  const lists = [
    ['Use when', s.triggers],
    ['Works on', s.inputs],
    ['Produces', s.outputs],
  ].filter(([, v]) => v.length);

  const body = `<header class="page-head">
<nav aria-label="Breadcrumb"><a href="../index.html">All skills</a> <span aria-hidden="true">/</span> <a href="../index.html?category=${encodeURIComponent(s.category)}">${esc(categoryLabels[s.category] || s.category)}</a></nav>
<h1>${esc(s.id)}</h1>
<p class="badges">${s.recommended ? RECOMMENDED : ''}${depBadge(s)}${s.maturity === 'experimental' ? iconLabel('', 'Experimental', 'badge badge-exp') : ''}</p>
<p class="lede">${esc(firstSentence(s.description, 240))}</p>
</header>

<div class="layout">
<nav class="sidebar" aria-labelledby="contents">
<h2 id="contents" class="label-caps">On this page</h2>
<ul class="toc">
<li><a href="#install">Install</a></li>
<li><a href="#about">About this skill</a></li>
${related.length ? '<li><a href="#related">Works with</a></li>' : ''}
<li><a href="#instructions">Instructions</a></li>
${toc.map((h) => `<li class="toc-sub"><a href="#${esc(h.id)}">${esc(h.text)}</a></li>`).join('\n')}
</ul>
</nav>

<main id="main">
${installSection(s, repo)}

<section id="about" class="meta">
<h2>About this skill</h2>
<div class="meta-row"><h3 class="label-caps">What it does</h3><p>${esc(s.description)}</p></div>
${lists.map(([label, v]) => `<div class="meta-row"><h3 class="label-caps">${esc(label)}</h3><ul>${v.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>`).join('\n')}
<div class="meta-row"><h3 class="label-caps">Tags</h3>
<ul class="tags tag-links">${s.tags.map((t) => `<li><a class="tag" href="../index.html?tag=${encodeURIComponent(t)}">${esc(t)}</a></li>`).join('')}</ul></div>
${s.dependencies.length ? `<div class="meta-row"><h3 class="label-caps">Requires</h3><ul>${s.dependencies.map((d) => `<li><code>${esc(d)}</code></li>`).join('')}</ul></div>` : ''}
<details id="source" class="fold">
<summary>Source and licence</summary>
<p>${sourceLine(s, repo)}</p>
</details>
</section>

${related.length ? `<section id="related">
<h2>Works with</h2>
<ul class="related">
${related.map((r) => `<li><a href="${esc(r.id)}.html"><span class="rel-id">${esc(r.id)}</span></a> <span class="rel-cat">${esc(categoryLabels[r.category] || r.category)}</span></li>`).join('\n')}
</ul>
</section>` : ''}

<article class="skill-body" id="instructions">
<h2 class="body-head">Instructions</h2>
<p class="body-note">The full text of <a href="${esc(blob)}/SKILL.md">SKILL.md</a>, as the agent reads it.</p>
${bodyHtml}
</article>
</main>
</div>

<footer class="site-foot">
<p><a href="../index.html">Back to all skills</a></p>
</footer>
<script src="../assets/site.js"></script>`;

  return page({
    title: `${s.id} — Product design skills`,
    description: metaDescription(s.description),
    body,
    depth: 1,
  });
}

function tableOfContents(headings) {
  if (headings.length === 0) return [];
  const min = Math.min(...headings.map((h) => h.level));
  let toc = headings.filter((h) => h.level === min);
  if (toc.length < 3) toc = headings.filter((h) => h.level <= min + 1);
  return toc.slice(0, 40);
}

// Meta descriptions are truncated by search engines anyway; cut on a word so
// the visible part reads as a sentence rather than a severed one.
function metaDescription(text) {
  if (text.length <= 300) return text;
  const cut = text.slice(0, 300);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

function sourceLine(s, repo) {
  if (s.source.type === 'original') {
    return `Written for this library. Licence <code>${esc(s.source.license)}</code>.`;
  }
  const short = (s.source.upstreamCommit || '').slice(0, 7);
  const who = s.source.author ? ` by ${esc(s.source.author)}` : '';
  const at = s.source.url
    ? `<a href="${esc(s.source.url)}">${esc(s.source.repository)}</a>`
    : esc(s.source.repository);
  const mods = s.source.modified
    ? ` Modified when vendored: ${s.source.modifications.map((m) => esc(m.reason)).join(', ')}.`
    : ' Vendored byte-identical to upstream.';
  return `Vendored from ${at}${who} at <code>${esc(short)}</code>, licence <code>${esc(s.source.license)}</code>.${mods}`;
}

function installSection(s, repo) {
  const others = [
    {
      label: 'Claude Code, as a plugin',
      cmd: `/plugin marketplace add ${repo.slug}\n/plugin install product-design-${s.category}@product-design-skills`,
      note: `Installs the whole <code>${esc(s.category)}</code> bundle, not only this skill. Use <code>product-design-all</code> for everything.`,
    },
    {
      label: 'From a clone, copied by hand',
      cmd: `cp -r ${s.path} ~/.claude/skills/`,
      note: `Copy the whole directory. Other tools use different folders: see <a href="${esc(repo.blobBase)}/docs/install/generic.md">the install notes</a>.`,
    },
  ];
  return `<section id="install">
<h2>Install</h2>
${cmdBlock(`npx skills add ${repo.slug} --skill ${s.id}`, { primary: true })}
<p class="note">Works for any agent: the skills CLI installs into whichever agents it finds on your machine.</p>
<details class="fold">
<summary>Other ways to install</summary>
<ul class="install">
${others.map(({ label, cmd, note }) => `<li>
<h3>${esc(label)}</h3>
${cmdBlock(cmd)}
<p class="note">${note}</p>
</li>`).join('\n')}
</ul>
</details>
</section>`;
}
