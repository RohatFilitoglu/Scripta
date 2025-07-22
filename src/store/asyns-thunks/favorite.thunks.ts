import { createAsyncThunk } from "@reduxjs/toolkit";
import FavoriteService from "../../services/favorite.service";
import type {
  Favorite,
  AddFavoritePayload,
  getAllFavoritesResponse,
} from "../../models/favorite.type";

const getFavoritesById = createAsyncThunk<Favorite[], string>(
  "favorite/getFavoritesByUser",
  async (userId, thunkAPI) => {
    try {
      const { data } = await FavoriteService.getFavoritesByUser(userId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getAllFavorite = createAsyncThunk<getAllFavoritesResponse[]>(
  "favorite/getAllFavorite",
  async (_, thunkAPI) => {
    try {
      const { data } = await FavoriteService.getAllFavorite();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const addFavorite = createAsyncThunk<Favorite, AddFavoritePayload>(
  "favorite/addFavorite",
  async (payload, thunkAPI) => {
    try {
      const { data } = await FavoriteService.addFavorite(payload);
      return data!;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const deleteFavorite = createAsyncThunk<{ message: string }, string>(
  "favorite/deleteComment",
  async (id, thunkAPI) => {
    try {
      const { data } = await FavoriteService.deleteFavorite(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const FavoriteThunks = {
  getFavoritesById,
  getAllFavorite,
  addFavorite,
  deleteFavorite,
};

export default FavoriteThunks;
