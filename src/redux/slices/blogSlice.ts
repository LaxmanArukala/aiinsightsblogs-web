import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SortOption } from '@/src/types';

interface BlogState {
  filters: { search: string; category: string; tags: string[]; sort: SortOption; page: number };
  likedBlogs: string[];
  bookmarkedBlogs: string[];
}

const initialState: BlogState = {
  filters: { search: '', category: '', tags: [], sort: 'latest', page: 1 },
  likedBlogs: [],
  bookmarkedBlogs: [],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) { state.filters.search = action.payload; state.filters.page = 1; },
    setCategory(state, action: PayloadAction<string>) { state.filters.category = action.payload; state.filters.page = 1; },
    setTags(state, action: PayloadAction<string[]>) { state.filters.tags = action.payload; state.filters.page = 1; },
    setSort(state, action: PayloadAction<SortOption>) { state.filters.sort = action.payload; state.filters.page = 1; },
    setPage(state, action: PayloadAction<number>) { state.filters.page = action.payload; },
    resetFilters(state) { state.filters = initialState.filters; },
    toggleLike(state, action: PayloadAction<string>) {
      const idx = state.likedBlogs.indexOf(action.payload);
      idx === -1 ? state.likedBlogs.push(action.payload) : state.likedBlogs.splice(idx, 1);
    },
    toggleBookmark(state, action: PayloadAction<string>) {
      const idx = state.bookmarkedBlogs.indexOf(action.payload);
      idx === -1 ? state.bookmarkedBlogs.push(action.payload) : state.bookmarkedBlogs.splice(idx, 1);
    },
  },
});

export const { setSearch, setCategory, setTags, setSort, setPage, resetFilters, toggleLike, toggleBookmark } = blogSlice.actions;
export default blogSlice.reducer;
