import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import type {
  getAllCommentsResponse,
  getCommentResponse,
} from "../../models/comments.type";
import CommentThunks from "../asyns-thunks/comment.thunks";


type CommentState = {
  comments: getCommentResponse[];             
  allComments: getAllCommentsResponse[];       
};

const initialState: CommentState = {
  comments: [],
  allComments: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(CommentThunks.getAllComments.fulfilled, (state, { payload }) => {
      state.allComments = payload;
    });

    builder.addCase(CommentThunks.getCommentById.fulfilled, (state, { payload }) => {
      state.comments = [payload]; 
    });
  },
});

export const actions = commentSlice.actions;
export const reducer = commentSlice.reducer;

export const select = {
  comments: (state: RootState) => state.commentStore.comments,
  allComments: (state: RootState) => state.commentStore.allComments,
};
