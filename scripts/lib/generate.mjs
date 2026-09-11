// Generates every derived artifact from catalog/index.json:
//   CATALOG.md, THIRD_PARTY_NOTICES.md, .claude-plugin/plugin.json,
//   and .claude-plugin/marketplace.json.
// Pure function of the committed sources it reads — catalog/index.json,
// catalog/schema.json and package.json: no timestamps, stable ordering, so
// catalog:check can be a byte-for-byte diff.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, loadSchema, categoriesFromSchema } from './index-io.mjs';

const CATEGORY_LABELS = {
  'discovery': 'Discovery',
  'research': 'User research',
  'strategy': 'Product strategy',
  'information-architecture': 'Information architecture',
  'interaction-design': 'Interaction design',
  'visual-design': 'Visual design',
  'design-systems': 'Design systems',
  'accessibility': 'Accessibility',
  'content-design': 'Content design',
  'prototyping': 'Prototyping',
  'testing': 'Testing and evaluation',
  'design-qa': 'Design QA',
  'analytics': 'Product analytics',
  'agentic-ui': 'Agentic and AI-native UI',
  'ethics-and-safety': 'Ethics and safety',
  'design-engineering': 'Design engineering',
  'orchestration': 'Orchestration',
};

export function buildAll(index) {
  const version = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version;
  const categories = categoriesFromSchema(loadSchema());
  const skills = [...index.skills].sort((a, b) => {
    const ca = categories.indexOf(a.category);
    const cb = categories.indexOf(b.category);
    if (ca !== cb) return ca - cb;
    return a.id < b.id ? -1 : 1;
  });
  return {
    'CATALOG.md': buildCatalogMd(skills, categories),
    'THIRD_PARTY_NOTICES.md': buildNotices(skills),
    '.claude-plugin/plugin.json': buildPluginJson(skills, version),
    '.claude-plugin/marketplace.json': buildMarketplaceJson(skills, categories, version),
  };
}

function active(skills) {
  return skills.filter((s) => s.status !== 'deprecated');
}

function skillLink(s) {
  return `[\`${s.id}\`](${s.path}/SKILL.md)`;
}

