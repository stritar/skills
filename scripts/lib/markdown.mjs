// Minimal CommonMark-subset renderer for SKILL.md bodies.
//
// Deliberately NOT a general markdown implementation. It supports exactly the
// constructs the vendored corpus uses: ATX headings, bullet, ordered and task
// lists (nested), fenced code, GFM tables, blockquotes, thematic breaks,
// links, bold, italic and inline code.
//
// Safety rule: every source-derived string is HTML-escaped, and markup is
// emitted only for recognised markdown constructs. The corpus contains raw
// tags (<div>, <svg>, <button>, and two files with </script>) which are shown
// as literal text rather than interpreted. That is both safe and more faithful
// than a raw-HTML renderer, which would swallow prose like "Just use <button>."
//
// Pure: no I/O, no globals, no clock. Callers inject linkBase.

// A sentinel that cannot appear in a text file, used to park code spans while
// the other inline rules run. Built at runtime so no control character is
// ever written into this source file.
const NUL = String.fromCharCode(0);
const SPAN_RE = new RegExp(NUL + '(\\d+)' + NUL, 'g');

const BLOCK_START =
  /^(?: {0,3}(?:#{1,6} |>|```|~~~|(?:[-*_] *){3,}$)|\s*(?:[-*+] |\d{1,9}[.)] )|\s*\|)/;

/**
 * @param {string} src markdown body
 * @param {object} options
 *   linkBase      prefix applied to relative links (usually a GitHub blob URL)
 *   headingOffset added to every heading level, so a body's `#` can become <h2>
 *   reservedIds   ids already used by the page chrome, kept out of the pool
 * @returns {{ html: string, headings: Array<{level:number,id:string,text:string}> }}
 */
export function renderMarkdown(src, options = {}) {
  const ctx = {
    linkBase: options.linkBase || '',
    headingOffset: options.headingOffset || 0,
    used: new Set(options.reservedIds || []),
    headings: [],
  };
  const lines = String(src).replace(/^﻿/, '').replace(/\r\n?/g, '\n').split('\n');
  return { html: blocks(lines, ctx), headings: ctx.headings };
}

function blocks(lines, ctx) {
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') { i++; continue; }

    // Fenced code, checked first so nothing inside a fence is interpreted.
    // The closing fence must use the same marker and be at least as long.
    const fence = line.match(/^\s*(`{3,}|~{3,})\s*(\S*)/);
    if (fence) {
      const [, marker, lang] = fence;
      const body = [];
      i++;
      while (i < lines.length) {
        const close = lines[i].match(/^\s*(`{3,}|~{3,})\s*$/);
        if (close && close[1][0] === marker[0] && close[1].length >= marker.length) { i++; break; }
        body.push(lines[i]);
        i++;
      }
      const safeLang = lang.replace(/[^a-zA-Z0-9_+-]/g, '');
      const cls = safeLang ? ` class="language-${safeLang}"` : '';
      out.push(`<pre><code${cls}>${escapeAll(body.join('\n'))}\n</code></pre>`);
      continue;
    }

    // HTML comments are dropped rather than shown. Fences are handled above,
    // so a comment inside example code is never reached here.
    if (/^\s*<!--/.test(line)) {
      while (i < lines.length && !/-->/.test(lines[i])) i++;
      i++;
      continue;
    }

    // ATX heading.
    const heading = line.match(/^ {0,3}(#{1,6})\s+(.*?)\s*#*\s*$/);
    if (heading) {
      const level = Math.min(6, heading[1].length + ctx.headingOffset);
      const text = heading[2];
      const id = uniqueSlug(text, ctx);
      ctx.headings.push({ level, id, text: stripInline(text) });
      out.push(`<h${level} id="${escapeAll(id)}">${inline(text, ctx)}</h${level}>`);
      i++;
      continue;
    }

    // Thematic break. The corpus has zero setext headings, so a "---" line is
    // always a rule and never a heading underline (tests/markdown asserts it).
    if (/^ {0,3}(?:(?:-{1,} *){3,}|(?:\* *){3,}|(?:_ *){3,})$/.test(line)) {
      out.push('<hr>');
      i++;
      continue;
    }

    // Table: a pipe row whose next line is a delimiter row.
    if (/^\s*\|/.test(line) && i + 1 < lines.length && isDelimiterRow(lines[i + 1])) {
      const header = splitRow(line);
      const aligns = splitRow(lines[i + 1]).map(alignOf);
      i += 2;
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      out.push(renderTable(header, aligns, rows, ctx));
      continue;
    }

    // Blockquote: strip one "> " from each line, render the inside recursively.
    if (/^ {0,3}>/.test(line)) {
      const body = [];
      while (i < lines.length && (/^ {0,3}>/.test(lines[i]) || (lines[i].trim() !== '' && body.length))) {
        body.push(lines[i].replace(/^ {0,3}> ?/, ''));
        i++;
      }
      out.push(`<blockquote>\n${blocks(body, ctx)}\n</blockquote>`);
      continue;
    }

    if (itemOf(line)) {
      const [html, next] = renderList(lines, i, ctx);
      out.push(html);
      i = next;
      continue;
    }

    // Paragraph: runs on until a blank line or the start of another block.
    const para = [line.trim()];
    i++;
    while (i < lines.length && lines[i].trim() !== '' && !BLOCK_START.test(lines[i]) && !/^\s*<!--/.test(lines[i])) {
      para.push(lines[i].trim());
      i++;
    }
    out.push(`<p>${inline(para.join('\n'), ctx)}</p>`);
  }

  return out.join('\n');
}

// ---- lists ----

// Returns { indent, ordered, start, task, text } for a list line, else null.
function itemOf(line) {
  const m = line.match(/^(\s*)(?:([-*+])|(\d{1,9})[.)])\s+(.*)$/);
  if (!m) return null;
  let text = m[4];
  let task = null;
  const t = text.match(/^\[([ xX])\]\s+(.*)$/);
  if (t) { task = t[1] !== ' '; text = t[2]; }
  return {
    indent: m[1].replace(/\t/g, '    ').length,
    ordered: m[2] === undefined,
    start: m[3] ? Number(m[3]) : 1,
    task,
    text,
  };
}

