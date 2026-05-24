import axios from 'axios';
import type { Blog, BlogFilters, PaginatedResponse, Comment, Review, ArticleDetailResponse } from '@/src/types';
import type { ApiEnvelope, RawBlog, RawBlogListResponse, RawBlogDetailResponse } from '@/src/types/api';
import { comments, reviews } from '@/src/utils/mockData';
import { BLOGS_PER_PAGE } from '@/src/constants';
import apiClient from './apiClient';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const CATEGORY_COLORS: Record<string, string> = {
  'machine-learning': '#8b5cf6',
  'deep-learning':    '#0ea5e9',
  'nlp':              '#10b981',
  'data-science':     '#f59e0b',
  'ai-ethics':        '#ef4444',
  'computer-vision':  '#ec4899',
};

function mapBlog(raw: RawBlog): Blog {
  return {
    id:            raw.id,
    slug:          raw.slug,
    title:         raw.title,
    excerpt:       raw.excerpt,
    content:       raw.content,
    thumbnail:     raw.thumbnail,
    featuredImage: raw.featured_image,
    category: {
      id:    raw.category.id,
      name:  raw.category.name,
      slug:  raw.category.slug,
      color: CATEGORY_COLORS[raw.category.slug] ?? '#0ea5e9',
    },
    tags:        raw.tags,
    author:      raw.author,
    publishedAt: raw.published_at,
    readTime:    raw.read_time,
    views:       raw.views,
    likes:       raw.likes,
    bookmarks:   raw.bookmarks,
    featured:    raw.featured,
    trending:    raw.trending,
    rating:      parseFloat(raw.rating),
    reviewCount: raw.review_count,
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

  async getComments(blogId: string): Promise<Comment[]> {
    await delay(200);
    return comments.filter(c => c.blogId === blogId && c.parentId === null);
  },

  async getReviews(blogId: string): Promise<Review[]> {
    await delay(200);
    return reviews.filter(r => r.blogId === blogId);
  },
};