function buildCatalogMd(skills, categories) {
  const act = active(skills);
  const thirdParty = act.filter((s) => s.source.type === 'third-party');
  const lines = [];
  lines.push('# Skill catalog');
  lines.push('');
  lines.push('<!-- GENERATED FILE — do not edit. Source of truth: catalog/index.json. Regenerate with `npm run catalog:build`. -->');
  lines.push('');
  lines.push(`${act.length} skills (${thirdParty.length} vendored third-party, ${act.length - thirdParty.length} original)` +
    (skills.length > act.length ? `, plus ${skills.length - act.length} deprecated` : '') + '.');
  lines.push('');
  lines.push('Search locally instead of reading this whole file: `npm run search -- "your query"`. The machine-readable index is [catalog/index.json](catalog/index.json).');
  lines.push('');

  // Table of contents.
  lines.push('## Contents');
  lines.push('');
  lines.push('- [Start here](#start-here)');
  lines.push('- [Suggested bundles](#suggested-bundles)');
  for (const c of categories) {
    const n = act.filter((s) => s.category === c).length;
    if (n > 0) lines.push(`- [${CATEGORY_LABELS[c]}](#${anchor(CATEGORY_LABELS[c])}) (${n})`);
  }
  lines.push('- [Recommended defaults](#recommended-defaults)');
  lines.push('- [Alphabetical index](#alphabetical-index)');
  lines.push('');

  // Start here.
  lines.push('## Start here');
  lines.push('');
  lines.push('1. Search: `npm run search -- "accessible forms"` (or filter: `--category accessibility`, `--recommended`).');
  lines.push('2. Read the whole `SKILL.md` of each selected skill, and any file it links.');
  lines.push('3. Load the smallest set of skills that covers the task; orchestration skills coordinate specialists for multi-step reviews.');
  lines.push('');
  const starters = act.filter((s) => s.recommended && s.category === 'orchestration');
  if (starters.length > 0) {
    lines.push('Good entry points:');
    lines.push('');
    for (const s of starters) lines.push(`- ${skillLink(s)} — ${s.description}`);
    lines.push('');
  }

  // Suggested bundles: orchestration skills + their related specialists.
  lines.push('## Suggested bundles');
  lines.push('');
  const orchestrators = act.filter((s) => s.category === 'orchestration');
  if (orchestrators.length === 0) {
    lines.push('No orchestration skills yet; pick specialists per category below.');
    lines.push('');
  } else {
    for (const o of orchestrators) {
      const related = o.relatedSkills.map((id) => act.find((s) => s.id === id)).filter(Boolean);
      lines.push(`- **${o.name}** (${skillLink(o)}): ${related.map((r) => `\`${r.id}\``).join(', ') || 'see skill'}`);
    }
    lines.push('');
  }

  // Category sections.
  for (const c of categories) {
    const inCat = act.filter((s) => s.category === c);
    if (inCat.length === 0) continue;
    lines.push(`## ${CATEGORY_LABELS[c]}`);
    lines.push('');
    for (const s of inCat) {
      lines.push(`### \`${s.id}\`${s.recommended ? ' ⭐' : ''}`);
      lines.push('');
      lines.push(s.description);
      lines.push('');
      lines.push(`- **Path**: [${s.path}/SKILL.md](${s.path}/SKILL.md)`);
      if (s.triggers.length) lines.push(`- **Use when**: ${s.triggers.join('; ')}`);
      if (s.inputs.length) lines.push(`- **Inputs**: ${s.inputs.join(', ')}`);
      if (s.outputs.length) lines.push(`- **Outputs**: ${s.outputs.join(', ')}`);
      if (s.dependencies.length) lines.push(`- **Dependencies**: ${s.dependencies.join(', ')}`);
      if (s.compatibility.length) lines.push(`- **Verified compatible with**: ${s.compatibility.join(', ')}`);
      lines.push(`- **Source**: ${sourceLine(s)}`);
      lines.push(`- **Status**: ${s.status}, ${s.maturity}${s.recommended ? ', recommended default' : ''}`);
      if (s.tags.length) lines.push(`- **Tags**: ${s.tags.join(', ')}`);
      if (s.relatedSkills.length) lines.push(`- **Related**: ${s.relatedSkills.map((id) => `\`${id}\``).join(', ')}`);
      lines.push('');
    }
  }

  // Recommended defaults.
  lines.push('## Recommended defaults');
  lines.push('');
  const rec = act.filter((s) => s.recommended);
  if (rec.length === 0) lines.push('None marked yet.');
  else for (const s of rec) lines.push(`- ${skillLink(s)} (${s.category}) — ${s.description}`);
  lines.push('');

  // Alphabetical index.
  lines.push('## Alphabetical index');
  lines.push('');
  lines.push('| Skill | Category | Source | Status |');
  lines.push('| --- | --- | --- | --- |');
  for (const s of [...skills].sort((a, b) => (a.id < b.id ? -1 : 1))) {
    lines.push(`| ${skillLink(s)} | ${s.category} | ${s.source.type} | ${s.status} |`);
  }
  lines.push('');
  return lines.join('\n');
}

function sourceLine(s) {
  if (s.source.type === 'original') {
    return `original to this repository (${s.source.license})`;
  }
  const src = s.source;
  const commit = src.upstreamCommit ? ` @ \`${src.upstreamCommit.slice(0, 7)}\`` : '';
  const author = src.author ? ` by ${src.author}` : '';
  return `third-party — [${src.repository}](${src.url})${commit}${author}, ${src.license}` +
    (src.modified ? ' (modified — see THIRD_PARTY_NOTICES.md)' : '');
}

function buildNotices(skills) {
  const lines = [];
  lines.push('# Third-party notices');
  lines.push('');
  lines.push('<!-- GENERATED FILE — do not edit. Source of truth: catalog/index.json. Regenerate with `npm run catalog:build`. -->');
  lines.push('');
  lines.push('This repository vendors third-party agent skills. Each vendored skill retains');
  lines.push('its upstream license: the license text is included in the skill directory');
  lines.push('(see the `License file` field below), and applies to that skill in place of');
  lines.push('the repository license. This file lists every vendored skill with full');
  lines.push('provenance. The canonical machine-readable record is `catalog/index.json`.');
  lines.push('');
  const thirdParty = skills.filter((s) => s.source.type === 'third-party');
  if (thirdParty.length === 0) {
    lines.push('No third-party skills are currently vendored.');
    lines.push('');
    return lines.join('\n');
  }
  for (const s of [...thirdParty].sort((a, b) => (a.id < b.id ? -1 : 1))) {
    const src = s.source;
    lines.push(`## ${s.id}`);
    lines.push('');
    lines.push(`- Upstream: [${src.repository}](${src.url})`);
    lines.push(`- Author: ${src.author}`);
    lines.push(`- Upstream path: \`${src.upstreamPath}\` at commit \`${src.upstreamCommit}\``);
    lines.push(`- Retrieved: ${src.retrievedAt}`);
    lines.push(`- License: ${src.license} (license file: \`${s.path}/${src.licenseFile}\`)`);
    if (src.modified) {
      lines.push('- Local modifications:');
      for (const m of src.modifications) {
        lines.push(`  - ${m.date} (${m.reason}): ${m.description} [${m.files.join(', ')}]`);
      }
    } else {
      lines.push('- Local modifications: none (byte-identical to upstream)');
    }
    lines.push('');
  }
  return lines.join('\n');
}

function buildPluginJson(skills, version) {
  return JSON.stringify({
    name: 'product-design-skills',
    version,
    description: 'A researched, validated registry of agent skills for agentic product design.',
    author: { name: 'Denis Stritar' },
    license: 'MIT',
    skills: active(skills).map((s) => `./${s.path}`),
  }, null, 2) + '\n';
}

function buildMarketplaceJson(skills, categories, version) {
  const act = active(skills);
  const plugins = [{
    name: 'product-design-all',
    source: './',
    description: 'Every skill in the product-design skill registry.',
    version,
    skills: act.map((s) => `./${s.path}`),
  }];
  for (const c of categories) {
    const inCat = act.filter((s) => s.category === c);
    if (inCat.length === 0) continue;
    plugins.push({
      name: `product-design-${c}`,
      source: './',
      description: `${CATEGORY_LABELS[c]} skills from the product-design skill registry.`,
      version,
      skills: inCat.map((s) => `./${s.path}`),
    });
  }
  return JSON.stringify({
    name: 'product-design-skills',
    owner: { name: 'Denis Stritar' },
    metadata: { description: 'Agent skills for agentic product design, organized by category.' },
    plugins,
  }, null, 2) + '\n';
}

function anchor(text) {
  return text.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/ /g, '-');
}

export { CATEGORY_LABELS };
