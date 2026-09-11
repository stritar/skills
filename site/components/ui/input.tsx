import type { ComponentProps, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

const field = [
  'flex h-9 w-full min-w-0 items-center gap-0 rounded-md border border-input bg-background text-sm shadow-xs',
  'transition-[color,box-shadow] dark:bg-input/30',
  'focus-within:border-ring focus-within:ring-2 focus-within:ring-ring',
  '[--input-label-padding-inline:6px] [--input-padding-inline:10px]',
].join(' ');

// The same anatomy as Button, for a field with a leading glyph: the wrapper's
// padding insets the glyph, the <input> is the label box with its own padding,
// and there is no gap. Without a glyph the text keeps the same inset.
export function Input({ className, icon, ...props }: ComponentProps<'input'> & { icon?: ReactNode }) {
  return (
    <span data-slot="input" className={cn(field, 'px-(--input-padding-inline)', className)}>
      {icon ? (
        <span aria-hidden="true" className="flex shrink-0 text-muted-foreground [&_svg]:size-4">
          {icon}
        </span>
      ) : null}
      <input
        className="h-full min-w-0 flex-1 bg-transparent px-(--input-label-padding-inline) outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
        {...props}
      />
    </span>
  );
}

// A native <select>, so keyboard, screen reader and mobile pickers behave as
// the platform does. The select must cover the whole control to stay clickable,
// so its own padding carries both insets and the trailing chevron sits on top.
export function NativeSelect({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <span data-slot="select" className={cn(field, 'relative', className)}>
      <select
        className="h-full w-full min-w-0 cursor-pointer appearance-none truncate bg-transparent pr-[calc(var(--input-padding-inline)+1rem+var(--input-label-padding-inline))] pl-[calc(var(--input-padding-inline)+var(--input-label-padding-inline))] outline-none"
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-(--input-padding-inline) size-4 text-muted-foreground"
      />
    </span>
  );
}
