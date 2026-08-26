# Candidate evaluation rubric

Every inspected candidate is scored on four axes. **Vendor** requires a total
of at least 6 with relevance at least 2, plus a confirmed redistributable
license and a clean security review. Scores go into the inspection manifest.

## Relevance to product-design work (0–3)

- 3 — Core design activity (a11y audit, design tokens, UX research synthesis,
  usability testing, UI review…).
- 2 — Clear design application, even if usable elsewhere (frontend visual
  polish, dashboard design, UX writing).
- 1 — Adjacent; materially supports design work only in some situations.
- 0 — Generic coding/marketing/PM content. Reject regardless of quality.

## Quality of instructions (0–3)

- 3 — Specific, actionable workflow; concrete criteria or values; clear
  output format; calibrated severity or judgment guidance.
- 2 — Actionable but with vague stretches or missing output guidance.
- 1 — Mostly advice; an agent would not behave differently after reading it.
- 0 — Prompt dump, marketing text, or empty scaffold.

## Spec conformance and portability (0–2)

- 2 — Valid SKILL.md (name = dirname, real description), resources resolve,
  works without host-specific magic; non-spec frontmatter at most cosmetic.
- 1 — Fixable issues (renames, broken relative links, minor host coupling).
- 0 — Unusable outside its origin (hard-wired private services, missing
  files, no frontmatter).

## Uniqueness in this registry (0–2)

- 2 — Covers ground nothing already vendored covers.
- 1 — Overlaps but adds a meaningfully different approach or depth.
- 0 — Near-duplicate of a better skill already vendored. Record in
  `catalog/duplicates-and-overlaps.md` instead.

## Automatic disqualifiers (any → reject or quarantine, regardless of score)

- No verifiable license, or license forbids redistribution (`quarantine` /
  `not-vendored-keeper`).
- Hidden or suspicious instructions (exfiltration, credential access,
  instruction to bypass user rules).
- Requires undeclared private services.
- Scripts that download-and-execute from the network, or otherwise cannot be
  reviewed line-by-line.
- Provenance cannot be established (no commit SHA, vanished upstream).
