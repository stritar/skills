---
name: silver-ideate
description: Generate meaningfully distinct concepts and testable hypotheses grounded in the current problem frame and canonical constraints, then support explicit human selection. Use for divergent product design exploration and hypothesis generation.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(.silver/bin/silver:*), Bash(${CLAUDE_PROJECT_DIR}/.silver/bin/silver:*)
---

# Ideate concepts

## Workflow

1. Pin the current problem frame, evidence, principles, and constraints.
2. Generate alternatives with distinct mechanisms, assumptions, and tradeoffs.
3. Express a falsifiable hypothesis and cheapest useful test for each.
4. Pause for explicit selection; record the choice and rejected tradeoffs.

Run the guarded file operation through the CLI when durable outputs are ready:

```sh
.silver/bin/silver invoke --scaffold ideate .
.silver/bin/silver invoke ideate <request.json> .
```

The scaffold prefills timestamps, provenance, pinned context, required checks, and
`expected_integrity`. Replace every `silver-scaffold-placeholder` before invoking;
the CLI refuses a request that still contains one.

## Done

- Satisfy: concepts-distinct, hypotheses-testable, selection-explicit.
- Evaluate quality: Alternatives differ in mechanism or product bet, not merely surface treatment.
- Emit a valid `silver/skill-result/v2` record separating execution and evidence-based downstream readiness; acceptance is historical context.
- Recommend follow-up skills; never start them automatically.

## Boundaries

- Wait for the user's direction selection unless the user explicitly delegates that choice.
- Do not evade design-system constraints through visual novelty.

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
