import { createSlice } from "@reduxjs/toolkit";
import type {
  getAllPostsResponse,
  getPostResponse,
} from "../../models/posts.type";
import type { RootState } from "..";
import PostThunks from "../asyns-thunks/post.thunks";

type PostState = {
  allPosts: getAllPostsResponse | undefined;
  selectedPost: getPostResponse | undefined;
};

const initialState: PostState = {
  allPosts: undefined,
  selectedPost: undefined,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PostThunks.getAllPosts.fulfilled, (state, { payload }) => {
      state.allPosts = payload;
    });
    builder.addCase(PostThunks.getPostById.fulfilled, (state, { payload }) => {
      state.selectedPost = payload;
    });
  },
});

export const actions = postSlice.actions;
export const reducer = postSlice.reducer;

export const select = {
  getAllPosts: (state: RootState) => state.postStore.allPosts,
  getSelectedPost: (state: RootState) => state.postStore.selectedPost,
};
