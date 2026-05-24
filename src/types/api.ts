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
  slug: string;
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
  tags: RawTag[];
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
