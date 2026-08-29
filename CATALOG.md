# Skill catalog

<!-- GENERATED FILE — do not edit. Source of truth: catalog/index.json. Regenerate with `npm run catalog:build`. -->

52 skills (52 vendored third-party, 0 original).

Search locally instead of reading this whole file: `npm run search -- "your query"`. The machine-readable index is [catalog/index.json](catalog/index.json).

## Contents

- [Start here](#start-here)
- [Suggested bundles](#suggested-bundles)
- [User research](#user-research) (2)
- [Product strategy](#product-strategy) (1)
- [Interaction design](#interaction-design) (5)
- [Visual design](#visual-design) (8)
- [Design systems](#design-systems) (8)
- [Accessibility](#accessibility) (10)
- [Content design](#content-design) (3)
- [Prototyping](#prototyping) (2)
- [Testing and evaluation](#testing-and-evaluation) (5)
- [Design QA](#design-qa) (4)
- [Agentic and AI-native UI](#agentic-and-ai-native-ui) (1)
- [Design engineering](#design-engineering) (2)
- [Orchestration](#orchestration) (1)
- [Recommended defaults](#recommended-defaults)
- [Alphabetical index](#alphabetical-index)

## Start here

1. Search: `npm run search -- "accessible forms"` (or filter: `--category accessibility`, `--recommended`).
2. Read the whole `SKILL.md` of each selected skill, and any file it links.
3. Load the smallest set of skills that covers the task; orchestration skills coordinate specialists for multi-step reviews.

Good entry points:

- [`better-interface`](skills/orchestration/better-interface/SKILL.md) — Cross-discipline interface-review orchestrator: resolves review scope, routes a screen or flow to the sibling better-accessibility, better-layout, better-writing, better-typography, better-colors and better-ui skills in a fixed order, requires evidence (file:line, not visual claims from source alone), applies one shared HIGH/MEDIUM/LOW severity scale with a fixed list of escalation triggers that are always HIGH on sight, prefers the cheapest fix (delete, use the platform, reuse a token, correct the value, add), consolidates systemic findings into one row per root cause with a 15-finding cap, and issues a single Block/Approve verdict. Hands off change-scoped (branch/PR/uncommitted) reviews to interface-review rather than resolving them itself.

## Suggested bundles

- **better-interface** ([`better-interface`](skills/orchestration/better-interface/SKILL.md)): see skill

## User research

### `service-blueprint`

Makes the agent map service delivery as a five-lane blueprint (physical evidence, user actions, frontstage, backstage, support processes) separated by lines of interaction, visibility, and internal interaction; a nine-step construction process from scoping one scenario to validation with operations teams; a blueprint-vs-journey-map decision table; and diagnostic reading rules (gaps between lanes, dense backstage clusters, single points of failure, silent user waits).

- **Path**: [skills/research/service-blueprint/SKILL.md](skills/research/service-blueprint/SKILL.md)
- **Use when**: service blueprint; map frontstage and backstage; diagnose service failures; multi-channel service design; operations behind the journey
- **Inputs**: journey map or research, process documentation, stakeholder input
- **Outputs**: service blueprint, failure-point findings, coordination artifact
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/ux-strategy/skills/service-blueprint) @ `20e34c4` by Owl-Listener, MIT
- **Status**: draft, stable
- **Tags**: service-blueprint, journey-mapping, stakeholders

### `survey-design`

Makes the agent design survey instruments that produce trustworthy data: when surveys are and are not the right method, question-type selection table with cautions, rewrite patterns for leading/double-barreled/loaded questions, Likert/NPS/SUS scale rules (labelled endpoints, midpoints, verbatim SUS), sample-size guidance (~385 responses for +-5% margin at 95% confidence), and an analysis plan covering distributions, theme coding, and cross-tabulation.

- **Path**: [skills/research/survey-design/SKILL.md](skills/research/survey-design/SKILL.md)
- **Use when**: write a survey; design survey questions; NPS or SUS question; is this question leading; quantify research findings; sample size for a survey
- **Inputs**: research goals, draft questions, target population
- **Outputs**: survey instrument, question rewrites, sampling and analysis plan
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/design-research/skills/survey-design) @ `20e34c4` by Owl-Listener, MIT
- **Status**: draft, stable
- **Tags**: surveys, quantitative, user-research, metrics

## Product strategy

### `design-negotiation`

Makes the agent coach a designer through cross-functional negotiations: four scripted contexts (timeline compression, scope cut without review, stakeholder override, resource requests) each with a concrete approach; an evidence hierarchy (research counts, metrics, competitive context, WCAG/legal risk, system precedent) replacing taste and authority arguments; negotiation principles (lead with the user problem, name constraints first, make trade-offs explicit, document decisions that go against design); and long-term credibility building.

- **Path**: [skills/strategy/design-negotiation/SKILL.md](skills/strategy/design-negotiation/SKILL.md)
- **Use when**: push back on scope cut; defend a design decision; stakeholder wants a change; negotiate design timeline; argue for design resources
- **Inputs**: the decision at stake, available evidence, stakeholder context
- **Outputs**: negotiation approach, evidence-based argument, documented trade-off
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/designer-toolkit/skills/design-negotiation) @ `20e34c4` by Owl-Listener, MIT
- **Status**: draft, stable
- **Tags**: stakeholders, prioritization, decision-records, metrics

## Interaction design

### `animate` ⭐

Builds a web animation from scratch in the order that determines whether it feels right: a frequency-based should-it-animate-at-all gate (100+/day actions never animate), a required one-word purpose (feedback, spatial consistency, state indication, preventing a jarring change, explanation, or delight), a cheapest-tool-first ladder (CSS transition to @starting-style to CSS animation to WAAPI to a motion library), exact easing curves and duration budgets by element type, transform/opacity-only property rules, interruption and exit rules, and mandatory reduced-motion and hover gating -- plus ready-to-build recipes for buttons, dropdowns, modals, drawers, toasts, accordions, stagger, hold-to-confirm, tab indicators, scroll reveal and drag-to-dismiss.

- **Path**: [skills/interaction-design/animate/SKILL.md](skills/interaction-design/animate/SKILL.md)
- **Use when**: add an animation to this component; make this feel alive; build a transition; animate this modal or dropdown; should this animate
- **Inputs**: a request to animate a specific UI element or interaction, the project's existing motion tokens and libraries, if any
- **Outputs**: implementation code (CSS, WAAPI, or a motion library call), a short rationale: gate result, ingredients (tool/properties/curve/duration), and what to feel-check
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/animate) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: draft, stable, recommended default
- **Tags**: motion, animation, micro-interactions, interaction-design, performance

### `animate-expo` ⭐

Builds animations in React Native and Expo apps, applying the same should-it-animate gate and named-purpose requirement as the web animate skill but adapted to mobile's three constraints: no hover, two runtimes (RN vs. UI thread), and a finger on the element. Picks the cheapest tool from Reanimated CSS transitions/animations through layout animations to gesture-driven shared values, gives exact spring configs (Apple's duration+dampingRatio form) and easing curves, enforces keeping motion off the JS thread (never setState in a gesture handler, scheduleOnRN not runOnJS), covers press/haptics/reduced-motion rules specific to touch, and provides ready recipes for sheets, swipe-to-delete, collapsing headers, list entrances, keyboard-synced UI and screen transitions.

- **Path**: [skills/interaction-design/animate-expo/SKILL.md](skills/interaction-design/animate-expo/SKILL.md)
- **Use when**: animate something in this Expo app; add a gesture-driven bottom sheet; React Native animation stutters on device; add haptics to this interaction; screen transition in Expo Router
- **Inputs**: a request to animate an Expo/React Native component, gesture, sheet, or screen transition
- **Outputs**: implementation code using Reanimated, Gesture Handler, Expo Router, and expo-haptics, a short rationale: gate result, ingredients (tool/properties/spring or curve/thread), and what to feel-check on a real device
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/animate-expo) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: draft, stable, recommended default
- **Tags**: motion, animation, micro-interactions, mobile, interaction-design, performance

### `animation-vocabulary`

Reverse-lookup glossary that turns a vague, feel-based description of a web animation or motion effect ('the bouncy thing when a popover opens', 'the iOS rubber-band scroll') into its precise, quotable term, organized into ten categories (entrances/exits, sequencing, transforms, state transitions, scroll, feedback, easing, springs, looping, polish, performance, and design principles) with a disambiguation method for near-synonymous terms like clip-path vs. mask or pop-in vs. bounce.

- **Path**: [skills/interaction-design/animation-vocabulary/SKILL.md](skills/interaction-design/animation-vocabulary/SKILL.md)
- **Use when**: what's this animation called; name this motion effect; what's the term for this transition; how do I describe this effect to an AI
- **Inputs**: a loose, sensation-based description of an animation or motion effect
- **Outputs**: the matching glossary term with its definition, plus close alternates and how they differ when ambiguous
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/animation-vocabulary) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: draft, stable
- **Tags**: motion, animation, terminology, interaction-design

### `apple-design`

Apple's approach to fluid, physical interface motion and design foundations, distilled from WWDC design talks (Designing Fluid Interfaces, Designing Audio-Haptic Experiences, The Details of UI Typography, Principles of Great Design) and translated to web APIs (Pointer Events, requestAnimationFrame, spring libraries). Covers response/latency elimination, 1:1 direct manipulation, interruptibility as the core principle, Apple's damping-ratio/response spring parameters with concrete values, velocity handoff and momentum projection formulas, spatial consistency, rubber-banding, translucent materials and depth layering, multimodal (motion+sound+haptic) feedback rules, reduced-motion/transparency/contrast handling, and size-specific typography tracking and leading -- closing with Apple's eight design principles (purpose, agency, responsibility, familiarity, flexibility, simplicity, craft, delight).

- **Path**: [skills/interaction-design/apple-design/SKILL.md](skills/interaction-design/apple-design/SKILL.md)
- **Use when**: make this drag interaction feel like Apple's; build a spring-based gesture; translucent material / glass UI; Apple-style bottom sheet; interruptible animation with velocity handoff
- **Inputs**: a gesture-driven, spring-animated, or materials-heavy UI component to build or review
- **Outputs**: implementation guidance and code (spring configs, velocity/momentum formulas, backdrop-filter recipes) plus a quick-reference table of technique to concrete value
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/apple-design) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: draft, stable
- **Tags**: motion, animation, interaction-design, typography

### `platform-conventions`

Makes the agent design native mobile UI against the actual conventions of iOS (Human Interface Guidelines) and Android (Material Design 3): side-by-side comparison tables for navigation models, controls, typography, gestures, and iconography; a decision framework for when to follow each platform strictly, when to unify cross-platform, and the hybrid middle path; and explicit anti-patterns (suppressing iOS swipe-back, transplanting the FAB to iOS, ignoring Dynamic Type/sp scaling).

- **Path**: [skills/interaction-design/platform-conventions/SKILL.md](skills/interaction-design/platform-conventions/SKILL.md)
- **Use when**: design an iOS app screen; Android vs iOS pattern; Material Design conventions; native app navigation; should this app follow platform conventions; cross-platform design decisions
- **Inputs**: app screens or mockups, target platforms, product context
- **Outputs**: platform-appropriate design recommendations, iOS/Android component mapping, convention-deviation flags
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/ui-design/skills/platform-conventions) @ `20e34c4` by Owl-Listener, MIT
- **Status**: draft, stable
- **Tags**: mobile, ui-design, interaction-design, navigation, adaptive

## Visual design

### `algorithmic-art`

Directs the agent to create generative p5.js art in two steps: write a named algorithmic-philosophy manifesto (computational process, noise/particle/field approach, seeded variation) as a .md file, then implement it as a single self-contained interactive HTML artifact built from a required starting template that fixes the Anthropic-branded sidebar UI (seed navigation, parameter sliders, color pickers, action buttons) while leaving the p5.js algorithm, parameters, and controls fully custom to the philosophy. Enforces reproducibility via explicit randomSeed/noiseSeed usage.

- **Path**: [skills/visual-design/algorithmic-art/SKILL.md](skills/visual-design/algorithmic-art/SKILL.md)
- **Use when**: create generative art; make algorithmic art with p5.js; build a flow field or particle system artifact; create an interactive seeded art piece
- **Inputs**: a subtle creative brief or theme to interpret, no real content required -- the skill invents the algorithmic direction
- **Outputs**: an algorithmic-philosophy .md file (4-6 paragraphs), a single self-contained interactive HTML artifact (p5.js algorithm + seed/parameter/color controls) usable directly in a browser or as a claude.ai artifact
- **Dependencies**: browser
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [anthropics/skills](https://github.com/anthropics/skills/tree/3b3fad96af16a10759d930941b4520ba0c40edae/skills/algorithmic-art) @ `3b3fad9` by Anthropic, Apache-2.0
- **Status**: draft, stable
- **Tags**: illustration, color, visual-hierarchy, visual-polish

### `better-colors` ⭐

Color-system design and audit guidance: ramps named by role rather than picked by eye (neutral/accent/status), a two-tier primitive-then-semantic token naming grammar, perceptual ramp-generation rules (constant hue, even perceived lightness, vividness peaking mid-ramp), APCA and WCAG 2 contrast thresholds with a report-don't-repaint measurement discipline, gradient interpolation-space choices, P3/sRGB gamut fallbacks, dark-mode derivation rules, and a calibrated severity report format ending in Block/Approve.

- **Path**: [skills/visual-design/better-colors/SKILL.md](skills/visual-design/better-colors/SKILL.md)
- **Use when**: build a color palette; name design tokens for color; check contrast ratio; dark mode colors; color ramp generation; audit a codebase's colors
- **Inputs**: a brand color or existing palette, UI source code or rendered screens to audit
- **Outputs**: ramp values in the project's notation, token naming scheme (primitive + semantic tiers), severity-ranked findings table ending in Block/Approve
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/better-colors) @ `ca48385` by Jakub Krehel, MIT
- **Status**: draft, stable, recommended default
- **Tags**: color, design-tokens, token-naming, semantic-tokens, dark-mode, themes, contrast

### `better-layout` ⭐

Layout-structure guidance for web interfaces: grouping by negative space with a 2x inter/intra-group gap ratio, keeping controls visually distinct from static content, shared-edge alignment, logical (RTL-safe) properties over physical left/right, importance-ordered content, progressive-disclosure affordances (peeking scroll items, disclosure controls), breakpoints driven by content rather than device presets, container queries, safe-area-aware full-bleed vs. floating-control layering, and string-growth/clipping resilience, closing with a calibrated severity report ending in Block/Approve.

- **Path**: [skills/visual-design/better-layout/SKILL.md](skills/visual-design/better-layout/SKILL.md)
- **Use when**: structure this page layout; review layout spacing and alignment; what collapses at small sizes; RTL layout review; breakpoint strategy
- **Inputs**: UI component or page source code, supported viewport list
- **Outputs**: severity-ranked findings table (Severity | Location | Before | After | Why), Block/Approve verdict
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/better-layout) @ `ca48385` by Jakub Krehel, MIT
- **Status**: draft, stable, recommended default
- **Tags**: layout, spacing, responsive, adaptive, visual-hierarchy

### `better-typography` ⭐

Web typography guidance: font-format and weight-loading rules, CSS properties over raw variable-font/OpenType tags, type-scale construction with descending heading steps, line-height and letter-spacing by role, measure capping (60-75 characters), text-wrap balance/pretty usage, tabular numbers, truncation without losing content, smart punctuation, from-font underline metrics, the 16px iOS input-zoom fix (two documented approaches), font-smoothing and bidi/lang/dir handling, closing with a calibrated severity report ending in Block/Approve, plus a CSS-to-Tailwind cheat sheet for every declaration covered.

- **Path**: [skills/visual-design/better-typography/SKILL.md](skills/visual-design/better-typography/SKILL.md)
- **Use when**: set up a type scale; review typography and font choices; fix text truncation; iOS input zoom on mobile; variable font setup
- **Inputs**: UI component or page source code, rendered page for wrapping/widow checks
- **Outputs**: severity-ranked findings table (Severity | Location | Before | After | Why), Block/Approve verdict, CSS-to-Tailwind property lookup
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/better-typography) @ `ca48385` by Jakub Krehel, MIT
- **Status**: draft, stable, recommended default
- **Tags**: typography, spacing, visual-hierarchy

### `better-ui` ⭐

Design-engineering polish guidance for making interfaces feel finished: concentric border-radius math, optical over geometric alignment, shadows-for-elevation vs. borders-for-structure, interruptible CSS transitions vs. one-shot keyframes, split-and-stagger enter animations with subtle exits, exact contextual icon cross-fade values (scale/opacity/blur, spring bounce 0), theme-switch transition suppression, transition-property specificity and will-change usage, icon stroke-weight matching to adjacent text and RTL icon-flip rules, and image-outline recipes, closing with a calibrated severity report ending in Block/Approve.

- **Path**: [skills/visual-design/better-ui/SKILL.md](skills/visual-design/better-ui/SKILL.md)
- **Use when**: polish this UI; interface feels off; add enter/exit animation; icon transition on state change; border radius mismatch; theme switch transition
- **Inputs**: UI component source code, rendered interface for slow-motion animation review
- **Outputs**: severity-ranked findings table (Severity | Location | Before | After | Why), Block/Approve verdict
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/better-ui) @ `ca48385` by Jakub Krehel, MIT
- **Status**: draft, stable, recommended default
- **Tags**: micro-interactions, motion, animation, visual-polish, iconography, performance

### `canvas-design`

Directs the agent to create standalone visual art (poster-style .pdf or .png output) in two steps: first write a named visual-philosophy manifesto (color/form/composition direction, explicitly emphasizing craftsmanship language) as a .md file, then express that philosophy on a canvas using minimal, design-forward typography pulled from the bundled canvas-fonts library, with a refinement pass before final output. Ships 26 SIL-OFL-licensed font families for use in the generated artwork.

- **Path**: [skills/visual-design/canvas-design/SKILL.md](skills/visual-design/canvas-design/SKILL.md)
- **Use when**: design a poster; create a piece of visual art; make a PDF design with a strong aesthetic; generate a design philosophy and express it visually
- **Inputs**: a subtle creative brief or theme to interpret, no real content required -- the skill invents the visual direction
- **Outputs**: a design-philosophy .md file (4-6 paragraphs), a finished .pdf or .png poster/art piece using bundled fonts
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [anthropics/skills](https://github.com/anthropics/skills/tree/3b3fad96af16a10759d930941b4520ba0c40edae/skills/canvas-design) @ `3b3fad9` by Anthropic, Apache-2.0
- **Status**: draft, stable
- **Tags**: typography, color, layout, visual-hierarchy, illustration, visual-polish

### `frontend-design` ⭐

Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Directs the agent to work in two passes (a compact color/type/layout/signature token plan, self-critiqued against generic AI-design defaults, then implementation), names three specific overused AI-generated aesthetic clusters to avoid unless the brief calls for them, and gives concrete rules for typography pairing, structural devices, deliberate motion, CSS specificity pitfalls, and end-user-facing UX writing (active voice, consistent verb-to-toast naming, non-apologetic error copy).

- **Path**: [skills/visual-design/frontend-design/SKILL.md](skills/visual-design/frontend-design/SKILL.md)
- **Use when**: design a landing page; make this UI look distinctive; avoid generic AI-generated design; pick a typography and color direction; critique my design plan before building; write UX copy for this interface
- **Inputs**: a design brief or existing UI to redesign, any known audience/brand context in memory
- **Outputs**: a token plan (4-6 named hex colors, 2+ type roles, layout concept, signature element), a self-critique noting what was revised and why, implemented UI code (markup/CSS) following the revised plan, UX copy for labels, errors, and empty states
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [anthropics/skills](https://github.com/anthropics/skills/tree/3b3fad96af16a10759d930941b4520ba0c40edae/skills/frontend-design) @ `3b3fad9` by Anthropic, Apache-2.0
- **Status**: draft, stable, recommended default
- **Tags**: typography, color, layout, visual-hierarchy, ui-design, interaction-design, responsive, motion, ux-writing, voice-and-tone

### `theme-factory`

Applies one of 10 curated color-palette + font-pairing themes (each with named hex colors, header/body font roles, and recommended use cases, shown via a theme-showcase.pdf) to slide decks, documents, or HTML artifacts, or generates a new custom theme on the fly when none of the presets fit, following a show-choices / confirm / apply workflow.

- **Path**: [skills/visual-design/theme-factory/SKILL.md](skills/visual-design/theme-factory/SKILL.md)
- **Use when**: apply a theme to this deck; pick a color and font palette for this document; show me theme options; generate a custom theme for this artifact
- **Inputs**: an existing artifact/deck/document to style, optional description of desired mood for a custom theme
- **Outputs**: a styled artifact using the chosen theme's colors and fonts, for custom themes, a new theme spec (palette + font pairing) shown for confirmation before applying
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [anthropics/skills](https://github.com/anthropics/skills/tree/3b3fad96af16a10759d930941b4520ba0c40edae/skills/theme-factory) @ `3b3fad9` by Anthropic, Apache-2.0
- **Status**: draft, stable
- **Tags**: themes, color, typography, visual-polish

## Design systems

### `design-debt-audit`

Makes the agent run a structured design debt audit: five debt categories (visual, structural, accessibility, documentation, implementation), a five-step process from screenshot inventory through classification (severity/category/frequency/effort) to a prioritized remediation plan scored as severity x frequency / effort, split into quick wins, structural projects, accessibility fixes, and documented write-offs, plus a living debt register with owners and quarterly review.

- **Path**: [skills/design-systems/design-debt-audit/SKILL.md](skills/design-systems/design-debt-audit/SKILL.md)
- **Use when**: design debt audit; UI inconsistency inventory; prioritise design cleanup; audit design drift; remediation plan for design debt
- **Inputs**: product screens, design system reference, engineering effort estimates
- **Outputs**: classified debt inventory, prioritized remediation plan, debt register
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/design-ops/skills/design-debt-audit) @ `20e34c4` by Owl-Listener, MIT
- **Status**: draft, stable
- **Tags**: audit, design-system, remediation, severity, prioritization

### `design-system-governance`

Makes the agent define how a design system evolves: seven core governance questions, three ownership models (centralized/federated/hybrid) with trade-offs, a seven-stage contribution lifecycle from proposal to communicated release, semver as the consumer contract with a patch/minor/major table, a deprecation process with timelines and in-product warnings, breaking-change policy (migration guides, codemods, shims), and component quality entry standards.

- **Path**: [skills/design-systems/design-system-governance/SKILL.md](skills/design-systems/design-system-governance/SKILL.md)
- **Use when**: design system governance; contribution model; deprecate a component; design system versioning; breaking change policy
- **Inputs**: design system state, team structure, change proposals
- **Outputs**: governance model, contribution process, versioning and deprecation policy
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/design-systems/skills/design-system-governance) @ `20e34c4` by Owl-Listener, MIT
- **Status**: draft, stable
- **Tags**: design-system, governance, versioning, migration, component-docs

### `design-tokens`

Generates, extends, or audits design tokens in DTCG format ($type/$value) using a 3-tier architecture (primitive, raw values never used directly; semantic, purpose aliases; component, component-scoped). Reads the project's token-and-color and typography-and-spacing rules to apply a 4px base spacing grid, a Major Third type scale, and OKLCH-based palette generation, verifying that any new palette's mid shade clears 4.5:1 on white for text and a darker shade clears 3:1 for UI use. Covers colors, typography, spacing, shadows, borders, breakpoints, motion, gradients, opacity, blur, sizing, states, and multi-brand/density theming, and runs a JSON-validity-and-alias-resolution script before calling the work done.

- **Path**: [skills/design-systems/design-tokens/SKILL.md](skills/design-systems/design-tokens/SKILL.md)
- **Use when**: generate a color palette; set up design tokens; define a type scale; validate our token files; multi-brand theming
- **Inputs**: An existing tokens/ directory to extend, or a brief for a new palette, Target platforms/brands needing theming
- **Outputs**: DTCG-format token JSON (primitive/semantic/component tiers) with $description preserved, A validation pass confirming JSON validity and alias resolution
- **Dependencies**: python
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [plugin87/ux-ui-agent-skills](https://github.com/plugin87/ux-ui-agent-skills/tree/2ffb677aa02b225c8a3da1b7f31d9ebb7c38f1dd/.claude/skills/design-tokens) @ `2ffb677` by plugin87, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: draft, experimental
- **Tags**: design-tokens, token-naming, semantic-tokens, design-system, color, typography, spacing, dark-mode, multi-brand

### `figma-integration`

Keeps Figma and code in sync by mapping the project's 3-tier DTCG tokens to Figma Variables: three Figma collections (Primitives, Semantic, Component) mirroring the token tiers, with dark/brand/density variance modeled as Figma Modes. Requires picking exactly one authoritative sync direction (code-to-Figma publish, or Figma-to-code extract via Tokens Studio or the Variables REST API) so the non-authoritative side is always generated, never hand-edited. When a Figma MCP server is connected, prefers its tools for reading frames/variables/screenshots and wiring Code Connect. Verifies component parity (Figma variants/properties must cover every design-system variant, size, and the full state set) and that every Figma Variable resolves to a real token with no orphan hex values.

- **Path**: [skills/design-systems/figma-integration/SKILL.md](skills/design-systems/figma-integration/SKILL.md)
- **Use when**: sync tokens with Figma; push components to Figma; pull a Figma design into code; set up Figma Variables from our tokens; check design-code drift
- **Inputs**: The project's DTCG token files, A connected Figma file or Figma MCP server (optional)
- **Outputs**: A token-to-Figma-Variable collection/mode mapping, A stated authoritative sync direction, A component parity report (variant/state coverage gaps)
- **Dependencies**: python, figma-mcp
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [plugin87/ux-ui-agent-skills](https://github.com/plugin87/ux-ui-agent-skills/tree/2ffb677aa02b225c8a3da1b7f31d9ebb7c38f1dd/.claude/skills/figma-integration) @ `2ffb677` by plugin87, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: draft, experimental
- **Tags**: figma, figma-to-code, design-tokens, design-system, component-api, multi-brand

### `frontend-ui-dark-ts`

A complete dark-theme design-token and component system for React + Tailwind CSS + Framer Motion applications: CSS custom properties and Tailwind config for brand/neutral/text/border/status/data-viz color scales, spacing/radius/shadow/z-index scales, glassmorphism utility classes, and Framer Motion timing/easing presets, plus ready-to-use TSX source for Button, Input, Card, Badge, Dialog, Tabs, Avatar, Checkbox, Select, and Toast components, and page-layout patterns (app shell, responsive mobile drawer, dashboard, list/tabs/settings-form templates, empty states, skeleton loaders) built for dashboards and admin panels.

- **Path**: [skills/design-systems/frontend-ui-dark-ts/SKILL.md](skills/design-systems/frontend-ui-dark-ts/SKILL.md)
- **Use when**: build a dark-themed React dashboard; set up design tokens for a dark UI; need a glassmorphism component library; create an admin panel with Tailwind and Framer Motion
- **Inputs**: a React + TypeScript + Vite project to apply the theme to
- **Outputs**: Tailwind config and CSS custom properties implementing the token system, reusable TSX UI components (Button, Input, Card, Badge, Dialog, Tabs, Avatar, Checkbox, Select, Toast), page-layout templates (app shell, dashboard, list, tabs, settings form, empty/loading states)
- **Dependencies**: node
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [microsoft/skills](https://github.com/microsoft/skills/tree/7066b58141d8cc66f39356b2ee5bb64d428dcf17/.github/plugins/azure-sdk-typescript/skills/frontend-ui-dark-ts) @ `7066b58` by Microsoft, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: draft, stable
- **Tags**: design-tokens, component-api, component-docs, pattern-library, dark-mode, color, typography

### `motion-system`

Makes the agent define motion as a token layer rather than one-off animations: a named duration scale (50-600ms with use cases), easing tokens with actual cubic-bezier values mapped to semantic uses, choreography rules (30-50ms stagger, 500ms sequence cap, direction consistency), a system-level prefers-reduced-motion strategy using a global duration override token, and implementation guidance for CSS custom properties inside the token export pipeline.

- **Path**: [skills/design-systems/motion-system/SKILL.md](skills/design-systems/motion-system/SKILL.md)
- **Use when**: motion tokens; standardise animation durations; easing system; reduced motion strategy; motion design system
- **Inputs**: existing animations or components, design token setup
- **Outputs**: duration and easing token tables, choreography rules, reduced-motion overrides
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/design-systems/skills/motion-system) @ `20e34c4` by Owl-Listener, MIT
- **Status**: draft, stable
- **Tags**: motion, animation, design-tokens, design-system, micro-interactions

### `pick-ui-library`

Curated, opinionated lookup table matching a frontend UI task (toasts, command menus, OTP inputs, charts, drag and drop, virtualization, state management, conditional styling, theme switching, and more) to one recommended library, with instructions to identify the task rather than the library the user named, check package.json before suggesting a dependency change, and recommend exactly one library with a one-sentence rationale rather than presenting a menu. Includes a table of common mismatches to catch, such as a hand-rolled toast or an unstyled div-based dropdown with manual focus handling.

- **Path**: [skills/design-systems/pick-ui-library/SKILL.md](skills/design-systems/pick-ui-library/SKILL.md)
- **Use when**: what library should I use for toasts; pick a component library for this dropdown; which state management library should I use; recommend a charting library
- **Inputs**: a frontend UI task description, the project's package.json for already-installed libraries
- **Outputs**: one recommended library with a one-sentence rationale, or an explicit note that the task falls outside the curated list
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/pick-ui-library) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: draft, stable
- **Tags**: pattern-library, component-api, design-system

### `token-build`

Sets up or runs the build pipeline that turns the project's DTCG tokens/*.json source of truth into platform-ready artifacts: CSS custom properties, a Tailwind v4 @theme block, typed JS/TS, an iOS Asset Catalog plus Color/Spacing extensions, and Android colors.xml/Compose theme. Picks between Style Dictionary (the default, multi-platform), Tokens Studio (when tokens are Figma-owned), a W3C DTCG exporter, or a small custom script; resolves aliases to final per-platform values, keeps primitives internal while exposing semantic/component tokens, and emits dark/brand/density variants as deltas only rather than full duplicate files. Wires CI to validate and regenerate on token changes and to fail if committed artifacts drift from a fresh regeneration, gating any color change through a contrast check.

- **Path**: [skills/design-systems/token-build/SKILL.md](skills/design-systems/token-build/SKILL.md)
- **Use when**: generate CSS variables from our tokens; set up a Style Dictionary pipeline; export tokens to iOS and Android; wire token validation into CI; build Tailwind theme from tokens
- **Inputs**: DTCG token source files (tokens/*.json), Target platform(s) for generated artifacts
- **Outputs**: Platform-specific generated theme files (CSS, Tailwind, JS/TS, iOS, Android), A CI step that validates tokens and fails on stale generated artifacts
- **Dependencies**: node, python
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [plugin87/ux-ui-agent-skills](https://github.com/plugin87/ux-ui-agent-skills/tree/2ffb677aa02b225c8a3da1b7f31d9ebb7c38f1dd/.claude/skills/token-build) @ `2ffb677` by plugin87, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: draft, experimental
- **Tags**: design-tokens, design-system, versioning, multi-brand, governance

## Accessibility

### `a11y-audit`

Audits a UI or design against WCAG 2.2 AA/AAA and documented ARIA patterns, producing a criterion-referenced findings table (WCAG criterion, P0/P1/P2 severity, what fails, specific fix). Directs the agent to check the mandatory P0 set (keyboard nav, visible focus >=3:1, screen-reader name/role/state, 4.5:1 text / 3:1 UI contrast, >=24x24 target size, no color-only signaling) plus WCAG 2.2 additions (Focus Not Obscured, Target Size, Accessible Authentication), and to measure contrast rather than eyeball it: a Playwright-based real-render gate over every text element and every interactive element's default/hover/focus states, plus a standalone hex-pair contrast calculator, with instructions to report only actually-measured ratios.

- **Path**: [skills/accessibility/a11y-audit/SKILL.md](skills/accessibility/a11y-audit/SKILL.md)
- **Use when**: accessibility audit; WCAG check; contrast verification; keyboard and screen-reader review; does this meet WCAG 2.2 AA
- **Inputs**: A UI, component, or rendered HTML page to audit, Target conformance level (AA or AAA)
- **Outputs**: A findings table: WCAG criterion, severity (P0/P1/P2), what fails, specific fix, Explicit confirmation of passing checks, Measured contrast ratios (not estimated)
- **Dependencies**: python, node
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [plugin87/ux-ui-agent-skills](https://github.com/plugin87/ux-ui-agent-skills/tree/2ffb677aa02b225c8a3da1b7f31d9ebb7c38f1dd/.claude/skills/a11y-audit) @ `2ffb677` by plugin87, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: draft, experimental
- **Tags**: a11y, wcag, aria, screen-reader, keyboard, focus-management, contrast, audit, remediation

### `a11y-check-code`

Reviews source files (HTML, JSX, TSX, Vue, Svelte, templates) for WCAG 2.2 AA accessibility issues without external dependencies: traces imported components (depth 3, max 50 files) to see final rendered markup, enumerates every conditional/state variation before checking, applies a fixed ID'd checklist (SPEC/VIS/KBD/RFL/SEM/AXE) by observation type rather than by file, computes contrast ratios with a bundled Node script instead of estimating them, and writes a severity-rated (Critical/Major/Normal/Minor) Markdown report with file:line evidence, user-impact statements, and an explicit list of items that cannot be verified from code alone and must be checked on a live page.

- **Path**: [skills/accessibility/a11y-check-code/SKILL.md](skills/accessibility/a11y-check-code/SKILL.md)
- **Use when**: a11y check this component; check accessibility of this code; review this PR for accessibility; WCAG 2.2 AA audit of source code; check for accessibility issues before merge
- **Inputs**: source files (HTML/JSX/TSX/Vue/Svelte/templates) to review, the imported component tree reachable from the target file
- **Outputs**: severity-rated Markdown report with file:line findings and user-impact statements, contrast-ratio calculations from the bundled scripts/contrast.mjs, list of items requiring live-page verification, handed off to a11y-check-page
- **Dependencies**: node
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [ymrl/a11y-check-skills](https://github.com/ymrl/a11y-check-skills/tree/a59f48bbe72c1c4ec710e86ae19f8b39fa4b44f6/skills/a11y-check-code) @ `a59f48b` by ymrl, ISC
- **Status**: draft, stable
- **Tags**: a11y, wcag, contrast, keyboard, focus-management, semantic-html, forms, severity, audit, remediation

### `a11y-check-page`

Audits a live, running web page for WCAG 2.2 AA accessibility using browser automation (Playwright MCP, Chrome DevTools MCP, or playwright-cli): runs the bundled axe-core build, walks keyboard focus order in both directions, injects CSS/viewport changes to test 200% zoom, 320px reflow, and text-spacing, inspects the accessibility tree, and re-runs checks per distinct UI state (modals, loading, errors). Enforces credential-safety rules for login-gated pages (never store or echo credentials, screenshot only pre-input states, explicit permission before destructive actions) and writes a severity-rated Markdown report to a11y-report/ with screenshots saved under a11y-report/assets/.

- **Path**: [skills/accessibility/a11y-check-page/SKILL.md](skills/accessibility/a11y-check-page/SKILL.md)
- **Use when**: check this URL's accessibility; audit this live page for WCAG; test keyboard navigation on this page; run axe-core against this site; a11y check after login
- **Inputs**: target URL(s) and, when login is required, credentials/steps provided by the user, confirmation of test vs. production environment and whether destructive actions are permitted
- **Outputs**: severity-rated Markdown report in a11y-report/ with screenshots in a11y-report/assets/, per-state axe-core, keyboard-focus, and accessibility-tree findings, list of items excluded from automated testing (e.g. screen-reader behavior, seizure thresholds)
- **Dependencies**: node, browser, playwright, axe-core
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [ymrl/a11y-check-skills](https://github.com/ymrl/a11y-check-skills/tree/a59f48bbe72c1c4ec710e86ae19f8b39fa4b44f6/skills/a11y-check-page) @ `a59f48b` by ymrl, ISC
- **Status**: draft, stable
- **Tags**: a11y, wcag, aria, keyboard, focus-management, contrast, severity, audit, remediation

### `a11y-critic`

Reviews accessibility design decisions in an existing component, flow, or interface after automated compliance checks already pass — catching what axe-core/Pa11y miss: incomplete ARIA patterns, incoherent focus management, and state-communication gaps. Runs a 10-phase protocol (pre-commitment predictions, semantic HTML audit, ARIA pattern compliance, focus management analysis, state communication audit, multi-perspective review across screen-reader/keyboard-only/low-vision/cognitive users) and produces findings with severity (CRITICAL/MAJOR/MINOR/ENHANCEMENT), file:line evidence, affected user group, and a WCAG 2.2 or WAI-ARIA APG citation, ending in a verdict of ACCEPT, ACCEPT-WITH-RESERVATIONS, REVISE, or REJECT.

- **Path**: [skills/accessibility/a11y-critic/SKILL.md](skills/accessibility/a11y-critic/SKILL.md)
- **Use when**: critique this accessibility plan; review this component's accessibility design; is this ready to ship accessibility-wise?; check ARIA pattern completeness; review focus management before merge
- **Inputs**: an existing component, flow, or interface (code or a written accessibility plan) that has already passed automated accessibility checks
- **Outputs**: findings list with severity, file:line evidence, affected user group, and WCAG/APG citation, a verdict: ACCEPT / ACCEPT-WITH-RESERVATIONS / REVISE / REJECT
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [zivtech/accessibility-skills](https://github.com/zivtech/accessibility-skills/tree/817dedeae90324017ece2d2b104332aec9d20656/.claude/skills/a11y-critic) @ `817dede` by zivtech, GPL-3.0-or-later
- **Status**: draft, stable
- **Tags**: a11y, wcag, aria, keyboard, focus-management, screen-reader, semantic-html, severity, design-critique, expert-review

### `a11y-planner`

Designs an accessible implementation before code is written: runs a 9-phase protocol covering scope/context, semantic structure, WAI-ARIA Authoring Practices Guide pattern mapping for every interactive widget, focus management (tab order, modal traps, restoration, roving tabindex), state communication to assistive technology, visual accessibility (contrast, touch targets, motion), content accessibility (alt text, link text, form labels), a testing strategy, and an implementation task breakdown with review checkpoints. Every decision cites a WCAG 2.2 success criterion or APG pattern section. Guards against nine known failure modes (e.g. per-event live-region spam, color-only state indicators, title-attribute-only accessible names). Writes the plan to docs/a11y-plans/YYYY-MM-DD-<feature-name>-a11y-plan.md.

- **Path**: [skills/accessibility/a11y-planner/SKILL.md](skills/accessibility/a11y-planner/SKILL.md)
- **Use when**: design accessible interaction for this component; plan the accessibility approach for this modal/combobox/tabs; write an a11y spec before we build this; WAI-ARIA pattern for this widget; prepare for a WCAG 2.2 AA audit
- **Inputs**: a description of the component, flow, or interface to be built, the target compliance level and known constraints (framework, existing design system)
- **Outputs**: a Markdown accessibility plan (docs/a11y-plans/YYYY-MM-DD-<feature-name>-a11y-plan.md) with semantic structure, APG pattern table, focus plan, state-communication table, and task breakdown, a WCAG-EM audit-scope variant for Section 508 conformance sampling when requested
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [zivtech/accessibility-skills](https://github.com/zivtech/accessibility-skills/tree/817dedeae90324017ece2d2b104332aec9d20656/.claude/skills/a11y-planner) @ `817dede` by zivtech, GPL-3.0-or-later
- **Status**: draft, stable
- **Tags**: a11y, wcag, aria, keyboard, focus-management, contrast, semantic-html, forms, inclusive-design

### `a11y-role-audit`

Runs an ARRM-based (W3C WAI Accessibility Requirements-to-Roles Mapping) accessibility review through six responsibility-based lenses — visual design, UX design, front-end development, content authoring, business analysis, and testing — to produce findings attributed to the team role best positioned to catch and fix each barrier, rather than a single generic pass/fail. Supports three modes: design review (mockups/specs before implementation), implementation review (code through each role's lens), and finding attribution (assigning ownership of existing accessibility gaps). Findings are rated CRITICAL, MAJOR, MINOR, or ENHANCEMENT (AAA-level).

- **Path**: [skills/accessibility/a11y-role-audit/SKILL.md](skills/accessibility/a11y-role-audit/SKILL.md)
- **Use when**: who should fix this accessibility issue; role-based accessibility audit; attribute this a11y finding to a team; review this mockup for accessibility by role; ARRM accessibility review
- **Inputs**: a design mockup/spec, or implemented code, to review through each of the six role lenses
- **Outputs**: role-attributed findings table (role, barrier, severity, WCAG/ARRM reference), ownership assignment for existing accessibility gaps
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [zivtech/accessibility-skills](https://github.com/zivtech/accessibility-skills/tree/817dedeae90324017ece2d2b104332aec9d20656/.claude/skills/a11y-role-audit) @ `817dede` by zivtech, GPL-3.0-or-later
- **Status**: draft, stable
- **Tags**: a11y, wcag, aria, keyboard, contrast, semantic-html, severity, design-critique, expert-review

### `better-accessibility` ⭐

Accessibility engineering guidance for building or reviewing UI components and custom widgets: native-element-first ARIA rules, exact focus-ring and tabindex/roving-tabindex recipes, WCAG 2.5.8 hit-area sizing with pseudo-element expansion, form labeling and error-announcement patterns, prefers-reduced-motion and autoplay/zoom rules, live-region and screen-reader announcement selection, alt-text-by-purpose table, and a calibrated HIGH/MEDIUM/LOW severity report format ending in Block/Approve.

- **Path**: [skills/accessibility/better-accessibility/SKILL.md](skills/accessibility/better-accessibility/SKILL.md)
- **Use when**: accessibility audit; a11y review; keyboard navigation broken; screen reader not announcing; focus ring missing; WCAG compliance check
- **Inputs**: UI component or screen source code, rendered interface for keyboard/screen-reader walkthrough
- **Outputs**: severity-ranked findings table (Severity | Location | Before | After | Why), Block/Approve verdict, verification checklist with Not verified items flagged
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/better-accessibility) @ `ca48385` by Jakub Krehel, MIT
- **Status**: draft, stable, recommended default
- **Tags**: a11y, wcag, aria, screen-reader, keyboard, focus-management, contrast, forms, semantic-html, inclusive-design, remediation

### `perspective-audit`

Runs a deep, single-dimension accessibility review from one of seven access perspectives — magnification & reflow, environmental contrast, vestibular & motion sensitivity, auditory access, keyboard & motor access, screen reader & semantic structure, and cognitive & neurodivergent accessibility. Activates only on escalation from a11y-planner or a11y-critic when a perspective is flagged MEDIUM or HIGH alarm level, skipping LOW-rated perspectives entirely ('evidence over assertion'). Loads only the relevant checklist section, reviews source/markup against it, and routes each finding to an ARRM team role with severity (CRITICAL/MAJOR/MINOR/ENHANCEMENT), before issuing a PASS, REVISE, or BLOCK recommendation. Read-only: cannot write or edit files.

- **Path**: [skills/accessibility/perspective-audit/SKILL.md](skills/accessibility/perspective-audit/SKILL.md)
- **Use when**: deep-dive this flagged accessibility perspective; review keyboard and motor access in depth; check cognitive accessibility for this flow; escalated accessibility review; audit vestibular/motion safety
- **Inputs**: an artifact (source code or markup) plus the specific perspective(s) flagged MEDIUM or HIGH by an upstream review
- **Outputs**: per-perspective findings with severity, WCAG citation, ARRM role routing, and file:line evidence, a PASS / REVISE / BLOCK recommendation
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [zivtech/accessibility-skills](https://github.com/zivtech/accessibility-skills/tree/817dedeae90324017ece2d2b104332aec9d20656/.claude/skills/perspective-audit) @ `817dede` by zivtech, GPL-3.0-or-later
- **Status**: draft, stable
- **Tags**: a11y, wcag, keyboard, focus-management, contrast, screen-reader, motion, inclusive-design, severity, expert-review

### `review-a11y`

Reviews changed frontend code (staged files, a working diff, a branch, or a PR) for WCAG 2.2 AA accessibility using a bundled, install-free static engine with cross-file JSX/TSX AST analysis. Treats engine findings as candidates, not verdicts: confirms each occurrence in the actual code, flags preliminary findings from framework templates or library-rendered markup that need rendered-DOM verification, adjudicates judgment criteria (alt-text relevance, link purpose, focus logic) from visible evidence, and refutes false positives with cited code. Returns a severity-ranked WCAG 2.2 AA review scoped only to the change, with file:line fixes, explicitly named residual rendering risks (contrast, focus visibility, zoom) that require a browser scan, and a pass/fail verdict.

- **Path**: [skills/accessibility/review-a11y/SKILL.md](skills/accessibility/review-a11y/SKILL.md)
- **Use when**: review a11y; is this accessible?; anything to fix before merge?; accessibility review of this diff; check staged files for accessibility
- **Inputs**: staged files, a working diff, a branch, or a PR diff, the bundled engine's candidate findings from `node scripts/ultra11y.mjs audit`
- **Outputs**: severity-ranked WCAG 2.2 AA review scoped to the change, with file:line fixes, list of residual rendering risks requiring a browser scan, pass/fail verdict for the change
- **Dependencies**: node
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [maxgfr/ultra11y](https://github.com/maxgfr/ultra11y/tree/d1cd14792f3bd1b9ab15958bc4e72081375514dc/skills/review-a11y) @ `d1cd147` by maxgfr, MIT
- **Status**: draft, stable
- **Tags**: a11y, wcag, aria, keyboard, focus-management, contrast, semantic-html, severity, remediation, pr-review

### `ultra11y`

Audits a repository, site, or page against WCAG 2.2 AA or a pluggable country standard (e.g. RGAA) using a bundled, install-free engine that runs 93 static checks tied to specific success criteria with cross-file JSX/TSX AST analysis, routes rendering-dependent criteria (computed contrast, zoom/reflow, focus visibility) to an optional browser scan tier, and has the agent adjudicate judgment criteria (alt-text relevance, link purpose, reading order) from harvested evidence — never silently marking a criterion conforming without recorded proof. Produces dated Markdown/HTML conformance reports, per-page criterion grids, PRD-style backlogs, and filed tickets (GitHub/GitLab/Jira), and can also author accessible markup and apply safe automated fixes. Self-benchmarked against the W3C ACT-Rules corpus (125/176 failing examples caught across 40 rules, zero false positives).

- **Path**: [skills/accessibility/ultra11y/SKILL.md](skills/accessibility/ultra11y/SKILL.md)
- **Use when**: audit this repo for accessibility; generate a WCAG conformance report; run an RGAA accessibility audit; produce an accessibility PRD backlog; author accessible markup for this component
- **Inputs**: source file globs, a site URL, or a rendered page to audit, an optional country-standard pack (e.g. RGAA) and prior audit JSON to merge/re-scan against
- **Outputs**: dated Markdown/HTML conformance report with per-criterion status, per-page compliance grid from rendered-page scans, PRD-style backlog and/or filed tickets grouped by WCAG criterion
- **Dependencies**: node, browser, playwright
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [maxgfr/ultra11y](https://github.com/maxgfr/ultra11y/tree/d1cd14792f3bd1b9ab15958bc4e72081375514dc/skills/ultra11y) @ `d1cd147` by maxgfr, MIT
- **Status**: draft, stable
- **Tags**: a11y, wcag, aria, keyboard, focus-management, contrast, semantic-html, forms, severity, audit, remediation, documentation

## Content design

### `better-writing` ⭐

UX writing and interface-copy guidance: recon the existing voice before editing, one voice with tone that flexes by stakes (success vs. destructive-confirmation), addressing the reader as 'you' rather than 'the user', verb-first button labels, consistent flow vocabulary across multi-step flows, link text that stands alone out of context, one capitalization policy per element type, toggle labels that describe the ON state, error copy that states the fix beside the failing field with no blame or exclamation marks, forward-pointing empty states, and placeholders as format examples rather than labels, closing with a calibrated severity report ending in Block/Approve.

- **Path**: [skills/content-design/better-writing/SKILL.md](skills/content-design/better-writing/SKILL.md)
- **Use when**: write button labels; review error message copy; UX writing pass; empty state copy; microcopy consistency check
- **Inputs**: user-facing copy in source code, existing product copy for voice recon
- **Outputs**: severity-ranked findings table (Severity | Location | Before | After | Why), Block/Approve verdict
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/better-writing) @ `ca48385` by Jakub Krehel, MIT
- **Status**: draft, stable, recommended default
- **Tags**: ux-writing, microcopy, voice-and-tone, labels, error-messages, help-content, plain-language, terminology

### `localization-design`

Makes the agent design UI that survives localization: text-expansion planning with per-language percentages (German +20-35%, Finnish +30-40%), RTL mirroring rules including what does and does not mirror, CSS logical properties, typography rules for Arabic/CJK/Indic scripts, cultural color and iconography tables, locale-aware date/number/address formats, and design-system implications (semantic 'start/end' token naming, pseudo-localization testing).

- **Path**: [skills/content-design/localization-design/SKILL.md](skills/content-design/localization-design/SKILL.md)
- **Use when**: localize this UI; RTL support; text expansion in translation; design for multiple languages; internationalization review; Arabic or CJK layout
- **Inputs**: UI designs or components, target locales, design tokens
- **Outputs**: localization-readiness findings, RTL and expansion fixes, cultural adaptation guidance
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/design-systems/skills/localization-design) @ `20e34c4` by Owl-Listener, MIT
- **Status**: draft, stable
- **Tags**: localization, internationalization, layout, typography, design-system

### `ux-writing`

Writes and edits user-centered, accessible interface copy (buttons, labels, error messages, notifications, forms, onboarding, empty states, success messages, help text) against four measurable quality standards -- purposeful, concise, conversational, clear -- each scored 0-10 with concrete criteria (e.g. 40-60 characters per line, active voice predominates). Draws on dedicated reference material for WCAG-aligned accessible writing (plain language at a 7th-8th grade level, sentences under 20 words, descriptive interactive-element labels), a detailed pattern library covering three contrasting worked product voices, a fillable voice-chart template for defining brand personality in 3-5 concepts, and three ready-to-use templates for empty states, error messages, and onboarding flows.

- **Path**: [skills/content-design/ux-writing/SKILL.md](skills/content-design/ux-writing/SKILL.md)
- **Use when**: write button and error copy; review this UI text; set up voice and tone guidelines; audit our interface copy; write an empty state or onboarding flow
- **Inputs**: Existing or draft interface copy to write or review, Product voice/brand context (optional, for tone calibration)
- **Outputs**: Rewritten or new interface copy, A 0-10 score across the four quality dimensions with the lowest-scoring areas flagged, Filled templates for empty states, error messages, or onboarding flows where applicable
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [content-designer/ux-writing-skill](https://github.com/content-designer/ux-writing-skill/tree/98cacde4ba2dd10ed28df43a8d53eef1e321c539) @ `98cacde` by Christopher Greer, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: draft, stable
- **Tags**: ux-writing, microcopy, voice-and-tone, labels, error-messages, help-content, onboarding, empty-states, plain-language, a11y

## Prototyping

### `prototype`

Builds several (default three, up to five) genuinely different versions of one described UI piece, each diverging on a named axis (layout, density, personality, motion, interaction model) stated before any code is written, hosted full-size in realistic context behind a visual picker with keyboard navigation, instant switching, and URL-param persistence per a verbatim picker spec. Every variant must independently meet the same motion-craft bar (correct easing, sub-300ms UI motion, transform-origin, reduced-motion) so a sloppy variant never widens the exploration. Presents tradeoffs honestly without marking a favorite, then on selection promotes the winner into the project's conventions and deletes the prototype surface.

- **Path**: [skills/prototyping/prototype/SKILL.md](skills/prototyping/prototype/SKILL.md)
- **Use when**: show me a few different versions of this component; prototype a few directions for this UI piece; build variants I can flip through; explore layout directions live
- **Inputs**: a one-sentence description of one UI piece to explore
- **Outputs**: a live picker harness (isolated route or standalone HTML) hosting each variant full-size in realistic context, a tradeoffs table (Variant | Axis | When it's the right choice | Its cost)
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/prototype) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: draft, stable
- **Tags**: prototyping, interactive-prototype, high-fidelity, variants

### `variant`

Builds three (up to five) genuinely different versions of one described UI piece, each a different position on a single named axis (structure, density, emphasis, type, or voice) owned by a sibling better-* skill, so secondary choices follow coherently rather than every axis varying at once. Hosts all variants on the real page behind a URL-driven picker deliberately styled outside the project's design system, with realistic content and item counts, clears better-interface's accessibility escalation-trigger floor before any variant enters the picker, then presents axis-position tradeoffs without marking a favorite and hands the decision back. On a choice, promotes the winner into the project's own conventions and deletes the rest.

- **Path**: [skills/prototyping/variant/SKILL.md](skills/prototyping/variant/SKILL.md)
- **Use when**: show me a few different versions of this component; explore layout directions for this UI; build variants behind a picker; which design direction should we pick
- **Inputs**: a one-sentence brief for one piece of UI, the project's styling system, tokens and component library
- **Outputs**: a real page hosting each variant behind a URL search-param picker, a tradeoffs table (Variant | Axis position | Right when | Costs)
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/variant) @ `ca48385` by Jakub Krehel, MIT
- **Status**: draft, stable
- **Tags**: prototyping, variants, high-fidelity, interactive-prototype

## Testing and evaluation

### `break`

Renders one real component on a throwaway harness page under every content/state/quantity/container/environment scenario its own props and slots can actually reach in production, inferred from a fixed scenario-axis menu with cues that gate which axes apply (content length, content shape, quantity, container width, state, environment). Looks once, marks what visibly broke directly on the page, and reports a table of broken scenarios with the observation and the owning domain skill for the fix -- issuing no verdict itself, since it observes rather than judges.

- **Path**: [skills/testing/break/SKILL.md](skills/testing/break/SKILL.md)
- **Use when**: does this component survive edge cases; stress test this component; test with long text and zero items; render every state of this component
- **Inputs**: one component's props, slots, and states, a project route or scratch page to render it in
- **Outputs**: a harness page rendering every kept scenario side by side, a findings table (Scenario | Observed | Owner)
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/break) @ `ca48385` by Jakub Krehel, MIT
- **Status**: draft, stable
- **Tags**: stress-testing, error-states, empty-states, loading, responsive

### `critique-information-density`

Makes the agent critique a rendered screen's information density along four dimensions - cognitive load, content priority, scanning pattern (F/Z-pattern fit, label alignment, chunking), and progressive disclosure - each with pointed evaluation questions; enforces an output format of observation / problem / fix per dimension with a pass / minor issue / major issue rating; and names common failure patterns (every-metric dashboards, 10+ column tables, front-loaded onboarding).

- **Path**: [skills/testing/critique-information-density/SKILL.md](skills/testing/critique-information-density/SKILL.md)
- **Use when**: this screen feels overwhelming; critique information density; too much on one screen; dashboard cluttered; review cognitive load
- **Inputs**: screenshot or rendered screen, primary user task
- **Outputs**: per-dimension findings with ratings, specific fixes
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/visual-critique/skills/critique-information-density) @ `20e34c4` by Owl-Listener, MIT
- **Status**: draft, stable
- **Tags**: design-critique, expert-review, visual-hierarchy, dashboards

### `design-review`

Runs a structured, scored review of a screen, page, or product. Scores six weighted dimensions (Visual Hierarchy 20%, Consistency 20%, Accessibility 20%, Usability 20%, Responsiveness 10%, Performance 10%) into an overall weighted score, applies Nielsen's 10 usability heuristics flagging violations by number, runs an accessibility pass against a WCAG checklist with a contrast calculator for color-pair doubts, and checks the result against a documented anti-slop / banned-defaults checklist. Outputs the six-dimension scored table plus a prioritized findings table (# / severity Critical-Major-Minor-Enhancement / finding / recommendation) with concrete, token-referenced fixes.

- **Path**: [skills/testing/design-review/SKILL.md](skills/testing/design-review/SKILL.md)
- **Use when**: review this design; audit this screen; heuristic evaluation; design quality score; critique this UI before we ship
- **Inputs**: A screen, page, or flow to review, Target users, platform, and constraints
- **Outputs**: Six-dimension scored table plus weighted overall score, Prioritized findings table with severity and concrete fixes, Nielsen heuristic violations flagged by number
- **Dependencies**: python
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [plugin87/ux-ui-agent-skills](https://github.com/plugin87/ux-ui-agent-skills/tree/2ffb677aa02b225c8a3da1b7f31d9ebb7c38f1dd/.claude/skills/design-review) @ `2ffb677` by plugin87, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: draft, experimental
- **Tags**: design-review, design-critique, heuristic-evaluation, severity, ui-design, visual-hierarchy, a11y

### `find-animation-opportunities`

Read-only sweep of a codebase or UI for moments that would genuinely benefit from motion, filtered through a four-question gate (frequency, named purpose, duration budget, function) applied ruthlessly -- most candidates are expected to be rejected. Hunts six known seam classes (feedback gaps, teleporting state, missing spatial story, group entrances, gesture seams, the rare delight budget) with grep patterns, caps output at 5-7 suggestions per app, and requires a companion list of 2-5 explicitly rejected candidates with the gate question that killed each one, closing with a verdict on how much motion the interface actually needs.

- **Path**: [skills/testing/find-animation-opportunities/SKILL.md](skills/testing/find-animation-opportunities/SKILL.md)
- **Use when**: what could be animated here; make this feel more alive; find missing animation opportunities; where should we add motion
- **Inputs**: a codebase or a specific UI/view to sweep for motion opportunities
- **Outputs**: an opportunities table (Location | Today | Purpose | Frequency | Suggested motion) with exact values, a required rejected-candidates list with the gate question that killed each, a one-paragraph verdict naming the highest-leverage suggestion
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/find-animation-opportunities) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: draft, stable
- **Tags**: heuristic-evaluation, expert-review, motion, animation, severity

### `improve-animations` ⭐

Surveys a codebase's animation and motion code as a senior motion advisor and produces a prioritized, vetted findings table plus self-contained implementation plans any agent (including a weaker model with zero context) can execute without judgment of its own. Four phases: recon (stack, motion libraries, existing tokens, frequency map), an eight-category parallel audit (purpose/frequency, easing/duration, physicality/origin, interruptibility, performance, accessibility, cohesion, missed opportunities) with three effort levels, re-vetting every finding against its cited file:line before presenting a leverage-ordered severity table, then writing plans with exact target values, repo-convention exemplars, ordered steps, hard scope boundaries and a feel-check verification section. Read-only on source; only writes plan files.

- **Path**: [skills/testing/improve-animations/SKILL.md](skills/testing/improve-animations/SKILL.md)
- **Use when**: improve the animations in this codebase; audit the motion in this app; make this app feel better; give me a roadmap of animation fixes
- **Inputs**: a codebase to audit for animation/motion quality, optionally an effort level (quick/standard/deep) or a category focus
- **Outputs**: a vetted, severity-ranked findings table with leverage ordering, self-contained implementation plans written to plans/NNN-slug.md, a plans/README.md with recommended execution order and dependencies
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/improve-animations) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: draft, stable, recommended default
- **Tags**: audit, heuristic-evaluation, expert-review, motion, animation, severity, documentation

## Design QA

### `design-details` ⭐

Parent router and full-audit contract for a suite of seven UI-craft sub-skills (animation, layout, copy, typography, color, accessibility, analytics). Enforces a Design System Protocol (check for existing tokens/CSS variables/theme objects before proposing any value; propose additions instead of overrides), a Context Gathering Protocol (audience, use cases, tone, platform - stop and ask if missing, with a /design-details init flow that persists answers to .design-details.md so the interview happens once per project), and a full-audit contract: run every applicable sub-skill, cover a named surface checklist (narrow viewport, modals, error/empty/loading states, keyboard traversal, reduced motion, live regions), open with a scope preamble stating what was and was not audited, and present findings as lettered sections of Before | After | Why tables, closing with an optional row-by-row walkthrough mode (Apply / Decline / Discuss / Stop per item).

- **Path**: [skills/design-qa/design-details/SKILL.md](skills/design-qa/design-details/SKILL.md)
- **Use when**: review this UI; polish this screen; audit this page; full design audit; make this feel considered; design details pass
- **Inputs**: source code, project design context (.design-details.md, CLAUDE.md), the screen or component under review
- **Outputs**: scope preamble, lettered findings as Before/After/Why tables, interactive row-by-row walkthrough with applied fixes, .design-details.md project context file (init flow)
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [GeorgeTurp/design-details](https://github.com/GeorgeTurp/design-details/tree/9e5686b0e1e6fc426c5b2d21280eb76e5b41ed14/skills/design-details) @ `9e5686b` by George Turp, MIT
- **Status**: draft, stable, recommended default
- **Tags**: orchestration, workflow, design-review, design-critique, review, visual-polish

### `frontend-design-review` ⭐

Reviews existing UI implementations against design-system compliance, three quality pillars (frictionless task completion, quality-as-craft including WCAG 2.1 A/AA accessibility grades, and trustworthy AI/error transparency), and aesthetic distinctiveness -- or creates new distinctive frontend interfaces from scratch avoiding generic 'AI slop' aesthetics. Produces a structured review output with a pillar status table, blocking/major/minor severity-ranked issues, and design-system-linked recommendations; provides a pre-approval quick checklist and review-type modifiers (PR review, creative review, design review, accessibility audit, design-system compliance audit) that adjust evaluation focus.

- **Path**: [skills/design-qa/frontend-design-review/SKILL.md](skills/design-qa/frontend-design-review/SKILL.md)
- **Use when**: review this UI for design quality; PR design review; accessibility audit of this component; check design system compliance; critique this frontend implementation; create a distinctive UI that avoids generic AI design
- **Inputs**: an existing UI implementation, PR diff, or component to review, or a brief for a new interface to design, access to the project's design system / Figma (optional but recommended for compliance checks)
- **Outputs**: a structured review report (context, pillar assessment table, verdict, blocking/major/minor issues, recommendations), or a newly implemented distinctive UI when used in creative mode
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [microsoft/skills](https://github.com/microsoft/skills/tree/7066b58141d8cc66f39356b2ee5bb64d428dcf17/.github/skills/frontend-design-review) @ `7066b58` by Microsoft, MIT
- **Status**: draft, stable, recommended default
- **Tags**: design-qa, design-review, pr-review, a11y, ui-design

### `interface-review` ⭐

Change-scoped interface review for uncommitted work, a branch, or a pull request: resolves the review target (working tree, staged, branch vs. merge-base, PR fetched by ref, or an explicit range) with documented traps for shallow clones, mid-rebase state and detached HEAD, expands each changed file to its blast radius of importers, reads the removed side of every diff hunk against a table of accessibility/layout/typography/color/writing regression signals, classifies every finding as Introduced, Regression, or Pre-existing, holds the change to its stated PR intent to catch incomplete variants and missing states, and hands the classified findings to better-interface for severity, consolidation and the verdict. Never checks out or mutates the working tree.

- **Path**: [skills/design-qa/interface-review/SKILL.md](skills/design-qa/interface-review/SKILL.md)
- **Use when**: review this pull request; review my branch for interface regressions; review uncommitted changes; did this change break accessibility or layout
- **Inputs**: a git target: working tree, staged, branch, pr <n>, ref, or range, availability of better-interface for severity and verdict
- **Outputs**: a scope block (target, base/head ref, commits, files in scope, expanded surfaces), a findings table with a Status column (Introduced/Regression/Pre-existing), Block/Approve verdict via better-interface
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/interface-review) @ `ca48385` by Jakub Krehel, MIT
- **Status**: draft, stable, recommended default
- **Tags**: design-qa, design-review, pr-review, review, handoff

### `review-animations`

Reviews animation and motion code (a diff or a component) against ten non-negotiable standards derived from Emil Kowalski's animation philosophy: justified motion, frequency-appropriate use, responsive easing, sub-300ms UI durations, origin/physical correctness, interruptibility, GPU-only properties, accessibility, asymmetric enter/exit timing, and cohesion. Flags a fixed list of escalation triggers on sight (transition: all, scale(0) entrances, ease-in on UI, animation on high-frequency/keyboard actions, keyframes on rapidly-triggered elements), proposes fixes via a nine-step remedial preference hierarchy (delete first, polish last), and outputs a required Before/After/Why findings table followed by a tiered verdict ending in Block or Approve. Defaults to flagging; approval is earned.

- **Path**: [skills/design-qa/review-animations/SKILL.md](skills/design-qa/review-animations/SKILL.md)
- **Use when**: review this animation code; does this motion pass review; audit this transition against the animation standards; block or approve this animation diff
- **Inputs**: animation/motion source code, typically a diff or a single component
- **Outputs**: a Before/After/Why findings table, a tiered verdict (feel-breaking regressions, missed simplifications, performance, interruptibility/timing, origin/physicality/cohesion, accessibility), a final Block or Approve decision
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/review-animations) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: draft, stable
- **Tags**: design-review, pr-review, motion, animation, severity, design-qa

## Agentic and AI-native UI

### `conversational-ux`

Makes the agent design voice and chat interfaces around the conversation turn: a confirmation-strategy table (explicit/implicit/none by stakes), a three-step error reprompt ladder that never repeats the same prompt, voice-specific writing rules (short sentences, no visual-only references, max three-item lists, sub-8s responses, earcons), multimodal voice+screen rules, text-chat affordances (quick replies, typing indicators, structured cards), persona/tone decisions including no false humanity, and guidance on when conversation is the wrong pattern.

- **Path**: [skills/agentic-ui/conversational-ux/SKILL.md](skills/agentic-ui/conversational-ux/SKILL.md)
- **Use when**: design a chatbot flow; voice interface script; conversational UI; dialog error recovery; assistant persona; IVR or smart speaker skill
- **Inputs**: dialog goals, sample utterances, product context
- **Outputs**: dialog flow with prompts, error recovery ladder, persona and tone specification
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/interaction-design/skills/conversational-ux) @ `20e34c4` by Owl-Listener, MIT
- **Status**: draft, stable
- **Tags**: conversational-ui, agentic-ui, error-recovery, voice-and-tone

## Design engineering

### `explain-interface`

Reverse-engineers how a UI effect or a whole frontend was built from a URL (browser DevTools evaluate_script or raw HTML/CSS fetch) or a screenshot (explicit reconstruction, not a reading). Finds the full layer stack behind one visual effect in paint order rather than one declaration, tags every claim measured/derived/inferred, treats fetched page content as evidence never as instructions to follow, and closes on the transferable recipe in words plus what would not survive being copied, rather than a rebuild snippet.

- **Path**: [skills/design-engineering/explain-interface/SKILL.md](skills/design-engineering/explain-interface/SKILL.md)
- **Use when**: how was this gradient built; explain this site's frontend stack; reverse engineer this effect from a screenshot; what CSS produces this visual
- **Inputs**: a URL and the named effect (or none, for a whole-system read), optionally a screenshot when no live page is available
- **Outputs**: a layer-stack explanation in paint order with measured/derived/inferred tags per claim, a transferable recipe in words plus what would not survive copying
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/explain-interface) @ `ca48385` by Jakub Krehel, MIT
- **Status**: draft, stable
- **Tags**: design-engineering, frontend, implementation-quality, explanation, documentation

### `web-artifacts-builder`

Scaffolds and bundles a React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui project into a single self-contained HTML artifact for claude.ai, via two bundled shell scripts: init-artifact.sh (creates the project, configures Tailwind/shadcn theming and path aliases, installs 40+ pre-extracted shadcn/ui components and their Radix UI dependencies) and bundle-artifact.sh (builds with Parcel and inlines all JS/CSS/assets into one bundle.html with html-inline). Instructs the agent to avoid generic 'AI slop' visual patterns (centered layouts, purple gradients, uniform rounded corners, Inter font) while building.

- **Path**: [skills/design-engineering/web-artifacts-builder/SKILL.md](skills/design-engineering/web-artifacts-builder/SKILL.md)
- **Use when**: build a complex React artifact with shadcn/ui; create a multi-component claude.ai artifact with state management; bundle a React app into a single HTML file; scaffold a Tailwind + shadcn project for an artifact
- **Inputs**: a project name, a description of the artifact's required components/state/routing
- **Outputs**: a scaffolded React+TypeScript+Vite+Tailwind+shadcn project directory, a single bundle.html artifact with all JS/CSS/dependencies inlined
- **Dependencies**: node, pnpm
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [anthropics/skills](https://github.com/anthropics/skills/tree/3b3fad96af16a10759d930941b4520ba0c40edae/skills/web-artifacts-builder) @ `3b3fad9` by Anthropic, Apache-2.0
- **Status**: draft, stable
- **Tags**: frontend, implementation-quality, design-engineering

## Orchestration

### `better-interface` ⭐

Cross-discipline interface-review orchestrator: resolves review scope, routes a screen or flow to the sibling better-accessibility, better-layout, better-writing, better-typography, better-colors and better-ui skills in a fixed order, requires evidence (file:line, not visual claims from source alone), applies one shared HIGH/MEDIUM/LOW severity scale with a fixed list of escalation triggers that are always HIGH on sight, prefers the cheapest fix (delete, use the platform, reuse a token, correct the value, add), consolidates systemic findings into one row per root cause with a 15-finding cap, and issues a single Block/Approve verdict. Hands off change-scoped (branch/PR/uncommitted) reviews to interface-review rather than resolving them itself.

- **Path**: [skills/orchestration/better-interface/SKILL.md](skills/orchestration/better-interface/SKILL.md)
- **Use when**: holistic interface review; review the whole screen; full UI review across accessibility layout color typography; consolidated design review verdict
- **Inputs**: a screen, flow, or feature scope, availability of the better-accessibility/better-layout/better-writing/better-typography/better-colors/better-ui sibling skills
- **Outputs**: scope and per-domain coverage table, one consolidated findings table ranked by severity, Block/Approve verdict
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/better-interface) @ `ca48385` by Jakub Krehel, MIT
- **Status**: draft, stable, recommended default
- **Tags**: orchestration, workflow, review, design-review, design-critique

## Recommended defaults

- [`animate`](skills/interaction-design/animate/SKILL.md) (interaction-design) — Builds a web animation from scratch in the order that determines whether it feels right: a frequency-based should-it-animate-at-all gate (100+/day actions never animate), a required one-word purpose (feedback, spatial consistency, state indication, preventing a jarring change, explanation, or delight), a cheapest-tool-first ladder (CSS transition to @starting-style to CSS animation to WAAPI to a motion library), exact easing curves and duration budgets by element type, transform/opacity-only property rules, interruption and exit rules, and mandatory reduced-motion and hover gating -- plus ready-to-build recipes for buttons, dropdowns, modals, drawers, toasts, accordions, stagger, hold-to-confirm, tab indicators, scroll reveal and drag-to-dismiss.
- [`animate-expo`](skills/interaction-design/animate-expo/SKILL.md) (interaction-design) — Builds animations in React Native and Expo apps, applying the same should-it-animate gate and named-purpose requirement as the web animate skill but adapted to mobile's three constraints: no hover, two runtimes (RN vs. UI thread), and a finger on the element. Picks the cheapest tool from Reanimated CSS transitions/animations through layout animations to gesture-driven shared values, gives exact spring configs (Apple's duration+dampingRatio form) and easing curves, enforces keeping motion off the JS thread (never setState in a gesture handler, scheduleOnRN not runOnJS), covers press/haptics/reduced-motion rules specific to touch, and provides ready recipes for sheets, swipe-to-delete, collapsing headers, list entrances, keyboard-synced UI and screen transitions.
- [`better-colors`](skills/visual-design/better-colors/SKILL.md) (visual-design) — Color-system design and audit guidance: ramps named by role rather than picked by eye (neutral/accent/status), a two-tier primitive-then-semantic token naming grammar, perceptual ramp-generation rules (constant hue, even perceived lightness, vividness peaking mid-ramp), APCA and WCAG 2 contrast thresholds with a report-don't-repaint measurement discipline, gradient interpolation-space choices, P3/sRGB gamut fallbacks, dark-mode derivation rules, and a calibrated severity report format ending in Block/Approve.
- [`better-layout`](skills/visual-design/better-layout/SKILL.md) (visual-design) — Layout-structure guidance for web interfaces: grouping by negative space with a 2x inter/intra-group gap ratio, keeping controls visually distinct from static content, shared-edge alignment, logical (RTL-safe) properties over physical left/right, importance-ordered content, progressive-disclosure affordances (peeking scroll items, disclosure controls), breakpoints driven by content rather than device presets, container queries, safe-area-aware full-bleed vs. floating-control layering, and string-growth/clipping resilience, closing with a calibrated severity report ending in Block/Approve.
- [`better-typography`](skills/visual-design/better-typography/SKILL.md) (visual-design) — Web typography guidance: font-format and weight-loading rules, CSS properties over raw variable-font/OpenType tags, type-scale construction with descending heading steps, line-height and letter-spacing by role, measure capping (60-75 characters), text-wrap balance/pretty usage, tabular numbers, truncation without losing content, smart punctuation, from-font underline metrics, the 16px iOS input-zoom fix (two documented approaches), font-smoothing and bidi/lang/dir handling, closing with a calibrated severity report ending in Block/Approve, plus a CSS-to-Tailwind cheat sheet for every declaration covered.
- [`better-ui`](skills/visual-design/better-ui/SKILL.md) (visual-design) — Design-engineering polish guidance for making interfaces feel finished: concentric border-radius math, optical over geometric alignment, shadows-for-elevation vs. borders-for-structure, interruptible CSS transitions vs. one-shot keyframes, split-and-stagger enter animations with subtle exits, exact contextual icon cross-fade values (scale/opacity/blur, spring bounce 0), theme-switch transition suppression, transition-property specificity and will-change usage, icon stroke-weight matching to adjacent text and RTL icon-flip rules, and image-outline recipes, closing with a calibrated severity report ending in Block/Approve.
- [`frontend-design`](skills/visual-design/frontend-design/SKILL.md) (visual-design) — Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Directs the agent to work in two passes (a compact color/type/layout/signature token plan, self-critiqued against generic AI-design defaults, then implementation), names three specific overused AI-generated aesthetic clusters to avoid unless the brief calls for them, and gives concrete rules for typography pairing, structural devices, deliberate motion, CSS specificity pitfalls, and end-user-facing UX writing (active voice, consistent verb-to-toast naming, non-apologetic error copy).
- [`better-accessibility`](skills/accessibility/better-accessibility/SKILL.md) (accessibility) — Accessibility engineering guidance for building or reviewing UI components and custom widgets: native-element-first ARIA rules, exact focus-ring and tabindex/roving-tabindex recipes, WCAG 2.5.8 hit-area sizing with pseudo-element expansion, form labeling and error-announcement patterns, prefers-reduced-motion and autoplay/zoom rules, live-region and screen-reader announcement selection, alt-text-by-purpose table, and a calibrated HIGH/MEDIUM/LOW severity report format ending in Block/Approve.
- [`better-writing`](skills/content-design/better-writing/SKILL.md) (content-design) — UX writing and interface-copy guidance: recon the existing voice before editing, one voice with tone that flexes by stakes (success vs. destructive-confirmation), addressing the reader as 'you' rather than 'the user', verb-first button labels, consistent flow vocabulary across multi-step flows, link text that stands alone out of context, one capitalization policy per element type, toggle labels that describe the ON state, error copy that states the fix beside the failing field with no blame or exclamation marks, forward-pointing empty states, and placeholders as format examples rather than labels, closing with a calibrated severity report ending in Block/Approve.
- [`improve-animations`](skills/testing/improve-animations/SKILL.md) (testing) — Surveys a codebase's animation and motion code as a senior motion advisor and produces a prioritized, vetted findings table plus self-contained implementation plans any agent (including a weaker model with zero context) can execute without judgment of its own. Four phases: recon (stack, motion libraries, existing tokens, frequency map), an eight-category parallel audit (purpose/frequency, easing/duration, physicality/origin, interruptibility, performance, accessibility, cohesion, missed opportunities) with three effort levels, re-vetting every finding against its cited file:line before presenting a leverage-ordered severity table, then writing plans with exact target values, repo-convention exemplars, ordered steps, hard scope boundaries and a feel-check verification section. Read-only on source; only writes plan files.
- [`design-details`](skills/design-qa/design-details/SKILL.md) (design-qa) — Parent router and full-audit contract for a suite of seven UI-craft sub-skills (animation, layout, copy, typography, color, accessibility, analytics). Enforces a Design System Protocol (check for existing tokens/CSS variables/theme objects before proposing any value; propose additions instead of overrides), a Context Gathering Protocol (audience, use cases, tone, platform - stop and ask if missing, with a /design-details init flow that persists answers to .design-details.md so the interview happens once per project), and a full-audit contract: run every applicable sub-skill, cover a named surface checklist (narrow viewport, modals, error/empty/loading states, keyboard traversal, reduced motion, live regions), open with a scope preamble stating what was and was not audited, and present findings as lettered sections of Before | After | Why tables, closing with an optional row-by-row walkthrough mode (Apply / Decline / Discuss / Stop per item).
- [`frontend-design-review`](skills/design-qa/frontend-design-review/SKILL.md) (design-qa) — Reviews existing UI implementations against design-system compliance, three quality pillars (frictionless task completion, quality-as-craft including WCAG 2.1 A/AA accessibility grades, and trustworthy AI/error transparency), and aesthetic distinctiveness -- or creates new distinctive frontend interfaces from scratch avoiding generic 'AI slop' aesthetics. Produces a structured review output with a pillar status table, blocking/major/minor severity-ranked issues, and design-system-linked recommendations; provides a pre-approval quick checklist and review-type modifiers (PR review, creative review, design review, accessibility audit, design-system compliance audit) that adjust evaluation focus.
- [`interface-review`](skills/design-qa/interface-review/SKILL.md) (design-qa) — Change-scoped interface review for uncommitted work, a branch, or a pull request: resolves the review target (working tree, staged, branch vs. merge-base, PR fetched by ref, or an explicit range) with documented traps for shallow clones, mid-rebase state and detached HEAD, expands each changed file to its blast radius of importers, reads the removed side of every diff hunk against a table of accessibility/layout/typography/color/writing regression signals, classifies every finding as Introduced, Regression, or Pre-existing, holds the change to its stated PR intent to catch incomplete variants and missing states, and hands the classified findings to better-interface for severity, consolidation and the verdict. Never checks out or mutates the working tree.
- [`better-interface`](skills/orchestration/better-interface/SKILL.md) (orchestration) — Cross-discipline interface-review orchestrator: resolves review scope, routes a screen or flow to the sibling better-accessibility, better-layout, better-writing, better-typography, better-colors and better-ui skills in a fixed order, requires evidence (file:line, not visual claims from source alone), applies one shared HIGH/MEDIUM/LOW severity scale with a fixed list of escalation triggers that are always HIGH on sight, prefers the cheapest fix (delete, use the platform, reuse a token, correct the value, add), consolidates systemic findings into one row per root cause with a 15-finding cap, and issues a single Block/Approve verdict. Hands off change-scoped (branch/PR/uncommitted) reviews to interface-review rather than resolving them itself.

## Alphabetical index

| Skill | Category | Source | Status |
| --- | --- | --- | --- |
| [`a11y-audit`](skills/accessibility/a11y-audit/SKILL.md) | accessibility | third-party | draft |
| [`a11y-check-code`](skills/accessibility/a11y-check-code/SKILL.md) | accessibility | third-party | draft |
| [`a11y-check-page`](skills/accessibility/a11y-check-page/SKILL.md) | accessibility | third-party | draft |
| [`a11y-critic`](skills/accessibility/a11y-critic/SKILL.md) | accessibility | third-party | draft |
| [`a11y-planner`](skills/accessibility/a11y-planner/SKILL.md) | accessibility | third-party | draft |
| [`a11y-role-audit`](skills/accessibility/a11y-role-audit/SKILL.md) | accessibility | third-party | draft |
| [`algorithmic-art`](skills/visual-design/algorithmic-art/SKILL.md) | visual-design | third-party | draft |
| [`animate`](skills/interaction-design/animate/SKILL.md) | interaction-design | third-party | draft |
| [`animate-expo`](skills/interaction-design/animate-expo/SKILL.md) | interaction-design | third-party | draft |
| [`animation-vocabulary`](skills/interaction-design/animation-vocabulary/SKILL.md) | interaction-design | third-party | draft |
| [`apple-design`](skills/interaction-design/apple-design/SKILL.md) | interaction-design | third-party | draft |
| [`better-accessibility`](skills/accessibility/better-accessibility/SKILL.md) | accessibility | third-party | draft |
| [`better-colors`](skills/visual-design/better-colors/SKILL.md) | visual-design | third-party | draft |
| [`better-interface`](skills/orchestration/better-interface/SKILL.md) | orchestration | third-party | draft |
| [`better-layout`](skills/visual-design/better-layout/SKILL.md) | visual-design | third-party | draft |
| [`better-typography`](skills/visual-design/better-typography/SKILL.md) | visual-design | third-party | draft |
| [`better-ui`](skills/visual-design/better-ui/SKILL.md) | visual-design | third-party | draft |
| [`better-writing`](skills/content-design/better-writing/SKILL.md) | content-design | third-party | draft |
| [`break`](skills/testing/break/SKILL.md) | testing | third-party | draft |
| [`canvas-design`](skills/visual-design/canvas-design/SKILL.md) | visual-design | third-party | draft |
| [`conversational-ux`](skills/agentic-ui/conversational-ux/SKILL.md) | agentic-ui | third-party | draft |
| [`critique-information-density`](skills/testing/critique-information-density/SKILL.md) | testing | third-party | draft |
| [`design-debt-audit`](skills/design-systems/design-debt-audit/SKILL.md) | design-systems | third-party | draft |
| [`design-details`](skills/design-qa/design-details/SKILL.md) | design-qa | third-party | draft |
| [`design-negotiation`](skills/strategy/design-negotiation/SKILL.md) | strategy | third-party | draft |
| [`design-review`](skills/testing/design-review/SKILL.md) | testing | third-party | draft |
| [`design-system-governance`](skills/design-systems/design-system-governance/SKILL.md) | design-systems | third-party | draft |
| [`design-tokens`](skills/design-systems/design-tokens/SKILL.md) | design-systems | third-party | draft |
| [`explain-interface`](skills/design-engineering/explain-interface/SKILL.md) | design-engineering | third-party | draft |
| [`figma-integration`](skills/design-systems/figma-integration/SKILL.md) | design-systems | third-party | draft |
| [`find-animation-opportunities`](skills/testing/find-animation-opportunities/SKILL.md) | testing | third-party | draft |
| [`frontend-design`](skills/visual-design/frontend-design/SKILL.md) | visual-design | third-party | draft |
| [`frontend-design-review`](skills/design-qa/frontend-design-review/SKILL.md) | design-qa | third-party | draft |
| [`frontend-ui-dark-ts`](skills/design-systems/frontend-ui-dark-ts/SKILL.md) | design-systems | third-party | draft |
| [`improve-animations`](skills/testing/improve-animations/SKILL.md) | testing | third-party | draft |
| [`interface-review`](skills/design-qa/interface-review/SKILL.md) | design-qa | third-party | draft |
| [`localization-design`](skills/content-design/localization-design/SKILL.md) | content-design | third-party | draft |
| [`motion-system`](skills/design-systems/motion-system/SKILL.md) | design-systems | third-party | draft |
| [`perspective-audit`](skills/accessibility/perspective-audit/SKILL.md) | accessibility | third-party | draft |
| [`pick-ui-library`](skills/design-systems/pick-ui-library/SKILL.md) | design-systems | third-party | draft |
| [`platform-conventions`](skills/interaction-design/platform-conventions/SKILL.md) | interaction-design | third-party | draft |
| [`prototype`](skills/prototyping/prototype/SKILL.md) | prototyping | third-party | draft |
| [`review-a11y`](skills/accessibility/review-a11y/SKILL.md) | accessibility | third-party | draft |
| [`review-animations`](skills/design-qa/review-animations/SKILL.md) | design-qa | third-party | draft |
| [`service-blueprint`](skills/research/service-blueprint/SKILL.md) | research | third-party | draft |
| [`survey-design`](skills/research/survey-design/SKILL.md) | research | third-party | draft |
| [`theme-factory`](skills/visual-design/theme-factory/SKILL.md) | visual-design | third-party | draft |
| [`token-build`](skills/design-systems/token-build/SKILL.md) | design-systems | third-party | draft |
| [`ultra11y`](skills/accessibility/ultra11y/SKILL.md) | accessibility | third-party | draft |
| [`ux-writing`](skills/content-design/ux-writing/SKILL.md) | content-design | third-party | draft |
| [`variant`](skills/prototyping/variant/SKILL.md) | prototyping | third-party | draft |
| [`web-artifacts-builder`](skills/design-engineering/web-artifacts-builder/SKILL.md) | design-engineering | third-party | draft |
