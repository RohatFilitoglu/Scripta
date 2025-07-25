import { useAppSelector } from "../";
import * as FavoriteStore from "../slice/favorite.slice";

const useFavoriteStore = () => {
  const favorites = useAppSelector(FavoriteStore.select.favorites);

  return { favorites };
};

export default useFavoriteStore;
