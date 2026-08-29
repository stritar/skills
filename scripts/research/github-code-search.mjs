#!/usr/bin/env node
// Authenticated GitHub code and repository search for SKILL.md files on
// product-design topics. Writes a discovery-track evidence file in the same
// shape the discovery agents produce, so merge-candidates.mjs can ingest it.
//
// Requires an authenticated `gh` (gh auth status). Respects the search rate
// limits (code search 10/min, repository search 30/min) with fixed spacing.
//
// Usage: node scripts/research/github-code-search.mjs --round 2 --track T9 [--date YYYY-MM-DD]

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from '../lib/index-io.mjs';

const args = process.argv.slice(2);
const opt = (name, def) => (args.includes(name) ? args[args.indexOf(name) + 1] : def);
const ROUND = opt('--round', '2');
const TRACK = opt('--track', 'T9');
const DATE = opt('--date', new Date().toISOString().slice(0, 10));
const OUT = join(ROOT, 'research', 'raw', `round-${ROUND}`, `${TRACK}.json`);

// Legacy code-search syntax (the REST endpoint does not accept `path:`).
const CODE_QUERIES = [
  'filename:SKILL.md accessibility WCAG',
  'filename:SKILL.md "design tokens"',
  'filename:SKILL.md "design system" audit',
  'filename:SKILL.md "user research" interview',
  'filename:SKILL.md "usability testing"',
  'filename:SKILL.md wireframe prototype',
  'filename:SKILL.md typography hierarchy',
  'filename:SKILL.md "color palette" contrast',
  'filename:SKILL.md "UX writing" microcopy',
  'filename:SKILL.md "heuristic evaluation"',
  'filename:SKILL.md "information architecture"',
  'filename:SKILL.md "card sort"',
  'filename:SKILL.md dashboard design',
  'filename:SKILL.md "design review" severity',
  'filename:SKILL.md "design QA"',
  'filename:SKILL.md "visual regression"',
  'filename:SKILL.md "product analytics" events',
  'filename:SKILL.md instrumentation "tracking plan"',
  'filename:SKILL.md "journey map"',
  'filename:SKILL.md persona segmentation',
  'filename:SKILL.md "conversational design" agent',
  'filename:SKILL.md "AI agent" interface trust',
  'filename:SKILL.md "dark patterns"',
  'filename:SKILL.md "design critique"',
  'filename:SKILL.md "design handoff"',
  'filename:SKILL.md "motion design" easing',
  'filename:SKILL.md "data visualization" chart',
  'filename:SKILL.md onboarding "empty state"',
  'filename:SKILL.md Figma "design system"',
  'filename:SKILL.md "jobs to be done"',
  'filename:SKILL.md "competitive analysis" product',
  'filename:SKILL.md prioritization roadmap design',
  'filename:SKILL.md "service blueprint"',
  'filename:SKILL.md localization RTL design',
  'filename:SKILL.md "responsive design" breakpoints',
  'filename:SKILL.md "form design" validation',
];

const REPO_QUERIES = [
  'topic:agent-skills design',
  'topic:agent-skills ux',
  'topic:claude-skills design',
  'topic:claude-skills ux',
  'topic:claude-code-skills design',
  'topic:codex-skills design',
  '"agent skills" design ux in:name,description,readme',
  '"SKILL.md" design system in:readme',
  '"SKILL.md" accessibility in:readme',
  '"SKILL.md" "user research" in:readme',
  '"skills" "product design" claude in:name,description',
  'cursor skills design ux in:name,description',
  'opencode skills design in:name,description',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function gh(endpoint, params) {
  const a = ['api', '-X', 'GET', endpoint];
  for (const [k, v] of Object.entries(params)) a.push('-f', `${k}=${v}`);
  return JSON.parse(execFileSync('gh', a, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }));
}

async function ghWithRetry(endpoint, params, label) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      return gh(endpoint, params);
    } catch (e) {
      const msg = String(e.stderr || e.message);
      if (/rate limit|403|429/i.test(msg) && attempt < 4) {
        console.error(`rate limited on ${label}; waiting 65s (attempt ${attempt})`);
        await sleep(65000);
        continue;
      }
      throw new Error(`${label}: ${msg.slice(0, 300)}`);
    }
  }
}

