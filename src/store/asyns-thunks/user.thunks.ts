import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/users.service";
import type { UserDetail } from "../../models/users.type";

const getUserDetail = createAsyncThunk<UserDetail, string>(
  "user/getUserDetail",
  async (userId, thunkAPI) => {
    try {
      const { data } = await UserService.getUserDetail(userId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const UserThunks = {
  getUserDetail,
};

export default UserThunks;
