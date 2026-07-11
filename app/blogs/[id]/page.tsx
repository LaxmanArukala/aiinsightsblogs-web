import { preload } from 'react-dom';
import BlogDetailView from '@/src/components/blog/BlogDetailView';
import { blogService } from '@/src/services/blogService';
import type { Blog } from '@/src/types';

const UUID_LENGTH = 36;

export const revalidate = 3600;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BlogDetailPage({ params }: Props) {
  const { id: param } = await params;
  const id = param.substring(0, UUID_LENGTH);

  const detail = await blogService.getBlogById(id).catch(() => null);
  if (!detail) return <BlogDetailView blog={null} otherArticles={[]} relatedBlogs={[]} />;

  const blog = detail.blog;

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
