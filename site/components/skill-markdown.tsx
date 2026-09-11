import { Markdown } from 'fumadocs-core/content/md';
import { rehypeCode, rehypeCodeDefaultOptions, remarkHeading } from 'fumadocs-core/mdx-plugins';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { ComponentProps } from 'react';
import { withBasePath } from '@/lib/base-path';
import { languageOf, skillRemarkPlugins, type DocRef } from '@/lib/markdown-plugins';
import { HIGHLIGHT_LIMIT } from '@/lib/remark-skill';

type Plugins = NonNullable<Parameters<typeof Markdown>[0]['rehypePlugins']>;

function rehypePlugins(): Plugins {
  return [[rehypeCode, rehypeCodeDefaultOptions]];
}

// Raw files are static files, not routes: a plain link with the base path
// added, never client-side navigation.
function SkillLink({ href = '', ...props }: ComponentProps<'a'>) {
  if (href.startsWith('/raw/')) return <a {...props} href={withBasePath(href)} />;
  const DefaultLink = defaultMdxComponents.a;
  return <DefaultLink href={href} {...props} />;
}

const components = { ...defaultMdxComponents, a: SkillLink };

// A skill's Markdown, parsed as plain Markdown (never MDX) and rendered with
// the Fumadocs components.
export function SkillMarkdown({ body, doc }: { body: string; doc: DocRef }) {
  return (
    <Markdown remarkPlugins={[...skillRemarkPlugins(doc), remarkHeading]} rehypePlugins={rehypePlugins()} components={components}>
      {body}
    </Markdown>
  );
}

const LANGUAGE_BY_EXTENSION: Record<string, string> = {
  htm: 'html',
  xhtml: 'html',
  svg: 'xml',
  mjs: 'javascript',
  cjs: 'javascript',
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  sh: 'bash',
  yml: 'yaml',
  txt: 'text',
};

// A supporting file shown as escaped source in a code block. Nothing in it is
// run, including HTML.
export function SourceView({ path, text }: { path: string; text: string }) {
  const extension = /\.([^./]+)$/.exec(path)?.[1]?.toLowerCase() ?? '';
  const language = languageOf(LANGUAGE_BY_EXTENSION[extension] ?? extension) ?? 'text';
  const longestRun = Math.max(2, ...Array.from(text.matchAll(/`+/g), (m) => m[0].length));
  const fence = '`'.repeat(longestRun + 1);
  const markdown = `${fence}${text.length > HIGHLIGHT_LIMIT ? 'text' : language}\n${text.replace(/\r?\n$/, '')}\n${fence}\n`;
  return (
    <Markdown rehypePlugins={rehypePlugins()} components={defaultMdxComponents}>
      {markdown}
    </Markdown>
  );
}
