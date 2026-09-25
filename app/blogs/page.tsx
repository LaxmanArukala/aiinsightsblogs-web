import { Suspense } from 'react';
import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import BlogsListView from '@/src/components/blogs/BlogsListView';
import { blogService } from '@/src/services/blogService';
import { categoryService } from '@/src/services/categoryService';
import { SORT_OPTIONS } from '@/src/constants';
import type { SortOption } from '@/src/types';
import { slugifyCategory } from '@/src/utils/categories';

/**
 * Filters are read here, on the server, rather than only via useSearchParams in the
 * client view. Reading them client-side left the Suspense fallback as the entire
 * server-rendered HTML — no <h1> and zero article links reached crawlers.
 *
 * Touching searchParams opts this route into dynamic rendering, which is the
 * trade for having every filtered view server-rendered.
 */
interface BlogsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/*
 * ANY query string makes this a variant of /blogs, so it stays crawlable (article
 * links get followed) but out of the index.
 *
 * Listing the four known filters was not enough: every article links its tags to
 * /blogs?tag=<slug>, which this page has never read, so those URLs rendered the
 * unfiltered list while declaring "index, follow". Search Console collected 555 of
 * them as "Alternative page with proper canonical tag". Keying off the presence of
 * any parameter also covers utm_* and whatever gets added next.
 */
export async function generateMetadata({ searchParams }: BlogsPageProps): Promise<Metadata> {
  const sp = await searchParams;
  return Object.keys(sp).length > 0 ? { robots: { index: false, follow: true } } : {};
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? '';

  /*
   * Old links point at the display name — /blogs?category=Computer%20Vision — which
   * matches no slug, so the page answered 200 with an empty list and Google filed it
   * as a soft 404. Send those to the slug form instead of rendering nothing.
   */
  const rawCategory = one(sp.category);
  if (rawCategory && rawCategory !== slugifyCategory(rawCategory)) {
    const next = new URLSearchParams();
    for (const [k, v] of Object.entries(sp)) next.set(k, Array.isArray(v) ? v[0] ?? '' : v ?? '');
    next.set('category', slugifyCategory(rawCategory));
    permanentRedirect(`/blogs?${next.toString()}`);
  }

  const category = rawCategory;
  const search = one(sp.search);
  const page = Math.max(1, Number(one(sp.page) || '1') || 1);
  // Validate against the known list so a hand-edited ?sort= cannot reach the API
  // and trigger its "column undefined" failure.
  const sort: SortOption = (SORT_OPTIONS.find((o) => o.value === one(sp.sort))?.value ?? 'latest') as SortOption;

  const [initialData, initialCategories] = await Promise.all([
    blogService.getBlogs({ search, category, sort, page }).catch(() => undefined),
    categoryService.getCategories(),
  ]);

  return (
    <Suspense>
      <BlogsListView initialData={initialData} initialCategories={initialCategories} initialFilters={{ search, category, page, sort }} />
    </Suspense>
  );
}
