import axios from 'axios';
import type { Blog, BlogFilters, PaginatedResponse, Comment, Review, ArticleDetailResponse, BlogStats } from '@/src/types';
import type { ApiEnvelope, RawBlog, RawBlogListResponse, RawBlogDetailResponse, RawTag, RawComment, RawCommentListResponse, RawReview, RawReviewListResponse } from '@/src/types/api';
import { BLOGS_PER_PAGE } from '@/src/constants';
import apiClient from './apiClient';

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

function mapComment(raw: RawComment): Comment {
  return {
    id:        raw.comment_id,
    blogId:    raw.blog_id,
    parentId:  null,
    author:    { name: raw.name, avatar: '' },
    content:   raw.comment_text,
    likes:     0,
    createdAt: raw.created_at,
    replies:   [],
  };
}

function mapReview(raw: RawReview): Review {
  return {
    id:        raw.review_id,
    blogId:    raw.blog_id,
    author:    { name: raw.name, email: raw.email, avatar: '' },
    rating:    raw.rating,
    content:   raw.review_text,
    createdAt: raw.created_at,
    helpful:   0,
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
    try {
      const { data: envelope } = await apiClient.get<ApiEnvelope<RawCommentListResponse>>(
        `/api/v1/blogs/${blogId}/comments`,
        { params: { status: 'approved' } },
      );
      return envelope.data.data.map(mapComment);
    } catch {
      return [];
    }
  },

  async postComment(blogId: string, payload: { name: string; comment_text: string }): Promise<Comment> {
    const { data: envelope } = await apiClient.post<ApiEnvelope<RawComment>>(
      `/api/v1/blogs/${blogId}/comments`,
      { ...payload, status: 'pending' },
    );
    return mapComment(envelope.data);
  },

  async getReviews(blogId: string): Promise<Review[]> {
    try {
      const { data: envelope } = await apiClient.get<ApiEnvelope<RawReviewListResponse>>(
        `/api/v1/blogs/${blogId}/reviews`,
        { params: { status: 'approved' } },
      );
      return envelope.data.data.map(mapReview);
    } catch {
      return [];
    }
  },

  async postReview(blogId: string, payload: { name: string; email: string; rating: number; review_text: string }): Promise<Review> {
    const { data: envelope } = await apiClient.post<ApiEnvelope<RawReview>>(
      `/api/v1/blogs/${blogId}/reviews`,
      { ...payload, status: 'pending' },
    );
    return mapReview(envelope.data);
  },
};
