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

export function categoriesFromSchema(schema) {
  return schema.$defs.skill.properties.category.enum;
}
