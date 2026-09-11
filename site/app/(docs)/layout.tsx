import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { FullSearchTrigger, SmallSearchTrigger } from '@/components/search-trigger';
import { SidebarSkillItem } from '@/components/sidebar-item';
import { getManifest } from '@/lib/content';
import { getSource } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  const manifest = getManifest();
  return (
    <DocsLayout
      tree={getSource().getPageTree()}
      nav={{ title: <span className="font-semibold">{manifest.title}</span> }}
      githubUrl={manifest.repo?.url}
      sidebar={{ defaultOpenLevel: 0, components: { Item: SidebarSkillItem } }}
      slots={{ searchTrigger: { sm: SmallSearchTrigger, full: FullSearchTrigger } }}
    >
      {children}
    </DocsLayout>
  );
}
