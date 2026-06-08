export interface ApiEnvelope<T> {
  status: boolean;
  message: string;
  data: T;
  errors: string[];
}

export interface RawMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface RawAuthor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role?: string;
}

export interface RawCategory {
  id: string;
  name: string;
  slug?: string;
  color?: string;
}

export interface RawCategoryFull {
  id: string;
  name: string;
  slug: string;
  color: string;
  blog_count: number;
  created_at: string;
  updated_at: string;
}

export interface RawCategoryListResponse {
  data: RawCategoryFull[];
  meta: RawMeta;
}

export interface RawTag {
  id: string;
  name: string;
  slug: string;
}

export interface RawBlog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  featured_image: string;
  category: RawCategory;
  tags: (RawTag | string)[];
  author: RawAuthor;
  published_at: string;
  read_time: number;
  views: number;
  likes: number;
  bookmarks: number;
  featured: boolean;
  trending: boolean;
  rating: string;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export interface RawBlogListResponse {
  data: RawBlog[];
  meta: RawMeta;
}

export type RawBlogDetailResponse = RawBlog;

export interface RawComment {
  comment_id: string;
  blog_id: string;
  name: string;
  comment_text: string;
  created_at: string;
  updated_at?: string;
}

export interface RawCommentListResponse {
  data: RawComment[];
  meta: RawMeta;
}

export interface RawReview {
  review_id: string;
  blog_id: string;
  name: string;
  email: string;
  rating: number;
  review_text: string;
  created_at: string;
  updated_at?: string;
}

export interface RawReviewListResponse {
  data: RawReview[];
  meta: RawMeta;
}

export interface RawTestimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface RawTestimonialListResponse {
  data: RawTestimonial[];
  meta: RawMeta;
}
