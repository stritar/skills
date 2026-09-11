// The Fumadocs source, built from the manifest instead of content files: one
// page per skill, grouped into category folders for the sidebar, plus one page
// per supporting Markdown file. Supporting files are kept out of the sidebar
// (their folder is not listed) but stay addressable and searchable.

import { loader, type StaticSource } from 'fumadocs-core/source';
import { getManifest, type Manifest } from '@/lib/content';

export interface DocPageData {
  title: string;
  description?: string;
  kind: 'skill' | 'document';
  skillId: string;
  // The file this page renders, relative to the skill folder.
  path: string;
  slugs: string[];
}

interface DocMetaData {
  title?: string;
  pages?: string[];
}

type Source = StaticSource<{ pageData: DocPageData; metaData: DocMetaData }>;

function slugsOf(url: string): string[] {
  return url.split('/').filter(Boolean);
}

function fromManifest(manifest: Manifest): Source {
  const files: Source['files'] = [
    {
      type: 'meta',
      path: 'meta.json',
      data: { title: manifest.title, pages: ['[All skills](/)', ...manifest.categories.map((c) => c.slug)] },
    },
  ];
  for (const c of manifest.categories) {
    files.push({ type: 'meta', path: `${c.slug}/meta.json`, data: { title: c.label, pages: c.skills } });
  }
  for (const s of manifest.skills) {
    files.push({
      type: 'page',
      path: `${s.category}/${s.id}.md`,
      data: {
        title: s.name,
        description: s.summary ?? undefined,
        kind: 'skill',
        skillId: s.id,
        path: 'SKILL.md',
        slugs: slugsOf(s.url),
      },
    });
  }
  for (const d of manifest.documents) {
    files.push({
      type: 'page',
      path: `_documents/${d.skillId}/${d.path}`,
      data: { title: d.path, kind: 'document', skillId: d.skillId, path: d.path, slugs: slugsOf(d.url) },
    });
  }
  return { files };
}

function create(manifest: Manifest) {
  return loader({
    baseUrl: '/',
    source: fromManifest(manifest),
    slugs: (file) => file.data.slugs,
  });
}

let cache: { manifest: Manifest; source: ReturnType<typeof create> } | null = null;

export function getSource() {
  const manifest = getManifest();
  if (!cache || cache.manifest !== manifest) cache = { manifest, source: create(manifest) };
  return cache.source;
}
