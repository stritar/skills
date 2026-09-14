# Checklist: Machine readability

The check point for whether assistive technology (such as screen readers) can correctly
read the content, structure, and state of the content. On a live page, check with the
Accessibility Visualizer extension or the accessibility tree; in source code, check the
markup.

**Checks performed by this skill are not a substitute for checking with an actual screen
reader.** Even when the accessibility tree or markup looks valid, issues can occur in
actual screen reader announcement. State clearly in the report that "checking with an
actual screen reader was not performed."

---

### AXE-01: Automated check with axe-core

- Verification method: `page`
- Judgement: Run axe-core and check `violations`. Target tags are
  `wcag2a` `wcag2aa` `wcag21a` `wcag21aa` `wcag22aa` `best-practice`.
  - Best-practice items do not immediately mean a violation of a WCAG success criterion,
    but treat them as indicating a possibility that the state actually is a violation, or
    that it is causing the user some inconvenience
  - When the screen changes depending on state (menu open/close, modal dialog display,
    etc.), **run it each time**
  - `incomplete` items are ones that "could not be determined automatically"; hand them
    off to a later step as targets for manual verification. In particular, always check
    contrast-ratio `incomplete` items in VIS-09
- Note: the axe-core documentation and axe DevTools explanations **also introduce poor
  fixes**. Do not copy them verbatim as the suggested fix; work out a fix yourself that
  fits the purpose of the target.
- Even when axe-core is run in CI/CD, missing configuration and incomplete coverage of
  display states are common, so the person doing the check should run axe-core again
  themselves.

---

### SEM-01: Alternative text for images

- WCAG: SC 1.1.1 (A)
- Verification method: `both`
- Judgement: Images have concise, necessary and sufficient alternative text.
  - Purely decorative images, and other images that can be judged to have no effect at
    all on the user even if they cannot be perceived, do not need alternative text
  - When an icon image is placed immediately next to text that states what the icon
    represents, and giving the icon alternative text would duplicate that same text,
    alternative text is not needed
  - Images that do not need alternative text should be hidden from assistive technology
    (`alt=""`, `aria-hidden="true"`, etc.). **Omitting the attribute entirely is wrong**
  - As a guideline, alternative text length for Japanese is up to about 80 characters.
    This need not be followed strictly, but if it is far too long, consider placing it as
    regular text instead
  - The [Alt Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/ja) is
    useful for making this judgement
- Judging from `code`: look for missing `alt` on `<img>`, meaningless values such as
  `alt="image"` (including its Japanese equivalent), ones with the filename entered
  verbatim, meaningful
  `<svg>` elements missing `role="img"` and an accessible name, and meaningful images
  expressed with CSS `background-image`. Judge whether the **content** of the alternative
  text is appropriate from the surrounding context. When this cannot be judged, mark it
  "cannot be determined" and list it as a question for the author.
- Severity guideline: Major if the image conveys information or is an interactive
  element. Minor if it is merely a decorative image that has unnecessary alternative
  text.

### SEM-02: Info and relationships

- WCAG: SC 1.3.1 (A)
- Verification method: `both`
- Judgement: Structure and relationships that are expressed visually are also expressed
  in the markup so that assistive technology can read them.
  - Anything that looks like a heading is a heading element (`<h1>`–`<h6>`). Heading
    levels are not skipped
  - Anything that looks like a bulleted or numbered list is a list element (`<ul>` `<ol>`
    `<dl>`)
  - Anything that looks like a table is a `<table>`, header cells are `<th>`, and `scope`
    is specified where needed. `<table>` is not used for layout purposes
  - Grouped input fields (such as a set of radio buttons) are grouped with `<fieldset>`
    and `<legend>`, or the equivalent `role="group"` with an accessible name
  - Emphasis is expressed with `<strong>` `<em>` (not bold/italic that is only visual)
- Judging from `code`: look for visual-only headings such as `<div class="heading">`,
  pseudo-lists made by lining up `<br>`, layout done with `<table>`, and emphasis
  expressed only with `font-weight: bold`.
- Severity guideline: Major if the structure cannot be read and the content cannot be
  understood. Normal otherwise.

### SEM-03: Associating input fields with labels

- WCAG: SC 1.3.1 (A)
- Verification method: `both`
- Judgement: Input fields such as `<input>` `<textarea>` `<select>` should have visible
  text indicating their purpose, and in that case an accessible name is given by
  associating it with, for example, a `<label>`.
  - Use a `<label for="...">` matched to an `id`, or wrap the field in a `<label>`
  - Giving an `aria-label` wording that differs from the visible label becomes an SEM-08
    issue
  - A `placeholder` does not substitute for a label (it disappears once typed into, and
    its contrast is often low)
