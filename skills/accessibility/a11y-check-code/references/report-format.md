# Report format

Output the check results as a Markdown file, and output only a summary into the
conversation.

## Output location

```
./a11y-report/YYYY-MM-DD-<target-name>.md
```

- `<target-name>` is a component name or directory name for a source-code target, or an
  easily identifiable name derived from the path for a live-page target (example:
  `2026-07-20-checkout-form.md`, `2026-07-20-settings-notifications.md`).
- When a file of the same name already exists, do not overwrite it; append a sequence
  number.
- Create the `a11y-report/` directory if it does not exist. When saving screenshots for a
  live-page check, place them in `a11y-report/assets/` and reference them from the report
  with a relative path.

## Output into the conversation

Output only the following into the conversation. Do not list every finding in the
conversation (it becomes long and ends up not being read).

- The report file's path
- Counts by severity
- A list of the titles of Critical and Major findings
- The count of items "needs further verification," and the especially important ones
- If any steps could not be performed, a note of that

## Report structure

````markdown
# Accessibility check results: <target>

## Target and work performed

- Target: <URL, or list of file paths>
- Date performed: <YYYY-MM-DD>
- Method: <a11y-check-code / a11y-check-page, tools used and their versions>
- Screens/states checked: <list, by state such as modal open/closed or error display>

### Steps performed

<The range of check points that were checked>

### Steps not performed

<List with the reason each was not performed. Always state explicitly whether the
following apply>

- Checking with an actual screen reader: not performed
- Checking in high contrast mode: not performed
- <Anything that could not be performed due to the nature of the target>

## Summary

| Severity | Count |
| --- | --- |
| Critical | 0 |
| Major | 0 |
| Normal | 0 |
| Minor | 0 |

Needs further verification: 0 items

## Findings

### [Major] A-001 Modal dialog cannot be closed with the Esc key

- **Check point**: KBD-05 (WCAG SC 2.1.2 Level A)
- **Location**: `src/components/SettingsDialog.tsx:48` / `dialog.settings-modal`
- **Originating phase**: Implementation
- **Problem for the user**:
  A keyboard-only user has no way to close the dialog after opening it. The close button
  is inside the dialog, but it cannot be reached because focus escapes outside the
  dialog, leaving the user unable to proceed past this screen.
- **Suggested fix**:
  <The specific fix. Include a code example where one can be given>
- **Evidence**: Manual check (keyboard operation) / axe-core rule: <rule ID>

<List the rest in descending order of severity>

## Needs further verification

Check points that could not be determined with this method. The following is needed to
verify them.

| Check point | Description | Verification method needed |
| --- | --- | --- |
| VIS-09 | Contrast ratio of text over the hero image | Measurement on the live page |
| SEM-01 | Whether the content of `hero.png`'s alternative text is appropriate | Confirmation with the author |

## Severity definitions

| Severity | Definition |
| --- | --- |
| Critical | The problem causes an issue that is not confined to viewing that page |
| Major | The problem prevents the page's main purpose from being achieved |
| Normal | The page's main purpose can still be achieved despite the problem, but the user is inconvenienced |
| Minor | Resolving the problem lets the user use the page more comfortably |

Severity judgement does not take into account how many users are affected. Those
affected by accessibility problems are always a minority, and even if only a single
person ends up unable to achieve their purpose, it is treated as a problem.

## List of check points reviewed

<A table recording, for each check point ID, Issue found / No issue / Cannot be
determined / Not applicable>

| Check point | Result | Notes |
| --- | --- | --- |
| SEM-01 | Issue found | A-003, A-007 |
| SEM-02 | No issue | |
| SEM-05 | Not applicable | No fields collecting personal information |
| VIS-09 | Cannot be determined | Color is decided at runtime, so checking on the live page is required |

## About this check

The purpose of this check is to find accessibility problems that should be addressed as
a priority. This check is not exhaustive.

- Performing this check does not confirm or guarantee compliance with any WCAG 2.2
  criterion
- No issues being found in this check does not mean there are no issues at all
- Confirming compliance with standards such as WCAG 2.2, ISO/IEC 40500, or JIS X 8341-3
  requires checking against each success criterion individually

The check's criteria target WCAG 2.2 Level AA as a guideline.

Note that these results also include general usability problems that go beyond
accessibility, and things that cause no real harm but go against specifications or best
practices such as HTML or WAI-ARIA. The former is likely due mainly to insufficient
consideration during design, and the latter mainly to implementation mistakes or lack of
knowledge.
````

## How to write a finding

Each finding must always include the following four items.

1. **The content of the problem found** — shown with a title and the location.
2. **The problem's severity** — determined following the procedure in `severity.md`.
3. **A concrete example of the problem on the user's side** — write specifically **who
   is unable to do what**, in the manner of "a screen reader user cannot perceive that
   this element is a button." Do not write an explanation that is just a rewording of
   the success criterion's text.
4. **A suggested fix** — suggest a fix that fits the target's purpose. Do not copy
   axe-core's documentation suggestions verbatim (since it also introduces poor fixes).

### Finding ID

Assign a sequence number like `A-001`. This is to make it easy to reference within the
report; it does not need to be unique across reports.

### How to group findings

- When there are many instances of the same kind of problem from the same cause, group
  them into a single finding and list the locations ("12 places with images lacking
  alternative text"). However, split ones with different severities apart
- Conversely, when a single location has multiple different problems, write them
  separately by check point
- Do not write a guess as a certainty. Move anything that has not been confirmed to
  "needs further verification"

## What must not be output

- Credentials such as login information, tokens, session IDs, and personal information
- Data belonging to real users
- Statements that write unconfirmed content as if it had been confirmed
