import { createFromSource } from 'fumadocs-core/search/server';
import { getCategory, getManifest, getSkill } from '@/lib/content';
import { getStructuredData } from '@/lib/markdown-plugins';
import { getSource } from '@/lib/source';

// Exported as a static file, out/api/search.json, that the search dialog
// downloads once and queries in the browser. The .json name lets GitHub Pages
// serve it as compressed JSON.
export const revalidate = false;
export const dynamic = 'force-static';

export const { staticGET: GET } = createFromSource(getSource, {
  // Results are ranked by relevance; sort tables for every field would only
  // add megabytes to the download.
  sort: { enabled: false },
  buildIndex(page) {
    const skill = getSkill(page.data.skillId);
    if (!skill) throw new Error(`search index: no skill "${page.data.skillId}" for ${page.url}`);
    const category = getCategory(skill.category)?.label ?? skill.category;
    const isSkill = page.data.kind === 'skill';
    const body = isSkill
      ? skill.body
      : (getManifest().documents.find((d) => d.skillId === skill.id && d.path === page.data.path)?.body ?? '');
    return {
      id: page.url,
      url: page.url,
      title: page.data.title,
      description: isSkill ? (skill.summary ?? undefined) : `A supporting file of ${skill.name}`,
      breadcrumbs: isSkill ? [category] : [category, skill.name],
      structuredData: getStructuredData(body, { skillId: skill.id, docPath: page.data.path }),
    };
  },
});
