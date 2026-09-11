import Link from 'fumadocs-core/link';
import { ChevronRight } from 'lucide-react';
import type { Skill, SkillFile } from '@/lib/content';
import { withBasePath } from '@/lib/base-path';
import { formatBytes } from '@/lib/labels';

// A folder opens by default when it is short enough to scan.
const OPEN_LIMIT = 12;

function groups(files: SkillFile[]): [folder: string, files: SkillFile[]][] {
  const map = new Map<string, SkillFile[]>();
  for (const f of files) {
    const folder = f.path.includes('/') ? f.path.slice(0, f.path.indexOf('/')) : '';
    map.set(folder, [...(map.get(folder) ?? []), f]);
  }
  // Files next to SKILL.md first, then folders in name order.
  return [...map.entries()].sort(([a], [b]) => (a === '' ? -1 : b === '' ? 1 : a < b ? -1 : 1));
}

function describe(f: SkillFile): string {
  const size = formatBytes(f.size);
  if (f.kind === 'markdown') return `Page · ${size}`;
  if (f.url) return `Source · ${size}`;
  if (f.rawUrl) return `Download · ${size}`;
  return `On GitHub · ${size}`;
}

const rowClass =
  'flex min-w-0 items-baseline justify-between gap-3 px-4 py-2 text-sm outline-none transition-colors hover:bg-accent/60 focus-visible:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset';

function FileRow({ file, folder }: { file: SkillFile; folder: string }) {
  const name = folder ? file.path.slice(folder.length + 1) : file.path;
  // The file name is data and is cut to one line; the row carries the full path.
  const content = (
    <>
      <span className="min-w-0 truncate font-mono text-[0.8125rem]">{name}</span>
      <span className="shrink-0 text-xs text-fd-muted-foreground">{describe(file)}</span>
    </>
  );
  let link;
  if (file.url) {
    link = (
      <Link href={file.url} title={file.path} className={rowClass}>
        {content}
      </Link>
    );
  } else if (file.rawUrl) {
    link = (
      <a href={withBasePath(file.rawUrl)} title={file.path} className={rowClass}>
        {content}
      </a>
    );
  } else if (file.sourceUrl) {
    link = (
      <a href={file.sourceUrl} target="_blank" rel="noreferrer noopener" title={file.path} className={rowClass}>
        {content}
      </a>
    );
  } else {
    link = (
      <span title={file.path} className={rowClass}>
        {content}
      </span>
    );
  }
  return <li className="min-w-0">{link}</li>;
}

export function SupportingFiles({ skill }: { skill: Skill }) {
  return (
    <section aria-labelledby="supporting-files" className="mt-12 flex flex-col gap-3">
      <h2 id="supporting-files" className="scroll-mt-28 text-xl font-semibold tracking-tight">
        Supporting files
      </h2>
      <p className="text-sm text-fd-muted-foreground">
        {skill.files.length === 1 ? 'One more file' : `${skill.files.length} more files`} in this skill&apos;s folder. Markdown
        opens as a page, other text files open as source, and anything else downloads as it is.
      </p>
      {groups(skill.files).map(([folder, files]) => (
        <details key={folder || '.'} open={files.length <= OPEN_LIMIT} className="group min-w-0 rounded-lg border">
          {/* Icon + label anatomy: the summary pads the chevron, the label box pads the text. */}
          <summary className="flex cursor-pointer list-none items-center gap-0 rounded-lg px-2 py-2 text-sm font-medium outline-none select-none hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
            <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-fd-muted-foreground transition-transform group-open:rotate-90" />
            <span className="min-w-0 flex-1 truncate px-2 font-mono text-[0.8125rem]">{folder ? `${folder}/` : 'Next to SKILL.md'}</span>
            <span className="shrink-0 px-2 text-xs font-normal text-fd-muted-foreground">{files.length}</span>
          </summary>
          <ul className="divide-y border-t">
            {files.map((f) => (
              <FileRow key={f.path} file={f} folder={folder} />
            ))}
          </ul>
        </details>
      ))}
    </section>
  );
}
