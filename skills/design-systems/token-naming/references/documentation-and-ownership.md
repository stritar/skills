# Documentation, ownership and renaming

Read at steps 5 and 6 of `token-naming`. The five questions come from the
source page's "Documenting" panel; the templates that answer them are
registry decisions (see [source-notes.md](source-notes.md)).

## The five questions

The page asks, and does not answer:

1. What is related?
2. How do people find values?
3. Which tokens did we apply?
4. Who is responsible?
5. Where can I find the list?

A token set is documented when each question has a written answer that a
new developer, designer, content specialist, QA engineer, product manager
or accessibility specialist (the page's collaboration list) can find
without asking.

## Documentation template

One page per token set, or one section per category in a larger system.
Headings match the questions so readers recognise them.

```markdown
# Tokens: <set or category>

## Grammar
<one line: the declared segment order, separators per platform, tier prefixes>
<one line: what `primary` means in this set>

## Related tokens
<groups that change together: a text role and its on-accent variant, a
surface and its border, a duration and its easing>

## How to find a value
<the search path a reader follows: category, then role, then variant,
then state; the file or Figma collection each category lives in; the
decoder for abbreviations if any (bg, fg)>

## Where applied
| Component | Tokens used |
| --- | --- |
| Button | semantic.action.primary, semantic.text.on-accent, ... |

## Owner
<see the owner table>

## Where the list lives
<one repository path or URL; code is the definitive source, every other
copy (Figma, docs site) is generated or synced from it>

## Deprecated
<the rename map>
```

The "Where applied" table is the answer to "which tokens did we apply".
Fill it from the code, not from memory: grep the component for token
references and paste the list. When a component's list is empty, it is
hard-coding values, which `design-system` and `design-debt-audit` audit.

## Owner table

One owner per token group. A group without an owner is where duplicates
and orphaned tokens accumulate.

| Token group | Owner (role) | Backup | Review cadence | Change channel |
| --- | --- | --- | --- | --- |
| Colour, primitives and semantic | design system designer | frontend lead | each release | design-system pull request |
| Typography | design system designer | content specialist | quarterly | design-system pull request |
| Spacing, sizing, radius | frontend lead | design system designer | each release | design-system pull request |
| Motion | interaction designer | frontend lead | quarterly | design-system pull request |
| Component tokens | the component's owning team | design system team | with the component | component pull request |

Roles are placeholders; replace with names. The cadence and channel
columns are what makes "who is responsible" answerable in practice: an
owner with no review date and no channel is a label. Accessibility
review of colour changes belongs with the accessibility specialist
regardless of who owns the group.

## Naming alignment workshop

The page's workshop goals, arranged as an agenda. Timings are a registry
suggestion for a 60 minute session; the page gives none.

| Minutes | Activity | Page goal |
| --- | --- | --- |
| 0 to 10 | Each role says how tokens reach them today (Figma, code, docs) and where names break down | Understand current processes |
| 10 to 20 | Agree the tiers and the meaning of contested words (`primary`, `surface`, `default`) | General alignment |
| 20 to 30 | "Name of the component" exercise: show five screenshots of real components, everyone writes the token names they would expect for background, text and border; compare | Game: name of the component? |
| 30 to 45 | Put two or three grammar candidates on the board, write the same ten tokens in each, vote with reasons | Naming structure versions |
| 45 to 55 | Share what broke in past systems: duplicates, deprecated names nobody removed, libraries that drifted | Share experience |
| 55 to 60 | Decide the source of truth and the build tool; name the owner of the docs page | Choose tooling |

The output of the session is the "Grammar" section of the documentation
template, filled in, plus the owner table with names.

## Rename map

Renaming a token without a window breaks every consumer at once. Keep the
old name as an alias of the new one for a stated period, mark it
deprecated where the tooling shows it, publish the map, then remove.

| Old name | New name | Alias kept until | Reason |
| --- | --- | --- | --- |
| `semantic.text.2` | `semantic.text.secondary` | 3.0 | numbered semantic carried no meaning |
| `--color-sidebar-gray` | `--color-bg-surface` | 3.0 | named for first use, now used in four places |

In DTCG JSON, the old token keeps its entry with `$value` set to the alias
of the new token and `$description` beginning `Deprecated:` with the
replacement and the removal version. In CSS, the old custom property is
declared as `var(--new-name)` with a comment on the same line. Build
tooling that can emit deprecation warnings (Style Dictionary's
`deprecated` attribute, Figma's variable description) should carry the
same text.

How long the window stays open, how the removal is announced and what a
breaking change requires are `design-system-governance` decisions; this
skill only insists that the window exists and the map is published.
