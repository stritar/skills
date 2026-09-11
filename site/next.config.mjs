// A static export, deployed to GitHub Pages by .github/workflows/docs-site.yml.
// The workflow passes the Pages base path (for example /skills); locally the
// site runs at the root.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/+$/, '');

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  trailingSlash: true,
  basePath: basePath || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default config;
