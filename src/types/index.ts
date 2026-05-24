export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
  twitter?: string;
  linkedin?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  count?: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  featuredImage: string;
  category: Category;
  tags: Tag[];
  author: Author;
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  bookmarks: number;
  featured: boolean;
  trending: boolean;
  rating: number;
  reviewCount: number;
}

export interface Comment {
  id: string;
  blogId: string;
  parentId: string | null;
  author: { name: string; avatar: string };
  content: string;
  likes: number;
  createdAt: string;
  updatedAt?: string;
  replies?: Comment[];
}

export interface Review {
  id: string;
  blogId: string;
  author: { name: string; email: string; avatar: string };
  rating: number;
  content: string;
  createdAt: string;
  helpful: number;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  twitter?: string;
  linkedin?: string;
}

export type SortOption = 'latest' | 'most-viewed' | 'most-popular' | 'highest-rated';

export interface BlogFilters {
  search: string;
  category: string;
  tags: string[];
  sort: SortOption;
  page: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ReviewFormData {
  name: string;
  email: string;
  rating: number;
  content: string;
}
