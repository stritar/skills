// Deterministic search scoring over catalog/index.json entries.
//
// Integer arithmetic only; identical input always ranks identically. The
// weights are documented in CONTRIBUTING.md — change them there and here
// together.

const WEIGHTS = {
  wholeQueryExactNameOrId: 100,
  wholeQueryExactTrigger: 60,
  wholeQuerySubstringName: 40,
  wholeQueryPartialTrigger: 30,
  tokenName: 25,
  tokenTag: 20,
  tokenCategory: 15,
  tokenTrigger: 12,
  tokenNameSubstring: 8,
  tokenDescription: 6,
  tokenInputsOutputs: 4,
  tokenDescriptionSubstring: 2,
  coverageBonusMax: 15,
  recommendedBonus: 3,
  verifiedBonus: 2,
};

export function tokenize(text) {
  return [...new Set(String(text).toLowerCase().split(/[^a-z0-9]+/).filter(Boolean))];
}

function normalizeQuery(query) {
  return String(query).toLowerCase().replace(/\s+/g, ' ').trim();
}

export function scoreEntry(query, entry) {
  const q = normalizeQuery(query);
  if (q === '') return { score: 0, matched: [] };
  const qTokens = tokenize(q);

  const name = String(entry.name || '').toLowerCase();
  const id = String(entry.id || '').toLowerCase();
  const description = String(entry.description || '').toLowerCase();
  const category = String(entry.category || '').toLowerCase();
  const tags = (entry.tags || []).map((t) => String(t).toLowerCase());
  const triggers = (entry.triggers || []).map((t) => normalizeQuery(t));

  const nameTokens = tokenize(name + ' ' + id);
  const tagTokens = new Set(tags.flatMap((t) => [t, ...tokenize(t)]));
  const categoryTokens = new Set([category, ...tokenize(category)]);
  const triggerTokens = new Set(triggers.flatMap(tokenize));
  const descriptionTokens = new Set(tokenize(description));
  const ioTokens = new Set([...(entry.inputs || []), ...(entry.outputs || [])].flatMap(tokenize));

  let score = 0;
  const matched = new Set();

  // Whole-query matches.
  if (q === name || q === id) { score += WEIGHTS.wholeQueryExactNameOrId; matched.add('name'); }
  else if (name.includes(q) || id.includes(q)) { score += WEIGHTS.wholeQuerySubstringName; matched.add('name'); }
  if (triggers.includes(q)) { score += WEIGHTS.wholeQueryExactTrigger; matched.add('triggers'); }
  else if (q.length >= 4 && triggers.some((t) => t.includes(q) || (t.length >= 4 && q.includes(t)))) {
    score += WEIGHTS.wholeQueryPartialTrigger; matched.add('triggers');
  }

  // Per-token matches.
  let matchedTokens = 0;
  for (const t of qTokens) {
    let tokenMatched = false;
    if (nameTokens.includes(t)) { score += WEIGHTS.tokenName; matched.add('name'); tokenMatched = true; }
    else if (t.length >= 3 && (name.includes(t) || id.includes(t))) { score += WEIGHTS.tokenNameSubstring; matched.add('name'); tokenMatched = true; }
    if (tagTokens.has(t)) { score += WEIGHTS.tokenTag; matched.add('tags'); tokenMatched = true; }
    if (categoryTokens.has(t)) { score += WEIGHTS.tokenCategory; matched.add('category'); tokenMatched = true; }
    if (triggerTokens.has(t)) { score += WEIGHTS.tokenTrigger; matched.add('triggers'); tokenMatched = true; }
    if (descriptionTokens.has(t)) { score += WEIGHTS.tokenDescription; matched.add('description'); tokenMatched = true; }
    else if (t.length >= 4 && description.includes(t)) { score += WEIGHTS.tokenDescriptionSubstring; matched.add('description'); tokenMatched = true; }
    if (ioTokens.has(t)) { score += WEIGHTS.tokenInputsOutputs; matched.add('inputs/outputs'); tokenMatched = true; }
    if (tokenMatched) matchedTokens++;
  }

  if (score > 0) {
    score += Math.round((matchedTokens / qTokens.length) * WEIGHTS.coverageBonusMax);
    if (entry.recommended) score += WEIGHTS.recommendedBonus;
    if (entry.status === 'verified') score += WEIGHTS.verifiedBonus;
  }

  return { score, matched: [...matched] };
}

// Stable ordering: score desc, then recommended first, then id ascending.
export function compareResults(a, b) {
  if (b.score !== a.score) return b.score - a.score;
  const ra = a.entry.recommended ? 1 : 0;
  const rb = b.entry.recommended ? 1 : 0;
  if (rb !== ra) return rb - ra;
  return a.entry.id < b.entry.id ? -1 : a.entry.id > b.entry.id ? 1 : 0;
}

export { WEIGHTS };
