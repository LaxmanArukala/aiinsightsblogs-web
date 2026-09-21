import { Suspense } from 'react';
import type { Metadata } from 'next';
import BlogsListView from '@/src/components/blogs/BlogsListView';
import { blogService } from '@/src/services/blogService';
import { SORT_OPTIONS } from '@/src/constants';
import type { SortOption } from '@/src/types';

/**
 * Filters are read here, on the server, rather than only via useSearchParams in the
 * client view. Reading them client-side left the Suspense fallback as the entire
 * server-rendered HTML — no <h1> and zero article links reached crawlers.
 *
 * Touching searchParams opts this route into dynamic rendering, which is the
 * trade for having every filtered view server-rendered.
 */
interface BlogsPageProps {
  searchParams: Promise<{ category?: string; search?: string; page?: string; sort?: string }>;
}

// Filtered/paginated/sorted views are duplicates of /blogs for search purposes;
// keep them crawlable (so article links are followed) but out of the index.
export async function generateMetadata({ searchParams }: BlogsPageProps): Promise<Metadata> {
  const sp = await searchParams;
  const filtered = Boolean(sp.category || sp.search || sp.page || sp.sort);
  return filtered ? { robots: { index: false, follow: true } } : {};
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const sp = await searchParams;
  const category = sp.category ?? '';
  const search = sp.search ?? '';
  const page = Math.max(1, Number(sp.page ?? '1') || 1);
  // Validate against the known list so a hand-edited ?sort= cannot reach the API
  // and trigger its "column undefined" failure.
  const sort: SortOption = (SORT_OPTIONS.find((o) => o.value === sp.sort)?.value ?? 'latest') as SortOption;

  const initialData = await blogService
    .getBlogs({ search, category, sort, page })
    .catch(() => undefined);

  return (
    <Suspense>
      <BlogsListView initialData={initialData} initialFilters={{ search, category, page, sort }} />
    </Suspense>
  );
}
