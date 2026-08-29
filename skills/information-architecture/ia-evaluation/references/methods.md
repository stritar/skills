# IA study methods: selection and design

## Sources

- Donna Spencer (2009), *Card Sorting: Designing Usable Categories*,
  Rosenfeld Media.
- Nielsen Norman Group: "Card Sorting: Uncover Users' Mental Models for
  Better Information Architecture", "Tree Testing: Fast, Iterative
  Evaluation of Menu Labels and Categories", "Open vs. Closed Card Sorting".
  https://www.nngroup.com/
- Tullis and Wood (2004), "How Many Users Are Enough for a Card-Sorting
  Study?", UPA conference: correlations with the full sample stabilise around
  20-30 participants; 15 gives ~0.90.
- Optimal Workshop, tree testing and first-click testing help documentation
  (success, directness, time, first-click metrics).
- Rosenfeld, Morville, Arango (2015), *Information Architecture*, 4th ed.,
  O'Reilly.

## Method selection

| Question | Method | Output |
| --- | --- | --- |
| How do users group these items, and what would they call the groups? | Open card sort | Clusters, label candidates |
| Do these items fit our existing categories? | Closed card sort | Fit per item, misfits |
| Are our categories complete? | Hybrid card sort | Fit plus new categories |
| Can users find things in this hierarchy? | Tree test | Per-task success, directness, wrong paths |
| Does this page lead users to the right first choice? | First-click test | Correct first click rate, click map |
| Which of two structures works better? | Tree test, between-subjects, same tasks | Per-task comparison |

## Design rules

### Cards

- 30-60 cards per sort; split larger inventories by area.
- One concept per card, phrased as users would say it, without shared
  leading words.
- Randomise card order per participant.
- For closed sorts, provide an explicit "I don't know / none" option.

### Trees

- Text only; no icons, no visual hierarchy cues beyond indentation.
- Realistic depth and breadth: include the siblings users would really
  scan.
- Randomise task order; 8-15 tasks per participant; more tasks split across
  participant groups.

### Tasks

- Goal language, no label words from the tree.
- One correct destination or an explicit set of acceptable ones, decided
  before fielding.
- Avoid tasks that reveal the answer to a later task.

### Participants

- Target population, screened; note convenience samples.
- Card sort: 15-20 for pattern detection; 30 for finer contrasts.
- Tree test: ~50 per tree for stable per-task rates; 30 gives direction.
- First-click: 30-50 per design.
