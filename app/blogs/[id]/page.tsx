import { preload } from 'react-dom';
import { notFound, permanentRedirect } from 'next/navigation';
import BlogDetailView from '@/src/components/blog/BlogDetailView';
import { blogService } from '@/src/services/blogService';
import { mergedTarget } from '@/src/utils/merged';
import type { Blog } from '@/src/types';

const UUID_LENGTH = 36;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const revalidate = 3600;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BlogDetailPage({ params }: Props) {
  const { id: param } = await params;
  const id = param.substring(0, UUID_LENGTH);

  // A genuine miss must be a real 404 (not a 200 "not found" page, which Google
  // reports as a soft 404). Transient API errors are left to throw so they are
  // never cached or indexed as a missing article.
  // The API answers 500 (not 404) for a malformed id, so reject those here.
  if (!UUID_RE.test(id)) notFound();

  /*
   * Merged duplicates redirect before the article is fetched, so the URL keeps
   * working after the copy is withdrawn from the archive — and the redirect is
   * what hands its ranking signals to the copy that was kept.
   */
  const merged = mergedTarget(id);
  if (merged) permanentRedirect(merged);

  const detail = await blogService.getBlogById(id);
  if (!detail) notFound();

  const blog = detail.blog;

  // One article, one URL: bare-UUID and wrong-slug requests redirect to the
  // canonical `id-slug` form instead of serving duplicate 200 pages.
  if (param !== `${blog.id}-${blog.slug}`) permanentRedirect(`/blogs/${blog.id}-${blog.slug}`);

  if (blog.featuredImage) {
    preload(blog.featuredImage, { as: 'image', fetchPriority: 'high' });
  }

  const [otherData, relatedBlogs] = await Promise.all([
    blogService.getBlogs({ sort: 'latest', page: 1 }).catch(() => ({ data: [] as Blog[] })),
    blog.category?.id ? blogService.getRelatedBlogs(blog.category.id, id).catch(() => [] as Blog[]) : Promise.resolve([] as Blog[]),
  ]);
  const otherArticles = otherData.data.filter(b => b.id !== id).slice(0, 5);

  return <BlogDetailView blog={blog} otherArticles={otherArticles} relatedBlogs={relatedBlogs} />;
}
