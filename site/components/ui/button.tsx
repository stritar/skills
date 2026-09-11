import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

// Icon + label anatomy. The root's padding insets the icon; the label is a box
// of its own whose padding insets the text; there is no gap. The label box is
// rendered with or without an icon, so both variants put the text at the same
// inset and nothing shifts when the icon comes or goes. Both numbers are
// tokens, --button-padding-inline and --button-label-padding-inline, so a
// caller that rescales the control re-points them together.
export const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-0 whitespace-nowrap rounded-md border text-sm font-medium',
    'px-(--button-padding-inline) transition-colors outline-none select-none',
    'focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        outline: 'border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'border-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        // Text inset 16px: icon at 10, text 6 further in.
        default: 'h-9 [--button-label-padding-inline:6px] [--button-padding-inline:10px]',
        // Text inset 12px: icon at 8, text 4 further in.
        sm: 'h-8 [--button-label-padding-inline:4px] [--button-padding-inline:8px]',
        // Icon only: no label, the glyph is centred in a square.
        icon: 'size-9 [--button-padding-inline:0px]',
      },
    },
    defaultVariants: { variant: 'outline', size: 'default' },
  },
);

interface AnatomyProps extends VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
  iconSide?: 'start' | 'end';
}

function Content({ icon, iconSide = 'start', size, children }: AnatomyProps & { children?: ReactNode }) {
  if (size === 'icon') return <>{icon ?? children}</>;
  const glyph = icon ? (
    <span aria-hidden="true" className="flex shrink-0">
      {icon}
    </span>
  ) : null;
  return (
    <>
      {iconSide === 'start' ? glyph : null}
      <span data-slot="label" className="px-(--button-label-padding-inline)">
        {children}
      </span>
      {iconSide === 'end' ? glyph : null}
    </>
  );
}

export function Button({
  className,
  variant,
  size,
  icon,
  iconSide,
  children,
  type = 'button',
  ...props
}: ComponentProps<'button'> & AnatomyProps) {
  return (
    <button type={type} data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props}>
      <Content icon={icon} iconSide={iconSide} size={size}>
        {children}
      </Content>
    </button>
  );
}

// A plain anchor styled as a button, for raw files and external pages that
// must not go through client-side navigation.
export function ButtonLink({ className, variant, size, icon, iconSide, children, ...props }: ComponentProps<'a'> & AnatomyProps) {
  return (
    <a data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props}>
      <Content icon={icon} iconSide={iconSide} size={size}>
        {children}
      </Content>
    </a>
  );
}
