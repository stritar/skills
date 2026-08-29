# Installing into OpenAI Codex / ChatGPT agents

Verified against the Codex skills documentation (learn.chatgpt.com/docs/build-skills),
2026-08-26.

## Where skills live

| Scope | Path |
| --- | --- |
| Working directory | `$CWD/.agents/skills/<skill-id>/` |
| Repository | `$REPO_ROOT/.agents/skills/<skill-id>/` |
| User | `~/.agents/skills/<skill-id>/` |
| Admin | `/etc/codex/skills/` |

## Install

```bash
cp -r skills/<category>/<skill-id> /path/to/project/.agents/skills/
# or via the skills CLI:
npx skills add stritar/skills --skill <skill-id>
```

## Notes

- Codex requires `name` and `description` in frontmatter; both are present in
  every skill here.
- Some upstream skills ship an `agents/openai.yaml` next to SKILL.md with
  OpenAI-specific settings (display name, implicit-invocation policy). Codex
  reads it automatically; other agents ignore it. It is preserved as vendored.
