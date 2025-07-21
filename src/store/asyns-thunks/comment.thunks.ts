import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  getAllCommentsResponse,
  getCommentResponse,
  newCommentPayload,
} from "../../models/comments.type";
import CommentService from "../../services/comments.service";
import type { AxiosError } from "axios";

const getAllComments = createAsyncThunk<getAllCommentsResponse[]>(
  "comment/getAllComments", 
  async (_, thunkAPI) => {
    try {
      const { data } = await CommentService.getAllComments();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getCommentById = createAsyncThunk<getCommentResponse, string>(
  "comment/getCommentById",
  async (postid, thunkAPI) => {
    try {
      const { data } = await CommentService.getComment(postid);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const newComment = createAsyncThunk(
  "comment/newComment",
  async (payload: newCommentPayload, thunkAPI) => {
    try {
      const { data } = await CommentService.newComment(payload);
      return data;
    } catch (error: unknown) {
      let message = "Bir hata oluştu";

      if (error && typeof error === "object" && "isAxiosError" in error) { // bu kismi bi ara kavra
        const axiosError = error as AxiosError<{ message?: string }>;
        message = axiosError.response?.data?.message || message;
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const deleteComment = createAsyncThunk<{ message: string }, string>(
  "comment/deleteComment",
  async (id, thunkAPI) => {
    try {
      const { data } = await CommentService.deleteComment(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const CommentThunks = {
  getAllComments,
  getCommentById,
  newComment,
  deleteComment,
};

export default CommentThunks;
