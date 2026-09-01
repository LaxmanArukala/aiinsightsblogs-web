import AboutView from '@/src/components/about/AboutView';
import { blogService } from '@/src/services/blogService';

export const revalidate = 3600;

export default async function AboutPage() {
  // Counts are fetched rather than written into the copy: the previous page claimed
  // "30+ Articles" and "3 Core AI Topics", both long out of date.
  const data = await blogService.getBlogs({ page: 1 }).catch(() => undefined);
  return <AboutView articleCount={data?.total ?? 0} />;
}
