# Contributing

Two ways a skill enters this registry: vendored from an upstream repository
through the research pipeline, or written here as an original. Both end with
the same validation gate.

## The gate (all contributions)

```bash
npm run validate && npm run catalog:check && npm test
```

All three must pass. `validate` enforces the schema, index↔filesystem
agreement, frontmatter rules, taxonomy conformance, provenance completeness,
a secret scan and link resolution; `catalog:check` proves the generated files
match `catalog/index.json`.

`npm run catalog:build` regenerates `CATALOG.md`, `THIRD_PARTY_NOTICES.md` and
`.claude-plugin/*` from the index.

The documentation site in `site/` needs no step of its own. It reads the skill
files and the index when it builds, so CI publishes a new or changed skill with
the next deploy. To preview one, run `npm run dev` in `site/`, with
`npm run content:watch` in a second terminal to pick up edits.
`tests/docs-content.test.mjs`, part of `npm test`, checks that every skill gets
a page and that every relative link in its Markdown resolves.

## Adding an original skill

1. Pick the category directory (see `catalog/taxonomy.md`) and create
   `skills/<category>/<skill-id>/SKILL.md`. The id is lowercase kebab-case and
   must equal the frontmatter `name`.
2. Frontmatter uses only the six [Agent Skills spec](https://agentskills.io/specification)
   fields (`name`, `description`, `license`, `compatibility`, `metadata`,
   `allowed-tools`) so the skill is portable everywhere. Set `license: MIT`.
3. Keep SKILL.md under 500 lines. Depth goes into `references/`, `scripts/`,
   or `assets/`, one level deep, each file linked from the exact point in
   SKILL.md where it is needed.
4. The description must say what the skill does *and when to use it*, and end
   with a `Triggers on <term, term, …>` list so description-based skill
   discovery works.
5. Cross-reference other skills by bare backticked id (`` `some-skill` ``),
   never by path — skill directories ship standalone.
6. Original skills must cite their sources in the body and must not copy
   unlicensed text. Mark limitations explicitly.
7. Add the entry to `catalog/index.json` with `source.type: "original"`,
   `source.license: "MIT"`, null provenance fields, and honest
   `tags`/`triggers`/`inputs`/`outputs`. Run `npm run catalog:build`.

## Vendoring a third-party skill

Discovery evidence, inspection manifests and the research log live in the
maintainer's private research archive. Every vendored skill follows these
rules:

1. Verify the license **at the pinned commit SHA** — a LICENSE file in the
   skill directory or repo root, or an unambiguous machine-readable
   declaration. A README claim alone is not enough. If redistribution rights
   are unclear, the skill is not vendored.
2. Copy the files byte-identical from that SHA, including the upstream
   license text as `LICENSE.txt` in the skill directory. Do not restyle,
   reformat, or "improve" upstream content.
3. Modifications are allowed only for: compatibility, security, portability,
   broken-reference, defect, collision-rename. Record each one in the index
   entry's `source.modifications` with date, reason, description and files.
4. Fill the complete `source` block: repository, url, author, license
   (SPDX id), licenseFile, upstreamPath, upstreamCommit (40-hex), retrievedAt.
5. Run `npm run catalog:build` and the gate. New entries start as
   `status: "draft"`; `verified` requires a completed inspection.

## Updating a vendored skill from upstream

1. Find the entry in `catalog/index.json`; its `source` block names the
   upstream path and the pinned commit.
2. Fetch the upstream repository's current HEAD; diff the upstream path
   against the local copy.
3. Re-inspect the changed files — an update is a new inspection, not a blind
   pull. Re-verify the license at the new SHA.
4. Update the files, `source.upstreamCommit` and `source.retrievedAt`; keep
   `source.modifications` accurate (upstream updates do not
   clear local modification records unless the upstream absorbed them).
5. Run the gate.

## Search ranking

`scripts/lib/ranking.mjs` holds the deterministic weights (name > tags >
category > triggers > description > inputs/outputs, plus whole-query and
coverage bonuses). If you change weights, update the tests in
`tests/ranking.test.mjs` in the same change.

## Deduplication policy

When two skills solve the same problem, the stronger workflow becomes the
`recommended` default; alternatives stay only if they take a meaningfully
different approach. Record every such decision in
`catalog/duplicates-and-overlaps.md` and link the skills via `relatedSkills`.
Do not add near-identical copies.
