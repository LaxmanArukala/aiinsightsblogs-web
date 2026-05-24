import type { Blog, BlogFilters, PaginatedResponse, Comment, Review } from '@/src/types';
import { blogs, comments, reviews } from '@/src/utils/mockData';
import { BLOGS_PER_PAGE } from '@/src/constants';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const blogService = {
  async getBlogs(filters: Partial<BlogFilters> = {}): Promise<PaginatedResponse<Blog>> {
    await delay(300);
    let result = [...blogs];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(b => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q));
    }
    if (filters.category) {
      result = result.filter(b => b.category.slug === filters.category);
    }
    switch (filters.sort) {
      case 'most-viewed': result.sort((a, b) => b.views - a.views); break;
      case 'most-popular': result.sort((a, b) => b.likes - a.likes); break;
      case 'highest-rated': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
    const page = filters.page ?? 1;
    const total = result.length;
    const totalPages = Math.ceil(total / BLOGS_PER_PAGE);
    return { data: result.slice((page - 1) * BLOGS_PER_PAGE, page * BLOGS_PER_PAGE), total, page, pageSize: BLOGS_PER_PAGE, totalPages };
  },

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    await delay(200);
    return blogs.find(b => b.slug === slug) ?? null;
  },

  async getFeaturedBlogs(): Promise<Blog[]> {
    await delay(200);
    return blogs.filter(b => b.featured).slice(0, 4);
  },

  async getRelatedBlogs(blogId: string, categorySlug: string): Promise<Blog[]> {
    await delay(200);
    return blogs.filter(b => b.id !== blogId && b.category.slug === categorySlug).slice(0, 3);
  },

  async getComments(blogId: string): Promise<Comment[]> {
    await delay(200);
    return comments.filter(c => c.blogId === blogId && c.parentId === null);
  },

  async getReviews(blogId: string): Promise<Review[]> {
    await delay(200);
    return reviews.filter(r => r.blogId === blogId);
  },
};
