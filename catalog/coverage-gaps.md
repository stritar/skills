# Coverage gaps

State of the registry after discovery rounds 1 and 2 (2026-08-26 and
2026-08-29) and one original skill authored on 2026-09-11: 106 skills (98
vendored, 8 original) across all 17 categories. This file lists what is thin, what is missing, and what the passes did not
get to, so the next pass starts from evidence rather than memory. Counts
per category are in `CATALOG.md`.

## Still thin (1-2 skills)

| Category | Have | Gap |
| --- | --- | --- |
| `ethics-and-safety` | `dark-pattern-review` (original) | No privacy-by-design, consent-architecture, youth-safety or sensitive-domain skill. Round 2 found mukul975/Privacy-Data-Protection-Skills (282 compliance skills, Apache-2.0) — not inspected; compliance-heavy. |
| `agentic-ui` | `agentic-ui-review` (original), `conversational-ux` | No generative-UI or AI-product-evaluation skill. felixgeelhaar/skills ai-expert (MIT) and the quarantined uxuiprinciples ai-interface-reviewer are the known candidates. |
| `strategy` | `design-negotiation`, `market-command-matrix` | No JTBD, value-proposition, prioritisation (RICE/Kano) or roadmapping skill. deanpeters/Product-Manager-Skills covers all of these but is CC BY-NC-SA 4.0 (non-commercial: not vendorable); levnikolaevich/claude-code-skills opportunity-evaluator (MIT) not inspected. |
| `discovery` | `product-discovery`, `silver-ideate` | No assumption-mapping or opportunity-solution-tree skill. |
| `information-architecture` | `ia-evaluation` (original), `silver-structure` | No navigation-design or search-UX skill; mariespreitzer/screens-to-ia-figma (MIT, Figma MCP) not inspected. |

## Missing activities across the lifecycle

Still no dedicated skill for: cognitive walkthroughs, visual regression and
cross-browser review, data-visualisation and chart design (itsual's
template was dropped; markdown-viewer/skills `vega` is GPL-3.0 and not
inspected), iconography and illustration guidance, dashboard and table
design as distinct patterns (Vizro's dashboard-design is a keeper), search
UX, empty-state and notification design beyond copy, design decision
records, product principles, inclusive research with disabled participants,
performance as a UX concern.

Closed on 2026-09-11: cross-category token naming (grammar choice, scale
types, composite tokens, token documentation and ownership, token
deprecation) by the original `token-naming`, which also ships a lint for
DTCG JSON and CSS custom properties. Still open inside that topic: a
default list of appearance and opinion words for the semantic tier (the
lint takes one via `--opinion-words`; none ships, to avoid false positives
against names such as `--color-border-subtle`).

## What the passes did not reach

- **Saturation not met by the numeric rule.** Round 2 added 617 unique
  candidates (65% of the cumulative 947), dominated by the authenticated
  code-search long tail of skills kept inside unrelated product
  repositories. List-led discovery (awesome lists, vendor catalogs) has
  converged; code search and the analytics, research-artifact, strategy and
  AI-native families still yield new material. A third round should be
  code-search-led with family-specific terms, and should use the triage
  shortlist (`research/round-2-triage.json`: 155 candidates, 55 strong).
- **Shortlisted but not inspected** (from the triage, highest first):
  foryourhealth111-pixel/vibe-skills ux-researcher-designer,
  majiayu000/claude-skill-registry ux-research-plan,
  recomposesh/recompose ux-writing, mrstev3n/balise-skills ux-writing,
  bonnguyenitc/antigravity-superpowers ux-designer,
  dhananjaym182/ai-ui-design-skills, jewbetcha/opentrace,
  mohitagw15856/pm-claude-skills figma-component-audit,
  nextlevelbuilder/ui-ux-pro-max-skill (122k stars; a CLI-bundled skill
  set), davila7/claude-code-templates accessibility,
  rlaope/oh-my-hermes accessibility-audit, open-mercato figma design
  skill, sickn33/agentic-awesome-skills (analytics-product,
  fixing-accessibility), levnikolaevich opportunity-evaluator,
  felixgeelhaar ai-expert, nickcrew/Claude-Cortex dashboard-designer,
  bergside/design-md-figma, mariespreitzer/screens-to-ia-figma,
  affaan-m/ecc accessibility, and the round-1 leftovers
  (Leonxlnx/taste-skill, alchaincyf/huashu-design, joeseesun/qiaomu-design,
  murphytrueman/design-system-ops, southleft/figma-console-mcp-skills,
  nexu-io/open-design, Uwayxt/agent-skills, garrytan/gstack,
  adobe/spectrum-design-data, xpert-ai/xpert-plugins,
  sergekostenchuk/ui-ux-agent-skill-system, AbadLife/ux-araby,
  accesslint/claude-marketplace, the 30 designpowers and 97
  designer-skills skills not selected, the 7 design-details siblings, the
  4 remaining plugin87 skills).
- **Threads named by the gap-search track but not opened**:
  jahonn/pm-agent-skill, lishix520/jtbd-skills, wdavidturner/product-skills,
  sickn33's AI Product Evaluation Ops plugin, a secondhand "humane agentic
  design" repository.
- **Awaiting license clarification**: `design-auditor`
  (Ashutos1997), `uxuiprinciples/agent-skills` (five skills),
  `figma/mcp-server-guide` (twelve official Figma skills, no license file)
  — see `not-vendored.md`.
- **Re-inspect from the original authors**: `designers-eye` (Chris
  Couriard) and `macos-hig-designer` (soponcd/timeflow-skills), found only
  in an aggregation hub.

## Backlog, prioritised

1. Ask Figma, Ashutos1997 and uxuiprinciples for license files; re-inspect.
2. Inspect the shortlist above in waves of two agents, strategy and
   ethics candidates first (opportunity-evaluator, ai-expert,
   privacy-data-protection subset, screens-to-ia-figma).
3. Consider swapping plugin87's `design-review` for humbleteam's
   (stronger, self-contained) under a collision-rename.
4. Write or vendor cognitive walkthrough, data-visualisation, visual
   regression and decision-record skills.
5. Re-review the ultra11y engine line by line to lift `review-a11y` and
   `ultra11y` from `draft` to `verified`.
6. Run discovery round 3 code-search-led, with per-family term lists and
   authenticated `gh`.
