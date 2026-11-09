---
name: silver-evaluate
description: Define an evaluation question and method, prepare tasks, inspect a visualization or prototype, capture sanitized observations, and produce findings and recommendations. Use for usability testing, expert review, or feedback analysis distinct from deterministic conformance.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(.silver/bin/silver:*), Bash(${CLAUDE_PROJECT_DIR}/.silver/bin/silver:*)
---

# Evaluate design

## Workflow

1. Define the decision, question, method, participants or reviewers, and tasks.
2. Inspect the pinned visualization or prototype and capture only sanitized observations.
3. Separate observed behavior from interpretation and deterministic check findings.
4. Produce evidence-linked findings and recommendations to inform the next user decision.

Run the guarded file operation through the CLI when durable outputs are ready:

```sh
.silver/bin/silver invoke --scaffold evaluate .
.silver/bin/silver invoke evaluate <request.json> .
```

The scaffold prefills timestamps, provenance, pinned context, required checks, and
`expected_integrity`. Replace every `silver-scaffold-placeholder` before invoking;
the CLI refuses a request that still contains one.

## Done

- Satisfy: question-declared, observations-sanitized, interpretation-separated, conformance-distinct.
- Evaluate quality: Observations, interpretations, confidence, and recommendations remain distinguishable and traceable.
- Emit a valid `silver/skill-result/v2` record separating execution and evidence-based downstream readiness; acceptance is historical context.
- Recommend follow-up skills; never start them automatically.

## Boundaries

- Do not imply participants or sessions existed when performing only a planned or expert review.
- Do not turn conformance failures into fabricated user evidence.

## Decisions and durable work

Artifacts do not require approval. An explicit request authorizes its expected
consequential actions; ask again only for material surprises. Wait for unresolved
user choices unless explicitly delegated. Readiness and production requirements
are advice, not a veto on explicit requests; never report missing evidence as a
pass. Applied changes to active brand or design-system content become authoritative;
proposals and experiments do not replace active content.

Follow repository Git rules and user instructions. Checkpoint completed research
imports, substantial artifact revisions, and applied authoritative or production
changes as coherent milestones, including related files and excluding unrelated
edits. Set invocation `milestone: false` for intermediate work or when commits
are not authorized. Preserve work on commit failure and retry the commit only.
