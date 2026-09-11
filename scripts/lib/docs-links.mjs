// Where a path written inside a skill's Markdown points on the documentation
// site (site/).
//
// Import-free on purpose: the site copies this file byte-for-byte into
// site/.content/ and calls it from its Markdown renderer, while
// docs-content.mjs and its tests call the very same functions. A link the
// tests prove resolvable is therefore the link the site renders.
//
// Every URL returned here is relative to the site root and carries no base
// path; the site adds its own (GitHub Pages serves it under /<repo>).

// First URL segments the site itself owns. A skill with one of these ids would
// shadow a route, so the content adapter refuses it.
export const RESERVED_IDS = ['_next', '404', 'api', 'llms.txt', 'raw'];

// Files a browser would run when opened from the site's own origin. They are
// shown as escaped source and never copied into the raw mirror.
const BROWSER_ACTIVE = /\.(?:html?|xhtml?|xht|svg|xml)$/i;

export function isBrowserActive(path) {
  return BROWSER_ACTIVE.test(path);
}

// A page URL segment keeps only letters, digits, "_" and "-". A dot in the
// last segment makes Next.js drop the trailing slash, and GitHub Pages then
// answers 404, so "icons.html" becomes "icons-html".
export function pageSegment(name) {
  return name.replace(/[^A-Za-z0-9_-]/g, '-') || '-';
}

export function skillUrl(id) {
  return `/${id}/`;
}

// The page for a supporting file: its Markdown extension dropped, every
// segment made URL-safe.
export function filePageUrl(id, relPath) {
  const parts = relPath.split('/');
  parts[parts.length - 1] = parts[parts.length - 1].replace(/\.md$/i, '');
  return `/${id}/${parts.map(pageSegment).join('/')}/`;
}

// The raw mirror keeps every file under its exact name.
export function rawUrl(id, relPath) {
  return `/raw/${id}/${relPath.split('/').map(encodeURIComponent).join('/')}`;
}

// Resolves "." and ".." in a "/"-separated path. Returns null when the path
// climbs above its starting point.
export function normalizePath(path) {
  const out = [];
  for (const part of path.split('/')) {
    if (part === '' || part === '.') continue;
    if (part === '..') {
      if (out.length === 0) return null;
      out.pop();
    } else {
      out.push(part);
    }
  }
  return out.join('/');
}

function dirOf(path) {
  const i = path.lastIndexOf('/');
  return i === -1 ? '' : path.slice(0, i);
}

