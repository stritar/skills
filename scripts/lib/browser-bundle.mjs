// Turns a pure ESM lib module into a classic browser script.
//
// The site must rank results with the SAME weights as `npm run search`, and
// CONTRIBUTING.md forbids a second ranking implementation. Browsers cannot
// load `scripts/lib/ranking.mjs` directly: a `<script type="module">` is
// CORS-fetched, which fails for anyone who opens the page from a file:// URL
// after cloning. So the module is mechanically rewritten into a classic script
// at build time, and a test proves the two score identically.
//
// The transform is deliberately narrow, and every assumption it makes is
// asserted. A module that grows an `import`, a default export or a renaming
// export fails the build loudly instead of shipping a broken script.

export function toClassicScript(src, { namespace, exports, source }) {
  const stripped = String(src)
    .replace(/^export\s+(?=(?:async\s+)?function\b|const\b|let\b|var\b|class\b)/gm, '')
    .replace(/^export\s*\{[^}]*\}\s*;?[ \t]*$/gm, '');

  const leftover = stripped.match(/^[ \t]*(?:export|import)\b.*$/m);
  if (leftover) {
    throw new Error(
      `${source}: cannot convert to a classic script, this line has no plain-JS form:\n  ${leftover[0].trim()}\n` +
      'Keep the module to plain `export function` / `export const` declarations and one trailing `export { … };`.',
    );
  }

  for (const name of exports) {
    const declared = new RegExp(`^(?:async\\s+)?(?:function|const|let|var|class)\\s+${name}\\b`, 'm');
    if (!declared.test(stripped)) {
      throw new Error(`${source}: exports "${name}" but the converted script never declares it`);
    }
  }

  const returned = exports.join(', ');
  return [
    `// GENERATED FILE - do not edit. Source of truth: ${source}.`,
    '// Regenerate with `npm run catalog:build`.',
    `window.${namespace} = (function () {`,
    stripped.trim(),
    '',
    `  return { ${returned} };`,
    '})();',
    '',
  ].join('\n');
}
