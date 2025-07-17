import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";
import * as CommentThunks from "../asyns-thunks/comment.thunks";

export type Comment = {
  id: string;
  postId: string;
  userId: string;
  content: string;
  author: string;
  date?: string;
};

type CommentState = {
  comments: Comment[];
  loading: boolean;
  error: string | null;
};

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(CommentThunks.getCommentsByPostId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        CommentThunks.getCommentsByPostId.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(CommentThunks.getCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(CommentThunks.addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        CommentThunks.addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.comments.unshift(action.payload);
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(CommentThunks.addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder.addCase(
      CommentThunks.deleteComment.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      }
    );

    builder.addCase(
      CommentThunks.updateComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        const index = state.comments.findIndex(
          (comment) => comment.id === action.payload.id
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      }
    );
  },
});

export const commentActions = commentSlice.actions;
export const commentReducer = commentSlice.reducer;

export const selectComments = (state: RootState) => state.commentStore.comments;
export const selectLoading = (state: RootState) => state.commentStore.loading;
export const selectError = (state: RootState) => state.commentStore.error;
