import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/src/constants';

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.aiinsightsblogs.com';
    const res = await fetch(`${base}/api/v1/blogs?limit=1000`);
    if (!res.ok) return [];
    const json = await res.json();
    const blogs: { id: string; slug: string }[] = json?.data?.data ?? [];
    return blogs.map((blog) => ({ id: `${blog.id}-${blog.slug}` }));
  } catch {
    return [];
  }
}

interface Props {
  params: Promise<{ id: string }>;
}

interface RawBlog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featured_image: string;
  thumbnail: string;
  category: { name: string; slug?: string };
  tags: ({ name: string } | string)[];
}

async function fetchBlog(id: string): Promise<RawBlog | null> {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.aiinsightsblogs.com';
    const res = await fetch(`${base}/api/v1/blogs/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data ?? null) as RawBlog | null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: param } = await params;
  const uuid = param.substring(0, 36);
  const blog = await fetchBlog(uuid);

  if (!blog) {
    return { title: 'Article Not Found' };
  }

  const url = `${SITE_URL}/blogs/${blog.id}-${blog.slug}`;
  const DEFAULT_OG = 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80';
  const image = blog.featured_image || blog.thumbnail || DEFAULT_OG;
  const keywords = (blog.tags ?? [])
    .map((t) => (typeof t === 'string' ? t : t.name))
    .filter((k): k is string => Boolean(k));

  return {
    title: blog.title,
    description: blog.excerpt,
    keywords: [...(blog.category ? [blog.category.name] : []), ...keywords, 'AI', SITE_NAME],
    alternates: { canonical: url },
    openGraph: {
      title: `${blog.title} | ${SITE_NAME}`,
      description: blog.excerpt,
      url,
      siteName: SITE_NAME,
      type: 'article',
      images: [{ url: image, width: 1200, height: 630, alt: blog.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [image],
    },
  };
}

export default function BlogDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
