'use client';

import Link from 'fumadocs-core/link';
import { Search } from 'lucide-react';
import { useId, useMemo, useSyncExternalStore, type KeyboardEvent } from 'react';
import { compareResults, scoreEntry } from '@/.content/ranking.mjs';
import { Button } from '@/components/ui/button';
import { Input, NativeSelect } from '@/components/ui/input';

export interface DirectoryEntry {
  id: string;
  name: string;
  url: string;
  category: string;
  summary: string | null;
  description: string | null;
  tags: string[];
  triggers: string[];
  inputs: string[];
  outputs: string[];
  recommended: boolean;
  status: string | null;
}

export interface DirectoryCategory {
  slug: string;
  label: string;
  scope: string | null;
}

// The filters live in the URL (?q=&category=), so a filtered list can be
// shared and survives a reload. The exported HTML is rendered without them and
// always lists every skill; the URL is applied once the page is interactive.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener('popstate', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('popstate', listener);
  };
}

function writeParams(update: Record<string, string>) {
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(update)) {
    if (value) params.set(key, value);
    else params.delete(key);
  }
  const qs = params.toString();
  window.history.replaceState(window.history.state, '', `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`);
  for (const listener of listeners) listener();
}

export function SkillDirectory({ entries, categories }: { entries: DirectoryEntry[]; categories: DirectoryCategory[] }) {
  const search = useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => '',
  );
  const filterId = useId();
  const categoryId = useId();

  const params = new URLSearchParams(search);
  const query = params.get('q') ?? '';
  const requested = params.get('category') ?? '';
  const category = categories.some((c) => c.slug === requested) ? requested : '';
  const labels = useMemo(() => new Map(categories.map((c) => [c.slug, c.label])), [categories]);
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of entries) map.set(e.category, (map.get(e.category) ?? 0) + 1);
    return map;
  }, [entries]);

  const inCategory = category ? entries.filter((e) => e.category === category) : entries;
  // The same ranking as `npm run search`: site/.content/ranking.mjs is a byte
  // copy of scripts/lib/ranking.mjs.
  const ranked = query.trim()
    ? inCategory
        .map((entry) => ({ entry, ...scoreEntry(query, entry) }))
        .filter((r) => r.score > 0)
        .sort(compareResults)
        .map((r) => r.entry as DirectoryEntry)
    : null;
  const visible = ranked ?? inCategory;
  const filtered = Boolean(query.trim() || category);
  const reset = () => writeParams({ q: '', category: '' });

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape' && query) {
      event.preventDefault();
      writeParams({ q: '' });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div role="search" className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={filterId} className="sr-only">
          Filter skills
        </label>
        <Input
          id={filterId}
          type="search"
          icon={<Search />}
          placeholder="Filter by name, description or tag"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => writeParams({ q: e.target.value })}
          onKeyDown={onKeyDown}
          className="sm:flex-1"
        />
        <label htmlFor={categoryId} className="sr-only">
          Category
        </label>
        <NativeSelect
          id={categoryId}
          value={category}
          onChange={(e) => writeParams({ category: e.target.value })}
          className="sm:w-64"
        >
          <option value="">All categories ({entries.length})</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label} ({counts.get(c.slug) ?? 0})
            </option>
          ))}
        </NativeSelect>
      </div>

      <div className="flex min-h-8 items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {filtered
            ? `Showing ${visible.length} of ${entries.length} skills`
            : `${entries.length} skills in ${categories.length} categories`}
        </p>
        {filtered ? (
          <Button variant="ghost" size="sm" onClick={reset}>
            Clear filters
          </Button>
        ) : null}
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed px-6 py-10 text-center">
          <p className="font-medium">No skills match these filters</p>
          <p className="max-w-md text-sm text-muted-foreground">
            {query.trim()
              ? `Nothing${category ? ` in ${labels.get(category)}` : ''} matches “${query.trim()}”. `
              : ''}
            Try fewer words or another category. To search inside the instructions themselves, press ⌘K or Ctrl K.
          </p>
          <Button onClick={reset}>Clear filters</Button>
        </div>
      ) : ranked ? (
        <SkillList entries={ranked} labels={labels} showCategory />
      ) : (
        categories
          .filter((c) => !category || c.slug === category)
          .map((c) => {
            const items = inCategory.filter((e) => e.category === c.slug);
            if (items.length === 0) return null;
            const headingId = `category-${c.slug}`;
            return (
              <section key={c.slug} aria-labelledby={headingId} className="flex flex-col gap-2 pt-2">
                <div>
                  <h2 id={headingId} className="text-sm font-semibold">
                    {c.label} <span className="font-normal text-muted-foreground">{items.length}</span>
                  </h2>
                  {c.scope ? <p className="text-sm text-muted-foreground">{c.scope}</p> : null}
                </div>
                <SkillList entries={items} labels={labels} />
              </section>
            );
          })
      )}
    </div>
  );
}

function SkillList({
  entries,
  labels,
  showCategory = false,
}: {
  entries: DirectoryEntry[];
  labels: Map<string, string>;
  showCategory?: boolean;
}) {
  return (
    <ul className="divide-y overflow-hidden rounded-lg border">
      {entries.map((entry) => {
        const note = [showCategory ? labels.get(entry.category) : null, entry.status === 'draft' ? 'Draft' : null]
          .filter(Boolean)
          .join(' · ');
        return (
          <li key={entry.id} className="min-w-0">
            {/* The name is data and is cut to one line; the row carries the full name as its title. */}
            <Link
              href={entry.url}
              title={entry.name}
              className="flex min-w-0 flex-col gap-1 px-4 py-3 outline-none transition-colors hover:bg-accent/60 focus-visible:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
            >
              <span className="flex min-w-0 items-baseline justify-between gap-3">
                <span className="min-w-0 truncate font-medium">{entry.name}</span>
                {note ? <span className="shrink-0 text-xs text-muted-foreground">{note}</span> : null}
              </span>
              {entry.summary ? <span className="text-sm text-muted-foreground">{entry.summary}</span> : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
