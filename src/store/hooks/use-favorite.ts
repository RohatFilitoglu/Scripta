
import { useAppSelector } from "../";
import * as FavoriteStore from "../slice/favorite.slice";

const useFavoriteStore = () => {
    const favorites = useAppSelector(FavoriteStore.select.favorites);
    const allFavorites = useAppSelector(FavoriteStore.select.allFavorites);

    return {favorites, allFavorites};
};

export default useFavoriteStore;