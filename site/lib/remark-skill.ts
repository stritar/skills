// A remark plugin for Markdown that comes from skill files. It only rewrites
// the syntax tree; nothing in a skill file is evaluated.
//
//  - Raw HTML is shown as the text it is. Skills write tags in prose
//    ("set <html lang>", "<Good_Use>"), and dropping them would change the
//    instructions. HTML comments are removed, as the old web edition did.
//  - GitHub alerts (> [!WARNING]) become Fumadocs callouts.
//  - Headings move down one level when the body has an h1, so the page keeps a
//    single h1: the skill name.
//  - Links resolve through site/.content/docs-links.mjs, the module the
//    content tests use; broken or unsafe ones become plain text.
//  - Inline code naming a file of the skill, or another skill, becomes a link.
//  - Code blocks in a language the highlighter does not know, or too large to
//    highlight quickly, are shown as plain text.

export interface Resolution {
  type: 'page' | 'raw' | 'anchor' | 'external' | 'repo' | 'unsafe' | 'broken';
  href: string | null;
}

export interface SkillMarkdownOptions {
  resolveLink: (target: string) => Resolution;
  resolveCode: (code: string) => Resolution | null;
  // The highlighter's id for a fence language, or null when it has none.
  languageOf: (lang: string) => string | null;
  withBasePath: (path: string) => string;
}

interface MdNode {
  type: string;
  children?: MdNode[];
  value?: string;
  url?: string;
  alt?: string | null;
  depth?: number;
  lang?: string | null;
  data?: { hName?: string; hProperties?: Record<string, unknown> };
}

const PHRASING_PARENTS = new Set(['paragraph', 'heading', 'emphasis', 'strong', 'delete', 'link', 'linkReference', 'tableCell']);

const ALERTS: Record<string, [type: string, title: string]> = {
  NOTE: ['info', 'Note'],
  TIP: ['idea', 'Tip'],
  IMPORTANT: ['info', 'Important'],
  WARNING: ['warning', 'Warning'],
  CAUTION: ['error', 'Caution'],
};

export const HIGHLIGHT_LIMIT = 50_000;

export function remarkSkillContent(options: SkillMarkdownOptions) {
  return (tree: MdNode) => {
    const offsetHeadings = contains(tree, (n) => n.type === 'heading' && n.depth === 1);
    visit(tree, false);

    function visit(node: MdNode, insideLinkOrHeading: boolean) {
      const children = node.children;
      if (!children) return;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        switch (child.type) {
          case 'html': {
            const value = child.value ?? '';
            if (/^\s*<!--[\s\S]*-->\s*$/.test(value)) {
              children.splice(i, 1);
              i--;
            } else {
              const text: MdNode = { type: 'text', value };
              children[i] = PHRASING_PARENTS.has(node.type) ? text : { type: 'paragraph', children: [text] };
            }
            continue;
          }
          case 'heading':
            if (offsetHeadings) child.depth = Math.min(6, (child.depth ?? 1) + 1);
            break;
          case 'blockquote':
            toCallout(child);
            break;
          case 'code': {
            const lang = child.lang ? options.languageOf(child.lang) : null;
            child.lang = lang && (child.value ?? '').length <= HIGHLIGHT_LIMIT ? lang : 'text';
            continue;
          }
          case 'link':
          case 'definition': {
            const r = options.resolveLink(child.url ?? '');
            if (r.type === 'broken' || r.type === 'unsafe' || r.href === null) {
              // A definition removed here leaves its references as plain text.
              children.splice(i, 1, ...(child.children ?? []));
              i--;
              continue;
            }
            child.url = r.href;
            break;
          }
          case 'image': {
            const r = options.resolveLink(child.url ?? '');
            if (r.type === 'raw' || r.type === 'external') {
              child.url = r.type === 'raw' ? options.withBasePath(r.href ?? '') : (r.href ?? '');
            } else {
              children[i] = { type: 'text', value: child.alt ?? '' };
            }
            continue;
          }
          case 'inlineCode': {
            if (insideLinkOrHeading) continue;
            const r = options.resolveCode(child.value ?? '');
            if (r?.href) children[i] = { type: 'link', url: r.href, children: [child] };
            continue;
          }
        }
        visit(child, insideLinkOrHeading || child.type === 'link' || child.type === 'linkReference' || child.type === 'heading');
      }
    }
  };
}

function toCallout(quote: MdNode) {
  const first = quote.children?.[0];
  const lead = first?.type === 'paragraph' ? first.children?.[0] : undefined;
  if (!first || !lead || lead.type !== 'text') return;
  const m = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*(?:\r?\n|$)/i.exec(lead.value ?? '');
  if (!m) return;
  const [type, title] = ALERTS[m[1].toUpperCase()];
  lead.value = (lead.value ?? '').slice(m[0].length);
  if (lead.value === '') {
    first.children?.shift();
    if (first.children?.[0]?.type === 'break') first.children.shift();
  }
  if (first.children?.length === 0) quote.children?.shift();
  // shadow-none replaces the callout's shadow-md: on denisstritar.com only
  // floating chips carry a shadow.
  quote.data = { hName: 'Callout', hProperties: { type, title, className: ['shadow-none'] } };
}

function contains(node: MdNode, test: (n: MdNode) => boolean): boolean {
  if (test(node)) return true;
  return (node.children ?? []).some((c) => contains(c, test));
}
