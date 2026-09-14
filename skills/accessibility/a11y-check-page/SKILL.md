---
name: a11y-check-page
description: Performs an accessibility check (a11y check) on a live web page. Operates the browser via Playwright MCP to run automated checks with axe-core, keyboard operation, zoom and reflow, and accessibility tree checks against WCAG 2.2 level AA as a guideline, and outputs a report with severity ratings. Pages that require login can also be checked if credentials and steps are provided. Used for things like "check the accessibility of this URL" or "log in and run an a11y check on the admin screen". Use for accessibility (a11y) audit of a live web page via browser automation against WCAG 2.2 AA.
---

# Accessibility check for a live page

Actually operate the page in a browser and find the issues that should be prioritized for
accessibility. The standard used is WCAG 2.2 level AA as a guideline.

## Confirm the prerequisites

This skill uses **Playwright MCP**. First confirm that tools equivalent to
`browser_navigate` `browser_snapshot` `browser_click` `browser_evaluate` `browser_resize`
`browser_press_key` `browser_take_screenshot` are available.

If they are not available, guide the user with the following and stop the check. Never
perform a check based on guesswork without the tools.

```
claude mcp add playwright npx @playwright/mcp@latest
```

## Understand the limits of this check first

There are things that cannot be judged even from a live page. **Never write about something
that could not be judged as if it had been judged.**

- Actual reading-out on real screen reader hardware (the accessibility tree is not a
  substitute)
- Display under high-contrast mode (forced colors mode)
- Screen rotation, touch operation, and multi-pointer gestures on a real device
- The validity of the **content** of video captions or audio descriptions
- Judgment against the general flash threshold and red flash threshold
- Time limits (those requiring a long elapsed time)

State these in the report as "steps not performed" or "needs further verification".

Also report general usability issues that go beyond accessibility, and things that violate
HTML or WAI-ARIA specifications or best practices even if they cause no actual harm, when
found.

## Steps

### Where to save screenshots (common to all steps)

**In every step, screenshots must always be saved under `a11y-report/assets/`.**
There are occasions to take screenshots regardless of step — visual verification, keyboard
operation, reflow verification, and so on — and all of them follow the same rule.
`browser_take_screenshot` scatters files into the working directory (the current directory)
if `filename` is not specified, so **every call must explicitly set `filename` to a path
starting with `a11y-report/assets/…`.** This applies without exception, not only to the
final screenshots included in the report but also to ones taken temporarily to extract a
color or check for broken layout. If the directory does not exist, run
`mkdir -p a11y-report/assets` first. See "Screenshots" in
`references/playwright-workflow.md` for details.

### 1. Confirm the target and scope of work

Read the target URL, login information, steps to reach the target screen, and areas of
focus from the arguments.

```
/a11y-check-page Log in to https://app.example.com/ with ID:test@example.com / Pass:xxxx,
                 and check the notification tab of the settings screen
```

Among the items that cannot be read from the arguments, ask the user only about those
needed for the check.

- The target URL and the scope of the check (a single page, or an entire operation flow)
- Whether login is required, the credentials, and whether multi-factor authentication is
  used
- Steps to reach the target screen (which links to follow, required input values)
- The expected users and devices (PC only, or including smartphones as well)
- **Whether destructive operations are permitted** (creating, changing, or deleting data;
  submitting forms; sending email; billing)
- Whether the target is a production environment

**Follow `references/auth-and-safety.md` for the safety rules on credentials and browser
operation. For a check involving login, always read this file first.**

### 2. Understand the structure and purpose

Open the target with `browser_navigate`, get the accessibility tree with `browser_snapshot`,
and understand the page's structure and operable elements. Visit related pages as well if
needed.

Judging severity requires "the page's primary purpose". Severity cannot be judged without
understanding the purpose.

- What kind of people use it
- The purpose of use (submitting a form, browsing information, or carrying out work tasks)
- The flow of operation, branching, and the placement of mechanisms that accept user input

### 3. Enumerate state variations

