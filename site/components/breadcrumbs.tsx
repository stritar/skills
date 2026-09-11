import Link from 'fumadocs-core/link';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex min-w-0 flex-wrap items-center gap-1 text-sm text-fd-muted-foreground">
        {items.map((item, i) => (
          <li key={`${i}-${item.label}`} className="flex min-w-0 items-center gap-1">
            {i > 0 ? <ChevronRight aria-hidden="true" className="size-3.5 shrink-0" /> : null}
            {item.href ? (
              <Link href={item.href} className="rounded-sm break-all outline-none hover:text-fd-foreground focus-visible:ring-2 focus-visible:ring-ring">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="break-all text-fd-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
