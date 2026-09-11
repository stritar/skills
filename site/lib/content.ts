// Typed access to the content generated from the skill files by
// scripts/lib/docs-content.mjs (`npm run content`). Server-only: it reads
// site/.content/ from disk while pages are rendered at build time.

import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

export type FileKind = 'markdown' | 'text' | 'binary';

export interface SkillFile {
  path: string;
  kind: FileKind;
  size: number;
  url?: string;
  rawUrl?: string;
  sourceUrl?: string;
}

export interface SkillSource {
  type?: string;
  author?: string;
  license?: string;
  url?: string;
  repository?: string;
  modified?: boolean;
}

export interface SkillMeta {
  tags?: string[];
  triggers?: string[];
  inputs?: string[];
  outputs?: string[];
  dependencies?: string[];
  compatibility?: string[];
  relatedSkills?: string[];
  recommended?: boolean;
  maturity?: string;
  status?: string;
  source?: SkillSource;
  license?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  path: string;
  url: string;
  rawUrl: string;
  sourceUrl: string | null;
  description: string | null;
  summary: string | null;
  meta: SkillMeta;
  bodyLine: number;
  body: string;
  files: SkillFile[];
  excluded: string[];
}

export interface Category {
  slug: string;
  label: string;
  scope: string | null;
  skills: string[];
}

export interface SupportingDocument {
  url: string;
  skillId: string;
  path: string;
  bodyLine: number;
  body: string;
}

export interface Manifest {
  version: 1;
  title: string;
  repo: { slug: string; url: string; blobBase: string } | null;
  counts: { skills: number; categories: number; documents: number; files: number };
  categories: Category[];
  skills: Skill[];
  documents: SupportingDocument[];
  warnings: string[];
  brokenLinks: { file: string; line: number; target: string }[];
}

const CONTENT_DIR = join(process.cwd(), '.content');
const MANIFEST = join(CONTENT_DIR, 'manifest.json');

let cache: { mtime: number; manifest: Manifest; skills: Map<string, Skill>; categories: Map<string, Category> } | null = null;

function load() {
  let mtime: number;
  try {
    mtime = statSync(MANIFEST).mtimeMs;
  } catch {
    throw new Error('site/.content/manifest.json is missing. Run `npm run content` in site/ first.');
  }
  // Re-read when the file changes, so `npm run content:watch` shows up in dev.
  if (!cache || cache.mtime !== mtime) {
    const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8')) as Manifest;
    cache = {
      mtime,
      manifest,
      skills: new Map(manifest.skills.map((s) => [s.id, s])),
      categories: new Map(manifest.categories.map((c) => [c.slug, c])),
    };
  }
  return cache;
}

export function getManifest(): Manifest {
  return load().manifest;
}

export function getSkill(id: string): Skill | undefined {
  return load().skills.get(id);
}

export function getCategory(slug: string): Category | undefined {
  return load().categories.get(slug);
}

// The text of a supporting file shown as a source view.
export function readSourceFile(skillId: string, path: string): string {
  return readFileSync(join(CONTENT_DIR, 'files', skillId, ...path.split('/')), 'utf8');
}
