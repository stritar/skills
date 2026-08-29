---
name: agentic-ui-review
description: Reviews interfaces where an AI agent acts on the user's behalf (chat assistants that run tools, autonomous workflows, copilots that edit files or data) for the trust and control patterns those interfaces need - intent confirmation, approval gates scaled to risk, visible state and progress, tool-use transparency, honest uncertainty, interruptibility, reversibility, error recovery and accessible streaming output - against the published human-AI interaction guidelines, and produces severity-rated findings with concrete fixes. Use when designing or reviewing any UI that shows an agent planning, acting or asking for permission. Triggers on agentic UI, agent interface, AI assistant UX, copilot, approval flow, confirmation pattern, human in the loop, tool use transparency, agent progress, streaming state, uncertainty display, undo agent action, interrupt agent, autonomy level, trust calibration, AI explainability, generative UI.
license: MIT
metadata:
  author: Denis Stritar with Claude Fable 5
  version: "1.0"
  origin: original to the product-design skill registry
  sources: Microsoft HAX Guidelines (Amershi et al. 2019), Google PAIR People + AI Guidebook, Apple HIG Machine Learning and Generative AI, NN/g AI UX research, WCAG 2.2 SC 4.1.3
---

# Agentic interface review

Checks that a user can understand what an agent is about to do, stop it,
approve the risky parts, see what happened, and recover when it goes wrong.
The bar is calibrated trust: the user trusts the agent exactly as much as
its reliability deserves, no more and no less.

Conversation copy and turn design belong to `conversational-ux`;
accessibility mechanics to `better-accessibility`; dark patterns in consent
or upsell steps to `dark-pattern-review`. This skill owns the lifecycle of an
agent action as the user experiences it.

## Inputs

- The interface: screens, prototype, or the components that render agent
  plans, tool calls, results and errors.
- What the agent can do: the tool list with each tool's blast radius (read,
  write, send, pay, delete) and reversibility.
- The autonomy model: what runs without asking, what asks, who can change
  that.

## Workflow

### 1. Map the action lifecycle

For each agent capability, trace the four moments the user meets it:
**before** (intent stated, plan shown, permission asked), **during**
(progress, current step, ability to pause or stop), **after** (what changed,
where, how to undo), **failure** (what the agent knows, what it tried, what
the user can do). Note where any moment is silent. Silence at "before" on a
write or send action is the most common `HIGH` finding.

### 2. Check the pattern set

Read [references/patterns.md](references/patterns.md) for each pattern with
the guideline it derives from and the test to apply. The set:

- **Intent echo** — the agent restates the goal in its own words before
  acting on ambiguous requests (HAX G1, G2; PAIR "set expectations").
- **Plan preview** — multi-step work is shown as steps before it runs, with
  the risky steps marked.
- **Approval scaled to risk** — read-only actions run; reversible writes may
  run with visible undo; irreversible, external or costly actions ask first,
  and asking cannot be bypassed by wording. One approval covers one scope.
- **Live state** — a persistent indicator of idle / thinking / acting /
  waiting-for-you, with the current step named, not a spinner alone.
- **Tool-use transparency** — every tool call is inspectable: what was
  called, with what inputs, what came back, in a form the user can expand and
  cite (HAX G11 "make clear why the system did what it did").
- **Honest uncertainty** — confidence is expressed where it changes the
  user's decision, in words the user can act on, never as a decorative
  percentage (HAX G10, PAIR "explainability + trust").
- **Interruptibility** — stop is one action, always reachable, and stopping
  leaves a consistent state the interface describes.
- **Reversibility** — completed actions list what changed with an undo or a
  path to reverse; when reversal is impossible the interface said so at
  approval time (HAX G8, G9; Apple HIG: let people correct and undo).
- **Error recovery** — failures say what the agent knows, what it tried, and
  offer the user's options; they do not loop or silently retry writes
  (HAX G9 "support efficient correction").
- **Scope and memory disclosure** — what the agent can see (files, data,
  history) and what it remembers are visible and editable (HAX G17, G18).
- **Accessible streaming** — streamed output and status changes are
  announced to assistive technology (WCAG 2.2 SC 4.1.3 Status Messages, ARIA
  live regions), focus is not stolen, and generated content follows the
  same accessibility rules as authored content.
- **Generated UI governance** — when the agent renders its own controls,
  they use the product's design system, carry the same confirmation rules,
  and cannot present a destructive action as primary.

### 3. Rate findings

`HIGH`: an irreversible, external or costly action can run without an
explicit, scoped approval; the user cannot stop the agent; a failure leaves
state the user cannot see; streamed status is invisible to assistive
technology. `MEDIUM`: the pattern exists but is inconsistent (some tools
transparent, others opaque; undo for some writes). `LOW`: clarity or
placement issues with the mechanism present.

### 4. Recommend

Name the component and the change. Prefer the cheaper fix: an approval step
over a rewrite of the autonomy model; a status line over a redesign. When the
fix changes what runs automatically, state the trade-off in throughput so
the product owner decides knowingly.

### 5. Report

`| Severity | Moment | Pattern | Location | Evidence | Fix |`

`Moment` is before / during / after / failure. Order by severity. End with
`Block` when any `HIGH` remains, `Approve` otherwise. Report which
capabilities were traced so unexamined tools are visible.

## Before you finish

| Mistake | Fix |
| --- | --- |
| Asking for approval on everything | Scale to blast radius and reversibility; constant prompts train blind approval |
| Treating a spinner as state | Name the step and the mode; make waiting-for-you distinct |
| Showing confidence as a number without a decision attached | Say what the user should do differently at that confidence |
| Reviewing only the chat pane | Trace tool calls, side effects and the undo path in the rest of the product |
| Assuming streamed text is accessible | Check live-region announcements and focus behaviour |

## Limitations

Guidelines cited are the 2026-08 versions; the field moves quickly. The skill
reviews the interface contract, not model quality: an agent that asks
correctly can still act wrongly, which evaluation skills and product
analytics must catch.
