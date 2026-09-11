// The path GitHub Pages serves the site under (for example /skills), set at
// build time. next/link and the router add it by themselves; plain <a>
// elements, fetch() calls and the search client do not, so they use
// withBasePath.
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/+$/, '');

export function withBasePath(path: string): string {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(path) ? path : `${basePath}${path}`;
}
