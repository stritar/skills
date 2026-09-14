#!/usr/bin/env node
// Calculates WCAG 2.x contrast ratios.
// Used to judge color combinations during an accessibility check. Do not judge by eye or mental arithmetic.

const USAGE = `Usage:
  node contrast.mjs <foreground> <background> [options]
  node contrast.mjs --json '[{"label":"body","fg":"#767676","bg":"#fff"}, ...]'

Arguments:
  foreground / background   #rgb #rrggbb rgb() rgba() hsl() or a CSS color keyword
                             A semi-transparent foreground is composited onto the
                             background before calculating

Options:
  --size <px>       Font size (default: 16)
  --bold            Treat as bold (font-weight >= 700)
  --large           Explicitly treat as large text (takes priority over --size/--bold)
  --json <JSON>     Judge multiple combinations at once. Each element is
                    { label, fg, bg, size?, bold? }
  --help            Show this help

Criteria (WCAG 2.2):
  SC 1.4.3  Text            4.5:1 or higher (3:1 or higher for large text)
  SC 1.4.11 Non-text        3:1 or higher
  Large text = 24px or larger, or bold at 18.66px or larger
`;

const KEYWORDS = {
  black: "#000000", silver: "#c0c0c0", gray: "#808080", grey: "#808080",
  white: "#ffffff", maroon: "#800000", red: "#ff0000", purple: "#800080",
  fuchsia: "#ff00ff", magenta: "#ff00ff", green: "#008000", lime: "#00ff00",
  olive: "#808000", yellow: "#ffff00", navy: "#000080", blue: "#0000ff",
  teal: "#008080", aqua: "#00ffff", cyan: "#00ffff", orange: "#ffa500",
  transparent: "rgba(0,0,0,0)",
};

/** Converts a CSS color string to {r,g,b,a} (0-255, 0-1) */
export function parseColor(input) {
  if (typeof input !== "string") throw new TypeError(`Color value is not a string: ${input}`);
  let s = input.trim().toLowerCase();
  if (KEYWORDS[s]) s = KEYWORDS[s];

  let m = s.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    const h = m[1];
    const expand = (c) => parseInt(c + c, 16);
    if (h.length === 3 || h.length === 4) {
      return {
        r: expand(h[0]), g: expand(h[1]), b: expand(h[2]),
        a: h.length === 4 ? expand(h[3]) / 255 : 1,
      };
    }
    if (h.length === 6 || h.length === 8) {
      return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
        a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1,
      };
    }
  }

  m = s.match(/^rgba?\(([^)]+)\)$/);
  if (m) {
    const parts = m[1].split(/[\s,/]+/).filter(Boolean);
    const channel = (v) => {
      const n = v.endsWith("%") ? (parseFloat(v) / 100) * 255 : parseFloat(v);
      return Math.min(255, Math.max(0, n));
    };
    const alpha = (v) => {
      if (v === undefined) return 1;
      const n = v.endsWith("%") ? parseFloat(v) / 100 : parseFloat(v);
      return Math.min(1, Math.max(0, n));
    };
    return { r: channel(parts[0]), g: channel(parts[1]), b: channel(parts[2]), a: alpha(parts[3]) };
  }

  m = s.match(/^hsla?\(([^)]+)\)$/);
  if (m) {
    const parts = m[1].split(/[\s,/]+/).filter(Boolean);
    const h = ((parseFloat(parts[0]) % 360) + 360) % 360;
    const sat = parseFloat(parts[1]) / 100;
    const li = parseFloat(parts[2]) / 100;
    const a = parts[3] === undefined ? 1 : (parts[3].endsWith("%") ? parseFloat(parts[3]) / 100 : parseFloat(parts[3]));
    const c = (1 - Math.abs(2 * li - 1)) * sat;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const mm = li - c / 2;
    const seg = [[c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x]][Math.floor(h / 60) % 6];
    return { r: (seg[0] + mm) * 255, g: (seg[1] + mm) * 255, b: (seg[2] + mm) * 255, a };
  }

  throw new Error(`Cannot parse color: ${input}`);
}

