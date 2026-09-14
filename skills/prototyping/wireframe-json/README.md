# About this Skill

A Claude Code skill that generates wireframe from natural language descriptions.

Describe a screen layout in plain language, and the skill produces a JSON wireframe definition + a self-contained HTML preview you can open in any browser.

## How to Use

Use `/wireframe` command or type in natural language.

```
/wireframe dashboard with sidebar navigation and a data table
```


## What It Produces

Two files per screen:

| File | Purpose |
|------|---------|
| `{name}.wireframe.json` | Machine-readable layout definition |
| `{name}.wireframe.html` | Preview in browser |

## Why JSON

When you ask an LLM to wireframe, the default output is ASCII art. It's human-readable at a glance, but LLMs can't reliably parse it back into structure, and it's difficult to adjust programmatically. One misaligned character breaks the whole layout.

JSON solves this. It's a structured format that both humans and machines can read, edit, and reason about. And critically, AI-powered design tools like Figma Make and Google Stitch already accept JSON to render designs — so JSON wireframes become the bridge between conversation and visual output.

## HTML Preview Capabilities

The generated HTML file is **fully self-contained** — no server, no build step, no external dependencies. Just open it in a browser.

### Editing

- **Drag-and-drop reordering** — drag any element's grab bar to reorder it within its parent container
- **Direction toggle** — click ↕/↔ on a container's grab bar to switch between vertical and horizontal layout
- **Select** — click any element to select it (click again to deselect)
- **Copy & paste** — select an element, then ⌘C/⌘V (Ctrl+C/V) to duplicate it. Nested containers are deep-copied.
- **Delete** — select an element and press Delete/Backspace to remove it
- **Undo / Redo** — ⌘Z to undo, ⌘⇧Z to redo

### Live Sync

- The JSON panel updates in real-time as you edit
- An "Edited" badge appears when changes have been made

### Export

All export buttons are in the JSON panel header:

| Action | Browser Support | Description |
|--------|----------------|-------------|
| **Copy** | All browsers | Copy JSON to clipboard |
| **Save** | Chrome / Edge | Write directly to a file (first save opens picker, then overwrites) |
| **Download** | All browsers | Standard browser download |

## Element Types

The wireframe JSON supports these element types, each rendered as a distinct placeholder:

| Type | Rendered As |
|------|------------|
| `text` | Gray label (with `variant` for hierarchy: display, heading, caption) |
| `image` | Gray box with image icon |
| `icon` | Small gray circle |
| `button` | Rounded rectangle |
| `link` | Underlined text |
| `input` | Bordered rectangle |
| `card` | Bordered box with shadow |
| `table` | Header row + placeholder data rows |
| `divider` | Thin horizontal line |
| _(none)_ | Transparent container (structural grouping) |

## Requirements

- **Python 3** — used to splice JSON into the HTML template (a one-line string replacement)
- **A web browser** — to view the HTML preview

No npm, no build tools, no external libraries.

## File Structure

```
.claude/skills/wireframe/
  SKILL.md                  # Skill definition and JSON schema
  wireframe-designer.md     # Cognitive model (7-phase design reasoning)
  wireframe-template.html   # Self-contained HTML template (~1000 lines)
  README.md                 # This file
```
