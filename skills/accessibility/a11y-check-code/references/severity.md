# Severity determination

Accessibility check results often make it hard to convey how important a given fix is.
For that reason, issues are organized and conveyed using "severity," making it possible
to triage what should be fixed as a priority.

## Definitions

| Severity | Definition |
| --- | --- |
| **Critical** | The problem causes an issue that is not confined to viewing that page |
| **Major** | The problem prevents the page's main purpose from being achieved |
| **Normal** | The page's main purpose can still be achieved despite the problem, but the user is inconvenienced |
| **Minor** | Resolving the problem lets the user use the page more comfortably |

## Determination procedure

Judge in order from the top, and adopt the first one that applies.

1. Does the problem **affect more than just this page** (the whole site becomes
   inoperable, it triggers a photosensitive seizure, data is lost through an
   unrecoverable mistaken action, the user cannot complete authentication and cannot use
   the service at all, etc.) → **Critical**
2. With the problem present, **can the page's main purpose be achieved?** If not (the
   form cannot be submitted, the content cannot be read, the function cannot be
   performed) → **Major**
3. The purpose can be achieved, but **does the user suffer inconvenience?** → **Normal**
4. Is it merely something that becomes more comfortable once resolved? → **Minor**

What "this page's main purpose" is should be judged based on the target's purpose
grasped in the check's first step. Severity must not be determined without grasping the
purpose.

## The number of users affected must not be taken into account

**This must be strictly followed.**

Those affected by accessibility problems are always a minority. Judgements such as
"Minor because few users are affected" or "Normal because typical users are not
affected" must not be made. Severity is judged solely by **how serious the problem is
for the users who are affected**.

For example, if even a single person among the following is inconvenienced and ends up
unable to achieve the page's purpose, it must be flagged as a problem.

- A user with a hand or arm disability who relies on the keyboard for all operations
- A user with low vision who uses the screen zoomed in
- An older user who has difficulty distinguishing low-contrast colors
- A user with a developmental disability who finds it hard to maintain concentration
- A user with a visual disability who uses a screen reader
- A user with a hearing disability who cannot hear audio

These are only examples, and each person's situation differs. There are also users with
disabilities not listed here. Beyond checks based on guidelines such as WCAG, when they
are actually having difficulty, that fact must be faced directly.

Likewise, severity must not be lowered for the following reasons.

- The fix is technically difficult or costly
- It stems from a library or external service and cannot be fixed by the team itself
- No inquiries have come in from users
- It does not explicitly violate a WCAG success criterion

Write the difficulty of the fix in the report as information independent of severity.
Triage is done by the report's recipient, looking at both severity and the cost of the
fix.

## How to treat the "severity guideline" in the checklists

The "severity guideline" written in each item of the checklists is a starting point, and
must not be applied mechanically. For example, even the same "insufficient contrast
ratio" can be Major for body text but Normal for decorative supplementary text. Actual
severity is judged from the target page's purpose and the impact the problem has on the
user.

When assigning a severity different from the guideline, write the reason in the report.

## The problem's originating phase

The causes that let accessibility problems creep in lie in each of the planning, design,
and implementation phases. For that reason, these problems need to be conveyed to the
people involved in each respective phase. Note the originating phase on each finding
where possible.

| Phase | Examples |
| --- | --- |
| **Planning** | No plan to provide captions for video. Authentication is decided to use only CAPTCHA. A spec with a time limit |
| **Design** | A color combination that does not meet the contrast ratio. A UI that presupposes drag operations. A design that represents state with color alone |
| **Implementation** | Missing `alt`, missing `lang` specification, a click handler on a `div`, `outline: none`, unassociated labels |

Problems in the implementation phase can be fixed by the implementer alone, but problems
in the design and planning phases cannot be fixed by the implementer alone. Having this
distinction in place makes it easier for the report's recipient to move the response
forward.
