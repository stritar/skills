# Verification procedure with Playwright MCP

Tool names may differ depending on the Playwright MCP version. This document uses
representative names, so read them as the actually available tool names.

## Running axe-core

Use the `assets/axe.min.js` bundled with the skill. Do not load it from a CDN
(this is both a supply-chain-attack concern and the reason it is bundled). The path is
relative to this skill's directory, not relative to the working directory.

### Method A: bundled script `scripts/run-axe.mjs` (recommended, for states reproducible
from the initial display or a URL)

`axe.min.js` is about 570KB, and it often cannot be passed to `browser_evaluate` all at
once. If the target is the initial display, or a state reproducible from the URL alone,
running the bundled runner from Bash is reliable.

```
node <skill directory>/scripts/run-axe.mjs <url> [--width 1280] [--height 900] [--out result.json]
```

- The target tags (`wcag2a wcag2aa wcag21a wcag21aa wcag22aa best-practice`) and output
  format are aligned with the snippet below. It loads the bundled `assets/axe.min.js`; no
  CDN is used.
- Playwright and Chromium are found automatically (the same `scripts/browser.mjs` detects
  the browser brought in by Playwright MCP's `playwright-core` or `ms-playwright` cache).
  If it cannot be found, follow the error message.
- `--help` shows all options.

### Method B: inject into Playwright MCP (when the target is a screen whose state has been
changed)

If you want to **create the state via MCP first and then run axe on the spot** — such as
opening a modal or displaying an error — inject and run it. Since it does not become a
separate browser from method A, the state can be kept while inspecting.

1. Read `assets/axe.min.js` with Read, and run its content with `browser_evaluate` to
   define `axe` on the page. Since the file is large, take one of the following approaches.
   - Pass `browser_evaluate` a function that includes the file content, and run it
   - Or, as a way to add a `<script>` element to the page without using `fetch`,
     evaluate the file content as a string with `new Function(source)()`

2. Confirm that `axe` has been defined before running it. This can be checked with
   `typeof axe`.

```js
() => axe.run(document, {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']
  },
  resultTypes: ['violations', 'incomplete']
}).then(r => ({
  violations: r.violations.map(v => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    tags: v.tags,
    nodes: v.nodes.slice(0, 10).map(n => ({
      target: n.target,
      html: n.html.slice(0, 300),
      failureSummary: n.failureSummary
    })),
    total: v.nodes.length
  })),
  incomplete: r.incomplete.map(v => ({
    id: v.id,
    help: v.help,
    nodes: v.nodes.slice(0, 10).map(n => ({ target: n.target, html: n.html.slice(0, 200) })),
    total: v.nodes.length
  })),
  version: axe.version,
  url: location.href
}))
```

The node count is limited to prevent the output from becoming huge on pages with many
findings. `total` gives the overall count, so write the count in the report and give
representative examples.

### Re-run after changing state

axe-core only sees "the DOM at this moment". Re-run it every time after the following.

- A modal, dropdown, menu, or accordion has been opened
- A tab has been switched
- A validation error has been displayed
- Search results are present or absent
- The viewport has been changed (when mobile display brings up a different UI)

### Handling incomplete

`incomplete` is a list of items that "axe-core could not judge automatically"; it does not
mean there is no issue. In particular, the following need manual verification.

| Rule | What to verify manually |
| --- | --- |
| `color-contrast` | Places where the background is an image, gradient, or overlap. Read the color from a screenshot and judge with a calculation equivalent to `contrast.mjs` (VIS-09) |
| `aria-*` family | Whether the role or attributes are correct in light of the page's purpose (SEM-11) |
| `frame-*` | The contents of an iframe. Cannot be verified unless it is the same origin |

## Checking keyboard operation

### Walking the focus order

If walking through a page with many elements all at once, the bundled script is fast. It
records even the presence of a focus indicator under the actual `:focus-visible` applied
state.

```
node <skill directory>/scripts/focus-walk.mjs <url> [--max 60] [--out forward.json]
node <skill directory>/scripts/focus-walk.mjs <url> --reverse [--out reverse.json]
```

- Outputs `tag` `role` `name` `selector` `tabIndex` `rect` `visible` `outline`
  `boxShadow` `focusIndicator` for each step as JSON. **Always also run the reverse-direction
  (Shift+Tab) walk with `--reverse`, and compare it with the forward direction.**
