import { createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "../../services/post.service";
import type {
  getAllPostsResponse,
  getPostResponse,
  newPostPayload,
} from "../../models/posts.type";

const getAllPosts = createAsyncThunk<getAllPostsResponse>(
  "post/getAllPosts",
  async (_, thunkAPI) => {
    try {
      const { data } = await PostService.getAllPosts();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getPostById = createAsyncThunk<getPostResponse, string>(
  "post/getPostById",
  async (id, thunkAPI) => {
    try {
      const { data } = await PostService.getPost(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
  
const newPost = createAsyncThunk<string, newPostPayload>(
  "post/postnewPost",
  async (payload, thunkAPI) => {
    try {
      const { data } = await PostService.newPost(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const PostThunks = {
  getAllPosts,
  getPostById,
  newPost,
};

export default PostThunks;
