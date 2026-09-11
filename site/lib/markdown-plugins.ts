// The Markdown pipeline shared by pages, their tables of contents and the
// search index, so a heading id in search results is the id on the page.
// No React here: the search route imports this module too.

import { getTableOfContents } from 'fumadocs-core/content/toc';
import { remarkGfm, structure } from 'fumadocs-core/mdx-plugins';
import type { TOCItemType } from 'fumadocs-core/toc';
import { bundledLanguages } from 'shiki';
import { createLinkResolver } from '@/.content/docs-links.mjs';
import { withBasePath } from '@/lib/base-path';
import { getManifest, type Manifest } from '@/lib/content';
import { remarkSkillContent, type Resolution } from '@/lib/remark-skill';

export interface DocRef {
  skillId: string;
  // The Markdown file, relative to the skill folder: "SKILL.md" or a supporting file.
  docPath: string;
}

type Plugins = NonNullable<Parameters<typeof getTableOfContents>[1]>;

const PLAIN = new Set(['text', 'txt', 'plain', 'plaintext']);

export function languageOf(lang: string): string | null {
  const id = lang.trim().toLowerCase();
  if (PLAIN.has(id)) return 'text';
  return id in bundledLanguages ? id : null;
}

let cache: { manifest: Manifest; resolver: ReturnType<typeof createLinkResolver> } | null = null;

function resolver() {
  const manifest = getManifest();
  if (!cache || cache.manifest !== manifest) {
    cache = { manifest, resolver: createLinkResolver(manifest.skills, { blobBase: manifest.repo?.blobBase ?? null }) };
  }
  return cache.resolver;
}

export function skillRemarkPlugins(doc: DocRef): Plugins {
  const r = resolver();
  return [
    remarkGfm,
    [
      remarkSkillContent,
      {
        resolveLink: (target: string) => r.resolveLink(target, doc) as Resolution,
        resolveCode: (code: string) => r.resolveCode(code, doc) as Resolution | null,
        languageOf,
        withBasePath,
      },
    ],
  ];
}

// The page title already names the document, so a leading "# Title" is left
// out, and the table of contents keeps the two outermost heading levels.
export async function getSkillToc(body: string, doc: DocRef): Promise<TOCItemType[]> {
  const items = await getTableOfContents(body, skillRemarkPlugins(doc));
  const rest = /^\s*(?:<!--[\s\S]*?-->\s*)*#[ \t]/.test(body) ? items.slice(1) : items;
  if (rest.length === 0) return [];
  const top = Math.min(...rest.map((i) => i.depth));
  return rest.filter((i) => i.depth <= top + 1).map((i) => ({ ...i, depth: i.depth - top + 2 }));
}

// Consecutive paragraphs under one heading share a search record, up to about
// this many characters: far fewer records than one per paragraph (the index
// was over 35 MB that way), while a result snippet stays short enough to read.
const RECORD_LENGTH = 500;

export function getStructuredData(body: string, doc: DocRef) {
  const data = structure(body, skillRemarkPlugins(doc));
  const contents: typeof data.contents = [];
  for (const item of data.contents) {
    const last = contents[contents.length - 1];
    if (last && last.heading === item.heading && last.content.length + item.content.length < RECORD_LENGTH) {
      last.content = `${last.content}\n${item.content}`;
    } else {
      contents.push({ ...item });
    }
  }
  return { ...data, contents };
}
