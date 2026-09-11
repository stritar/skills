---
name: token-naming
description: Chooses and applies one naming convention for design tokens across every category - declares a grammar (dotted category.property.variant, role-first CSS custom properties, or functional order), fixes the primitive, semantic and component tiers, picks a scale type per category without mixing types among siblings, names composite tokens (text style, border, shadow, gradient), and writes token documentation with an owner per group and a deprecation and rename path. Use when starting or auditing a token set, when two grammars coexist, when semantic names are subjective or appearance-based, or when nobody can list which tokens a component uses. Defers to better-colors for colour role names. Triggers on token naming, name design tokens, token naming convention, token grammar, semantic token names, token scale, t-shirt vs numeric scale, composite tokens, text style token, token documentation, token ownership, deprecate a token, rename tokens, too many tokens.
license: MIT
metadata:
  author: Denis Stritar with Claude Fable 5
  version: "1.0"
  origin: original to the product-design skill registry
  sources: Romina Kavcic, Design Tokens Naming Playbook (thedesignsystem.guide, 2026-03-19, read 2026-09-11); Style Dictionary category-type-item documentation; W3C Design Tokens Community Group format module (composite types); Supernova State of Design Tokens 2024 as quoted by the playbook
---

# Token naming

Names design tokens so that anyone who did not create them can find, read
and extend them. The source page puts it as "design tokens are nicknames
for design elements" and "design tokens are design decisions. Fewer
decisions, less chaos": a name records a decision, and a set of names is a
set of decisions someone else has to navigate.

What belongs elsewhere: the colour role inventory and the rule that the
brand colour is `accent` belong to `better-colors`; token values and the
DTCG file layout to `design-tokens`; platform outputs to `token-build`;
deprecation timelines and breaking-change policy to
`design-system-governance`; the duration word set to `motion-system`.

## When it applies

- A new token set, or two sets being merged.
- An audit found mixed grammars (`color.text.primary` beside
  `--text-primary-color`), duplicates, or names like `size-elephant` and
  `too-sunny`.
- A designer and a developer disagree about a name and there is no
  written convention to settle it.
- Nobody can say which tokens a component uses, or what "token is
  deprecated" means for the people using it.

Not for choosing values (ramps, type scales: `better-colors`,
`design-tokens`), generating platform files (`token-build`), or styling one
screen with no system behind it.

## Inputs

- The existing tokens: DTCG JSON, CSS custom properties, a Figma variables
  export, or nothing yet.
- The categories in play. The page's list: colour, font, space, size,
  border, border radius, gradient, shadow, motion, time, icons, composite,
  z-index.
- The tools that constrain characters and separators: Figma variables,
  Style Dictionary, Tailwind, a CSS-in-JS runtime.
- Who reads the names. The page's list: developers, designers, content
  specialists, QA, product managers, stakeholders, accessibility
  specialists.

## Workflow

### 1. Inventory what exists

List every token as a table: name, category, tier, problem. Problems to
flag:

- Duplicates: two names for one value with one job.
- Real-world analogies (`size-ladybeetle` to `size-elephant`, which the
  page marks "not okay") and opinion names (`my-favourite`, `too-sunny`).
- Appearance words at the semantic tier (`blue`, `gray`, `light`, `bold`),
  which stop being true in the first theme.
- Values in semantic names (`space-16`, `text-14`): a semantic name that
  carries its value cannot change its value.
- Numbered semantics (`text-2`) that carry no meaning.
- Names for the first place used (`sidebar-gray`).

Nothing is renamed yet; the table is the evidence for the choices below.

### 2. Choose the grammar and tier model, then declare it

Read [references/grammars-and-scales.md](references/grammars-and-scales.md)
for the three approaches the page names (category-type-item, BEM,
functional), the three grammars already declared in this registry, and the
questions that pick one.

Rules:

- One grammar per token set, written into the token docs as a single line
  with segment order, separators per platform and tier prefixes. The page
  recommends no grammar and neither does this skill; it requires that one
  is declared and kept.
