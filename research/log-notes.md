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

### Session 4 — discovery round 2 (2026-08-29)

Run three days after round 1, with an authenticated `gh` available outside
the sandbox (the sandboxed `gh` still fails on TLS interception). Three
tracks, at most two agents at a time plus one deterministic script:

- **T9 — authenticated GitHub search** (`scripts/research/github-code-search.mjs`):
  36 code-search queries (`filename:SKILL.md` plus design terms) and 13
  repository-search queries, 0 errors, 600 repositories with metadata (stars,
  license, last push), 571 not previously known. The largest query families
  were dashboard design (19,840 files), typography (4,688), design tokens
  (3,496), design-system audit (2,960) and accessibility/WCAG (2,848); most
  hits are skills kept inside unrelated product repositories.
- **T10 — lead expansion** (Sonnet agent): 9 round-1 leads opened, 42 URLs,
  14 new candidates, 11 known skipped. The awesome lists and the
  officialskills.sh catalog mostly pointed back to round-1 repositories;
  genuinely new: figma/mcp-server-guide (12 skill directories, no LICENSE
  file found), WordPress/agent-skills (GPL-2.0-or-later), its-thepoe/skills
  (MIT). 404: claude-skills/claude-skills-library, oneskill/skills,
  google-labs-code/enhance-prompt and shadcn-ui (officialskills.sh
  mislabels them; they are the already-vendored stitch-skills).
- **T11 — gap-category searches** (Sonnet agent): 41 searches across ten
  families, 43 URLs, 13 new candidates, 25 known skipped. Usability testing,
  information architecture and design QA are close to keyword saturation;
  analytics, research artifacts, strategy and AI-native families still have
  named unopened threads (jahonn/pm-agent-skill, lishix520/jtbd-skills,
  wdavidturner/product-skills, a secondhand "humane agentic design" repo).

Merge: 947 unique candidates (330 from round 1, 617 new). Deterministic
triage (`research/round-2-triage.json`: keyword relevance over skill path
and description, license, stars, penalty for project-internal skill
directories) shortlists 155 candidates, 55 of them strongly.

**Saturation, restated.** The numeric rule (new unique below 10% of
cumulative) is not met: round 2 added 65%. That figure is dominated by the
code-search long tail of internal skills in unrelated products, which round
1 could not see. Read by track, the picture is mixed: lead expansion and the
saturated gap families re-surfaced known repositories, while code search
and the analytics, research-artifact, strategy and AI-native families still
produce new material. A further round should be code-search-led and
family-targeted rather than list-led.

### Session 5 — inspection waves 5-7 and round-2 curation (2026-08-29)

Three waves of two Sonnet agents each (six agent runs, two interrupted by
the session limit and resumed with their context) inspected 18 further
repositories: anthropics/knowledge-work-plugins, Owl-Listener/designpowers,
alirezarezvani/claude-skills, mckinsey/vizro, leoyeai/openclaw-master-skills,
figma/mcp-server-guide, WordPress/agent-skills, chromium/chromium
(chrome-design-system), its-thepoe/skills, coreyhaines31/marketingskills,
joeyvansommeren/journey-mapper, OneWave-AI/claude-skills,
nexu-io/html-anything, manalkaff/opendesign, yhassy/wireframe-skill,
humbleteam/design-review, humbleteam/ux-writing, takechanman1228/claude-persona,
itsual/agent-skills-collection, galaxy-dawn/claude-scholar,
kirodotdev/kirocrew and uxuiprinciples/agent-skills.

Outcomes: 39 vendor verdicts, of which 35 remain after the curator re-read
(four itsual skills dropped as templated advice); 12 Figma skills, 6
Chromium skills, Vizro's dashboard-design and two aggregation-hub skills
recorded as keepers; five uxuiprinciples skills quarantined; humbleteam's
design-review and ux-writing not vendored on exact id collisions; ~70
skills rejected inside grouped rejection manifests. Three manifests needed
curator fixes before vendoring (a truncated blob SHA, a category tag used
as a tag, two over-long descriptions).

Registry after round 2: 105 skills (98 vendored, 7 original), 52
recommended, 35 experimental, 2 draft. Repositories inspected in total: 37.

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

Second run on 2026-08-29 against the 105-skill index, top three with scores:

| Query | 1st | 2nd | 3rd |
| --- | --- | --- | --- |
| accessible forms | a11y-planner (58) | ultra11y (53) | accessible-content (50) |
| responsive dashboard | ui-design-system (52) | web-design-reviewer (48) | frontend-ui-dark-ts (45) |
| UX research synthesis | research-synthesis (145) | ux-research-workflow (134) | ux-researcher-designer (131) |
| design token audit | design-debt-audit (160) | design-system (151) | design-tokens (147) |
| agentic interface trust | agentic-ui-review (124) | conversational-ux (64) | interface-review (57) |
| design-system governance | design-system-governance (236) | design-system (161) | ui-design-system (157) |
| usability testing | synthetic-user-testing (163) | usability-testing (155) | silver-evaluate (90) |
| product analytics instrumentation | product-analytics (128) | instrumentation-plan (117) | silver-measure (108) |

All eight return a directly relevant first result; "usability testing" now resolves to the dedicated usability-testing skill.
