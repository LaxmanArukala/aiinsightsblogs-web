import axios from 'axios';
import type { Blog, BlogFilters, PaginatedResponse, Comment, Review, ArticleDetailResponse, BlogStats, Tag } from '@/src/types';
import type { ApiEnvelope, RawBlog, RawBlogListResponse, RawBlogDetailResponse, RawTag, RawComment, RawCommentListResponse, RawReview, RawReviewListResponse, RawViewsData, RawLikesData, RawBookmarksData, RawSharesData } from '@/src/types/api';
import { BLOGS_PER_PAGE } from '@/src/constants';
import { getVisitorId } from '@/src/utils/visitorId';
import { resolveBlogImage } from '@/src/utils/blogImage';
import apiClient from './apiClient';

function analyticsHeaders() {
  const id = getVisitorId();
  return id ? { 'x-visitor-id': id } : {};
}

function slugifyTag(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * Tags are deduplicated by slug, keeping the first spelling seen.
 *
 * The API commonly returns both a title-case and a lowercase form of the same tag
 * ('Prompt Engineering' and 'prompt engineering') — 55% of sampled posts had at
 * least one such collision. Both slugify to the same value, which rendered
 * duplicate chips and, because the slug is used as the React key, produced
 * "Encountered two children with the same key" warnings.
 */
function mapTags(raw: RawBlog['tags']): Tag[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const tags: Tag[] = [];
  for (const entry of raw) {
    const tag: Tag = typeof entry === 'string'
      ? { id: slugifyTag(entry), name: entry, slug: slugifyTag(entry) }
      : (entry as RawTag);
    if (!tag.slug || seen.has(tag.slug)) continue;
    seen.add(tag.slug);
    tags.push(tag);
  }
  return tags;
}

function mapBlog(raw: RawBlog): Blog {
  return {
    id:            raw.id,
    slug:          raw.slug,
    title:         raw.title,
    excerpt:       raw.excerpt ?? '',
    content:       raw.content ?? '',
    thumbnail:     resolveBlogImage(raw.thumbnail, raw.id, raw.slug),
    featuredImage: resolveBlogImage(raw.featured_image, raw.id, raw.slug),
    category: raw.category ? {
      id:    raw.category.id,
      name:  raw.category.name,
      slug:  raw.category.slug ?? raw.category.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      color: raw.category.color ?? '#0ea5e9',
    } : { id: '', name: 'General', slug: 'general', color: '#0ea5e9' },
    tags:        mapTags(raw.tags),
    author:      raw.author ?? { id: '', name: 'AI Insights Blogs', avatar: '', bio: '' },
    publishedAt: raw.published_at,
    updatedAt:   raw.updated_at ?? raw.published_at,
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

  async getRelatedBlogs(categoryId: string, excludeId: string): Promise<Blog[]> {
    try {
      const { data: envelope } = await apiClient.get<ApiEnvelope<RawBlogListResponse>>(
        '/api/v1/blogs/related',
        { params: { category_id: categoryId, limit: 6 } },
      );
      return envelope.data.data.map(mapBlog).filter(b => b.id !== excludeId);
    } catch {
      const { data: envelope } = await apiClient.get<ApiEnvelope<RawBlogListResponse>>(
        '/api/v1/blogs',
        { params: { category_id: categoryId, limit: 7 } },
      );
      return envelope.data.data.map(mapBlog).filter(b => b.id !== excludeId).slice(0, 6);
    }
  },

  async getFeaturedBlogs(): Promise<Blog[]> {
    const { data: envelope } = await apiClient.get<ApiEnvelope<RawBlogListResponse>>('/api/v1/blogs', {
      params: { featured: true, limit: 5 }, // 1 lead + 4 shortlist on the homepage
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
    const categories = new Set(blogs.map(b => b.category?.slug).filter(Boolean)).size;
    return { totalArticles, totalViews, totalLikes, categories };
  },

  async trackView(blogId: string): Promise<RawViewsData> {
    const { data: envelope } = await apiClient.post<ApiEnvelope<RawViewsData>>(`/api/v1/blogs/${blogId}/views`, {}, { headers: analyticsHeaders() });
    return envelope.data;
  },

  async getLikes(blogId: string): Promise<RawLikesData> {
    const { data: envelope } = await apiClient.get<ApiEnvelope<RawLikesData>>(`/api/v1/blogs/${blogId}/likes`, { headers: analyticsHeaders() });
    return envelope.data;
  },

  async toggleLike(blogId: string): Promise<RawLikesData> {
    const { data: envelope } = await apiClient.post<ApiEnvelope<RawLikesData>>(`/api/v1/blogs/${blogId}/likes`, {}, { headers: analyticsHeaders() });
    return envelope.data;
  },

  async getBookmarks(blogId: string): Promise<RawBookmarksData> {
    const { data: envelope } = await apiClient.get<ApiEnvelope<RawBookmarksData>>(`/api/v1/blogs/${blogId}/bookmarks`, { headers: analyticsHeaders() });
    return envelope.data;
  },

  async toggleBookmark(blogId: string): Promise<RawBookmarksData> {
    const { data: envelope } = await apiClient.post<ApiEnvelope<RawBookmarksData>>(`/api/v1/blogs/${blogId}/bookmarks`, {}, { headers: analyticsHeaders() });
    return envelope.data;
  },

  async trackShare(blogId: string): Promise<RawSharesData> {
    const { data: envelope } = await apiClient.post<ApiEnvelope<RawSharesData>>(`/api/v1/blogs/${blogId}/shares`, {}, { headers: analyticsHeaders() });
    return envelope.data;
  },

  async getShares(blogId: string): Promise<RawSharesData> {
    const { data: envelope } = await apiClient.get<ApiEnvelope<RawSharesData>>(`/api/v1/blogs/${blogId}/shares`, { headers: analyticsHeaders() });
    return envelope.data;
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
