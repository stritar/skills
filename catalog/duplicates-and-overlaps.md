# Duplicates and overlaps

When several skills solve the same problem, one is chosen as the
`recommended` default (workflow quality, scope, maintenance) and alternatives
are kept only when they take a meaningfully different approach. This file
records those decisions so they are not silently re-litigated. Every group is
also linked through `relatedSkills` in `catalog/index.json`.

Decisions taken on 2026-08-26 after inspection waves 1-3 (63 vendored skills).

## Accessibility reviews (10 skills)

Compared: `better-accessibility` (jakubkrehel, single-file engineering
reference with severity ladder), `a11y-check-code` / `a11y-check-page` (ymrl,
WCAG 2.2 checklists for source and live pages, bundled axe-core),
`review-a11y` / `ultra11y` (maxgfr, deterministic AST engine over a diff or a
whole repo), `a11y-planner` / `a11y-critic` / `a11y-role-audit` /
`perspective-audit` (zivtech, GPL-3.0-or-later, long protocol-driven
lifecycle skills), `a11y-audit` (plugin87, 20-line skill with contrast and
render scripts).

- **Default for reviewing UI code**: `better-accessibility`. Standalone,
  spec-clean frontmatter, integrates with `better-interface`.
- **Default for testing a running page**: `a11y-check-page` (bundles axe-core
  4.12, MPL-2.0 header intact, Playwright required).
- **Default before code exists**: `a11y-planner` (pre-implementation
  accessibility spec), paired with `a11y-critic` afterwards.
- Kept as alternatives: `a11y-check-code` (manual checklist with import
  tracing, no engine), `review-a11y` and `ultra11y` (engine-driven; status
  stays `draft` because the ~150 KB bundled engine was sample-reviewed, not
  read line by line), `a11y-role-audit` and `perspective-audit` (team-role and
  disability-dimension lenses, explicitly complementary), `a11y-audit` (thin,
  but its scripts are useful; `experimental`).
- The GPL skills are legally redistributable; the copyleft license is surfaced
  in the catalog so consumers can filter on it.

## Change review and design QA (8 skills)

Compared: `interface-review` + `better-interface` (diff-scoped review handing
up to an orchestrator that owns severity, cap and verdict),
`frontend-design-review` (Microsoft, severity-scored PR review with design
system and WCAG compliance checks), `design-details` (single generalist audit
protocol), `design-review` (plugin87, Nielsen heuristics, 23 lines),
`critique-information-density`, `silver-evaluate`, `break`.

- **Default for reviewing a change**: `interface-review`, which routes to
  `better-interface` and the six `better-*` specialists. The most complete
  ownership model (every rule lives in exactly one skill).
- **Default for a standalone PR review without the `better-*` family
  installed**: `frontend-design-review`.
- Alternatives: `design-details` (different protocol: token-first rule,
  persisted project context), `design-review` (heuristic scoring; thin,
  `experimental`), `critique-information-density` (one lens), `silver-evaluate`
  (framework-coupled, `experimental`). `break` is a stress-test procedure, not
  a review, and is recommended on its own.

## Typography, color, layout and UI polish

`better-typography`, `better-colors`, `better-layout`, `better-ui` are the
defaults for their domains; nothing vendored competes directly. `laws-of-ux`
is a principles reference that complements rather than replaces them.
`platform-conventions` (iOS/Android) and `better-layout` (web) split by
platform. `motion-system` (token-level motion scales) and `better-ui`
(implementation recipes) sit at different altitudes and are both kept.

## Animation (7 skills from emilkowalski/skills vs. jakubkrehel/skills)

`animate` and `better-ui` share several exact CSS values; `animate` adds a
should-it-animate gate and a cheapest-tool ladder, so it is the **default for
building animation**, and `review-animations` the **default for reviewing
it**. `better-ui` stays the default for general visual polish.
`animate-expo` (React Native), `animation-vocabulary` (reference),
`find-animation-opportunities` and `improve-animations` (audit and plan) are
kept as distinct steps; `apple-design` is the default for iOS-feel work.
The rejected `emil-design-eng` was a near-duplicate of `animate` +
`apple-design` with embedded self-promotion.

## Variant pickers: `variant` vs. `prototype`

Near-identical concept (several real variants behind a picker, promote the
winner). `variant` is the **default** because it ties each variant axis to
the owning `better-*` skill and gates on `better-interface` accessibility
triggers. `prototype` is kept: self-contained, with richer picker wiring
(URL persistence, keyboard navigation, riff/keep continuation).

## Interface copy: `better-writing` vs. `ux-writing`

Different jobs, both recommended: `better-writing` reviews interface copy in
code (verb-first buttons, error placement, capitalization policy) and hands
off to `better-interface`; `ux-writing` produces content-design deliverables
(voice charts, pattern templates, content usability checklist). The plugin87
`ux-writing` skill was rejected as the thinner of the two with the same name.
`localization-design` is orthogonal (expansion, RTL) and recommended.

## Design-system operations

`design-system-governance` and `design-debt-audit` (Owl-Listener) are the
defaults for governance and audits. `design-tokens`, `token-build` and
`figma-integration` (plugin87) are thin wrappers around bundled scripts and
are `experimental`. `extract-design-md` (Google Stitch) is the default for
extracting a DESIGN.md from an existing codebase. plugin87's `governance`
was rejected as thinner than `design-system-governance`; its `brandkit` and
`migrate-design-system` were dropped for depending on a 138-file library
(see `not-vendored.md`).

## User research

`user-research-cookiy` is the default for planning a study and synthesizing
transcripts (both routes work offline); `survey-design` for questionnaires;
`service-blueprint` for service mapping. The six `silver-*` skills are lighter
prompts coupled to the Silver framework CLI and stay `experimental`; they are
the only vendored coverage of ideation, evaluation, measurement and
information-architecture structure, which is why original skills fill those
categories (see `coverage-gaps.md`).

## Visual generation

`frontend-design` (Anthropic) is the default for aesthetic direction;
`theme-factory` for selectable themes; `diagram-design` for diagrams;
`canvas-design` and `algorithmic-art` are kept for their distinct outputs
(posters, generative art) without a recommended flag. Anthropic's
`brand-guidelines` was rejected as hard-coded to one brand.

## Not vendored because a better skill exists

Recorded in the inspection manifests (`research/manifests/*-rejections.json`):
plugin87 `design-code`, `design-component`, `design-qa`, `governance`,
`redesign`, `ux-writing`, `prototype` (exact id collision with a stronger
skill); silver-design-framework `silver-map`, `silver-pitch`, `silver-voice`,
`silver-theme`, `silver-system`, `silver-visualize`, `silver-prototype` and
others; emilkowalski `emil-design-eng`; Google Stitch `generate-design`,
`code-to-design`, `manage-design-system`, `upload-to-stitch` (all gated on the
Stitch MCP with no standalone path).
