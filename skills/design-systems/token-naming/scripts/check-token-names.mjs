#!/usr/bin/env node
// Lints design-token NAMES (not values) across DTCG JSON files and CSS
// custom-property files. Zero dependencies.
//
// Usage:
//   node check-token-names.mjs <path...> [options]
//
// <path...>  Files or directories. Directories are walked recursively for
//            *.json (DTCG token sets) and *.css (custom-property sheets).
//
// Options:
//   --grammar <regex>              Full token name must match this regex.
//                                   Enables rule "grammar-mismatch".
//   --tiers primitive=<prefix>,semantic=<prefix>,component=<prefix>
//                                   Declares tier prefixes. Enables
//                                   "component-references-primitive" (needs
//                                   component+primitive), "numbered-semantic"
//                                   and "opinion-word-at-semantic-tier" (both
//                                   need semantic=).
//   --opinion-words <comma,list>   Words banned at the semantic tier. Enables
//                                   "opinion-word-at-semantic-tier" (also
//                                   needs --tiers semantic=).
//   --json                         Emit machine-readable JSON instead of text.
//
// Rules (always on unless noted):
//   unresolved-alias               A {alias} / var(--x) reference that does
//                                   not resolve to any declared token.
//   mixed-scale-siblings           Sibling leaf keys under one parent mix
//                                   naming scales (numeric / t-shirt / level
//                                   / word), which reads as an inconsistent
//                                   system. Fires when a parent has 3+ sibling
//                                   tokens and either two of {numeric, tshirt,
//                                   level} appear, or one of them appears
//                                   alongside a plain word. The 3-sibling
//                                   floor applies to every case: two keys
//                                   are too few to call a scale, and a
//                                   numbered pair at the semantic tier is
//                                   already reported by numbered-semantic.
//   raw-value-in-composite (JSON)  A composite token ($value is an object or
//                                   an array of objects — typography, shadow,
//                                   gradient, border, ...) has a part that is
//                                   a literal string/number instead of an
//                                   {alias}.
//   component-references-primitive Needs --tiers. A component-tier token
//                                   aliases a primitive-tier token directly,
//                                   skipping the semantic tier.
//   numbered-semantic              Needs --tiers semantic=. A semantic-tier
//                                   token whose leaf name is bare digits, or
//                                   ends in "-<digits>", unless it is a
//                                   declared level/step/elevation scale
//                                   ("level-2", "step-3").
//   grammar-mismatch               Needs --grammar. Full token name (dotted
//                                   path for JSON, "--name" for CSS) does not
//                                   match the regex.
//   opinion-word-at-semantic-tier  Needs --opinion-words and --tiers
//                                   semantic=. A semantic-tier token whose
//                                   name contains a banned word as a whole
//                                   "."/"-"-delimited segment.
//
// Exit codes: 0 = clean, 1 = findings reported, 2 = usage error (bad
// arguments, missing/unreadable path, invalid JSON, invalid --grammar regex).

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { pathToFileURL } from 'node:url';

const ALIAS_RE = /^\{([^}]+)\}$/;
const NUMERIC_RE = /^\d+$/;
const ENDS_DASH_DIGIT_RE = /-\d+$/;
const LEVEL_RE = /^(level|step|elevation)-?\d+$/i;
const TSHIRT_RE = /^(x{0,3}s|s|sm|m|md|l|lg|x{0,3}l|xs|xl|xxl|xxxl|[2-9]xl|[2-9]xs)$/i;

function usageError(msg) {
  process.stderr.write(`${msg}\n`);
  process.exit(2);
}

function parseArgs(argv) {
  const paths = [];
  let grammar = null;
  let tiers = null;
  let opinionWords = null;
  let jsonOutput = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--grammar') grammar = argv[++i];
    else if (a === '--tiers') tiers = argv[++i];
    else if (a === '--opinion-words') opinionWords = argv[++i];
    else if (a === '--json') jsonOutput = true;
    else if (a.startsWith('--')) usageError(`unknown option: ${a}`);
    else paths.push(a);
  }
  if (paths.length === 0) usageError('usage: check-token-names.mjs <path...> [--grammar <regex>] [--tiers primitive=p,semantic=s,component=c] [--opinion-words a,b] [--json]');

  let grammarRe = null;
  if (grammar != null) {
    try { grammarRe = new RegExp(grammar); }
    catch (e) { usageError(`invalid --grammar regex: ${e.message}`); }
  }

  let tierMap = null;
  if (tiers != null) {
    tierMap = {};
    for (const part of tiers.split(',')) {
      const eq = part.indexOf('=');
      if (eq === -1) usageError(`invalid --tiers entry (expected tier=prefix): ${part}`);
      tierMap[part.slice(0, eq).trim()] = part.slice(eq + 1).trim();
    }
  }

  const opinionList = opinionWords != null
    ? opinionWords.split(',').map((w) => w.trim().toLowerCase()).filter(Boolean)
    : null;

  return { paths, grammarRe, grammarSrc: grammar, tierMap, opinionList, jsonOutput };
}

