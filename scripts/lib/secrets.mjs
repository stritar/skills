// Secret/credential scanning for vendored and original content.
// Split into hard errors (unambiguous credential formats) and warnings
// (generic assignments that may be examples).

const ERROR_PATTERNS = [
  { name: 'aws-access-key', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: 'github-token', re: /\bgh[pousr]_[A-Za-z0-9]{36,}\b/ },
  { name: 'github-fine-grained-token', re: /\bgithub_pat_[A-Za-z0-9_]{22,}\b/ },
  { name: 'slack-token', re: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/ },
  { name: 'private-key-block', re: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/ },
  { name: 'anthropic-key', re: /\bsk-ant-[A-Za-z0-9_-]{20,}\b/ },
  { name: 'stripe-live-key', re: /\bsk_live_[A-Za-z0-9]{20,}\b/ },
];

const WARN_PATTERNS = [
  { name: 'openai-style-key', re: /\bsk-[A-Za-z0-9]{32,}\b/ },
  { name: 'generic-secret-assignment', re: /\b(?:api[_-]?key|secret|token|password)\s*[:=]\s*["'][A-Za-z0-9_\-/+]{20,}["']/i },
];

export function scanText(text, file) {
  const findings = [];
  const lines = text.split('\n');
  for (const [severity, patterns] of [['error', ERROR_PATTERNS], ['warning', WARN_PATTERNS]]) {
    for (const { name, re } of patterns) {
      lines.forEach((line, i) => {
        if (re.test(line)) findings.push({ severity, pattern: name, file, line: i + 1 });
      });
    }
  }
  return findings;
}

export function isProbablyBinary(buf) {
  const sample = buf.subarray(0, 8000);
  return sample.includes(0);
}
