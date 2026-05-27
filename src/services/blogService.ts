import axios from 'axios';
import type { Blog, BlogFilters, PaginatedResponse, Comment, Review, ArticleDetailResponse, BlogStats } from '@/src/types';
import type { ApiEnvelope, RawBlog, RawBlogListResponse, RawBlogDetailResponse, RawTag } from '@/src/types/api';
import { comments, reviews } from '@/src/utils/mockData';
import { BLOGS_PER_PAGE } from '@/src/constants';
import apiClient from './apiClient';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function mapBlog(raw: RawBlog): Blog {
  return {
    id:            raw.id,
    slug:          raw.slug,
    title:         raw.title,
    excerpt:       raw.excerpt ?? '',
    content:       raw.content ?? '',
    thumbnail:     raw.thumbnail ?? '',
    featuredImage: raw.featured_image ?? '',
    category: raw.category ? {
      id:    raw.category.id,
      name:  raw.category.name,
      slug:  raw.category.slug,
      color: raw.category.color ?? '#0ea5e9',
    } : { id: '', name: 'General', slug: 'general', color: '#0ea5e9' },
    tags:        Array.isArray(raw.tags)
      ? raw.tags.filter((t): t is RawTag => typeof t === 'object' && t !== null)
      : [],
    author:      raw.author ?? { id: '', name: 'AI Insights Blogs', avatar: '', bio: '' },
    publishedAt: raw.published_at,
    readTime:    raw.read_time ?? 5,
    views:       raw.views ?? 0,
    likes:       raw.likes ?? 0,
    bookmarks:   raw.bookmarks ?? 0,
    featured:    raw.featured ?? false,
    trending:    raw.trending ?? false,
    rating:      Number.parseFloat(raw.rating) || 0,
    reviewCount: raw.review_count ?? 0,
  };
}

function mapPaginatedBlogs(raw: RawBlogListResponse): PaginatedResponse<Blog> {
  return {
    data:       raw.data.map(mapBlog),
    total:      raw.meta.total,
    page:       raw.meta.page,
    pageSize:   raw.meta.limit,
    totalPages: raw.meta.total_pages,
  };
}

export const blogService = {
  async getBlogs(filters: Partial<BlogFilters> = {}): Promise<PaginatedResponse<Blog>> {
    const params: Record<string, unknown> = {
      page:  filters.page ?? 1,
      limit: BLOGS_PER_PAGE,
    };
    if (filters.search)   params.search   = filters.search;
    if (filters.category) params.category = filters.category;
    if (filters.sort)     params.sort     = filters.sort;
    if (filters.featured) params.featured = true;

    const { data: envelope } = await apiClient.get<ApiEnvelope<RawBlogListResponse>>('/api/v1/blogs', { params });
    return mapPaginatedBlogs(envelope.data);
  },

  async getFeaturedBlogs(): Promise<Blog[]> {
    const { data: envelope } = await apiClient.get<ApiEnvelope<RawBlogListResponse>>('/api/v1/blogs', {
      params: { featured: true, limit: 4 },
    });
    return envelope.data.data.map(mapBlog);
  },

  async getBlogById(id: string): Promise<ArticleDetailResponse | null> {
    try {
      const { data: envelope } = await apiClient.get<ApiEnvelope<RawBlogDetailResponse>>(`/api/v1/blogs/${id}`);
      return {
        blog:    mapBlog(envelope.data),
        related: [],
      };
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) return null;
      throw err;
    }
  },

  async getStats(): Promise<BlogStats> {
    const { data: envelope } = await apiClient.get<ApiEnvelope<RawBlogListResponse>>('/api/v1/blogs', {
      params: { limit: 1000 },
    });
    const blogs = envelope.data.data;
    const totalArticles = envelope.data.meta.total;
    const totalViews = blogs.reduce((sum, b) => sum + (b.views ?? 0), 0);
    const totalLikes = blogs.reduce((sum, b) => sum + (b.likes ?? 0), 0);
    const categories = new Set(blogs.map(b => b.category.slug)).size;
    return { totalArticles, totalViews, totalLikes, categories };
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
