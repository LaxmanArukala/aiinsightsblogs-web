import BlogsListView from '@/src/components/blogs/BlogsListView';
import { blogService } from '@/src/services/blogService';

export const revalidate = 3600;

export default async function BlogsPage() {
  const initialData = await blogService.getBlogs({ sort: 'latest', page: 1 }).catch(() => undefined);

  return <BlogsListView initialData={initialData} />;
}