function decode(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

// skills: the manifest's skill records, each { id, path, url, files, excluded }
// where files are { path, kind, url?, rawUrl? } relative to the skill folder
// and excluded lists the relative paths the adapter chose not to publish.
//
// Resolutions are { type, href }:
//   page      a documentation page on this site (href is a site path)
//   raw       a file in the raw mirror (href is a site path)
//   anchor    a fragment on the current page
//   external  an http(s) or mailto URL, kept as written
//   repo      a repository file that is not published, on GitHub
//   unsafe    a scheme that must not be linked (javascript:, data:, …)
//   broken    a relative target that does not exist
/**
 * @param {Array<{ id: string, path: string, url: string, excluded: string[],
 *   files: Array<{ path: string, kind: string, url?: string, rawUrl?: string }> }>} skills
 * @param {{ blobBase?: string | null }} [options]
 */
export function createLinkResolver(skills, { blobBase = null } = {}) {
  const byPath = new Map();
  const byId = new Map();
  for (const skill of skills) {
    const dirs = new Set();
    for (const f of skill.files) {
      for (let d = dirOf(f.path); d; d = dirOf(d)) dirs.add(d);
    }
    const entry = { skill, files: new Map(skill.files.map((f) => [f.path, f])), dirs };
    byPath.set(skill.path, entry);
    byId.set(skill.id, entry);
  }

  function locate(repoPath) {
    const parts = repoPath.split('/');
    if (parts.length < 3 || parts[0] !== 'skills') return null;
    const entry = byPath.get(parts.slice(0, 3).join('/'));
    return entry ? { entry, rel: parts.slice(3).join('/') } : null;
  }

  function published(entry, rel, hash) {
    const { skill } = entry;
    if (rel === '' || rel === 'SKILL.md') return { type: 'page', href: skill.url + hash };
    const file = entry.files.get(rel);
    if (file) {
      if (file.url) return { type: 'page', href: file.url + (file.kind === 'markdown' ? hash : '') };
      if (file.rawUrl) return { type: 'raw', href: file.rawUrl };
      // Too large to preview and unsafe to mirror: only the repository has it.
      return blobBase ? { type: 'repo', href: `${blobBase}/${skill.path}/${rel}` } : null;
    }
    if (entry.dirs.has(rel)) return { type: 'page', href: `${skill.url}#supporting-files` };
    return null;
  }

  function isExcluded(entry, rel) {
    return entry.skill.excluded.some((p) => rel === p || rel.startsWith(`${p}/`));
  }

  // A link destination as the Markdown parser reports it.
  function resolveLink(target, { skillId, docPath }) {
    const t = String(target).trim();
    if (t === '') return { type: 'broken', href: null };
    if (t.startsWith('#')) return { type: 'anchor', href: t };
    if (/^(?:https?:|mailto:)/i.test(t)) return { type: 'external', href: t };
    if (/^[a-z][a-z0-9+.-]*:/i.test(t) || t.startsWith('//')) return { type: 'unsafe', href: null };
    const self = byId.get(skillId);
    if (!self) return { type: 'broken', href: null };

    const cut = t.search(/[?#]/);
    const pathPart = cut === -1 ? t : t.slice(0, cut);
    const hashAt = t.indexOf('#');
    const hash = hashAt === -1 ? '' : t.slice(hashAt);
    if (pathPart === '') return { type: 'anchor', href: hash || '#' };

    const base = pathPart.startsWith('/') ? '' : `${self.skill.path}/${dirOf(docPath)}`;
    const repoPath = normalizePath(`${base}/${decode(pathPart)}`);
    if (repoPath === null) return { type: 'broken', href: null };

    const located = locate(repoPath);
    if (located) {
      const hit = published(located.entry, located.rel, hash);
      if (hit) return hit;
      if (blobBase && isExcluded(located.entry, located.rel)) {
        return { type: 'repo', href: `${blobBase}/${repoPath}${hash}` };
      }
      return { type: 'broken', href: null };
    }
    return blobBase ? { type: 'repo', href: `${blobBase}/${repoPath}${hash}` } : { type: 'broken', href: null };
  }

  // Inline code that names a file of the same skill, or another skill by id
  // (the repository's convention for cross-references), becomes a link.
  // Anything else stays plain code: most backticked names in skills are files
  // in the reader's own project.
  function resolveCode(code, { skillId, docPath }) {
    const text = String(code).trim();
    if (text === '' || /[\s*?<>{}[\]|"'`$\\]/.test(text)) return null;
    const self = byId.get(skillId);
    if (!self) return null;

    const other = byId.get(text);
    if (other && text !== skillId && text.includes('-')) return { type: 'page', href: other.skill.url };

    if (!text.includes('/') || /^[a-z][a-z0-9+.-]*:/i.test(text)) return null;
    let rel = text;
    const installPrefix = `.claude/skills/${skillId}/`;
    if (rel.startsWith(installPrefix)) rel = rel.slice(installPrefix.length);

    const candidates = [normalizePath(`${dirOf(docPath)}/${rel}`), normalizePath(rel)];
    for (const candidate of candidates) {
      if (!candidate || candidate === 'SKILL.md') continue;
      const hit = published(self, candidate, '');
      if (hit) return hit;
    }
    return null;
  }

  return { resolveLink, resolveCode };
}
