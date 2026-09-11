# Grammars, tiers, scales and composites

Read at steps 2, 3 and 4 of `token-naming`. Which statements come from the
source page and which are registry decisions is recorded in
[source-notes.md](source-notes.md).

## Three approaches the page names

The page lists these as "well-known approaches" and recommends none. Its
own examples are in the third column.

| Approach | Segment order | Page example |
| --- | --- | --- |
| C-T-I | category, type, item | `color-background-primary` |
| BEM | block, element, modifier | `color-background-primary` |
| Functional | practical use first | `primary-background-color`, `tab-color-text-hover` |

Notes:

- C-T-I is the Style Dictionary convention; the segment order is fixed and
  the category comes first, so a sorted list groups by category.
- BEM is a CSS class convention (`.block__element--modifier`). The page
  reuses the C-T-I example for it. In this registry `ui-design-system`
  applies BEM to component classes, not to tokens; treat it as a class
  grammar unless a project has deliberately adopted it for tokens.
- Functional order puts the thing a reader is looking for first: the
  component or the role. It reads well in code but sorts badly.

The same four tokens in each order, to make the trade-off concrete:

| Token | C-T-I | Functional |
| --- | --- | --- |
| Page background | `color-background-page` | `page-background-color` |
| Body text | `color-text-primary` | `text-primary-color` |
| Button hover background | `color-button-background-hover` | `button-background-color-hover` |
| Small radius | `radius-sm` | `sm-radius` |

Small radius is the tell: functional order makes scale steps awkward, which
is why most systems use C-T-I order for scaled categories even when they
put the component first for component tokens.

## Grammars already declared in this registry

Each is a valid declared grammar. Do not merge them; pick the one that
matches the project's existing tokens, or the one the project declares.

| Skill | Grammar | Example | What `primary` means there |
| --- | --- | --- | --- |
| `design-tokens` | `{category}.{property}.{variant}-{state}`, dotted, three tiers prefixed `primitive`, `semantic`, `component` | `semantic.text.primary`, `component.button.primary-bg-hover` | `action.primary` is the main affirmative action colour |
| `better-colors` | `--color-{role}-{variant}-{state}`, CSS custom properties, two tiers (primitives by hue and step, semantics by role) plus an optional component tier for documented exceptions | `--color-text-secondary`, `--color-accent-solid-hover` | "the most prominent of its group"; the brand colour is `accent` |
| `ui-design-system` | `{category}-{property}-{variant}-{state}`, hyphenated | `color-primary-500`, `spacing-md`, `radius-lg` | the brand ramp itself |

The `primary` column is a real conflict between vendored skills. The
resolution is procedural, not a preferred meaning: the project declares
which meaning it uses in its token documentation, uses it everywhere, and
when `better-colors` is in play its rule governs colour tokens.

## Choosing a grammar

Answer three questions, then write the answer into the token docs.

1. **Who reads the names most?** Developers reading code want the role
   first and short segments. Designers browsing a Figma variables panel
   want the category first, because the panel groups by the first
   segment.
2. **Which tool constrains characters?** Figma variables use `/` as the
   group separator and allow spaces; CSS custom properties allow `-` and
   `_` only; Style Dictionary and DTCG JSON nest objects and join with `.`
   on output. A slash path in Figma, a dotted path in JSON and a hyphen
   name in CSS are three renderings of one grammar when the segment order
   and words are identical. Declare the segments, then map separators per
   platform in the build (see `token-build`).
3. **Are custom properties consumed directly?** If templates reference
   `var(--…)` by hand, the CSS rendering is the public name and must read
   well on its own. If a build emits them, optimise the source grammar.

Declare the result as one line in the docs, for example:
`{tier}.{category}.{role}.{variant}.{state}`, dotted in source, hyphenated
in CSS, slashed in Figma. Every token in the set follows it. A mixed set
gets a migration with aliases, never a second grammar.

## Tiers

The page lists six token types: raw value, primitive, semantic, component,
computational, adaptive (light, dark). It defines none of them. The
registry's working model, shared with `design-tokens` and `better-colors`:

- **Primitive** names a value: the hue and step, the pixel size, the
  weight number. `primitive.blue.600`, `--neutral-200`. Never applied in a
  component.
- **Semantic** names a job: `semantic.text.primary`, `--color-bg-surface`.
  Points at a primitive. Themes (light, dark, brand, density) swap values
  at this tier, which is what the page calls adaptive tokens.
