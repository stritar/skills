'use client';

import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { Search } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

type TriggerProps = Omit<ComponentProps<'button'>, 'color'> & {
  hideIfDisabled?: boolean;
  // Passed by the layout's slot API; this trigger has one size and one colour.
  size?: unknown;
  color?: unknown;
};

const base =
  'outline-none transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:ring-2 focus-visible:ring-ring';

// The search box in the sidebar and header. Icon + label anatomy (see
// components/ui/button.tsx): the button's padding insets the glyph, the label
// box insets the text, the shortcut keys sit in a box of their own, no gap.
export function FullSearchTrigger({ hideIfDisabled, className, size: _size, color: _color, ...props }: TriggerProps) {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  if (hideIfDisabled && !enabled) return null;
  return (
    <button
      type="button"
      data-search-full=""
      {...props}
      onClick={() => setOpenSearch(true)}
      className={cn(
        base,
        'flex h-9 w-full min-w-0 items-center gap-0 rounded-md border bg-fd-secondary/50 px-(--button-padding-inline) text-sm text-fd-muted-foreground',
        '[--button-label-padding-inline:6px] [--button-padding-inline:8px]',
        className,
      )}
    >
      <Search aria-hidden="true" className="size-4 shrink-0" />
      <span className="min-w-0 flex-1 px-(--button-label-padding-inline) text-start">Search docs</span>
      <span aria-hidden="true" className="flex shrink-0 gap-0.5">
        {hotKey.map((key, i) => (
          <kbd key={i} className="rounded border bg-fd-background px-1.5 font-sans text-xs">
            {key.display}
          </kbd>
        ))}
      </span>
    </button>
  );
}

// Icon only, for narrow headers: no label, so no label box.
export function SmallSearchTrigger({ hideIfDisabled, className, size: _size, color: _color, ...props }: TriggerProps) {
  const { enabled, setOpenSearch } = useSearchContext();
  if (hideIfDisabled && !enabled) return null;
  return (
    <button
      type="button"
      data-search=""
      aria-label="Search docs"
      {...props}
      onClick={() => setOpenSearch(true)}
      className={cn(base, 'inline-flex size-9 items-center justify-center rounded-md text-fd-muted-foreground', className)}
    >
      <Search aria-hidden="true" className="size-4" />
    </button>
  );
}
