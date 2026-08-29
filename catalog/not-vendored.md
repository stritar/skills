# Not vendored

Skills that were evaluated as useful but are **not** included in this
repository, because redistribution rights could not be verified or the
license forbids it. They may still be worth using directly from their source
under that source's terms.

Each entry records: name, URL, purpose, and the reason it was not vendored.
Candidates awaiting license clarification stay here until resolved.

## Awaiting license clarification

### design-auditor

- URL: https://github.com/Ashutos1997/claude-design-auditor-skill
- Purpose: 19-category design audit (scoring, severity ranking, ethics and
  dark-pattern checks, Figma MCP integration); prose-only, 18 markdown files.
- Inspected: 2026-08-26 at commit `e7a1f3153d8e7cbf485924a1b92b6110aa0be299`;
  rubric relevance 3, quality 3. Security review clean.
- Reason not vendored: the only license statement is a README sentence
  ("MIT - use it, fork it, build on it"). There is no LICENSE file,
  package.json, or SPDX declaration at the pinned commit and the GitHub API
  reports no license. A README claim alone does not meet this repository's
  redistribution bar. Action: ask the author to add a LICENSE file, then
  re-inspect.

## Better installed from source

### impeccable

- URL: https://github.com/pbakaus/impeccable (npm: `impeccable`)
- Purpose: design-guidance system for coding agents — one skill with 23
  commands, 59 deterministic anti-pattern detectors and live browser
  iteration. Apache-2.0, verified at commit
  `63b04e2530f5c7b41ea83c133daab24f34912456`; rubric relevance 3, quality 3.
- Reason not vendored: the installable skill is a 153-file, 3.4 MB package
  materialized per provider, with scripts that call external APIs
  (`generate-image.mjs` posts to api.openai.com) and a bundled runtime. It is
  outside the scope of a byte-copied skill directory and would go stale
  immediately; it is designed to be installed with `npx impeccable` or
  `npx skills add pbakaus/impeccable`. Legally redistributable; kept out for
  portability and maintenance reasons only.
