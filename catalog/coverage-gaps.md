# Coverage gaps

State of the registry after the research pass of 2026-08-26: 70 skills
(63 vendored, 7 original) across all 17 categories. This file lists what is
thin, what is missing, and what the pass did not get to, so the next pass
starts from evidence rather than memory. Counts per category are in
`CATALOG.md`.

## Thin categories (1-2 skills)

| Category | Have | Gap |
| --- | --- | --- |
| `discovery` | `silver-ideate` (framework-coupled, experimental) | No standalone problem-framing, opportunity-mapping or assumption-mapping skill. Round-1 discovery found 10 candidates in this area, none inspected yet (Uwayxt/agent-skills, Owl-Listener's remaining research and strategy skills, xpert-ai). |
| `strategy` | `design-negotiation` | No competitive-analysis, JTBD, value-proposition, prioritisation or roadmapping skill. 6 candidates found, none inspected. |
| `prototyping` | `variant`, `prototype` (both user-invoked variant pickers) | No low-fidelity wireframing or interactive-prototype construction skill. Candidates: Leonxlnx/taste-skill, alchaincyf/huashu-design (wave 4, not run); baoyu-design rejected on provenance. |
| `analytics` | `instrumentation-plan` (original), `silver-measure` | No funnel-analysis or experiment-analysis skill; only 3 candidates were found in the whole pass, all thin. |
| `agentic-ui` | `agentic-ui-review` (original), `conversational-ux` | No generative-UI or AI-evaluation skill; 4 candidates found, 1 vendored. |
| `ethics-and-safety` | `dark-pattern-review` (original) | No privacy-by-design, youth-safety or sensitive-domain skill; 2 candidates found, both weak. |
| `information-architecture` | `ia-evaluation` (original), `silver-structure` | No navigation-design or search-UX skill. |
| `content-design` | `better-writing`, `ux-writing`, `localization-design` | No terminology-system or help-content skill; Arabic UX-writing cluster (AbadLife/ux-araby) found, not inspected. |
| `design-engineering` | `explain-interface`, `extract-static-html`, `web-artifacts-builder` | No design-to-engineering handoff quality or performance-as-UX skill beyond `pre-handoff-review`. |

## Missing activities across the lifecycle

Activities from the brief with no dedicated skill: usability-test planning
and moderation (heuristic evaluation is partly covered by `design-review`
and `laws-of-ux`; cognitive walkthroughs not at all), visual regression and
cross-browser review, journey mapping and personas as standalone artifacts
(`user-research-cookiy` produces personas inside its report), design
decision records, product principles, data-visualisation and chart design,
iconography and illustration guidance, dashboard and table design as
distinct patterns, search UX, onboarding and empty-state design beyond copy,
privacy-aware design and consent architecture (beyond dark patterns),
inclusive research with disabled participants.

## What the pass did not reach

- **Discovery round 2 was not run.** The saturation criteria in
  `research/README.md` were therefore not met. Unopened high-priority leads
  recorded in `research/raw/round-1/*.json`: officialskills.sh (Figma,
  OpenAI, WordPress and Google Labs vendor skills), bergside/awesome-design-
  skills (67 style packs), VoltAgent/awesome-agent-skills,
  ComposioHQ/awesome-claude-skills, travisvn/awesome-claude-skills,
  alirezarezvani/claude-skills, JimLiu/baoyu-skills,
  conductor-oss/awesome-skills, claude-skills/claude-skills-library,
  wondelai/skills, its-thepoe/skills, oneskill/skills, the npm
  `keywords:agent-skills` tail beyond the search API's 1,000-result cap, and
  the SKILL.src.md compile pattern.
- **GitHub code search never ran.** grep.app returned 429 (bot challenge),
  Sourcegraph 403 unauthenticated, and GitHub code search requires login;
  discovery used repository and topic search instead. An authenticated
  `gh` session would unlock `path:SKILL.md` content queries.
- **Candidate repositories found but not inspected** (in priority order):
  Leonxlnx/taste-skill, alchaincyf/huashu-design, joeseesun/qiaomu-design,
  murphytrueman/design-system-ops, southleft/figma-console-mcp-skills
  (planned wave 4, skipped by decision), nexu-io/open-design,
  Uwayxt/agent-skills, garrytan/gstack, adobe/spectrum-design-data,
  xpert-ai/xpert-plugins, sergekostenchuk/ui-ux-agent-skill-system,
  AbadLife/ux-araby, accesslint/claude-marketplace, mariespreitzer/screens-
  to-ia-figma, the 97 Owl-Listener/designer-skills skills not selected, the 7
  GeorgeTurp/design-details sibling skills, the 4 remaining plugin87 skills
  (apply-aesthetic, image-to-code, design-qa, redesign).
- **Awaiting license clarification**: `design-auditor` (see
  `not-vendored.md`).

## Backlog, prioritised

1. Run discovery round 2 from the leads above with authenticated GitHub
   code search; re-run the saturation check.
2. Inspect the skipped wave-4 repositories and the design-details siblings
   (cheap: known licenses, small skills).
3. Fill `discovery` and `strategy` from Owl-Listener's and Uwayxt's
   remaining skills, or write originals for problem framing, JTBD and
   prioritisation if nothing vendorable holds up.
4. Write or vendor usability-test planning, journey mapping and data-
   visualisation skills.
5. Ask the `design-auditor` author for a LICENSE file; re-inspect.
6. Re-review the ultra11y engine line by line to lift `review-a11y` and
   `ultra11y` from `draft` to `verified`.
