'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import SearchDialog from '@/components/search';

export function Provider({ children }: { children: ReactNode }) {
  // The theme follows the system until the reader picks one; the choice is
  // kept in localStorage by next-themes.
  return <RootProvider search={{ SearchDialog }}>{children}</RootProvider>;
}
