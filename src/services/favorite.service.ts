import http from "../http";
import {
  type Favorite,
  type AddFavoritePayload,
  type DeleteFavoritePayload,
} from "../models/favorite.type";

const FavoriteService = {
  getFavoritesByUser: (userId: string) =>
    http.get<Favorite[]>(`/favorites/${userId}`),

  addFavorite: (payload: AddFavoritePayload) =>
    http.post<Favorite>("/favorites", payload),

  deleteFavorite: ({ userId, postId }: DeleteFavoritePayload) =>
    http.delete<{ message: string }>(
      `/favorites?userId=${userId}&postId=${postId}`
    ),
};

export default FavoriteService;