- Names are short, meaningful, scalable, flexible and clear, with no
  jargon (the page's five qualities). A reader who has seen one name in
  a group can guess its siblings.
- A slash path in Figma, a dotted path in JSON and a hyphen name in CSS
  are renderings of one grammar when the segments match. Declare the
  segments; let the build map separators.
- Primitives name a value and are never applied in components. Semantics
  name a job and point at a primitive. Component tokens point at
  semantics and exist only where a component diverges on purpose.
- Code is the definitive source, with one repository that every other
  copy is pulled from or pushed to (the page: "code, not design, is the
  definitive source"). A Figma collection that disagrees with the
  repository is a sync bug, not a second truth.

### 3. Pick a scale type per category

The page's menu: numeric (`1` to `5`, or `100` to `500`), t-shirt (`xs` to
`xxl`), emphasis words (`low`, `medium`, `high`), levels (`level-1` to
`level-3`). The reference file gives a default per category, aligned with
the scales other skills here already use: colour steps `50` to `950`, type
`xs` to `7xl`, spacing in numeric steps, durations as a word set.

Two rules hold whatever the table says:

- Siblings under one parent share one scale type. `radius.sm`,
  `radius.2` and `radius.pill` together are three conventions.
- Choose for room to grow. `100` to `500` and t-shirt with `2xl` take an
  insertion; `1` to `5` forces a renumber.

### 4. Name composite tokens

A text style, border, shadow or gradient is one token whose value is a
bundle of parts. It takes the same grammar as its parts, sits at the
semantic tier, and every part is an alias, never a raw value (the DTCG
example is in the reference file). A composite with a raw `400` inside
has a weight no theme can retune.

### 5. Document and assign ownership

Read
[references/documentation-and-ownership.md](references/documentation-and-ownership.md).
The page's five questions are the page template: What is related? How do
people find values? Which tokens did we apply? Who is responsible? Where
can I find the list? "Which tokens did we apply" is answered by a
component-to-token table filled from the code. Every token group gets an
owner, a backup, a review cadence and a change channel. If the team has
not aligned yet, the reference file has the page's workshop goals as a
one-hour agenda.

### 6. Deprecate and rename through a window

A rename that lands without a window breaks every consumer at once. Keep
the old name as an alias of the new for a stated period, mark it
deprecated in `$description` (DTCG) or a comment (CSS), publish the rename
map in the docs, then remove. How long the window is and how it is
announced follow `design-system-governance`.

### 7. Verify

Run the bundled lint on the token files or the CSS:

```bash
node scripts/check-token-names.mjs tokens/ \
  --tiers primitive=primitive,semantic=semantic,component=component \
  --grammar '^(primitive|semantic|component)\.[a-z][a-zA-Z]*(\.[a-z0-9][a-zA-Z0-9-]*)+$'
```

It reports unresolved aliases, mixed scale types among siblings, raw
values inside composites, component tokens that alias primitives,
numbered semantics, and names that fail the declared grammar.
`--opinion-words` takes the project's own list of banned appearance and
opinion words; there is no default, because `subtle`, `strong` and
`level-1` are legitimate in some sets. Run it with no flags on a CSS file
to get the alias and scale checks alone.

By hand, because the script cannot see them: the docs carry the declared
grammar line and the meaning of `primary`; every group has an owner row;
the rename map lists every alias kept for deprecation; the
component-to-token table matches the code.

## Examples

Dotted grammar as `design-tokens` declares it:

```text
correct    semantic.text.primary          -> {primitive.neutral.900}
correct    component.button.primary-bg-hover -> {semantic.action.primary-hover}
incorrect  semantic.text.blue-ish         appearance word at the semantic tier
incorrect  component.button.bg            -> {primitive.blue.600}  skips the semantic tier
```

The grammar regex in step 7 accepts `semantic.text.blue-ish`, because the
name is well formed. The appearance word is caught by the inventory in
step 1, or by the lint only when `--opinion-words blue` is supplied.

CSS custom properties as `better-colors` declares them:

```css
/* correct */
--color-text-secondary: var(--neutral-700);
/* incorrect: numbered semantic, raw value */
--color-text-2: #374151;
```

Scales:

```text
correct    space.100  space.200  space.300
incorrect  space.sm   space.200  space.large      three scale types under one parent
```

## Known conflicts in this registry

| Skill | Grammar | Meaning of `primary` |
| --- | --- | --- |
| `design-tokens` | `{category}.{property}.{variant}-{state}`, dotted | `action.primary` is the main affirmative action colour |
| `better-colors` | `--color-{role}-{variant}-{state}` | the most prominent of its group; the brand colour is `accent` |
| `ui-design-system` | `{category}-{property}-{variant}-{state}` | `color-primary-500` is the brand ramp |

These are vendored skills and are not edited to agree. Resolution: the
project declares in its token docs which meaning of `primary` it uses and
uses it everywhere; when `better-colors` is loaded its rule governs colour
tokens; a set that mixes meanings is a finding. Name the conflict in the
output when more than one of these skills is in play.

## Output

- The declared grammar line and the tier model, with the meaning of
  contested words.
- The inventory table with problems.
- A scale table: category, scale type, steps.
- Composite token definitions in the project's format.
- The documentation page with the owner table and, if anything was
  renamed, the rename map.
- The lint result, and the list of manual checks done.

## Before you finish

| Mistake | Fix |
| --- | --- |
| Two grammars in one set | Declare one; migrate the other through aliases |
| A value in a semantic name (`space-16`, `text-blue`) | Primitives carry values; semantics and components carry roles |
| Analogy or opinion names (`size-elephant`, `too-sunny`) | Use the scale type the category uses |
| Siblings on different scales (`radius.sm`, `radius.2`, `radius.pill`) | One scale type per sibling group |
| Component token aliasing a primitive | Insert or reuse a semantic token |
| Composite with a raw part | Every part is an alias |
| Rename without an alias window | Keep the old name as an alias, mark deprecated, publish the map |
| Token group with no owner | One owner, one backup, a cadence and a channel |
| A grammar chosen because a tool suggested it | Declare it for the readers; map separators per tool in the build |

## Limitations

The source page recommends no grammar and this skill follows it: the
grammar is a project decision, and the category-to-scale defaults are
this registry's, not the page's. The page's interactive panels and its
theming diagram's connectors could not be read, and the articles it cites
on Medium were not reachable; nothing here is taken from them. The page
quotes the State of Design Tokens 2024 survey as saying 48.1 percent of
respondents craft their own naming convention and prioritise ease of
understanding; that figure is repeated from the page, not checked at the
survey. The lint checks names and references, not whether a name is a
good description of its job; that remains a review. Provenance for every
statement is in [references/source-notes.md](references/source-notes.md).
