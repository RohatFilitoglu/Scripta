import { createAsyncThunk } from "@reduxjs/toolkit";
import FavoriteService from "../../services/favorite.service";
import type {
  Favorite,
  AddFavoritePayload,
  DeleteFavoritePayload,
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

const deleteFavorite = createAsyncThunk<
  { message: string }, // Dönen veri türü
  DeleteFavoritePayload // Alınan parametre
>("favorite/deleteFavorite", async (payload, thunkAPI) => {
  try {
    const { data } = await FavoriteService.deleteFavorite(payload);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const FavoriteThunks = {
  getFavoritesById,
  addFavorite,
  deleteFavorite,
};

export default FavoriteThunks;
