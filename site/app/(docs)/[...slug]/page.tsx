import type { Metadata } from 'next';
import Link from 'fumadocs-core/link';
import { notFound } from 'next/navigation';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { Breadcrumbs, type Crumb } from '@/components/breadcrumbs';
import { PageActions } from '@/components/page-actions';
import { SkillMarkdown, SourceView } from '@/components/skill-markdown';
import { SkillMeta } from '@/components/skill-meta';
import { SupportingFiles } from '@/components/supporting-files';
import { getCategory, getManifest, getSkill, readSourceFile, type Skill, type SkillFile } from '@/lib/content';
import { getSkillToc } from '@/lib/markdown-plugins';
import { siteUrl } from '@/lib/site';
import { getSource } from '@/lib/source';

interface Params {
  slug: string[];
}

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  const pages = getSource()
    .generateParams()
    .map((p) => ({ slug: p.slug }));
  const sourceViews = getManifest().skills.flatMap((s) =>
    s.files.filter((f) => f.kind === 'text' && f.url).map((f) => ({ slug: slugsOf(f.url!) })),
  );
  return [...pages, ...sourceViews];
}

function slugsOf(url: string) {
  return url.split('/').filter(Boolean);
}

function findSourceView(slug: string[]): { skill: Skill; file: SkillFile } | null {
  const url = `/${slug.join('/')}/`;
  const skill = getSkill(slug[0]);
  const file = skill?.files.find((f) => f.kind === 'text' && f.url === url);
  return skill && file ? { skill, file } : null;
}

function crumbs(skill: Skill, ...rest: Crumb[]): Crumb[] {
  return [
    { label: 'Skills', href: '/' },
    { label: getCategory(skill.category)?.label ?? skill.category, href: `/?category=${skill.category}` },
    ...rest,
  ];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getSource().getPage(slug);
  const skill = getSkill(page?.data.skillId ?? slug[0]);
  if (!skill) return {};
  if (page?.data.kind === 'skill') {
    return {
      title: skill.name,
      description: skill.summary ?? undefined,
      alternates: { types: { 'text/markdown': `${siteUrl}${skill.rawUrl}` } },
    };
  }
  const path = page?.data.path ?? findSourceView(slug)?.file.path;
  if (!path) return {};
  const rawUrl = skill.files.find((f) => f.path === path)?.rawUrl;
  return {
    title: `${path} · ${skill.name}`,
    description: `A supporting file of the ${skill.name} skill.`,
    alternates: rawUrl && page ? { types: { 'text/markdown': `${siteUrl}${rawUrl}` } } : undefined,
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getSource().getPage(slug);
  if (page) {
    const skill = getSkill(page.data.skillId);
    if (!skill) notFound();
    if (page.data.kind === 'skill') return <SkillPage skill={skill} />;
    return <DocumentPage skill={skill} path={page.data.path} />;
  }
  const view = findSourceView(slug);
  if (view) return <SourceViewPage skill={view.skill} file={view.file} />;
  notFound();
}

async function SkillPage({ skill }: { skill: Skill }) {
  const toc = await getSkillToc(skill.body, { skillId: skill.id, docPath: 'SKILL.md' });
  if (skill.files.length) toc.push({ title: 'Supporting files', url: '#supporting-files', depth: 2 });
  return (
    <DocsPage toc={toc} breadcrumb={{ enabled: false }}>
      <Breadcrumbs items={crumbs(skill, { label: skill.name })} />
      <DocsTitle className="break-words">{skill.name}</DocsTitle>
      {skill.description ? <DocsDescription className="mb-0 text-base">{skill.description}</DocsDescription> : null}
      <PageActions rawUrl={skill.rawUrl} sourceUrl={skill.sourceUrl} />
      <SkillMeta skill={skill} categoryLabel={getCategory(skill.category)?.label} />
      <p className="border-t pt-6 text-xs font-medium tracking-wide text-fd-muted-foreground uppercase">Instructions from SKILL.md</p>
      <DocsBody className="skill-prose">
        <SkillMarkdown body={skill.body} doc={{ skillId: skill.id, docPath: 'SKILL.md' }} />
      </DocsBody>
      {skill.files.length ? <SupportingFiles skill={skill} /> : null}
    </DocsPage>
  );
}

async function DocumentPage({ skill, path }: { skill: Skill; path: string }) {
  const document = getManifest().documents.find((d) => d.skillId === skill.id && d.path === path);
  if (!document) notFound();
  const file = skill.files.find((f) => f.path === path);
  const doc = { skillId: skill.id, docPath: path };
  const toc = await getSkillToc(document.body, doc);
  return (
    <DocsPage toc={toc} breadcrumb={{ enabled: false }}>
      <Breadcrumbs items={crumbs(skill, { label: skill.name, href: skill.url }, { label: path })} />
      <DocsTitle className="break-all">{path}</DocsTitle>
      <DocsDescription className="mb-0 text-base">
        A supporting file of the{' '}
        <Link href={skill.url} className="underline underline-offset-4 hover:text-fd-foreground">
          {skill.name}
        </Link>{' '}
        skill.
      </DocsDescription>
      <PageActions rawUrl={file?.rawUrl} sourceUrl={file?.sourceUrl} />
      <DocsBody className="skill-prose mt-6 border-t pt-6">
        <SkillMarkdown body={document.body} doc={doc} />
      </DocsBody>
    </DocsPage>
  );
}

function SourceViewPage({ skill, file }: { skill: Skill; file: SkillFile }) {
  const text = readSourceFile(skill.id, file.path);
  return (
    <DocsPage full breadcrumb={{ enabled: false }} tableOfContent={{ enabled: false }} tableOfContentPopover={{ enabled: false }}>
      <Breadcrumbs items={crumbs(skill, { label: skill.name, href: skill.url }, { label: file.path })} />
      <DocsTitle className="break-all">{file.path}</DocsTitle>
      <DocsDescription className="mb-0 text-base">
        A supporting file of the{' '}
        <Link href={skill.url} className="underline underline-offset-4 hover:text-fd-foreground">
          {skill.name}
        </Link>{' '}
        skill, shown as source.{file.rawUrl ? '' : ' It is not opened as a web page on this site.'}
      </DocsDescription>
      <PageActions rawUrl={file.rawUrl} sourceUrl={file.sourceUrl} copy={false} rawLabel="View raw file" />
      <DocsBody className="mt-6">
        <SourceView path={file.path} text={text} />
      </DocsBody>
    </DocsPage>
  );
}
