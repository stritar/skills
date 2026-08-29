# Installing into Claude Code

Verified against the Claude Code documentation (code.claude.com/docs/en/skills),
2026-08-26.

## Where skills live

| Scope | Path |
| --- | --- |
| One project | `<project>/.claude/skills/<skill-id>/SKILL.md` |
| All your projects | `~/.claude/skills/<skill-id>/SKILL.md` |
| Via plugin | installed plugin's `skills/` directory, namespaced `plugin:skill` |

Project-level overrides personal-level on name collisions. Claude Code picks
up SKILL.md edits without a restart.

## One skill

```bash
cp -r skills/<category>/<skill-id> /path/to/project/.claude/skills/
# or for all projects:
cp -r skills/<category>/<skill-id> ~/.claude/skills/
```

Copy the whole directory (SKILL.md, resource folders, LICENSE.txt), not just
SKILL.md.

## Whole library or a category (plugin marketplace)

```text
/plugin marketplace add stritar/skills
/plugin install product-design-all@product-design-skills
/plugin install product-design-accessibility@product-design-skills
```

Update later with `/plugin update`.

## skills CLI

```bash
npx skills add stritar/skills --skill <skill-id>   # one skill
npx skills add stritar/skills                      # let the CLI list them
```

## Local clone as a reference library

Clone this repo anywhere and follow the protocol in [AGENTS.md](../../AGENTS.md):
search `catalog/index.json` (or `npm run search`), then read the selected
skills by path. Claude Code also loads `.claude/skills/` from parent
directories up to the repo root, so a clone placed above several projects can
serve them all — but prefer explicit copies for reproducibility.

## Compatibility note

Skills whose catalog entry lists `claude-ai` in `compatibility` use only the
six spec frontmatter fields and can also be uploaded to claude.ai / the Skills
API. Skills without it use fields (like `disable-model-invocation`) that
claude.ai uploads reject; they still work fine in Claude Code.
