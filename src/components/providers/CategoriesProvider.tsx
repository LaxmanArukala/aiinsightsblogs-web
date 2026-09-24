'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Topic } from '@/src/utils/categories';

/**
 * Categories fetched once in the root layout (server side) and shared with every
 * client component below it.
 *
 * Footer renders on every page, so fetching in the component would have meant a
 * client-side request per page and category links missing from the server-rendered
 * HTML — invisible to crawlers. Reading them from here keeps them in the markup.
 */
const CategoriesContext = createContext<Topic[]>([]);

export function CategoriesProvider({ topics, children }: { topics: Topic[]; children: ReactNode }) {
  return <CategoriesContext.Provider value={topics}>{children}</CategoriesContext.Provider>;
}

export function useCategories(): Topic[] {
  return useContext(CategoriesContext);
}
