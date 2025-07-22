export type Favorite = {
  id: string;
  userId: string;
  postid: string;
  created_at: string;
};

export type getFavoriteResponse = {
  id: string;
  userId: string;
  postid: string;
  created_at: string;
};

export type getAllFavoritesResponse = {
  id: string;
  userId: string;
  postid: string;
  created_at: string;
};

export type AddFavoritePayload = {
  userId: string;
  postid: string;
};

export type DeleteFavoriteParams = {
  id: string;
};
