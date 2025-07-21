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
  async (id, thunkAPI) => {
    try {
      const { data } = await CommentService.getComment(id);
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

      if (error && typeof error === "object" && "isAxiosError" in error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        message = axiosError.response?.data?.message || message;
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);


const CommentThunks = {
  getAllComments,
  getCommentById,
  newComment,
};

export default CommentThunks;
