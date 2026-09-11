// Display names for the catalog's closed vocabularies (catalog/schema.json).
// An id without a name here is shown as written.
const COMPATIBILITY: Record<string, string> = {
  'claude-code': 'Claude Code',
  'claude-ai': 'Claude.ai',
  codex: 'Codex',
  cursor: 'Cursor',
  opencode: 'OpenCode',
  amp: 'Amp',
  'gemini-cli': 'Gemini CLI',
  copilot: 'GitHub Copilot',
  'vs-code': 'VS Code',
};

export function compatibilityLabel(id: string): string {
  return COMPATIBILITY[id] ?? id;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
