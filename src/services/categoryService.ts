import type { Category } from '@/src/types';
import type { ApiEnvelope, RawCategoryFull, RawCategoryListResponse } from '@/src/types/api';
import apiClient from './apiClient';
import { slugifyCategory } from '@/src/utils/categories';

function mapCategory(raw: RawCategoryFull): Category {
  return {
    id:    raw.id,
    name:  raw.name,
    // The API returns no slug; derive it the same way the backend resolves a filter.
    slug:  raw.slug ?? slugifyCategory(raw.name),
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
      return envelope.data.data
        .map(mapCategory)
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch {
      return [];
    }
  },
};
