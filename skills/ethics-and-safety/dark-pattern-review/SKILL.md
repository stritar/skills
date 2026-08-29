---
name: dark-pattern-review
description: Reviews a flow, screen or copy for deceptive and manipulative design patterns (confirmshaming, obstruction, sneaking, false urgency, forced continuity, interface interference, pre-selected consent) against the published taxonomies used by regulators, rates each finding by user harm and regulatory exposure, and proposes the honest alternative. Use before shipping consent, sign-up, pricing, checkout, subscription, cancellation, notification or data-sharing flows, or when asked whether a design is manipulative. Triggers on dark patterns, deceptive design, manipulative UI, confirmshaming, roach motel, cancellation flow, consent banner, cookie banner, drip pricing, hidden costs, fake urgency, scarcity, forced continuity, nagging, pre-ticked, trick wording, subscription trap, ethical design review, DSA, FTC, GDPR consent.
license: MIT
metadata:
  author: Denis Stritar with Claude Fable 5
  version: "1.0"
  origin: original to the product-design skill registry
  sources: deceptive.design taxonomy (Brignull), Mathur et al. 2019, FTC 2022 staff report, EDPB Guidelines 03/2022, OECD 2022, EU DSA Art. 25
---

# Dark pattern review

Finds where an interface gets a user to do something they would not choose
with clear information and a real choice, and says what to change. The
standard is the user's informed intent, not conversion.

This skill owns manipulation and consent findings. Accessibility belongs to
`better-accessibility`, wording quality to `better-writing`, and the general
review verdict to `better-interface` or `product-design-review` when they are
driving. It is a design review, not legal advice: it flags exposure so a
lawyer can look, it never clears a flow.

## Inputs

- The flow as it will ship: screenshots, a prototype, or source with copy.
  Every step, including confirmation emails and the cancel path.
- The business context: what the flow is optimizing for, and what is
  mandatory (age gates, regulated disclosures).
- Jurisdictions that matter, if known (EU, UK, US states, others).

## Workflow

### 1. Inventory the decision points

List every moment where the user's choice or attention is acted on:
consent (cookies, tracking, marketing), account creation, plan selection,
price display, add-ons, checkout, trial start, renewal, cancellation, data
sharing, notification permissions, review prompts. For each, record the
default state, the options shown, the effort of each option, and what the
copy says.

### 2. Check each point against the taxonomy

Read [references/taxonomy.md](references/taxonomy.md) for the pattern list
with detection questions. The families, in the order regulators cite them
most:

- **Sneaking** — costs, items or consent added without clear disclosure
  (drip pricing, sneak into basket, hidden subscription).
- **Obstruction** — an action made harder than the reverse action
  (roach motel: one click to subscribe, a phone call to cancel).
- **Interface interference** — visual weight, pre-selection or wording that
  steers (pre-ticked boxes, disguised ads, trick questions, confirmshaming).
- **Urgency and scarcity** — countdowns, stock counts or "others are viewing"
  that are false or unverifiable.
- **Social proof** — testimonials, counts or activity messages that cannot be
  substantiated.
- **Forced action and nagging** — required sign-up, repeated interruptions,
  consent re-asked until the user gives in.
- **Consent-specific** — no equally prominent reject option, reject buried in
  settings, withdrawal harder than granting, purposes bundled.

A pattern counts only when the user's outcome differs from what they would
choose with symmetric options and plain information. A prominent primary
button is not a dark pattern; a prominent primary button beside a greyed,
delayed or shaming alternative is.

### 3. Rate each finding

Two axes, both recorded:

- **User harm**: money lost, data disclosed, time or attention taken, the
  reversibility of the outcome.
- **Regulatory exposure**: whether the pattern is named in the sources
  listed in `references/taxonomy.md` (EU DSA Article 25 prohibits dark
  patterns on online platforms; the EDPB guidelines treat consent-flow
  patterns as GDPR consent defects; the FTC has acted on subscription and
  cancellation obstruction; several US state privacy laws void consent
  obtained through dark patterns).

Severity: `HIGH` when either axis is high (money, data, or a named prohibited
pattern in an applicable jurisdiction). `MEDIUM` when the steer is real but
the outcome is cheap to reverse. `LOW` when the pattern is present but
mitigated (a clear undo, a visible price at every step).

### 4. Propose the honest alternative

For every finding give the concrete change, not a principle: the reject
option with equal weight, the price shown where the choice is made, cancel in
the same channel and the same number of steps as subscribe, the countdown
removed or tied to a real deadline with the reason stated. When the honest
version costs conversion, say so plainly and let the team decide with the
exposure in view.

### 5. Report

Group by decision point, ordered by severity, one row per pattern:

`| Severity | Step | Pattern | Evidence | Harm | Exposure | Change |`

`Evidence` quotes the copy or names the element. `Exposure` names the source
that describes the pattern, or "none named" when it is a harm without a
regulatory hook. End with `Block` when any `HIGH` remains, `Approve` otherwise,
and a line stating that the review is a design assessment, not legal advice.
With nothing found, state "No deceptive patterns found" and list the
decision points inspected, so the coverage is auditable.

## Before you finish

| Mistake | Fix |
| --- | --- |
| Calling every persuasive element a dark pattern | Test for asymmetric options or missing information; persuasion with symmetric choice passes |
| Reviewing the happy path only | Walk the cancel, decline and withdraw-consent paths end to end |
| Rating by how the pattern looks | Rate by outcome for the user and by named exposure |
| Recommending "be transparent" | Specify the element, the copy and the step count of the fix |
| Declaring a flow compliant | State exposure and hand legal questions to counsel |

## Limitations

Taxonomies and regulations change; the references list the versions this
skill was written against (2026-08). The skill cannot verify whether a stock
count or testimonial is true, only whether the design lets the user tell.