**Skipping this step turns the check into one that only looks at the initial display. Always
do it.**

Enumerate all the screens and states that should be checked.

- Menus, modal dialogs, dropdowns, accordions, and tabs that open and close
- Loading, error display, empty state, search results present/absent
- Form validation errors, submitting, submission complete
- PC display and mobile display (when the UI changes responsively, the mobile UI is a
  separate check target)

**When the target spans multiple pages or multiple states, build the steps "per screen",
not "per tool".** That is, each time one screen/state is displayed, perform steps 4 through
8 below together for it. Only when the target is a single page with no state changes may you
proceed tool by tool.

### 4. Automated check with axe-core

Run axe-core using the bundled `assets/axe.min.js`. **Follow "Running axe-core" in
`references/playwright-workflow.md` for the procedure.** For the initial display or states
that can be reproduced with a URL, the bundled `scripts/run-axe.mjs` (run from Bash) is
reliable and fast. For screens whose state has been changed, such as an opened modal, inject
and run it via Playwright MCP.

`violations` are candidate issues, and `incomplete` are items that could not be judged
automatically; check these manually in a later step. In particular, always check the
`incomplete` items for contrast ratio in step 5.

**Run it again every time the state changes.** States such as an opened modal or a displayed
error are not included in the initial-display check.

Do not copy the fix suggestions in axe-core's descriptions verbatim (poor fixes are also
included among them). Work out a fix that matches the target's purpose yourself.

### 5. Visual and mouse-pointer operation

Apply the `page` and `both` check points from `references/checklist-visual.md`.
Take screenshots and check the behavior of additional content shown on hover, information
conveyed by color alone, and the means of stopping autoplay or motion.

### 6. Keyboard-only operation

Apply the `page` and `both` check points from `references/checklist-keyboard.md`.
**Always perform this as a step independent of mouse operation.** Follow "Checking keyboard
operation" in `references/playwright-workflow.md` for the procedure.

Move in both directions — to the end of the page with `Tab`, and back to the start with
`Shift+Tab` — and at each step check the focus position and the visibility of the focus
indicator. To walk through many elements at once, the bundled `scripts/focus-walk.mjs`
(also the reverse direction with `--reverse`) is convenient.

### 7. Changing zoom, text size, and window size

Apply the check points from `references/checklist-reflow.md`. The CSS to inject and the
viewport settings are in `references/injection-snippets.md`.

Do not just switch the display — **also try operating it while in that state**. If switching
to mobile display brings up a new UI (such as a hamburger menu), that UI has not yet been
checked, and steps 4 through 6 must be applied to it again.

### 8. Machine-readability check

Apply the check points from `references/checklist-semantics.md`. From the accessibility
tree obtained via `browser_snapshot`, check the landmark and heading outline, accessible
names, roles, and states. The method for checking `lang` and live regions is in
`references/playwright-workflow.md`.

For status messages (SEM-12), compare the accessibility tree before and after the operation
to check whether the implementation notifies via a live region.

### 9. Output the report

Output a Markdown file in the format given in `references/report-format.md`. Follow the
procedure in `references/severity.md` for judging severity. **Do not take the number of
affected users into account.**

For a report on a live page, always observe the following.

- For each finding, record information that identifies the element (CSS selector,
  accessible name, position on screen)
- Save all screenshots, both the ones included in the report and the ones used for
  temporary verification, under `a11y-report/assets/` (explicitly set that path in the
  `filename` of `browser_take_screenshot` every time). Do not save to the current directory
- In "steps not performed", state clearly that verification with real screen reader hardware
  and with high-contrast mode was not performed
- **Do not output credentials in the report, screenshots, or conversation**
- Record the browser and viewport size used, and the axe-core version

Output only a summary in the conversation.

## About each check point

Record the result of each check point as one of four values: `issue found` / `no issue` /
`cannot be determined` / `not applicable`.
**Never write "not applicable" as "no issue".**

See `references/README-checklist.md` for how to read the check point table.
This skill handles check points whose `Verification method:` is `page` or `both`.
