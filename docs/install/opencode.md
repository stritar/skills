# Installing into OpenCode

Verified against the OpenCode skills documentation (opencode.ai/docs/skills),
2026-08-26.

## Where skills live

| Scope | Paths (all read) |
| --- | --- |
| Project | `.opencode/skills/`, `.claude/skills/`, `.agents/skills/` |
| User | `~/.config/opencode/skills/`, `~/.claude/skills/`, `~/.agents/skills/` |

OpenCode walks up to the git worktree root and ignores unknown frontmatter
fields, so every skill in this registry loads as-is.

## Install

```bash
cp -r skills/<category>/<skill-id> /path/to/project/.opencode/skills/
# or the cross-tool convention:
cp -r skills/<category>/<skill-id> /path/to/project/.agents/skills/
# or:
npx skills add <owner>/skills --skill <skill-id>
```