// Known repositories: already vendored, or already in the candidate queue.
function knownRepos() {
  const known = new Map();
  const idx = JSON.parse(readFileSync(join(ROOT, 'catalog', 'index.json'), 'utf8'));
  for (const s of idx.skills) if (s.source.repository) known.set(s.source.repository.toLowerCase(), 'vendored');
  const cPath = join(ROOT, 'research', 'candidates.json');
  if (existsSync(cPath)) {
    for (const c of JSON.parse(readFileSync(cPath, 'utf8')).candidates) {
      const m = String(c.repoUrl || '').match(/github\.com\/([^/]+\/[^/#?]+)/i);
      if (m) known.set(m[1].toLowerCase().replace(/\.git$/, ''), c.status || 'pending');
    }
  }
  return known;
}

const known = knownRepos();
const queries = [];
const hits = new Map(); // full_name -> { paths:Set, via:Set }

console.error(`code search: ${CODE_QUERIES.length} queries at ~6.5s spacing`);
for (const q of CODE_QUERIES) {
  const url = `https://api.github.com/search/code?q=${encodeURIComponent(q)}`;
  try {
    const res = await ghWithRetry('search/code', { q, per_page: '50' }, q);
    let newRepos = 0;
    for (const item of res.items ?? []) {
      const name = item.repository.full_name;
      if (!hits.has(name)) { hits.set(name, { paths: new Set(), via: new Set() }); newRepos++; }
      hits.get(name).paths.add(item.path);
      hits.get(name).via.add(`code: ${q}`);
    }
    queries.push({ engine: 'github-code-search', query: q, url, results: res.total_count ?? 0, outcome: `${(res.items ?? []).length} items returned, ${newRepos} new repos` });
    console.error(`  ${q} -> ${res.total_count} (${newRepos} new repos)`);
  } catch (e) {
    queries.push({ engine: 'github-code-search', query: q, url, results: 0, outcome: `error: ${e.message}` });
    console.error(`  ${q} -> ERROR ${e.message}`);
  }
  await sleep(6500);
}

console.error(`repository search: ${REPO_QUERIES.length} queries at ~2.5s spacing`);
for (const q of REPO_QUERIES) {
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}`;
  try {
    const res = await ghWithRetry('search/repositories', { q, per_page: '100', sort: 'updated' }, q);
    let newRepos = 0;
    for (const item of res.items ?? []) {
      const name = item.full_name;
      if (!hits.has(name)) { hits.set(name, { paths: new Set(), via: new Set() }); newRepos++; }
      hits.get(name).via.add(`repo: ${q}`);
    }
    queries.push({ engine: 'github-repo-search', query: q, url, results: res.total_count ?? 0, outcome: `${(res.items ?? []).length} items returned, ${newRepos} new repos` });
    console.error(`  ${q} -> ${res.total_count} (${newRepos} new repos)`);
  } catch (e) {
    queries.push({ engine: 'github-repo-search', query: q, url, results: 0, outcome: `error: ${e.message}` });
    console.error(`  ${q} -> ERROR ${e.message}`);
  }
  await sleep(2500);
}

// Repository metadata for every hit (core limit is ample).
console.error(`fetching metadata for ${hits.size} repositories`);
const candidates = [];
const rejected = [];
let knownCount = 0;
// Bound the metadata pass: repositories that matched more queries first.
const METADATA_CAP = 600;
const ordered = [...hits.entries()].sort((a, b) => b[1].via.size - a[1].via.size).slice(0, METADATA_CAP);
for (const [name, h] of ordered) {
  const lower = name.toLowerCase();
  const status = known.get(lower);
  let meta;
  try {
    meta = await ghWithRetry(`repos/${name}`, {}, name);
  } catch (e) {
    rejected.push({ target: `https://github.com/${name}`, reason: `metadata fetch failed: ${e.message.slice(0, 120)}` });
    continue;
  }
  if (meta.fork && meta.stargazers_count < 5) {
    rejected.push({ target: `https://github.com/${name}`, reason: 'low-star fork' });
    continue;
  }
  const paths = [...h.paths];
  const skillPath = paths.length ? paths[0].replace(/\/?SKILL\.md$/, '') : null;
  const entry = {
    candidateId: `gh:${lower}${skillPath ? '#' + skillPath : ''}`,
    name: meta.name,
    repoUrl: meta.html_url,
    skillPath,
    ref: meta.default_branch,
    categoryGuess: null,
    licenseHint: meta.license?.spdx_id && meta.license.spdx_id !== 'NOASSERTION' ? meta.license.spdx_id : 'unknown',
    stars: meta.stargazers_count,
    lastActivity: meta.pushed_at,
    whyRelevant: `matched ${[...h.via].length} query/queries; ${paths.length} SKILL.md path(s) matched: ${paths.slice(0, 6).join(', ')}${paths.length > 6 ? ', …' : ''}`,
    discoveredVia: [...h.via].slice(0, 4).join(' | '),
    knowledgeSource: 'fresh',
    notes: meta.description || null,
    knownAlready: status ?? null,
  };
  if (status) knownCount++;
  candidates.push(entry);
  await sleep(150);
}

const fresh = candidates.filter((c) => !c.knownAlready);
const logMd = [
  `### Round ${ROUND} - Track ${TRACK} (authenticated GitHub code and repository search, ${DATE})`,
  '',
  `- Tool: \`gh api\` against \`search/code\` (legacy \`filename:SKILL.md\` syntax) and \`search/repositories\`, run by \`scripts/research/github-code-search.mjs\`.`,
  `- ${CODE_QUERIES.length} code-search queries and ${REPO_QUERIES.length} repository-search queries; results per query are in the \`queries\` array of this track file.`,
  `- ${hits.size} unique repositories hit; ${candidates.length} recorded with metadata (stars, license, last push), of which ${knownCount} were already known from round 1 or already vendored and ${fresh.length} are new.`,
  `- ${rejected.length} dropped at this stage (low-star forks, metadata failures). Relevance and file-level verification are left to inspection; this track records what the searches returned.`,
  '',
  'Queries:',
  ...queries.map((q) => `- \`${q.query}\` (${q.engine}): ${q.results} results; ${q.outcome}`),
].join('\n');

mkdirSync(join(ROOT, 'research', 'raw', `round-${ROUND}`), { recursive: true });
writeFileSync(OUT, JSON.stringify({
  track: TRACK, round: Number(ROUND), date: DATE,
  queries, urlsOpened: [], candidates, leads: [], rejected, logMd,
}, null, 2) + '\n');
console.error(`wrote ${OUT}: ${candidates.length} candidates (${fresh.length} new, ${knownCount} known), ${rejected.length} rejected`);
