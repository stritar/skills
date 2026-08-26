#!/usr/bin/env node
// Local catalog search: `npm run search -- "accessible forms" [flags]`
//
// Reads only catalog/index.json (never parses YAML). Deterministic ranking —
// see scripts/lib/ranking.mjs for the weights.
//
// Flags:
//   --category <cat>     filter by category (repeatable)
//   --tag <tag>          filter by tag (repeatable)
//   --agent <env>        filter by compatibility (e.g. claude-code)
//   --recommended        only recommended defaults
//   --source <type>      third-party | original
//   --all                include deprecated skills
//   --limit <n>          max results (default 10)
//   --json               machine-readable output

import { loadIndex } from './lib/index-io.mjs';
import { scoreEntry, compareResults } from './lib/ranking.mjs';

function parseArgs(argv) {
  const opts = { categories: [], tags: [], agents: [], recommended: false, source: null, all: false, json: false, limit: 10, query: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => {
      const v = argv[++i];
      if (v === undefined) { console.error(`missing value for ${a}`); process.exit(1); }
      return v;
    };
    if (a === '--category') opts.categories.push(next());
    else if (a === '--tag') opts.tags.push(next());
    else if (a === '--agent') opts.agents.push(next());
    else if (a === '--recommended') opts.recommended = true;
    else if (a === '--source') opts.source = next();
    else if (a === '--all') opts.all = true;
    else if (a === '--json') opts.json = true;
    else if (a === '--limit') opts.limit = Number(next());
    else if (a.startsWith('--')) { console.error(`unknown flag ${a}`); process.exit(1); }
    else opts.query.push(a);
  }
  opts.query = opts.query.join(' ').trim();
  return opts;
}

const opts = parseArgs(process.argv.slice(2));
let index;
try {
  index = loadIndex();
} catch (e) {
  console.error(`failed to load catalog/index.json: ${e.message}`);
  process.exit(1);
}

let entries = index.skills;
if (!opts.all) entries = entries.filter((s) => s.status !== 'deprecated');
if (opts.categories.length) entries = entries.filter((s) => opts.categories.includes(s.category));
if (opts.tags.length) entries = entries.filter((s) => opts.tags.every((t) => s.tags.includes(t)));
if (opts.agents.length) entries = entries.filter((s) => opts.agents.every((a) => s.compatibility.includes(a)));
if (opts.recommended) entries = entries.filter((s) => s.recommended);
if (opts.source) entries = entries.filter((s) => s.source.type === opts.source);

let results;
if (opts.query === '') {
  results = entries.map((entry) => ({ entry, score: 0, matched: [] }))
    .sort((a, b) => (a.entry.id < b.entry.id ? -1 : 1));
} else {
  results = entries
    .map((entry) => ({ entry, ...scoreEntry(opts.query, entry) }))
    .filter((r) => r.score > 0)
    .sort(compareResults);
}
results = results.slice(0, opts.limit);

if (opts.json) {
  console.log(JSON.stringify(results.map(({ entry, score, matched }) => ({
    id: entry.id,
    score,
    matchedFields: matched,
    name: entry.name,
    description: entry.description,
    category: entry.category,
    tags: entry.tags,
    triggers: entry.triggers,
    path: `${entry.path}/SKILL.md`,
    recommended: entry.recommended,
    status: entry.status,
    source: entry.source.type,
  })), null, 2));
} else if (results.length === 0) {
  console.log(opts.query === ''
    ? 'No skills match the given filters.'
    : `No results for "${opts.query}". Try fewer words, or browse CATALOG.md.`);
} else {
  for (const { entry, score, matched } of results) {
    const marks = [entry.recommended ? 'recommended' : null, entry.status !== 'verified' ? entry.status : null]
      .filter(Boolean).join(', ');
    console.log(`${entry.id}${marks ? `  (${marks})` : ''}${opts.query ? `  [score ${score}: ${matched.join(', ')}]` : ''}`);
    console.log(`  ${entry.description}`);
    console.log(`  category: ${entry.category}   tags: ${entry.tags.slice(0, 8).join(', ')}`);
    if (entry.triggers.length) console.log(`  use when: ${entry.triggers.slice(0, 3).join('; ')}`);
    console.log(`  path: ${entry.path}/SKILL.md`);
    console.log('');
  }
}
