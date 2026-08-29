---
name: instrumentation-plan
description: Turns a feature or flow into an instrumentation plan - the questions to answer, the success and guardrail metrics, an event taxonomy with a consistent naming convention, event properties, identity and consent rules, funnel and retention definitions, and a QA checklist - so product analytics can evaluate the design after launch. Use when specifying analytics for a new feature, reviewing an existing tracking plan, defining activation or retention metrics, or preparing an A/B test. Triggers on instrumentation, tracking plan, event taxonomy, analytics events, event naming, product analytics, success metrics, guardrail metrics, funnel analysis, activation metric, retention metric, north star metric, A/B test metrics, experiment design, measurement plan, data minimization for analytics.
license: MIT
metadata:
  author: Denis Stritar with Claude Fable 5
  version: "1.0"
  origin: original to the product-design skill registry
  sources: Segment Tracking Plan and object-action naming, Amplitude Data Taxonomy Playbook, Google Analytics 4 event naming rules, PostHog product analytics docs, GDPR Art. 5(1)(c)
---

# Instrumentation plan

Produces the plan that lets a team learn whether a design worked. Metrics
first, events second: an event that answers no question is cost without
information. The plan is a deliverable engineers implement and analysts
query; it is not the analysis itself. Post-launch evaluation of results
belongs to `silver-measure`; experiment analysis to the team's analytics
tooling.

## Inputs

- The feature or flow: screens, states, entry and exit points.
- The decision the data must inform (ship, iterate, roll back, expand).
- Existing conventions: current event names, analytics vendor, identity
  model, consent framework. Read them before inventing new ones.

## Workflow

### 1. State the questions and the metrics

Write two to five questions in the form "did users X after Y". Derive:

- **Success metrics** — the outcome the design intends (task completion
  rate, time to first value, adoption of the new path).
- **Guardrail metrics** — what must not get worse (error rate, support
  contacts, churn of the old path, latency, accessibility-related drop-off).
- **Activation and retention definitions** where relevant: the action that
  marks a user as activated, and the window and action that count as
  retained. Make each definition computable from the events below.

Every metric gets an owner, a baseline (or "none, first measurement"), and
a target or a stated hypothesis. Read
[references/metric-patterns.md](references/metric-patterns.md) for the
standard funnel, activation and retention shapes.

### 2. Derive the events from the user's actions

Walk the flow and list the user actions and system outcomes needed to compute
the metrics. Nothing else. For each event record: trigger (the exact moment
and component), who fires it (client or server; prefer server for outcomes
like payment or save), and the properties needed to slice it.

### 3. Apply one naming convention

Follow the project's existing convention. When there is none, use
**object_action in snake_case** (`checkout_started`, `report_exported`),
past tense for completed outcomes, present tense for intents, no product or
screen names inside the event name (those are properties). Properties are
snake_case, typed, with enumerations spelled out. Reserve a small set of
context properties attached to every event (screen, entry_point, variant,
platform, app_version). Read
[references/naming-and-schema.md](references/naming-and-schema.md) for the
rules and the tracking-plan table format.

### 4. Identity, consent and minimisation

State how users are identified (anonymous id, user id, when they merge),
what happens before consent is given (no tracking, or essential only), and
which properties are personal data. Collect the minimum needed to answer the
questions (GDPR Article 5(1)(c)); never put free-text user input, full URLs
with query strings, or health, financial or precise location data in
properties unless the question requires it and consent covers it.

### 5. Funnels, segments and experiments

Define each funnel as an ordered list of events with the conversion window.
Define segments by properties that exist in the plan. For an experiment,
name the assignment event and the `variant` property, the primary metric,
the guardrails, the minimum detectable effect and the sample size
assumption, and the analysis owner.

### 6. QA and rollout

List how each event will be verified before launch: the action to perform,
the expected event and properties, and where to look. Include a check that
no event fires twice, that server and client counts reconcile for outcomes,
and that consent-off sessions produce nothing non-essential.

### 7. Output

Deliver a single document with: questions and metrics table; the tracking
plan table (`event | trigger | properties | source | owner | metric served`);
identity and consent rules; funnel and segment definitions; experiment
block if any; QA checklist. Flag every open decision with the person who
owns it.

## Before you finish

| Mistake | Fix |
| --- | --- |
| Starting from a list of clicks | Start from questions; drop events that serve no metric |
| Naming events after screens | Object_action names; screen is a property |
| Client-side events for money or saved data | Fire outcomes from the server, intents from the client |
| Metrics without baselines or owners | Add both, or write "first measurement" and the date |
| Personal data in properties by default | Minimise; list what is personal and the consent that covers it |
| One giant funnel | Short funnels per question, with explicit conversion windows |

## Limitations

Vendor features differ (session definitions, identity merge rules, sampling);
the plan states assumptions rather than vendor specifics. Statistical design
for experiments beyond sample-size assumptions is out of scope.
