'use client';

import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { staticClient } from 'fumadocs-core/search/client/orama-static';
import { withBasePath } from '@/lib/base-path';

// The search index is a static file in the export, downloaded once and queried
// in the browser; no search service is involved. Its URL spells out the base
// path because the search client does not read Next.js's basePath.
const client = staticClient({ from: withBasePath('/api/search.json') });

export default function DocsSearchDialog(props: SharedProps) {
  const { search, setSearch, query } = useDocsSearch({ client });

  return (
    <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput placeholder="Search the full text of every skill" />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
