# Notes by framework / library

Read the section that applies to the technology the target uses. What is listed
here are typical patterns; this is not exhaustive, and it does not replace
verification via the check point tables.

## React / Next.js

### Handlers on non-interactive elements (KBD-04, SEM-11)

```jsx
<div onClick={handleClick}>Delete</div>          // Cannot receive focus, cannot be operated by keyboard
<span onClick={...} role="button" tabIndex={0}> // Still insufficient. onKeyDown is needed
```

Using `<button type="button">` is the correct answer. Omitting `type` makes it
`submit` inside a form, so also check for a missing `type` on buttons inside forms.

### Focus management (KBD-05, KBD-09)

- Whether focus is moved into the dialog when a modal is opened
- Whether focus is returned to the originating element when it is closed
- Whether focus movement in `useEffect` fails depending on rendering timing
- When `createPortal` separates the DOM position, whether the focus order as DOM
  order becomes unnatural

When using `<dialog>`'s `showModal()`, the focus trap, closing via `Esc`, and
inertness of the background are provided by the browser. For a custom
implementation, all of these need to be checked.

### id generation (SEM-03, SEM-11)

An `id` hardcoded without using `useId()` will collide when the component is
placed more than once on the same page. A duplicate `id` breaks the association
of `<label for>` or `aria-labelledby`.

### Other

- The contents of `dangerouslySetInnerHTML` cannot be judged statically (see
  `component-tracing.md`)
- `<a>` used for navigation via `onClick` without an `href` (cannot receive focus)
- Next.js: `<html lang>` is specified in `app/layout.tsx` or a custom `_document`
  (SEM-09)
- Next.js: focus movement and title updates on page transition (VIS-17)
- `next/image`'s `alt` is a required prop, but whether `alt=""` is appropriate
  needs to be judged separately

## Vue / Nuxt

- `@click` on non-interactive elements (same issue as React)
- `v-show` results in `display: none`, which also hides it from assistive
  technology. Is the choice between this and `v-if` appropriate? Conversely,
  check for places intended to be visually hidden that use `opacity: 0` or
  `height: 0`, which can still be read by assistive technology and/or still
  receive focus
- Whether focus and live regions work as expected during the intermediate states
  of `<transition>`
- The contents of `v-html` cannot be judged statically
- Nuxt: `<html lang>` is specified via `nuxt.config`'s
  `app.head.htmlAttrs.lang`

## Svelte / SvelteKit

- The Svelte compiler emits a11y warnings (such as
  `a11y-click-events-have-key-events`). Where a warning is suppressed
  (`svelte-ignore`), check **whether the reason for suppression is valid**
- The contents of `{@html}` cannot be judged statically

## Angular

- `(click)` attached to a non-interactive element
- The choice between `*ngIf` and `[hidden]`
- Whether `@angular/cdk/a11y`'s `FocusTrap` and `LiveAnnouncer` are used

## Tailwind CSS

| Class | What to check |
| --- | --- |
| `outline-none` `focus:outline-none` | Whether there is an alternative focus style (KBD-08). With only `focus-visible:ring`, it disappears in high-contrast mode |
| `sr-only` | Whether icon-only buttons have a visually hidden label. Conversely, check for cases that mistakenly use `hidden`, which also removes it from assistive technology |
| Fixed sizes like `w-4 h-4` | Whether the 24×24px target size is met (VIS-24). Check this including any expansion from padding |
| `text-gray-400` etc. | Calculate the contrast ratio against the background color (VIS-09). Light grays are often insufficient |
| `truncate` `overflow-hidden` | Whether text is cut off when font size or letter spacing is changed (RFL-02, RFL-04) |
| Fixed widths like `w-[320px]` | Reflow at 320px width (RFL-03) |
| `pointer-events-none` | When used as a means of disabling, it still appears operable to assistive technology |

Custom colors in `tailwind.config` need their values resolved in order to
calculate contrast ratios.

## CSS-in-JS (styled-components / emotion / vanilla-extract)

- When a color is determined via a theme object, trace through to the theme
  definition to resolve the value
- The `&:focus { outline: none }` declaration
- For implementations where color varies by props, check all possible
  combinations

## Web Components / Shadow DOM

- `aria-labelledby`, `aria-describedby`, and `for` **cannot cross the Shadow DOM
  boundary.** Referencing a host-side `id` from inside a shadow root does not
  resolve
- How content passed into slots is handled
- The `delegatesFocus` setting and focus order

## UI component libraries

When using Radix UI, Headless UI, Ark UI, MUI, Chakra UI, Ant Design, etc.

- **Confirm that the accessibility features the library provides have not been
  broken by how they are used.** Common cases include the following.
  - Not using `Dialog.Title`, leaving the dialog without an accessible name
  - Swapping out the element via `asChild` or `as`, resulting in a changed role
  - Not using the label component, and placing custom text instead
  - A style override that removes the focus ring
- Do not trace the library's internal implementation. Record the package name and
  version, and defer anything not certain to "needs further verification" for
  live-page verification

## Template engines (ERB / Blade / Twig / Jinja / Pug / Astro)

- Trace through partial templates (partials / includes) to assemble the overall
  markup
- Whether the layout template has `<html lang>` `<title>` `<main>` (SEM-09,
  VIS-17, SEM-07)
- Whether `id`s generated inside a loop are duplicated
- Whether escaping is present is a security issue rather than an accessibility
  issue, but report it if noticed

## Static HTML

- Whether `<title>` has been left duplicated across pages copied from the same
  template (VIS-17)
- Whether the navigation order is consistent across pages (VIS-25)
- When there are multiple pages, whether all of them can be covered as targets
</content>
</invoke>
