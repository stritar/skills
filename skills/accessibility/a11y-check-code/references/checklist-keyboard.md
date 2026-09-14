# Checklist: Keyboard-only operation

Keyboard checking **must be done separately from screen reader checking**. This is
because a place that should not be operable by keyboard alone can sometimes be operated
via the key bindings used to control the screen reader itself.

Keyboard focus moves with `Tab` and `Shift` + `Tab`. Often only `Tab` is considered, and
`Shift` + `Tab` can produce unintended results, so checks related to focus are done **in
both directions**.

UI component operation uses the arrow keys, `Enter`, `Space`, `Esc`, and so on. When
custom key behavior is defined, especially when it does not follow OS or browser
conventions, it is desirable that an explanation of it exists.

---

### KBD-01: Additional content (on focus) can be dismissed

- WCAG: SC 1.4.13 (AA)
- Verification method: `both`
- Judgement: When keyboard focus causes additional content such as a tooltip to be
  displayed, it can be hidden without moving focus (e.g. with the `Esc` key). However,
  this does not apply to content conveying an input error, or content that does not hide
  or replace other content.
- Severity guideline: Major if other content stays hidden. Normal otherwise.

### KBD-02: Focus can move into additional content (on focus)

- WCAG: SC 1.4.13 (AA)
- Verification method: `both`
- Judgement: When keyboard focus causes additional content to be displayed and it
  contains something that accepts input, focus can move into it, and the additional
  content keeps being displayed while that happens. However, there is no problem if it is
  made clear that the operations available inside it can also be performed by keyboard
  elsewhere.
- Judging from `code`: check whether the popover is implemented to close immediately on
  `blur`, and whether the elements inside it are focusable.
- Severity guideline: Major if the operations inside it cannot be performed.

### KBD-03: Additional content (on focus) persists

- WCAG: SC 1.4.13 (AA)
- Verification method: `both`
- Judgement: Additional content keeps being displayed until focus is removed, it is
  hidden by the user's intent, or a change occurs that invalidates its content. It must
  not disappear automatically after a period of time.
- Severity guideline: Normal if the content cannot be read to the end. Major if it is
  important information.

### KBD-04: Keyboard access to all functionality

- WCAG: SC 2.1.1 (A)
- Verification method: `both`
- Judgement: All functionality can be operated by keyboard. This excludes, however,
  functionality that depends on the path of mouse pointer movement (such as a drawing
  feature).
  - For this check, perform **a test of trying every operation by keyboard**, separately
    from mouse-pointer-centered operation. If mouse-pointer operation is already covered
    by the regular testing (which does not focus on accessibility), the accessibility
    check may center on keyboard operation
  - Functionality that requires mouse-pointer-specific behavior, such as drag-and-drop or
    mouseover, must provide an alternative means of operation that works with the
    keyboard alone
- Judging from `code`: look for the following.
  - `onClick` / `@click` on non-interactive elements such as `<div>` `<span>` (it cannot
    be operated unless `role`, `tabIndex`, and a keyboard event handler are all present)
  - Things that fire only on `onMouseOver` / `onMouseEnter` and have no `onFocus` handler
  - Operable elements made unable to receive focus with `tabIndex={-1}`
  - `<a>` elements without an `href` (cannot receive focus)
  - Elements disabled with `pointer-events: none` instead of `disabled`
- Severity guideline: Major as a rule, because keyboard users cannot perform that
  function. Critical if the impact extends beyond that page alone — for example, the
  primary keyboard navigation does not work, or the user cannot proceed to the next
  step's page.

### KBD-05: Keyboard traps, and escaping them

- WCAG: SC 2.1.2 (A)
- Verification method: `both`
- Judgement:
  - Keyboard focus is not trapped in a place it cannot get out of using keyboard
    operation alone (this is the requirement of SC 2.1.2)
  - When a dropdown menu or modal dialog opens, it is desirable to temporarily restrict
    focus movement to inside it (setting up an intentional keyboard trap). Further, that
    restriction can be released by common keyboard operations, or the method for doing so
    is announced to the user
- Supplementary note: WCAG does not say that a keyboard trap should be provided for
  dropdown menus or modal dialogs, but it is better to provide one.
- Common release operations expected (none of these is mandatory):
  - The menu or dialog closes with the `Esc` key
  - Menu items can be traversed with `Tab` / `Shift` + `Tab` or the arrow keys
  - Focus can move to the button that opens the dropdown menu, and the menu can be closed
    with `Enter` or `Space`
  - A button for closing the dialog is provided (the label can be "Cancel" too, as long
    as the user can anticipate its behavior; it is often a button with only an X icon),
    and it can be closed by moving focus to it and pressing `Enter` or `Space`
