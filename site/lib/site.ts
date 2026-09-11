// The absolute address of the published site, for the few places a URL must
// be absolute (metadata). CI passes the GitHub Pages URL; locally it is the
// dev server. Server-only: SITE_URL is not exposed to the browser.
export const siteUrl = (process.env.SITE_URL || `http://localhost:3000${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}`).replace(
  /\/+$/,
  '',
);
