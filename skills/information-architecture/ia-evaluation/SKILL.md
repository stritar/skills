---
name: ia-evaluation
description: Plans, runs and analyses information-architecture studies - open, closed and hybrid card sorts, tree tests and first-click tests - to decide how content and navigation should be grouped and labelled, and turns the results into a sitemap or navigation recommendation with evidence. Use when choosing between navigation structures, validating category labels, reorganising a menu or settings area, or when users cannot find things. Triggers on information architecture, card sorting, tree testing, first-click test, navigation labels, menu structure, sitemap, taxonomy validation, findability, categorisation study, IA research, content grouping, settings organisation.
license: MIT
metadata:
  author: Denis Stritar with Claude Fable 5
  version: "1.0"
  origin: original to the product-design skill registry
  sources: Spencer 2009 Card Sorting (Rosenfeld Media), Nielsen Norman Group card sorting and tree testing articles, Optimal Workshop tree testing metrics, Rosenfeld Morville Arango Information Architecture 4th ed.
---

# Information architecture evaluation

Chooses and runs the study that answers a structure question, and turns
the numbers into a grouping and labelling decision. Structure definition
itself (entities, relationships, content models) belongs to
`silver-structure`; service-level mapping to `service-blueprint`; the words
on the labels to `better-writing` once chosen.

## Inputs

- The question: "how should these N items be grouped", "can users find X in
  this tree", or "which of two navigations works better".
- The content inventory: the items or the proposed tree, with any
  constraints (items that must stay together, regulatory sections).
- Access to participants, or the instruction to plan for later recruitment.

## Workflow

### 1. Match the question to the method

Read [references/methods.md](references/methods.md) for the decision table.
In short:

- **Open card sort** when the grouping and the labels are unknown: users
  make and name groups. Generative.
- **Closed card sort** when categories exist and the question is whether
  items fit them. Evaluative.
- **Hybrid sort** when categories exist but may be incomplete.
- **Tree test** when a hierarchy exists and the question is findability:
  participants locate tasks in a text-only tree, so labels and structure are
  tested without visual design.
- **First-click test** when a page design exists and the question is whether
  the first choice on that page is right.

Do not sort more than about 60 cards; split by area instead. Do not tree
test with fewer than eight tasks or more than fifteen per participant.

### 2. Design the study

- **Cards / tree**: one concept per card, user language, no leading words
  shared between cards that would sort themselves. For trees, include the
  full depth users would see and realistic sibling counts.
- **Tasks** (tree and first-click): describe the goal in the user's words
  without using label words from the tree ("find out how much you were
  charged last month", not "find billing history"). Define the correct
  destination(s) per task in advance.
- **Participants**: card sorts stabilise around 15-20 participants for
  pattern detection (Tullis and Wood; NN/g recommends 15+); tree tests need
  around 50 for stable per-task success rates. Recruit from the target
  population; note when a convenience sample was used.
- **Instrument**: record per participant the groups and names (sort) or the
  path, success, directness and time (tree/first-click).

### 3. Analyse

Read [references/analysis.md](references/analysis.md) for the calculations.

- Card sorts: build the similarity matrix (how often each pair of cards was
  grouped together), cluster it (dendrogram or agreement view), then
  **standardise** participant category names into a shared set before
  counting. Report the strong clusters (agreement above ~60-70%), the
  contested cards (spread across clusters), and the label candidates with
  the frequency of each wording.
- Tree tests: per task, success rate (correct destination reached),
  directness (reached without backtracking), median time, and the
  first-click path distribution. A task under ~60% success or under ~50%
  directness signals a structural or label problem; look at where wrong
  paths went to tell which.
- First-click: proportion of correct first clicks per task; below ~75% the
  page-level cue is weak.

### 4. Decide and document

Propose the structure: groups, labels, depth, and the placement of
contested items (cross-list, rename, or move), each tied to the evidence
that motivated it. Where results are ambiguous, say what a follow-up study
(usually a tree test of the revised tree) would settle.

### 5. Output

- Study plan (method, cards or tree, tasks with correct answers,
  participant target, instrument).
- Results: matrices or per-task tables, with the thresholds used.
- Recommendation: sitemap or navigation outline, contested items with
  rationale, open questions and the follow-up study.

## Before you finish

| Mistake | Fix |
| --- | --- |
| Testing a tree with label words in the tasks | Rewrite tasks in goal language |
| Reading raw category names without standardising | Merge synonyms first, then count |
| Treating one contested card as a structure failure | Cross-list or rename; reserve restructuring for cluster-level disagreement |
| Sorting 120 cards | Split into areas of 30-60 cards |
| Reporting success without directness | Report both; success with heavy backtracking is a label problem |
| Presenting the dendrogram as the answer | Present the decision and the evidence behind it |

## Limitations

Thresholds above are field conventions, not statistical guarantees; small
samples give direction, not precision. Remote unmoderated tools automate
the matrices; when analysing by hand, the references give the formulas.
