import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { store } from "../store";
import FavoriteThunks from "../store/asyns-thunks/favorite.thunks";
import useFavoriteStore from "../store/hooks/use-favorite";
import PostCard from "../components/PostCard";

const UserFavoriteList: React.FC = () => {
  const { profile } = useAuth();
  const { id } = useParams<{ id?: string }>();
  const { favorites } = useFavoriteStore();

  const isCurrentUser = profile?.id === id;
  const displayedProfile = isCurrentUser ? profile : null;

  useEffect(() => {
    if (profile?.id) {
      store.dispatch(FavoriteThunks.getFavoritesById(profile?.id));
    }
  }, [profile?.id]);

  if (!displayedProfile) {
    return (
      <div className="text-center py-20 text-red-500">
        Kullanıcı bilgisi bulunmamaktadır.
      </div>
    );
  }

  return (
    <div className="grid gap-4 py-10">
      {favorites && favorites.length > 0 ? (
        favorites.map((favorite) =>
          favorite.post ? (
            <PostCard key={favorite.post.id} post={favorite.post} />
          ) : (
            <div key={favorite.id} className="text-red-500">
              Bu favoride post verisi eksik.
            </div>
          )
        )
      ) : (
        <p className="text-gray-500 text-center">
          Bu kullanıcı henüz hiçbir yazıyı favorilerine eklememiş.
        </p>
      )}
    </div>
  );
};

export default UserFavoriteList;
