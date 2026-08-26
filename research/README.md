# Research pipeline

This directory holds the evidence and machinery of the deep-research process
that populates the registry. Everything here except `cache/` is committed, so
every vendored skill can be traced from discovery to inspection to vendoring.

## Flow

1. **Discovery** — parallel research agents, one per query family (track),
   search the live web and write one raw evidence file each to
   `raw/round-<n>/<track>.json`: exact queries, URLs opened, candidates with
   discovery paths and knowledge-source tags, leads, rejections with reasons,
   and a markdown log fragment.
2. **Merge** — `node scripts/research/merge-candidates.mjs` deduplicates all
   raw files into `candidates.json` (statuses: pending → inspecting →
   vendored / rejected / quarantined / not-vendored-keeper).
3. **Inspection** — per-candidate agents open every file at a pinned commit
   SHA, resolve the license at that SHA, review for security problems, score
   against `rubric.md`, and emit a manifest to `manifests/<id>.json` with a
   verdict and, for `vendor` verdicts, a SHA-pinned file list plus a complete
   proposed catalog entry.
4. **Vendoring** — `node scripts/research/vendor.mjs` fetches each manifest's
   raw URLs, verifies git blob SHAs where provided, writes the skill directory
   (including the upstream license as `LICENSE.txt`), and merges the entry
   into `catalog/index.json` as `status: "draft"`. A curation pass flips
   entries to `verified` only after review.
5. **Log** — `node scripts/research/build-log.mjs` assembles
   `catalog/research-log.md` from `log-notes.md` (curator narrative) plus all
   raw and manifest log fragments.

## Manifest format (`manifests/<id>.json`)

```json
{
  "id": "skill-id",
  "category": "accessibility",
  "verdict": "vendor | reject | quarantine | not-vendored-keeper",
  "rubric": { "relevance": 3, "quality": 2, "conformance": 2, "uniqueness": 2 },
  "upstream": {
    "repository": "owner/repo",
    "url": "https://github.com/owner/repo/tree/<sha>/path",
    "author": "...",
    "commit": "<40-hex>",
    "path": "path/inside/repo",
    "license": "MIT",
    "licenseSource": "repo-root:LICENSE | skill-dir:LICENSE.txt | package.json"
  },
  "files": [
    { "dest": "SKILL.md", "rawUrl": "https://raw.githubusercontent.com/owner/repo/<sha>/path/SKILL.md", "blobSha": "<40-hex, optional>" },
    { "dest": "LICENSE.txt", "rawUrl": "https://raw.githubusercontent.com/owner/repo/<sha>/LICENSE" }
  ],
  "securityNotes": "...",
  "overlaps": ["other-skill-id"],
  "proposedEntry": { "— full entry per catalog/schema.json —" },
  "logMd": "#### owner/repo — inspection evidence fragment"
}
```

Rules encoded in the pipeline:

- Agents never copy files; only `vendor.mjs` writes into `skills/`, from
  SHA-pinned URLs, all-or-nothing per skill.
- A license claim in a README alone is not enough to vendor — verdict
  `quarantine` until an actual license text is confirmed at the pinned SHA.
- Candidates that are good but not redistributable get verdict
  `not-vendored-keeper` and are listed in `catalog/not-vendored.md`.

## Environment notes

- The `gh` CLI is not usable in this environment (invalid auth token, TLS
  interception in the sandbox). All fetching is plain HTTPS:
  `api.github.com` (sparingly — unauthenticated rate limits) and
  `raw.githubusercontent.com`.
- Fallback code-search surfaces when GitHub code search is unavailable:
  grep.app, sourcegraph.com, GitHub topic and repository search pages.

## Saturation criteria

Discovery stops when both hold, with the evidence recorded in
`catalog/research-log.md`:

1. New unique candidates in the latest round are fewer than 10% of the
   cumulative total.
2. No high-priority leads remain unopened.

Hard cap: 3 discovery rounds per research pass.
