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
  (2026-08-29, two discovery rounds), and built to be continuously
  maintainable. The passes did not reach their own numeric saturation
  criterion; what they did not get to is listed in
  [catalog/coverage-gaps.md](catalog/coverage-gaps.md).
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
open docs/index.html       # searchable web catalog, works straight from disk
open CATALOG.md            # generated human catalog
cat catalog/index.json     # canonical machine-readable index

# Validate the repository
npm run validate && npm run catalog:check && npm test
```

Search ranks deterministically over name, tags, category, triggers,
description, inputs and outputs; filters: `--category`, `--tag`, `--agent`,
`--recommended`, `--source third-party|original`, `--all`, `--limit`,
`--json`.

## Browsing on the web

`docs/index.html` is a generated, searchable edition of the catalog: every
skill as a card grouped by category, with the tasks it is for, filters for
tooling, licence and origin, and a page per skill carrying the full `SKILL.md`
text and a copyable install command. It has no build step and no dependencies,
so opening the file from a clone works as well as serving it. The search box
uses the same ranking code as the CLI, so both agree on what comes first.

To publish it, point GitHub Pages at "deploy from branch", `main`, `/docs`.

## Catalog statistics (2026-08-29)

105 skills: 98 vendored third-party, 7 original. 52 are marked as
recommended defaults; 35 are experimental; 2 remain in draft status pending
a full line-by-line review of a bundled engine.

| Category | Skills | Category | Skills |
| --- | --- | --- | --- |
| visual-design | 13 | design-engineering | 6 |
| research | 12 | prototyping | 6 |
| design-systems | 12 | design-qa | 5 |
| accessibility | 11 | analytics | 4 |
| interaction-design | 10 | content-design | 4 |
| testing | 9 | orchestration | 4 |
| | | discovery, strategy, agentic-ui, information-architecture | 2 each |
| | | ethics-and-safety | 1 |

Licenses: MIT (most), Apache-2.0 (Anthropic, Google, journey-mapper), ISC,
GPL-3.0-or-later (four accessibility skills) and GPL-2.0-or-later (three
WordPress skills); copyleft licenses travel with their skills and are
visible in the catalog so you can filter on them.

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
   npx skills add stritar/skills --skill better-accessibility
   ```

3. **Claude Code plugin marketplace**, the whole library or one category
   (bundles are generated from the index):

   ```text
   /plugin marketplace add stritar/skills
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

- Two discovery rounds ran (2026-08-26 and 2026-08-29; 947 unique
  candidates, 37 repositories inspected file by file). The numeric
  saturation rule was not met because authenticated code search keeps
  surfacing skills kept inside unrelated product repositories; a triaged
  shortlist of 155 candidates awaits inspection (see
  [catalog/coverage-gaps.md](catalog/coverage-gaps.md)).
- `ethics-and-safety`, `agentic-ui`, `strategy`, `discovery` and
  `information-architecture` hold one or two skills each; cognitive
  walkthroughs, visual regression, data visualisation and decision records
  have no dedicated skill yet.
- Twelve official Figma skills and five uxuiprinciples skills were found
  but not vendored because their repositories carry no license file; they
  are listed in [catalog/not-vendored.md](catalog/not-vendored.md).
- Compatibility lists reflect documented conventions, not per-tool test
  runs. Skills using non-spec frontmatter fields (marked by the absence of
  `claude-ai` in `compatibility`) work in Claude Code and other tolerant
  clients but fail claude.ai upload.
- Thirty-five skills carry `experimental` maturity: thin single-file
  skills, skills coupled to their upstream tooling (the `silver-*` family,
  WordPress, opendesign), or heavy dependencies (`persona`).

Latest deep-research pass: 2026-08-29.
