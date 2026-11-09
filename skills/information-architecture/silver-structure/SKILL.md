---
name: silver-structure
description: Define and refine information architecture, navigation structure, taxonomy, content models, and object models — what exists, how it is organized, and how things relate. Distinct from flow (sequences over time) and map (broader relational views).
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(.silver/bin/silver:*), Bash(${CLAUDE_PROJECT_DIR}/.silver/bin/silver:*)
---

# Structure information architecture

## Workflow

1. Name the question and the structure type: information architecture, navigation,
   content model, taxonomy, or object model.
2. Define entities, their attributes, and parent/child relationships where they exist.
3. Define relationships between entities, including cardinality where it is known.
4. Record structural rules that govern organization; leave genuine ambiguity recorded
   rather than resolved by assumption.

Run the guarded file operation through the CLI when durable outputs are ready:

```sh
.silver/bin/silver invoke --scaffold structure .
.silver/bin/silver invoke structure <request.json> .
```

The scaffold prefills timestamps, provenance, pinned context, required checks, and
`expected_integrity`. Replace every `silver-scaffold-placeholder` before invoking;
the CLI refuses a request that still contains one.

## Done

- Satisfy: entities-named, relationships-explicit, ambiguity-recorded.
- Evaluate quality: What exists, how it is organized, and how things relate are
  reviewable without conflating structure with sequence.
- Emit a valid `silver/skill-result/v2` record separating execution and evidence-based downstream readiness; acceptance is historical context.
- Recommend follow-up skills; never start them automatically.

## Boundaries

- Do not describe sequences, user actions, or transitions; that is `flow`.
- Do not describe journeys, service blueprints, or ecosystem-level relational views;
  that is `map`.
- Do not define detailed reusable interface components; that is `component`.
- Do not define design-system primitives, tokens, or registries; that is `system`.

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
