# Snippets for display changes

Used for the RFL-01~05 checks. All of these are done via `browser_evaluate` and `browser_resize`.

**After making each change, always revert it before moving to the next check.** Checking a
different aspect while a change is still in place leads to incorrect judgments.

## Common: reverting a change

Each snippet inserts a `<style>` with an `id`. Remove it with the following.

```js
() => {
  for (const id of ['a11y-check-text-spacing', 'a11y-check-font-size', 'a11y-check-zoom']) {
    document.getElementById(id)?.remove();
  }
  return 'reset';
}
```

Restore the viewport to its original size with `browser_resize`.

## RFL-01: browser zoom 200%

The browser's zoom function itself cannot be operated directly from Playwright, so an
equivalent state is created by **halving the viewport**. 200% zoom is equivalent to the
available area in CSS pixels being halved.

```
browser_resize: width=640, height=512   (equivalent to 200% of 1280x1024)
```

An alternative using CSS `zoom` is also possible, but since the handling of `position: fixed`
and `vh` differs from actual browser zoom, **prefer the method of shrinking the viewport**.

```js
// Alternative method. Keep in mind the behavior may differ from actual zoom
() => {
  const s = document.createElement('style');
  s.id = 'a11y-check-zoom';
  s.textContent = ':root { zoom: 2 }';
  document.head.appendChild(s);
  return 'zoom 200%';
}
```

Check for: content overlap, clipping, occurrence of two-dimensional scrolling, and reachability
of operable elements.

## RFL-02: font size 32

Reproduces the state where the browser's setting (default 16px) is set to 32.

```js
() => {
  const s = document.createElement('style');
  s.id = 'a11y-check-font-size';
  s.textContent = 'html { font-size: 32px !important; }';
  document.head.appendChild(s);
  return 'font-size 32px';
}
```

**This method has a limitation.** A browser setting change affects only "elements that don't
fix their font size in px", but the CSS above only overrides the `font-size` on `html`, so it
takes effect on places using `rem` but not on places fixed in `px`.

If there are many places fixed in `px`, **that itself is an RFL-02 problem** (it does not
follow the browser's font size setting). The amount of text specified in px can be checked
with the following.

```js
() => {
  const els = [...document.querySelectorAll('body *')].filter(el =>
    el.children.length === 0 && el.textContent?.trim());
  const px = els.filter(el => {
    const decl = el.style.fontSize || '';
    return decl.endsWith('px');
  });
  return { textElements: els.length, inlinePxFontSize: px.length };
}
```

Since only inline styles can be seen this way, cross-check against a check of the stylesheet
side in the source code (the RFL-02 check in `a11y-check-code`).

Check for: text clipping, overflow from containers, layout breakage, and button label overlap.

## RFL-03: reflow at 320px width

```
browser_resize: width=320, height=800
```

Determine whether horizontal scrolling occurs.

```js
() => ({
  documentWidth: document.documentElement.scrollWidth,
  viewportWidth: window.innerWidth,
  hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
  // Identify the overflowing elements
  overflowing: [...document.querySelectorAll('body *')]
    .filter(el => el.getBoundingClientRect().right > window.innerWidth + 1)
    .slice(0, 20)
    .map(el => ({
      selector: el.id ? `#${el.id}` : `${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).split(' ')[0] : ''}`,
      right: Math.round(el.getBoundingClientRect().right),
      text: el.textContent?.trim().slice(0, 40),
    })),
})
```

For content that scrolls horizontally, instead use `height=256` and judge the same way in the
vertical direction.

**Exclude things that are necessary due to the nature of the content (large diagrams/charts,
maps, data tables).** Before flagging an overflowing element, check whether it falls into one
of these categories.

## RFL-04: text spacing

Apply all of the WCAG SC 1.4.12 threshold values.

```js
() => {
  const s = document.createElement('style');
  s.id = 'a11y-check-text-spacing';
  s.textContent = `
    * , *::before, *::after {
      line-height: 1.5 !important;
      letter-spacing: 0.12em !important;
      word-spacing: 0.16em !important;
    }
    p, li, dd, dt, blockquote, h1, h2, h3, h4, h5, h6 {
      margin-bottom: 2em !important;
    }
  `;
  document.head.appendChild(s);
  return 'text spacing applied';
}
```

After applying, detect elements where truncation or overlap is occurring.

```js
() => [...document.querySelectorAll('body *')]
  .filter(el => {
    if (el.children.length > 0 || !el.textContent?.trim()) return false;
    // Content is overflowing the element's area
    return el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1;
  })
  .slice(0, 20)
  .map(el => ({
    selector: el.id ? `#${el.id}` : `${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).split(' ')[0] : ''}`,
    text: el.textContent.trim().slice(0, 40),
    overflowY: el.scrollHeight - el.clientHeight,
    overflowX: el.scrollWidth - el.clientWidth,
  }))
```

This detection is only a guide, and cannot detect cases where content overflows and overlaps
under `overflow: visible`. Also perform a visual check with a screenshot.

## RFL-05: check on mobile display

Check both portrait and landscape orientation at smartphone resolution (VIS-05 can be checked
at the same time).

```
browser_resize: width=375, height=667   (equivalent to iPhone SE 2nd-3rd generation, portrait)
browser_resize: width=667, height=375   (same, landscape)
```

**Any UI that newly appears in this state (hamburger menu, bottom sheet, mobile navigation) is
unchecked.** Re-run the axe-core check, keyboard operation, and machine-readability checks for
it as well.

If, in landscape orientation, a message such as "please rotate to portrait" is displayed and
the page becomes unusable, flag it as a VIS-05 issue.

## Measured target size (VIS-24)

```js
() => {
  const targets = [...document.querySelectorAll(
    'a[href],button,input:not([type=hidden]),select,textarea,[role="button"],[role="link"],[role="checkbox"],[role="tab"],[onclick]'
  )];
  return targets
    .map(el => {
      const r = el.getBoundingClientRect();
      return {
        selector: el.id ? `#${el.id}` : `${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).split(' ')[0] : ''}`,
        name: (el.getAttribute('aria-label') || el.textContent?.trim() || '').slice(0, 40),
        w: Math.round(r.width), h: Math.round(r.height),
        // Inline elements within running text may fall under the exception rules
        inline: getComputedStyle(el).display.startsWith('inline'),
      };
    })
    .filter(t => t.w > 0 && t.h > 0 && (t.w < 24 || t.h < 24));
}
```

Detected items must not be flagged as-is. Check whether they fall under one of the VIS-24
exceptions (spacing, equivalent, inline, user-agent-controlled, essential). Link text within
running text, and checkboxes/radio buttons with the browser's default style, usually fall
under an exception.

## Additional content shown on hover (VIS-11~13)

1. Move the pointer onto the trigger element with `browser_hover` and confirm that the
   additional content appears
2. **VIS-11**: without moving the pointer, press `Escape` with `browser_press_key` and check
   whether it disappears
3. **VIS-12**: move onto the displayed content with `browser_hover` and check whether it stays
   displayed. If there is a gap between the trigger and the content, also check whether it
   disappears at the coordinates along the way
4. **VIS-13**: hover and wait a few seconds, and check whether it disappears automatically

Also check display triggered by focus (KBD-01~03) the same way, by tabbing to the trigger with
`Tab`.
