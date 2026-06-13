import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/src/constants';

export const revalidate = 3600;

interface RawBlog {
  id: string;
  slug: string;
  updated_at: string;
}

interface RawMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

async function fetchBlogPage(base: string, page: number): Promise<{ blogs: RawBlog[]; meta: RawMeta } | null> {
  try {
    const res = await fetch(`${base}/api/v1/blogs?limit=100&page=${page}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return { blogs: json?.data?.data ?? [], meta: json?.data?.meta };
  } catch {
    return null;
  }
}

async function fetchAllBlogs(): Promise<RawBlog[]> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.aiinsightsblogs.com';
  const first = await fetchBlogPage(base, 1);
  if (!first) return [];

  const allBlogs: RawBlog[] = [...first.blogs];
  const totalPages = first.meta?.total_pages ?? 1;

  const remaining = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) => fetchBlogPage(base, i + 2)),
  );
  for (const result of remaining) {
    if (result) allBlogs.push(...result.blogs);
  }

  return allBlogs;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await fetchAllBlogs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/blogs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_URL}/blogs/${blog.id}-${blog.slug}`,
    lastModified: new Date(blog.updated_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
