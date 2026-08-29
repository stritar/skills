# Product-design skills

A researched, validated registry of agent skills for **agentic product design**:
skills that make coding and design agents (Claude Code, Codex, Cursor, OpenCode
and other [Agent Skills](https://agentskills.io)-compatible tools) better at
product strategy, user research, information architecture, interaction and
visual design, design systems, accessibility, content design, prototyping,
testing, design QA, product analytics, agentic interfaces, and design ethics.

**What this is:**

- A curated library of legally redistributable third-party skills, vendored
  byte-for-byte at a pinned upstream commit with full provenance (repository,
  path, commit SHA, license, retrieval date, every modification), plus
  clearly marked original skills that fill gaps and coordinate specialists.
- A machine-readable index ([catalog/index.json](catalog/index.json)), a
  generated human catalog ([CATALOG.md](CATALOG.md)), local search, and
  validation tooling. Zero runtime dependencies; everything runs on plain
  Node 18+.

**What this is not:**

- Not every design skill on the internet. It is systematically researched
  and broadly sourced, comprehensive as of the latest research pass
  (2026-08-26), and built to be continuously maintainable. The research
  pass did not reach its own saturation criteria; what it did not get to is
  listed in [catalog/coverage-gaps.md](catalog/coverage-gaps.md).
- Not a product application. Nothing here executes on its own; skills are
  instructions that agents load.

**Who it is for:** anyone using an Agent Skills-compatible agent on product
work, and the agents themselves. [AGENTS.md](AGENTS.md) is the protocol an
agent follows to find and use skills from here without loading the whole
library.

## Quick start

```bash
# Search the catalog
npm run search -- "accessible forms"
npm run search -- "design tokens" --category design-systems --json
npm run search -- --category orchestration --recommended

# Browse
open CATALOG.md            # generated human catalog
cat catalog/index.json     # canonical machine-readable index

# Validate the repository
npm run validate && npm run catalog:check && npm test
```

Search ranks deterministically over name, tags, category, triggers,
description, inputs and outputs; filters: `--category`, `--tag`, `--agent`,
`--recommended`, `--source third-party|original`, `--all`, `--limit`,
`--json`.

## Catalog statistics (2026-08-26)

70 skills: 63 vendored third-party, 7 original. 33 are marked as recommended
defaults; 14 are experimental; 2 remain in draft status pending a full
line-by-line review of a bundled engine.

| Category | Skills | Category | Skills |
| --- | --- | --- | --- |
| accessibility | 10 | content-design | 3 |
| visual-design | 9 | design-engineering | 3 |
| design-systems | 9 | information-architecture | 2 |
| interaction-design | 6 | prototyping | 2 |
| testing | 6 | analytics | 2 |
| research | 5 | agentic-ui | 2 |
| design-qa | 4 | discovery | 1 |
| orchestration | 4 | strategy | 1 |
| | | ethics-and-safety | 1 |

Licenses: MIT (most), Apache-2.0 (Anthropic, Google), ISC, GPL-3.0-or-later
(four accessibility skills; the copyleft license travels with them and is
visible in the catalog so you can filter on it).

## Installing skills

Skills live in `skills/<category>/<skill-id>/` and each is a standard
[Agent Skills](https://agentskills.io/specification) directory that works when
copied anywhere on its own. Three ways to use them:

1. **Copy one skill** into your project's skill directory
   (`.claude/skills/`, `.agents/skills/`, `.cursor/skills/`,
   `.opencode/skills/`; see [docs/install/](docs/install/) for each tool):

   ```bash
   cp -r skills/accessibility/better-accessibility /path/to/project/.claude/skills/
   ```

   Copy the whole directory (SKILL.md, resource folders, LICENSE.txt).

2. **skills CLI** (77+ agents):

   ```bash
   npx skills add <owner>/skills --skill better-accessibility
   ```

3. **Claude Code plugin marketplace**, the whole library or one category
   (bundles are generated from the index):

   ```text
   /plugin marketplace add <owner>/skills
   /plugin install product-design-all@product-design-skills
   /plugin install product-design-accessibility@product-design-skills
   ```

You can also keep a local clone and point your agent at it; see
[AGENTS.md](AGENTS.md) for the reference-from-another-repository protocol and
[docs/install/](docs/install/) for per-tool directories and update
instructions.

## How skills get here

Every skill went through the research pipeline in
[research/README.md](research/README.md): live multi-track discovery (GitHub
search, registries, plugin marketplaces, awesome lists, npm, vendor seeds,
communities, non-English sources), per-file inspection at a pinned commit,
license verification at that commit, a security review, and a scored rubric
([research/rubric.md](research/rubric.md)). The complete evidence trail,
including every query, URL, rejection and inspection, is in
[catalog/research-log.md](catalog/research-log.md); the raw evidence files
and inspection manifests are committed under [research/](research/).

Good skills that could not legally or practically be vendored are listed in
[catalog/not-vendored.md](catalog/not-vendored.md). Overlap decisions and
recommended defaults are explained in
[catalog/duplicates-and-overlaps.md](catalog/duplicates-and-overlaps.md).
Known holes and the prioritised backlog are in
[catalog/coverage-gaps.md](catalog/coverage-gaps.md).

## Orchestration skills

Skills under `skills/orchestration/` coordinate specialists without
restating their rules: `product-design-review` (full review of a screen,
flow or PR across accessibility, layout, copy, visual, animation, agentic and
deceptive-pattern lenses), `ux-research-workflow` (decision to
recommendation), `pre-handoff-review` (is this buildable), and the vendored
`better-interface` (interface review across the `better-*` family). Each
selects the smallest set of specialists, states the order, merges duplicate
findings under the owning skill, and produces one output. Specialists stay
standalone; orchestrators reference them by name.

## Licensing

The repository license ([MIT](LICENSE)) covers original skills, documentation
and tooling. Vendored third-party skills keep their upstream licenses: the
license text ships inside each skill directory as `LICENSE.txt`, and every
vendored skill is listed with full provenance in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Nothing here relicenses
third-party material.

## Contributing and maintenance

[CONTRIBUTING.md](CONTRIBUTING.md) covers adding an original skill,
vendoring a third-party skill with the provenance checklist, and updating a
vendored skill from upstream (an update is a new inspection, not a blind
pull). `catalog/index.json` is the single source of truth; `CATALOG.md`,
`THIRD_PARTY_NOTICES.md` and the plugin manifests are generated from it and
checked for drift.

## Known gaps and limitations

- Discovery round 2 was not run, so the pass's saturation criteria were not
  met; a dozen high-priority leads and about fifteen candidate repositories
  remain uninspected (listed in
  [catalog/coverage-gaps.md](catalog/coverage-gaps.md)).
- `discovery`, `strategy`, `ethics-and-safety`, `analytics`, `agentic-ui`
  and `information-architecture` hold one or two skills each; usability-test
  planning, journey mapping, visual regression and data visualisation have
  no dedicated skill yet.
- Compatibility lists reflect documented conventions, not per-tool test
  runs. Skills using non-spec frontmatter fields (marked by the absence of
  `claude-ai` in `compatibility`) work in Claude Code and other tolerant
  clients but fail claude.ai upload.
- Six `silver-*` skills and several plugin87 skills are thin or coupled to
  their upstream tooling; they carry `experimental` maturity.

Latest deep-research pass: 2026-08-26.
