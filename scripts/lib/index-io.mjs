// Shared repo-root resolution and catalog/taxonomy loading.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const ROOT = dirname(dirname(dirname(fileURLToPath(import.meta.url))));

export function loadIndex() {
  const path = join(ROOT, 'catalog', 'index.json');
  const raw = readFileSync(path, 'utf8');
  return JSON.parse(raw);
}

export function loadSchema() {
  return JSON.parse(readFileSync(join(ROOT, 'catalog', 'schema.json'), 'utf8'));
}

// The allowed tag vocabulary is the ```tags fenced block in catalog/taxonomy.md.
export function loadTagVocabulary() {
  const md = readFileSync(join(ROOT, 'catalog', 'taxonomy.md'), 'utf8');
  const m = md.match(/```tags\n([\s\S]*?)```/);
  if (!m) throw new Error('catalog/taxonomy.md has no ```tags fenced block');
  return new Set(m[1].split('\n').map((l) => l.trim()).filter(Boolean));
}

// The one-line scope of each category is the "## Categories" table in
// catalog/taxonomy.md, so the browse UI describes a category with the same
// words validate enforces it by.
export function loadCategoryScopes() {
  const md = readFileSync(join(ROOT, 'catalog', 'taxonomy.md'), 'utf8');
  const section = md.split(/^## /m).find((s) => s.startsWith('Categories'));
  if (!section) throw new Error('catalog/taxonomy.md has no "## Categories" section');
  const scopes = {};
  for (const line of section.split('\n')) {
    const m = line.match(/^\|\s*`([a-z-]+)`\s*\|\s*(.+?)\s*\|\s*$/);
    if (m) scopes[m[1]] = m[2];
  }
  if (Object.keys(scopes).length === 0) throw new Error('catalog/taxonomy.md has no category rows');
  return scopes;
}

export function categoriesFromSchema(schema) {
  return schema.$defs.skill.properties.category.enum;
}
