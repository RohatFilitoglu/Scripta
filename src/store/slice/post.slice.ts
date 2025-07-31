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
  userPosts: getAllPostsResponse | undefined;
  searchPosts: getAllPostsResponse | undefined;
  loading: boolean;
};

const initialState: PostState = {
  allPosts: undefined,
  selectedPost: undefined,
  userPosts: undefined,
  searchPosts: undefined,
  loading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    clearSelectedPost(state) {
      state.selectedPost = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PostThunks.getAllPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(PostThunks.getAllPosts.fulfilled, (state, { payload }) => {
      state.allPosts = payload;
      state.loading = false;
    });
    builder.addCase(PostThunks.getAllPosts.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(PostThunks.getPostById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(PostThunks.getPostById.fulfilled, (state, { payload }) => {
      state.selectedPost = payload;
      state.loading = false;
    });
    builder.addCase(PostThunks.getPostById.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(PostThunks.getPostsByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      PostThunks.getPostsByUser.fulfilled,
      (state, { payload }) => {
        state.userPosts = payload;
        state.loading = false;
      }
    );
    builder.addCase(PostThunks.getPostsByUser.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      PostThunks.getSearchPost.fulfilled,
      (state, { payload }) => {
        state.searchPosts = payload;
      }
    );
  },
});

export const actions = postSlice.actions;
export const reducer = postSlice.reducer;
export const { reset, clearSelectedPost } = postSlice.actions;

export const select = {
  getAllPosts: (state: RootState) => state.postStore.allPosts,
  getSelectedPost: (state: RootState) => state.postStore.selectedPost,
  getUserPosts: (state: RootState) => state.postStore.userPosts,
  getLoading: (state: RootState) => state.postStore.loading,
  getSearchPosts: (state: RootState) => state.postStore.searchPosts,
};
