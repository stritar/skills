# Installing into Cursor

Verified against the Cursor skills documentation (cursor.com/docs/context/skills),
2026-08-26.

## Where skills live

| Scope | Path |
| --- | --- |
| Project | `.agents/skills/` or `.cursor/skills/` |
| User | `~/.agents/skills/` or `~/.cursor/skills/` |

Cursor walks the skills root recursively and also reads `.claude/skills/` and
`.codex/skills/` for compatibility, so skills installed for other tools are
picked up too.

## Install

```bash
cp -r skills/<category>/<skill-id> /path/to/project/.agents/skills/
# or:
npx skills add stritar/skills --skill <skill-id>
```

Because Cursor scans recursively, you can also copy a whole category:

```bash
cp -r skills/accessibility /path/to/project/.agents/skills/accessibility
```