/** Composites a semi-transparent foreground color onto the background color */
export function composite(fg, bg) {
  if (fg.a >= 1) return fg;
  return {
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  };
}

/** WCAG 2.x relative luminance */
export function relativeLuminance({ r, g, b }) {
  const lin = (v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** Contrast ratio (1-21) */
export function contrastRatio(fgInput, bgInput) {
  const bg = parseColor(bgInput);
  const fg = composite(parseColor(fgInput), bg);
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

/** Whether this counts as large text (24px or larger, or bold at 18.66px or larger) */
export function isLargeText(size = 16, bold = false) {
  return bold ? size >= 18.66 : size >= 24;
}

export function judge({ fg, bg, size = 16, bold = false, large }) {
  const ratio = contrastRatio(fg, bg);
  const big = large === undefined ? isLargeText(size, bold) : large;
  const required = big ? 3 : 4.5;
  return {
    ratio,
    rounded: Math.floor(ratio * 100) / 100,
    large: big,
    required,
    passAA: ratio >= required,
    passAAA: ratio >= (big ? 4.5 : 7),
    passNonText: ratio >= 3, // SC 1.4.11
  };
}

function formatLine(label, r) {
  const mark = r.passAA ? "PASS" : "FAIL";
  const kind = r.large ? "large text" : "text";
  return `${mark}  ${r.rounded.toFixed(2)}:1  (${kind} / required ${r.required}:1)${label ? `  ${label}` : ""}`;
}

function main(argv) {
  if (argv.includes("--help") || argv.length === 0) {
    process.stdout.write(USAGE);
    return 0;
  }

  const jsonIndex = argv.indexOf("--json");
  if (jsonIndex !== -1) {
    const raw = argv[jsonIndex + 1];
    if (!raw) {
      process.stderr.write("--json requires a JSON array\n");
      return 1;
    }
    let items;
    try {
      items = JSON.parse(raw);
    } catch (e) {
      process.stderr.write(`Cannot parse JSON: ${e.message}\n`);
      return 1;
    }
    let failed = 0;
    for (const item of items) {
      try {
        const r = judge(item);
        if (!r.passAA) failed++;
        process.stdout.write(formatLine(item.label ?? `${item.fg} on ${item.bg}`, r) + "\n");
      } catch (e) {
        failed++;
        process.stdout.write(`ERROR ${item.label ?? ""}: ${e.message}\n`);
      }
    }
    process.stdout.write(`\n${failed} of ${items.length} combinations do not meet AA\n`);
    return failed > 0 ? 1 : 0;
  }

  const positional = [];
  let size = 16;
  let bold = false;
  let large;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--size") { size = parseFloat(argv[++i]); }
    else if (a === "--bold") { bold = true; }
    else if (a === "--large") { large = true; }
    else if (a.startsWith("--")) {
      process.stderr.write(`Unknown option: ${a}\n`);
      return 1;
    } else { positional.push(a); }
  }

  if (positional.length < 2) {
    process.stderr.write("Please specify both a foreground and a background color\n\n" + USAGE);
    return 1;
  }

  let r;
  try {
    r = judge({ fg: positional[0], bg: positional[1], size, bold, large });
  } catch (e) {
    process.stderr.write(`${e.message}\n`);
    return 1;
  }

  process.stdout.write(
    `Foreground: ${positional[0]}\nBackground: ${positional[1]}\n` +
    `Contrast ratio: ${r.rounded.toFixed(2)}:1\n\n` +
    `SC 1.4.3 (AA, ${r.large ? "large text" : "text"}): ${r.passAA ? "PASS" : "FAIL"} (required ${r.required}:1)\n` +
    `SC 1.4.6 (AAA): ${r.passAAA ? "PASS" : "FAIL"}\n` +
    `SC 1.4.11 (AA, non-text): ${r.passNonText ? "PASS" : "FAIL"} (required 3:1)\n`
  );
  return r.passAA ? 0 : 1;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exitCode = main(process.argv.slice(2));
}
