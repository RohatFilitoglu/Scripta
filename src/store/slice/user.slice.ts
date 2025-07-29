import { createSlice } from "@reduxjs/toolkit";
import type { UserDetail } from "../../models/users.type";
import type { RootState } from "..";
import UserThunks from "../asyns-thunks/user.thunks";

type UserState = {
  userDetail: UserDetail | undefined;
  loading: boolean;
};

const initialState: UserState = {
  userDetail: undefined,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserDetail() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UserThunks.getUserDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UserThunks.getUserDetail.fulfilled, (state, { payload }) => {
      state.userDetail = payload;
      state.loading = false;
    });
    builder.addCase(UserThunks.getUserDetail.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const actions = userSlice.actions;
export const reducer = userSlice.reducer;

export const select = {
  getUserDetail: (state: RootState) => state.userStore.userDetail,
  getLoading: (state: RootState) => state.userStore.loading,
};