function collectFiles(paths) {
  const files = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(json|css)$/i.test(entry.name)) files.push(full);
    }
  };
  for (const p of paths) {
    if (!existsSync(p)) usageError(`path not found: ${p}`);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (st.isFile()) {
      if (!/\.(json|css)$/i.test(p)) usageError(`unsupported file (expected .json or .css): ${p}`);
      files.push(p);
    }
  }
  return files.sort();
}

// ---- alias helpers ----
function isAlias(v) { return typeof v === 'string' && ALIAS_RE.test(v.trim()); }
function aliasTarget(v) { return v.trim().match(ALIAS_RE)[1].trim(); }

function collectAliasesDeep(value) {
  const refs = [];
  if (typeof value === 'string') {
    if (isAlias(value)) refs.push(aliasTarget(value));
  } else if (Array.isArray(value)) {
    for (const v of value) refs.push(...collectAliasesDeep(v));
  } else if (value && typeof value === 'object') {
    for (const v of Object.values(value)) refs.push(...collectAliasesDeep(v));
  }
  return refs;
}

function normalizeRef(ref) {
  let norm = ref.trim();
  while (norm.startsWith('./') || norm.startsWith('../')) {
    norm = norm.startsWith('../') ? norm.slice(3) : norm.slice(2);
  }
  return norm;
}

function resolveJsonAlias(ref, tokenNames) {
  const trimmed = ref.trim();
  if (tokenNames.has(trimmed)) return true;
  const norm = normalizeRef(trimmed);
  if (tokenNames.has(norm)) return true;
  const tail = norm.includes('.') ? norm.split('.').slice(1).join('.') : norm;
  if (tokenNames.has(tail)) return true;
  for (const k of tokenNames) {
    if (k.endsWith(norm) || k.endsWith(tail)) return true;
  }
  return false;
}

// ---- JSON (DTCG) parsing ----
function walkDtcg(obj, segments, file, tokens) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return;
  if ('$value' in obj) {
    tokens.push({ kind: 'json', name: segments.join('.'), segments: segments.slice(), file, value: obj.$value });
    return;
  }
  for (const key of Object.keys(obj)) {
    if (key.startsWith('$')) continue;
    const v = obj[key];
    if (v && typeof v === 'object' && !Array.isArray(v)) walkDtcg(v, [...segments, key], file, tokens);
  }
}

function findRawParts(value) {
  const offending = [];
  const checkPart = (key, v) => {
    if (typeof v === 'string') { if (!isAlias(v)) offending.push(key); }
    else if (typeof v === 'number') offending.push(key);
  };
  if (Array.isArray(value)) {
    value.forEach((el, idx) => {
      if (el && typeof el === 'object' && !Array.isArray(el)) {
        for (const [k, v] of Object.entries(el)) checkPart(`[${idx}].${k}`, v);
      }
    });
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) checkPart(k, v);
  }
  return offending;
}

// ---- CSS parsing ----
function parseCss(text, file, tokens, varRefs) {
  const stripped = text.replace(/\/\*[\s\S]*?\*\//g, '');
  const declRe = /--([a-zA-Z][a-zA-Z0-9_-]*)\s*:\s*([^;}]+)[;}]/g;
  let m;
  while ((m = declRe.exec(stripped))) {
    const name = m[1];
    const value = m[2].trim();
    const refs = [];
    const varRe = /var\(\s*--([a-zA-Z][a-zA-Z0-9_-]*)/g;
    let vm;
    while ((vm = varRe.exec(value))) refs.push(vm[1]);
    tokens.push({ kind: 'css', name, segments: name.split('-'), file, value, refs });
    for (const r of refs) varRefs.push({ from: name, to: r, file });
  }
}

