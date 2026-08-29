---
name: ux-research-workflow
description: Drives a user-research effort from the decision it must inform to an evidence-backed recommendation by sequencing the specialist skills for planning, instruments (interview guides, surveys), synthesis, structural mapping (service blueprints, information-architecture studies), ideation and post-launch measurement, with the handover artifacts between steps defined. Use when starting research for a product decision, when raw research material needs turning into findings, or when a team asks what research to do next. Triggers on research plan, user research workflow, plan a study, synthesize interviews, research synthesis, what research should we do, discovery research, research to recommendation, evidence for a design decision, research roadmap.
license: MIT
metadata:
  author: Denis Stritar with Claude Fable 5
  version: "1.0"
  origin: original to the product-design skill registry
---

# UX research workflow

Sequences research specialists so a decision gets the evidence it needs
and no more. This skill owns the sequence, the handover artifacts and the
stop conditions; every method rule lives in the specialist that owns it.

## Inputs

- The decision: what will be decided differently depending on the result,
  by whom, by when.
- What exists: prior research, analytics, support data, transcripts.
- Constraints: participant access, time, consent and data-handling rules.

## Workflow

### 1. Frame the decision

Write the decision, the question it needs answered, and the evidence that
would change it. If the question is answerable from existing material, skip
to step 4. If the decision is not clear, stop and get it clarified; research
without a decision produces reports nobody uses.

### 2. Plan the study

Run `user-research-cookiy` (route "Plan a Study") to produce the research
plan, screener and interview guide. When consent, data minimisation and
retention need explicit treatment, run `silver-research` for its ethics and
data-handling plan section and merge it into the plan. Confirm the plan is
labelled a plan and claims no sessions happened.

Choose the instrument:

- Interviews or contextual sessions: the interview guide from step 2.
- Questionnaire: `survey-design`, which owns question wording, scales and
  sample-size guidance.
- Findability or grouping questions: `ia-evaluation`, which owns card sorts,
  tree tests and first-click tests.

Handover artifact: the plan with instruments attached and the correct
answers or hypotheses recorded before fielding.

### 3. Collect

Field the study per the plan. This skill does not run sessions; record what
was collected, from whom (in sanitised form), and any deviation from the
plan.

### 4. Synthesise

- Interview transcripts or notes: `user-research-cookiy` (route "Synthesize
  a Report") for coding, themes, personas, opportunities and
  recommendations with quality gates.
- Mixed evidence (analytics, support tickets, survey results, notes):
  `silver-synthesize` for findings and a problem frame.
- Survey data: the analysis plan inside `survey-design`.

Handover artifact: findings with evidence references, confidence, and the
problem frame.

### 5. Map structure when the question is structural

- Service failures, backstage causes, multi-channel journeys:
  `service-blueprint`.
- Navigation, grouping and labels: `ia-evaluation` results feed a sitemap or
  navigation recommendation.

### 6. Turn findings into options and a decision

Run `silver-ideate` to generate distinct concepts with falsifiable
hypotheses and the cheapest test for each, then stop for human selection.
When the recommendation meets stakeholder resistance, `design-negotiation`
owns the evidence-based argument.

### 7. Plan the measurement

Before the chosen option ships, `instrumentation-plan` defines the metrics
and events that will show whether it worked; after launch, `silver-measure`
closes the loop against the hypothesis.

### 8. Output

One document: decision and question; plan and instruments; collection
record; findings with evidence; structural maps if any; options with
hypotheses; the recommendation; the measurement plan; and the next study
if the evidence was insufficient. List the skills used.

## Availability and precedence

Confirm each skill named above is installed before relying on it; if one is
missing, name it and describe the manual step the team must do instead.
Never reconstruct a missing method from memory. When two specialists
disagree (for example on sample size), the skill that owns the instrument
wins, and the disagreement is recorded.

## Before you finish

| Mistake | Fix |
| --- | --- |
| Starting with a method | Start with the decision; the decision picks the method |
| Running every step for every question | Skip steps whose artifact the decision does not need |
| Synthesising before sanitising | Remove personal data before material enters the repository |
| Presenting themes as the recommendation | Convert to options with hypotheses and tests |
| Shipping without a measurement plan | `instrumentation-plan` before launch, not after |
