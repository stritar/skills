#!/usr/bin/env node
// Merges raw discovery-track output (research/raw/round-*/T*.json) into the
// deduplicated candidate queue research/candidates.json, preserving statuses
// already assigned to known candidates.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from '../lib/index-io.mjs';

const RAW_DIR = join(ROOT, 'research', 'raw');
const OUT = join(ROOT, 'research', 'candidates.json');

function normalizeId(c) {
  // Prefer gh:owner/repo#path form; fall back to whatever the track used.
  let id = String(c.candidateId || '').trim();
  id = id.replace(/\.git(#|$)/, '$1').replace(/\/+#/, '#').replace(/\/+$/, '');
  if (id.startsWith('gh:')) id = id.toLowerCase();
  return id;
}

const existing = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : { candidates: [] };
const byId = new Map(existing.candidates.map((c) => [c.candidateId, c]));

let filesRead = 0;
const perRound = {};
for (const round of readdirSync(RAW_DIR).sort()) {
  const roundDir = join(RAW_DIR, round);
  for (const file of readdirSync(roundDir).sort()) {
    if (!file.endsWith('.json')) continue;
    const data = JSON.parse(readFileSync(join(roundDir, file), 'utf8'));
    filesRead++;
    for (const c of data.candidates ?? []) {
      const id = normalizeId(c);
      if (!id) continue;
      perRound[round] = (perRound[round] ?? 0) + 1;
      const found = byId.get(id);
      if (found) {
        if (!found.foundBy.includes(`${round}/${data.track}`)) found.foundBy.push(`${round}/${data.track}`);
      } else {
        byId.set(id, {
          candidateId: id,
          name: c.name ?? null,
          repoUrl: c.repoUrl ?? null,
          skillPath: c.skillPath ?? null,
          ref: c.ref ?? null,
          categoryGuess: c.categoryGuess ?? null,
          licenseHint: c.licenseHint ?? 'unknown',
          stars: c.stars ?? null,
          lastActivity: c.lastActivity ?? null,
          whyRelevant: c.whyRelevant ?? null,
          discoveredVia: c.discoveredVia ?? null,
          knowledgeSource: c.knowledgeSource ?? 'fresh',
          notes: c.notes ?? null,
          foundBy: [`${round}/${data.track}`],
          status: 'pending', // pending | inspecting | vendored | rejected | quarantined | not-vendored-keeper
          statusNote: null,
        });
      }
    }
  }
}

const candidates = [...byId.values()].sort((a, b) => (a.candidateId < b.candidateId ? -1 : 1));
const stats = {
  rawFilesRead: filesRead,
  totalUnique: candidates.length,
  byStatus: candidates.reduce((acc, c) => { acc[c.status] = (acc[c.status] ?? 0) + 1; return acc; }, {}),
  candidateMentionsPerRound: perRound,
};
writeFileSync(OUT, JSON.stringify({ stats, candidates }, null, 2) + '\n');
console.log(`merged ${filesRead} raw files -> ${candidates.length} unique candidates`);
console.log(JSON.stringify(stats, null, 2));
