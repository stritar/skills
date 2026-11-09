---
name: silver-synthesize
description: Convert sanitized evidence, feedback, analytics, briefs, and labeled assumptions into findings, problem frames, opportunities, contradictions, and open questions with provenance. Use after research, feedback, evaluation, analytics, or a seed brief.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(.silver/bin/silver:*), Bash(${CLAUDE_PROJECT_DIR}/.silver/bin/silver:*)
---

# Synthesize evidence

## Workflow

1. Confirm every source is sanitized and revision-addressable.
2. Separate observations, analytics, supplied facts, and assumptions.
3. Cluster evidence without erasing contradictions or minority signals.
4. Produce traceable findings and an actionable problem frame.

Run the guarded file operation through the CLI when durable outputs are ready:

```sh
.silver/bin/silver invoke --scaffold synthesize .
.silver/bin/silver invoke synthesize <request.json> .
```

The scaffold prefills timestamps, provenance, pinned context, required checks, and
`expected_integrity`. Replace every `silver-scaffold-placeholder` before invoking;
the CLI refuses a request that still contains one.

## Done

- Satisfy: sources-pinned, assumptions-labeled, contradictions-retained.
- Evaluate quality: Findings separate observation, interpretation, confidence, contradiction, and open question.
- Emit a valid `silver/skill-result/v2` record separating execution and evidence-based downstream readiness; acceptance is historical context.
- Recommend follow-up skills; never start them automatically.

## Boundaries

- Do not fabricate evidence or silently upgrade assumptions into findings.
- Do not rewrite upstream evidence while synthesizing it.

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
