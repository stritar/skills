---
name: silver-research
description: Define research questions and methods, participant criteria, scripts, evidence handling, and sanitized observation plans. Use to plan product research or evaluation recruitment without implying the planned research was conducted.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(.silver/bin/silver:*), Bash(${CLAUDE_PROJECT_DIR}/.silver/bin/silver:*)
---

# Plan research

## Workflow

1. Define the decision the research must inform and the evidence needed.
2. Choose a proportionate method, participant criteria, tasks, and script.
3. Define consent, minimization, sanitation, retention, and evidence labeling.
4. Mark the artifact as a plan until observed evidence is actually captured.

Run the guarded file operation through the CLI when durable outputs are ready:

```sh
.silver/bin/silver invoke --scaffold research .
.silver/bin/silver invoke research <request.json> .
```

The scaffold prefills timestamps, provenance, pinned context, required checks, and
`expected_integrity`. Replace every `silver-scaffold-placeholder` before invoking;
the CLI refuses a request that still contains one.

## Done

- Satisfy: question-method-aligned, participant-criteria-explicit, planned-not-conducted.
- Evaluate quality: The plan can answer the declared question while minimizing sensitive data collection.
- Emit a valid `silver/skill-result/v2` record separating execution and evidence-based downstream readiness; acceptance is historical context.
- Recommend follow-up skills; never start them automatically.

## Boundaries

- Never claim planned sessions, participants, or observations occurred.
- Do not place sensitive raw participant data in the repository.

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
