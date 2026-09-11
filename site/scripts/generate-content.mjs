// Regenerates what the site reads from the skill files: site/.content/, the
// raw mirror in site/public/raw/ and site/public/llms.txt. Runs before
// `next dev`, `next build` and the type check.
//
// SITE_URL is the absolute address llms.txt links to. CI passes the GitHub
// Pages URL; locally it defaults to the dev server.

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeDocsContent } from '../../scripts/lib/docs-content.mjs';

const siteDir = dirname(dirname(fileURLToPath(import.meta.url)));
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/+$/, '');
const siteUrl = (process.env.SITE_URL || `http://localhost:3000${basePath}`).replace(/\/+$/, '');
const verbose = process.argv.includes('--verbose');

const manifest = writeDocsContent({ siteDir, siteUrl });
const { counts, warnings, brokenLinks } = manifest;

console.log(
  `docs content: ${counts.skills} skills in ${counts.categories} categories, ` +
    `${counts.files} supporting files (${counts.documents} Markdown), llms.txt for ${siteUrl}`,
);
if (warnings.length) {
  console.log(`${warnings.length} warning(s)${verbose ? ':' : ' (run with --verbose to list them)'}`);
  if (verbose) for (const w of warnings) console.log(`  ${w}`);
}
for (const b of brokenLinks) console.log(`broken link: ${b.file}:${b.line} -> ${b.target}`);
