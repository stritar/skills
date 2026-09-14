# How to read the check point lists

The `checklist-*.md` files in this directory are lists of the check
points verified in an accessibility check. Both the `a11y-check-code` and
`a11y-check-page` skills share the same files.

## Check point IDs

| Prefix    | Scope                                                    | File                     |
| --------- | --------------------------------------------------------- | ------------------------ |
| `SPEC-nn` | Issues that can be judged from the specification         | `checklist-spec.md`      |
| `VIS-nn`  | Visual verification and mouse pointer operation           | `checklist-visual.md`    |
| `KBD-nn`  | Keyboard-only operation                                    | `checklist-keyboard.md`  |
| `RFL-nn`  | Zoom, text size, and window size changes                  | `checklist-reflow.md`    |
| `SEM-nn`  | Machine readability (markup / accessibility tree)          | `checklist-semantics.md` |
| `AXE-nn`  | Automated checks by axe-core                               | `checklist-semantics.md` |

The ID is an identifier referenced in reports and in the handoff between
the two skills, and **must not be changed**. When adding a check point,
append it at the end without renumbering existing ones.

## Verification method tags

Each check point carries a `Verification method:` tag.

- `code` — can be determined from source code
- `page` — can only be determined on the running page
- `both` — can be partially determined from both; cross-checking
  increases accuracy

**A skill processes only the check points whose tags it can handle.**

- `a11y-check-code` handles `code` and `both`
- `a11y-check-page` handles `page` and `both`

For a `both` check point, the determination method is written separately
for looking at the code and for looking at the live page.

## Recording each check point

For each check point, record the result as one of the following four
values. Do not write "not applicable" as "no issue".

- `issue found` — listed in the report as a finding
- `no issue` — checked, and there was no issue
- `cannot be determined` — an attempt was made to check it, but it could not be
  determined by this means. Listed under "needs further verification" in
  the report
- `not applicable` — no element or function corresponding to the target
  existed

## About the severity guideline

The "severity guideline" written for each check point is a starting
point and must not be applied mechanically. The actual severity is
judged from the purpose of the target page and the impact the issue has
on the user. See `severity.md` for the determination procedure.
