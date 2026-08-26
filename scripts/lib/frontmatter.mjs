// Minimal YAML-subset frontmatter parser for SKILL.md files.
//
// Deliberately NOT a general YAML parser. It supports exactly what real-world
// skill frontmatter uses: top-level scalars (plain, quoted), block scalars
// (>, >-, |, |-), simple lists (- item), one-level nested string maps, and
// flow lists ([a, b]). Anything else is a hard error so malformed files fail
// validation instead of silently parsing wrong.

export function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) {
    return { data: null, body: raw, error: 'no frontmatter fence at start of file' };
  }
  const lines = raw.split('\n');
  if (lines[0].trim() !== '---') {
    return { data: null, body: raw, error: 'first line is not a bare "---" fence' };
  }
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t === '---' || t === '...') { end = i; break; }
  }
  if (end === -1) {
    return { data: null, body: raw, error: 'unterminated frontmatter (no closing "---")' };
  }
  const yamlLines = lines.slice(1, end);
  const body = lines.slice(end + 1).join('\n');
  try {
    return { data: parseYamlSubset(yamlLines), body, error: null };
  } catch (e) {
    return { data: null, body, error: e.message };
  }
}

function parseYamlSubset(lines) {
  const data = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed === '' || trimmed.startsWith('#')) { i++; continue; }
    if (/^\s/.test(line)) {
      throw new Error(`line ${i + 1}: unexpected indentation outside a block`);
    }
    const m = line.match(/^([A-Za-z0-9_-]+):(.*)$/);
    if (!m) throw new Error(`line ${i + 1}: expected "key: value", got ${JSON.stringify(line)}`);
    const key = m[1];
    const rest = m[2].trim();

    if (rest === '' ) {
      // Nested block: list, one-level map, or empty value.
      const block = collectIndented(lines, i + 1);
      if (block.lines.length === 0) {
        data[key] = null;
        i++;
      } else if (block.lines[0].trim().startsWith('- ')) {
        data[key] = block.lines.map((l, j) => {
          const t = l.trim();
          if (!t.startsWith('- ')) throw new Error(`line ${i + 2 + j}: expected list item under "${key}"`);
          return parseScalar(t.slice(2).trim());
        });
        i = block.next;
      } else {
        const map = {};
        for (let j = 0; j < block.lines.length; j++) {
          const t = block.lines[j].trim();
          if (t === '' || t.startsWith('#')) continue;
          const mm = t.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
          if (!mm) throw new Error(`line ${i + 2 + j}: expected "key: value" inside map "${key}"`);
          if (mm[2] === '') throw new Error(`line ${i + 2 + j}: nesting deeper than one level under "${key}" is not supported`);
          map[mm[1]] = parseScalar(mm[2]);
        }
        data[key] = map;
        i = block.next;
      }
    } else if (rest === '>' || rest === '>-' || rest === '|' || rest === '|-') {
      const block = collectIndented(lines, i + 1);
      const text = block.lines.map(stripCommonIndent(block.lines)).join('\n');
      data[key] = rest.startsWith('>')
        ? text.replace(/\n(?!\n)/g, ' ').replace(/\n+/g, '\n').trim()
        : (rest === '|' ? text + '\n' : text.replace(/\n+$/, ''));
      i = block.next;
    } else if (rest.startsWith('[')) {
      if (!rest.endsWith(']')) throw new Error(`line ${i + 1}: flow list for "${key}" must close on the same line`);
      const inner = rest.slice(1, -1).trim();
      data[key] = inner === '' ? [] : inner.split(',').map(s => parseScalar(s.trim()));
      i++;
    } else if (rest.startsWith('{')) {
      throw new Error(`line ${i + 1}: flow maps are not supported`);
    } else {
      data[key] = parseScalar(rest);
      i++;
    }
  }
  return data;
}

function collectIndented(lines, start) {
  const collected = [];
  let i = start;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') { collected.push(''); i++; continue; }
    if (/^\s/.test(line)) { collected.push(line); i++; continue; }
    break;
  }
  // Drop trailing blank lines so they don't leak into values.
  while (collected.length && collected[collected.length - 1] === '') collected.pop();
  return { lines: collected, next: i };
}

function stripCommonIndent(lines) {
  let indent = Infinity;
  for (const l of lines) {
    if (l.trim() === '') continue;
    indent = Math.min(indent, l.match(/^\s*/)[0].length);
  }
  if (!isFinite(indent)) indent = 0;
  return (l) => (l.trim() === '' ? '' : l.slice(indent));
}

function parseScalar(s) {
  if (s === '' ) return '';
  const unquoted = s.replace(/\s+#.*$/, '').trim();
  if ((unquoted.startsWith('"') && unquoted.endsWith('"') && unquoted.length >= 2)) {
    return unquoted.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
  }
  if ((unquoted.startsWith("'") && unquoted.endsWith("'") && unquoted.length >= 2)) {
    return unquoted.slice(1, -1).replace(/''/g, "'");
  }
  if (unquoted === 'true') return true;
  if (unquoted === 'false') return false;
  if (unquoted === 'null' || unquoted === '~') return null;
  if (/^-?\d+$/.test(unquoted)) return Number(unquoted);
  if (/^-?\d+\.\d+$/.test(unquoted)) return Number(unquoted);
  // Plain scalar; colons inside are tolerated (common in descriptions).
  return s.trim();
}
