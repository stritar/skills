# CLAUDE.md

Everything about this repository — what it is, the agent protocol for
consulting it, and the maintenance rules — lives in [AGENTS.md](AGENTS.md).
Read that file; nothing here duplicates it. When a repository fact changes,
change it there.

@AGENTS.md

Claude Code specifics: install one skill by copying its directory into
`.claude/skills/` of the target project (or `~/.claude/skills/` for all
projects), or add this repo as a plugin marketplace
(`/plugin marketplace add stritar/skills`) and install `product-design-all` or
a `product-design-<category>` bundle.
