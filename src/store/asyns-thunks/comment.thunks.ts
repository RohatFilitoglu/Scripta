import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CommentService from "../../services/comments.service";

export const getCommentsByPostId = createAsyncThunk(
  "comments/getByPostId",
  async (postId: string, thunkAPI) => {
    try {
      const { data } = await CommentService.getCommentsByPostId(postId);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.error || "Yorumlar alınamadı"
        );
      }
      return thunkAPI.rejectWithValue("Bilinmeyen hata oluştu");
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/add",
  async (
    payload: {
      postId: string;
      userId: string;
      content: string;
      author: string;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await CommentService.addComment(payload);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.error || "Yorum eklenemedi"
        );
      }
      return thunkAPI.rejectWithValue("Bilinmeyen hata oluştu");
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (id: string, thunkAPI) => {
    try {
      await CommentService.deleteComment(id);
      return id;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.error || "Yorum silinemedi"
        );
      }
      return thunkAPI.rejectWithValue("Bilinmeyen hata oluştu");
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/update",
  async (
    { id, content, author }: { id: string; content: string; author: string },
    thunkAPI
  ) => {
    try {
      const { data } = await CommentService.updateComment(id, {
        content,
        author,
      });
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.error || "Yorum güncellenemedi"
        );
      }
      return thunkAPI.rejectWithValue("Bilinmeyen hata oluştu");
    }
  }
);
