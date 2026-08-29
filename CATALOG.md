# Skill catalog

<!-- GENERATED FILE — do not edit. Source of truth: catalog/index.json. Regenerate with `npm run catalog:build`. -->

11 skills (11 vendored third-party, 0 original).

Search locally instead of reading this whole file: `npm run search -- "your query"`. The machine-readable index is [catalog/index.json](catalog/index.json).

## Contents

- [Start here](#start-here)
- [Suggested bundles](#suggested-bundles)
- [User research](#user-research) (2)
- [Product strategy](#product-strategy) (1)
- [Interaction design](#interaction-design) (1)
- [Design systems](#design-systems) (3)
- [Content design](#content-design) (1)
- [Testing and evaluation](#testing-and-evaluation) (1)
- [Design QA](#design-qa) (1)
- [Agentic and AI-native UI](#agentic-and-ai-native-ui) (1)
- [Recommended defaults](#recommended-defaults)
- [Alphabetical index](#alphabetical-index)

## Start here

1. Search: `npm run search -- "accessible forms"` (or filter: `--category accessibility`, `--recommended`).
2. Read the whole `SKILL.md` of each selected skill, and any file it links.
3. Load the smallest set of skills that covers the task; orchestration skills coordinate specialists for multi-step reviews.

## Suggested bundles

No orchestration skills yet; pick specialists per category below.

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

## Content design

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

## Testing and evaluation

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

## Recommended defaults

- [`design-details`](skills/design-qa/design-details/SKILL.md) (design-qa) — Parent router and full-audit contract for a suite of seven UI-craft sub-skills (animation, layout, copy, typography, color, accessibility, analytics). Enforces a Design System Protocol (check for existing tokens/CSS variables/theme objects before proposing any value; propose additions instead of overrides), a Context Gathering Protocol (audience, use cases, tone, platform - stop and ask if missing, with a /design-details init flow that persists answers to .design-details.md so the interview happens once per project), and a full-audit contract: run every applicable sub-skill, cover a named surface checklist (narrow viewport, modals, error/empty/loading states, keyboard traversal, reduced motion, live regions), open with a scope preamble stating what was and was not audited, and present findings as lettered sections of Before | After | Why tables, closing with an optional row-by-row walkthrough mode (Apply / Decline / Discuss / Stop per item).

## Alphabetical index

| Skill | Category | Source | Status |
| --- | --- | --- | --- |
| [`conversational-ux`](skills/agentic-ui/conversational-ux/SKILL.md) | agentic-ui | third-party | draft |
| [`critique-information-density`](skills/testing/critique-information-density/SKILL.md) | testing | third-party | draft |
| [`design-debt-audit`](skills/design-systems/design-debt-audit/SKILL.md) | design-systems | third-party | draft |
| [`design-details`](skills/design-qa/design-details/SKILL.md) | design-qa | third-party | draft |
| [`design-negotiation`](skills/strategy/design-negotiation/SKILL.md) | strategy | third-party | draft |
| [`design-system-governance`](skills/design-systems/design-system-governance/SKILL.md) | design-systems | third-party | draft |
| [`localization-design`](skills/content-design/localization-design/SKILL.md) | content-design | third-party | draft |
| [`motion-system`](skills/design-systems/motion-system/SKILL.md) | design-systems | third-party | draft |
| [`platform-conventions`](skills/interaction-design/platform-conventions/SKILL.md) | interaction-design | third-party | draft |
| [`service-blueprint`](skills/research/service-blueprint/SKILL.md) | research | third-party | draft |
| [`survey-design`](skills/research/survey-design/SKILL.md) | research | third-party | draft |
