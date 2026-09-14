---
name: a11y-check-code
description: Performs an accessibility check (a11y check) on source code. Reads HTML / JSX / TSX / Vue / Svelte / templates, also traces imported components, identifies issues against WCAG 2.2 level AA as a guide, and outputs a report with severity ratings. Used for things like "look at this component's accessibility", "run an a11y check", "check whether there are any accessibility issues", and so on. Use for accessibility (a11y) review of source code files and components against WCAG 2.2 AA.
---

# Accessibility check for source code

Read the source code and find accessibility issues that should be prioritized for
handling. Use WCAG 2.2 level AA as the guideline.

## Understand the limits of this check first

What can be judged from source code is mainly **issues caused by the implementation**.
The following cannot be judged:

- Actual contrast ratio (when colors are determined at runtime)
- Whether the focus order feels natural to the user
- Layout breakage at 200% zoom or 320px width
- Actual behavior of additional content shown on hover or focus
- Actual screen reader announcements

**Never write as though something was judged when it could not be judged.** Record
check points that could not be judged in the report as "needs further verification,"
and generate handoff instructions for the `a11y-check-page` skill.

Also, when general usability issues beyond accessibility are found, or things that
cause no actual harm but violate HTML or WAI-ARIA specifications or best practices,
report them too, rather than suppressing them on the grounds that "this isn't related
to accessibility."

## Steps

### 1. Understand the target

If a file path, glob, or directory is specified as an argument, treat that as the
target. If not specified, ask the user what the target should be.

Next, trace the target's imports to understand the component structure. **Follow the
procedure in `references/component-tracing.md`.** Present the traced result to the
user as a component tree, make the scope of the check explicit, and then proceed.

Also, understand what the target screen is for. Judging severity requires knowing
"the page's primary purpose," and severity cannot be judged without understanding
that purpose. If it cannot be read from the code, ask the user.

- Who uses it (the general public, or only registered users)
- The intended device (PC, smartphone, tablet)
- The purpose of use (submitting a form, viewing information, carrying out work
  tasks)
- The operation flow (the order of screen transitions, the order of operations,
  system behavior)

### 2. Enumerate state variations

**Skipping this step results in a check that only looks at the initial display.
Always do this.**

Enumerate all displays that branch based on conditionals, state, props, permissions,
or the presence/absence of data.

- Opening/closing of modals, dialogs, dropdowns, menus, accordions
- Loading, error, empty states, and display differences based on permissions
- Form validation error display, submitting, submission complete
- Display branches from responsive design (mobile UI is a separate check target from
  PC UI)

The following check points are applied **to each of the enumerated states**.

### 3. Apply the check points

Read the check point tables in `references/` and apply the check points where
`Verification method:` is `code` or `both`.

- `references/checklist-semantics.md` — Machine readability (produces the most
  findings)
- `references/checklist-keyboard.md` — Keyboard operation
- `references/checklist-visual.md` — Visual / mouse operation
- `references/checklist-reflow.md` — Zoom, text size, window size
- `references/checklist-spec.md` — Issues that can be judged from the spec

**Process by check point, not by file.** Reading files one after another makes it
easy to miss check points. Work through the check point table from the top, and for
each check point, use Grep to search across the target scope.

Refer to `references/framework-notes.md` depending on the framework or library in
use. It describes typical framework-specific issues and how to detect them.

For each check point, record the result as one of four values: `issue found` /
`no issue` / `cannot be determined` / `not applicable`. **Never write "not applicable"
as "no issue."**

### 4. Calculate contrast ratios

For places where the color is statically determined (Tailwind classes, CSS
variables, design tokens, CSS-in-JS literals), calculate the ratio using the
bundled script. **Never judge it by eye or by mental arithmetic.**

```
node <skill's directory>/scripts/contrast.mjs "#767676" "#ffffff"
node <skill's directory>/scripts/contrast.mjs "#767676" "#ffffff" --size 24 --bold
```

`<skill's directory>` is the directory where this SKILL.md is located (e.g.
`.claude/skills/a11y-check-code`). Note that this is not a path relative to the
working directory.

To check multiple combinations at once, you can pass an array of pairs to `--json`.

```
node <skill's directory>/scripts/contrast.mjs --json \
  '[{"label":"body text","fg":"#767676","bg":"#fff"},{"label":"caption","fg":"#aaa","bg":"#fff"}]'
```

See `--help` for usage details.

Places where the color is determined at runtime are treated as "cannot be determined"
and deferred to verification on the live page.

### 5. Output the report

Output a Markdown file in the format from `references/report-format.md`. Follow the
procedure in `references/severity.md` for judging severity. **Never factor in how
many users are affected.**

For reports targeting source code, always observe the following.

- Include `file path:line number` on every finding
- State clearly in "Steps not performed" that verification on the live page
  (axe-core, zoom, actual focus order, screen reader) was not performed
- At the end of "Needs further verification," generate handoff instructions for
  `a11y-check-page`, in a form that lists the target URL (blank if unknown) and
  the IDs of the check points that should be verified with priority

Output only a summary into the conversation.

## When in doubt

- **Never assert something based on a guess.** Something like "`aria-label` is
  present, but whether it matches the displayed text depends on the runtime value"
  should be separated out as an item needing verification, not as a finding
- **Correctness depends on the target's purpose.** What counts as a correct
  implementation varies with the page's content and purpose. When it cannot be
  judged from the code alone, list it in the report as a question for the author
  to confirm
- **Never assert a library's internal implementation based on a guess.** For
  direct dependencies (`dependencies`), it is fine to check the **props contract**
  (whether `label` is required, whether `aria-*` is forwarded, etc.) via type
  definitions or JSDoc, but **never infer the rendered DOM from that and write
  "no issue."** Whether the implementation is adequate also varies by version.
  When a library-caused check point is not certain, defer it to "needs further
  verification" and prompt verification on the live page. Follow
  `references/component-tracing.md` for the detailed scope
</content>
</invoke>
