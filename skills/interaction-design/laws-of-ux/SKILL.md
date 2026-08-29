---
name: laws-of-ux
description: >-
  Improve any user interface with 30 evidence-based UX principles drawn from
  cognitive psychology and human-perception research. Use when designing,
  building, reviewing, or critiquing UI; when the user asks about usability,
  layout, hierarchy, navigation, forms, onboarding, or conversion; or when they
  name a principle (Hick's Law, Fitts's Law, Jakob's Law, Miller's Law,
  aesthetic-usability, cognitive load, Gestalt grouping, and more). For each
  principle it explains the mechanism, concrete ways to apply it, the pitfalls,
  and a real example. Load reference/laws.md for the full catalog.
license: MIT
---

# Laws of UX

A working toolkit of 30 principles about how people **see, remember, decide,
and act** — each translated into decisions you can make in a real interface.
These aren't style opinions. They come from perception and cognition research,
and they hold across platforms, eras, and visual trends.

Use this skill to design new UI, diagnose why an existing screen feels off, or
back a design decision with a reason instead of a preference.

## How to run a UX pass

1. **Name the symptom.** "Too many buttons," "feels slow," "people abandon the
   form," "nobody notices the CTA." Symptoms map to principles — the index
   below is organized that way.
2. **Pull the 1–3 relevant principles** and read their full entry in
   `reference/laws.md`. Read the *mechanism* and the *pitfalls*, not just the
   definition — that's where the useful nuance lives.
3. **Propose a concrete change to this screen**, and cite the principle by name
   so the reasoning is auditable. Not "add more contrast" — instead: "Von
   Restorff Effect: make the primary action the only filled button so it stops
   competing with the three ghost buttons around it."
4. **Check for conflicts.** Principles pull against each other. More whitespace
   (Prägnanz) vs. more visible options (discoverability). Simplicity (Occam)
   has a floor (Tesler). Resolve deliberately; don't apply one law blind.
5. **Verify with users when the stakes are real.** These principles predict
   behavior well, but they don't replace testing — the Aesthetic-Usability
   Effect specifically warns that a good-looking design can hide broken tasks.

## The 30 principles, by what they govern

**Perception & visual grouping (Gestalt)** — how the eye organizes a screen
before anyone reads a word.
- Law of Proximity · Law of Common Region · Law of Similarity · Law of Uniform
  Connectedness · Law of Prägnanz · Von Restorff Effect · Selective Attention ·
  Aesthetic-Usability Effect

**Memory & attention** — what people can hold in their heads while using your UI.
- Miller's Law · Working Memory · Chunking · Serial Position Effect ·
  Cognitive Load · Zeigarnik Effect · Peak-End Rule

**Decision-making** — how choices get made, and where they stall.
- Hick's Law · Choice Overload · Cognitive Bias · Occam's Razor ·
  Pareto Principle

**Interaction & performance** — speed, effort, motion, momentum.
- Fitts's Law · Doherty Threshold · Flow · Goal-Gradient Effect · Parkinson's Law

**Expectations & mental models** — what people assume before they even arrive.
- Jakob's Law · Mental Model · Paradox of the Active User · Postel's Law ·
  Tesler's Law

## Index — reach for it when…

| Principle | Reach for it when… |
|---|---|
| Aesthetic-Usability Effect | You need to know why a prettier design tests as "easier" — and why that's a trap. |
| Choice Overload | Too many options make people freeze, decide worse, or leave. |
| Chunking | Dense content or long strings need grouping to be scannable. |
| Cognitive Bias | Decisions skew from "rational" — framing, defaults, anchoring, confirmation. |
| Cognitive Load | The interface asks the brain to hold or process too much at once. |
| Doherty Threshold | Anything feels slow; responses cross ~400ms; you need loading states. |
| Fitts's Law | Sizing and placing buttons, links, and touch targets. |
| Flow | Keeping people immersed; matching challenge to skill; killing friction. |
| Goal-Gradient Effect | Motivating completion; progress that accelerates near the finish. |
| Hick's Law | Decision time balloons with the number and complexity of choices. |
| Jakob's Law | Users expect your UI to behave like every other one they know. |
| Law of Common Region | Grouping with borders, cards, backgrounds, containers. |
| Law of Proximity | Grouping by spacing alone — what's near reads as related. |
| Law of Prägnanz | Reduce visual complexity; the eye prefers the simplest reading. |
| Law of Similarity | Matching look implies matching function (links vs. plain text). |
| Law of Uniform Connectedness | Tie related items together with lines, frames, shared containers. |
| Mental Model | Match how users already believe the thing should work. |
| Miller's Law | Working memory is small (~7±2 chunks); chunk — but don't over-limit. |
| Occam's Razor | Strip every element that isn't earning its place. |
| Paradox of the Active User | People won't read docs; teach in context, inline, just in time. |
| Pareto Principle | Focus effort on the ~20% of features driving ~80% of value. |
| Parkinson's Law | Tasks stretch to fill the time; shorten steps, autofill, set expectations. |
| Peak-End Rule | Design the most intense moment and the ending on purpose. |
| Postel's Law | Accept messy input generously; emit clean, predictable output. |
| Selective Attention | People tune things out; avoid banner blindness and change blindness. |
| Serial Position Effect | First and last items stick; place key actions at the ends. |
| Tesler's Law | Some complexity is irreducible — let the system carry it, not the user. |
| Von Restorff Effect | Make the one important thing visibly distinct (without faking an ad). |
| Working Memory | Support recognition over recall; carry state across screens. |
| Zeigarnik Effect | Unfinished tasks tug at attention; use progress cues to pull completion. |

## Ready-made combinations

- **Declutter a busy screen** → Occam's Razor + Law of Proximity + Miller's Law.
- **Kill a slow-feeling flow** → Doherty Threshold + Goal-Gradient Effect + optimistic UI.
- **Fix a confusing new feature** → Jakob's Law + Mental Model + Paradox of the Active User.
- **Rescue an abandoned form** → Hick's Law + Parkinson's Law + Postel's Law + progress cues (Zeigarnik / Goal-Gradient).
- **Sharpen a landing page** → Von Restorff Effect + Selective Attention + Serial Position Effect + Peak-End Rule.

Full entries — mechanism, how-to-apply, pitfalls, and a real example each — are
in **`reference/laws.md`**.
