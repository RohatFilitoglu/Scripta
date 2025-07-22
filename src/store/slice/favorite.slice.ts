import { createSlice } from "@reduxjs/toolkit";
import type {
  getAllFavoritesResponse,
  getFavoriteResponse,
} from "../../models/favorite.type";
import FavoriteThunks from "../asyns-thunks/favorite.thunks";
import type { RootState } from "..";

type FavoriteState = {
  favorites: getFavoriteResponse[]; 
  allFavorites: getAllFavoritesResponse[];
};

const initialState: FavoriteState = {
  favorites: [],
  allFavorites: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    reset(state) {
      state.favorites = [];
      state.allFavorites = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      FavoriteThunks.getAllFavorite.fulfilled,
      (state, { payload }) => {
        state.allFavorites = payload;
      }
    );
    builder.addCase(
      FavoriteThunks.getFavoritesById.fulfilled,
      (state, { payload }) => {
        state.favorites = payload;
      }
    );
  },
});

export const actions = favoriteSlice.actions;
export const reducer = favoriteSlice.reducer;

export const select ={
    favorites: (state: RootState) => state.favoriteStore.favorites,
    allFavorites: (state: RootState) => state.favoriteStore.allFavorites
}