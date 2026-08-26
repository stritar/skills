# Installing into any Agent Skills-compatible tool

Every skill here is a standard [Agent Skills](https://agentskills.io)
directory: a folder whose name equals its frontmatter `name`, containing
`SKILL.md` plus optional `references/`, `scripts/`, `assets/` and the upstream
`LICENSE.txt`. Any compliant client can load it.

## The cross-client convention

`.agents/skills/` (project) and `~/.agents/skills/` (user) have emerged as the
shared install locations that most clients scan (Codex, Cursor, OpenCode, Amp,
Gemini CLI, GitHub Copilot, VS Code and others), alongside each tool's own
directory. When in doubt:

```bash
cp -r skills/<category>/<skill-id> /path/to/project/.agents/skills/
```

Copy the whole directory. Project-level installs override user-level installs
in every client that documents precedence.

## Per-tool directories (verified 2026-08-26)

| Tool | Project | User |
| --- | --- | --- |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |
| Codex / ChatGPT | `.agents/skills/` | `~/.agents/skills/` |
| Cursor | `.agents/skills/`, `.cursor/skills/` | `~/.agents/skills/`, `~/.cursor/skills/` |
| OpenCode | `.opencode/skills/`, `.claude/skills/`, `.agents/skills/` | `~/.config/opencode/skills/`, `~/.claude/skills/`, `~/.agents/skills/` |
| Amp | `.agents/skills/`, `.claude/skills/` | `~/.config/agents/skills/`, `~/.agents/skills/` |
| Gemini CLI | `.gemini/skills/`, `.agents/skills/` | `~/.gemini/skills/`, `~/.agents/skills/` |
| GitHub Copilot | `.github/skills/`, `.claude/skills/`, `.agents/skills/` | `~/.copilot/skills/`, `~/.agents/skills/` |
| VS Code | `.github/skills/`, `.claude/skills/`, `.agents/skills/` | `~/.copilot/skills/`, `~/.claude/skills/`, `~/.agents/skills/` |

Directories change; when something does not load, check the tool's own skills
documentation first.

## The skills CLI

[`npx skills`](https://www.npmjs.com/package/skills) installs into 77+ agents
at once and handles updates:

```bash
npx skills add <owner>/skills --skill <skill-id>
npx skills update
```

## Updating from this repository

Re-copy the skill directory (or `npx skills update`). Each catalog entry's
`source.upstreamCommit` records exactly which upstream state a vendored skill
reflects; `CONTRIBUTING.md` documents how the registry itself pulls upstream
updates.
