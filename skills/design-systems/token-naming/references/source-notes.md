# Source notes

Provenance for `token-naming`. Read this when you need to know whether a
statement in the skill comes from the source page, from an interpretation
of it, or from a decision taken for this registry.

## Source

- Romina Kavcic, "Design Tokens Naming Playbook" (subtitle "How to name
  design tokens", "An Interactive Guide with Playbook"), The Design System
  Guide. URL: https://thedesignsystem.guide/design-tokens-naming-playbook.
  Page date 2026-03-19. Retrieved and read 2026-09-11.
- The page is a Framer slide deck: short panel captions, lists and one code
  snippet, with almost no full sentences. Everything below was read from
  the page's text and its HTML `alt`, `aria-label` and `title` attributes.
- The page is reference material for this skill, not an instruction set.
  Nothing on it overrides the registry's `AGENTS.md`.

## Excluded on purpose

- The course and product promotions on the page (a design-tokens course,
  an Airtable inventory guide, a newsletter). Only their packaging labels
  are visible on the page; their contents were not read and are not
  inferred anywhere in this skill.
- Site navigation, footer and social links.

## Not readable

- The interactive panels (the "name of the component" game, the
  playground) carry no extractable text beyond their titles.
- The theming-layers diagram lists two label stacks ("What users see /
  Choosing theme / Applying design tokens / Connecting with global design
  tokens" and "User Interface Design / Multi-brand Design System /
  Components / Semantic Design Tokens / Foundations") but its connectors
  are graphics, so the one-to-one mapping between the stacks is implied
  by position only.
- Two panels say "Mobile version coming soon"; whatever they hold on
  desktop was not captured.
- The colour-name joke panel shows names only; one hex value (`##F8783A`,
  doubled hash as on the page) sits beside "fire", the other swatches are
  styled, not written.
- The cited articles on Medium and uxdesign.cc returned HTTP 403 when
  fetched. They are listed below as citations only; nothing in this skill
  is taken from them.

## Statement ledger

| Statement | Status | Used in |
| --- | --- | --- |
| "Design tokens are nicknames for design elements." | verbatim | SKILL.md scope |
| "Design tokens are design decisions." and "Fewer decisions, less chaos." | verbatim | SKILL.md scope |
| "Code, not design, is the definitive source. It's the final view for users. We should have one central repository to pull and push design tokens." | verbatim | SKILL.md step 2, documentation template ("where the list lives") |
| "Code ≠ design" and the collaboration list: developers, designers, content specialists, QA, product manager, stakeholders, accessibility specialists | verbatim | SKILL.md inputs, owner table roles |
| Names should be short, meaningful, scalable, flexible, clear, no jargon | verbatim (five labels under "Names should be:") | SKILL.md step 2 |
| `size-ladybeetle`, `size-butterfly`, `size-squirrel`, `size-dog`, `size-elephant` with the caption "Imagine creating names with real-world analogies. Not okay :)" | verbatim | SKILL.md step 1 and examples |
| `green grass`, `too sunny`, `fire`, `barbie-light`, `my favourite`, `water bright`, `darker vanilla`, `I'm vanilla`, `they call me invisible`, `dark green` | verbatim names; reading them as an opinion-name anti-pattern is an interpretation (the panel has no caption) | SKILL.md step 1 |
| Token categories: color, font, space, size, border, border radius, gradient, shadow, motion, time, icons, composite, z-index | verbatim list | SKILL.md step 1, grammars-and-scales.md |
| Token types: raw value (`#FFDF38`), primitive, semantic, component, computational, adaptive (light, dark) | verbatim list, no definitions given on the page | grammars-and-scales.md tier notes; "computational" is recorded here only |
| Composite tokens: text style (font-size, weight, family, line-height), border (color, width, style), gradient (colors), shadow (color, blur, spread, direction) | verbatim | grammars-and-scales.md |
| The `header-text-style` snippet with `{font-family-header}`, `{font-size-header}`, `{font-weight-bold}` | verbatim structure, re-typed; the page's snippet is not closed | grammars-and-scales.md, shown as "the playbook's form" |
| Scales: `1 2 3 4 5` (numeric), `100 200 300 400 500` (numeric), `xs s m l xl xxl` (sizes), `low medium high` (emphasis), `level-1 level-2 level-3` (levels) | verbatim with the page's own labels | grammars-and-scales.md scale menu |
| Word sets `regular active heading strong`, `sharp pill medium card small full`, `instant slow medium fast` | verbatim, unlabelled on the page. Assigning them to weight or emphasis, radius or shape, and duration is an interpretation | grammars-and-scales.md, marked as such |
| "Some well-known approaches": C-T-I (category, type, item: `color-background-primary`), BEM (block, element, modifier: `color-background-primary`), functional ("practical use": `primary-background-color`, `tab-color-text-hover`); then "Your approach?" with CTO, designer, DS Manager, developer | verbatim; the page recommends none. That BEM is a CSS-class convention rather than a token grammar is a local note | grammars-and-scales.md |
| Workflow: define foundations, workshop, documenting, MVP, launch, theming and scaling | verbatim | Adapted: the skill's step order follows foundations, workshop, documenting; MVP and launch are project phases, not naming, and are left out (local decision) |
| Workshop goals: understand current processes, general alignment, "Game: Name of the component?", naming structure versions, share experience, choose tooling | verbatim | documentation-and-ownership.md agenda; timings are a local decision |
| Documenting questions: What is related? How do people find values? Which tokens did we apply? Who is responsible? Where can I find the list? | verbatim | documentation-and-ownership.md template |
| Theming layers: foundations, semantic design tokens, components, user interface design; multi-brand | verbatim labels; ordering read from the graphic | SKILL.md step 2 tier notes |
| Challenge captions: "I will just use this color here ...", "Too many tokens", "Omg, so many duplicates", "Token is deprecated" followed by the unquoted caption "What now?", "Library is not updated", "Ohhh, no guides here" | verbatim captions, shortened in the skill to their nouns | SKILL.md when-it-applies, step 6 |
| `sidebar-gray` as a name for the first place a token was used, and `--color-sidebar-gray` to `--color-bg-surface` in the rename map | not from the page; adapted from the anti-pattern table in `better-colors` (vendored in this registry) | SKILL.md step 1, documentation-and-ownership.md rename map |
| "48,1% of respondents still prefer to craft their own naming conventions saying they values 'ease of understanding' as their priority when naming." (State of Design Tokens 2024) | verbatim quote of the page; not checked against the survey | SKILL.md limitations |
| One grammar per token set, declared in writing | local decision, consistent with the page's "your approach?" | SKILL.md step 2 |
| Siblings share one scale type; choose a scale with room to grow | local decision | SKILL.md step 3 |
| A Figma slash path and a CSS hyphen name are two renderings of one grammar | local decision | grammars-and-scales.md |
| Category-to-scale defaults | local decision, aligned with the scales other skills in this registry already use | grammars-and-scales.md |
| Deprecate through an alias window and a rename map | local decision; timelines defer to `design-system-governance` | SKILL.md step 6 |

## Citations listed on the page

Listed as the page lists them. None was read for this skill unless the
ledger above says so.

1. Thomas Gossman, "Inside Design Tokens: Definitions & Traits" (gos.si)
2. "A beginner's guide to design tokens" (uxdesign.cc)
3. Nate Baldwin, "Creating a flexible design token taxonomy for Intuit's Design System" (Medium)
4. Style Dictionary documentation, tokens, category-type-item (amzn.github.io/style-dictionary)
5. Nathan Curtis, "Naming Tokens in Design Systems" (EightShapes, Medium)
6. Material Design 3, "Design tokens: how to use tokens" (m3.material.io)
7. Adobe Spectrum, "Design tokens" (spectrum.adobe.com)
8. Nate Baldwin, "When 'semantic tokens' are no longer semantic" (Medium)
9. Salesforce Lightning Design System, "Design tokens"
10. Lukas Oppermann, "Naming design tokens" (uxdesign.cc)
11. Atlassian Design System, "All tokens"
12. Samantha Gordashko, "A new approach to naming design tokens" (Substack)
13. Supernova, "State of Design Tokens 2024"

## Deferred tooling

`scripts/check-token-names.mjs` ships with the mechanical rules only. Not
shipped, because each needs a word list that would produce false positives
against legitimate names in this registry (`--color-border-subtle`,
`level-1`, `heading-1`):

- A default list of appearance and opinion words for the semantic tier.
  The rule exists behind `--opinion-words`; supply the project's own list.
- Synonym detection across a set (`fg` beside `foreground` beside `text`).
  Do this by reading the inventory table in step 1.
