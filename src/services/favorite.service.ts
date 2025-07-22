import http from "../http";
import type {
  Favorite,
  AddFavoritePayload,
  getAllFavoritesResponse,
} from "../models/favorite.type";

const FavoriteService = {
  getFavoritesByUser: (userId: string) =>
    http.get<Favorite[]>(`/favorites/${userId}`),

  getAllFavorite: () => http.get<getAllFavoritesResponse[]>("/favorites"),

  addFavorite: (payload: AddFavoritePayload) =>
    http.post<Favorite>("/favorites", payload),

  deleteFavorite: (id: string) => http.delete(`/favorites/${id}`),
};

export default FavoriteService;
