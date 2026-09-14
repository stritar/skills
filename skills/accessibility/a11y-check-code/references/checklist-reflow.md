# Check point list: Zoom, text size, and window size changes

Enlarging the screen or changing the text size can break the layout, or
hide text or UI. It can also switch the display to a smartphone or tablet
layout. Because this can also interfere with mouse-pointer or keyboard
operation, it is not enough to simply switch the display — depending on
the situation, **operation must also be tried while in that state**.

---

### RFL-01: Browser zoom (200%)

- WCAG: SC 1.4.4 (AA)
- Verification method: `both`
- Judgement: there is no problem using the page when displayed at 200%
  with the browser's zoom function.
  - Content does not overlap or get cut off
  - All operable elements are reachable and operable
  - The user is not forced into horizontal scrolling (check together with
    RFL-03)
- Determination from `code`: look for fixed-size specifications that
  don't follow zoom (fixed px `width` / `height`, a fixed-height
  container with `overflow: hidden`, height calculations dependent on
  `vh`). Also check whether `<meta name="viewport">` specifies
  `user-scalable=no` or `maximum-scale=1` (this itself prevents zooming
  and is therefore an issue on its own).
- Severity guideline: Major if a low-vision user viewing the page zoomed
  in cannot read the content or operate it.

### RFL-02: Browser font-size change

- WCAG: SC 1.4.4 (AA)
- Verification method: `both`
- Judgement: there is no problem using the page when the browser's font
  size setting is set to 32.
  - It is desirable that the text size actually change. However, some
    pages are built to keep the same display regardless of the font-size
    setting (in that case, this setting reveals no problem)
  - When text is enlarged, it does not overflow its container or get
    truncated
- Determination from `code`: look for `font-size` fixed in `px` (which
  does not follow the browser's font-size setting), resets such as `html
  { font-size: 62.5% }`, fixed heights on containers holding text, and
  truncation via `overflow: hidden` or `text-overflow: ellipsis`. Even
  when `rem` is used, if `html`'s `font-size` is fixed in px, it will not
  follow the setting.
- Severity guideline: Major if text is cut off and unreadable. Normal if
  the layout is merely somewhat broken.

### RFL-03: Reflow (320px width / 256px height)

- WCAG: SC 1.4.10 (AA)
- Verification method: `both`
- Judgement: at a browser width of 320px for vertically scrolling
  content, or a height of 256px for horizontally scrolling content,
  two-dimensional scrolling (both vertical and horizontal) does not
  occur, except for content that requires it by its nature (large
  diagrams, maps, data tables, etc.).
  - The main point of this check is to verify whether the page is
    so-called "responsive"
  - Google Chrome cannot resize its window to this width, so use the
    Device toolbar in developer tools (in Playwright, it can be
    specified directly with `browser_resize`)
- Determination from `code`: check for fixed-width containers,
  `min-width` specifications, layouts that assume horizontal scrolling,
  and whether media queries' smallest breakpoint covers 320px.
- Severity guideline: Major if the user is forced into two-dimensional
  scrolling and cannot read the content.

### RFL-04: Text spacing

- WCAG: SC 1.4.12 (AA)
- Verification method: `page` (with `code`, only as far as estimating
  the implementation that would cause a problem)
- Judgement: content or functionality is not lost even when text spacing
  is changed as follows.
  - Line height (leading) set to at least 1.5 times the font size
  - Spacing following paragraphs set to at least 2 times the font size
  - Letter spacing (character spacing) set to at least 0.12 times the
    font size
  - Word spacing set to at least 0.16 times the font size
- Note: since this cannot be checked with the browser alone, check it
  using the [Hiraku Web](https://ymrl.github.io/hiraku-web/) extension, a
  bookmarklet, or CSS injection.
- Determination from `code`: look for fixed heights on elements
  containing text, `overflow: hidden`, places that fix `line-height` with
  `!important`, and button or tab labels that assume they fit on one
  line.
- Severity guideline: Major if text is cut off and unreadable. Normal
  otherwise.

### RFL-05: Operation while zoomed in or out

- WCAG: (a check point to complement the checks in RFL-01 through RFL-04)
- Verification method: `page`
- Judgement: the main operations by mouse pointer and keyboard can be
  performed while remaining in the display states changed above.
  - When the display switches to a mobile layout, UI different from the
    PC layout appears, such as a hamburger menu. These are subject to a
    separate check (even if the PC layout has already been checked, the
    mobile layout's UI has not)
  - When zoomed in, a fixed header can occupy most of the screen, making
    content or the focus position invisible (related to KBD-09)
- If new UI is found through this check point, apply the VIS / KBD / SEM
  check points to that UI as well.
- Severity guideline: judged by the severity of the issue actually found.
