---
name: pre-handoff-review
description: Checks that a design is complete enough to hand to engineering by running the specialist skills that own each part of a specification - states and edge cases, responsive and localisation behaviour, accessibility annotations, final copy, design-token and component compliance, motion specification, platform conventions and analytics instrumentation - and produces a readiness table of blockers, gaps and the artifact list engineering will receive. Use before a design review with engineers, when a designer says "this is ready to build", or when engineering asks what is missing from a spec. Triggers on design handoff, handoff checklist, ready for development, design spec review, dev handoff, spec completeness, missing states, edge cases, redlines, design to engineering.
license: MIT
metadata:
  author: Denis Stritar with Claude Fable 5
  version: "1.0"
  origin: original to the product-design skill registry
---

# Pre-handoff review

Answers one question: can an engineer build this without guessing? It
coordinates the skills that own each part of a specification and owns only
the completeness checklist, the readiness table and the artifact list.

This is not a quality review of the design itself; that is
`product-design-review`. A design can be beautiful and unbuildable, or
plain and complete.

## Inputs

- The design: files, prototype or exported screens, with any written spec.
- The target: platform, frameworks, the design system in use, supported
  locales, and whether analytics is expected.
- The engineering team's questions, if any were raised already.

## Workflow

### 1. Inventory what exists

List every screen and component in the design, and for each the states that
are specified. Note the sources of truth the team uses (tokens file,
component library, copy deck, DESIGN.md).

### 2. Run the completeness checks

Each check names the owning skill; read that skill completely before
applying it and take its rules, not a paraphrase.

| Check | Owner | Passes when |
| --- | --- | --- |
| States | this skill | Every component specifies empty, loading, error, partial, overflow (long text, many items), disabled and success states, or explicitly inherits them from the system |
| Responsive behaviour | `better-layout` | Breakpoints and what collapses are specified; nothing depends on a single viewport |
| Localisation readiness | `localization-design` | Text expansion, RTL mirroring and locale formats are accounted for in the layout |
| Accessibility annotations | `a11y-planner` | Focus order, names, roles, keyboard behaviour and announcements are specified before code |
| Accessibility of the spec | `better-accessibility` | Contrast and target sizes verified where the design fixes them |
| Final copy | `better-writing` | Every label, error and empty state has final text; no lorem ipsum, no "TBD" |
| Tokens and components | `design-system-governance` | Values map to tokens; new components are justified and named |
| Extracted system, if none is written | `extract-design-md` | A DESIGN.md exists or is generated from the codebase for engineers to reference |
| Motion | `motion-system` and `animation-vocabulary` | Durations, easings and triggers are named tokens or explicit values |
| Platform | `platform-conventions` | Native patterns are followed or deviations are deliberate and stated |
| Analytics | `instrumentation-plan` | Events and metrics are specified for the flow, with consent handling |
| Decision record | this skill | Major choices and rejected alternatives are written down with the reason |

Confirm each named skill is installed; mark a missing one `Not checked` and
say so. Never apply a missing skill's rules from memory.

### 3. Classify gaps

- **Blocker**: engineering cannot proceed or would guess something users
  will notice (missing error state, unspecified focus order, placeholder
  copy on a primary action, values with no token in a tokenised system).
- **Gap**: proceed possible with a documented assumption that the designer
  confirms later.
- **Note**: nice to have before launch.

### 4. Report

```
Design: <name>   Target: <platform, system, locales>
| Check | Owner skill | Status (Pass / Gap / Blocker / Not checked) | Detail | Action and owner |
Artifacts to hand over: <list: screens, states matrix, copy deck, token map, a11y annotations, motion spec, analytics plan, decision record>
Readiness: Ready | Ready with assumptions | Not ready
Skills used: <ids>
```

`Not ready` when any blocker remains. Assumptions travel with the handoff
as a list the designer owns.

## Before you finish

| Mistake | Fix |
| --- | --- |
| Reviewing visual quality | Send to `product-design-review`; check completeness here |
| Passing a state matrix that says "same as default" | Require the actual behaviour for overflow, error and empty |
| Accepting values instead of tokens in a tokenised system | Map or justify each raw value |
| Leaving analytics for after launch | `instrumentation-plan` is part of the spec |
| Reporting gaps without owners | Every action names the person who closes it |
