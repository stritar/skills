## Method and sessions

Research pass of 2026-08-26, executed by Claude (Fable 5) in Claude Code with
live web access. Sources fall into three classes, tagged on every candidate:

- **supplied** — named in the task brief (jakubkrehel/skills as a structural
  reference) or handed to agents as seeds to re-verify (anthropics/skills).
- **remembered-then-verified** — known before research but opened and
  verified live during this pass.
- **fresh** — discovered through this pass's searches and link-following.

Discovery ran as parallel tracks (one query family per agent), followed by
recursive rounds seeded from leads, then per-candidate inspection at pinned
commit SHAs. Saturation criteria and evidence are recorded below as rounds
complete. Raw evidence: `research/raw/`; inspection manifests:
`research/manifests/`.

### Pre-research environment verification (2026-08-26)

Before discovery, two scouting sessions verified the ecosystem live (full
notes distilled into the plan and docs):

- Reference repository jakubkrehel/skills inspected via GitHub API and raw
  file fetches: tree, all 11 SKILL.md files, AGENTS.md conventions, MIT
  license, plugin/marketplace manifests, distribution paths (skills.sh CLI,
  Claude Code marketplace).
- Agent Skills ecosystem verified across official documentation:
  agentskills.io specification (6 frontmatter fields), per-tool install
  directories (Claude Code, Codex, Cursor, OpenCode, Amp, Gemini CLI,
  Copilot, VS Code), anthropics/skills licensing split (Apache-2.0 skills vs
  proprietary document skills), vercel-labs/skills CLI discovery behavior,
  skills.sh API auth-gating, skillpm.dev registry.
