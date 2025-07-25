import { useEffect, useState } from "react";
import { store } from "../store";
import FavoriteThunks from "../store/asyns-thunks/favorite.thunks";
import useFavoriteStore from "../store/hooks/use-favorite";
import { useAuth } from "../context/useAuth";

type Props = {
  postId: string;
};

const FavoriteButton = ({ postId }: Props) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const { profile } = useAuth();
  const { favorites } = useFavoriteStore();

  const loadFavorites = () => {
    if (profile?.id) {
      store.dispatch(FavoriteThunks.getFavoritesById(profile?.id));
    }
  };

  useEffect(() => {
    const isFavorite = favorites.some((item) => item.postId === postId);
    setIsFavorited(isFavorite);
  }, [favorites, postId]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleToggleFavorite = () => {
    if (profile?.id) {
      if (isFavorited) {
        store
          .dispatch(
            FavoriteThunks.deleteFavorite({ userId: profile.id, postId })
          )
          .then(() => {
            loadFavorites();
          });
      } else {
        store
          .dispatch(FavoriteThunks.addFavorite({ userId: profile.id, postId }))
          .then(() => {
            loadFavorites();
          });
      }
    }
  };

  return (
    <button onClick={handleToggleFavorite} className="focus:outline-none">
      {isFavorited ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#e63946"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 transition-all duration-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M12 21C12 21 4 14 4 8.5C4 5.462 6.462 3 9.5 3C11.036 3 12.468 3.737 13.25 4.903C14.032 3.737 15.464 3 17 3C20.038 3 22.5 5.462 22.5 8.5C22.5 14 15 21 12 21Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#e63946"
          className="w-6 h-6 transition-all duration-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 21C12 21 4 14 4 8.5C4 5.462 6.462 3 9.5 3C11.036 3 12.468 3.737 13.25 4.903C14.032 3.737 15.464 3 17 3C20.038 3 22.5 5.462 22.5 8.5C22.5 14 15 21 12 21Z"
          />
        </svg>
      )}
    </button>
  );
};

export default FavoriteButton;
