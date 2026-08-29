# Metric patterns

Standard shapes for success, guardrail, activation and retention metrics.
Each is defined so it can be computed from events in the tracking plan.

## Funnel

Ordered events with a conversion window, measured per user (not per event):

```
entry event -> step events -> outcome event, within W hours/days
conversion = users reaching outcome / users with entry event
```

Report per-step drop-off, and the median time between steps. Keep funnels
short (three to five steps) and one per question.

## Activation

The first action that predicts continued use. Define it as an event or a
combination with a window from signup:

```
activated = user fired <activation event(s)> within N days of signup_completed
activation rate = activated users / signed-up users, by signup cohort
```

Choose the action by correlation with retention, then validate with a
follow-up cohort; state which it is (hypothesised or validated).

## Retention

```
retained(day k) = users with any <qualifying event> on day k (or in week k)
                   / users in the cohort
```

Name the qualifying event (a meaningful action, not app open), the cohort
grain (signup week is typical) and whether the curve is classic (exact
period) or rolling (on or after the period).

## Task success and time to value

```
task success = task_completed / task_started, per task, with a timeout
time to first value = median(first <value event> - signup_completed)
```

## Guardrails

Pair every success metric with at least one guardrail that would show the
design winning at the users' expense: error or failure rate, support
contact rate, undo or reversal rate, cancellation rate, latency percentile,
drop-off among assistive-technology users if detectable.

## Experiment block

- Assignment event and `variant` property; assignment fires once per user.
- Primary metric (one), guardrails (two or three).
- Minimum detectable effect and the sample size that implies; runtime.
- Analysis owner and the decision rule agreed before launch.