- Judging from `code`: look for `<label>` elements whose `id`/`for` do not match, input
  fields with no label, and input fields with only a `placeholder`. When the field is
  implemented as a component, trace into the implementation to check whether the `id` is
  auto-generated and correctly associated.
- Severity guideline: Major as a rule, because the user cannot tell the field's purpose
  and cannot complete the form.

### SEM-04: Meaningful sequence

- WCAG: SC 1.3.2 (A)
- Verification method: `both`
- Judgement: When the order of content is meaningful, it is written (announced by the
  screen reader) in that order.
- Judging from `code`: look for places where the DOM order and the visual order diverge
  because of CSS `order`, `flex-direction: *-reverse`, reordering via `grid-row` /
  `grid-column`, or positioning with `position: absolute`. This often has the same cause
  as KBD-07 (focus order).
- Common problem: for example, with two vertical columns where the first column lists
  item names and the second column lists the content tied to each item name, if a run of
  item names is followed by a run of content, the association between each item name and
  its content cannot be recognized. In this case, the items should be ordered
  name-then-content (and an appropriate `role` or WAI-ARIA attribute should also be set
  separately).
- Severity guideline: Major if the content cannot be understood in the reading order.

### SEM-05: Purpose of input (autocomplete)

- WCAG: SC 1.3.5 (AA)
- Verification method: `code`
- Judgement: `<input>` `<textarea>` `<select>` fields that collect information about the
  user themselves have an appropriate `autocomplete` attribute specified.
  `autocomplete="off"` must not be set unnecessarily.
  - This covers name, email address, phone number, address, date of birth, credit card
    information, username, password, and the like
  - Choose the value from the
    [HTML spec's autofill field name](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)
    list (`name` `email` `tel` `postal-code` `street-address` `current-password`
    `new-password`, etc.)
- Judging from `code`: look for missing `autocomplete` on applicable fields,
  `autocomplete="off"` being set, and invalid values being set.
- Common problem: `autocomplete="off"` set on a password field for supposed security,
  which gets in the way of using a password manager (this is also an SPEC-03 issue).
- Severity guideline: Normal, because it increases the input burden for users who rely on
  autofill. Major for a password field.

### SEM-06: Images of text

- WCAG: SC 1.4.5 (AA)
- Verification method: `both`
- Judgement: Text is not displayed as an image, except where essential (logotypes,
  things showing a paper document, text within a diagram, etc.).
- Judging from `code`: look for places where a heading or button label is an image. When
  text has been turned into an image, its contrast ratio cannot be detected by axe-core,
  so it also becomes a target for manual verification under VIS-09.
- Severity guideline: Normal, because the text blurs and becomes unreadable when zoomed
  in, and its color cannot be changed.

### SEM-07: Landmarks and headings

- WCAG: SC 2.4.1 (A) / SC 1.3.1 (A)
- Verification method: `both`
- Judgement: The page has landmarks and headings set appropriately. In particular, the
  part specific to that page — not the parts common to multiple pages, such as
  navigation — is the `main` landmark, and a heading is placed at its start.
  - There is exactly one `<main>` per page. `<header>` `<nav>` `<aside>` `<footer>`
    `<search>` are used appropriately
  - When there are multiple landmarks of the same type, make them distinguishable with
    `aria-label` or similar
  - Headings represent the page's structure. They start at `<h1>` and do not skip levels
  - A skip link ("Skip to main content") makes it easy to bypass repeated blocks
- Judging from `code`: check whether `<main>` is present and how many there are,
  header/navigation built with `<div>`, skipped heading levels, and missing or duplicate
  `<h1>`.
- Severity guideline: Normal, because it makes reaching the main content harder. Major if
  there are no landmarks and no headings at all.

### SEM-08: Label in name

- WCAG: SC 2.5.3 (A)
- Verification method: `both`
- Judgement: When a component such as an input field or button has a visible text or
  text-image label, that component's accessible name **includes** the visible label.
  - Best practice is to use the visible label as the accessible name as is. To that end,
    use `<label>` for `<input>` `<textarea>` `<select>`, and use `aria-labelledby` for
    ones implemented with other elements
- Judging from `code`: look for elements where an `aria-label` different from the visible
  text is specified. For example, `<button aria-label="Submit">Apply</button>` cannot be
  operated by a voice-input user who says "Apply."
- Severity guideline: Major, because voice-input users cannot operate it.

### SEM-09: Language of page

- WCAG: SC 3.1.1 (A)
- Verification method: `code`
- Judgement: The page's default language is declared in a machine-readable form via the
  `lang` attribute on the `<html>` element.
  - You can confirm this declaration is working correctly by using a screen reader whose
    language engine switches based on the `lang` attribute. If it is not correctly
    declared, the screen reader announcement becomes unnatural, or stops announcing
    altogether. However, this does not happen with VoiceOver on macOS or iOS, so it
    cannot be checked this way
  - The Accessibility Visualizer can display the set value as "Page language"
- Judging from `code`: whether `<html lang="...">` is present and its value. **HTML
  templates often default to `en`, and it is common for a Japanese page — which should
  declare `ja` — to be left at `en`.** For SPAs and frameworks, check the layout file or
  configuration (Next.js's `app/layout.tsx`, Nuxt's `nuxt.config`, etc.).
- Severity guideline: Major, because the screen reader announcement becomes
  unintelligible.

### SEM-10: Language of parts

- WCAG: SC 3.1.2 (AA)
- Verification method: `code`
- Judgement: When a language other than the default language appears within the page,
  the language of that part is declared in machine-readable form via the `lang`
  attribute on that element.
  - The method of judgement is the same as SEM-09
  - The Accessibility Visualizer can display the set value in the "Language" chip
  - Proper nouns and words that have been absorbed into the surrounding language are not
    in scope
- Severity guideline: Normal, because the affected part becomes unintelligible. Major if
  the amount is large.

### SEM-11: Name, role, value

- WCAG: SC 4.1.2 (A)
- Verification method: `both`
- Judgement: HTML elements and WAI-ARIA roles/attributes used fit their purpose, and they
  are in a state where a screen reader or similar can correctly read them in line with
  the page's purpose.
  - Name (accessible name): every operable element has a name that makes clear what it
    does
  - Role: expressed with the appropriate element or `role`, such as `<button>` for a
    button and `<a href>` for a link
  - Value/state: open/closed state (`aria-expanded`), selected state (`aria-selected` /
    `aria-current`), checked state (`aria-checked`), disabled state (`disabled` /
    `aria-disabled`), error state (`aria-invalid`), and the like are machine-readable and
    match the visual presentation
- Supplementary note: **this cannot be detected by a grammar checker or an accessibility
  checker such as axe-core alone; it must be confirmed, based on the page's purpose,
  whether the correct thing is being used.** Reading every part of the page and
  operating every part of it with a screen reader is the most reliable approach, but
  checking from the source code, or looking for anything odd with the Accessibility
  Visualizer, can substitute for it. However, this requires knowledge and experience, and
  oversights easily occur. What counts as the "correct" state depends heavily on the
  page's content and purpose, so there are cases where the author must be asked whether a
  given state is correct.
- Judging from `code`: look for the following.
  - Buttons, links, and checkboxes implemented with `<div>` `<span>`
  - Elements that have a `role` but are missing the attributes or keyboard behavior that
    role requires (`role="button"` without `tabindex` and a keyboard handler,
    `role="tab"` without `aria-selected`, `role="dialog"` without an accessible name, and
    so on)
  - Things that open and close (accordions, dropdowns, hamburger menus) missing
    `aria-expanded`
  - The `id` referenced by `aria-labelledby` / `aria-describedby` does not exist, or is
    not resolved because it crosses a Shadow DOM boundary
  - Nonexistent roles or misspelled attribute names (typos such as `aria-labeledby`)
  - A focusable element inside `aria-hidden="true"`
- Severity guideline: Major if the role or state of an operable element is not conveyed
  and it cannot be operated. Critical if it concerns the page's main purpose.

### SEM-12: Status messages

- WCAG: SC 4.1.3 (AA)
- Verification method: `both`
- Judgement: Status messages (content changes that convey information such as the
  success or result of an action, an application's waiting-for-processing state,
  progress of a process, or the presence of an error, without a page navigation or major
  change) are announced to assistive technology such as a screen reader.
  - Announcements often use a WAI-ARIA live region (`role="status"` `role="alert"`
    `aria-live`). Confirm with a screen reader or the Accessibility Visualizer that an
    announcement recognizable as a change is made
  - Live-region behavior differs considerably between screen readers. When a focus move
    happens at the same time as the change, the live-region announcement often fails to
    be read out
- Judging from `code`: look for the following.
  - Whether toasts, snackbars, form submission results, search result counts, validation
    errors, and loading indicators have a live region specified
  - Whether the live-region element **already exists in the DOM before the content to be
    announced is inserted** (inserting the whole element afterward often results in no
    announcement)
  - Whether `role="alert"` is overused (too many interruptions makes it hard to use)
- Severity guideline: Major, because the user cannot tell whether the action succeeded.
  Normal for a supplementary notification.
