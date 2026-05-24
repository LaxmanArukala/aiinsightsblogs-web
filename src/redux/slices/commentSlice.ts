import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Comment } from '@/src/types';

interface CommentState {
  commentsByBlog: Record<string, Comment[]>;
  likedComments: string[];
}

const initialState: CommentState = {
  commentsByBlog: {},
  likedComments: [],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<{ blogId: string; comments: Comment[] }>) {
      state.commentsByBlog[action.payload.blogId] = action.payload.comments;
    },
    addComment(state, action: PayloadAction<{ blogId: string; comment: Comment }>) {
      const { blogId, comment } = action.payload;
      if (!state.commentsByBlog[blogId]) state.commentsByBlog[blogId] = [];
      const addReply = (comments: Comment[]): boolean => {
        for (const c of comments) {
          if (c.id === comment.parentId) {
            if (!c.replies) c.replies = [];
            c.replies.push(comment);
            return true;
          }
          if (c.replies && addReply(c.replies)) return true;
        }
        return false;
      };
      if (comment.parentId) addReply(state.commentsByBlog[blogId]);
      else state.commentsByBlog[blogId].push(comment);
    },
    deleteComment(state, action: PayloadAction<{ blogId: string; commentId: string }>) {
      const { blogId, commentId } = action.payload;
      const remove = (comments: Comment[]): Comment[] =>
        comments.filter(c => {
          if (c.id === commentId) return false;
          if (c.replies) c.replies = remove(c.replies);
          return true;
        });
      if (state.commentsByBlog[blogId]) state.commentsByBlog[blogId] = remove(state.commentsByBlog[blogId]);
    },
    toggleCommentLike(state, action: PayloadAction<string>) {
      const idx = state.likedComments.indexOf(action.payload);
      idx === -1 ? state.likedComments.push(action.payload) : state.likedComments.splice(idx, 1);
    },
  },
});

export const { setComments, addComment, deleteComment, toggleCommentLike } = commentSlice.actions;
export default commentSlice.reducer;