// Indent widths in the corpus are inconsistent (2, 3, 4 and 7-9 spaces all
// occur), so nesting is decided by comparing indents, never by a fixed step.
function renderList(lines, start, ctx) {
  const first = itemOf(lines[start]);
  const ordered = first.ordered;
  const baseIndent = first.indent;
  const items = [];
  let i = start;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === '') j++;
      if (j >= lines.length) break;
      const ahead = itemOf(lines[j]);
      const aheadIndent = lines[j].match(/^(\s*)/)[1].replace(/\t/g, '    ').length;
      if (!(ahead && ahead.indent >= baseIndent) && aheadIndent <= baseIndent) break;
      i = j;
      continue;
    }

    const item = itemOf(line);
    if (item && item.indent < baseIndent) break;

    if (item && item.indent === baseIndent && item.ordered === ordered) {
      items.push({ task: item.task, lines: [item.text] });
      i++;
      continue;
    }

    if (items.length === 0) break;

    // Anything more indented, or a plain continuation line, belongs to the
    // current item. Dedent so nested blocks parse from their own column.
    const indent = line.match(/^(\s*)/)[1].replace(/\t/g, '    ').length;
    if (indent > baseIndent) {
      items[items.length - 1].lines.push(line.slice(Math.min(indent, baseIndent + 2)));
      i++;
      continue;
    }
    if (!item && !BLOCK_START.test(line)) {
      items[items.length - 1].lines.push(line.trim());
      i++;
      continue;
    }
    break;
  }

  const tag = ordered ? 'ol' : 'ul';
  const attr = ordered && first.start !== 1 ? ` start="${first.start}"` : '';
  const isTask = items.some((it) => it.task !== null);
  const cls = isTask ? ' class="task-list"' : '';
  const body = items.map((it) => {
    const box = it.task === null
      ? ''
      : `<input type="checkbox" disabled${it.task ? ' checked' : ''}> `;
    return `<li${it.task === null ? '' : ' class="task"'}>${box}${renderItem(it.lines, ctx)}</li>`;
  }).join('\n');
  return [`<${tag}${attr}${cls}>\n${body}\n</${tag}>`, i];
}

// An item is "tight" (no <p> wrapper) when it is a single run of plain text.
function renderItem(chunk, ctx) {
  const rest = chunk.slice(1);
  const hasBlock = rest.some((l) => l.trim() !== '' && BLOCK_START.test(l)) ||
    chunk.some((l) => l.trim() === '');
  if (!hasBlock) return inline(chunk.join('\n'), ctx);
  const head = inline(chunk[0], ctx);
  const tail = blocks(rest, ctx);
  return tail ? `${head}\n${tail}` : head;
}

// ---- tables ----

function isDelimiterRow(line) {
  return /^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/.test(line) && line.includes('-') && line.includes('|');
}

function alignOf(cell) {
  const c = cell.trim();
  if (/^:-+:$/.test(c)) return 'center';
  if (/^:-+$/.test(c)) return 'left';
  if (/^-+:$/.test(c)) return 'right';
  return '';
}

