import Link from 'fumadocs-core/link';
import { Fragment, type ReactNode } from 'react';
import { getSkill, type Skill, type SkillMeta as Meta } from '@/lib/content';
import { compatibilityLabel } from '@/lib/labels';

const linkClass = 'underline decoration-fd-border underline-offset-4 hover:decoration-fd-foreground';

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function source(meta: Meta): ReactNode {
  const s = meta.source;
  if (!s) return meta.license ? `License: ${meta.license}` : null;
  const license = s.license ? ` · ${s.license}` : '';
  if (s.type === 'original') return `Original to this repository${license}`;
  const origin = s.url ? (
    <a href={s.url} target="_blank" rel="noreferrer noopener" className={linkClass}>
      {s.repository ?? 'upstream'}
    </a>
  ) : (
    (s.repository ?? 'upstream')
  );
  return (
    <>
      {origin}
      {s.author ? ` by ${s.author}` : ''}
      {license}
      {s.modified ? ' · adapted for this repository' : ''}
    </>
  );
}

// Everything the catalog records about a skill, in one list. A row appears only
// when the value exists; nothing is filled in.
export function SkillMeta({ skill, categoryLabel }: { skill: Skill; categoryLabel?: string }) {
  const { meta } = skill;
  const status = [
    meta.status === 'draft' ? 'Draft' : null,
    meta.maturity === 'experimental' ? 'Experimental' : null,
    meta.recommended ? 'Recommended' : null,
  ].filter(Boolean);
  const related = (meta.relatedSkills ?? []).map((id) => getSkill(id)).filter((s): s is Skill => Boolean(s));

  const rows: [label: string, value: ReactNode][] = [
    [
      'Category',
      <Link key="c" href={`/?category=${skill.category}`} className={linkClass}>
        {categoryLabel ?? skill.category}
      </Link>,
    ],
  ];
  if (status.length) rows.push(['Status', status.join(' · ')]);
  if (meta.triggers) rows.push(['Use when', <List key="t" items={meta.triggers} />]);
  if (meta.inputs) rows.push(['Works on', <List key="i" items={meta.inputs} />]);
  if (meta.outputs) rows.push(['Produces', <List key="o" items={meta.outputs} />]);
  if (meta.dependencies) rows.push(['Requires', meta.dependencies.join(', ')]);
  if (meta.compatibility) rows.push(['Works with', meta.compatibility.map(compatibilityLabel).join(', ')]);
  if (meta.tags) rows.push(['Tags', meta.tags.join(', ')]);
  const origin = source(meta);
  if (origin) rows.push(['Source', origin]);
  if (related.length) {
    rows.push([
      'Related skills',
      <span key="r" className="flex flex-wrap gap-x-3 gap-y-1">
        {related.map((s) => (
          <Link key={s.id} href={s.url} className={linkClass}>
            {s.name}
          </Link>
        ))}
      </span>,
    ]);
  }

  return (
    <dl className="my-6 grid grid-cols-1 gap-x-6 gap-y-1 rounded-lg border p-4 text-sm sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-y-3">
      {rows.map(([label, value]) => (
        <Fragment key={label}>
          <dt className="font-medium text-fd-muted-foreground max-sm:mt-2 max-sm:first:mt-0">{label}</dt>
          <dd className="min-w-0 break-words">{value}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
