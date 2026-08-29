# IA study analysis

## Card sort

### Similarity matrix

For each pair of cards (a, b): `similarity(a, b) = participants who placed a
and b in the same group / total participants`. Display as a matrix ordered
so high-similarity pairs sit together (most tools do this; by hand, sort by
the strongest pair first and grow the cluster).

### Clustering

Agglomerative clustering on the similarity matrix produces the dendrogram.
Read it at a chosen agreement level (60-70% is the usual first cut): each
branch below the cut is a candidate group. Lower cuts merge groups; higher
cuts split them. Report the cut used.

### Standardisation

Participants name groups differently. Before counting labels, merge
synonyms into standardised categories ("Billing", "Payments", "Money" ->
"Billing and payments") and keep a map of original wordings with
frequencies; the most frequent user wording is the label candidate.

### Reporting

- Strong clusters: cards with pairwise similarity above the cut.
- Contested cards: placed in three or more standardised categories with no
  category above ~40%. Candidates for cross-listing or renaming.
- Label candidates per cluster with wording frequency.
- For closed sorts: per-card placement distribution and the share placed in
  the intended category.

## Tree test

Per task, over participants:

- **Success** = reached a correct destination (last click) / participants.
- **Directness** = reached the destination without backing up / participants.
- **Time** = median seconds to the final click.
- **First click** = distribution of the first top-level choice; the correct
  first click strongly predicts success.
- **Wrong destinations** = where unsuccessful participants ended; group by
  branch.

Interpretation:

| Success | Directness | Reading |
| --- | --- | --- |
| high | high | Structure and labels work |
| high | low | Found eventually; a sibling label competes or the path is long |
| low | high | Confident wrong path: a label misleads |
| low | low | Structure problem: no obvious home |

Conventional thresholds: success below ~60% or directness below ~50% needs
action; between 60-80% success, look at the wrong-path branches before
deciding.

## First-click test

- **Correct first click rate** per task; below ~75% the cue on the page is
  weak.
- Click map: where wrong clicks landed, to tell a label problem from a
  layout problem.

## Comparing two structures

Same tasks, participants split between trees. Compare per-task success and
directness; a difference under the sampling noise of ~50 participants per
arm (roughly 10-15 points) is not decisive on its own.
