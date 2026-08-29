## Method and sessions

Research pass of 2026-08-26, executed by Claude (Fable 5) in Claude Code with
live web access, with Sonnet subagents for repository inspection. Sources
fall into three classes, tagged on every candidate:

- **supplied** — named in the task brief (jakubkrehel/skills as a structural
  reference) or handed to agents as seeds to re-verify (anthropics/skills).
- **remembered-then-verified** — known before research but opened and
  verified live during this pass.
- **fresh** — discovered through this pass's searches and link-following.

Nothing was vendored from memory: every vendored file was fetched from
`raw.githubusercontent.com` at a commit SHA resolved during the pass and
read by an inspection agent before its manifest was written; the vendoring
script re-fetched every file at that SHA and verified git blob SHAs where the
manifest recorded them.

### Totals

| Measure | Value |
| --- | --- |
| Searches recorded in raw track files | 134 (track summaries reported more; the files hold what each agent wrote before finishing) |
| URLs opened, recorded in raw track files | 376 |
| Unique candidates after merge | 328, from 243 unique repositories or packages |
| Knowledge source | 312 fresh, 2 remembered-then-verified, 14 supplied |
| Last-activity range of candidates (GitHub `pushed_at`) | 2026-01-24 to 2026-08-26 |
| Repositories inspected file-by-file at a pinned commit | 19 |
| Inspection verdicts | 63 vendor, 46 skills rejected inside grouped rejection manifests, 8 further rejections, 4 not-vendored keepers, 1 quarantine |
| Vendored | 63 skills (57 byte-identical to upstream; 6 with recorded modifications: bundled shared files, excluded proprietary fonts, one repointed link, two namespace renames) |
| Dropped after vendoring | 3 (brandkit, migrate-design-system, acr-reporting: not self-contained) |
| Original skills | 7 (4 gap-fillers, 3 orchestrators) |
| Final registry | 70 skills across 17 categories |

### Session 0 — environment scouting (2 Explore agents)

- jakubkrehel/skills inspected via the GitHub API and raw fetches: tree, all
  11 SKILL.md files, AGENTS.md conventions, MIT license, plugin manifests,
  distribution paths (skills CLI, Claude Code marketplace); 4,426 stars, last
  push 2026-08-24.
- Agent Skills ecosystem verified against official documentation:
  agentskills.io specification (six frontmatter fields), per-tool install
  directories (Claude Code, Codex, Cursor, OpenCode, Amp, Gemini CLI,
  Copilot, VS Code), anthropics/skills licensing split, vercel-labs/skills
  CLI behaviour, skills.sh API auth-gating, skillpm.dev registry.

### Session 1 — discovery round 1 (8 parallel tracks)

Tracks: T1 GitHub repository/topic search, T2 registries, T3 plugin
marketplaces, T4 awesome lists, T5 npm, T6 official seeds and author sweeps,
T7 communities and blogs, T8 non-English (zh, ja, ko, es, pt). The workflow
was interrupted three times by the account's session usage limit and resumed
each time; agents that died after writing their evidence file but before
reporting were re-run, so `research/raw/round-1/T5.json` holds the re-run's
smaller result set (17 candidates) while `candidates.json` retains the 70
candidates merged from the first run. Per-track query, URL and rejection
lists with reasons are in the raw files and reproduced in the discovery
sections below.

Inaccessible during the pass: grep.app API (HTTP 429 bot challenge),
sourcegraph.com search (403 unauthenticated), GitHub code search (login
required), skills.sh JSON API (Vercel OIDC token required; HTML pages used
instead), superdesigndev/superdesign-platform (404), the npm search tail
beyond 1,000 results for `keywords:agent-skills`.

### Session 2 — inspection

A 12-agent inspection workflow failed on the session limit after writing 13
manifests; those were consolidated first. Inspection then continued in three
waves of two Sonnet agents each (user constraint: at most two concurrent
agents, cheapest suitable model), covering 19 repositories in total. Each
inspection resolved the HEAD commit, fetched the tree (API, or codeload
tarball once the shared API quota was exhausted), read every text file of
each candidate skill, verified the license text at the pinned commit, ran a
security review for hidden instructions, credential access and
download-and-execute scripts, and scored the rubric. Evidence per repository
is in the inspection sections below.

Notable outcomes: brand-guidelines (Anthropic) rejected as single-brand;
baoyu-design rejected because its core prompt was extracted from a
proprietary product bundle; three plugin87 and zivtech skills dropped after
the validator showed they were not self-contained; zivtech's per-skill
Apache-2.0 frontmatter overridden by the repository's GPL-3.0-or-later.

### Session 3 — curation and synthesis (main session)

Overlap groups resolved and recorded in `catalog/duplicates-and-overlaps.md`;
33 skills marked recommended; 14 experimental; 2 left as draft (ultra11y
engine sample-reviewed only). Seven original skills written for the empty or
one-skill categories and for orchestration, each citing its sources.

### Saturation

**Not reached.** The criteria in `research/README.md` require a second
discovery round with under 10% new unique candidates and no unopened
high-priority leads. Round 2 was not run (user decision to conserve usage),
and round 1 closed with at least twelve high-priority leads unopened, listed
in `catalog/coverage-gaps.md`. Signals that some query families were
converging: the same top repositories recurred across GitHub search
phrasings for design systems and accessibility; the npm keyword families
were harvested to the API cap. Families with few or no results:
product analytics and instrumentation (3 candidates), design ethics (2),
agentic interfaces (4), information architecture (5 small repositories),
usability testing (none dedicated).

### Canonical search verification

Appended after the final validation run; see the end of this log.

Run on 2026-08-26 against the final index (`node scripts/search.mjs "<query>" --limit 3`),
top three results with deterministic scores:

| Query | 1st | 2nd | 3rd |
| --- | --- | --- | --- |
| accessible forms | a11y-planner (58) | ultra11y (53) | better-accessibility (33) |
| responsive dashboard | frontend-ui-dark-ts (45) | better-layout (33) | break (33) |
| UX research synthesis | ux-research-workflow (134) | user-research-cookiy (127) | silver-research (89) |
| design token audit | design-debt-audit (160) | design-tokens (147) | extract-design-md (144) |
| agentic interface trust | agentic-ui-review (124) | conversational-ux (64) | interface-review (57) |
| design-system governance | design-system-governance (236) | extract-design-md (139) | motion-system (129) |
| usability testing | silver-evaluate (90) | break (48) | design-review (38) |
| product analytics instrumentation | instrumentation-plan (117) | silver-measure (108) | product-design-review (45) |

Every query returns at least one directly relevant skill in the top three.
"usability testing" surfaces evaluation and stress-test skills because no
dedicated usability-test planning skill exists yet (see `coverage-gaps.md`).

Upstream spot-check (same day): better-typography, frontend-design,
survey-design, a11y-check-code and laws-of-ux re-fetched at their pinned
commits are byte-identical to the vendored copies, and every pinned commit
resolves on GitHub. The online link check reported one dead link inside an
upstream file (zivtech's own README reference), recorded as a warning.
