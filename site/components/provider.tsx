'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ComponentProps, ReactNode } from 'react';
import SearchDialog from '@/components/search';

// next-themes writes data-theme as well as the .dark class. Fumadocs and
// Tailwind's dark: variant read the class; the portfolio's tokens in
// app/styles/ flip on the attribute. Declared once, outside the component, so
// the provider does not see a new object on every render.
const theme: ComponentProps<typeof RootProvider>['theme'] = { attribute: ['class', 'data-theme'] };

export function Provider({ children }: { children: ReactNode }) {
  // The theme follows the system until the reader picks one; the choice is
  // kept in localStorage by next-themes.
  return (
    <RootProvider search={{ SearchDialog }} theme={theme}>
      {children}
    </RootProvider>
  );
}