// Splits a row on pipes that are neither escaped nor inside an inline-code
// span, then unescapes \| — GFM's order. Splitting after inline parsing is the
// classic bug, so cells are split first and parsed afterwards.
function splitRow(line) {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  const cells = [];
  let cur = '';
  let ticks = 0;
  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (ch === '\\' && trimmed[i + 1] === '|') { cur += '\\|'; i++; continue; }
    if (ch === '`') {
      let run = 0;
      while (trimmed[i + run] === '`') run++;
      if (ticks === 0) ticks = run;
      else if (ticks === run) ticks = 0;
      cur += '`'.repeat(run);
      i += run - 1;
      continue;
    }
    if (ch === '|' && ticks === 0) { cells.push(cur); cur = ''; continue; }
    cur += ch;
  }
  cells.push(cur);
  return cells.map((c) => c.trim().replace(/\\\|/g, '|'));
}

function renderTable(header, aligns, rows, ctx) {
  const width = header.length;
  const cell = (tag, text, idx) => {
    const a = aligns[idx] ? ` style="text-align:${aligns[idx]}"` : '';
    return `<${tag}${a}>${inline(text || '', ctx)}</${tag}>`;
  };
  const head = `<tr>${header.map((c, n) => cell('th', c, n)).join('')}</tr>`;
  const body = rows.map((r) => {
    const padded = Array.from({ length: width }, (_, n) => r[n]);
    return `<tr>${padded.map((c, n) => cell('td', c, n)).join('')}</tr>`;
  }).join('\n');
  return `<div class="table-scroll"><table>\n<thead>${head}</thead>\n<tbody>\n${body}\n</tbody>\n</table></div>`;
}

// ---- inline ----

// Escapes every ampersand. Used for code, attributes and ids, where a literal
// "&amp;" in the source must stay visible as "&amp;".
export function escapeAll(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Entity-aware: leaves an existing character reference intact, so prose
// written as "&amp;" renders as "&" the way it does on GitHub.
function escapeText(s) {
  return String(s)
    .replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Code spans are lifted out before any other rule runs so their contents stay
// literal, then restored last.
function inline(text, ctx) {
  const spans = [];
  let s = String(text).replace(/(`+)([\s\S]*?)\1/g, (_, ticks, code) => {
    spans.push(code.replace(/^ (.*) $/, '$1'));
    return NUL + (spans.length - 1) + NUL;
  });

  s = escapeText(s);

  // Inline link. Labels containing brackets do not occur in the corpus.
  s = s.replace(/\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g, (whole, label, href) =>
    link(href, label, ctx, whole));

  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  s = s.replace(/(^|[\s(])\*([^*\s][^*]*?)\*/g, '$1<em>$2</em>');
  // Underscore emphasis only when flanked by non-word characters, so
  // snake_case_names in prose are never italicised.
  s = s.replace(/(^|[^\w])_([^_\s][^_]*?)_(?![\w])/g, '$1<em>$2</em>');

  return s.replace(SPAN_RE, (_, n) => `<code>${escapeAll(spans[Number(n)])}</code>`);
}

// Plain-text form of an inline run, for the table of contents.
function stripInline(text) {
  return String(text)
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .trim();
}

function link(href, label, ctx, whole) {
  const url = resolveHref(href, ctx);
  // An unsupported scheme is not turned into a link at all.
  if (url === null) return whole;
  const external = /^https?:/i.test(url);
  const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `<a href="${escapeAll(url)}"${attrs}>${label}</a>`;
}

// A skill body links to files beside it (references/foo.md, sibling .md).
// Those files are NOT published with the site, so relative targets are pointed
// at the repository instead. In-page fragments stay local.
function resolveHref(href, ctx) {
  if (href.startsWith('#')) return href;
  if (/^(?:https?:|mailto:)/i.test(href)) return href;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return null; // javascript:, data:, …
  if (!ctx.linkBase) return href;
  return ctx.linkBase + href.replace(/^\.\//, '');
}

// GitHub-compatible slug: lowercase, drop punctuation, spaces to hyphens.
// Letters and digits of ANY script are kept — two skills in the corpus are
// written in Japanese, and stripping to ASCII would give every one of their
// headings the same empty id.
export function slug(text) {
  return String(text)
    .toLowerCase()
    .replace(/`/g, '')
    .replace(/[^\p{L}\p{N} _-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Same slug, made unique within one document and never empty.
function uniqueSlug(text, ctx) {
  const base = slug(text) || `section-${ctx.headings.length + 1}`;
  let id = base;
  let n = 2;
  while (ctx.used.has(id)) id = `${base}-${n++}`;
  ctx.used.add(id);
  return id;
}
