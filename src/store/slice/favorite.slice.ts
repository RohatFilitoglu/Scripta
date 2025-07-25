import { createSlice } from "@reduxjs/toolkit";
import type { getFavoriteResponse } from "../../models/favorite.type";
import FavoriteThunks from "../asyns-thunks/favorite.thunks";
import type { RootState } from "..";

type FavoriteState = {
  favorites: getFavoriteResponse[];
};

const initialState: FavoriteState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    reset(state) {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
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

export const select = {
  favorites: (state: RootState) => state.favoriteStore.favorites,
};
