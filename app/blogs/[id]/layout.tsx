import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/src/constants';

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
  category: { name: string; slug: string };
  tags: { name: string }[];
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
  const image = blog.featured_image || blog.thumbnail;
  const keywords = blog.tags?.map((t) => t.name) ?? [];

  return {
    title: blog.title,
    description: blog.excerpt,
    keywords: [blog.category.name, ...keywords, 'AI', SITE_NAME],
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