- **Component** names a slot on one component: `component.button.bg-hover`.
  Points at a semantic token. Add one only where a component diverges
  from the system on purpose; many component tokens mean the semantic
  tier is missing roles (the `better-colors` rule).

A raw value is what a primitive holds, not a tier of its own. A
"computational" token (one derived by formula) is named on the page without
definition; treat a derived value as a primitive whose `$description`
records the formula.

## Scale types

The page's scale panel, with its own labels:

| Scale | Page label | Example |
| --- | --- | --- |
| Numeric, short | numeric | `1 2 3 4 5` |
| Numeric, hundreds | numeric | `100 200 300 400 500` |
| T-shirt | sizes | `xs s m l xl xxl` |
| Emphasis words | emphasis | `low medium high` |
| Levels | levels | `level-1 level-2 level-3` |

Three further word sets appear on the page without a label. Their
categories below are an interpretation, not the page's claim:

| Word set | Read here as |
| --- | --- |
| `regular active heading strong` | emphasis or weight steps for text |
| `sharp pill medium card small full` | radius or shape names |
| `instant slow medium fast` | duration names |

### Which scale for which category

Registry defaults, chosen to match the scales other skills here already
use. A project with an existing scale keeps it; the rule is consistency,
not this table.

| Category | Default scale | Why |
| --- | --- | --- |
| Colour ramp steps | numeric hundreds, `50` to `950` | Room to insert (`150`), matches `design-tokens` and Tailwind; `better-colors` maps these to roles |
| Spacing | numeric, either the pixel value (`4`, `8`, `16`) or hundreds (`100`, `200`) | Spacing is added to constantly; t-shirt runs out at `3xl` |
| Sizing (controls, icons) | t-shirt `xs` to `xl` | Few steps, read by designers and developers alike |
| Radius | word set: `none sm md lg full` (`pill` as an alias of `full` if the project says so) | Shape words carry meaning a number does not |
| Shadow or elevation | levels `level-1` to `level-n`, or `sm md lg` | Ordered, small, rarely extended |
| Motion duration | word set `instant fast normal moderate slow deliberate` | Matches `motion-system`; durations are chosen by feel, not by step |
| Font size | t-shirt with numeric extension (`xs` to `7xl`) or hundreds | Matches `design-tokens`' Major Third scale |
| Font weight | word set `regular medium semibold bold` | Weight names are conventional across tools |
| Z-index | levels or role words (`dropdown`, `modal`, `toast`) | Ordering matters more than magnitude |
| Opacity | numeric percent (`10`, `50`, `90`) | The number is the meaning |

### Two rules that hold regardless of table

- **Siblings share one scale type.** `radius.sm`, `radius.2`, `radius.pill`
  under one parent cannot be read without the definitions. If shape words
  are wanted, every sibling is a shape word.
- **Choose for room to grow.** Where insertions are likely, use hundreds
  or t-shirt with `2xl`, `3xl`; `1` to `5` forces a renumber the first time
  a step is needed between `2` and `3`.

## Composite tokens

The page's anatomy, with the DTCG type each maps to:

| Composite | Parts on the page | DTCG `$type` |
| --- | --- | --- |
| Text style | font-size, weight, family, line-height | `typography` |
| Border | color, width, style | `border` |
| Gradient | colors | `gradient` (an array of stops) |
| Shadow | color, blur, spread, direction | `shadow` (offset x and y instead of direction) |

The composite is named with the same grammar as its parts, at the semantic
tier, and every part is an alias. A raw number inside a composite is a
value that no theme can swap.

DTCG form, as `design-tokens` and `token-build` expect it:

```json
{
  "semantic": {
    "typography": {
      "heading": {
        "$type": "typography",
        "$description": "Section headings. Parts alias primitives so themes can retune them.",
        "$value": {
          "fontFamily": "{primitive.font.family.sans}",
          "fontSize": "{primitive.font.size.700}",
          "fontWeight": "{primitive.font.weight.bold}",
          "lineHeight": "{primitive.font.lineHeight.tight}"
        }
      }
    }
  }
}
```

The playbook's own form, re-typed from the page (its snippet uses
hyphenated flat names and is shown unclosed there):

```json
"header-text-style": {
  "font-family": "{font-family-header}",
  "font-size": "{font-size-header}",
  "font-weight": "{font-weight-bold}"
}
```

Both say the same thing: a text style is a bundle of references, not a
bundle of values.
