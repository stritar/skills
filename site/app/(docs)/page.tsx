import { DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { SkillDirectory, type DirectoryEntry } from '@/components/skill-directory';
import { withBasePath } from '@/lib/base-path';
import { getManifest } from '@/lib/content';

export default function DirectoryPage() {
  const manifest = getManifest();
  const entries: DirectoryEntry[] = manifest.skills.map((s) => ({
    id: s.id,
    name: s.name,
    url: s.url,
    category: s.category,
    summary: s.summary,
    description: s.description,
    tags: s.meta.tags ?? [],
    triggers: s.meta.triggers ?? [],
    inputs: s.meta.inputs ?? [],
    outputs: s.meta.outputs ?? [],
    recommended: s.meta.recommended ?? false,
    status: s.meta.status ?? null,
  }));
  const categories = manifest.categories.map((c) => ({ slug: c.slug, label: c.label, scope: c.scope }));

  return (
    <DocsPage
      breadcrumb={{ enabled: false }}
      footer={{ enabled: false }}
      tableOfContent={{ enabled: false }}
      tableOfContentPopover={{ enabled: false }}
    >
      <DocsTitle className="font-heading text-3xl font-bold">Skills</DocsTitle>
      <DocsDescription className="mb-6 text-base">
        AI agent skills for product design, covering research, interactions, accessibility, design systems and QA. Each
        skill is a SKILL.md instruction file, sometimes with supporting references or scripts.
      </DocsDescription>
      <SkillDirectory entries={entries} categories={categories} />
      <p className="mt-10 border-t pt-4 text-sm text-fd-muted-foreground">
        For agents:{' '}
        <a href={withBasePath('/llms.txt')} className="underline underline-offset-4 hover:text-fd-foreground">
          llms.txt
        </a>{' '}
        lists every skill with a link to its raw SKILL.md file.
      </p>
    </DocsPage>
  );
}
