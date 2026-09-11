# Skill catalog

<!-- GENERATED FILE — do not edit. Source of truth: catalog/index.json. Regenerate with `npm run catalog:build`. -->

106 skills (98 vendored third-party, 8 original).

Search locally instead of reading this whole file: `npm run search -- "your query"`. The machine-readable index is [catalog/index.json](catalog/index.json).

## Contents

- [Start here](#start-here)
- [Suggested bundles](#suggested-bundles)
- [Discovery](#discovery) (2)
- [User research](#user-research) (12)
- [Product strategy](#product-strategy) (2)
- [Information architecture](#information-architecture) (2)
- [Interaction design](#interaction-design) (10)
- [Visual design](#visual-design) (13)
- [Design systems](#design-systems) (13)
- [Accessibility](#accessibility) (11)
- [Content design](#content-design) (4)
- [Prototyping](#prototyping) (6)
- [Testing and evaluation](#testing-and-evaluation) (9)
- [Design QA](#design-qa) (5)
- [Product analytics](#product-analytics) (4)
- [Agentic and AI-native UI](#agentic-and-ai-native-ui) (2)
- [Ethics and safety](#ethics-and-safety) (1)
- [Design engineering](#design-engineering) (6)
- [Orchestration](#orchestration) (4)
- [Recommended defaults](#recommended-defaults)
- [Alphabetical index](#alphabetical-index)

## Start here

1. Search: `npm run search -- "accessible forms"` (or filter: `--category accessibility`, `--recommended`).
2. Read the whole `SKILL.md` of each selected skill, and any file it links.
3. Load the smallest set of skills that covers the task; orchestration skills coordinate specialists for multi-step reviews.

Good entry points:

- [`better-interface`](skills/orchestration/better-interface/SKILL.md) — Cross-discipline interface-review orchestrator: resolves review scope, routes a screen or flow to the sibling better-accessibility, better-layout, better-writing, better-typography, better-colors and better-ui skills in a fixed order, requires evidence (file:line, not visual claims from source alone), applies one shared HIGH/MEDIUM/LOW severity scale with a fixed list of escalation triggers that are always HIGH on sight, prefers the cheapest fix (delete, use the platform, reuse a token, correct the value, add), consolidates systemic findings into one row per root cause with a 15-finding cap, and issues a single Block/Approve verdict. Hands off change-scoped (branch/PR/uncommitted) reviews to interface-review rather than resolving them itself.
- [`pre-handoff-review`](skills/orchestration/pre-handoff-review/SKILL.md) — Orchestrates a completeness check before design is handed to engineering: inventories screens and states, then runs the owning skills for responsive behaviour (better-layout), localisation (localization-design), accessibility annotations (a11y-planner, better-accessibility), final copy (better-writing), tokens and components (design-system-governance, extract-design-md), motion (motion-system, animation-vocabulary), platform (platform-conventions) and analytics (instrumentation-plan), classifies gaps as blocker, gap or note, and produces a readiness table with owners and the artifact list to hand over.
- [`product-design-review`](skills/orchestration/product-design-review/SKILL.md) — Orchestrates a complete product-design review: selects the smallest set of specialist lenses the input needs (accessibility for source or live page, layout, platform conventions, copy, typography, color, UI polish, animation, agentic interface, deceptive patterns, design-system compliance, diff scoping), confirms each is installed or marks it Not reviewed, runs them foundations-first, merges duplicate findings under the owning skill with a shared severity ladder and a 20-finding cap, and produces one report with a Block or Approve verdict and the list of skills used.
- [`ux-research-workflow`](skills/orchestration/ux-research-workflow/SKILL.md) — Orchestrates a research effort from the decision it must inform to a recommendation: frames the decision, plans the study and instruments (user-research-cookiy, silver-research, survey-design, ia-evaluation), records collection, synthesises transcripts or mixed evidence (user-research-cookiy, silver-synthesize), maps structure when the question is structural (service-blueprint, ia-evaluation), converts findings into options with hypotheses (silver-ideate, design-negotiation) and plans measurement (instrumentation-plan, silver-measure), with handover artifacts and stop conditions defined between steps.

## Suggested bundles

- **better-interface** ([`better-interface`](skills/orchestration/better-interface/SKILL.md)): `better-accessibility`, `better-layout`, `better-writing`, `better-typography`, `better-colors`, `better-ui`, `interface-review`, `variant`, `break`, `explain-interface`, `product-design-review`
- **pre-handoff-review** ([`pre-handoff-review`](skills/orchestration/pre-handoff-review/SKILL.md)): `better-layout`, `localization-design`, `a11y-planner`, `better-accessibility`, `better-writing`, `design-system-governance`, `extract-design-md`, `motion-system`, `animation-vocabulary`, `platform-conventions`, `instrumentation-plan`, `product-design-review`, `design-handoff`
- **product-design-review** ([`product-design-review`](skills/orchestration/product-design-review/SKILL.md)): `better-interface`, `interface-review`, `better-accessibility`, `a11y-check-page`, `better-layout`, `platform-conventions`, `better-writing`, `better-typography`, `better-colors`, `better-ui`, `review-animations`, `agentic-ui-review`, `dark-pattern-review`, `design-debt-audit`
- **ux-research-workflow** ([`ux-research-workflow`](skills/orchestration/ux-research-workflow/SKILL.md)): `user-research-cookiy`, `silver-research`, `survey-design`, `ia-evaluation`, `silver-synthesize`, `service-blueprint`, `silver-ideate`, `design-negotiation`, `instrumentation-plan`, `silver-measure`, `research-planning`, `usability-testing`, `journey-mapper`, `product-discovery`

## Discovery

### `product-discovery` ⭐

Runs structured product discovery to de-risk bets before delivery: facilitates a Teresa Torres-style Opportunity Solution Tree (outcome -> opportunities -> solutions -> experiments, with quality checks on branch count and evidence grounding), maps desirability/viability/feasibility/usability assumptions and prioritizes them by risk x uncertainty via a bundled Python CLI, and gives problem-validation techniques (interviews, journey friction mapping, support-ticket synthesis) and solution-validation techniques (concept tests, prototype usability tests, fake-door/concierge tests, limited betas). Includes a 10-day discovery-sprint plan template with daily evidence reviews and an explicit proceed/pivot/stop decision gate.

- **Path**: [skills/discovery/product-discovery/SKILL.md](skills/discovery/product-discovery/SKILL.md)
- **Use when**: validate this product opportunity; map assumptions before we build; plan a discovery sprint; build an opportunity solution tree; test problem-solution fit before committing resources
- **Inputs**: a desired outcome or product bet to de-risk, a list of assumptions (desirability/viability/feasibility/usability) as CSV or inline text for prioritization
- **Outputs**: an Opportunity Solution Tree with opportunities, solutions and experiments, a risk-prioritized assumption test plan, a discovery-sprint schedule with a proceed/pivot/stop decision
- **Dependencies**: python3
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills/tree/19392f7a08264ed00486a251f5b2098321771f94/product-team/skills/product-discovery) @ `19392f7` by Alireza Rezvani, MIT
- **Status**: verified, stable, recommended default
- **Tags**: product-discovery, problem-framing, opportunity-mapping, assumption-mapping, requirements, prioritization
- **Related**: `silver-ideate`, `ux-research-workflow`, `design-negotiation`, `market-command-matrix`

### `silver-ideate`

Generates meaningfully distinct product-design concepts and testable hypotheses grounded in the current problem frame and constraints, then pauses for explicit human selection. Workflow: pin the problem frame, evidence, principles and constraints; generate alternatives with genuinely distinct mechanisms, assumptions and trade-offs (not surface variations); express a falsifiable hypothesis and the cheapest useful test for each; stop for explicit selection, recording the choice and the rejected trade-offs. Boundaries forbid choosing a direction on the user's behalf when human review is required, and forbid evading design-system constraints through visual novelty. Upstream emits its record through the Silver Design Framework CLI (.silver/bin/silver invoke), which is not bundled; used standalone, follow the workflow and boundaries and write the artifact directly.

- **Path**: [skills/discovery/silver-ideate/SKILL.md](skills/discovery/silver-ideate/SKILL.md)
- **Use when**: generate distinct concept alternatives for this problem; produce testable hypotheses from a problem frame; diverge before committing to a design direction; pause for explicit concept selection; propose alternatives that differ in mechanism, not just visuals
- **Inputs**: a problem frame (required), optional findings, design principles, and constraints
- **Outputs**: multiple concepts with distinct mechanisms, assumptions, and tradeoffs, each paired with a falsifiable hypothesis and its cheapest useful test, awaiting explicit human selection with rejected tradeoffs recorded
- **Dependencies**: node
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [thejparsenault/silver-design-framework](https://github.com/thejparsenault/silver-design-framework/tree/317ede0f594cda80f0d84b11098afac0c29e21b1/framework/skills/ideate) @ `317ede0` by JP Arsenault, MIT
- **Status**: verified, experimental
- **Tags**: opportunity-mapping, assumption-mapping, product-discovery, hypothesis
- **Related**: `silver-synthesize`, `silver-evaluate`, `design-negotiation`, `ux-research-workflow`, `product-discovery`

## User research

### `customer-journey-mapper`

Produces a customer-journey.md report spanning all seven canonical customer-lifecycle stages (Awareness, Consideration, Decision, Onboarding, Retention, Expansion, Advocacy) for a given product/service and target persona: uses WebSearch to ground the map in real reviews, complaints, and competitor comparisons when the product is known, and documents assumptions when it is not. For each stage it covers touchpoints, customer actions and thoughts, emotional state, pain points, and opportunities, then adds cross-stage analysis (emotional arc, critical moments of truth, handoff points, drop-off risk), two Mermaid journey diagrams with 1-5 satisfaction scoring, a three-horizon improvement roadmap (quick wins/medium-term/strategic), and a stage-level and journey-wide metrics dashboard, enforced to a minimum 400-line, no-emoji, no-generic-filler quality bar.

- **Path**: [skills/research/customer-journey-mapper/SKILL.md](skills/research/customer-journey-mapper/SKILL.md)
- **Use when**: map the customer journey for this product; customer journey mapper; identify churn risks across the customer lifecycle; design an onboarding flow for this persona; customer experience audit from awareness to advocacy
- **Inputs**: product or service description, target persona, known touchpoints and active channels (optional -- inferred if missing)
- **Outputs**: customer-journey.md covering all seven lifecycle stages, two Mermaid journey diagrams (overview and full-detail with satisfaction scores), cross-stage emotional arc, moments-of-truth, and drop-off risk analysis, a prioritized three-horizon improvement roadmap and metrics dashboard
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [OneWave-AI/claude-skills](https://github.com/OneWave-AI/claude-skills/tree/82859c0ebaff803889be6ca2efa0834ba8787773/customer-journey-mapper) @ `82859c0` by OneWave AI, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, experimental
- **Tags**: journey-mapping, personas, market-research, metrics
- **Related**: `journey-mapper`, `service-blueprint`

### `inclusive-personas` ⭐

Builds personas that represent the full ability spectrum from the start rather than retrofitting accessibility later. Maps permanent conditions (vision, hearing, motor, cognitive, speech), temporary conditions (broken arm, concussion, medication effects), and situational conditions (bright sunlight, noisy environment, one hand occupied, unfamiliar language) relevant to the project. Selects 4-6 personas covering 2-3 primary users, 1-2 edge-case users, and one stress-case user; documents each with context, abilities/conditions, technology and assistive-tech use, goals, frustrations, and environment; writes standard, assisted, and stress-path user stories per persona; and maps scenario intersections where different personas share the same underlying need (e.g. a sighted user in bright sunlight and a low-vision user). Ends with a validation prompt (who's missing, do these feel real) and a table of persona anti-patterns to avoid.

- **Path**: [skills/research/inclusive-personas/SKILL.md](skills/research/inclusive-personas/SKILL.md)
- **Use when**: create personas for this project; who are we designing for; build inclusive personas covering the ability spectrum; write user stories for these personas; define edge-case and stress-case users
- **Inputs**: The design brief or product context, Any existing research about the target users
- **Outputs**: 4-6 documented personas (context, abilities, technology, goals, frustrations, environment), Standard/assisted/stress-path user stories per persona, Scenario-intersection map and persona anti-pattern check
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designpowers](https://github.com/Owl-Listener/designpowers/tree/cb00757da9d554591fa78d27aa1854d60a05c4f7/skills/inclusive-personas) @ `cb00757` by MC Dean, MIT
- **Status**: verified, stable, recommended default
- **Tags**: personas, inclusive-design, segmentation, user-research
- **Related**: `persona`, `cognitive-accessibility`, `user-research-cookiy`

### `journey-mapper` ⭐

Scans a codebase (routes, components, auth roles, API calls, email templates, error/empty states) and generates a single self-contained, browser-ready HTML file combining an NN/g-format customer journey map and service blueprint. Infers 2-5 actors, 3-6 categories, and 4-12 journeys each broken into stages and moments, filling Doing/Frontstage/Backstage/Support factually from code evidence while prefixing every inferred Thinking/Feeling/Pain/Opportunity value with [Assumption] for a human to validate against real research. The output HTML has a sticky journey rail, an emotion curve that renders once feelings are set, JSON export/import for team annotation sharing, and localStorage autosave -- no server or build step required to view or edit it.

- **Path**: [skills/research/journey-mapper/SKILL.md](skills/research/journey-mapper/SKILL.md)
- **Use when**: map the user journey for this codebase; generate a service blueprint from our code; build a customer journey map; journey mapper; understand our user flows from the code
- **Inputs**: a codebase to scan (path or subdirectory), optional product name and extra context (design docs, research, README)
- **Outputs**: a single self-contained journey-map.html file, actor, category, and journey counts with coverage-gap notes, 2-3 standout pain points inferred from error states and friction-heavy flows
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [joeyvansommeren/journey-mapper](https://github.com/joeyvansommeren/journey-mapper/tree/bbb316a4c0a13d2f843c328f3a5fa94f64b82ff4/skills/journey-mapper) @ `bbb316a` by Joey van Sommeren, Apache-2.0 (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, stable, recommended default
- **Tags**: journey-mapping, service-blueprint, user-research, assumption-mapping
- **Related**: `customer-journey-mapper`, `service-blueprint`, `ux-research-workflow`

### `persona`

Builds reusable synthetic consumer persona panels and runs agent-separated qualitative or structured concept-test research against them. A three-step workflow (build panel, run ask/concept-test, review findings) generates diverse personas via a deterministic sampling-plan allocator with quantified diversity rules (Big Five spread, age/gender/geography/occupation spread, no two personas within 0.85 cosine similarity), validates the panel with automated hard-fail/warning QA checks, then fans each persona out to its own independent `claude -p` or `codex exec` subprocess with zero shared context and CLI-level context isolation so no persona's answer can anchor on another's or leak project context. An LLM adherence check scores each response against the persona profile on four weighted dimensions and regenerates low-scoring ones. Produces results.json/csv, cross-tabs, matplotlib charts, and an LLM- or template-synthesized markdown report, recording exact model IDs and per-call cost.

- **Path**: [skills/research/persona/SKILL.md](skills/research/persona/SKILL.md)
- **Use when**: build a persona panel for; ask a panel of personas about; run a concept test with synthetic personas; which concept would our target customers prefer; generate diverse AI personas for research; pressure-test this product concept before fieldwork
- **Inputs**: a market/topic description and optional segment definitions, 2-4 concept or option descriptions (for concept-test), an open-ended research question (for ask)
- **Outputs**: a reusable persona panel saved under personas/{survey-id}/ with a validation QA summary, results.json/results.csv of per-persona responses, cross-tabs and matplotlib charts (concept-test), an executive markdown report.md with run cost and model metadata
- **Dependencies**: python3, pandas, matplotlib, seaborn, claude-cli-or-codex-cli
- **Verified compatible with**: claude-code, codex
- **Source**: third-party — [takechanman1228/claude-persona](https://github.com/takechanman1228/claude-persona/tree/b4be6e641421968943003b84da16327c5c6a14c4/skills/persona) @ `b4be6e6` by Hajime Takeda, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, experimental
- **Tags**: personas, surveys, qualitative, quantitative, synthesis, segmentation
- **Related**: `inclusive-personas`, `synthetic-user-testing`, `user-research-cookiy`

### `research-planning` ⭐

Turns unclear user needs or contested assumptions into a structured research plan. Splits current understanding into known (evidence-backed), assumed, and unknown; converts gaps into 3-5 specific, observable, actionable research questions; matches each question type (what people do / why they struggle / what they need / which approach works / how they compare / who they are) to recommended methods via a lookup table; and requires every plan to address participant diversity, method accessibility, and situational context (stress, distraction, low bandwidth) rather than treating inclusion as optional. Outputs a research plan document with questions, a method/participants/timeline table, inclusion considerations, expected outputs, and the design decisions the research will inform. Explicitly scoped to planning only, not fielding the research.

- **Path**: [skills/research/research-planning/SKILL.md](skills/research/research-planning/SKILL.md)
- **Use when**: we're making assumptions about users, plan research to validate them; write a research plan; what research method should we use for this question; plan inclusive user research; turn these unknowns into research questions
- **Inputs**: A design brief or set of stated/unstated assumptions about users, Any existing evidence about the target users or context
- **Outputs**: Research plan document: research questions, method/participants/timeline table, inclusion considerations, expected outputs, decision points
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designpowers](https://github.com/Owl-Listener/designpowers/tree/cb00757da9d554591fa78d27aa1854d60a05c4f7/skills/research-planning) @ `cb00757` by MC Dean, MIT
- **Status**: verified, stable, recommended default
- **Tags**: user-research, qualitative, quantitative, requirements
- **Related**: `ux-research-workflow`, `user-research-cookiy`, `silver-research`, `survey-design`, `usability-testing`

### `research-synthesis`

Synthesizes raw user-research data (interview transcripts, survey results, usability-test notes, support tickets, NPS/CSAT responses, app-store reviews) into a structured report: an executive summary, quote-backed themes each with a prevalence count and product implication, an insight-to-opportunity table scored by impact and effort, identified user segments with characteristics and rough size, prioritized recommendations, and open questions for further research. Explicitly instructs separating observations from interpretations and quantifying findings instead of using vague terms like 'most users'. Works standalone from pasted data; optionally pulls in support tickets, NPS data, or product-analytics numbers from connected tools to supplement or validate the synthesis, and can publish the result to a connected knowledge base, but neither is required.

- **Path**: [skills/research/research-synthesis/SKILL.md](skills/research/research-synthesis/SKILL.md)
- **Use when**: synthesize this research; turn these interview transcripts into themes; summarize survey results into insights; distill usability test notes into recommendations; what are the key themes in this feedback
- **Inputs**: Interview transcripts or notes, survey results (CSV or pasted), usability-test notes, support tickets, NPS/CSAT responses, or app-store reviews
- **Outputs**: Markdown synthesis report: executive summary, quote-backed themes with prevalence, insight-to-opportunity table (impact/effort), user segments, prioritized recommendations, open questions, methodology notes
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins/tree/8c3ec5534fc6948b461c6a0275bdfdb8ab0c9888/design/skills/research-synthesis) @ `8c3ec55` by Anthropic, Apache-2.0 (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, stable
- **Tags**: user-research, synthesis, thematic-analysis, insights, qualitative, quantitative
- **Related**: `user-research-cookiy`, `silver-synthesize`, `ux-research-workflow`

### `service-blueprint` ⭐

Makes the agent map service delivery as a five-lane blueprint (physical evidence, user actions, frontstage, backstage, support processes) separated by lines of interaction, visibility, and internal interaction; a nine-step construction process from scoping one scenario to validation with operations teams; a blueprint-vs-journey-map decision table; and diagnostic reading rules (gaps between lanes, dense backstage clusters, single points of failure, silent user waits).

- **Path**: [skills/research/service-blueprint/SKILL.md](skills/research/service-blueprint/SKILL.md)
- **Use when**: service blueprint; map frontstage and backstage; diagnose service failures; multi-channel service design; operations behind the journey
- **Inputs**: journey map or research, process documentation, stakeholder input
- **Outputs**: service blueprint, failure-point findings, coordination artifact
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/ux-strategy/skills/service-blueprint) @ `20e34c4` by Owl-Listener, MIT
- **Status**: verified, stable, recommended default
- **Tags**: service-blueprint, journey-mapping, stakeholders
- **Related**: `silver-structure`, `journey-mapper`

### `silver-research`

Plans ethical product research: defines the decision the research must inform and the evidence needed, chooses a proportionate method, participant criteria, tasks and script, and defines consent, data minimization, sanitation, retention and evidence labeling, while explicitly marking the artifact as a plan and never implying sessions or observations already occurred. Boundaries forbid claiming planned participants or observations happened and forbid placing sensitive raw participant data in the repository. Upstream emits its record through the Silver Design Framework CLI (.silver/bin/silver invoke), which is not bundled; used standalone, follow the workflow and boundaries and write the artifact directly.

- **Path**: [skills/research/silver-research/SKILL.md](skills/research/silver-research/SKILL.md)
- **Use when**: plan ethical user research; define research questions and participant criteria; write a research plan without claiming it was conducted; plan evaluation or usability-test recruitment; define consent and data minimization for a study
- **Inputs**: a decision that needs research evidence and the question it must answer, optional existing product, problem-frame, or design-specification context
- **Outputs**: a research plan covering method, participant criteria, script, and consent/minimization/sanitation/retention handling, explicitly marked as planned rather than conducted
- **Dependencies**: node
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [thejparsenault/silver-design-framework](https://github.com/thejparsenault/silver-design-framework/tree/317ede0f594cda80f0d84b11098afac0c29e21b1/framework/skills/research) @ `317ede0` by JP Arsenault, MIT
- **Status**: verified, experimental
- **Tags**: user-research, interviews, qualitative, quantitative
- **Related**: `user-research-cookiy`, `survey-design`, `silver-synthesize`

### `silver-synthesize`

Converts sanitized evidence -- observations, analytics, supplied facts, and labeled assumptions -- into traceable findings, a problem frame, opportunities, contradictions, and open questions with provenance. Workflow: confirm every source is sanitized and revision-addressable, separate observations/analytics/facts/assumptions, cluster evidence without erasing contradictions or minority signals, and produce traceable findings. Boundaries forbid fabricating evidence, silently upgrading assumptions into findings, or rewriting upstream evidence while synthesizing it. Upstream's 'Done' step instructs emitting the finished record through a bundled `.silver/bin/silver invoke` CLI belonging to the parent Silver Design Framework installation; that CLI and its runtime are not included in this vendored skill, so used standalone an agent should follow the workflow and boundaries and write the findings/problem-frame artifact directly.

- **Path**: [skills/research/silver-synthesize/SKILL.md](skills/research/silver-synthesize/SKILL.md)
- **Use when**: synthesize research evidence into findings; turn feedback and analytics into a problem frame; cluster evidence without losing contradictions; separate assumptions from findings; produce traceable findings with provenance
- **Inputs**: sanitized evidence with provenance: observations, analytics, supplied facts, labeled assumptions, optional prior evaluation or map artifacts
- **Outputs**: findings and a problem frame that keep observation, interpretation, confidence, contradiction, and open questions distinguishable and traceable to their sources
- **Dependencies**: node
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [thejparsenault/silver-design-framework](https://github.com/thejparsenault/silver-design-framework/tree/317ede0f594cda80f0d84b11098afac0c29e21b1/framework/skills/synthesize) @ `317ede0` by JP Arsenault, MIT
- **Status**: verified, experimental
- **Tags**: synthesis, thematic-analysis, affinity-mapping, insights
- **Related**: `silver-research`, `user-research-cookiy`, `silver-ideate`

### `survey-design` ⭐

Makes the agent design survey instruments that produce trustworthy data: when surveys are and are not the right method, question-type selection table with cautions, rewrite patterns for leading/double-barreled/loaded questions, Likert/NPS/SUS scale rules (labelled endpoints, midpoints, verbatim SUS), sample-size guidance (~385 responses for +-5% margin at 95% confidence), and an analysis plan covering distributions, theme coding, and cross-tabulation.

- **Path**: [skills/research/survey-design/SKILL.md](skills/research/survey-design/SKILL.md)
- **Use when**: write a survey; design survey questions; NPS or SUS question; is this question leading; quantify research findings; sample size for a survey
- **Inputs**: research goals, draft questions, target population
- **Outputs**: survey instrument, question rewrites, sampling and analysis plan
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/design-research/skills/survey-design) @ `20e34c4` by Owl-Listener, MIT
- **Status**: verified, stable, recommended default
- **Tags**: surveys, quantitative, user-research, metrics
- **Related**: `user-research-cookiy`, `silver-research`

### `user-research-cookiy` ⭐

End-to-end user research assistant routing a request to one of three workflows. (1) Plan a Study: turns a research goal into a research plan, screening questionnaire and interview guide using an outcome-verb research question, sample-size and method guidance and an hourglass interview structure; fully offline. (2) Synthesize a Report: turns raw transcripts or notes into a coded, theme-built, evidence-backed report through a five-phase pipeline (familiarization, coding, theme development, synthesis with personas, opportunities and recommendations, report compilation) with named quality gates; fully offline. (3) Run with Cookiy: creates and manages interview studies or surveys on the Cookiy AI platform via a bundled bash/curl/jq CLI; requires a Cookiy account with a saved sign-in token and, for most operations, a funded wallet, so without an account this route cannot execute. The skill also suggests trying Cookiy after routes 1 and 2.

- **Path**: [skills/research/user-research-cookiy/SKILL.md](skills/research/user-research-cookiy/SKILL.md)
- **Use when**: plan a user research study; create an interview guide; draft a screening questionnaire; synthesize interview transcripts into a report; design a research survey; run a study with Cookiy AI
- **Inputs**: a research goal or vague research intent, for study planning, raw interview transcripts, notes, or summaries plus the interview guide used, for report synthesis, a Cookiy AI account access token, only for the Route 3 SaaS workflow
- **Outputs**: a research plan, screening questionnaire, and interview guide (Route 1), a structured analysis/ directory (config, codebook, themes, personas, findings, opportunities) and a final-report.md (Route 2), created studies/surveys, recruitment status, interview playback links, and reports on the Cookiy platform (Route 3, requires account)
- **Dependencies**: cookiy-account
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [cookiy-ai/user-research-skill](https://github.com/cookiy-ai/user-research-skill/tree/21eea10a34d3c9b4e711e3d19f0457603dd33e19) @ `21eea10` by Cookiy AI, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, stable, recommended default
- **Tags**: user-research, interviews, surveys, qualitative, quantitative, synthesis, thematic-analysis, personas
- **Related**: `survey-design`, `silver-research`, `silver-synthesize`, `ux-research-workflow`, `research-planning`, `research-synthesis`

### `ux-researcher-designer`

Generates data-driven user personas from structured user-data JSON (usage frequency, features used, device, tech proficiency, pain points) via a bundled Python script that clusters records into archetypes (power_user, casual_user, business_user, mobile_first) with demographics, goals, frustrations and design implications. Also gives workflows for building customer journey maps (stage-by-stage actions/touchpoints/emotions/pain-points/opportunities, B2B SaaS stage template, opportunity priority scoring), planning usability tests (research-question framing, method-selection table, task design, success-metric targets, moderator-guide checklist), and synthesizing raw research into clustered, evidence-cited findings with prioritized opportunities. Includes reference tables for research-method selection, persona confidence levels by sample size, and usability-issue severity ratings.

- **Path**: [skills/research/ux-researcher-designer/SKILL.md](skills/research/ux-researcher-designer/SKILL.md)
- **Use when**: generate a user persona from research data; build a customer journey map; plan a usability test; synthesize interview or survey findings into insights; define user archetypes from analytics data
- **Inputs**: user data as JSON (demographics, usage patterns, pain points) for persona generation, a persona, goal and timeframe for journey mapping, a design or prototype to validate for usability-test planning, raw interview/survey/observation notes for synthesis
- **Outputs**: a data-driven persona (archetype, demographics, goals, frustrations, design implications, confidence level), a journey map with per-stage actions, emotions, pain points and prioritized opportunities, a usability-test plan (method, tasks, success metrics, moderator guide), a research synthesis brief with coded findings, cluster sizes and prioritized recommendations
- **Dependencies**: python3
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills/tree/19392f7a08264ed00486a251f5b2098321771f94/product-team/skills/ux-researcher-designer) @ `19392f7` by Alireza Rezvani, MIT
- **Status**: verified, stable
- **Tags**: user-research, personas, journey-mapping, usability-testing, synthesis, interviews, qualitative, quantitative
- **Related**: `user-research-cookiy`, `research-planning`, `survey-design`

## Product strategy

### `design-negotiation` ⭐

Makes the agent coach a designer through cross-functional negotiations: four scripted contexts (timeline compression, scope cut without review, stakeholder override, resource requests) each with a concrete approach; an evidence hierarchy (research counts, metrics, competitive context, WCAG/legal risk, system precedent) replacing taste and authority arguments; negotiation principles (lead with the user problem, name constraints first, make trade-offs explicit, document decisions that go against design); and long-term credibility building.

- **Path**: [skills/strategy/design-negotiation/SKILL.md](skills/strategy/design-negotiation/SKILL.md)
- **Use when**: push back on scope cut; defend a design decision; stakeholder wants a change; negotiate design timeline; argue for design resources
- **Inputs**: the decision at stake, available evidence, stakeholder context
- **Outputs**: negotiation approach, evidence-based argument, documented trade-off
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/designer-toolkit/skills/design-negotiation) @ `20e34c4` by Owl-Listener, MIT
- **Status**: verified, stable, recommended default
- **Tags**: stakeholders, prioritization, decision-records, metrics
- **Related**: `silver-ideate`

### `market-command-matrix`

Turns competitor research into a decision, not a summary: classifies each priority competitor on two axes (market mindshare and resource strength dedicated to the market) into one of five categories -- all-out attack, monitor, harvest, ignore, or partner -- each mapped to a specific playbook of moves, then names one primary motion, an owner, and a trigger per player. Runs reconnaissance (unaided-before-aided customer-view signal collection across messaging, pricing, hiring/funding, SEO, and reviews), extraction questions per competitor, matrix placement with rationale and confidence, playbook selection, and an optional market-shape read (fragmented/challenger/ancient/mature). Includes a completion gate that blocks a 'research only' handoff with no attached decision.

- **Path**: [skills/strategy/market-command-matrix/SKILL.md](skills/strategy/market-command-matrix/SKILL.md)
- **Use when**: competitor analysis; market mapping; GTM prioritisation; build a battlecard; market intelligence review
- **Inputs**: a market/category and the priority competitors to evaluate, publicly observable competitor signals (site messaging, pricing, ads, reviews, hiring/funding, SEO)
- **Outputs**: a competitor map (direct/adjacent/substitute/ecosystem), a matrix placement per competitor with rationale and confidence, one primary playbook motion, owner, and trigger per priority competitor, an optional market-shape read and whitespace/positioning notes
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [its-thepoe/skills](https://github.com/its-thepoe/skills/tree/3172de431451bbad2958b1fd87a79d1ccd39b0e3/design/market-command-matrix) @ `3172de4` by Oladipupo Ayoola (its-thepoe), MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, experimental
- **Tags**: competitive-analysis, market-research, prioritization, roadmapping, stakeholders
- **Related**: `design-negotiation`, `product-discovery`

## Information architecture

### `ia-evaluation` ⭐

Plans, runs and analyses information-architecture studies: matches the question to open, closed or hybrid card sorts, tree tests or first-click tests; designs cards, trees, goal-language tasks and participant targets; analyses similarity matrices, clusters and standardised labels for sorts, and success, directness, time and wrong-path distributions for tree tests, using field thresholds; and turns results into a sitemap or navigation recommendation with the contested items resolved and the follow-up study named.

- **Path**: [skills/information-architecture/ia-evaluation/SKILL.md](skills/information-architecture/ia-evaluation/SKILL.md)
- **Use when**: run a card sort; tree test this navigation; users cannot find the settings; validate these category labels; reorganise the menu; first-click test
- **Inputs**: the structure question, content inventory or proposed tree, participant access or recruitment plan
- **Outputs**: study plan with instruments, results tables with thresholds, sitemap or navigation recommendation
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: original to this repository (MIT)
- **Status**: verified, experimental, recommended default
- **Tags**: information-architecture, card-sorting, tree-testing, navigation, taxonomy, sitemap, user-research
- **Related**: `silver-structure`, `service-blueprint`, `ux-research-workflow`, `better-writing`

### `silver-structure`

Defines and refines information architecture: navigation structure, taxonomy, content models and object models (what exists, how it is organized, how things relate), explicitly distinct from flows (sequences over time) and journey or service maps. Workflow: name the question and structure type; define entities, attributes and parent/child relationships; define relationships between entities with cardinality where known; record structural rules, leaving genuine ambiguity recorded rather than resolved by assumption. Hands off flows, journey maps, components and tokens to sibling skills. Includes a dependency-free Node script (scripts/check-structure.mjs) that validates a structure JSON file for duplicate entity ids, missing parents, parent cycles and dangling relationships. Upstream emits its record through the Silver Design Framework CLI (.silver/bin/silver invoke), which is not bundled; used standalone, follow the workflow and boundaries and write the artifact directly.

- **Path**: [skills/information-architecture/silver-structure/SKILL.md](skills/information-architecture/silver-structure/SKILL.md)
- **Use when**: define the information architecture for this product; model entities and relationships; build a taxonomy or content model; distinguish structure from flow and from journey maps; check a structure definition for cycles or missing references
- **Inputs**: a product or design-specification context needing structural definition, optionally, existing findings or maps that inform the structure
- **Outputs**: named entities, attributes, and parent/child relationships; explicit relationships with cardinality where known; and structural rules, with genuine ambiguity recorded rather than assumed
- **Dependencies**: node
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [thejparsenault/silver-design-framework](https://github.com/thejparsenault/silver-design-framework/tree/317ede0f594cda80f0d84b11098afac0c29e21b1/framework/skills/structure) @ `317ede0` by JP Arsenault, MIT
- **Status**: verified, experimental
- **Tags**: information-architecture, taxonomy, content-hierarchy, mental-models
- **Related**: `service-blueprint`, `ia-evaluation`

## Interaction design

### `animate` ⭐

Builds a web animation from scratch in the order that determines whether it feels right: a frequency-based should-it-animate-at-all gate (100+/day actions never animate), a required one-word purpose (feedback, spatial consistency, state indication, preventing a jarring change, explanation, or delight), a cheapest-tool-first ladder (CSS transition to @starting-style to CSS animation to WAAPI to a motion library), exact easing curves and duration budgets by element type, transform/opacity-only property rules, interruption and exit rules, and mandatory reduced-motion and hover gating -- plus ready-to-build recipes for buttons, dropdowns, modals, drawers, toasts, accordions, stagger, hold-to-confirm, tab indicators, scroll reveal and drag-to-dismiss.

- **Path**: [skills/interaction-design/animate/SKILL.md](skills/interaction-design/animate/SKILL.md)
- **Use when**: add an animation to this component; make this feel alive; build a transition; animate this modal or dropdown; should this animate
- **Inputs**: a request to animate a specific UI element or interaction, the project's existing motion tokens and libraries, if any
- **Outputs**: implementation code (CSS, WAAPI, or a motion library call), a short rationale: gate result, ingredients (tool/properties/curve/duration), and what to feel-check
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/animate) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: verified, stable, recommended default
- **Tags**: motion, animation, micro-interactions, interaction-design, performance
- **Related**: `better-ui`, `review-animations`, `animation-vocabulary`, `animate-expo`, `find-animation-opportunities`, `improve-animations`

### `animate-expo`

Builds animations in React Native and Expo apps, applying the same should-it-animate gate and named-purpose requirement as the web animate skill but adapted to mobile's three constraints: no hover, two runtimes (RN vs. UI thread), and a finger on the element. Picks the cheapest tool from Reanimated CSS transitions/animations through layout animations to gesture-driven shared values, gives exact spring configs (Apple's duration+dampingRatio form) and easing curves, enforces keeping motion off the JS thread (never setState in a gesture handler, scheduleOnRN not runOnJS), covers press/haptics/reduced-motion rules specific to touch, and provides ready recipes for sheets, swipe-to-delete, collapsing headers, list entrances, keyboard-synced UI and screen transitions.

- **Path**: [skills/interaction-design/animate-expo/SKILL.md](skills/interaction-design/animate-expo/SKILL.md)
- **Use when**: animate something in this Expo app; add a gesture-driven bottom sheet; React Native animation stutters on device; add haptics to this interaction; screen transition in Expo Router
- **Inputs**: a request to animate an Expo/React Native component, gesture, sheet, or screen transition
- **Outputs**: implementation code using Reanimated, Gesture Handler, Expo Router, and expo-haptics, a short rationale: gate result, ingredients (tool/properties/spring or curve/thread), and what to feel-check on a real device
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/animate-expo) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: verified, stable
- **Tags**: motion, animation, micro-interactions, mobile, interaction-design, performance
- **Related**: `animate`, `apple-design`

### `animation-vocabulary`

Reverse-lookup glossary that turns a vague, feel-based description of a web animation or motion effect ('the bouncy thing when a popover opens', 'the iOS rubber-band scroll') into its precise, quotable term, organized into ten categories (entrances/exits, sequencing, transforms, state transitions, scroll, feedback, easing, springs, looping, polish, performance, and design principles) with a disambiguation method for near-synonymous terms like clip-path vs. mask or pop-in vs. bounce.

- **Path**: [skills/interaction-design/animation-vocabulary/SKILL.md](skills/interaction-design/animation-vocabulary/SKILL.md)
- **Use when**: what's this animation called; name this motion effect; what's the term for this transition; how do I describe this effect to an AI
- **Inputs**: a loose, sensation-based description of an animation or motion effect
- **Outputs**: the matching glossary term with its definition, plus close alternates and how they differ when ambiguous
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/animation-vocabulary) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: verified, stable
- **Tags**: motion, animation, terminology, interaction-design
- **Related**: `animate`

### `apple-design` ⭐

Apple's approach to fluid, physical interface motion and design foundations, distilled from WWDC design talks (Designing Fluid Interfaces, Designing Audio-Haptic Experiences, The Details of UI Typography, Principles of Great Design) and translated to web APIs (Pointer Events, requestAnimationFrame, spring libraries). Covers response/latency elimination, 1:1 direct manipulation, interruptibility as the core principle, Apple's damping-ratio/response spring parameters with concrete values, velocity handoff and momentum projection formulas, spatial consistency, rubber-banding, translucent materials and depth layering, multimodal (motion+sound+haptic) feedback rules, reduced-motion/transparency/contrast handling, and size-specific typography tracking and leading -- closing with Apple's eight design principles (purpose, agency, responsibility, familiarity, flexibility, simplicity, craft, delight).

- **Path**: [skills/interaction-design/apple-design/SKILL.md](skills/interaction-design/apple-design/SKILL.md)
- **Use when**: make this drag interaction feel like Apple's; build a spring-based gesture; translucent material / glass UI; Apple-style bottom sheet; interruptible animation with velocity handoff
- **Inputs**: a gesture-driven, spring-animated, or materials-heavy UI component to build or review
- **Outputs**: implementation guidance and code (spring configs, velocity/momentum formulas, backdrop-filter recipes) plus a quick-reference table of technique to concrete value
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/apple-design) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: verified, stable, recommended default
- **Tags**: motion, animation, interaction-design, typography
- **Related**: `animate`, `platform-conventions`, `animate-expo`, `apple-hig-expert`

### `apple-hig-expert`

Audits and designs iOS/macOS/watchOS/visionOS interfaces against the Apple Human Interface Guidelines including Liquid Glass (shipped iOS 26/macOS Tahoe, Sept 2025). Two modes: design-from-scratch (platform navigation paradigm and layout primitives, then typography and semantic color) or HIG audit (fill an audit template, run the bundled Python compliance tool -- contrast-ratio, tap-target-size, and batch JSON-to-scorecard subcommands -- and deliver a scored report starting at 100 with -10 per violation). Covers accessibility (VoiceOver labels, 44x44pt minimum targets, 4.5:1/3:1 contrast, Dynamic Type) and platform ergonomics per device (tab bars/thumb reach on iOS, sidebars/menu bar on macOS, ornaments/gaze on visionOS, glanceable layouts on watchOS), with a worked audit example and confidence-tagged findings (tool-verified / needs device test / assumed).

- **Path**: [skills/interaction-design/apple-hig-expert/SKILL.md](skills/interaction-design/apple-hig-expert/SKILL.md)
- **Use when**: audit my iOS app against the HIG; is this text readable on Liquid Glass?; design a native-feeling macOS or visionOS UI; check contrast or tap-target sizes for an Apple platform; review this mockup for Apple platform compliance
- **Inputs**: a mockup, screenshot, or code for an iOS/macOS/watchOS/visionOS app to audit or design, a JSON batch file of contrast and tap-target checks for the compliance script
- **Outputs**: a scored HIG-compliance report (0-100) with named violations and fixes, confidence-tagged, design guidance keyed to the target platform's navigation and layout conventions
- **Dependencies**: python3
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills/tree/19392f7a08264ed00486a251f5b2098321771f94/product-team/apple-hig-expert/skills/apple-hig-expert) @ `19392f7` by Alireza Rezvani, MIT
- **Status**: verified, stable
- **Tags**: a11y, wcag, contrast, mobile, desktop, ui-design, interaction-design, audit, design-review
- **Related**: `apple-design`, `platform-conventions`

### `design-motion-principles`

Runs a context-weighted motion and interaction design audit through three named designer lenses (Emil Kowalski's restraint/speed rules, Jakub Krehel's production-polish recipes, Jhey Tompkins' playful CSS experimentation), starting with reconnaissance of the project's type and existing animation patterns, a mandatory motion-gap analysis that greps for conditional renders and ternary UI swaps lacking AnimatePresence or CSS transitions, and a proposed per-designer weighting the user confirms before the full audit runs. Produces a severity-scored audit (critical/important/opportunities) with per-designer findings, cubic-bezier and duration values, and a mandatory prefers-reduced-motion check.

- **Path**: [skills/interaction-design/design-motion-principles/SKILL.md](skills/interaction-design/design-motion-principles/SKILL.md)
- **Use when**: motion audit; review these animations; interaction design audit; why does this transition feel off; check for missing animations
- **Inputs**: a codebase or component to audit for motion, project context (CLAUDE.md/AGENTS.md, package.json, existing animation code), user confirmation of the proposed designer-perspective weighting
- **Outputs**: a reconnaissance summary with a proposed perspective weighting, a motion-gap list (conditional renders lacking transitions), a per-designer audit with severity-scored findings and specific fixes
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [its-thepoe/skills](https://github.com/its-thepoe/skills/tree/3172de431451bbad2958b1fd87a79d1ccd39b0e3/design/design-motion-principles) @ `3172de4` by Oladipupo Ayoola (its-thepoe), MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, stable
- **Tags**: micro-interactions, motion, animation, interaction-design, a11y, performance
- **Related**: `animate`, `review-animations`, `motion-system`

### `laws-of-ux` ⭐

Improves or critiques any user interface using 30 evidence-based UX principles drawn from cognitive psychology and perception research (Gestalt grouping, Hick's Law, Fitts's Law, Jakob's Law, Miller's Law, aesthetic-usability effect, cognitive load, and more). Provides a 5-step procedure for running a UX pass on a screen: name the symptom, pull the relevant principles, propose a concrete change citing the principle by name, check for conflicts between principles, and flag when testing with real users is still required. reference/laws.md gives each principle's mechanism, concrete application, pitfalls, and a real-world example.

- **Path**: [skills/interaction-design/laws-of-ux/SKILL.md](skills/interaction-design/laws-of-ux/SKILL.md)
- **Use when**: review this UI against UX principles; why does this screen feel cluttered; apply Hick's Law / Fitts's Law; critique this design; diagnose why users abandon this form; cite a UX law for this decision
- **Inputs**: a screen, flow, or component to design or critique, optionally, a named symptom (e.g. 'too many buttons', 'feels slow')
- **Outputs**: 1-3 cited UX principles relevant to the symptom, a concrete proposed change with the principle named, a note on any conflicting principles and how they were resolved
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [ali-kk/uxlaws](https://github.com/ali-kk/uxlaws/tree/4defa957c3058b89f4a53dc794865602313c6d97/skills/laws-of-ux) @ `4defa95` by ali-kk, MIT
- **Status**: verified, stable, recommended default
- **Tags**: ui-design, interaction-design, visual-hierarchy, design-critique, onboarding, forms
- **Related**: `design-review`, `better-layout`

### `onboarding` ⭐

Designs and audits post-signup onboarding and activation: picks an activation model (freemium, free trial, paid trial, money-back, consultation) using Model-Market Fit before shaping the flow, defines the product's activation event (the action most correlated with retention), and strips the path to it down to a Minimum Path to Value using an inventory-remove-reconstruct process grounded in Hick's Law and real abandonment benchmarks (40-60% single-session drop-off, 75-80% within day one). Applies five behavior-design mechanisms (Endowed Progress Effect, Peak-End Rule, Goldilocks Rule, BJ Fogg Behavior Model, boosters/blockers) to a 10-component onboarding toolkit (checklists, empty states, tooltips, welcome forms, drip emails), and outputs either a Finding/Impact/Recommendation/Priority audit or a full flow design with checklist items, empty-state copy, and a measurement plan.

- **Path**: [skills/interaction-design/onboarding/SKILL.md](skills/interaction-design/onboarding/SKILL.md)
- **Use when**: design an onboarding flow; users sign up but don't activate; what's our aha moment; audit our onboarding checklist; reduce time to value
- **Inputs**: product type and core value proposition (B2B/B2C), current post-signup flow and where users drop off, an activation definition or retention data to infer one
- **Outputs**: a chosen activation model with rationale, a defined activation event and Minimum Path to Value, an onboarding flow design or Finding/Impact/Recommendation/Priority audit, a measurement plan (activation rate, time to activation, funnel drop-off)
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills/tree/e55de886fe7580ec75cdb7ded5092b33f7d4ed58/skills/onboarding) @ `e55de88` by Corey Haines, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, stable, recommended default
- **Tags**: onboarding, empty-states, activation, retention, state-design
- **Related**: `signup`, `laws-of-ux`, `better-writing`

### `platform-conventions` ⭐

Makes the agent design native mobile UI against the actual conventions of iOS (Human Interface Guidelines) and Android (Material Design 3): side-by-side comparison tables for navigation models, controls, typography, gestures, and iconography; a decision framework for when to follow each platform strictly, when to unify cross-platform, and the hybrid middle path; and explicit anti-patterns (suppressing iOS swipe-back, transplanting the FAB to iOS, ignoring Dynamic Type/sp scaling).

- **Path**: [skills/interaction-design/platform-conventions/SKILL.md](skills/interaction-design/platform-conventions/SKILL.md)
- **Use when**: design an iOS app screen; Android vs iOS pattern; Material Design conventions; native app navigation; should this app follow platform conventions; cross-platform design decisions
- **Inputs**: app screens or mockups, target platforms, product context
- **Outputs**: platform-appropriate design recommendations, iOS/Android component mapping, convention-deviation flags
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/ui-design/skills/platform-conventions) @ `20e34c4` by Owl-Listener, MIT
- **Status**: verified, stable, recommended default
- **Tags**: mobile, ui-design, interaction-design, navigation, adaptive
- **Related**: `apple-design`, `better-layout`

### `signup`

Audits and redesigns signup/registration/account-creation flows for friction: a field-by-field pass (email, password, name, social auth, phone, company, use-case questions) with a keep-defer-infer test for every field, concrete password-UX rules (allow paste, strength meter over rigid rules, show requirements upfront), single-step vs. multi-step decision criteria with a progressive-commitment field ordering, mobile-specific rules (44px+ touch targets, correct keyboard types, single column), and microcopy rules for labels vs. placeholders and inline error handling. Outputs a Finding/Impact/Fix/Priority audit or a full form redesign with field set, copy, and layout, plus a categorized bank of signup-flow experiment ideas.

- **Path**: [skills/interaction-design/signup/SKILL.md](skills/interaction-design/signup/SKILL.md)
- **Use when**: audit our signup flow; reduce signup form friction; should this be single-step or multi-step signup; review our registration form fields; improve signup completion rate
- **Inputs**: the current signup/registration flow (steps, fields, screenshots), current completion rate and field-level drop-off data if available, business constraints on what data must be collected at signup
- **Outputs**: a Finding/Impact/Fix/Priority audit of the signup flow, a recommended field set with rationale and field order, copy for labels, placeholders, buttons, and error messages, a bank of signup-flow experiment ideas by category
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills/tree/e55de886fe7580ec75cdb7ded5092b33f7d4ed58/skills/signup) @ `e55de88` by Corey Haines, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, experimental
- **Tags**: forms, onboarding, state-design, error-messages, mobile
- **Related**: `onboarding`, `laws-of-ux`

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
- **Status**: verified, stable
- **Tags**: illustration, color, visual-hierarchy, visual-polish
- **Related**: `canvas-design`

### `better-colors` ⭐

Color-system design and audit guidance: ramps named by role rather than picked by eye (neutral/accent/status), a two-tier primitive-then-semantic token naming grammar, perceptual ramp-generation rules (constant hue, even perceived lightness, vividness peaking mid-ramp), APCA and WCAG 2 contrast thresholds with a report-don't-repaint measurement discipline, gradient interpolation-space choices, P3/sRGB gamut fallbacks, dark-mode derivation rules, and a calibrated severity report format ending in Block/Approve.

- **Path**: [skills/visual-design/better-colors/SKILL.md](skills/visual-design/better-colors/SKILL.md)
- **Use when**: build a color palette; name design tokens for color; check contrast ratio; dark mode colors; color ramp generation; audit a codebase's colors
- **Inputs**: a brand color or existing palette, UI source code or rendered screens to audit
- **Outputs**: ramp values in the project's notation, token naming scheme (primitive + semantic tiers), severity-ranked findings table ending in Block/Approve
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/better-colors) @ `ca48385` by Jakub Krehel, MIT
- **Status**: verified, stable, recommended default
- **Tags**: color, design-tokens, token-naming, semantic-tokens, dark-mode, themes, contrast
- **Related**: `better-accessibility`, `design-tokens`, `theme-factory`, `token-naming`

### `better-layout` ⭐

Layout-structure guidance for web interfaces: grouping by negative space with a 2x inter/intra-group gap ratio, keeping controls visually distinct from static content, shared-edge alignment, logical (RTL-safe) properties over physical left/right, importance-ordered content, progressive-disclosure affordances (peeking scroll items, disclosure controls), breakpoints driven by content rather than device presets, container queries, safe-area-aware full-bleed vs. floating-control layering, and string-growth/clipping resilience, closing with a calibrated severity report ending in Block/Approve.

- **Path**: [skills/visual-design/better-layout/SKILL.md](skills/visual-design/better-layout/SKILL.md)
- **Use when**: structure this page layout; review layout spacing and alignment; what collapses at small sizes; RTL layout review; breakpoint strategy
- **Inputs**: UI component or page source code, supported viewport list
- **Outputs**: severity-ranked findings table (Severity | Location | Before | After | Why), Block/Approve verdict
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/better-layout) @ `ca48385` by Jakub Krehel, MIT
- **Status**: verified, stable, recommended default
- **Tags**: layout, spacing, responsive, adaptive, visual-hierarchy
- **Related**: `better-typography`, `platform-conventions`, `better-ui`, `critique-information-density`

### `better-typography` ⭐

Web typography guidance: font-format and weight-loading rules, CSS properties over raw variable-font/OpenType tags, type-scale construction with descending heading steps, line-height and letter-spacing by role, measure capping (60-75 characters), text-wrap balance/pretty usage, tabular numbers, truncation without losing content, smart punctuation, from-font underline metrics, the 16px iOS input-zoom fix (two documented approaches), font-smoothing and bidi/lang/dir handling, closing with a calibrated severity report ending in Block/Approve, plus a CSS-to-Tailwind cheat sheet for every declaration covered.

- **Path**: [skills/visual-design/better-typography/SKILL.md](skills/visual-design/better-typography/SKILL.md)
- **Use when**: set up a type scale; review typography and font choices; fix text truncation; iOS input zoom on mobile; variable font setup
- **Inputs**: UI component or page source code, rendered page for wrapping/widow checks
- **Outputs**: severity-ranked findings table (Severity | Location | Before | After | Why), Block/Approve verdict, CSS-to-Tailwind property lookup
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/better-typography) @ `ca48385` by Jakub Krehel, MIT
- **Status**: verified, stable, recommended default
- **Tags**: typography, spacing, visual-hierarchy
- **Related**: `better-layout`, `better-writing`

### `better-ui` ⭐

Design-engineering polish guidance for making interfaces feel finished: concentric border-radius math, optical over geometric alignment, shadows-for-elevation vs. borders-for-structure, interruptible CSS transitions vs. one-shot keyframes, split-and-stagger enter animations with subtle exits, exact contextual icon cross-fade values (scale/opacity/blur, spring bounce 0), theme-switch transition suppression, transition-property specificity and will-change usage, icon stroke-weight matching to adjacent text and RTL icon-flip rules, and image-outline recipes, closing with a calibrated severity report ending in Block/Approve.

- **Path**: [skills/visual-design/better-ui/SKILL.md](skills/visual-design/better-ui/SKILL.md)
- **Use when**: polish this UI; interface feels off; add enter/exit animation; icon transition on state change; border radius mismatch; theme switch transition
- **Inputs**: UI component source code, rendered interface for slow-motion animation review
- **Outputs**: severity-ranked findings table (Severity | Location | Before | After | Why), Block/Approve verdict
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/better-ui) @ `ca48385` by Jakub Krehel, MIT
- **Status**: verified, stable, recommended default
- **Tags**: micro-interactions, motion, animation, visual-polish, iconography, performance
- **Related**: `animate`, `motion-system`, `review-animations`, `better-layout`

### `canvas-design`

Directs the agent to create standalone visual art (poster-style .pdf or .png output) in two steps: first write a named visual-philosophy manifesto (color/form/composition direction, explicitly emphasizing craftsmanship language) as a .md file, then express that philosophy on a canvas using minimal, design-forward typography pulled from the bundled canvas-fonts library, with a refinement pass before final output. Ships 26 SIL-OFL-licensed font families for use in the generated artwork.

- **Path**: [skills/visual-design/canvas-design/SKILL.md](skills/visual-design/canvas-design/SKILL.md)
- **Use when**: design a poster; create a piece of visual art; make a PDF design with a strong aesthetic; generate a design philosophy and express it visually
- **Inputs**: a subtle creative brief or theme to interpret, no real content required -- the skill invents the visual direction
- **Outputs**: a design-philosophy .md file (4-6 paragraphs), a finished .pdf or .png poster/art piece using bundled fonts
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [anthropics/skills](https://github.com/anthropics/skills/tree/3b3fad96af16a10759d930941b4520ba0c40edae/skills/canvas-design) @ `3b3fad9` by Anthropic, Apache-2.0
- **Status**: verified, stable
- **Tags**: typography, color, layout, visual-hierarchy, illustration, visual-polish
- **Related**: `algorithmic-art`

### `diagram-design` ⭐

Produces branded editorial diagrams in 39 visual types (architecture, flowchart, sequence, state machine, ER, timeline, swimlane, quadrant, radar, tree, org chart, layer stack, Venn, pyramid, treemap, bar, slopegraph, Gantt, scatter, Sankey, fishbone, Wardley map, kanban, user journey, deployment, dependency graph, UML class, story map, database schema and more) as standalone self-contained HTML files with inline SVG and CSS, following an opinionated editorial design system: a single style-guide.md source of truth for color and typography tokens, a 4px grid, numeric complexity budgets per type, six mandatory connector-routing rules and an accessible-SVG contract (role=img, aria-labelledby, title/desc). Redraws existing .drawio or Mermaid sources through local structural extractors, onboards brand tokens from a website, skill or folder, supports hand-drawn and terminal skins, exports PNG/SVG, and ships Python verifier scripts for geometry and contrast that the agent runs against its own output.

- **Path**: [skills/visual-design/diagram-design/SKILL.md](skills/visual-design/diagram-design/SKILL.md)
- **Use when**: draw an architecture diagram; make a flowchart / sequence diagram / ER diagram; turn this draw.io or Mermaid file into a proper diagram; create a Gantt chart or timeline; visualize this as a diagram, not a table; brand this diagram to match our website
- **Inputs**: a description of the system, process, or data to diagram, optional .drawio/.drawio.png/.drawio.svg or Mermaid .mmd source to redraw, optional brand source (website URL, installed skill, or local design-token folder) for onboarding
- **Outputs**: a self-contained .html file with inline SVG and CSS (the diagram), optional .svg and/or .png exports, for imports, a fidelity ledger reporting what was merged, collapsed, or dropped
- **Dependencies**: python
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design/tree/ac490fd1ac4b4014100f93e729cb4ad198700bd4/skills/diagram-design) @ `ac490fd` by Cathryn Lavery, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, stable, recommended default
- **Tags**: data-visualization, charts, visual-hierarchy, layout, typography, color, brand

### `frontend-design` ⭐

Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Directs the agent to work in two passes (a compact color/type/layout/signature token plan, self-critiqued against generic AI-design defaults, then implementation), names three specific overused AI-generated aesthetic clusters to avoid unless the brief calls for them, and gives concrete rules for typography pairing, structural devices, deliberate motion, CSS specificity pitfalls, and end-user-facing UX writing (active voice, consistent verb-to-toast naming, non-apologetic error copy).

- **Path**: [skills/visual-design/frontend-design/SKILL.md](skills/visual-design/frontend-design/SKILL.md)
- **Use when**: design a landing page; make this UI look distinctive; avoid generic AI-generated design; pick a typography and color direction; critique my design plan before building; write UX copy for this interface
- **Inputs**: a design brief or existing UI to redesign, any known audience/brand context in memory
- **Outputs**: a token plan (4-6 named hex colors, 2+ type roles, layout concept, signature element), a self-critique noting what was revised and why, implemented UI code (markup/CSS) following the revised plan, UX copy for labels, errors, and empty states
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [anthropics/skills](https://github.com/anthropics/skills/tree/3b3fad96af16a10759d930941b4520ba0c40edae/skills/frontend-design) @ `3b3fad9` by Anthropic, Apache-2.0
- **Status**: verified, stable, recommended default
- **Tags**: typography, color, layout, visual-hierarchy, ui-design, interaction-design, responsive, motion, ux-writing, voice-and-tone
- **Related**: `frontend-design-review`, `theme-factory`, `better-ui`, `pick-ui-library`

### `make-a-deck`

Shifts the agent into presentation-designer mode for slide decks: fixed 1920x1080 canvas per slide, named CSS type-scale and spacing constants instead of ad-hoc pixel values, an intake step for length/audience/delivery mode, a chapter-driven title-writing discipline (write and review the full title sequence as a standalone artifact before building any slide), rules for content density, visual variety across slide types, pixel-level parallelism of repeated chrome, and image-handling modes (full-bleed, aspect-fit, contrasting background). Lists forbidden deck tropes (takeaway boxes, accent-border call-outs, emoji-as-iconography, self-drawn SVGs, default gradient washes) and AI-sounding title phrasing to refuse.

- **Path**: [skills/visual-design/make-a-deck/SKILL.md](skills/visual-design/make-a-deck/SKILL.md)
- **Use when**: make a slide deck; build a presentation; design slides for this pitch; create a board update deck; turn this into a presentation
- **Inputs**: a presentation topic and length in minutes, audience, delivery mode, and any brand context
- **Outputs**: a fixed-canvas HTML slide deck (1920x1080 sections) with a coherent title sequence, consistent type-scale/spacing tokens, and varied slide types
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [manalkaff/opendesign](https://github.com/manalkaff/opendesign/tree/cecd9bb6b59408cb96a3974449b8e6ef9f5b17bb/skills/make-a-deck) @ `cecd9bb` by manalkaff, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, experimental
- **Tags**: typography, layout, visual-hierarchy, spacing, grids
- **Related**: `canvas-design`

### `redesign-existing-projects`

Upgrades an existing website or app to premium visual quality without breaking functionality or migrating frameworks: scans the codebase for its styling system, then runs a scan/diagnose/fix sequence against a long, concrete checklist of generic-AI-output patterns across typography, color and surfaces, layout, interactivity and states, copy, component patterns, iconography, code quality, and commonly-omitted pages (404, legal links, form validation), each paired with a specific replacement technique. Ends with a fix-priority order (font swap, color cleanup, hover/active states, layout and spacing, component swaps, state coverage, typography polish) so improvements land highest-impact-first.

- **Path**: [skills/visual-design/redesign-existing-projects/SKILL.md](skills/visual-design/redesign-existing-projects/SKILL.md)
- **Use when**: redesign this project; make this look less generic; upgrade the visual design of this app; fix these AI design patterns; audit and improve this existing UI
- **Inputs**: an existing website or app codebase, its current styling system (Tailwind, vanilla CSS, styled-components, etc.)
- **Outputs**: a diagnosed list of generic/weak design patterns found, targeted upgrades applied in priority order within the existing stack
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [its-thepoe/skills](https://github.com/its-thepoe/skills/tree/3172de431451bbad2958b1fd87a79d1ccd39b0e3/design/redesign-existing-projects) @ `3172de4` by Oladipupo Ayoola (its-thepoe), MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, stable
- **Tags**: visual-polish, typography, color, layout, audit, ui-design
- **Related**: `design-debt-audit`, `frontend-design`

### `theme-factory` ⭐

Applies one of 10 curated color-palette + font-pairing themes (each with named hex colors, header/body font roles, and recommended use cases, shown via a theme-showcase.pdf) to slide decks, documents, or HTML artifacts, or generates a new custom theme on the fly when none of the presets fit, following a show-choices / confirm / apply workflow.

- **Path**: [skills/visual-design/theme-factory/SKILL.md](skills/visual-design/theme-factory/SKILL.md)
- **Use when**: apply a theme to this deck; pick a color and font palette for this document; show me theme options; generate a custom theme for this artifact
- **Inputs**: an existing artifact/deck/document to style, optional description of desired mood for a custom theme
- **Outputs**: a styled artifact using the chosen theme's colors and fonts, for custom themes, a new theme spec (palette + font pairing) shown for confirmation before applying
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [anthropics/skills](https://github.com/anthropics/skills/tree/3b3fad96af16a10759d930941b4520ba0c40edae/skills/theme-factory) @ `3b3fad9` by Anthropic, Apache-2.0
- **Status**: verified, stable, recommended default
- **Tags**: themes, color, typography, visual-polish
- **Related**: `frontend-design`, `better-colors`

### `wp-block-themes`

Guides an agent through WordPress block theme visual-design work: editing theme.json global settings and styles (color, typography, spacing, layout presets), adding or changing templates and template parts, filesystem patterns, and style variations, plus diagnosing why the Site Editor or frontend is not reflecting a style change by walking the override hierarchy (core defaults, theme.json, child theme, stored user customizations).

- **Path**: [skills/visual-design/wp-block-themes/SKILL.md](skills/visual-design/wp-block-themes/SKILL.md)
- **Use when**: edit this WordPress block theme's theme.json; why isn't my WordPress theme style applying; add a style variation to this block theme; scaffold a new WordPress block theme; add a template part to this theme
- **Inputs**: Repo root and which theme is targeted, Target WordPress version range, Where the styling issue manifests (Site Editor, post editor, frontend)
- **Outputs**: Edited theme.json, templates/*.html, parts/*.html, patterns/*.php, or styles/*.json files, A diagnosis identifying which layer of the style-override hierarchy is responsible when a style change is not visible
- **Dependencies**: node
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [WordPress/agent-skills](https://github.com/WordPress/agent-skills/tree/d87ee6916e740c7960b6959220c0481a41b320c7/skills/wp-block-themes) @ `d87ee69` by WordPress, GPL-2.0-or-later (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, experimental
- **Tags**: design-tokens, themes, typography, color, layout
- **Related**: `wp-patterns`, `wpds`, `theme-factory`

### `wp-patterns`

Guides an agent through designing and building WordPress block patterns (starter pages, templates, template parts, Query Loop layouts): five deliberate design decisions (purpose, tone, spatial composition, typography hierarchy, color strategy) using theme.json presets, a sketched nesting tree, static JavaScript-free block-markup assembly with a registration-time-only PHP header, then a design-quality checklist and a technical/accessibility validation checklist that both must fully pass before the pattern is considered done.

- **Path**: [skills/visual-design/wp-patterns/SKILL.md](skills/visual-design/wp-patterns/SKILL.md)
- **Use when**: create a WordPress block pattern for this section; design a hero or CTA pattern using theme presets; review this block pattern for design quality and accessibility; build a Query Loop pattern for this listing; register this pattern with the right categories
- **Inputs**: Repo root, target theme/plugin directory, and pattern type, Pattern slug, title, categories, keywords, and text domain, Available theme.json presets for color, typography, spacing, layout, and gradients
- **Outputs**: A registered .php pattern file containing a PHP header and static block markup only, Confirmation that every item on the Design Quality and Technical Validation checklists passes
- **Dependencies**: node
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [WordPress/agent-skills](https://github.com/WordPress/agent-skills/tree/d87ee6916e740c7960b6959220c0481a41b320c7/skills/wp-patterns) @ `d87ee69` by WordPress, GPL-2.0-or-later (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, experimental
- **Tags**: ui-design, visual-hierarchy, typography, color, a11y
- **Related**: `wp-block-themes`, `wpds`

## Design systems

### `design-debt-audit` ⭐

Makes the agent run a structured design debt audit: five debt categories (visual, structural, accessibility, documentation, implementation), a five-step process from screenshot inventory through classification (severity/category/frequency/effort) to a prioritized remediation plan scored as severity x frequency / effort, split into quick wins, structural projects, accessibility fixes, and documented write-offs, plus a living debt register with owners and quarterly review.

- **Path**: [skills/design-systems/design-debt-audit/SKILL.md](skills/design-systems/design-debt-audit/SKILL.md)
- **Use when**: design debt audit; UI inconsistency inventory; prioritise design cleanup; audit design drift; remediation plan for design debt
- **Inputs**: product screens, design system reference, engineering effort estimates
- **Outputs**: classified debt inventory, prioritized remediation plan, debt register
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/design-ops/skills/design-debt-audit) @ `20e34c4` by Owl-Listener, MIT
- **Status**: verified, stable, recommended default
- **Tags**: audit, design-system, remediation, severity, prioritization
- **Related**: `design-system-governance`, `interface-review`, `improve-animations`

### `design-system`

Audits, documents, or extends a design system in one of three modes. Audit: scores naming consistency, design-token coverage (counts hardcoded color/spacing/typography values that should be tokens), and per-component completeness (states, variants, docs) into a summary score and priority-actions list. Document: writes a component reference covering variants, props, states, accessibility (ARIA role, keyboard, screen-reader announcement) and do's/don'ts. Extend: proposes a new component or pattern with its API, variants, states, and token usage, comparing it against existing similar components and flagging open design questions. Works from a described system; optionally inspects a connected Figma file's components/tokens or publishes documentation to a connected knowledge base, but neither is required.

- **Path**: [skills/design-systems/design-system/SKILL.md](skills/design-systems/design-system/SKILL.md)
- **Use when**: audit our design system; document this component's states and variants; design a new component that fits the system; check for hardcoded values instead of tokens; design system consistency review
- **Inputs**: A described design system, component library, or single component, Mode: audit, document, or extend, plus the component/pattern name for document or extend
- **Outputs**: Audit: naming-consistency table, token-coverage table, component-completeness scorecard, priority actions, Document: component reference (variants, props, states, accessibility, do's/don'ts, code example), Extend: proposed component spec (API, variants, states, tokens, accessibility, open questions)
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins/tree/8c3ec5534fc6948b461c6a0275bdfdb8ab0c9888/design/skills/design-system) @ `8c3ec55` by Anthropic, Apache-2.0 (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, stable
- **Tags**: design-system, design-tokens, component-api, component-docs, pattern-library, audit, documentation
- **Related**: `design-system-governance`, `design-tokens`, `ui-design-system`, `token-naming`

### `design-system-governance` ⭐

Makes the agent define how a design system evolves: seven core governance questions, three ownership models (centralized/federated/hybrid) with trade-offs, a seven-stage contribution lifecycle from proposal to communicated release, semver as the consumer contract with a patch/minor/major table, a deprecation process with timelines and in-product warnings, breaking-change policy (migration guides, codemods, shims), and component quality entry standards.

- **Path**: [skills/design-systems/design-system-governance/SKILL.md](skills/design-systems/design-system-governance/SKILL.md)
- **Use when**: design system governance; contribution model; deprecate a component; design system versioning; breaking change policy
- **Inputs**: design system state, team structure, change proposals
- **Outputs**: governance model, contribution process, versioning and deprecation policy
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/design-systems/skills/design-system-governance) @ `20e34c4` by Owl-Listener, MIT
- **Status**: verified, stable, recommended default
- **Tags**: design-system, governance, versioning, migration, component-docs
- **Related**: `design-debt-audit`, `design-tokens`, `token-build`, `extract-design-md`, `pre-handoff-review`, `design-system`, `token-naming`

### `design-tokens`

Generates, extends, or audits design tokens in DTCG format ($type/$value) using a 3-tier architecture (primitive, raw values never used directly; semantic, purpose aliases; component, component-scoped). Reads the project's token-and-color and typography-and-spacing rules to apply a 4px base spacing grid, a Major Third type scale, and OKLCH-based palette generation, verifying that any new palette's mid shade clears 4.5:1 on white for text and a darker shade clears 3:1 for UI use. Covers colors, typography, spacing, shadows, borders, breakpoints, motion, gradients, opacity, blur, sizing, states, and multi-brand/density theming, and runs a JSON-validity-and-alias-resolution script before calling the work done.

- **Path**: [skills/design-systems/design-tokens/SKILL.md](skills/design-systems/design-tokens/SKILL.md)
- **Use when**: generate a color palette; set up design tokens; define a type scale; validate our token files; multi-brand theming
- **Inputs**: An existing tokens/ directory to extend, or a brief for a new palette, Target platforms/brands needing theming
- **Outputs**: DTCG-format token JSON (primitive/semantic/component tiers) with $description preserved, A validation pass confirming JSON validity and alias resolution
- **Dependencies**: python
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [plugin87/ux-ui-agent-skills](https://github.com/plugin87/ux-ui-agent-skills/tree/2ffb677aa02b225c8a3da1b7f31d9ebb7c38f1dd/.claude/skills/design-tokens) @ `2ffb677` by plugin87, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, experimental
- **Tags**: design-tokens, token-naming, semantic-tokens, design-system, color, typography, spacing, dark-mode, multi-brand
- **Related**: `token-build`, `extract-design-md`, `design-system-governance`, `better-colors`, `token-naming`

### `extract-design-md` ⭐

Reads a frontend codebase's source files directly -- package.json, Tailwind/PostCSS configs, global CSS custom properties, theme/token files, and component styles -- without building or running the app, using framework-specific extraction patterns for React/Next.js, Vue/Nuxt, Svelte/SvelteKit, Angular, or plain CSS/SASS/Less. Synthesizes findings into a DESIGN.md design-system document: a required YAML frontmatter block with color and typography tokens, a rich atmosphere description, a color palette with descriptive names and functional roles (deduplicating near-duplicate colors), a full typography hierarchy, component stylings for buttons/cards/navigation/forms, layout and spacing principles, and Stitch-generation notes. Ends with an 8-item quality checklist the output must satisfy before delivery.

- **Path**: [skills/design-systems/extract-design-md/SKILL.md](skills/design-systems/extract-design-md/SKILL.md)
- **Use when**: extract a design system from this codebase; audit the styling of this app; pull design tokens out of the source code; what does this app's design system look like; reverse-engineer a DESIGN.md from source; create a design system document from this repo
- **Inputs**: frontend source tree (components, stylesheets, theme/token configs, Tailwind config)
- **Outputs**: DESIGN.md design-system document with color palette, typography hierarchy, component stylings, and layout principles
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills/tree/0337446dadde6f8c94210444e2aa9d546126480f/plugins/stitch-design/skills/extract-design-md) @ `0337446` by google-labs-code, Apache-2.0 (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, stable, recommended default
- **Tags**: design-tokens, design-system, audit, typography, color, documentation
- **Related**: `design-tokens`, `design-system-governance`, `design-details`, `extract-static-html`

### `figma-integration`

Keeps Figma and code in sync by mapping the project's 3-tier DTCG tokens to Figma Variables: three Figma collections (Primitives, Semantic, Component) mirroring the token tiers, with dark/brand/density variance modeled as Figma Modes. Requires picking exactly one authoritative sync direction (code-to-Figma publish, or Figma-to-code extract via Tokens Studio or the Variables REST API) so the non-authoritative side is always generated, never hand-edited. When a Figma MCP server is connected, prefers its tools for reading frames/variables/screenshots and wiring Code Connect. Verifies component parity (Figma variants/properties must cover every design-system variant, size, and the full state set) and that every Figma Variable resolves to a real token with no orphan hex values.

- **Path**: [skills/design-systems/figma-integration/SKILL.md](skills/design-systems/figma-integration/SKILL.md)
- **Use when**: sync tokens with Figma; push components to Figma; pull a Figma design into code; set up Figma Variables from our tokens; check design-code drift
- **Inputs**: The project's DTCG token files, A connected Figma file or Figma MCP server (optional)
- **Outputs**: A token-to-Figma-Variable collection/mode mapping, A stated authoritative sync direction, A component parity report (variant/state coverage gaps)
- **Dependencies**: python, figma-mcp
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [plugin87/ux-ui-agent-skills](https://github.com/plugin87/ux-ui-agent-skills/tree/2ffb677aa02b225c8a3da1b7f31d9ebb7c38f1dd/.claude/skills/figma-integration) @ `2ffb677` by plugin87, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, experimental
- **Tags**: figma, figma-to-code, design-tokens, design-system, component-api, multi-brand
- **Related**: `design-tokens`

### `frontend-ui-dark-ts`

A complete dark-theme design-token and component system for React + Tailwind CSS + Framer Motion applications: CSS custom properties and Tailwind config for brand/neutral/text/border/status/data-viz color scales, spacing/radius/shadow/z-index scales, glassmorphism utility classes, and Framer Motion timing/easing presets, plus ready-to-use TSX source for Button, Input, Card, Badge, Dialog, Tabs, Avatar, Checkbox, Select, and Toast components, and page-layout patterns (app shell, responsive mobile drawer, dashboard, list/tabs/settings-form templates, empty states, skeleton loaders) built for dashboards and admin panels.

- **Path**: [skills/design-systems/frontend-ui-dark-ts/SKILL.md](skills/design-systems/frontend-ui-dark-ts/SKILL.md)
- **Use when**: build a dark-themed React dashboard; set up design tokens for a dark UI; need a glassmorphism component library; create an admin panel with Tailwind and Framer Motion
- **Inputs**: a React + TypeScript + Vite project to apply the theme to
- **Outputs**: Tailwind config and CSS custom properties implementing the token system, reusable TSX UI components (Button, Input, Card, Badge, Dialog, Tabs, Avatar, Checkbox, Select, Toast), page-layout templates (app shell, dashboard, list, tabs, settings form, empty/loading states)
- **Dependencies**: node
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [microsoft/skills](https://github.com/microsoft/skills/tree/7066b58141d8cc66f39356b2ee5bb64d428dcf17/.github/plugins/azure-sdk-typescript/skills/frontend-ui-dark-ts) @ `7066b58` by Microsoft, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, stable
- **Tags**: design-tokens, component-api, component-docs, pattern-library, dark-mode, color, typography
- **Related**: `design-tokens`, `frontend-design-review`

### `motion-system` ⭐

Makes the agent define motion as a token layer rather than one-off animations: a named duration scale (50-600ms with use cases), easing tokens with actual cubic-bezier values mapped to semantic uses, choreography rules (30-50ms stagger, 500ms sequence cap, direction consistency), a system-level prefers-reduced-motion strategy using a global duration override token, and implementation guidance for CSS custom properties inside the token export pipeline.

- **Path**: [skills/design-systems/motion-system/SKILL.md](skills/design-systems/motion-system/SKILL.md)
- **Use when**: motion tokens; standardise animation durations; easing system; reduced motion strategy; motion design system
- **Inputs**: existing animations or components, design token setup
- **Outputs**: duration and easing token tables, choreography rules, reduced-motion overrides
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/design-systems/skills/motion-system) @ `20e34c4` by Owl-Listener, MIT
- **Status**: verified, stable, recommended default
- **Tags**: motion, animation, design-tokens, design-system, micro-interactions
- **Related**: `better-ui`, `animate`

### `pick-ui-library`

Curated, opinionated lookup table matching a frontend UI task (toasts, command menus, OTP inputs, charts, drag and drop, virtualization, state management, conditional styling, theme switching, and more) to one recommended library, with instructions to identify the task rather than the library the user named, check package.json before suggesting a dependency change, and recommend exactly one library with a one-sentence rationale rather than presenting a menu. Includes a table of common mismatches to catch, such as a hand-rolled toast or an unstyled div-based dropdown with manual focus handling.

- **Path**: [skills/design-systems/pick-ui-library/SKILL.md](skills/design-systems/pick-ui-library/SKILL.md)
- **Use when**: what library should I use for toasts; pick a component library for this dropdown; which state management library should I use; recommend a charting library
- **Inputs**: a frontend UI task description, the project's package.json for already-installed libraries
- **Outputs**: one recommended library with a one-sentence rationale, or an explicit note that the task falls outside the curated list
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/pick-ui-library) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: verified, stable
- **Tags**: pattern-library, component-api, design-system
- **Related**: `frontend-design`

### `token-build`

Sets up or runs the build pipeline that turns the project's DTCG tokens/*.json source of truth into platform-ready artifacts: CSS custom properties, a Tailwind v4 @theme block, typed JS/TS, an iOS Asset Catalog plus Color/Spacing extensions, and Android colors.xml/Compose theme. Picks between Style Dictionary (the default, multi-platform), Tokens Studio (when tokens are Figma-owned), a W3C DTCG exporter, or a small custom script; resolves aliases to final per-platform values, keeps primitives internal while exposing semantic/component tokens, and emits dark/brand/density variants as deltas only rather than full duplicate files. Wires CI to validate and regenerate on token changes and to fail if committed artifacts drift from a fresh regeneration, gating any color change through a contrast check.

- **Path**: [skills/design-systems/token-build/SKILL.md](skills/design-systems/token-build/SKILL.md)
- **Use when**: generate CSS variables from our tokens; set up a Style Dictionary pipeline; export tokens to iOS and Android; wire token validation into CI; build Tailwind theme from tokens
- **Inputs**: DTCG token source files (tokens/*.json), Target platform(s) for generated artifacts
- **Outputs**: Platform-specific generated theme files (CSS, Tailwind, JS/TS, iOS, Android), A CI step that validates tokens and fails on stale generated artifacts
- **Dependencies**: node, python
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [plugin87/ux-ui-agent-skills](https://github.com/plugin87/ux-ui-agent-skills/tree/2ffb677aa02b225c8a3da1b7f31d9ebb7c38f1dd/.claude/skills/token-build) @ `2ffb677` by plugin87, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, experimental
- **Tags**: design-tokens, design-system, versioning, multi-brand, governance
- **Related**: `design-tokens`, `token-naming`

### `token-naming` ⭐

Chooses and applies one naming convention for design tokens across every category: picks and declares a grammar (dotted category.property.variant, role-first CSS custom properties, or functional order), fixes the primitive, semantic and component tier model, selects a scale type per category (numeric, t-shirt, word set, level) without mixing types among siblings, names composite tokens (text style, border, shadow, gradient) with a DTCG example, and produces token documentation with an owner per token group plus a deprecation and rename path, verified by a bundled zero-dependency lint over DTCG JSON and CSS custom properties. Defers to better-colors for colour role names and records the conflicting meanings of primary across library skills instead of resolving them. Written from Romina Kavcic's Design Tokens Naming Playbook with a source-versus-interpretation ledger.

- **Path**: [skills/design-systems/token-naming/SKILL.md](skills/design-systems/token-naming/SKILL.md)
- **Use when**: name design tokens; token naming convention; composite tokens; token scale; token documentation; which token grammar should we use; rename a deprecated token; too many tokens
- **Inputs**: existing token files (DTCG JSON), CSS custom properties or a Figma variables export, the token categories and target platforms in play, who reads the names
- **Outputs**: a declared grammar and tier statement, a token inventory with naming problems, a scale table per category, composite token definitions, token documentation with an owner table and rename map, a lint report from scripts/check-token-names.mjs
- **Dependencies**: node
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: original to this repository (MIT)
- **Status**: verified, experimental, recommended default
- **Tags**: token-naming, semantic-tokens, design-tokens, design-system, documentation, governance, themes, multi-brand, migration
- **Related**: `better-colors`, `design-tokens`, `token-build`, `design-system-governance`, `design-system`, `motion-system`

### `ui-design-system`

Generates a complete design-token system (colors, typography, spacing, borders, shadows, animation, breakpoints, z-index) from one brand hex color and a style preset (modern/classic/playful) via a bundled Python script, exporting JSON, CSS custom properties, or SCSS. Also gives workflows and reference tables for structuring a component system (atoms/molecules/organisms/templates, token-to-component mapping, size and color variant patterns), calculating responsive breakpoints and fluid typography (clamp formulas), and preparing developer handoff (framework integration snippets for React/Tailwind/styled-components, a Figma Tokens Studio sync note, and a handoff checklist). Includes WCAG AA/AAA contrast reference tables and a color-scale (50-900) generation formula.

- **Path**: [skills/design-systems/ui-design-system/SKILL.md](skills/design-systems/ui-design-system/SKILL.md)
- **Use when**: generate design tokens from a brand color; build a component system on top of tokens; calculate responsive breakpoints and fluid typography; prepare developer handoff for a design system; export design tokens as CSS/SCSS/JSON
- **Inputs**: a brand hex color and a style preset (modern/classic/playful), optionally an existing component inventory or breakpoint set to extend
- **Outputs**: a design-token file in JSON, CSS custom properties, or SCSS, component architecture and variant documentation, responsive breakpoint and fluid-typography values, a developer-handoff checklist with framework integration snippets
- **Dependencies**: python3
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills/tree/19392f7a08264ed00486a251f5b2098321771f94/product-team/skills/ui-design-system) @ `19392f7` by Alireza Rezvani, MIT
- **Status**: verified, stable
- **Tags**: design-tokens, design-system, component-api, component-docs, responsive, typography, color, layout, spacing, handoff, figma
- **Related**: `design-system`, `design-tokens`, `theme-factory`

### `wpds`

Guides an agent building or reviewing UI in a WordPress-related codebase (Gutenberg, WooCommerce, WordPress.com, Jetpack) to use the WordPress Design System (WPDS): treat the WPDS MCP server's reference site, component list and design-token list as the canonical, authoritative source (never the open web) for @wordpress/components-era UI work, apply the closest-fitting WPDS components/tokens/patterns instead of ad hoc values, skip non-UI concerns such as data-fetching or string localization, assume a TypeScript/React/CSS stack unless told otherwise, run any available lint scripts to validate output, and close with a recap of what was built, why, and what was intentionally left out as non-UI.

- **Path**: [skills/design-systems/wpds/SKILL.md](skills/design-systems/wpds/SKILL.md)
- **Use when**: build this UI using the WordPress Design System; review this Gutenberg UI for WPDS compliance; which WPDS component or token should I use here; apply WordPress Design System tokens to this component; use @wordpress/components the WPDS way
- **Inputs**: A UI-building or UI-review task in a WordPress-related codebase (Gutenberg, WooCommerce, WordPress.com, Jetpack), A running WPDS MCP server exposing wpds://pages, wpds://components, wpds://components/:name and wpds://design-tokens
- **Outputs**: Working TypeScript/React/CSS code that uses WPDS components and design tokens, A closing recap of the solution, the reasoning behind each decision, and what was explicitly left out as non-UI
- **Dependencies**: wpds-mcp
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [WordPress/agent-skills](https://github.com/WordPress/agent-skills/tree/d87ee6916e740c7960b6959220c0481a41b320c7/skills/wpds) @ `d87ee69` by WordPress, GPL-2.0-or-later
- **Status**: verified, experimental
- **Tags**: design-system, design-tokens, component-api, ui-design
- **Related**: `wp-block-themes`, `wp-patterns`, `design-system`

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
- **Status**: verified, experimental
- **Tags**: a11y, wcag, aria, screen-reader, keyboard, focus-management, contrast, audit, remediation
- **Related**: `better-accessibility`, `a11y-check-code`

### `a11y-check-code`

Reviews source files (HTML, JSX, TSX, Vue, Svelte, templates) for WCAG 2.2 AA accessibility issues without external dependencies: traces imported components (depth 3, max 50 files) to see final rendered markup, enumerates every conditional/state variation before checking, applies a fixed ID'd checklist (SPEC/VIS/KBD/RFL/SEM/AXE) by observation type rather than by file, computes contrast ratios with a bundled Node script instead of estimating them, and writes a severity-rated (Critical/Major/Normal/Minor) Markdown report with file:line evidence, user-impact statements, and an explicit list of items that cannot be verified from code alone and must be checked on a live page.

- **Path**: [skills/accessibility/a11y-check-code/SKILL.md](skills/accessibility/a11y-check-code/SKILL.md)
- **Use when**: a11y check this component; check accessibility of this code; review this PR for accessibility; WCAG 2.2 AA audit of source code; check for accessibility issues before merge
- **Inputs**: source files (HTML/JSX/TSX/Vue/Svelte/templates) to review, the imported component tree reachable from the target file
- **Outputs**: severity-rated Markdown report with file:line findings and user-impact statements, contrast-ratio calculations from the bundled scripts/contrast.mjs, list of items requiring live-page verification, handed off to a11y-check-page
- **Dependencies**: node
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [ymrl/a11y-check-skills](https://github.com/ymrl/a11y-check-skills/tree/a59f48bbe72c1c4ec710e86ae19f8b39fa4b44f6/skills/a11y-check-code) @ `a59f48b` by ymrl, ISC
- **Status**: verified, stable
- **Tags**: a11y, wcag, contrast, keyboard, focus-management, semantic-html, forms, severity, audit, remediation
- **Related**: `a11y-check-page`, `better-accessibility`, `review-a11y`, `a11y-audit`

### `a11y-check-page` ⭐

Audits a live, running web page for WCAG 2.2 AA accessibility using browser automation (Playwright MCP, Chrome DevTools MCP, or playwright-cli): runs the bundled axe-core build, walks keyboard focus order in both directions, injects CSS/viewport changes to test 200% zoom, 320px reflow, and text-spacing, inspects the accessibility tree, and re-runs checks per distinct UI state (modals, loading, errors). Enforces credential-safety rules for login-gated pages (never store or echo credentials, screenshot only pre-input states, explicit permission before destructive actions) and writes a severity-rated Markdown report to a11y-report/ with screenshots saved under a11y-report/assets/.

- **Path**: [skills/accessibility/a11y-check-page/SKILL.md](skills/accessibility/a11y-check-page/SKILL.md)
- **Use when**: check this URL's accessibility; audit this live page for WCAG; test keyboard navigation on this page; run axe-core against this site; a11y check after login
- **Inputs**: target URL(s) and, when login is required, credentials/steps provided by the user, confirmation of test vs. production environment and whether destructive actions are permitted
- **Outputs**: severity-rated Markdown report in a11y-report/ with screenshots in a11y-report/assets/, per-state axe-core, keyboard-focus, and accessibility-tree findings, list of items excluded from automated testing (e.g. screen-reader behavior, seizure thresholds)
- **Dependencies**: node, browser, playwright, axe-core
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [ymrl/a11y-check-skills](https://github.com/ymrl/a11y-check-skills/tree/a59f48bbe72c1c4ec710e86ae19f8b39fa4b44f6/skills/a11y-check-page) @ `a59f48b` by ymrl, ISC
- **Status**: verified, stable, recommended default
- **Tags**: a11y, wcag, aria, keyboard, focus-management, contrast, severity, audit, remediation
- **Related**: `a11y-check-code`, `ultra11y`, `perspective-audit`

### `a11y-critic`

Reviews accessibility design decisions in an existing component, flow, or interface after automated compliance checks already pass — catching what axe-core/Pa11y miss: incomplete ARIA patterns, incoherent focus management, and state-communication gaps. Runs a 10-phase protocol (pre-commitment predictions, semantic HTML audit, ARIA pattern compliance, focus management analysis, state communication audit, multi-perspective review across screen-reader/keyboard-only/low-vision/cognitive users) and produces findings with severity (CRITICAL/MAJOR/MINOR/ENHANCEMENT), file:line evidence, affected user group, and a WCAG 2.2 or WAI-ARIA APG citation, ending in a verdict of ACCEPT, ACCEPT-WITH-RESERVATIONS, REVISE, or REJECT.

- **Path**: [skills/accessibility/a11y-critic/SKILL.md](skills/accessibility/a11y-critic/SKILL.md)
- **Use when**: critique this accessibility plan; review this component's accessibility design; is this ready to ship accessibility-wise?; check ARIA pattern completeness; review focus management before merge
- **Inputs**: an existing component, flow, or interface (code or a written accessibility plan) that has already passed automated accessibility checks
- **Outputs**: findings list with severity, file:line evidence, affected user group, and WCAG/APG citation, a verdict: ACCEPT / ACCEPT-WITH-RESERVATIONS / REVISE / REJECT
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [zivtech/accessibility-skills](https://github.com/zivtech/accessibility-skills/tree/817dedeae90324017ece2d2b104332aec9d20656/.claude/skills/a11y-critic) @ `817dede` by zivtech, GPL-3.0-or-later
- **Status**: verified, stable
- **Tags**: a11y, wcag, aria, keyboard, focus-management, screen-reader, semantic-html, severity, design-critique, expert-review
- **Related**: `a11y-planner`, `perspective-audit`, `a11y-role-audit`

### `a11y-planner` ⭐

Designs an accessible implementation before code is written: runs a 9-phase protocol covering scope/context, semantic structure, WAI-ARIA Authoring Practices Guide pattern mapping for every interactive widget, focus management (tab order, modal traps, restoration, roving tabindex), state communication to assistive technology, visual accessibility (contrast, touch targets, motion), content accessibility (alt text, link text, form labels), a testing strategy, and an implementation task breakdown with review checkpoints. Every decision cites a WCAG 2.2 success criterion or APG pattern section. Guards against nine known failure modes (e.g. per-event live-region spam, color-only state indicators, title-attribute-only accessible names). Writes the plan to docs/a11y-plans/YYYY-MM-DD-<feature-name>-a11y-plan.md.

- **Path**: [skills/accessibility/a11y-planner/SKILL.md](skills/accessibility/a11y-planner/SKILL.md)
- **Use when**: design accessible interaction for this component; plan the accessibility approach for this modal/combobox/tabs; write an a11y spec before we build this; WAI-ARIA pattern for this widget; prepare for a WCAG 2.2 AA audit
- **Inputs**: a description of the component, flow, or interface to be built, the target compliance level and known constraints (framework, existing design system)
- **Outputs**: a Markdown accessibility plan (docs/a11y-plans/YYYY-MM-DD-<feature-name>-a11y-plan.md) with semantic structure, APG pattern table, focus plan, state-communication table, and task breakdown, a WCAG-EM audit-scope variant for Section 508 conformance sampling when requested
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [zivtech/accessibility-skills](https://github.com/zivtech/accessibility-skills/tree/817dedeae90324017ece2d2b104332aec9d20656/.claude/skills/a11y-planner) @ `817dede` by zivtech, GPL-3.0-or-later
- **Status**: verified, stable, recommended default
- **Tags**: a11y, wcag, aria, keyboard, focus-management, contrast, semantic-html, forms, inclusive-design
- **Related**: `a11y-critic`, `a11y-role-audit`, `perspective-audit`, `better-accessibility`

### `a11y-role-audit`

Runs an ARRM-based (W3C WAI Accessibility Requirements-to-Roles Mapping) accessibility review through six responsibility-based lenses — visual design, UX design, front-end development, content authoring, business analysis, and testing — to produce findings attributed to the team role best positioned to catch and fix each barrier, rather than a single generic pass/fail. Supports three modes: design review (mockups/specs before implementation), implementation review (code through each role's lens), and finding attribution (assigning ownership of existing accessibility gaps). Findings are rated CRITICAL, MAJOR, MINOR, or ENHANCEMENT (AAA-level).

- **Path**: [skills/accessibility/a11y-role-audit/SKILL.md](skills/accessibility/a11y-role-audit/SKILL.md)
- **Use when**: who should fix this accessibility issue; role-based accessibility audit; attribute this a11y finding to a team; review this mockup for accessibility by role; ARRM accessibility review
- **Inputs**: a design mockup/spec, or implemented code, to review through each of the six role lenses
- **Outputs**: role-attributed findings table (role, barrier, severity, WCAG/ARRM reference), ownership assignment for existing accessibility gaps
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [zivtech/accessibility-skills](https://github.com/zivtech/accessibility-skills/tree/817dedeae90324017ece2d2b104332aec9d20656/.claude/skills/a11y-role-audit) @ `817dede` by zivtech, GPL-3.0-or-later
- **Status**: verified, stable
- **Tags**: a11y, wcag, aria, keyboard, contrast, semantic-html, severity, design-critique, expert-review
- **Related**: `perspective-audit`, `a11y-critic`

### `better-accessibility` ⭐

Accessibility engineering guidance for building or reviewing UI components and custom widgets: native-element-first ARIA rules, exact focus-ring and tabindex/roving-tabindex recipes, WCAG 2.5.8 hit-area sizing with pseudo-element expansion, form labeling and error-announcement patterns, prefers-reduced-motion and autoplay/zoom rules, live-region and screen-reader announcement selection, alt-text-by-purpose table, and a calibrated HIGH/MEDIUM/LOW severity report format ending in Block/Approve.

- **Path**: [skills/accessibility/better-accessibility/SKILL.md](skills/accessibility/better-accessibility/SKILL.md)
- **Use when**: accessibility audit; a11y review; keyboard navigation broken; screen reader not announcing; focus ring missing; WCAG compliance check
- **Inputs**: UI component or screen source code, rendered interface for keyboard/screen-reader walkthrough
- **Outputs**: severity-ranked findings table (Severity | Location | Before | After | Why), Block/Approve verdict, verification checklist with Not verified items flagged
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/better-accessibility) @ `ca48385` by Jakub Krehel, MIT
- **Status**: verified, stable, recommended default
- **Tags**: a11y, wcag, aria, screen-reader, keyboard, focus-management, contrast, forms, semantic-html, inclusive-design, remediation
- **Related**: `a11y-check-code`, `a11y-check-page`, `a11y-audit`, `a11y-planner`, `a11y-critic`, `review-a11y`, `better-colors`, `cognitive-accessibility`

### `cognitive-accessibility` ⭐

Evaluates and reduces cognitive demands in an interface: assesses intrinsic load (complexity inherent to the task), extraneous load (complexity added by poor design), and germane load (effort to learn the system); reduces extraneous load via progressive disclosure, consistent patterns, sensible defaults, and chunking fields into groups of 3-5; ensures wayfinding answers 'where am I / where can I go / where have I been' with progress indicators and savable multi-step flows; protects focus with one primary action per screen and interruption-recovery support; and makes errors cheap via full undo, destructive-action confirmation, preserved form input on failure, and forgiving input formats. Includes a COGA-guideline reference table (provide help, use clear language, ease of finding things, ease of completing tasks, avoid reliance on memory, provide feedback, prevent/support error correction) and a documentation format for cognitive considerations per screen.

- **Path**: [skills/accessibility/cognitive-accessibility/SKILL.md](skills/accessibility/cognitive-accessibility/SKILL.md)
- **Use when**: evaluate cognitive load for this flow; is this too much for working memory; reduce cognitive load in this form; wayfinding review for this multi-step process; design for users with cognitive differences or under stress
- **Inputs**: A screen, flow, or multi-step process to evaluate or design
- **Outputs**: Cognitive-load assessment (intrinsic/extraneous/germane) per screen or flow, Wayfinding, focus-management, and error-recovery recommendations, Documented cognitive considerations: decisions required, memory demands, wayfinding cues, recovery paths, simplification opportunities
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designpowers](https://github.com/Owl-Listener/designpowers/tree/cb00757da9d554591fa78d27aa1854d60a05c4f7/skills/cognitive-accessibility) @ `cb00757` by MC Dean, MIT
- **Status**: verified, stable, recommended default
- **Tags**: a11y, inclusive-design, focus-management, error-recovery
- **Related**: `better-accessibility`, `inclusive-personas`, `accessible-content`

### `perspective-audit`

Runs a deep, single-dimension accessibility review from one of seven access perspectives — magnification & reflow, environmental contrast, vestibular & motion sensitivity, auditory access, keyboard & motor access, screen reader & semantic structure, and cognitive & neurodivergent accessibility. Activates only on escalation from a11y-planner or a11y-critic when a perspective is flagged MEDIUM or HIGH alarm level, skipping LOW-rated perspectives entirely ('evidence over assertion'). Loads only the relevant checklist section, reviews source/markup against it, and routes each finding to an ARRM team role with severity (CRITICAL/MAJOR/MINOR/ENHANCEMENT), before issuing a PASS, REVISE, or BLOCK recommendation. Read-only: cannot write or edit files.

- **Path**: [skills/accessibility/perspective-audit/SKILL.md](skills/accessibility/perspective-audit/SKILL.md)
- **Use when**: deep-dive this flagged accessibility perspective; review keyboard and motor access in depth; check cognitive accessibility for this flow; escalated accessibility review; audit vestibular/motion safety
- **Inputs**: an artifact (source code or markup) plus the specific perspective(s) flagged MEDIUM or HIGH by an upstream review
- **Outputs**: per-perspective findings with severity, WCAG citation, ARRM role routing, and file:line evidence, a PASS / REVISE / BLOCK recommendation
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [zivtech/accessibility-skills](https://github.com/zivtech/accessibility-skills/tree/817dedeae90324017ece2d2b104332aec9d20656/.claude/skills/perspective-audit) @ `817dede` by zivtech, GPL-3.0-or-later
- **Status**: verified, stable
- **Tags**: a11y, wcag, keyboard, focus-management, contrast, screen-reader, motion, inclusive-design, severity, expert-review
- **Related**: `a11y-role-audit`, `a11y-critic`, `a11y-check-page`

### `review-a11y`

Reviews changed frontend code (staged files, a working diff, a branch, or a PR) for WCAG 2.2 AA accessibility using a bundled, install-free static engine with cross-file JSX/TSX AST analysis. Treats engine findings as candidates, not verdicts: confirms each occurrence in the actual code, flags preliminary findings from framework templates or library-rendered markup that need rendered-DOM verification, adjudicates judgment criteria (alt-text relevance, link purpose, focus logic) from visible evidence, and refutes false positives with cited code. Returns a severity-ranked WCAG 2.2 AA review scoped only to the change, with file:line fixes, explicitly named residual rendering risks (contrast, focus visibility, zoom) that require a browser scan, and a pass/fail verdict.

- **Path**: [skills/accessibility/review-a11y/SKILL.md](skills/accessibility/review-a11y/SKILL.md)
- **Use when**: review a11y; is this accessible?; anything to fix before merge?; accessibility review of this diff; check staged files for accessibility
- **Inputs**: staged files, a working diff, a branch, or a PR diff, the bundled engine's candidate findings from `node scripts/ultra11y.mjs audit`
- **Outputs**: severity-ranked WCAG 2.2 AA review scoped to the change, with file:line fixes, list of residual rendering risks requiring a browser scan, pass/fail verdict for the change
- **Dependencies**: node
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [maxgfr/ultra11y](https://github.com/maxgfr/ultra11y/tree/d1cd14792f3bd1b9ab15958bc4e72081375514dc/skills/review-a11y) @ `d1cd147` by maxgfr, MIT
- **Status**: draft, experimental
- **Tags**: a11y, wcag, aria, keyboard, focus-management, contrast, semantic-html, severity, remediation, pr-review
- **Related**: `ultra11y`, `a11y-check-code`, `better-accessibility`

### `ultra11y`

Audits a repository, site, or page against WCAG 2.2 AA or a pluggable country standard (e.g. RGAA) using a bundled, install-free engine that runs 93 static checks tied to specific success criteria with cross-file JSX/TSX AST analysis, routes rendering-dependent criteria (computed contrast, zoom/reflow, focus visibility) to an optional browser scan tier, and has the agent adjudicate judgment criteria (alt-text relevance, link purpose, reading order) from harvested evidence — never silently marking a criterion conforming without recorded proof. Produces dated Markdown/HTML conformance reports, per-page criterion grids, PRD-style backlogs, and filed tickets (GitHub/GitLab/Jira), and can also author accessible markup and apply safe automated fixes. Self-benchmarked against the W3C ACT-Rules corpus (125/176 failing examples caught across 40 rules, zero false positives).

- **Path**: [skills/accessibility/ultra11y/SKILL.md](skills/accessibility/ultra11y/SKILL.md)
- **Use when**: audit this repo for accessibility; generate a WCAG conformance report; run an RGAA accessibility audit; produce an accessibility PRD backlog; author accessible markup for this component
- **Inputs**: source file globs, a site URL, or a rendered page to audit, an optional country-standard pack (e.g. RGAA) and prior audit JSON to merge/re-scan against
- **Outputs**: dated Markdown/HTML conformance report with per-criterion status, per-page compliance grid from rendered-page scans, PRD-style backlog and/or filed tickets grouped by WCAG criterion
- **Dependencies**: node, browser, playwright
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [maxgfr/ultra11y](https://github.com/maxgfr/ultra11y/tree/d1cd14792f3bd1b9ab15958bc4e72081375514dc/skills/ultra11y) @ `d1cd147` by maxgfr, MIT
- **Status**: draft, experimental
- **Tags**: a11y, wcag, aria, keyboard, focus-management, contrast, semantic-html, forms, severity, audit, remediation, documentation
- **Related**: `review-a11y`, `a11y-check-page`

## Content design

### `accessible-content` ⭐

Writes and structures user-facing content (labels, headings, error messages, alt text, link text, form instructions, data tables) so it works for screen readers, second-language readers and people under stress. Targets a 12-14 reading age with one idea per sentence and active voice; enforces a logical, non-skipped heading hierarchy used for structure rather than styling; requires visible, programmatically associated form labels with required-field indication and error association (aria-describedby); gives a decision table for alt text by image type (informative, decorative, functional, complex, image of text); bans context-free link text in favour of descriptive links; structures error messages as what happened plus what to do, without blaming the user; and specifies data-table markup (caption, scoped headers, no layout tables). Ends with an eight-item content-review checklist.

- **Path**: [skills/content-design/accessible-content/SKILL.md](skills/content-design/accessible-content/SKILL.md)
- **Use when**: write accessible interface copy; review this content for screen readers; what should this alt text say; structure headings for this page; write an accessible error message
- **Inputs**: Interface copy, labels, error messages, headings, alt text, or form instructions to write or review
- **Outputs**: Rewritten or reviewed content meeting the plain-language, heading, label, alt-text, link-text, error-message, and table rules, Completed content-review checklist
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designpowers](https://github.com/Owl-Listener/designpowers/tree/cb00757da9d554591fa78d27aa1854d60a05c4f7/skills/accessible-content) @ `cb00757` by MC Dean, MIT
- **Status**: verified, stable, recommended default
- **Tags**: a11y, plain-language, labels, error-messages, semantic-html
- **Related**: `ux-writing`, `cognitive-accessibility`, `better-writing`

### `better-writing` ⭐

UX writing and interface-copy guidance: recon the existing voice before editing, one voice with tone that flexes by stakes (success vs. destructive-confirmation), addressing the reader as 'you' rather than 'the user', verb-first button labels, consistent flow vocabulary across multi-step flows, link text that stands alone out of context, one capitalization policy per element type, toggle labels that describe the ON state, error copy that states the fix beside the failing field with no blame or exclamation marks, forward-pointing empty states, and placeholders as format examples rather than labels, closing with a calibrated severity report ending in Block/Approve.

- **Path**: [skills/content-design/better-writing/SKILL.md](skills/content-design/better-writing/SKILL.md)
- **Use when**: write button labels; review error message copy; UX writing pass; empty state copy; microcopy consistency check
- **Inputs**: user-facing copy in source code, existing product copy for voice recon
- **Outputs**: severity-ranked findings table (Severity | Location | Before | After | Why), Block/Approve verdict
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/better-writing) @ `ca48385` by Jakub Krehel, MIT
- **Status**: verified, stable, recommended default
- **Tags**: ux-writing, microcopy, voice-and-tone, labels, error-messages, help-content, plain-language, terminology
- **Related**: `ux-writing`, `localization-design`, `better-interface`, `dark-pattern-review`

### `localization-design` ⭐

Makes the agent design UI that survives localization: text-expansion planning with per-language percentages (German +20-35%, Finnish +30-40%), RTL mirroring rules including what does and does not mirror, CSS logical properties, typography rules for Arabic/CJK/Indic scripts, cultural color and iconography tables, locale-aware date/number/address formats, and design-system implications (semantic 'start/end' token naming, pseudo-localization testing).

- **Path**: [skills/content-design/localization-design/SKILL.md](skills/content-design/localization-design/SKILL.md)
- **Use when**: localize this UI; RTL support; text expansion in translation; design for multiple languages; internationalization review; Arabic or CJK layout
- **Inputs**: UI designs or components, target locales, design tokens
- **Outputs**: localization-readiness findings, RTL and expansion fixes, cultural adaptation guidance
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/design-systems/skills/localization-design) @ `20e34c4` by Owl-Listener, MIT
- **Status**: verified, stable, recommended default
- **Tags**: localization, internationalization, layout, typography, design-system
- **Related**: `better-writing`, `better-layout`

### `ux-writing` ⭐

Writes and edits user-centered, accessible interface copy (buttons, labels, error messages, notifications, forms, onboarding, empty states, success messages, help text) against four measurable quality standards -- purposeful, concise, conversational, clear -- each scored 0-10 with concrete criteria (e.g. 40-60 characters per line, active voice predominates). Draws on dedicated reference material for WCAG-aligned accessible writing (plain language at a 7th-8th grade level, sentences under 20 words, descriptive interactive-element labels), a detailed pattern library covering three contrasting worked product voices, a fillable voice-chart template for defining brand personality in 3-5 concepts, and three ready-to-use templates for empty states, error messages, and onboarding flows.

- **Path**: [skills/content-design/ux-writing/SKILL.md](skills/content-design/ux-writing/SKILL.md)
- **Use when**: write button and error copy; review this UI text; set up voice and tone guidelines; audit our interface copy; write an empty state or onboarding flow
- **Inputs**: Existing or draft interface copy to write or review, Product voice/brand context (optional, for tone calibration)
- **Outputs**: Rewritten or new interface copy, A 0-10 score across the four quality dimensions with the lowest-scoring areas flagged, Filled templates for empty states, error messages, or onboarding flows where applicable
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [content-designer/ux-writing-skill](https://github.com/content-designer/ux-writing-skill/tree/98cacde4ba2dd10ed28df43a8d53eef1e321c539) @ `98cacde` by Christopher Greer, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, stable, recommended default
- **Tags**: ux-writing, microcopy, voice-and-tone, labels, error-messages, help-content, onboarding, empty-states, plain-language, a11y
- **Related**: `better-writing`

## Prototyping

### `design-and-refine`

Runs a Design & Refine workflow that explores a UI concept as several genuinely different, runnable code implementations (not static mockups) rendered side by side at a dev-server comparison route, then folds in the user's per-variant feedback through iterative synthesis rounds, and finalizes into persistent DESIGN_PLAN.md (implementation steps, accessibility checks, testing notes) and DESIGN_MEMORY.md (style decisions for future sessions) while cleaning up temporary lab routes and files. Offers a Claude Code plugin path and a self-contained manual playbook for Cursor or other IDEs that detects the project's framework and styling system before generating variants.

- **Path**: [skills/prototyping/design-and-refine/SKILL.md](skills/prototyping/design-and-refine/SKILL.md)
- **Use when**: design lab; UI variations; design and refine; explore layout options for this page; compare a few directions for this component
- **Inputs**: component or page to design or redesign, a running dev server on a supported web stack, user feedback on generated variants
- **Outputs**: several distinct runnable UI variant implementations, a side-by-side comparison route in the dev server, DESIGN_PLAN.md, DESIGN_MEMORY.md
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [its-thepoe/skills](https://github.com/its-thepoe/skills/tree/3172de431451bbad2958b1fd87a79d1ccd39b0e3/design/design-and-refine) @ `3172de4` by Oladipupo Ayoola (its-thepoe), MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, experimental
- **Tags**: prototyping, interactive-prototype, ui-design, design-critique, variants
- **Related**: `prototype`, `variant`

### `interactive-prototype`

Builds one working, clickable prototype that behaves like a real app rather than a static mockup: React with useState/useEffect, small readable components split at ~400 lines, wrapped in a device/window frame. Requires a full interaction surface (hover states, working click/tap handlers with no dead controls, happy-path form validation, animated state transitions, end-to-end multi-step flows, loading and empty states) and realism rules (no lorem ipsum or placeholder names, 44px minimum mobile hit targets, critical state persisted to localStorage so a refresh does not lose the user's place). Explicitly scopes out real auth, real network calls, persistence beyond localStorage, production-grade accessibility audits, and edge cases the user did not ask to demonstrate.

- **Path**: [skills/prototyping/interactive-prototype/SKILL.md](skills/prototyping/interactive-prototype/SKILL.md)
- **Use when**: build a clickable prototype; make this feel like a real working app; prototype this flow end to end; give me an interactive demo I can click through
- **Inputs**: a feature or flow description to prototype
- **Outputs**: a working React-based interactive HTML/JS prototype with realistic fake data, functioning state transitions, and persisted UI state
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [manalkaff/opendesign](https://github.com/manalkaff/opendesign/tree/cecd9bb6b59408cb96a3974449b8e6ef9f5b17bb/skills/interactive-prototype) @ `cecd9bb` by manalkaff, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, experimental
- **Tags**: prototyping, interactive-prototype, high-fidelity, state-design
- **Related**: `prototype`, `wireframe`

### `prototype`

Builds several (default three, up to five) genuinely different versions of one described UI piece, each diverging on a named axis (layout, density, personality, motion, interaction model) stated before any code is written, hosted full-size in realistic context behind a visual picker with keyboard navigation, instant switching, and URL-param persistence per a verbatim picker spec. Every variant must independently meet the same motion-craft bar (correct easing, sub-300ms UI motion, transform-origin, reduced-motion) so a sloppy variant never widens the exploration. Presents tradeoffs honestly without marking a favorite, then on selection promotes the winner into the project's conventions and deletes the prototype surface.

- **Path**: [skills/prototyping/prototype/SKILL.md](skills/prototyping/prototype/SKILL.md)
- **Use when**: show me a few different versions of this component; prototype a few directions for this UI piece; build variants I can flip through; explore layout directions live
- **Inputs**: a one-sentence description of one UI piece to explore
- **Outputs**: a live picker harness (isolated route or standalone HTML) hosting each variant full-size in realistic context, a tradeoffs table (Variant | Axis | When it's the right choice | Its cost)
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/prototype) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: verified, stable
- **Tags**: prototyping, interactive-prototype, high-fidelity, variants
- **Related**: `variant`, `wireframe`, `interactive-prototype`

### `variant` ⭐

Builds three (up to five) genuinely different versions of one described UI piece, each a different position on a single named axis (structure, density, emphasis, type, or voice) owned by a sibling better-* skill, so secondary choices follow coherently rather than every axis varying at once. Hosts all variants on the real page behind a URL-driven picker deliberately styled outside the project's design system, with realistic content and item counts, clears better-interface's accessibility escalation-trigger floor before any variant enters the picker, then presents axis-position tradeoffs without marking a favorite and hands the decision back. On a choice, promotes the winner into the project's own conventions and deletes the rest.

- **Path**: [skills/prototyping/variant/SKILL.md](skills/prototyping/variant/SKILL.md)
- **Use when**: show me a few different versions of this component; explore layout directions for this UI; build variants behind a picker; which design direction should we pick
- **Inputs**: a one-sentence brief for one piece of UI, the project's styling system, tokens and component library
- **Outputs**: a real page hosting each variant behind a URL search-param picker, a tradeoffs table (Variant | Axis position | Right when | Costs)
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/variant) @ `ca48385` by Jakub Krehel, MIT
- **Status**: verified, stable, recommended default
- **Tags**: prototyping, variants, high-fidelity, interactive-prototype
- **Related**: `prototype`, `better-interface`

### `wireframe` ⭐

Guides the agent to explore a design space quickly with many rough, structurally distinct low-fidelity wireframes rather than one polished direction. Directs producing 3-5 structurally different options per idea (not recolors), using sketchy hand-written fonts, mostly black-and-white shapes with sparing color accents, plain-language section labels, and a minimal tweak surface (variant toggle, density, optional-section swap), while explicitly avoiding polish, hover states, and visual convergence across options.

- **Path**: [skills/prototyping/wireframe/SKILL.md](skills/prototyping/wireframe/SKILL.md)
- **Use when**: explore the design space; rough wireframes; low-fi wireframe options; sketch some layout ideas; give me a few structurally different layouts
- **Inputs**: a feature or screen description, an existing product/problem context to riff on
- **Outputs**: a set of 3-5 structurally distinct low-fidelity HTML wireframes laid out for side-by-side comparison, with plain-language section labels and interaction annotations
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [manalkaff/opendesign](https://github.com/manalkaff/opendesign/tree/cecd9bb6b59408cb96a3974449b8e6ef9f5b17bb/skills/wireframe) @ `cecd9bb` by manalkaff, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, experimental, recommended default
- **Tags**: wireframing, low-fidelity, ui-design, interaction-design, prototyping
- **Related**: `wireframe-json`, `prototype`, `interactive-prototype`

### `wireframe-json`

Generates a machine-readable JSON wireframe definition from a natural-language screen description (or from a design-spec's Information Architecture section) plus a self-contained, editable HTML preview. Applies a 7-phase design-reasoning framework before producing JSON: displacement check, content inventory, task/scanning-pattern selection, grid establishment, hierarchy assignment via a 4-level type scale, spacing via an 8-point grid, and a rhythm-verification pass with named failure modes (pixel perfectionism, hierarchy collapse, arbitrary spacing, grid amnesia, density monotony, action-hierarchy collapse) each with symptom/root-cause/fix. The JSON maps 1:1 to CSS flexbox and is the same schema used across a wider design pipeline (styled by other skills, consumed by Figma Make / Google Stitch style tools). The HTML preview supports drag-and-drop reordering, direction toggling, copy/paste, undo/redo, and JSON export/save, entirely client-side with no server or build step.

- **Path**: [skills/prototyping/wireframe-json/SKILL.md](skills/prototyping/wireframe-json/SKILL.md)
- **Use when**: generate a wireframe from this description; wireframe this screen as JSON; produce a structured wireframe I can hand to Figma Make; build a machine-readable wireframe definition
- **Inputs**: a natural-language layout description, or a design-id pointing at an existing design-spec's Information Architecture section
- **Outputs**: a `.wireframe.json` machine-readable layout definition following the documented schema, a self-contained `.wireframe.html` editable preview (drag-and-drop, undo/redo, JSON export)
- **Dependencies**: python3
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [yhassy/wireframe-skill](https://github.com/yhassy/wireframe-skill/tree/948d4331343b18d913d5bc502da72ed0c5f19101) @ `948d433` by yhassy, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, stable
- **Tags**: wireframing, ui-design, interaction-design, layout, grids, spacing, visual-hierarchy, figma
- **Related**: `wireframe`, `prototype`

## Testing and evaluation

### `break` ⭐

Renders one real component on a throwaway harness page under every content/state/quantity/container/environment scenario its own props and slots can actually reach in production, inferred from a fixed scenario-axis menu with cues that gate which axes apply (content length, content shape, quantity, container width, state, environment). Looks once, marks what visibly broke directly on the page, and reports a table of broken scenarios with the observation and the owning domain skill for the fix -- issuing no verdict itself, since it observes rather than judges.

- **Path**: [skills/testing/break/SKILL.md](skills/testing/break/SKILL.md)
- **Use when**: does this component survive edge cases; stress test this component; test with long text and zero items; render every state of this component
- **Inputs**: one component's props, slots, and states, a project route or scratch page to render it in
- **Outputs**: a harness page rendering every kept scenario side by side, a findings table (Scenario | Observed | Owner)
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/break) @ `ca48385` by Jakub Krehel, MIT
- **Status**: verified, stable, recommended default
- **Tags**: stress-testing, error-states, empty-states, loading, responsive
- **Related**: `better-interface`, `interface-review`

### `critique-information-density`

Makes the agent critique a rendered screen's information density along four dimensions - cognitive load, content priority, scanning pattern (F/Z-pattern fit, label alignment, chunking), and progressive disclosure - each with pointed evaluation questions; enforces an output format of observation / problem / fix per dimension with a pass / minor issue / major issue rating; and names common failure patterns (every-metric dashboards, 10+ column tables, front-loaded onboarding).

- **Path**: [skills/testing/critique-information-density/SKILL.md](skills/testing/critique-information-density/SKILL.md)
- **Use when**: this screen feels overwhelming; critique information density; too much on one screen; dashboard cluttered; review cognitive load
- **Inputs**: screenshot or rendered screen, primary user task
- **Outputs**: per-dimension findings with ratings, specific fixes
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/visual-critique/skills/critique-information-density) @ `20e34c4` by Owl-Listener, MIT
- **Status**: verified, stable
- **Tags**: design-critique, expert-review, visual-hierarchy, dashboards
- **Related**: `better-layout`, `design-review`

### `design-critique` ⭐

Runs an evidence-bounded heuristic evaluation of a supplied UI artifact (image, Figma design, rendered HTML/URL, or multi-screen flow) across four categories -- visual design & hierarchy, usability & interaction, accessibility, and content & language -- scoring each finding on the NN/g 0-4 severity scale (frequency x impact x persistence) against a named atom-level checklist drawing on Nielsen's heuristics, Norman's interaction principles, Gestalt, Fitts/Hick/Miller, and WCAG 2.2. Renders code, markup, or URLs to real pixels before judging them (never critiques unrendered source;

- **Path**: [skills/testing/design-critique/SKILL.md](skills/testing/design-critique/SKILL.md)
- **Use when**: critique this design; evaluate this UI; usability review; heuristic evaluation; review this mockup/screen/figma
- **Inputs**: image, Figma file, rendered HTML/URL, or multi-screen flow, optional evaluation brief (target users, primary task, platform, design maturity, constraints), optional design-system tokens/spec for the opt-in conformance mode
- **Outputs**: designer-voiced critique: overall read, what's working, top 3-5 findings each with element/problem/fix, health tally by NN/g severity name (no composite score), list of screens that could not be seen, with the reason, on request: full atom matrix, numeric severities, confidence, and framework badges per finding
- **Dependencies**: node, playwright
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [kirodotdev/kirocrew](https://github.com/kirodotdev/kirocrew/tree/00ea2455438450feaebe9d8ee315a612164e03bd/src/kiro_crew/apps/builtins/design_critique/skills/design-critique) @ `00ea245` by kirocrew, Apache-2.0 (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, stable, recommended default
- **Tags**: heuristic-evaluation, design-critique, severity, expert-review, a11y, wcag
- **Related**: `design-review`, `interface-review`, `laws-of-ux`, `usability-testing`

### `design-review`

Runs a structured, scored review of a screen, page, or product. Scores six weighted dimensions (Visual Hierarchy 20%, Consistency 20%, Accessibility 20%, Usability 20%, Responsiveness 10%, Performance 10%) into an overall weighted score, applies Nielsen's 10 usability heuristics flagging violations by number, runs an accessibility pass against a WCAG checklist with a contrast calculator for color-pair doubts, and checks the result against a documented anti-slop / banned-defaults checklist. Outputs the six-dimension scored table plus a prioritized findings table (# / severity Critical-Major-Minor-Enhancement / finding / recommendation) with concrete, token-referenced fixes.

- **Path**: [skills/testing/design-review/SKILL.md](skills/testing/design-review/SKILL.md)
- **Use when**: review this design; audit this screen; heuristic evaluation; design quality score; critique this UI before we ship
- **Inputs**: A screen, page, or flow to review, Target users, platform, and constraints
- **Outputs**: Six-dimension scored table plus weighted overall score, Prioritized findings table with severity and concrete fixes, Nielsen heuristic violations flagged by number
- **Dependencies**: python
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [plugin87/ux-ui-agent-skills](https://github.com/plugin87/ux-ui-agent-skills/tree/2ffb677aa02b225c8a3da1b7f31d9ebb7c38f1dd/.claude/skills/design-review) @ `2ffb677` by plugin87, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, experimental
- **Tags**: design-review, design-critique, heuristic-evaluation, severity, ui-design, visual-hierarchy, a11y
- **Related**: `interface-review`, `frontend-design-review`, `design-details`, `laws-of-ux`, `critique-information-density`, `design-critique`

### `find-animation-opportunities`

Read-only sweep of a codebase or UI for moments that would genuinely benefit from motion, filtered through a four-question gate (frequency, named purpose, duration budget, function) applied ruthlessly -- most candidates are expected to be rejected. Hunts six known seam classes (feedback gaps, teleporting state, missing spatial story, group entrances, gesture seams, the rare delight budget) with grep patterns, caps output at 5-7 suggestions per app, and requires a companion list of 2-5 explicitly rejected candidates with the gate question that killed each one, closing with a verdict on how much motion the interface actually needs.

- **Path**: [skills/testing/find-animation-opportunities/SKILL.md](skills/testing/find-animation-opportunities/SKILL.md)
- **Use when**: what could be animated here; make this feel more alive; find missing animation opportunities; where should we add motion
- **Inputs**: a codebase or a specific UI/view to sweep for motion opportunities
- **Outputs**: an opportunities table (Location | Today | Purpose | Frequency | Suggested motion) with exact values, a required rejected-candidates list with the gate question that killed each, a one-paragraph verdict naming the highest-leverage suggestion
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/find-animation-opportunities) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: verified, stable
- **Tags**: heuristic-evaluation, expert-review, motion, animation, severity
- **Related**: `animate`, `improve-animations`

### `improve-animations`

Surveys a codebase's animation and motion code as a senior motion advisor and produces a prioritized, vetted findings table plus self-contained implementation plans any agent (including a weaker model with zero context) can execute without judgment of its own. Four phases: recon (stack, motion libraries, existing tokens, frequency map), an eight-category parallel audit (purpose/frequency, easing/duration, physicality/origin, interruptibility, performance, accessibility, cohesion, missed opportunities) with three effort levels, re-vetting every finding against its cited file:line before presenting a leverage-ordered severity table, then writing plans with exact target values, repo-convention exemplars, ordered steps, hard scope boundaries and a feel-check verification section. Read-only on source; only writes plan files.

- **Path**: [skills/testing/improve-animations/SKILL.md](skills/testing/improve-animations/SKILL.md)
- **Use when**: improve the animations in this codebase; audit the motion in this app; make this app feel better; give me a roadmap of animation fixes
- **Inputs**: a codebase to audit for animation/motion quality, optionally an effort level (quick/standard/deep) or a category focus
- **Outputs**: a vetted, severity-ranked findings table with leverage ordering, self-contained implementation plans written to plans/NNN-slug.md, a plans/README.md with recommended execution order and dependencies
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/improve-animations) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: verified, stable
- **Tags**: audit, heuristic-evaluation, expert-review, motion, animation, severity, documentation
- **Related**: `find-animation-opportunities`, `animate`, `design-debt-audit`

### `silver-evaluate`

Runs a usability test, expert review, or feedback evaluation distinct from deterministic conformance checking: defines the decision, evaluation question, method, participants or reviewers, and tasks; inspects a pinned visualization or prototype and captures only sanitized observations; separates observed behavior from interpretation and from deterministic check findings; and produces evidence-linked findings and recommendations for explicit human acceptance. Boundaries forbid implying participants or sessions existed when only a planned or expert review was performed, and forbid turning automated-conformance failures into fabricated user evidence. Upstream's 'Done' step instructs emitting the finished record through a bundled `.silver/bin/silver invoke` CLI belonging to the parent Silver Design Framework installation; that CLI and its runtime are not included in this vendored skill, so used standalone an agent should follow the workflow and boundaries and write the evaluation/finding artifacts directly.

- **Path**: [skills/testing/silver-evaluate/SKILL.md](skills/testing/silver-evaluate/SKILL.md)
- **Use when**: plan a usability test; run an expert review of this prototype; evaluate this design and separate observation from interpretation; produce evidence-linked evaluation findings; distinguish user-tested findings from automated conformance failures
- **Inputs**: a sketch, visualization, prototype, design specification, or map to evaluate, an evaluation question, method, and participant/reviewer set
- **Outputs**: evidence-linked findings and recommendations that keep observed behavior, interpretation, confidence, and deterministic-conformance results distinguishable
- **Dependencies**: node
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [thejparsenault/silver-design-framework](https://github.com/thejparsenault/silver-design-framework/tree/317ede0f594cda80f0d84b11098afac0c29e21b1/framework/skills/evaluate) @ `317ede0` by JP Arsenault, MIT
- **Status**: verified, experimental
- **Tags**: usability-testing, heuristic-evaluation, design-critique, expert-review, severity
- **Related**: `silver-ideate`, `silver-measure`, `interface-review`

### `synthetic-user-testing`

Validates a build by having the agent walk through each key task in character as each defined persona (e.g. a low-vision user at 200% zoom and high contrast, a non-native speaker, someone with a motor impairment) rather than evaluating the interface generically. For each scenario it documents what the persona does, which input method they use, what they perceive at their actual settings, what they would think, and whether the step succeeds, succeeds with difficulty, fails, or is unclear -- then compiles a cross-persona barrier matrix to separate universal barriers from persona-specific ones and friction hotspots. Classifies every finding as Critical (task impossible), Major (significant difficulty), or Minor (rough but doable), and produces a structured report with a ship / fix-and-retest / rethink recommendation. Explicitly positioned as a fast pre-check that surfaces predictable barriers before real usability testing, not a replacement for it.

- **Path**: [skills/testing/synthetic-user-testing/SKILL.md](skills/testing/synthetic-user-testing/SKILL.md)
- **Use when**: walk through this as each persona; synthetic usability test; would a screen reader user get stuck here; validate this build against our personas; simulate testing before real usability testing
- **Inputs**: The built interface (running app, prototype, or screenshots), A set of personas with ability/context details, The key tasks each persona needs to accomplish
- **Outputs**: Per-scenario step-by-step persona walkthroughs with pass/fail results, Cross-persona barrier matrix, Findings by severity (Critical/Major/Minor) with fixes, Ship / fix-and-retest / rethink recommendation
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designpowers](https://github.com/Owl-Listener/designpowers/tree/cb00757da9d554591fa78d27aa1854d60a05c4f7/skills/synthetic-user-testing) @ `cb00757` by MC Dean, MIT
- **Status**: verified, experimental
- **Tags**: usability-testing, personas, severity, ai-evaluation, qualitative
- **Related**: `usability-testing`, `persona`

### `usability-testing` ⭐

Plans and runs usability tests with real people: writes 3-5 task scenarios with realistic triggers and clear success conditions (never revealing how to complete them), sets participant recruitment targets (5-8 people, with explicit minimums covering screen-reader users, older adults, non-native speakers, and low tech confidence), selects a test method (moderated think-aloud, unmoderated remote, guerrilla, or accessibility audit with assistive-technology users) against a when-to-use table, structures the test script (welcome, background, tasks, debrief), classifies each task outcome (completed easily / with difficulty / failed / completed wrong) with a three-tier severity scale, and converts every finding into a concrete design action. Delivers a task-success-rate table, severity-ranked findings, and an iterate/ship/rethink recommendation.

- **Path**: [skills/testing/usability-testing/SKILL.md](skills/testing/usability-testing/SKILL.md)
- **Use when**: plan a usability test; write a usability test script; how many participants do I need for testing; analyse usability test findings; turn usability findings into design fixes
- **Inputs**: A working prototype or build to test, The core tasks/jobs from the design brief
- **Outputs**: Task scenarios and a full test script, Task success-rate table classified by outcome, Severity-ranked findings with design actions, Ship / iterate / rethink recommendation
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designpowers](https://github.com/Owl-Listener/designpowers/tree/cb00757da9d554591fa78d27aa1854d60a05c4f7/skills/usability-testing) @ `cb00757` by MC Dean, MIT
- **Status**: verified, stable, recommended default
- **Tags**: usability-testing, severity, qualitative, user-research
- **Related**: `synthetic-user-testing`, `design-critique`, `research-planning`, `silver-evaluate`, `ux-research-workflow`

## Design QA

### `design-details`

Parent router and full-audit contract for a suite of seven UI-craft sub-skills (animation, layout, copy, typography, color, accessibility, analytics). Enforces a Design System Protocol (check for existing tokens/CSS variables/theme objects before proposing any value; propose additions instead of overrides), a Context Gathering Protocol (audience, use cases, tone, platform - stop and ask if missing, with a /design-details init flow that persists answers to .design-details.md so the interview happens once per project), and a full-audit contract: run every applicable sub-skill, cover a named surface checklist (narrow viewport, modals, error/empty/loading states, keyboard traversal, reduced motion, live regions), open with a scope preamble stating what was and was not audited, and present findings as lettered sections of Before | After | Why tables, closing with an optional row-by-row walkthrough mode (Apply / Decline / Discuss / Stop per item).

- **Path**: [skills/design-qa/design-details/SKILL.md](skills/design-qa/design-details/SKILL.md)
- **Use when**: review this UI; polish this screen; audit this page; full design audit; make this feel considered; design details pass
- **Inputs**: source code, project design context (.design-details.md, CLAUDE.md), the screen or component under review
- **Outputs**: scope preamble, lettered findings as Before/After/Why tables, interactive row-by-row walkthrough with applied fixes, .design-details.md project context file (init flow)
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [GeorgeTurp/design-details](https://github.com/GeorgeTurp/design-details/tree/9e5686b0e1e6fc426c5b2d21280eb76e5b41ed14/skills/design-details) @ `9e5686b` by George Turp, MIT
- **Status**: verified, stable
- **Tags**: orchestration, workflow, design-review, design-critique, review, visual-polish
- **Related**: `interface-review`, `frontend-design-review`, `design-review`, `extract-design-md`

### `frontend-design-review` ⭐

Reviews existing UI implementations against design-system compliance, three quality pillars (frictionless task completion, quality-as-craft including WCAG 2.1 A/AA accessibility grades, and trustworthy AI/error transparency), and aesthetic distinctiveness -- or creates new distinctive frontend interfaces from scratch avoiding generic 'AI slop' aesthetics. Produces a structured review output with a pillar status table, blocking/major/minor severity-ranked issues, and design-system-linked recommendations; provides a pre-approval quick checklist and review-type modifiers (PR review, creative review, design review, accessibility audit, design-system compliance audit) that adjust evaluation focus.

- **Path**: [skills/design-qa/frontend-design-review/SKILL.md](skills/design-qa/frontend-design-review/SKILL.md)
- **Use when**: review this UI for design quality; PR design review; accessibility audit of this component; check design system compliance; critique this frontend implementation; create a distinctive UI that avoids generic AI design
- **Inputs**: an existing UI implementation, PR diff, or component to review, or a brief for a new interface to design, access to the project's design system / Figma (optional but recommended for compliance checks)
- **Outputs**: a structured review report (context, pillar assessment table, verdict, blocking/major/minor issues, recommendations), or a newly implemented distinctive UI when used in creative mode
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [microsoft/skills](https://github.com/microsoft/skills/tree/7066b58141d8cc66f39356b2ee5bb64d428dcf17/.github/skills/frontend-design-review) @ `7066b58` by Microsoft, MIT
- **Status**: verified, stable, recommended default
- **Tags**: design-qa, design-review, pr-review, a11y, ui-design
- **Related**: `interface-review`, `frontend-design`, `design-details`, `frontend-ui-dark-ts`

### `interface-review` ⭐

Change-scoped interface review for uncommitted work, a branch, or a pull request: resolves the review target (working tree, staged, branch vs. merge-base, PR fetched by ref, or an explicit range) with documented traps for shallow clones, mid-rebase state and detached HEAD, expands each changed file to its blast radius of importers, reads the removed side of every diff hunk against a table of accessibility/layout/typography/color/writing regression signals, classifies every finding as Introduced, Regression, or Pre-existing, holds the change to its stated PR intent to catch incomplete variants and missing states, and hands the classified findings to better-interface for severity, consolidation and the verdict. Never checks out or mutates the working tree.

- **Path**: [skills/design-qa/interface-review/SKILL.md](skills/design-qa/interface-review/SKILL.md)
- **Use when**: review this pull request; review my branch for interface regressions; review uncommitted changes; did this change break accessibility or layout
- **Inputs**: a git target: working tree, staged, branch, pr <n>, ref, or range, availability of better-interface for severity and verdict
- **Outputs**: a scope block (target, base/head ref, commits, files in scope, expanded surfaces), a findings table with a Status column (Introduced/Regression/Pre-existing), Block/Approve verdict via better-interface
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/interface-review) @ `ca48385` by Jakub Krehel, MIT
- **Status**: verified, stable, recommended default
- **Tags**: design-qa, design-review, pr-review, review, handoff
- **Related**: `better-interface`, `frontend-design-review`, `design-details`, `design-review`, `break`

### `review-animations` ⭐

Reviews animation and motion code (a diff or a component) against ten non-negotiable standards derived from Emil Kowalski's animation philosophy: justified motion, frequency-appropriate use, responsive easing, sub-300ms UI durations, origin/physical correctness, interruptibility, GPU-only properties, accessibility, asymmetric enter/exit timing, and cohesion. Flags a fixed list of escalation triggers on sight (transition: all, scale(0) entrances, ease-in on UI, animation on high-frequency/keyboard actions, keyframes on rapidly-triggered elements), proposes fixes via a nine-step remedial preference hierarchy (delete first, polish last), and outputs a required Before/After/Why findings table followed by a tiered verdict ending in Block or Approve. Defaults to flagging; approval is earned.

- **Path**: [skills/design-qa/review-animations/SKILL.md](skills/design-qa/review-animations/SKILL.md)
- **Use when**: review this animation code; does this motion pass review; audit this transition against the animation standards; block or approve this animation diff
- **Inputs**: animation/motion source code, typically a diff or a single component
- **Outputs**: a Before/After/Why findings table, a tiered verdict (feel-breaking regressions, missed simplifications, performance, interruptibility/timing, origin/physicality/cohesion, accessibility), a final Block or Approve decision
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/review-animations) @ `d23d7f8` by Emil Kowalski, MIT
- **Status**: verified, stable, recommended default
- **Tags**: design-review, pr-review, motion, animation, severity, design-qa
- **Related**: `animate`, `better-ui`, `better-interface`

### `web-design-reviewer`

Drives a four-phase live visual QA loop against a running website or web app (static HTML, React/Vue/Angular/Svelte SPAs, Next.js/Nuxt/SvelteKit, WordPress/Drupal, or any other web app): gather project/framework/styling info (auto-detecting from package.json, tailwind.config, etc.), capture screenshots and traverse pages at four viewports (375/768/1280/1920px) checking layout, responsive, accessibility and visual-consistency issues against named issue tables with severities, prioritize findings P1-P3, locate the offending source files by selector/component search and apply minimal framework-respecting fixes, then re-verify with before/after screenshots and a regression check.

- **Path**: [skills/design-qa/web-design-reviewer/SKILL.md](skills/design-qa/web-design-reviewer/SKILL.md)
- **Use when**: review website design; check the UI; fix the layout; find design problems; responsive QA on this site
- **Inputs**: running URL (local dev server, staging, or production), browser automation capability (screenshot capture, page navigation, DOM retrieval), access to project source code when making fixes
- **Outputs**: prioritized (P1-P3) issue report with before/after screenshots, source-level fixes applied at the offending files, unfixed-issue list with reasons and recommended actions
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [galaxy-dawn/claude-scholar](https://github.com/galaxy-dawn/claude-scholar/tree/6ed46dac03191c7a734f49ed48b41195012098ff/skills/web-design-reviewer) @ `6ed46da` by Gaorui Zhang, MIT
- **Status**: verified, stable
- **Tags**: design-review, pr-review, visual-regression, responsive, cross-browser, a11y
- **Related**: `frontend-design-review`, `design-review`

## Product analytics

### `experiment-designer` ⭐

Designs, prioritizes and evaluates product experiments: writes hypotheses in If/Then/Because format, separates primary/guardrail/secondary metrics, computes required sample size per variant via a bundled Python calculator (baseline rate, minimum detectable effect, alpha, power), scores and ranks experiment ideas with ICE (Impact x Confidence x Ease / 10), and defines stopping rules before launch. Includes a hypothesis-quality checklist, a table of common experiment pitfalls (underpowered tests, simultaneous changes, mid-test edits, early stopping, instrumentation drift), and statistical-interpretation guardrails distinguishing statistical from business significance.

- **Path**: [skills/analytics/experiment-designer/SKILL.md](skills/analytics/experiment-designer/SKILL.md)
- **Use when**: design an A/B test for this change; write a testable hypothesis; calculate sample size for an experiment; prioritize these experiment ideas with ICE; interpret these A/B test results
- **Inputs**: a proposed product change and the metric it's expected to move, baseline rate, minimum detectable effect, and desired power/significance for sample-size calculation, a list of candidate experiments for ICE prioritization
- **Outputs**: an If/Then/Because hypothesis with primary and guardrail metrics, a required sample size per variant and total, an ICE-ranked experiment priority list, a statistically-grounded read of experiment results
- **Dependencies**: python3
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills/tree/19392f7a08264ed00486a251f5b2098321771f94/product-team/skills/experiment-designer) @ `19392f7` by Alireza Rezvani, MIT
- **Status**: verified, stable, recommended default
- **Tags**: experimentation, ab-testing, hypothesis, metrics, analytics
- **Related**: `instrumentation-plan`, `product-analytics`, `silver-measure`

### `instrumentation-plan` ⭐

Turns a feature or flow into an instrumentation plan: the questions the data must answer, success and guardrail metrics with owners and baselines, activation and retention definitions, an event taxonomy under one naming convention (object_action snake_case, typed properties, shared context properties), identity and consent rules with data minimisation, funnel and segment definitions, an experiment block, and a QA checklist. Grounded in the Segment, Amplitude, GA4 and PostHog conventions so it ports between vendors.

- **Path**: [skills/analytics/instrumentation-plan/SKILL.md](skills/analytics/instrumentation-plan/SKILL.md)
- **Use when**: write the tracking plan for this feature; define analytics events; what should we measure after launch; name these events; set up the A/B test metrics; define activation and retention
- **Inputs**: feature or flow, the decision the data must inform, existing analytics conventions
- **Outputs**: metrics table, tracking plan table, identity and consent rules, funnel and experiment definitions, QA checklist
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: original to this repository (MIT)
- **Status**: verified, experimental, recommended default
- **Tags**: analytics, instrumentation, event-taxonomy, funnel, activation, retention, experimentation, ab-testing, metrics, kpis, data-minimization
- **Related**: `silver-measure`, `ux-research-workflow`, `pre-handoff-review`, `survey-design`, `product-analytics`, `experiment-designer`

### `product-analytics` ⭐

Defines product metric frameworks (AARRR, North Star, HEART) and stage-appropriate KPIs (pre-PMF, growth, mature), designs a layered metric dashboard (executive/product-health/feature layers with a 5-7-metric cap), and runs cohort/retention/funnel analysis via a bundled Python CLI that reads event CSVs and computes retention matrices, cohort tables and funnel conversion (text or JSON output). Includes a retention-curve interpretation guide, a table of 6 named analytics anti-patterns with fixes (vanity metrics, single-point retention, dashboard overload, no decision rule, averaged segments, ignored seasonality), and cross-references to experiment design and RICE prioritization for acting on findings.

- **Path**: [skills/analytics/product-analytics/SKILL.md](skills/analytics/product-analytics/SKILL.md)
- **Use when**: define product KPIs for this stage; design a metrics dashboard; run cohort or retention analysis; interpret this retention curve; analyze feature adoption or funnel drop-off
- **Inputs**: a product stage (pre-PMF, growth, mature) and business context, event data as CSV (user_id, cohort_date/stage, activity_date) for retention/cohort/funnel analysis
- **Outputs**: a stage-appropriate KPI set and metric framework choice, a layered dashboard structure (executive/product-health/feature), a retention or cohort matrix, or funnel conversion table, in text or JSON, an anti-pattern check against the current metrics setup
- **Dependencies**: python3
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills/tree/19392f7a08264ed00486a251f5b2098321771f94/product-team/skills/product-analytics) @ `19392f7` by Alireza Rezvani, MIT
- **Status**: verified, stable, recommended default
- **Tags**: analytics, metrics, kpis, dashboards, funnel, retention, activation
- **Related**: `instrumentation-plan`, `experiment-designer`, `silver-measure`

### `silver-measure`

Closes the loop after implementation: restates the hypothesis and success criteria the change was meant to test, states what instrumentation exists and whether it is sufficient to answer the question, compares before/after or an experiment result without treating correlation as causation, and records confidence and limitations to feed back into synthesis. Boundaries scope the skill away from defining success criteria (specification) or broadly interpreting mixed research evidence (synthesis), and forbid fabricating analytics, claiming measurement occurred without real data, or overstating confidence when instrumentation or sample quality is weak. Upstream emits its record through the Silver Design Framework CLI (.silver/bin/silver invoke), which is not bundled; used standalone, follow the workflow and boundaries and write the artifact directly.

- **Path**: [skills/analytics/silver-measure/SKILL.md](skills/analytics/silver-measure/SKILL.md)
- **Use when**: check whether a shipped change achieved its intended outcome; review instrumentation before trusting a metric; compare before/after a launch; state confidence and limitations for a measured result; avoid treating correlation as causation in an outcome review
- **Inputs**: the original hypothesis and success criteria for a shipped design or product change, available instrumentation/analytics data covering before and after the change
- **Outputs**: a measurement record comparing before/after or experiment results, with instrumentation sufficiency, confidence, and data limitations stated explicitly, ready to feed back into synthesis
- **Dependencies**: node
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [thejparsenault/silver-design-framework](https://github.com/thejparsenault/silver-design-framework/tree/317ede0f594cda80f0d84b11098afac0c29e21b1/framework/skills/measure) @ `317ede0` by JP Arsenault, MIT
- **Status**: verified, experimental
- **Tags**: analytics, instrumentation, metrics, experimentation, hypothesis
- **Related**: `silver-evaluate`, `instrumentation-plan`, `product-analytics`, `experiment-designer`

## Agentic and AI-native UI

### `agentic-ui-review` ⭐

Reviews interfaces where an AI agent acts on the user's behalf for the trust and control patterns they need: intent echo, plan preview, approval scaled to blast radius, live state, tool-use transparency, honest uncertainty, interruptibility, reversibility, error recovery, scope and memory disclosure, accessible streaming and generated-UI governance. Traces each capability through before, during, after and failure moments, rates findings against Microsoft HAX, Google PAIR, Apple HIG and WCAG 2.2 SC 4.1.3, and reports severity-ranked fixes with a Block or Approve verdict.

- **Path**: [skills/agentic-ui/agentic-ui-review/SKILL.md](skills/agentic-ui/agentic-ui-review/SKILL.md)
- **Use when**: review our AI assistant UI; design the approval flow for agent actions; is the agent state visible enough; audit copilot trust patterns; review streaming output accessibility
- **Inputs**: agent interface screens or components, tool list with blast radius and reversibility, autonomy model
- **Outputs**: findings by lifecycle moment with severity, concrete fixes, Block/Approve verdict
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: original to this repository (MIT)
- **Status**: verified, experimental, recommended default
- **Tags**: agentic-ui, human-in-the-loop, approval-patterns, agent-state, transparency, uncertainty, interruptibility, reversibility, error-recovery, trust, ai-safety, ai-accessibility, review
- **Related**: `conversational-ux`, `product-design-review`, `better-accessibility`, `dark-pattern-review`

### `conversational-ux` ⭐

Makes the agent design voice and chat interfaces around the conversation turn: a confirmation-strategy table (explicit/implicit/none by stakes), a three-step error reprompt ladder that never repeats the same prompt, voice-specific writing rules (short sentences, no visual-only references, max three-item lists, sub-8s responses, earcons), multimodal voice+screen rules, text-chat affordances (quick replies, typing indicators, structured cards), persona/tone decisions including no false humanity, and guidance on when conversation is the wrong pattern.

- **Path**: [skills/agentic-ui/conversational-ux/SKILL.md](skills/agentic-ui/conversational-ux/SKILL.md)
- **Use when**: design a chatbot flow; voice interface script; conversational UI; dialog error recovery; assistant persona; IVR or smart speaker skill
- **Inputs**: dialog goals, sample utterances, product context
- **Outputs**: dialog flow with prompts, error recovery ladder, persona and tone specification
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/tree/20e34c4a587e5eb09fcdf8351fa97b3ad761b31e/interaction-design/skills/conversational-ux) @ `20e34c4` by Owl-Listener, MIT
- **Status**: verified, stable, recommended default
- **Tags**: conversational-ui, agentic-ui, error-recovery, voice-and-tone
- **Related**: `better-writing`, `agentic-ui-review`

## Ethics and safety

### `dark-pattern-review` ⭐

Reviews a flow, screen or copy for deceptive and manipulative design patterns (sneaking, obstruction, interface interference, false urgency and scarcity, unverifiable social proof, forced action, asymmetric consent) against the taxonomies regulators cite (deceptive.design, Mathur et al. 2019, FTC 2022, EDPB 03/2022, OECD 2022, EU DSA Art. 25), rates each finding by user harm and regulatory exposure, proposes the honest alternative with the concrete element and step count, and ends with Block or Approve plus a not-legal-advice note.

- **Path**: [skills/ethics-and-safety/dark-pattern-review/SKILL.md](skills/ethics-and-safety/dark-pattern-review/SKILL.md)
- **Use when**: is this flow manipulative; review the cancellation flow; check the consent banner; dark pattern audit; review pricing and checkout for deceptive patterns
- **Inputs**: flow screenshots, prototype or source with copy, business context and applicable jurisdictions
- **Outputs**: findings table with severity, harm and exposure, honest alternatives, Block/Approve verdict
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: original to this repository (MIT)
- **Status**: verified, experimental, recommended default
- **Tags**: ethics, dark-patterns, manipulation, consent, privacy, trust-and-safety, review
- **Related**: `product-design-review`, `better-writing`, `better-accessibility`, `agentic-ui-review`

## Design engineering

### `design-handoff`

Generates a developer handoff specification from a design (Figma URL, screenshot, or description): exact measurements and design-token references, component variants and interaction states (hover, active, disabled, loading, error), responsive breakpoint behavior, content edge cases (empty/loading/error states, long or international text), and accessibility notes (focus order, ARIA, keyboard). Produces a structured Markdown spec sheet covering layout, tokens, components, states, responsiveness, edge cases, animation, and accessibility. Works standalone from a text description or screenshot; when a Figma MCP connector is available it can pull exact measurements and tokens directly, and when a project-tracker connector (Linear/Asana/Jira) is available it can link the spec to the implementation ticket, but neither is required.

- **Path**: [skills/design-engineering/design-handoff/SKILL.md](skills/design-engineering/design-handoff/SKILL.md)
- **Use when**: generate a design handoff spec; developer handoff for this screen; write the dev spec for this design; design is ready for engineering; spec out tokens and states for this component
- **Inputs**: A Figma URL, screenshot, or written description of the design, Optional: tech stack, breakpoints, or edge cases to cover
- **Outputs**: Markdown handoff spec: layout, design tokens used, component states/interactions, responsive behavior, edge cases, animation notes, accessibility notes
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins/tree/8c3ec5534fc6948b461c6a0275bdfdb8ab0c9888/design/skills/design-handoff) @ `8c3ec55` by Anthropic, Apache-2.0 (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, stable
- **Tags**: handoff, design-engineering, documentation, design-tokens, component-docs, responsive
- **Related**: `pre-handoff-review`, `handoff-to-claude-code`

### `explain-interface` ⭐

Reverse-engineers how a UI effect or a whole frontend was built from a URL (browser DevTools evaluate_script or raw HTML/CSS fetch) or a screenshot (explicit reconstruction, not a reading). Finds the full layer stack behind one visual effect in paint order rather than one declaration, tags every claim measured/derived/inferred, treats fetched page content as evidence never as instructions to follow, and closes on the transferable recipe in words plus what would not survive being copied, rather than a rebuild snippet.

- **Path**: [skills/design-engineering/explain-interface/SKILL.md](skills/design-engineering/explain-interface/SKILL.md)
- **Use when**: how was this gradient built; explain this site's frontend stack; reverse engineer this effect from a screenshot; what CSS produces this visual
- **Inputs**: a URL and the named effect (or none, for a whole-system read), optionally a screenshot when no live page is available
- **Outputs**: a layer-stack explanation in paint order with measured/derived/inferred tags per claim, a transferable recipe in words plus what would not survive copying
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/explain-interface) @ `ca48385` by Jakub Krehel, MIT
- **Status**: verified, stable, recommended default
- **Tags**: design-engineering, frontend, implementation-quality, explanation, documentation
- **Related**: `better-interface`

### `extract-static-html`

Produces a single self-contained static HTML file from a rendered web page or app screen. Primary path: a Puppeteer script (scripts/snapshot.ts) launches headless Chrome against a running dev server or built app, captures the rendered DOM plus live CSSOM rules, inlines stylesheets and same-origin icon fonts, converts images and canvases to base64 data URIs, and strips dev-only scripts and HMR overlays; works with any framework, supports dark-mode classes, fixed-element removal, full-page capture and an optional auth script for login-gated pages. Fallback: a browser-subagent DOM capture for pages needing interaction first. Last resort: scripts/extract_inline_html.ts flattens a hand-written React mock into static HTML via Babel, and scripts/post_process.ts inlines remaining local images. Used to capture a specific UI state or produce a portable snapshot for design handoff or documentation.

- **Path**: [skills/design-engineering/extract-static-html/SKILL.md](skills/design-engineering/extract-static-html/SKILL.md)
- **Use when**: save this page as a static self-contained HTML file; capture the rendered UI state of this app; extract standalone HTML from my dev server; share a static snapshot of this page; flatten this React mock into standalone HTML
- **Inputs**: a running local dev server URL, or a built app directory, optional React mock component (.jsx) plus its CSS files for the fallback path, optional auth script for login-gated pages
- **Outputs**: a single self-contained HTML file with inlined CSS, base64 images/icon-fonts, and no external references
- **Dependencies**: node, npm:puppeteer, npm:@babel/parser, npm:@babel/traverse, npm:@babel/generator, browser
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills/tree/0337446dadde6f8c94210444e2aa9d546126480f/plugins/stitch-design/skills/extract-static-html) @ `0337446` by google-labs-code, Apache-2.0 (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, experimental
- **Tags**: frontend, handoff, documentation, implementation-quality
- **Related**: `extract-design-md`

### `handoff-to-claude-code`

Packages a finished design into a self-sufficient handoff folder for a developer or coding agent to implement, with every referenced HTML prototype, component, image, font, and asset copied in so no path traces back into the source project. Generates a README with nine required sections in a fixed order (overview, about the design files, fidelity, screens/views with exact layout and component measurements, interactions and behavior, state management, a flat design-token list, assets, and a file manifest). States up front, verbatim in spirit, that the bundled HTML is a design reference to be recreated in the target codebase's own framework and patterns, not production code to paste in directly. Asks before including screenshots, then zips the folder for download.

- **Path**: [skills/design-engineering/handoff-to-claude-code/SKILL.md](skills/design-engineering/handoff-to-claude-code/SKILL.md)
- **Use when**: hand this design off to a developer; package this for implementation; generate a spec for the engineering team; prepare this prototype for handoff to a coding agent
- **Inputs**: a finished design (HTML prototypes, components, assets) ready for implementation
- **Outputs**: a zipped handoff folder containing every referenced design file plus a nine-section README spec (fidelity, layout, tokens, interactions, state, assets, file manifest)
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [manalkaff/opendesign](https://github.com/manalkaff/opendesign/tree/cecd9bb6b59408cb96a3974449b8e6ef9f5b17bb/skills/handoff-to-claude-code) @ `cecd9bb` by manalkaff, MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, experimental
- **Tags**: handoff, design-engineering, documentation, design-tokens, component-docs
- **Related**: `design-handoff`, `pre-handoff-review`

### `image-to-code`

For visually-important website tasks, directs the agent to generate its own design reference image(s) first, deeply analyze them (text, typography, spacing, buttons, colors, layout logic), and only then implement the frontend to match -- reversing the usual code-first default. Prefers one large, readable image per section over a single compressed multi-section board, requires fresh regeneration instead of cropping when a section needs more detail, and gives concrete hero-cleanliness, anti-nested-box, and anti-AI-slop rules (banned filler copy, banned fake brand names, banned generic gradients) to keep the coded output faithful to the generated references instead of drifting into generic templates.

- **Path**: [skills/design-engineering/image-to-code/SKILL.md](skills/design-engineering/image-to-code/SKILL.md)
- **Use when**: image to code; build this from a generated design reference; image-first website design; generate then implement this landing page; design-to-code for a marketing site
- **Inputs**: a description of the website or section to build, an environment with image-generation capability available to the agent
- **Outputs**: one or more generated section-reference images, a deep visual analysis (typography, spacing, color, components) of those images, frontend code implemented to match the generated references
- **Verified compatible with**: codex, claude-code, cursor, opencode, amp, gemini-cli, copilot, vs-code
- **Source**: third-party — [its-thepoe/skills](https://github.com/its-thepoe/skills/tree/3172de431451bbad2958b1fd87a79d1ccd39b0e3/design/image-to-code) @ `3172de4` by Oladipupo Ayoola (its-thepoe), MIT (modified — see THIRD_PARTY_NOTICES.md)
- **Status**: verified, experimental
- **Tags**: frontend, handoff, implementation-quality, ui-design, visual-hierarchy
- **Related**: `extract-static-html`, `frontend-design`

### `web-artifacts-builder`

Scaffolds and bundles a React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui project into a single self-contained HTML artifact for claude.ai, via two bundled shell scripts: init-artifact.sh (creates the project, configures Tailwind/shadcn theming and path aliases, installs 40+ pre-extracted shadcn/ui components and their Radix UI dependencies) and bundle-artifact.sh (builds with Parcel and inlines all JS/CSS/assets into one bundle.html with html-inline). Instructs the agent to avoid generic 'AI slop' visual patterns (centered layouts, purple gradients, uniform rounded corners, Inter font) while building.

- **Path**: [skills/design-engineering/web-artifacts-builder/SKILL.md](skills/design-engineering/web-artifacts-builder/SKILL.md)
- **Use when**: build a complex React artifact with shadcn/ui; create a multi-component claude.ai artifact with state management; bundle a React app into a single HTML file; scaffold a Tailwind + shadcn project for an artifact
- **Inputs**: a project name, a description of the artifact's required components/state/routing
- **Outputs**: a scaffolded React+TypeScript+Vite+Tailwind+shadcn project directory, a single bundle.html artifact with all JS/CSS/dependencies inlined
- **Dependencies**: node, pnpm
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [anthropics/skills](https://github.com/anthropics/skills/tree/3b3fad96af16a10759d930941b4520ba0c40edae/skills/web-artifacts-builder) @ `3b3fad9` by Anthropic, Apache-2.0
- **Status**: verified, stable
- **Tags**: frontend, implementation-quality, design-engineering
- **Related**: `frontend-design`

## Orchestration

### `better-interface` ⭐

Cross-discipline interface-review orchestrator: resolves review scope, routes a screen or flow to the sibling better-accessibility, better-layout, better-writing, better-typography, better-colors and better-ui skills in a fixed order, requires evidence (file:line, not visual claims from source alone), applies one shared HIGH/MEDIUM/LOW severity scale with a fixed list of escalation triggers that are always HIGH on sight, prefers the cheapest fix (delete, use the platform, reuse a token, correct the value, add), consolidates systemic findings into one row per root cause with a 15-finding cap, and issues a single Block/Approve verdict. Hands off change-scoped (branch/PR/uncommitted) reviews to interface-review rather than resolving them itself.

- **Path**: [skills/orchestration/better-interface/SKILL.md](skills/orchestration/better-interface/SKILL.md)
- **Use when**: holistic interface review; review the whole screen; full UI review across accessibility layout color typography; consolidated design review verdict
- **Inputs**: a screen, flow, or feature scope, availability of the better-accessibility/better-layout/better-writing/better-typography/better-colors/better-ui sibling skills
- **Outputs**: scope and per-domain coverage table, one consolidated findings table ranked by severity, Block/Approve verdict
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: third-party — [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/ca483852de23d48ab4f4ea71da37dad12bd70a95/skills/better-interface) @ `ca48385` by Jakub Krehel, MIT
- **Status**: verified, stable, recommended default
- **Tags**: orchestration, workflow, review, design-review, design-critique
- **Related**: `better-accessibility`, `better-layout`, `better-writing`, `better-typography`, `better-colors`, `better-ui`, `interface-review`, `variant`, `break`, `explain-interface`, `product-design-review`

### `pre-handoff-review` ⭐

Orchestrates a completeness check before design is handed to engineering: inventories screens and states, then runs the owning skills for responsive behaviour (better-layout), localisation (localization-design), accessibility annotations (a11y-planner, better-accessibility), final copy (better-writing), tokens and components (design-system-governance, extract-design-md), motion (motion-system, animation-vocabulary), platform (platform-conventions) and analytics (instrumentation-plan), classifies gaps as blocker, gap or note, and produces a readiness table with owners and the artifact list to hand over.

- **Path**: [skills/orchestration/pre-handoff-review/SKILL.md](skills/orchestration/pre-handoff-review/SKILL.md)
- **Use when**: is this ready for development; design handoff checklist; what is missing from this spec; review before dev handoff; spec completeness check
- **Inputs**: design files or exported screens with any spec, target platform, design system and locales
- **Outputs**: readiness table with blockers, gaps and owners, artifact list for handover, Ready / Ready with assumptions / Not ready
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: original to this repository (MIT)
- **Status**: verified, experimental, recommended default
- **Tags**: orchestration, handoff, review, workflow, documentation
- **Related**: `better-layout`, `localization-design`, `a11y-planner`, `better-accessibility`, `better-writing`, `design-system-governance`, `extract-design-md`, `motion-system`, `animation-vocabulary`, `platform-conventions`, `instrumentation-plan`, `product-design-review`, `design-handoff`

### `product-design-review` ⭐

Orchestrates a complete product-design review: selects the smallest set of specialist lenses the input needs (accessibility for source or live page, layout, platform conventions, copy, typography, color, UI polish, animation, agentic interface, deceptive patterns, design-system compliance, diff scoping), confirms each is installed or marks it Not reviewed, runs them foundations-first, merges duplicate findings under the owning skill with a shared severity ladder and a 20-finding cap, and produces one report with a Block or Approve verdict and the list of skills used.

- **Path**: [skills/orchestration/product-design-review/SKILL.md](skills/orchestration/product-design-review/SKILL.md)
- **Use when**: full design review; pre-launch review of this feature; review this whole flow; holistic UX review; design audit before shipping
- **Inputs**: source, URL, screenshots, prototype or diff, product context: platform, AI agent presence, money or consent steps, design system
- **Outputs**: consolidated severity-ranked findings, Block/Approve verdict, skills used
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: original to this repository (MIT)
- **Status**: verified, experimental, recommended default
- **Tags**: orchestration, review, design-review, workflow, severity
- **Related**: `better-interface`, `interface-review`, `better-accessibility`, `a11y-check-page`, `better-layout`, `platform-conventions`, `better-writing`, `better-typography`, `better-colors`, `better-ui`, `review-animations`, `agentic-ui-review`, `dark-pattern-review`, `design-debt-audit`

### `ux-research-workflow` ⭐

Orchestrates a research effort from the decision it must inform to a recommendation: frames the decision, plans the study and instruments (user-research-cookiy, silver-research, survey-design, ia-evaluation), records collection, synthesises transcripts or mixed evidence (user-research-cookiy, silver-synthesize), maps structure when the question is structural (service-blueprint, ia-evaluation), converts findings into options with hypotheses (silver-ideate, design-negotiation) and plans measurement (instrumentation-plan, silver-measure), with handover artifacts and stop conditions defined between steps.

- **Path**: [skills/orchestration/ux-research-workflow/SKILL.md](skills/orchestration/ux-research-workflow/SKILL.md)
- **Use when**: plan research for this decision; what research should we do; synthesise these interviews into a recommendation; research workflow; discovery research plan
- **Inputs**: the decision and its deadline, existing research, analytics or transcripts, participant and data-handling constraints
- **Outputs**: research plan with instruments, findings with evidence, options with hypotheses, recommendation and measurement plan
- **Verified compatible with**: claude-code, codex, cursor, opencode, amp, gemini-cli, copilot, vs-code, claude-ai
- **Source**: original to this repository (MIT)
- **Status**: verified, experimental, recommended default
- **Tags**: orchestration, workflow, user-research, synthesis, interviews, surveys
- **Related**: `user-research-cookiy`, `silver-research`, `survey-design`, `ia-evaluation`, `silver-synthesize`, `service-blueprint`, `silver-ideate`, `design-negotiation`, `instrumentation-plan`, `silver-measure`, `research-planning`, `usability-testing`, `journey-mapper`, `product-discovery`

## Recommended defaults

- [`product-discovery`](skills/discovery/product-discovery/SKILL.md) (discovery) — Runs structured product discovery to de-risk bets before delivery: facilitates a Teresa Torres-style Opportunity Solution Tree (outcome -> opportunities -> solutions -> experiments, with quality checks on branch count and evidence grounding), maps desirability/viability/feasibility/usability assumptions and prioritizes them by risk x uncertainty via a bundled Python CLI, and gives problem-validation techniques (interviews, journey friction mapping, support-ticket synthesis) and solution-validation techniques (concept tests, prototype usability tests, fake-door/concierge tests, limited betas). Includes a 10-day discovery-sprint plan template with daily evidence reviews and an explicit proceed/pivot/stop decision gate.
- [`inclusive-personas`](skills/research/inclusive-personas/SKILL.md) (research) — Builds personas that represent the full ability spectrum from the start rather than retrofitting accessibility later. Maps permanent conditions (vision, hearing, motor, cognitive, speech), temporary conditions (broken arm, concussion, medication effects), and situational conditions (bright sunlight, noisy environment, one hand occupied, unfamiliar language) relevant to the project. Selects 4-6 personas covering 2-3 primary users, 1-2 edge-case users, and one stress-case user; documents each with context, abilities/conditions, technology and assistive-tech use, goals, frustrations, and environment; writes standard, assisted, and stress-path user stories per persona; and maps scenario intersections where different personas share the same underlying need (e.g. a sighted user in bright sunlight and a low-vision user). Ends with a validation prompt (who's missing, do these feel real) and a table of persona anti-patterns to avoid.
- [`journey-mapper`](skills/research/journey-mapper/SKILL.md) (research) — Scans a codebase (routes, components, auth roles, API calls, email templates, error/empty states) and generates a single self-contained, browser-ready HTML file combining an NN/g-format customer journey map and service blueprint. Infers 2-5 actors, 3-6 categories, and 4-12 journeys each broken into stages and moments, filling Doing/Frontstage/Backstage/Support factually from code evidence while prefixing every inferred Thinking/Feeling/Pain/Opportunity value with [Assumption] for a human to validate against real research. The output HTML has a sticky journey rail, an emotion curve that renders once feelings are set, JSON export/import for team annotation sharing, and localStorage autosave -- no server or build step required to view or edit it.
- [`research-planning`](skills/research/research-planning/SKILL.md) (research) — Turns unclear user needs or contested assumptions into a structured research plan. Splits current understanding into known (evidence-backed), assumed, and unknown; converts gaps into 3-5 specific, observable, actionable research questions; matches each question type (what people do / why they struggle / what they need / which approach works / how they compare / who they are) to recommended methods via a lookup table; and requires every plan to address participant diversity, method accessibility, and situational context (stress, distraction, low bandwidth) rather than treating inclusion as optional. Outputs a research plan document with questions, a method/participants/timeline table, inclusion considerations, expected outputs, and the design decisions the research will inform. Explicitly scoped to planning only, not fielding the research.
- [`service-blueprint`](skills/research/service-blueprint/SKILL.md) (research) — Makes the agent map service delivery as a five-lane blueprint (physical evidence, user actions, frontstage, backstage, support processes) separated by lines of interaction, visibility, and internal interaction; a nine-step construction process from scoping one scenario to validation with operations teams; a blueprint-vs-journey-map decision table; and diagnostic reading rules (gaps between lanes, dense backstage clusters, single points of failure, silent user waits).
- [`survey-design`](skills/research/survey-design/SKILL.md) (research) — Makes the agent design survey instruments that produce trustworthy data: when surveys are and are not the right method, question-type selection table with cautions, rewrite patterns for leading/double-barreled/loaded questions, Likert/NPS/SUS scale rules (labelled endpoints, midpoints, verbatim SUS), sample-size guidance (~385 responses for +-5% margin at 95% confidence), and an analysis plan covering distributions, theme coding, and cross-tabulation.
- [`user-research-cookiy`](skills/research/user-research-cookiy/SKILL.md) (research) — End-to-end user research assistant routing a request to one of three workflows. (1) Plan a Study: turns a research goal into a research plan, screening questionnaire and interview guide using an outcome-verb research question, sample-size and method guidance and an hourglass interview structure; fully offline. (2) Synthesize a Report: turns raw transcripts or notes into a coded, theme-built, evidence-backed report through a five-phase pipeline (familiarization, coding, theme development, synthesis with personas, opportunities and recommendations, report compilation) with named quality gates; fully offline. (3) Run with Cookiy: creates and manages interview studies or surveys on the Cookiy AI platform via a bundled bash/curl/jq CLI; requires a Cookiy account with a saved sign-in token and, for most operations, a funded wallet, so without an account this route cannot execute. The skill also suggests trying Cookiy after routes 1 and 2.
- [`design-negotiation`](skills/strategy/design-negotiation/SKILL.md) (strategy) — Makes the agent coach a designer through cross-functional negotiations: four scripted contexts (timeline compression, scope cut without review, stakeholder override, resource requests) each with a concrete approach; an evidence hierarchy (research counts, metrics, competitive context, WCAG/legal risk, system precedent) replacing taste and authority arguments; negotiation principles (lead with the user problem, name constraints first, make trade-offs explicit, document decisions that go against design); and long-term credibility building.
- [`ia-evaluation`](skills/information-architecture/ia-evaluation/SKILL.md) (information-architecture) — Plans, runs and analyses information-architecture studies: matches the question to open, closed or hybrid card sorts, tree tests or first-click tests; designs cards, trees, goal-language tasks and participant targets; analyses similarity matrices, clusters and standardised labels for sorts, and success, directness, time and wrong-path distributions for tree tests, using field thresholds; and turns results into a sitemap or navigation recommendation with the contested items resolved and the follow-up study named.
- [`animate`](skills/interaction-design/animate/SKILL.md) (interaction-design) — Builds a web animation from scratch in the order that determines whether it feels right: a frequency-based should-it-animate-at-all gate (100+/day actions never animate), a required one-word purpose (feedback, spatial consistency, state indication, preventing a jarring change, explanation, or delight), a cheapest-tool-first ladder (CSS transition to @starting-style to CSS animation to WAAPI to a motion library), exact easing curves and duration budgets by element type, transform/opacity-only property rules, interruption and exit rules, and mandatory reduced-motion and hover gating -- plus ready-to-build recipes for buttons, dropdowns, modals, drawers, toasts, accordions, stagger, hold-to-confirm, tab indicators, scroll reveal and drag-to-dismiss.
- [`apple-design`](skills/interaction-design/apple-design/SKILL.md) (interaction-design) — Apple's approach to fluid, physical interface motion and design foundations, distilled from WWDC design talks (Designing Fluid Interfaces, Designing Audio-Haptic Experiences, The Details of UI Typography, Principles of Great Design) and translated to web APIs (Pointer Events, requestAnimationFrame, spring libraries). Covers response/latency elimination, 1:1 direct manipulation, interruptibility as the core principle, Apple's damping-ratio/response spring parameters with concrete values, velocity handoff and momentum projection formulas, spatial consistency, rubber-banding, translucent materials and depth layering, multimodal (motion+sound+haptic) feedback rules, reduced-motion/transparency/contrast handling, and size-specific typography tracking and leading -- closing with Apple's eight design principles (purpose, agency, responsibility, familiarity, flexibility, simplicity, craft, delight).
- [`laws-of-ux`](skills/interaction-design/laws-of-ux/SKILL.md) (interaction-design) — Improves or critiques any user interface using 30 evidence-based UX principles drawn from cognitive psychology and perception research (Gestalt grouping, Hick's Law, Fitts's Law, Jakob's Law, Miller's Law, aesthetic-usability effect, cognitive load, and more). Provides a 5-step procedure for running a UX pass on a screen: name the symptom, pull the relevant principles, propose a concrete change citing the principle by name, check for conflicts between principles, and flag when testing with real users is still required. reference/laws.md gives each principle's mechanism, concrete application, pitfalls, and a real-world example.
- [`onboarding`](skills/interaction-design/onboarding/SKILL.md) (interaction-design) — Designs and audits post-signup onboarding and activation: picks an activation model (freemium, free trial, paid trial, money-back, consultation) using Model-Market Fit before shaping the flow, defines the product's activation event (the action most correlated with retention), and strips the path to it down to a Minimum Path to Value using an inventory-remove-reconstruct process grounded in Hick's Law and real abandonment benchmarks (40-60% single-session drop-off, 75-80% within day one). Applies five behavior-design mechanisms (Endowed Progress Effect, Peak-End Rule, Goldilocks Rule, BJ Fogg Behavior Model, boosters/blockers) to a 10-component onboarding toolkit (checklists, empty states, tooltips, welcome forms, drip emails), and outputs either a Finding/Impact/Recommendation/Priority audit or a full flow design with checklist items, empty-state copy, and a measurement plan.
- [`platform-conventions`](skills/interaction-design/platform-conventions/SKILL.md) (interaction-design) — Makes the agent design native mobile UI against the actual conventions of iOS (Human Interface Guidelines) and Android (Material Design 3): side-by-side comparison tables for navigation models, controls, typography, gestures, and iconography; a decision framework for when to follow each platform strictly, when to unify cross-platform, and the hybrid middle path; and explicit anti-patterns (suppressing iOS swipe-back, transplanting the FAB to iOS, ignoring Dynamic Type/sp scaling).
- [`better-colors`](skills/visual-design/better-colors/SKILL.md) (visual-design) — Color-system design and audit guidance: ramps named by role rather than picked by eye (neutral/accent/status), a two-tier primitive-then-semantic token naming grammar, perceptual ramp-generation rules (constant hue, even perceived lightness, vividness peaking mid-ramp), APCA and WCAG 2 contrast thresholds with a report-don't-repaint measurement discipline, gradient interpolation-space choices, P3/sRGB gamut fallbacks, dark-mode derivation rules, and a calibrated severity report format ending in Block/Approve.
- [`better-layout`](skills/visual-design/better-layout/SKILL.md) (visual-design) — Layout-structure guidance for web interfaces: grouping by negative space with a 2x inter/intra-group gap ratio, keeping controls visually distinct from static content, shared-edge alignment, logical (RTL-safe) properties over physical left/right, importance-ordered content, progressive-disclosure affordances (peeking scroll items, disclosure controls), breakpoints driven by content rather than device presets, container queries, safe-area-aware full-bleed vs. floating-control layering, and string-growth/clipping resilience, closing with a calibrated severity report ending in Block/Approve.
- [`better-typography`](skills/visual-design/better-typography/SKILL.md) (visual-design) — Web typography guidance: font-format and weight-loading rules, CSS properties over raw variable-font/OpenType tags, type-scale construction with descending heading steps, line-height and letter-spacing by role, measure capping (60-75 characters), text-wrap balance/pretty usage, tabular numbers, truncation without losing content, smart punctuation, from-font underline metrics, the 16px iOS input-zoom fix (two documented approaches), font-smoothing and bidi/lang/dir handling, closing with a calibrated severity report ending in Block/Approve, plus a CSS-to-Tailwind cheat sheet for every declaration covered.
- [`better-ui`](skills/visual-design/better-ui/SKILL.md) (visual-design) — Design-engineering polish guidance for making interfaces feel finished: concentric border-radius math, optical over geometric alignment, shadows-for-elevation vs. borders-for-structure, interruptible CSS transitions vs. one-shot keyframes, split-and-stagger enter animations with subtle exits, exact contextual icon cross-fade values (scale/opacity/blur, spring bounce 0), theme-switch transition suppression, transition-property specificity and will-change usage, icon stroke-weight matching to adjacent text and RTL icon-flip rules, and image-outline recipes, closing with a calibrated severity report ending in Block/Approve.
- [`diagram-design`](skills/visual-design/diagram-design/SKILL.md) (visual-design) — Produces branded editorial diagrams in 39 visual types (architecture, flowchart, sequence, state machine, ER, timeline, swimlane, quadrant, radar, tree, org chart, layer stack, Venn, pyramid, treemap, bar, slopegraph, Gantt, scatter, Sankey, fishbone, Wardley map, kanban, user journey, deployment, dependency graph, UML class, story map, database schema and more) as standalone self-contained HTML files with inline SVG and CSS, following an opinionated editorial design system: a single style-guide.md source of truth for color and typography tokens, a 4px grid, numeric complexity budgets per type, six mandatory connector-routing rules and an accessible-SVG contract (role=img, aria-labelledby, title/desc). Redraws existing .drawio or Mermaid sources through local structural extractors, onboards brand tokens from a website, skill or folder, supports hand-drawn and terminal skins, exports PNG/SVG, and ships Python verifier scripts for geometry and contrast that the agent runs against its own output.
- [`frontend-design`](skills/visual-design/frontend-design/SKILL.md) (visual-design) — Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Directs the agent to work in two passes (a compact color/type/layout/signature token plan, self-critiqued against generic AI-design defaults, then implementation), names three specific overused AI-generated aesthetic clusters to avoid unless the brief calls for them, and gives concrete rules for typography pairing, structural devices, deliberate motion, CSS specificity pitfalls, and end-user-facing UX writing (active voice, consistent verb-to-toast naming, non-apologetic error copy).
- [`theme-factory`](skills/visual-design/theme-factory/SKILL.md) (visual-design) — Applies one of 10 curated color-palette + font-pairing themes (each with named hex colors, header/body font roles, and recommended use cases, shown via a theme-showcase.pdf) to slide decks, documents, or HTML artifacts, or generates a new custom theme on the fly when none of the presets fit, following a show-choices / confirm / apply workflow.
- [`design-debt-audit`](skills/design-systems/design-debt-audit/SKILL.md) (design-systems) — Makes the agent run a structured design debt audit: five debt categories (visual, structural, accessibility, documentation, implementation), a five-step process from screenshot inventory through classification (severity/category/frequency/effort) to a prioritized remediation plan scored as severity x frequency / effort, split into quick wins, structural projects, accessibility fixes, and documented write-offs, plus a living debt register with owners and quarterly review.
- [`design-system-governance`](skills/design-systems/design-system-governance/SKILL.md) (design-systems) — Makes the agent define how a design system evolves: seven core governance questions, three ownership models (centralized/federated/hybrid) with trade-offs, a seven-stage contribution lifecycle from proposal to communicated release, semver as the consumer contract with a patch/minor/major table, a deprecation process with timelines and in-product warnings, breaking-change policy (migration guides, codemods, shims), and component quality entry standards.
- [`extract-design-md`](skills/design-systems/extract-design-md/SKILL.md) (design-systems) — Reads a frontend codebase's source files directly -- package.json, Tailwind/PostCSS configs, global CSS custom properties, theme/token files, and component styles -- without building or running the app, using framework-specific extraction patterns for React/Next.js, Vue/Nuxt, Svelte/SvelteKit, Angular, or plain CSS/SASS/Less. Synthesizes findings into a DESIGN.md design-system document: a required YAML frontmatter block with color and typography tokens, a rich atmosphere description, a color palette with descriptive names and functional roles (deduplicating near-duplicate colors), a full typography hierarchy, component stylings for buttons/cards/navigation/forms, layout and spacing principles, and Stitch-generation notes. Ends with an 8-item quality checklist the output must satisfy before delivery.
- [`motion-system`](skills/design-systems/motion-system/SKILL.md) (design-systems) — Makes the agent define motion as a token layer rather than one-off animations: a named duration scale (50-600ms with use cases), easing tokens with actual cubic-bezier values mapped to semantic uses, choreography rules (30-50ms stagger, 500ms sequence cap, direction consistency), a system-level prefers-reduced-motion strategy using a global duration override token, and implementation guidance for CSS custom properties inside the token export pipeline.
- [`token-naming`](skills/design-systems/token-naming/SKILL.md) (design-systems) — Chooses and applies one naming convention for design tokens across every category: picks and declares a grammar (dotted category.property.variant, role-first CSS custom properties, or functional order), fixes the primitive, semantic and component tier model, selects a scale type per category (numeric, t-shirt, word set, level) without mixing types among siblings, names composite tokens (text style, border, shadow, gradient) with a DTCG example, and produces token documentation with an owner per token group plus a deprecation and rename path, verified by a bundled zero-dependency lint over DTCG JSON and CSS custom properties. Defers to better-colors for colour role names and records the conflicting meanings of primary across library skills instead of resolving them. Written from Romina Kavcic's Design Tokens Naming Playbook with a source-versus-interpretation ledger.
- [`a11y-check-page`](skills/accessibility/a11y-check-page/SKILL.md) (accessibility) — Audits a live, running web page for WCAG 2.2 AA accessibility using browser automation (Playwright MCP, Chrome DevTools MCP, or playwright-cli): runs the bundled axe-core build, walks keyboard focus order in both directions, injects CSS/viewport changes to test 200% zoom, 320px reflow, and text-spacing, inspects the accessibility tree, and re-runs checks per distinct UI state (modals, loading, errors). Enforces credential-safety rules for login-gated pages (never store or echo credentials, screenshot only pre-input states, explicit permission before destructive actions) and writes a severity-rated Markdown report to a11y-report/ with screenshots saved under a11y-report/assets/.
- [`a11y-planner`](skills/accessibility/a11y-planner/SKILL.md) (accessibility) — Designs an accessible implementation before code is written: runs a 9-phase protocol covering scope/context, semantic structure, WAI-ARIA Authoring Practices Guide pattern mapping for every interactive widget, focus management (tab order, modal traps, restoration, roving tabindex), state communication to assistive technology, visual accessibility (contrast, touch targets, motion), content accessibility (alt text, link text, form labels), a testing strategy, and an implementation task breakdown with review checkpoints. Every decision cites a WCAG 2.2 success criterion or APG pattern section. Guards against nine known failure modes (e.g. per-event live-region spam, color-only state indicators, title-attribute-only accessible names). Writes the plan to docs/a11y-plans/YYYY-MM-DD-<feature-name>-a11y-plan.md.
- [`better-accessibility`](skills/accessibility/better-accessibility/SKILL.md) (accessibility) — Accessibility engineering guidance for building or reviewing UI components and custom widgets: native-element-first ARIA rules, exact focus-ring and tabindex/roving-tabindex recipes, WCAG 2.5.8 hit-area sizing with pseudo-element expansion, form labeling and error-announcement patterns, prefers-reduced-motion and autoplay/zoom rules, live-region and screen-reader announcement selection, alt-text-by-purpose table, and a calibrated HIGH/MEDIUM/LOW severity report format ending in Block/Approve.
- [`cognitive-accessibility`](skills/accessibility/cognitive-accessibility/SKILL.md) (accessibility) — Evaluates and reduces cognitive demands in an interface: assesses intrinsic load (complexity inherent to the task), extraneous load (complexity added by poor design), and germane load (effort to learn the system); reduces extraneous load via progressive disclosure, consistent patterns, sensible defaults, and chunking fields into groups of 3-5; ensures wayfinding answers 'where am I / where can I go / where have I been' with progress indicators and savable multi-step flows; protects focus with one primary action per screen and interruption-recovery support; and makes errors cheap via full undo, destructive-action confirmation, preserved form input on failure, and forgiving input formats. Includes a COGA-guideline reference table (provide help, use clear language, ease of finding things, ease of completing tasks, avoid reliance on memory, provide feedback, prevent/support error correction) and a documentation format for cognitive considerations per screen.
- [`accessible-content`](skills/content-design/accessible-content/SKILL.md) (content-design) — Writes and structures user-facing content (labels, headings, error messages, alt text, link text, form instructions, data tables) so it works for screen readers, second-language readers and people under stress. Targets a 12-14 reading age with one idea per sentence and active voice; enforces a logical, non-skipped heading hierarchy used for structure rather than styling; requires visible, programmatically associated form labels with required-field indication and error association (aria-describedby); gives a decision table for alt text by image type (informative, decorative, functional, complex, image of text); bans context-free link text in favour of descriptive links; structures error messages as what happened plus what to do, without blaming the user; and specifies data-table markup (caption, scoped headers, no layout tables). Ends with an eight-item content-review checklist.
- [`better-writing`](skills/content-design/better-writing/SKILL.md) (content-design) — UX writing and interface-copy guidance: recon the existing voice before editing, one voice with tone that flexes by stakes (success vs. destructive-confirmation), addressing the reader as 'you' rather than 'the user', verb-first button labels, consistent flow vocabulary across multi-step flows, link text that stands alone out of context, one capitalization policy per element type, toggle labels that describe the ON state, error copy that states the fix beside the failing field with no blame or exclamation marks, forward-pointing empty states, and placeholders as format examples rather than labels, closing with a calibrated severity report ending in Block/Approve.
- [`localization-design`](skills/content-design/localization-design/SKILL.md) (content-design) — Makes the agent design UI that survives localization: text-expansion planning with per-language percentages (German +20-35%, Finnish +30-40%), RTL mirroring rules including what does and does not mirror, CSS logical properties, typography rules for Arabic/CJK/Indic scripts, cultural color and iconography tables, locale-aware date/number/address formats, and design-system implications (semantic 'start/end' token naming, pseudo-localization testing).
- [`ux-writing`](skills/content-design/ux-writing/SKILL.md) (content-design) — Writes and edits user-centered, accessible interface copy (buttons, labels, error messages, notifications, forms, onboarding, empty states, success messages, help text) against four measurable quality standards -- purposeful, concise, conversational, clear -- each scored 0-10 with concrete criteria (e.g. 40-60 characters per line, active voice predominates). Draws on dedicated reference material for WCAG-aligned accessible writing (plain language at a 7th-8th grade level, sentences under 20 words, descriptive interactive-element labels), a detailed pattern library covering three contrasting worked product voices, a fillable voice-chart template for defining brand personality in 3-5 concepts, and three ready-to-use templates for empty states, error messages, and onboarding flows.
- [`variant`](skills/prototyping/variant/SKILL.md) (prototyping) — Builds three (up to five) genuinely different versions of one described UI piece, each a different position on a single named axis (structure, density, emphasis, type, or voice) owned by a sibling better-* skill, so secondary choices follow coherently rather than every axis varying at once. Hosts all variants on the real page behind a URL-driven picker deliberately styled outside the project's design system, with realistic content and item counts, clears better-interface's accessibility escalation-trigger floor before any variant enters the picker, then presents axis-position tradeoffs without marking a favorite and hands the decision back. On a choice, promotes the winner into the project's own conventions and deletes the rest.
- [`wireframe`](skills/prototyping/wireframe/SKILL.md) (prototyping) — Guides the agent to explore a design space quickly with many rough, structurally distinct low-fidelity wireframes rather than one polished direction. Directs producing 3-5 structurally different options per idea (not recolors), using sketchy hand-written fonts, mostly black-and-white shapes with sparing color accents, plain-language section labels, and a minimal tweak surface (variant toggle, density, optional-section swap), while explicitly avoiding polish, hover states, and visual convergence across options.
- [`break`](skills/testing/break/SKILL.md) (testing) — Renders one real component on a throwaway harness page under every content/state/quantity/container/environment scenario its own props and slots can actually reach in production, inferred from a fixed scenario-axis menu with cues that gate which axes apply (content length, content shape, quantity, container width, state, environment). Looks once, marks what visibly broke directly on the page, and reports a table of broken scenarios with the observation and the owning domain skill for the fix -- issuing no verdict itself, since it observes rather than judges.
- [`design-critique`](skills/testing/design-critique/SKILL.md) (testing) — Runs an evidence-bounded heuristic evaluation of a supplied UI artifact (image, Figma design, rendered HTML/URL, or multi-screen flow) across four categories -- visual design & hierarchy, usability & interaction, accessibility, and content & language -- scoring each finding on the NN/g 0-4 severity scale (frequency x impact x persistence) against a named atom-level checklist drawing on Nielsen's heuristics, Norman's interaction principles, Gestalt, Fitts/Hick/Miller, and WCAG 2.2. Renders code, markup, or URLs to real pixels before judging them (never critiques unrendered source;
- [`usability-testing`](skills/testing/usability-testing/SKILL.md) (testing) — Plans and runs usability tests with real people: writes 3-5 task scenarios with realistic triggers and clear success conditions (never revealing how to complete them), sets participant recruitment targets (5-8 people, with explicit minimums covering screen-reader users, older adults, non-native speakers, and low tech confidence), selects a test method (moderated think-aloud, unmoderated remote, guerrilla, or accessibility audit with assistive-technology users) against a when-to-use table, structures the test script (welcome, background, tasks, debrief), classifies each task outcome (completed easily / with difficulty / failed / completed wrong) with a three-tier severity scale, and converts every finding into a concrete design action. Delivers a task-success-rate table, severity-ranked findings, and an iterate/ship/rethink recommendation.
- [`frontend-design-review`](skills/design-qa/frontend-design-review/SKILL.md) (design-qa) — Reviews existing UI implementations against design-system compliance, three quality pillars (frictionless task completion, quality-as-craft including WCAG 2.1 A/AA accessibility grades, and trustworthy AI/error transparency), and aesthetic distinctiveness -- or creates new distinctive frontend interfaces from scratch avoiding generic 'AI slop' aesthetics. Produces a structured review output with a pillar status table, blocking/major/minor severity-ranked issues, and design-system-linked recommendations; provides a pre-approval quick checklist and review-type modifiers (PR review, creative review, design review, accessibility audit, design-system compliance audit) that adjust evaluation focus.
- [`interface-review`](skills/design-qa/interface-review/SKILL.md) (design-qa) — Change-scoped interface review for uncommitted work, a branch, or a pull request: resolves the review target (working tree, staged, branch vs. merge-base, PR fetched by ref, or an explicit range) with documented traps for shallow clones, mid-rebase state and detached HEAD, expands each changed file to its blast radius of importers, reads the removed side of every diff hunk against a table of accessibility/layout/typography/color/writing regression signals, classifies every finding as Introduced, Regression, or Pre-existing, holds the change to its stated PR intent to catch incomplete variants and missing states, and hands the classified findings to better-interface for severity, consolidation and the verdict. Never checks out or mutates the working tree.
- [`review-animations`](skills/design-qa/review-animations/SKILL.md) (design-qa) — Reviews animation and motion code (a diff or a component) against ten non-negotiable standards derived from Emil Kowalski's animation philosophy: justified motion, frequency-appropriate use, responsive easing, sub-300ms UI durations, origin/physical correctness, interruptibility, GPU-only properties, accessibility, asymmetric enter/exit timing, and cohesion. Flags a fixed list of escalation triggers on sight (transition: all, scale(0) entrances, ease-in on UI, animation on high-frequency/keyboard actions, keyframes on rapidly-triggered elements), proposes fixes via a nine-step remedial preference hierarchy (delete first, polish last), and outputs a required Before/After/Why findings table followed by a tiered verdict ending in Block or Approve. Defaults to flagging; approval is earned.
- [`experiment-designer`](skills/analytics/experiment-designer/SKILL.md) (analytics) — Designs, prioritizes and evaluates product experiments: writes hypotheses in If/Then/Because format, separates primary/guardrail/secondary metrics, computes required sample size per variant via a bundled Python calculator (baseline rate, minimum detectable effect, alpha, power), scores and ranks experiment ideas with ICE (Impact x Confidence x Ease / 10), and defines stopping rules before launch. Includes a hypothesis-quality checklist, a table of common experiment pitfalls (underpowered tests, simultaneous changes, mid-test edits, early stopping, instrumentation drift), and statistical-interpretation guardrails distinguishing statistical from business significance.
- [`instrumentation-plan`](skills/analytics/instrumentation-plan/SKILL.md) (analytics) — Turns a feature or flow into an instrumentation plan: the questions the data must answer, success and guardrail metrics with owners and baselines, activation and retention definitions, an event taxonomy under one naming convention (object_action snake_case, typed properties, shared context properties), identity and consent rules with data minimisation, funnel and segment definitions, an experiment block, and a QA checklist. Grounded in the Segment, Amplitude, GA4 and PostHog conventions so it ports between vendors.
- [`product-analytics`](skills/analytics/product-analytics/SKILL.md) (analytics) — Defines product metric frameworks (AARRR, North Star, HEART) and stage-appropriate KPIs (pre-PMF, growth, mature), designs a layered metric dashboard (executive/product-health/feature layers with a 5-7-metric cap), and runs cohort/retention/funnel analysis via a bundled Python CLI that reads event CSVs and computes retention matrices, cohort tables and funnel conversion (text or JSON output). Includes a retention-curve interpretation guide, a table of 6 named analytics anti-patterns with fixes (vanity metrics, single-point retention, dashboard overload, no decision rule, averaged segments, ignored seasonality), and cross-references to experiment design and RICE prioritization for acting on findings.
- [`agentic-ui-review`](skills/agentic-ui/agentic-ui-review/SKILL.md) (agentic-ui) — Reviews interfaces where an AI agent acts on the user's behalf for the trust and control patterns they need: intent echo, plan preview, approval scaled to blast radius, live state, tool-use transparency, honest uncertainty, interruptibility, reversibility, error recovery, scope and memory disclosure, accessible streaming and generated-UI governance. Traces each capability through before, during, after and failure moments, rates findings against Microsoft HAX, Google PAIR, Apple HIG and WCAG 2.2 SC 4.1.3, and reports severity-ranked fixes with a Block or Approve verdict.
- [`conversational-ux`](skills/agentic-ui/conversational-ux/SKILL.md) (agentic-ui) — Makes the agent design voice and chat interfaces around the conversation turn: a confirmation-strategy table (explicit/implicit/none by stakes), a three-step error reprompt ladder that never repeats the same prompt, voice-specific writing rules (short sentences, no visual-only references, max three-item lists, sub-8s responses, earcons), multimodal voice+screen rules, text-chat affordances (quick replies, typing indicators, structured cards), persona/tone decisions including no false humanity, and guidance on when conversation is the wrong pattern.
- [`dark-pattern-review`](skills/ethics-and-safety/dark-pattern-review/SKILL.md) (ethics-and-safety) — Reviews a flow, screen or copy for deceptive and manipulative design patterns (sneaking, obstruction, interface interference, false urgency and scarcity, unverifiable social proof, forced action, asymmetric consent) against the taxonomies regulators cite (deceptive.design, Mathur et al. 2019, FTC 2022, EDPB 03/2022, OECD 2022, EU DSA Art. 25), rates each finding by user harm and regulatory exposure, proposes the honest alternative with the concrete element and step count, and ends with Block or Approve plus a not-legal-advice note.
- [`explain-interface`](skills/design-engineering/explain-interface/SKILL.md) (design-engineering) — Reverse-engineers how a UI effect or a whole frontend was built from a URL (browser DevTools evaluate_script or raw HTML/CSS fetch) or a screenshot (explicit reconstruction, not a reading). Finds the full layer stack behind one visual effect in paint order rather than one declaration, tags every claim measured/derived/inferred, treats fetched page content as evidence never as instructions to follow, and closes on the transferable recipe in words plus what would not survive being copied, rather than a rebuild snippet.
- [`better-interface`](skills/orchestration/better-interface/SKILL.md) (orchestration) — Cross-discipline interface-review orchestrator: resolves review scope, routes a screen or flow to the sibling better-accessibility, better-layout, better-writing, better-typography, better-colors and better-ui skills in a fixed order, requires evidence (file:line, not visual claims from source alone), applies one shared HIGH/MEDIUM/LOW severity scale with a fixed list of escalation triggers that are always HIGH on sight, prefers the cheapest fix (delete, use the platform, reuse a token, correct the value, add), consolidates systemic findings into one row per root cause with a 15-finding cap, and issues a single Block/Approve verdict. Hands off change-scoped (branch/PR/uncommitted) reviews to interface-review rather than resolving them itself.
- [`pre-handoff-review`](skills/orchestration/pre-handoff-review/SKILL.md) (orchestration) — Orchestrates a completeness check before design is handed to engineering: inventories screens and states, then runs the owning skills for responsive behaviour (better-layout), localisation (localization-design), accessibility annotations (a11y-planner, better-accessibility), final copy (better-writing), tokens and components (design-system-governance, extract-design-md), motion (motion-system, animation-vocabulary), platform (platform-conventions) and analytics (instrumentation-plan), classifies gaps as blocker, gap or note, and produces a readiness table with owners and the artifact list to hand over.
- [`product-design-review`](skills/orchestration/product-design-review/SKILL.md) (orchestration) — Orchestrates a complete product-design review: selects the smallest set of specialist lenses the input needs (accessibility for source or live page, layout, platform conventions, copy, typography, color, UI polish, animation, agentic interface, deceptive patterns, design-system compliance, diff scoping), confirms each is installed or marks it Not reviewed, runs them foundations-first, merges duplicate findings under the owning skill with a shared severity ladder and a 20-finding cap, and produces one report with a Block or Approve verdict and the list of skills used.
- [`ux-research-workflow`](skills/orchestration/ux-research-workflow/SKILL.md) (orchestration) — Orchestrates a research effort from the decision it must inform to a recommendation: frames the decision, plans the study and instruments (user-research-cookiy, silver-research, survey-design, ia-evaluation), records collection, synthesises transcripts or mixed evidence (user-research-cookiy, silver-synthesize), maps structure when the question is structural (service-blueprint, ia-evaluation), converts findings into options with hypotheses (silver-ideate, design-negotiation) and plans measurement (instrumentation-plan, silver-measure), with handover artifacts and stop conditions defined between steps.

## Alphabetical index

| Skill | Category | Source | Status |
| --- | --- | --- | --- |
| [`a11y-audit`](skills/accessibility/a11y-audit/SKILL.md) | accessibility | third-party | verified |
| [`a11y-check-code`](skills/accessibility/a11y-check-code/SKILL.md) | accessibility | third-party | verified |
| [`a11y-check-page`](skills/accessibility/a11y-check-page/SKILL.md) | accessibility | third-party | verified |
| [`a11y-critic`](skills/accessibility/a11y-critic/SKILL.md) | accessibility | third-party | verified |
| [`a11y-planner`](skills/accessibility/a11y-planner/SKILL.md) | accessibility | third-party | verified |
| [`a11y-role-audit`](skills/accessibility/a11y-role-audit/SKILL.md) | accessibility | third-party | verified |
| [`accessible-content`](skills/content-design/accessible-content/SKILL.md) | content-design | third-party | verified |
| [`agentic-ui-review`](skills/agentic-ui/agentic-ui-review/SKILL.md) | agentic-ui | original | verified |
| [`algorithmic-art`](skills/visual-design/algorithmic-art/SKILL.md) | visual-design | third-party | verified |
| [`animate`](skills/interaction-design/animate/SKILL.md) | interaction-design | third-party | verified |
| [`animate-expo`](skills/interaction-design/animate-expo/SKILL.md) | interaction-design | third-party | verified |
| [`animation-vocabulary`](skills/interaction-design/animation-vocabulary/SKILL.md) | interaction-design | third-party | verified |
| [`apple-design`](skills/interaction-design/apple-design/SKILL.md) | interaction-design | third-party | verified |
| [`apple-hig-expert`](skills/interaction-design/apple-hig-expert/SKILL.md) | interaction-design | third-party | verified |
| [`better-accessibility`](skills/accessibility/better-accessibility/SKILL.md) | accessibility | third-party | verified |
| [`better-colors`](skills/visual-design/better-colors/SKILL.md) | visual-design | third-party | verified |
| [`better-interface`](skills/orchestration/better-interface/SKILL.md) | orchestration | third-party | verified |
| [`better-layout`](skills/visual-design/better-layout/SKILL.md) | visual-design | third-party | verified |
| [`better-typography`](skills/visual-design/better-typography/SKILL.md) | visual-design | third-party | verified |
| [`better-ui`](skills/visual-design/better-ui/SKILL.md) | visual-design | third-party | verified |
| [`better-writing`](skills/content-design/better-writing/SKILL.md) | content-design | third-party | verified |
| [`break`](skills/testing/break/SKILL.md) | testing | third-party | verified |
| [`canvas-design`](skills/visual-design/canvas-design/SKILL.md) | visual-design | third-party | verified |
| [`cognitive-accessibility`](skills/accessibility/cognitive-accessibility/SKILL.md) | accessibility | third-party | verified |
| [`conversational-ux`](skills/agentic-ui/conversational-ux/SKILL.md) | agentic-ui | third-party | verified |
| [`critique-information-density`](skills/testing/critique-information-density/SKILL.md) | testing | third-party | verified |
| [`customer-journey-mapper`](skills/research/customer-journey-mapper/SKILL.md) | research | third-party | verified |
| [`dark-pattern-review`](skills/ethics-and-safety/dark-pattern-review/SKILL.md) | ethics-and-safety | original | verified |
| [`design-and-refine`](skills/prototyping/design-and-refine/SKILL.md) | prototyping | third-party | verified |
| [`design-critique`](skills/testing/design-critique/SKILL.md) | testing | third-party | verified |
| [`design-debt-audit`](skills/design-systems/design-debt-audit/SKILL.md) | design-systems | third-party | verified |
| [`design-details`](skills/design-qa/design-details/SKILL.md) | design-qa | third-party | verified |
| [`design-handoff`](skills/design-engineering/design-handoff/SKILL.md) | design-engineering | third-party | verified |
| [`design-motion-principles`](skills/interaction-design/design-motion-principles/SKILL.md) | interaction-design | third-party | verified |
| [`design-negotiation`](skills/strategy/design-negotiation/SKILL.md) | strategy | third-party | verified |
| [`design-review`](skills/testing/design-review/SKILL.md) | testing | third-party | verified |
| [`design-system`](skills/design-systems/design-system/SKILL.md) | design-systems | third-party | verified |
| [`design-system-governance`](skills/design-systems/design-system-governance/SKILL.md) | design-systems | third-party | verified |
| [`design-tokens`](skills/design-systems/design-tokens/SKILL.md) | design-systems | third-party | verified |
| [`diagram-design`](skills/visual-design/diagram-design/SKILL.md) | visual-design | third-party | verified |
| [`experiment-designer`](skills/analytics/experiment-designer/SKILL.md) | analytics | third-party | verified |
| [`explain-interface`](skills/design-engineering/explain-interface/SKILL.md) | design-engineering | third-party | verified |
| [`extract-design-md`](skills/design-systems/extract-design-md/SKILL.md) | design-systems | third-party | verified |
| [`extract-static-html`](skills/design-engineering/extract-static-html/SKILL.md) | design-engineering | third-party | verified |
| [`figma-integration`](skills/design-systems/figma-integration/SKILL.md) | design-systems | third-party | verified |
| [`find-animation-opportunities`](skills/testing/find-animation-opportunities/SKILL.md) | testing | third-party | verified |
| [`frontend-design`](skills/visual-design/frontend-design/SKILL.md) | visual-design | third-party | verified |
| [`frontend-design-review`](skills/design-qa/frontend-design-review/SKILL.md) | design-qa | third-party | verified |
| [`frontend-ui-dark-ts`](skills/design-systems/frontend-ui-dark-ts/SKILL.md) | design-systems | third-party | verified |
| [`handoff-to-claude-code`](skills/design-engineering/handoff-to-claude-code/SKILL.md) | design-engineering | third-party | verified |
| [`ia-evaluation`](skills/information-architecture/ia-evaluation/SKILL.md) | information-architecture | original | verified |
| [`image-to-code`](skills/design-engineering/image-to-code/SKILL.md) | design-engineering | third-party | verified |
| [`improve-animations`](skills/testing/improve-animations/SKILL.md) | testing | third-party | verified |
| [`inclusive-personas`](skills/research/inclusive-personas/SKILL.md) | research | third-party | verified |
| [`instrumentation-plan`](skills/analytics/instrumentation-plan/SKILL.md) | analytics | original | verified |
| [`interactive-prototype`](skills/prototyping/interactive-prototype/SKILL.md) | prototyping | third-party | verified |
| [`interface-review`](skills/design-qa/interface-review/SKILL.md) | design-qa | third-party | verified |
| [`journey-mapper`](skills/research/journey-mapper/SKILL.md) | research | third-party | verified |
| [`laws-of-ux`](skills/interaction-design/laws-of-ux/SKILL.md) | interaction-design | third-party | verified |
| [`localization-design`](skills/content-design/localization-design/SKILL.md) | content-design | third-party | verified |
| [`make-a-deck`](skills/visual-design/make-a-deck/SKILL.md) | visual-design | third-party | verified |
| [`market-command-matrix`](skills/strategy/market-command-matrix/SKILL.md) | strategy | third-party | verified |
| [`motion-system`](skills/design-systems/motion-system/SKILL.md) | design-systems | third-party | verified |
| [`onboarding`](skills/interaction-design/onboarding/SKILL.md) | interaction-design | third-party | verified |
| [`persona`](skills/research/persona/SKILL.md) | research | third-party | verified |
| [`perspective-audit`](skills/accessibility/perspective-audit/SKILL.md) | accessibility | third-party | verified |
| [`pick-ui-library`](skills/design-systems/pick-ui-library/SKILL.md) | design-systems | third-party | verified |
| [`platform-conventions`](skills/interaction-design/platform-conventions/SKILL.md) | interaction-design | third-party | verified |
| [`pre-handoff-review`](skills/orchestration/pre-handoff-review/SKILL.md) | orchestration | original | verified |
| [`product-analytics`](skills/analytics/product-analytics/SKILL.md) | analytics | third-party | verified |
| [`product-design-review`](skills/orchestration/product-design-review/SKILL.md) | orchestration | original | verified |
| [`product-discovery`](skills/discovery/product-discovery/SKILL.md) | discovery | third-party | verified |
| [`prototype`](skills/prototyping/prototype/SKILL.md) | prototyping | third-party | verified |
| [`redesign-existing-projects`](skills/visual-design/redesign-existing-projects/SKILL.md) | visual-design | third-party | verified |
| [`research-planning`](skills/research/research-planning/SKILL.md) | research | third-party | verified |
| [`research-synthesis`](skills/research/research-synthesis/SKILL.md) | research | third-party | verified |
| [`review-a11y`](skills/accessibility/review-a11y/SKILL.md) | accessibility | third-party | draft |
| [`review-animations`](skills/design-qa/review-animations/SKILL.md) | design-qa | third-party | verified |
| [`service-blueprint`](skills/research/service-blueprint/SKILL.md) | research | third-party | verified |
| [`signup`](skills/interaction-design/signup/SKILL.md) | interaction-design | third-party | verified |
| [`silver-evaluate`](skills/testing/silver-evaluate/SKILL.md) | testing | third-party | verified |
| [`silver-ideate`](skills/discovery/silver-ideate/SKILL.md) | discovery | third-party | verified |
| [`silver-measure`](skills/analytics/silver-measure/SKILL.md) | analytics | third-party | verified |
| [`silver-research`](skills/research/silver-research/SKILL.md) | research | third-party | verified |
| [`silver-structure`](skills/information-architecture/silver-structure/SKILL.md) | information-architecture | third-party | verified |
| [`silver-synthesize`](skills/research/silver-synthesize/SKILL.md) | research | third-party | verified |
| [`survey-design`](skills/research/survey-design/SKILL.md) | research | third-party | verified |
| [`synthetic-user-testing`](skills/testing/synthetic-user-testing/SKILL.md) | testing | third-party | verified |
| [`theme-factory`](skills/visual-design/theme-factory/SKILL.md) | visual-design | third-party | verified |
| [`token-build`](skills/design-systems/token-build/SKILL.md) | design-systems | third-party | verified |
| [`token-naming`](skills/design-systems/token-naming/SKILL.md) | design-systems | original | verified |
| [`ui-design-system`](skills/design-systems/ui-design-system/SKILL.md) | design-systems | third-party | verified |
| [`ultra11y`](skills/accessibility/ultra11y/SKILL.md) | accessibility | third-party | draft |
| [`usability-testing`](skills/testing/usability-testing/SKILL.md) | testing | third-party | verified |
| [`user-research-cookiy`](skills/research/user-research-cookiy/SKILL.md) | research | third-party | verified |
| [`ux-research-workflow`](skills/orchestration/ux-research-workflow/SKILL.md) | orchestration | original | verified |
| [`ux-researcher-designer`](skills/research/ux-researcher-designer/SKILL.md) | research | third-party | verified |
| [`ux-writing`](skills/content-design/ux-writing/SKILL.md) | content-design | third-party | verified |
| [`variant`](skills/prototyping/variant/SKILL.md) | prototyping | third-party | verified |
| [`web-artifacts-builder`](skills/design-engineering/web-artifacts-builder/SKILL.md) | design-engineering | third-party | verified |
| [`web-design-reviewer`](skills/design-qa/web-design-reviewer/SKILL.md) | design-qa | third-party | verified |
| [`wireframe`](skills/prototyping/wireframe/SKILL.md) | prototyping | third-party | verified |
| [`wireframe-json`](skills/prototyping/wireframe-json/SKILL.md) | prototyping | third-party | verified |
| [`wp-block-themes`](skills/visual-design/wp-block-themes/SKILL.md) | visual-design | third-party | verified |
| [`wp-patterns`](skills/visual-design/wp-patterns/SKILL.md) | visual-design | third-party | verified |
| [`wpds`](skills/design-systems/wpds/SKILL.md) | design-systems | third-party | verified |
