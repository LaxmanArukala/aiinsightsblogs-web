import type { Category } from '@/src/types';
import type { ApiEnvelope, RawCategoryFull, RawCategoryListResponse } from '@/src/types/api';
import apiClient from './apiClient';

function mapCategory(raw: RawCategoryFull): Category {
  return {
    id:    raw.id,
    name:  raw.name,
    slug:  raw.slug,
    color: raw.color || '#0ea5e9',
    count: raw.blog_count,
  };
}

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    try {
      const { data: envelope } = await apiClient.get<ApiEnvelope<RawCategoryListResponse>>(
        '/api/v1/categories',
        { params: { limit: 100 } },
      );
      if (!envelope.data?.data) return [];
      return envelope.data.data.map(mapCategory);
    } catch {
      return [];
    }
  },
};
