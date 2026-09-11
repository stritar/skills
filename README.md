# Product design skills

Agent skills that help coding agents with product design work: user research,
interaction and visual design, design systems, accessibility, content design,
prototyping, testing and design QA. They work in Claude Code, Codex, Cursor,
OpenCode and any other [Agent Skills](https://agentskills.io) client.

Most skills come from open-source authors and are kept byte-identical to their
upstream source, with the commit and licence recorded. A few are original to
this repository.

**Browse the skills:** [denisstritar.com/skills](https://denisstritar.com/skills/)

## Install

Copy one skill directory into your project, with its `LICENSE.txt`:

```bash
cp -r skills/accessibility/better-accessibility your-project/.claude/skills/
```

Or use the skills CLI, or the Claude Code plugin marketplace:

```bash
npx skills add stritar/skills --skill better-accessibility
```

```text
/plugin marketplace add stritar/skills
/plugin install product-design-all@product-design-skills
```

Folders for other tools are listed in [docs/install/](docs/install/).

## Find a skill

```bash
npm run search -- "accessible forms"
npm run search -- --category orchestration --recommended
```

Search needs Node 18 or later and nothing else. [CATALOG.md](CATALOG.md) lists
every skill, and [catalog/index.json](catalog/index.json) is the
machine-readable index. Agents should follow [AGENTS.md](AGENTS.md).

## License

Original skills, tooling and documentation are [MIT](LICENSE). Vendored skills
keep their upstream licence: the text ships as `LICENSE.txt` in each skill
directory, and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) records where
each one comes from. Some accessibility and WordPress skills are GPL.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Every change must pass:

```bash
npm run validate && npm run catalog:check && npm test
```
