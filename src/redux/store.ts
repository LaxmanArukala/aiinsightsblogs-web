import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import blogReducer from './slices/blogSlice';
import commentReducer from './slices/commentSlice';
import reviewReducer from './slices/reviewSlice';

export const store = configureStore({
  reducer: { ui: uiReducer, blog: blogReducer, comment: commentReducer, review: reviewReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
