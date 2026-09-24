import HomeView from '@/src/components/home/HomeView';
import { blogService } from '@/src/services/blogService';
import { testimonialService } from '@/src/services/testimonialService';
import { categoryService } from '@/src/services/categoryService';
import { toTopics } from '@/src/utils/categories';

export const revalidate = 3600;

export default async function HomePage() {
  const [featured, all, testimonials, categories] = await Promise.all([
    blogService.getFeaturedBlogs().catch(() => []),
    blogService.getBlogs({ sort: 'latest' }).catch(() => ({ data: [], total: 0, page: 1, pageSize: 12, totalPages: 0 })),
    testimonialService.getTestimonials().catch(() => []),
    categoryService.getCategories(),
  ]);
  const topics = toTopics(categories);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Insights Blogs',
    url: 'https://aiinsightsblogs.com',
    description: 'In-depth articles on AI Agents, Large Language Models, and Generative AI.',
    potentialAction: { '@type': 'SearchAction', target: 'https://aiinsightsblogs.com/blogs?search={search_term_string}', 'query-input': 'required name=search_term_string' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeView featured={featured} latest={all.data} testimonials={testimonials} articleCount={all.total} topics={topics} />
    </>
  );
}
