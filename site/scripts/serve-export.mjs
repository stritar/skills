// Serves the static export in site/out/ the way GitHub Pages does: under the
// base path the site was built with, index.html for directory URLs, a redirect
// to add the trailing slash, and the exported 404 page. Zero dependencies.
//
//   npm run preview            PORT defaults to 4173

import { createServer } from 'node:http';
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = join(dirname(dirname(fileURLToPath(import.meta.url))), 'out');
if (!existsSync(join(outDir, 'index.html'))) {
  console.error('No export found in site/out. Run `npm run build` first.');
  process.exit(1);
}

// The base path is baked into the export, so read it back from the HTML
// rather than asking for it twice.
const indexHtml = readFileSync(join(outDir, 'index.html'), 'utf8');
const basePath = (/(?:src|href)="([^"]*?)\/_next\//.exec(indexHtml)?.[1] ?? '').replace(/\/+$/, '');
const port = Number(process.env.PORT || 4173);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.py': 'text/plain; charset=utf-8',
  '.sh': 'text/plain; charset=utf-8',
  '.yaml': 'text/plain; charset=utf-8',
  '.yml': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
};

function send(res, status, file, headers = {}) {
  res.writeHead(status, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream', ...headers });
  createReadStream(file).pipe(res);
}

createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    pathname = url.pathname;
  }
  if (basePath && pathname === basePath) {
    res.writeHead(301, { location: `${basePath}/${url.search}` }).end();
    return;
  }
  if (basePath && !pathname.startsWith(`${basePath}/`)) {
    send(res, 404, join(outDir, '404.html'));
    return;
  }
  const rel = pathname.slice(basePath.length);
  const target = resolve(outDir, `.${rel}`);
  if (target !== outDir && !target.startsWith(outDir + sep)) {
    send(res, 404, join(outDir, '404.html'));
    return;
  }
  if (existsSync(target) && statSync(target).isFile()) {
    send(res, 200, target);
  } else if (existsSync(join(target, 'index.html'))) {
    if (!rel.endsWith('/')) res.writeHead(301, { location: `${url.pathname}/${url.search}` }).end();
    else send(res, 200, join(target, 'index.html'));
  } else {
    send(res, 404, join(outDir, '404.html'));
  }
}).listen(port, () => {
  console.log(`Serving site/out at http://localhost:${port}${basePath}/`);
});
