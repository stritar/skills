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
`migrate-design-system` were dropped for depending on a 138-file library.

## Token naming

Three vendored skills each carry a token grammar and are not edited to
agree: `design-tokens` (dotted `{category}.{property}.{variant}-{state}`,
where `action.primary` is the main affirmative action colour),
`better-colors` (hyphenated role-first CSS custom properties, `primary`
reserved for "most prominent of its group", `accent` for the brand) and
`ui-design-system` (`{category}-{property}-{variant}-{state}`, where
`color-primary-500` is the brand ramp). The original `token-naming`
(added 2026-09-11 from Romina Kavcic's Design Tokens Naming Playbook) is
the **default for choosing and declaring a grammar, tier model, scale
types, composite tokens and token documentation across categories**. It
lists the three vendored grammars as valid declared instances and records
the `primary` conflict with a procedural resolution: the project declares
one meaning in its token docs, and `better-colors` governs colour tokens
when it is loaded. Ownership elsewhere is unchanged: `better-colors` for
the colour role inventory, `design-tokens` for token values and file
layout, `token-build` for the pipeline, `design-system-governance` for
deprecation timelines and breaking-change policy.

## User research

`user-research-cookiy` is the default for planning a study and synthesizing
transcripts (both routes work offline); `survey-design` for questionnaires;
`service-blueprint` for service mapping. The six `silver-*` skills are lighter
prompts coupled to the Silver framework CLI and stay `experimental`; they are
the only vendored coverage of ideation, evaluation, measurement and
information-architecture structure, which is why original skills fill those
categories.

## Visual generation

`frontend-design` (Anthropic) is the default for aesthetic direction;
`theme-factory` for selectable themes; `diagram-design` for diagrams;
`canvas-design` and `algorithmic-art` are kept for their distinct outputs
(posters, generative art) without a recommended flag. Anthropic's
`brand-guidelines` was rejected as hard-coded to one brand.

## Round 2 additions (2026-08-29, waves 5-7)

- **Journey mapping**: `journey-mapper` (derives a map from the codebase,
  Apache-2.0) is the default; `customer-journey-mapper` (workshop-style
  seven-stage map with Mermaid output) is kept as the participant-driven
  alternative. Both relate to `service-blueprint`, which owns backstage.
- **Research planning and synthesis**: `research-planning` (designpowers) is
  the default planning specialist and `user-research-cookiy` stays the
  default for generating instruments and synthesising transcripts;
  `research-synthesis` (Anthropic knowledge-work, connector-oriented) and
  `ux-researcher-designer` (alirezarezvani, broad) are alternatives.
- **Personas**: `inclusive-personas` is the default (disability and
  situational dimensions); `persona` (synthetic panels driven by local CLI
  subprocesses, heavy Python dependencies) is `experimental`.
- **Usability evaluation**: `usability-testing` (planning and moderation)
  and `design-critique` (Kiro's NN/g-severity heuristic protocol) are the
  defaults; `synthetic-user-testing` is a rehearsal aid; itsual's templated
  `heuristic-evaluation` was dropped after re-reading.
- **Discovery**: `product-discovery` (alirezarezvani) is the default over
  the framework-coupled `silver-ideate`; `market-command-matrix` is a
  strategy alternative (`experimental`, marketing-adjacent).
- **Analytics**: `instrumentation-plan` (original) owns instrumentation,
  `product-analytics` owns analysis and dashboards, `experiment-designer`
  owns A/B design; all three recommended, `silver-measure` alternative.
  marketingskills' `analytics` and `ab-testing` were rejected as duplicates.
- **Wireframing**: `wireframe` (opendesign, divergent sketches) is the
  default; `wireframe-json` (renamed from yhassy's `wireframe`, machine-
  readable schema for Figma Make and Stitch) and `interactive-prototype`
  are alternatives; `design-and-refine` overlaps `variant`/`prototype`.
- **Design systems**: `design-system-governance` and `design-debt-audit`
  remain the defaults; Anthropic's `design-system` (connector-oriented),
  `ui-design-system` (generator) and the WordPress `wpds`/`wp-block-themes`/
  `wp-patterns` trio (GPL-2.0-or-later, platform-specific) are alternatives.
- **Handoff**: `pre-handoff-review` (original) is the default; Anthropic's
  `design-handoff` and opendesign's `handoff-to-claude-code` are
  alternatives with different outputs.
- **Onboarding and sign-up flows**: `onboarding` is recommended (nothing
  else covers it); `signup` is `experimental` (conversion-flavoured).
- **Review cluster**: `web-design-reviewer` (browser QA-and-fix loop) joins
  as an alternative; humbleteam's `design-review` (a stronger single-file
  heuristic review than plugin87's) was not vendored because of the exact
  id collision and the cluster's saturation — a candidate for a future swap.
- **Accessibility and content**: `cognitive-accessibility` and
  `accessible-content` add dimensions nothing else covered and are
  recommended; humbleteam's `ux-writing` collided with the recommended
  `ux-writing` and was weaker.
- **Motion**: `design-motion-principles` (three-practitioner audit) is an
  alternative to `animate`/`review-animations`; `apple-hig-expert` an
  alternative to `apple-design`.

## Round 3 additions (2026-11-09)

- **`make-interfaces-feel-better` is `better-ui`.** Jakub Krehel
  publishes the same skill twice: once inside `jakubkrehel/skills` as
  `better-ui` (vendored) and once as the standalone repository
  `jakubkrehel/make-interfaces-feel-better` (3.9k stars, MIT). The two
  carry near-identical descriptions and opening text and the same section
  split (typography, surfaces, animations, icons, performance). The
  standalone edition is **not** vendored; `better-ui` stays the single
  copy. This matters because the standalone repo is far more visible than
  the monorepo and is cited directly by craft.gustavofior.com, so it will
  keep resurfacing in discovery.
- **Same-author duplication is now a known pattern.** Jakub Krehel also
  ships `jakubkrehel/oklch-skill` separately from `better-colors`. Unlike
  the case above, that one is genuinely narrower (hex/rgb/hsl conversion,
  gamut boundaries, Tailwind v4 theming) rather than a re-release, so it is
  inspected on its own merits against `better-colors` and
  `design-tokens`.
- **Faux product UI: `stageshow` is its own niche.** `stageshow`
  (benjitaylor, MIT) builds believable product interfaces as marketing
  stills, feature cards, bento grids and cursor walkthroughs. It sits near
  `make-a-deck` (slide decks) and `interactive-prototype` (a clickable app
  that behaves like the real thing), but the three outputs do not compete:
  a slide, a working prototype and a product shot are wanted in different
  places. All three are linked through `relatedSkills`; no `recommended`
  default changes. Vendored whole, `kit/brands/` included: `BrandMark` is a
  kit component backed by that SVG registry and `scripts/film-checks.mjs`
  flags `invented mark` when a real company name appears without its real
  artwork, so dropping the artwork would break enforced behaviour, and no
  reason in the modifications vocabulary covers it. The bundled artwork is
  not all MIT: `assets/app-icons.ts` is carved out of the skill's own
  licence, and `kit/brands/` mixes SVGL (MIT), payment-icons (Apache-2.0),
  Simple Icons and Cryptocurrency Icons (CC0 1.0) with official Linear,
  American Express and Circle marks under each company's brand-usage terms.
  Upstream co-locates the evidence (four `LICENSE-*.txt`,
  `kit/brands/SOURCES.md` with a SHA-256 per asset, `NOTICE.md`,
  `examples/wikipedia/PHOTOS.md`), which is the `canvas-design` precedent,
  so `source.license` stays `MIT` and no schema change was made. Status
  stays `draft`: `scripts/film-checks.mjs` (137 KB) and
  `scripts/motion-watch.mjs` (31 KB) were sample-reviewed, not read line by
  line, the same posture as `review-a11y` and `ultra11y`.

Pending triage from round 3, to be recorded here once inspected:

- `raphaelsalaja/skills` (25 skills) against `better-colors`,
  `better-writing`, `animate`, `variant`, `prototype` and
  `better-ui`. `color`, `copy`, `motion`, `prototype` and
  `defaults` are the likely overlaps; `icons`, `frames`, `viewports`,
  `alignment`, `lab` and `match` are the likely additions.
- `paragonhq/stealth-skills` (15) and `mattjmdesign/design-engineering`
  (14) against the same set — both cover type, space, surface and review.
- `smukh/a11y-agent-skills` (12) against the ten-skill accessibility group
  already recorded above.
- `miguelclavel/ux-research-skills` (18) against the user-research group.
- `equinor/design-engineering-skills` typography and spacing skills against
  `better-typography`, `token-naming` and `design-tokens`.
- `jakubkrehel/skills` `state-machine` against `raphaelsalaja/skills`
  `lab` — both render every component state on a throwaway page.
- `emilkowalski/skills` `remove-animations` against the vendored
  `improve-animations`. Note `emil-design-eng` was already declined in
  round 2 and should not be re-proposed.

## Not vendored because a better skill exists

Recorded in the inspection manifests:
plugin87 `design-code`, `design-component`, `design-qa`, `governance`,
`redesign`, `ux-writing`, `prototype` (exact id collision with a stronger
skill); silver-design-framework `silver-map`, `silver-pitch`, `silver-voice`,
`silver-theme`, `silver-system`, `silver-visualize`, `silver-prototype` and
others; emilkowalski `emil-design-eng`; Google Stitch `generate-design`,
`code-to-design`, `manage-design-system`, `upload-to-stitch` (all gated on the
Stitch MCP with no standalone path).
