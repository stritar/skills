import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Provider } from '@/components/provider';
import { getManifest } from '@/lib/content';
import { fontVariables } from '@/lib/fonts';
import { siteUrl } from '@/lib/site';
import './global.css';

export function generateMetadata(): Metadata {
  const { title, counts } = getManifest();
  return {
    metadataBase: new URL(`${siteUrl}/`),
    title: { default: title, template: `%s · ${title}` },
    description: `${counts.skills} agent skills for product design work, with the full instructions of each skill.`,
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
