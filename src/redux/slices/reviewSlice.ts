import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Review } from '@/src/types';

interface ReviewState {
  reviewsByBlog: Record<string, Review[]>;
  helpfulReviews: string[];
}

const initialState: ReviewState = {
  reviewsByBlog: {},
  helpfulReviews: [],
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReviews(state, action: PayloadAction<{ blogId: string; reviews: Review[] }>) {
      state.reviewsByBlog[action.payload.blogId] = action.payload.reviews;
    },
    addReview(state, action: PayloadAction<{ blogId: string; review: Review }>) {
      const { blogId, review } = action.payload;
      if (!state.reviewsByBlog[blogId]) state.reviewsByBlog[blogId] = [];
      state.reviewsByBlog[blogId].unshift(review);
    },
    toggleHelpful(state, action: PayloadAction<string>) {
      const idx = state.helpfulReviews.indexOf(action.payload);
      idx === -1 ? state.helpfulReviews.push(action.payload) : state.helpfulReviews.splice(idx, 1);
    },
  },
});

export const { setReviews, addReview, toggleHelpful } = reviewSlice.actions;
export default reviewSlice.reducer;
