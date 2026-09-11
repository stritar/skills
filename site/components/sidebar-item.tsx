'use client';

import { usePathname } from 'fumadocs-core/framework';
import type * as PageTree from 'fumadocs-core/page-tree';
import { SidebarItem, useFolderDepth } from 'fumadocs-ui/components/sidebar/base';
import { cn } from '@/lib/cn';

function trimSlash(path: string) {
  return path.replace(/\/+$/, '');
}

// A sidebar link with the look of fumadocs-ui's docs layout, whose styled item
// is not exported (layouts/docs/slots/sidebar.js: itemVariants, getItemOffset).
// Two differences:
//  - the name comes from a skill folder, so it is cut to one line, with the
//    full name in the row's title and in the DOM;
//  - the item stays active on the skill's supporting-file pages below it.
// The tree carries no icons, so the row is text only: no glyph, no gap.
export function SidebarSkillItem({ item }: { item: PageTree.Item }) {
  const pathname = trimSlash(usePathname());
  const depth = useFolderDepth();
  const url = trimSlash(item.url);
  const active = url === pathname || (url !== '' && pathname.startsWith(`${url}/`));

  return (
    <SidebarItem
      href={item.url}
      external={item.external}
      active={active}
      title={typeof item.name === 'string' ? item.name : undefined}
      className={cn(
        'relative flex min-w-0 flex-row items-center gap-0 rounded-lg p-2 text-start text-fd-muted-foreground',
        'transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none',
        'data-[active=true]:bg-fd-primary/10 data-[active=true]:text-fd-primary data-[active=true]:hover:transition-colors',
        depth >= 1 &&
          "data-[active=true]:before:absolute data-[active=true]:before:inset-y-2.5 data-[active=true]:before:inset-s-2.5 data-[active=true]:before:w-px data-[active=true]:before:bg-fd-primary data-[active=true]:before:content-['']",
      )}
      style={{ paddingInlineStart: `calc(${2 + 3 * depth} * var(--spacing))` }}
    >
      <span className="min-w-0 truncate">{item.name}</span>
    </SidebarItem>
  );
}
