# Product-design skills

A researched, validated registry of agent skills for **agentic product design**:
skills that make coding and design agents (Claude Code, Codex, Cursor, OpenCode
and other [Agent Skills](https://agentskills.io)-compatible tools) better at
product strategy, user research, information architecture, interaction and
visual design, design systems, accessibility, content design, prototyping,
testing, design QA, product analytics, agentic interfaces, and design ethics.

**What this is:**

- A curated library of legally redistributable third-party skills, vendored
  with full provenance (upstream repository, path, commit SHA, license,
  retrieval date, modifications), plus clearly marked original skills that
  fill gaps.
- A machine-readable index ([catalog/index.json](catalog/index.json)), a
  generated human catalog ([CATALOG.md](CATALOG.md)), local search, and
  validation tooling. Zero runtime dependencies; everything runs on plain
  Node 18+.

**What this is not:**

- Not every design skill on the internet. It is systematically researched and
  broadly sourced, comprehensive as of the date of the latest research pass
  (see below), and built to be continuously maintainable.
- Not a product application. Nothing here executes on its own; skills are
  instructions that agents load.

**Who it is for:** anyone using an Agent Skills-compatible agent on product
work, and the agents themselves — [AGENTS.md](AGENTS.md) is the protocol an
agent follows to find and use skills from here without loading the whole
library.

## Quick start

```bash
# Search the catalog
npm run search -- "accessible forms"
npm run search -- "design tokens" --category design-systems --json

# Browse
open CATALOG.md            # generated human catalog
cat catalog/index.json     # canonical machine-readable index

# Validate the repository
npm run validate
npm run catalog:check
```

## Installing skills

Skills live in `skills/<category>/<skill-id>/` and each is a standard
[Agent Skills](https://agentskills.io/specification) directory that works when
copied anywhere on its own. Three ways to use them:

1. **Copy one skill** into your project's skill directory
   (`.claude/skills/`, `.agents/skills/`, `.cursor/skills/`,
   `.opencode/skills/` — see [docs/install/](docs/install/) for each tool):

   ```bash
   cp -r skills/accessibility/<skill-id> /path/to/project/.claude/skills/
   ```

2. **skills CLI** (77+ agents):

   ```bash
   npx skills add <owner>/skills --skill <skill-id>
   ```

3. **Claude Code plugin marketplace** — the whole library or one category:

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

Every skill in this registry went through the research pipeline documented in
[research/README.md](research/README.md): live multi-track discovery, per-file
inspection at a pinned commit, license verification at that commit, a security
review, and a scored rubric ([research/rubric.md](research/rubric.md)). The
full evidence trail is in [catalog/research-log.md](catalog/research-log.md).
Good skills that could not legally be vendored are listed in
[catalog/not-vendored.md](catalog/not-vendored.md). Overlap decisions are in
[catalog/duplicates-and-overlaps.md](catalog/duplicates-and-overlaps.md), and
known gaps in [catalog/coverage-gaps.md](catalog/coverage-gaps.md).

## Orchestration skills

Skills under `skills/orchestration/` coordinate specialists: they select the
smallest relevant set for a job (a full design review, a research synthesis, a
pre-handoff check), define the order, merge findings and produce one output.
Specialist skills stay standalone; orchestrators reference them by name.

## Licensing

The repository license ([MIT](LICENSE)) covers original skills, documentation
and tooling. Vendored third-party skills keep their upstream licenses: the
license text ships inside each skill directory and every vendored skill is
listed with full provenance in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Contributing and maintenance

See [CONTRIBUTING.md](CONTRIBUTING.md) for adding a skill (original or
vendored, including the provenance checklist) and for updating vendored skills
from upstream. All checks: `npm run validate && npm run catalog:check && npm test`.

## Catalog statistics

See [CATALOG.md](CATALOG.md) for the current per-category counts and the
alphabetical index.

Latest deep-research pass: 2026-08-26 (in progress).