- Judging from `code`: check whether the modal implementation has a focus trap, an `Esc`
  handler, and logic to return focus to the triggering element after closing. When using
  `showModal()` on a `<dialog>` element, much of this is provided by the browser.
- Severity guideline: Critical if the user cannot get out (the whole page becomes
  inoperable). Normal if there is simply no trap and focus escapes outside the dialog.

### KBD-06: Character key shortcuts

- WCAG: SC 2.1.4 (A)
- Verification method: `both`
- Judgement: When, in addition to the browser's standard ones, key bindings (shortcut
  keys) made up only of letters, numbers, or symbols are implemented, at least one of the
  following is met.
  - Can be turned off
  - Can be remapped to include a modifier key
  - Is active only while a specific UI component has focus
- Judging from `code`: look for `keydown` / `keypress` listeners on `document` or
  `window` that handle a single key with no modifier.
- Common problem: a voice-input user merely speaking triggers an unintended function.
- Severity guideline: Major if the consequence of an accidental trigger is serious.
  Normal otherwise.

### KBD-07: Focus order

- WCAG: SC 2.4.3 (A)
- Verification method: `both`
- Judgement: When focus is moved with `Tab` / `Shift` + `Tab`, it moves in an order that
  feels natural to the user.
  - The order is natural when moving from the top to the bottom of the page with `Tab`,
    and from the bottom to the top with `Shift` + `Tab`. Also, focus can move to the same
    elements with `Tab` and `Shift` + `Tab`
  - Focus must not move to something not visually visible, and the focus indicator must
    not become invisible
- Judging from `code`: look for a positive `tabindex` value (should not be used as a
  rule, since it departs from DOM order), divergence between the visual order and the DOM
  order caused by CSS `order` / `flex-direction: row-reverse` / `grid` placement, and
  hidden elements that are merely moved off-screen instead of using `visibility: hidden`
  or `display: none`.
- Severity guideline: Major if focus jumps to an unintended place and the user cannot
  continue operating. Normal if the order is merely unnatural.

### KBD-08: Focus visibility

- WCAG: SC 2.4.7 (AA)
- Verification method: `both`
- Judgement: When focus is moved with `Tab` / `Shift` + `Tab`, or while operating a
  dropdown menu, tab bar, or input field, the focused element always has a clearly
  changed appearance.
  - A typical example is a "focus ring." However, the default `outline` display differs
    between browsers, so either adjust the `outline` style or check the display in the
    major browsers beforehand
  - In high contrast mode, `box-shadow: none` styling is forced. If `outline: none` is
    set at that point, the focus indicator will not be displayed, so it is desirable to
    make `outline` **transparent** rather than hidden
- Judging from `code`: look for `outline: none` / `outline: 0` / Tailwind's
  `outline-none` `focus:outline-none`, and check whether an alternative focus style is
  specified. When the only alternative is `box-shadow`, flag that it disappears in high
  contrast mode.
- Severity guideline: Major as a rule, because the user cannot tell the current position
  and cannot continue operating.

### KBD-09: Focus obscured

- WCAG: SC 2.4.11 (AA)
- Verification method: `page` (with `code`, only as far as inferring the implementation that
  causes it)
- Judgement: An element that has received focus is not completely hidden by other
  content.
  - When there is something that displays on top of the content (a fixed header, fixed
    footer, cookie banner, chat widget), it should be arranged so that the focused
    element is not completely hidden by scrolling, so that it stays visible
  - For a modal dialog, focus should be kept from moving outside the dialog
- Judging from `code`: list `position: sticky` / `fixed` elements and check whether
  avoidance is done with `scroll-margin` / `scroll-padding`. Whether it is actually
  hidden is determined on the live page.
- Severity guideline: Major, because the focus position becomes invisible.

### KBD-10: Change on focus

- WCAG: SC 3.2.1 (A)
- Verification method: `both`
- Judgement: An element merely receiving focus does not trigger a change of context,
  such as navigating to another page, a major change to the page content, or a new
  browser window opening.
- Judging from `code`: look for page navigation, modal display, or form submission
  inside an `onFocus` handler.
- Severity guideline: Major, because merely moving with `Tab` interrupts the user's
  operation.

### KBD-11: Change on input

- WCAG: SC 3.2.2 (A)
- Verification method: `both`
- Judgement: Merely typing into an input field or changing a selection does not trigger a
  change of context, such as navigating to another page, a major change to the page
  content, or a new browser window opening. When such a change is needed, tell the user
  about it beforehand, or provide an explicit button to trigger it.
- Judging from `code`: look for page navigation or form submission in a `<select>`'s
  `onChange`, automatic submission partway through input, and a major display switch in
  `onChange`.
- Common problem: selecting an option in a select box navigates immediately (with the
  keyboard, this navigates partway through arrowing through the options).
- Severity guideline: Major if the user cannot complete the task because of the
  unintended navigation.
