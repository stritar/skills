'use client';

import { Check, Copy, ExternalLink, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button, ButtonLink } from '@/components/ui/button';
import { withBasePath } from '@/lib/base-path';

interface PageActionsProps {
  // Site path of the raw file in the mirror, when it is mirrored.
  rawUrl?: string;
  sourceUrl?: string | null;
  copy?: boolean;
  rawLabel?: string;
}

export function PageActions({ rawUrl, sourceUrl, copy = true, rawLabel = 'View raw Markdown' }: PageActionsProps) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    if (state === 'idle') return;
    const timer = setTimeout(() => setState('idle'), 2000);
    return () => clearTimeout(timer);
  }, [state]);

  async function copyMarkdown() {
    if (!rawUrl) return;
    const url = withBasePath(rawUrl);
    const text = fetch(url).then((res) => {
      if (!res.ok) throw new Error(`${res.status} for ${url}`);
      return res.text();
    });
    try {
      // Safari only allows a clipboard write started inside the click, so the
      // pending fetch goes into the ClipboardItem rather than being awaited first.
      if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
        const blob = text.then((t) => new Blob([t], { type: 'text/plain' }));
        await navigator.clipboard.write([new ClipboardItem({ 'text/plain': blob })]);
      } else {
        await navigator.clipboard.writeText(await text);
      }
      setState('copied');
    } catch {
      setState('failed');
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {copy && rawUrl ? (
        <Button size="sm" icon={state === 'copied' ? <Check /> : <Copy />} onClick={copyMarkdown}>
          {state === 'copied' ? 'Copied' : 'Copy Markdown'}
        </Button>
      ) : null}
      {rawUrl ? (
        <ButtonLink size="sm" href={withBasePath(rawUrl)} icon={<FileText />}>
          {rawLabel}
        </ButtonLink>
      ) : null}
      {sourceUrl ? (
        <ButtonLink size="sm" href={sourceUrl} target="_blank" rel="noreferrer noopener" icon={<ExternalLink />} iconSide="end">
          View source
        </ButtonLink>
      ) : null}
      <span role="status" aria-live="polite" className="sr-only">
        {state === 'copied'
          ? 'Markdown copied to the clipboard.'
          : state === 'failed'
            ? 'The Markdown could not be copied. Open the raw Markdown instead.'
            : ''}
      </span>
    </div>
  );
}
