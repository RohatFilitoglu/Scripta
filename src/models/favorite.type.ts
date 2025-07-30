import type{ PostType } from "./posts.type";

export type Favorite = {
  id: string;
  userId: string;
  postId: string;
  created_at: string;
};

export type getFavoriteResponse = {
  id: string;
  userId: string;
  postId: string;
  created_at: string;
  post?: PostType;
};

export type AddFavoritePayload = {
  userId: string;
  postId: string;
};

export type DeleteFavoritePayload = {
  userId: string;
  postId: string;
};
