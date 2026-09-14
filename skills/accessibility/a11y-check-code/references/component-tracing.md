# Tracing components

The procedure for tracing imports from the target file under check, to grasp the
full picture of the markup that is ultimately rendered.

## Basic approach

Accessibility issues are determined by **how the markup is ultimately assembled**.
Looking at just one file cannot tell you the following.

- What is contained in the `children` that the component receives
- Whether the wrapping component outputs a `<button>` or a `<div>`
- Whether the `id` is correctly tied to `<label for>` (when the generation happens
  in a different file)
- Whether the button has `aria-expanded` (depends on the shared component's
  implementation)

For this reason, it is necessary to trace the components imported from the target
file.

## Scope of tracing

### What to trace

- Components within your own project (imports via relative paths, and via aliases
  such as `@/` `~/` `src/`)
- The style definitions that make up the target component (CSS Modules, `.css`,
  `.scss`, Tailwind config, design tokens)
- Files on the calling side that use the target (the caller). For check points
  whose conclusion depends on what is passed in props (SEM-01's alternative text,
  SEM-08's label, SEM-11's role), the caller needs to be checked

### What to trace in a limited way — external package API contracts

There are many cases where UI components are provided as npm packages, and not
looking at `node_modules` at all can leave very little to base a judgment on. So,
**limited to packages listed directly under `dependencies` in `package.json`**, it
is acceptable to trace them for the purpose of checking their **API contract**.
However, the use is strictly limited to the following.

**The goal is to confirm the "props contract."** It is not to read the
implementation and infer the final DOM. What is mainly read is the following, from
that package.

- Type definitions (`.d.ts`) — what props it accepts, whether props equivalent to
  `alt` / `label` are **required or optional**, whether it forwards `aria-*`
- README / JSDoc notes — the intent of the props, assumptions around accessibility
  usage

What this can substantiate is "the caller-side usage of check points whose
conclusion depends on the props" (SEM-01 / SEM-03 / SEM-08, etc., in the table
below). Design facts such as "this component makes `label` required, or not" can
be read reliably from this.

**What not to trace, and what not to base a judgment on:**

- **Never base a judgment on inferring the package's internal implementation
  (the rendered DOM).** Much of `node_modules` is built and minified, and what
  the types and notes show is the shape of the API, not the markup that is
  output. A JSDoc note saying "accessible" is an intent, not a guarantee (writing
  "no issue" based on that tends to produce oversights)
- **Never trace transitive dependencies (dependencies of dependencies in
  `dependencies`).** Many libraries delegate the substance of a11y to an internal
  package (e.g. `@mui/material` → `@mui/base`, each Radix component →
  `@radix-ui/react-*`), but tracing that far immediately exceeds the depth/file
  count limit and erodes the precision of the review itself. Stop at confirming
  the API contract of the direct dependency
- Packages that do not bundle their source (where only the built output can be
  read) should not be forced open — treat them as "unverified"
- Test code, Storybook stories (though these are useful for enumerating state
  variations, so read them for grasping state if they exist)

**And, regardless of whether the API contract was checked, library-caused check
points continue to be treated as "needing verification on the live page."** The
more accessible a library is, the more it tends to use `useId`, state hooks,
portals, and runtime-computed ARIA — and this is exactly the area that static
tracing cannot pin down (see "Dynamic markup" below). The package name and version
should always be recorded as before (check `package.json`). The implementation
varies by version.

## Limits

The default limit is **depth 3, 50 files**. If this is exceeded, stop tracing
there and confirm the scope with the user.

```
The components traced from the target exceeded 50 files.
Should we proceed with the check narrowed to the following scope, or should the
scope be split?
```

Proceeding with a check when the scope is too broad makes each individual check
shallower and increases the chance of missing things. **It is better to look
narrowly and deeply within a bounded scope than broadly and shallowly.**

## Recording the trace

Present the traced result to the user in a form like the following before moving
on to the next step.

```
Component tree of the check target

src/pages/Checkout.tsx
├── src/components/Form/AddressForm.tsx
│   ├── src/components/ui/TextField.tsx
│   └── src/components/ui/Select.tsx
├── src/components/Cart/CartSummary.tsx
│   └── src/components/ui/Table.tsx
└── src/components/ui/Button.tsx

External libraries (API contract only checked — internal implementation and
actual behavior unverified)
- @headlessui/react 2.1.2  … Dialog, Listbox
- react-hook-form 7.51.0

Styles
- tailwind.config.ts
- src/styles/tokens.css
```

External libraries are shown in a separate section to make explicit that issues
originating there have "internal implementation and actual behavior not verified."
Even when the props contract has been checked via type definitions or JSDoc, that
conclusion (e.g. "`Dialog` has `aria-modal`") only means the shape of the API could
be read — it does not mean the rendered result or runtime behavior has been
verified. This always gets deferred to live-page verification.

## Check points that require confirming the caller for judgment

The following check points cannot be judged from the component alone. Search for
the caller with Grep.

| Check point | What to confirm at the caller |
| --- | --- |
| SEM-01 | What is actually passed to the props equivalent to `alt` |
| SEM-03 | Whether the label prop is passed. Whether there is any usage where it is not passed |
| SEM-07 | Whether the heading-level prop (e.g. `as="h2"`) is consistent across the whole page |
| SEM-08 | Whether the displayed label and `aria-label` are given different values |
| SEM-11 | Whether a generic component is given a `role` that does not match its meaning |
| VIS-18 | Whether the link component is given text like "click here" |

When checking a general-purpose UI component (`Button`, `TextField`, etc.), **it is
often unrealistic to confirm every place it is used.** In that case, point out the
component's own implementation issues and the design-level risk that "forgetting to
pass this prop causes an accessibility issue," and state explicitly that full
coverage of all usages is out of scope.

## Dynamic markup

The following cannot have their final markup determined by static tracing. Treat
them as "cannot be determined" and defer them to verification on the live page.

- HTML inserted via `dangerouslySetInnerHTML` / `v-html` / `{@html}`
- Content generated from a CMS or Markdown
- Third-party widgets (chat, ads, embedded players, consent-management banners)
- Implementations where the role or state is determined by data received from the
  server

Since these are **also areas where accessibility issues tend to concentrate**, do
not just leave them as "cannot be determined" — explicitly note them in the report as
places that need verification on the live page.
</content>
</invoke>