- `focusIndicator` is an approximation based on the presence of an outline or box-shadow.
  Also confirm the final visibility with a screenshot (for KBD-08, "whether it is actually
  visible" is the essence).
- States such as an opened modal cannot be reproduced from a URL alone, so verify them from
  MCP using the procedure below.

To verify step by step with MCP, do the following.

1. Return focus to the start of the page (to create a state equivalent to `Tab` from the
   address bar, either call `document.body.focus()` followed by
   `document.activeElement.blur()` via `browser_evaluate`, or reload the page)
2. Press `Tab` with `browser_press_key`, and get the focus position each time

Use the following to get the focus position (the same items output by
`scripts/focus-walk.mjs`).

```js
() => {
  const el = document.activeElement;
  if (!el || el === document.body) return { focused: null };
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  return {
    tag: el.tagName.toLowerCase(),
    role: el.getAttribute('role'),
    name: el.getAttribute('aria-label') || el.textContent?.trim().slice(0, 80),
    selector: el.id ? `#${el.id}` : el.className ? `${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]}` : el.tagName.toLowerCase(),
    tabIndex: el.tabIndex,
    rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
    // Whether it is visible on screen (KBD-07: has focus not moved to something invisible)
    visible: rect.width > 0 && rect.height > 0 &&
             rect.bottom > 0 && rect.top < innerHeight &&
             style.visibility !== 'hidden' && style.opacity !== '0',
    outline: `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor}`,
    boxShadow: style.boxShadow,
  };
}
```

Record the order obtained, and judge the following.

- **KBD-07**: Whether the visual layout (the `rect` coordinates) matches the movement order.
  Whether focus has moved to an element with `visible: false`. Whether any `tabIndex` is a
  positive number
- **KBD-08**: Whether there is an element whose `outline` is `none` and which also has no
  `boxShadow`. Whether the indicator is actually visible in a screenshot taken while focused
- **KBD-09**: Whether the focused element's `rect` is hidden behind a fixed header/footer
  area. Check with a screenshot if in doubt

**Always also perform the reverse-direction walk with `Shift+Tab`.** Go back from the end to
the start, and compare whether the same elements are reached as in the forward direction.
Elements reachable only in the forward direction, or places where the order changes in the
reverse direction, are issues.

When there are many elements, it is acceptable to narrow the scope to the main operation
areas (forms, navigation, modals), but state the narrowed scope clearly in the report.

### Operating UI components

- Modal/dropdown: with it open, repeat `Tab` and check whether focus leaves it (KBD-05).
  Whether it closes with `Escape`. Whether focus returns to the original triggering element
  after closing
- Menu/tabs/listbox: operation with the arrow keys (`ArrowDown` `ArrowUp` `ArrowRight`
  `ArrowLeft`), `Home`, `End`
- Buttons/links: `Enter` and `Space` (both for `<button>`; `<a>` standardly works with
  `Enter`)
- Things that appear on hover: whether they disappear with `Escape` (KBD-01), whether focus
  can move inside them (KBD-02)

### Finding features that only work with the mouse (KBD-04)

For every feature that could be operated in step 5 (mouse operation), try whether it can
also be performed with the keyboard alone. Pay attention to drag and drop, menus that
appear on hover, swipes, and carousel advancement.

## Checking lang

```js
() => ({
  htmlLang: document.documentElement.lang || null,
  // Elements with a lang specified other than the default
  others: [...document.querySelectorAll('[lang]')]
    .filter(el => el !== document.documentElement)
    .map(el => ({ lang: el.lang, text: el.textContent?.trim().slice(0, 60) })),
})
```

If `htmlLang` is `null` or empty, that is a SEM-09 issue. A Japanese page set to `en` is
also an issue (the typical case of a template's default value being left in place).

## Landmark and heading outline

```js
() => ({
  landmarks: [...document.querySelectorAll(
    'header,nav,main,aside,footer,section,form,search,[role]'
  )].filter(el => {
    const r = el.getAttribute('role');
    const implicit = { HEADER: 'banner', NAV: 'navigation', MAIN: 'main',
                       ASIDE: 'complementary', FOOTER: 'contentinfo', SEARCH: 'search' };
    return r ? ['banner','navigation','main','complementary','contentinfo','search','region','form'].includes(r)
             : !!implicit[el.tagName];
  }).map(el => ({
    tag: el.tagName.toLowerCase(),
    role: el.getAttribute('role'),
    name: el.getAttribute('aria-label') ||
          document.getElementById(el.getAttribute('aria-labelledby'))?.textContent?.trim() || null,
  })),
  headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]')].map(el => ({
    level: el.getAttribute('aria-level') || el.tagName[1],
    text: el.textContent?.trim().slice(0, 80),
  })),
  title: document.title,
})
```

- Whether there is exactly one `main`, and whether it contains content specific to that page
  (SEM-07)
- Whether heading levels skip, and whether there is an `h1`
- When there are multiple landmarks of the same kind, whether they can be distinguished by
  `name`

## Checking live regions (SEM-12)

Before the operation, record the elements declared as live regions.

```js
() => [...document.querySelectorAll('[aria-live],[role="status"],[role="alert"],[role="log"],[role="progressbar"]')]
  .map(el => ({
    role: el.getAttribute('role'),
    live: el.getAttribute('aria-live'),
    atomic: el.getAttribute('aria-atomic'),
    text: el.textContent?.trim().slice(0, 100),
  }))
```

After that, perform the operation (form submission, search, delete, etc.), then get it
again and compare.

- Whether the content meant to be announced changes **inside** the live region
- Whether the live-region element itself was inserted afterward (when it is inserted, it
  often does not get announced). Check whether the element existed in the pre-operation
  snapshot
- Whether a focus move happens at the same time as the change (with a screen reader, the
  announcement is often not read out in that case)

## Screenshots

Taking screenshots in the following situations strengthens the report's persuasiveness and
also allows later verification.

- The location that is the subject of a finding
- A state where the focus indicator is invisible or hard to see (KBD-08)
- Broken layout at 320px width, 200% zoom, changed text size, and changed text spacing
  (RFL-01 through RFL-04)
- Places where the contrast ratio is questionable (also used to extract colors)

### Specifying the save location (important)

**All screenshots must always be saved under `a11y-report/assets/`.**
If no save location is specified, `browser_take_screenshot` scatters files into the working
directory (the current directory). To avoid this, **explicitly pass a path starting with
`a11y-report/assets/` in the `filename` parameter every time you call it.**

```
browser_take_screenshot: filename=a11y-report/assets/hero-desktop.png
```

- If the directory does not exist, run `mkdir -p a11y-report/assets` in Bash first.
- This applies **not only to the final screenshots included in the report, but also to ones
  taken temporarily for color extraction or checking broken layout.** Even temporary files
  must not be saved to the current directory.
- Reference them from the report using the relative path `assets/…`.

**Do not take screenshots of a login form with credentials entered, or of a screen showing
personal information.**