// ---- shared classification ----
function classifyLeaf(leaf) {
  if (NUMERIC_RE.test(leaf)) return 'numeric';
  if (TSHIRT_RE.test(leaf)) return 'tshirt';
  if (LEVEL_RE.test(leaf)) return 'level';
  return 'word';
}

function hasPrefix(name, prefix, sep) {
  if (prefix == null) return false;
  const p = prefix.endsWith(sep) ? prefix : prefix + sep;
  return name === prefix || name.startsWith(p);
}

function segmentsOf(name) { return name.split(/[.-]/); }

function main(argv) {
  const { paths, grammarRe, grammarSrc, tierMap, opinionList, jsonOutput } = parseArgs(argv);
  const files = collectFiles(paths);

  const jsonTokens = [];
  const cssTokens = [];
  const cssVarRefs = [];

  for (const file of files) {
    if (extname(file).toLowerCase() === '.json') {
      let raw;
      try { raw = readFileSync(file, 'utf8'); } catch (e) { usageError(`cannot read ${file}: ${e.message}`); }
      let data;
      try { data = JSON.parse(raw); } catch (e) { usageError(`invalid JSON in ${file}: ${e.message}`); }
      walkDtcg(data, [], file, jsonTokens);
    } else {
      let raw;
      try { raw = readFileSync(file, 'utf8'); } catch (e) { usageError(`cannot read ${file}: ${e.message}`); }
      parseCss(raw, file, cssTokens, cssVarRefs);
    }
  }

  const jsonTokenNames = new Set(jsonTokens.map((t) => t.name));
  const cssTokenNames = new Set(cssTokens.map((t) => t.name));

  const findings = [];
  const add = (rule, name, file, message) => findings.push({ rule, name, file, message });

  // Rule: unresolved-alias (JSON)
  for (const t of jsonTokens) {
    for (const ref of collectAliasesDeep(t.value)) {
      if (!resolveJsonAlias(ref, jsonTokenNames)) {
        add('unresolved-alias', t.name, t.file, `alias {${ref}} does not resolve to any known token`);
      }
    }
  }
  // Rule: unresolved-alias (CSS)
  for (const { from, to, file } of cssVarRefs) {
    if (!cssTokenNames.has(to)) {
      add('unresolved-alias', `--${from}`, file, `var(--${to}) does not resolve to any declared custom property`);
    }
  }

  // Rule: mixed-scale-siblings (JSON + CSS, grouped by parent)
  const jsonGroups = new Map();
  for (const t of jsonTokens) {
    const parent = t.segments.slice(0, -1).join('.');
    const leaf = t.segments[t.segments.length - 1];
    if (!jsonGroups.has(parent)) jsonGroups.set(parent, []);
    jsonGroups.get(parent).push({ leaf, file: t.file });
  }
  const cssGroups = new Map();
  for (const t of cssTokens) {
    const parent = t.segments.slice(0, -1).join('-');
    const leaf = t.segments[t.segments.length - 1];
    if (!cssGroups.has(parent)) cssGroups.set(parent, []);
    cssGroups.get(parent).push({ leaf, file: t.file });
  }
  const checkMixedScales = (groups) => {
    for (const [parent, siblings] of groups) {
      if (!parent || siblings.length < 3) continue;
      const classes = siblings.map((s) => classifyLeaf(s.leaf));
      const scaleClasses = new Set(classes.filter((c) => c !== 'word'));
      const hasWord = classes.includes('word');
      const fires = scaleClasses.size >= 2 || (scaleClasses.size === 1 && hasWord);
      if (fires) {
        const detail = siblings.map((s, i) => `${s.leaf} (${classes[i]})`).join(', ');
        add('mixed-scale-siblings', parent, siblings[0].file, `siblings mix naming scales: ${detail}`);
      }
    }
  };
  checkMixedScales(jsonGroups);
  checkMixedScales(cssGroups);

  // Rule: raw-value-in-composite (JSON only)
  for (const t of jsonTokens) {
    if (t.value && typeof t.value === 'object') {
      const offending = findRawParts(t.value);
      if (offending.length > 0) {
        add('raw-value-in-composite', t.name, t.file, `raw (non-alias) part(s): ${offending.join(', ')}`);
      }
    }
  }

  const skipped = [];

  // Rule: component-references-primitive (needs --tiers)
  if (tierMap) {
    const { component, primitive } = tierMap;
    if (component && primitive) {
      for (const t of jsonTokens) {
        if (!hasPrefix(t.name, component, '.')) continue;
        for (const ref of collectAliasesDeep(t.value)) {
          const norm = normalizeRef(ref);
          if (hasPrefix(norm, primitive, '.')) {
            add('component-references-primitive', t.name, t.file, `aliases primitive-tier token {${ref}} directly; alias through a semantic token instead`);
          }
        }
      }
      for (const t of cssTokens) {
        if (!hasPrefix(t.name, component, '-')) continue;
        for (const ref of t.refs) {
          if (hasPrefix(ref, primitive, '-')) {
            add('component-references-primitive', `--${t.name}`, t.file, `aliases primitive-tier custom property var(--${ref}) directly; alias through a semantic token instead`);
          }
        }
      }
    }
  } else {
    skipped.push('component-references-primitive');
  }

  // Rule: numbered-semantic (needs --tiers semantic=)
  if (tierMap && tierMap.semantic) {
    const semantic = tierMap.semantic;
    const checkNumbered = (name, leaf, file, displayName) => {
      const numbered = NUMERIC_RE.test(leaf) || ENDS_DASH_DIGIT_RE.test(leaf);
      if (numbered && classifyLeaf(leaf) !== 'level') {
        add('numbered-semantic', displayName, file, `leaf "${leaf}" is purely numeric naming; use a role word or a declared level/step scale`);
      }
    };
    for (const t of jsonTokens) {
      if (!hasPrefix(t.name, semantic, '.')) continue;
      checkNumbered(t.name, t.segments[t.segments.length - 1], t.file, t.name);
    }
    for (const t of cssTokens) {
      if (!hasPrefix(t.name, semantic, '-')) continue;
      checkNumbered(t.name, t.segments[t.segments.length - 1], t.file, `--${t.name}`);
    }
  } else {
    skipped.push('numbered-semantic');
  }

  // Rule: grammar-mismatch (needs --grammar)
  if (grammarRe) {
    for (const t of jsonTokens) {
      if (!grammarRe.test(t.name)) add('grammar-mismatch', t.name, t.file, `does not match grammar ${grammarRe}`);
    }
    for (const t of cssTokens) {
      if (!grammarRe.test(`--${t.name}`)) add('grammar-mismatch', `--${t.name}`, t.file, `does not match grammar ${grammarRe}`);
    }
  } else {
    skipped.push('grammar-mismatch');
  }

  // Rule: opinion-word-at-semantic-tier (needs --opinion-words and --tiers semantic=)
  if (opinionList && tierMap && tierMap.semantic) {
    const semantic = tierMap.semantic;
    const checkOpinion = (name, file, displayName) => {
      const segs = segmentsOf(name).map((s) => s.toLowerCase());
      for (const word of opinionList) {
        if (segs.includes(word)) {
          add('opinion-word-at-semantic-tier', displayName, file, `contains opinion word "${word}" at the semantic tier`);
        }
      }
    };
    for (const t of jsonTokens) {
      if (hasPrefix(t.name, semantic, '.')) checkOpinion(t.name, t.file, t.name);
    }
    for (const t of cssTokens) {
      if (hasPrefix(t.name, semantic, '-')) checkOpinion(t.name, t.file, `--${t.name}`);
    }
  } else {
    skipped.push('opinion-word-at-semantic-tier');
  }

  findings.sort((a, b) => (a.file === b.file ? a.name.localeCompare(b.name) : a.file.localeCompare(b.file)));

  const totalTokens = jsonTokens.length + cssTokens.length;
  const totalFiles = files.length;

  if (jsonOutput) {
    process.stdout.write(JSON.stringify({ findings, skipped, tokens: totalTokens, files: totalFiles }, null, 2) + '\n');
  } else {
    for (const f of findings) {
      process.stdout.write(`${f.rule}  ${f.name}  (${f.file})  ${f.message}\n`);
    }
    process.stdout.write(`\n${findings.length} finding(s) across ${totalTokens} token(s) in ${totalFiles} file(s)\n`);
  }

  return findings.length > 0 ? 1 : 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = main(process.argv.slice(2));
}
