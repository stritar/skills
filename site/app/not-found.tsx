import Link from 'fumadocs-core/link';

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-24 text-center">
      <p className="text-sm text-fd-muted-foreground">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="max-w-md text-fd-muted-foreground">
        This page does not exist. It may have moved when a skill was renamed or removed.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-md border px-4 py-2 text-sm font-medium outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
      >
        Browse all skills
      </Link>
    </main>
  );
}
