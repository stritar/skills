---
name: product-design-review
description: Runs a complete product-design review of a screen, flow, prototype, live page or pull request by selecting the smallest set of specialist skills the input needs (accessibility, layout, content, typography, color, UI polish, animation, agentic-interface, deceptive-pattern and design-system lenses), running them in a fixed order, merging duplicate findings under one owner, and producing one severity-ranked report with a Block or Approve verdict. Use for pre-launch reviews, whole-feature reviews, or when a review needs lenses beyond the interface itself. Triggers on full design review, product design review, pre-launch review, review this feature, review this flow, holistic UX review, design audit, ship readiness, review my screens, comprehensive UI review.
license: MIT
metadata:
  author: Denis Stritar with Claude Fable 5
  version: "1.0"
  origin: original to the product-design skill registry
---

# Product design review

Coordinates specialist skills into one review and owns only the
coordination: which skills run, in what order, how their findings merge,
and the final verdict. Every domain rule stays in the skill that owns it;
this file never restates one.

For a change-scoped interface review with the `better-*` family installed,
`interface-review` hands to `better-interface`, which already orchestrates
the six interface specialists. Use this skill when the review is wider than
the interface: a whole feature, a launch, or an input that needs the
animation, agentic, deceptive-pattern, research or design-system lenses.

## Inputs

- The subject: source code, a URL, screenshots, a prototype, or a diff. Say
  which, because it decides which accessibility skill runs.
- Product context: what the flow is for, platform (web, iOS, Android),
  whether an AI agent acts in it, whether it takes money, consent or
  personal data, whether a design system exists.
- Scope limits: what is out of scope for this review.

## Workflow

### 1. Select the lenses

Read the catalog entries (or `npm run search`) only for the skills named
below; do not load others. Pick the smallest set the input needs:

| Lens | Skill | Run when |
| --- | --- | --- |
| Accessibility (source) | `better-accessibility` | Source code available |
| Accessibility (live page) | `a11y-check-page` | A URL is available; adds axe-core results |
| Layout and structure | `better-layout` | Always |
| Platform conventions | `platform-conventions` | Native iOS or Android |
| Interface copy | `better-writing` | Any user-facing text |
| Typography | `better-typography` | Always |
| Color | `better-colors` | Always |
| UI polish and motion basics | `better-ui` | Always |
| Animation review | `review-animations` | Motion beyond basic transitions |
| Agentic interface | `agentic-ui-review` | An AI agent plans, acts or asks permission |
| Deceptive patterns | `dark-pattern-review` | Consent, pricing, subscription, cancellation, data-sharing steps |
| Design-system compliance | `design-debt-audit` | A design system or token set exists |
| Change scoping | `interface-review` | The input is a diff or PR; run first to fix scope |

State the selected set and the reason each excluded lens was excluded.

### 2. Confirm availability

Before running, confirm each selected skill is installed. If one is missing,
mark its lens `Not reviewed`, name the skill, and continue. Never recreate a
missing skill's rules from memory or substitute a neighbour for it.

### 3. Run in order

Foundational failures first so polish does not mask them:

1. `interface-review` (diffs only) to fix scope and classify Introduced /
   Regression / Pre-existing.
2. Accessibility lens.
3. `dark-pattern-review` and `agentic-ui-review` when selected: they can
   change what the flow should be, which invalidates later polish findings.
4. `better-layout`, `platform-conventions`.
5. `better-writing`.
6. `better-typography`, `better-colors`, `better-ui`, `review-animations`.
7. `design-debt-audit`.

Read each selected SKILL.md completely before applying it, including the
files it links. Take each specialist's principles, references and
verification checks. Its standalone report format and severity ladder are
replaced by the consolidated format below.

### 4. Consolidate

- **Shared severity**: `HIGH` blocks users, exposes money or data, breaks
  accessibility for a group, or lets an agent act irreversibly without
  approval. `MEDIUM` degrades the task for many users. `LOW` is polish. When
  a specialist rated differently, keep its rating inside its own domain and
  note the mapping.
- **Deduplicate by root cause**: when two lenses flag the same element, keep
  one finding under the skill whose domain owns the rule (a contrast failure
  is owned by `better-accessibility` deciding it fails and `better-colors`
  fixing the value; report it once, naming both). Never average two
  contradictory rules; pick the owner and state the conflict.
- **Cap**: at most 20 findings in the report; move the rest to an appendix
  ordered by severity, so the team can act on the top of the list.

### 5. Report

```
Scope: <what was reviewed, platform, input type>
Lenses run: <skill ids>   Not reviewed: <skill ids and why>
| Severity | Lens (owner skill) | Location | Finding | Fix |
Verdict: Block | Approve
Skills used: <ids>
```

`Location` is `path:line`, a screen name, or a selector. End with `Block`
when any `HIGH` remains, `Approve` otherwise, and always list the skills
used so the review is reproducible.

## Before you finish

| Mistake | Fix |
| --- | --- |
| Loading every skill in the registry | Select from the table; justify exclusions |
| Restating a specialist's rules here | Link the specialist; own only coordination |
| Continuing as if a missing skill ran | Mark the lens `Not reviewed` and name it |
| Reporting the same element under three lenses | Merge under the owning skill |
| Approving unreviewed lenses | The verdict covers reviewed lenses only; say so |
