import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { store } from "../store";
import PostThunks from "../store/asyns-thunks/post.thunks";
import usePostStore from "../store/hooks/use-post.hook";
import { useAuth } from "../context/useAuth";
import PostCard from "../components/PostCard";
import UserFavoriteList from "../components/UserFavoriteList";

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { profile } = useAuth();
  const { userPosts } = usePostStore();
  const [activeTab, setActiveTab] = useState<"home" | "favorites">("home");

  useEffect(() => {
    if (id) {
      store.dispatch(PostThunks.getPostsByUser(id));
    }
  }, [id]);

  const isCurrentUser = profile?.id === id;
  const displayedProfile = isCurrentUser ? profile : null;

  if (!displayedProfile) {
    return (
      <div className="text-center py-20 text-red-500">
        Kullanıcı bilgisi bulunamadı.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-15 ">
      <div className="mb-6  pb-4">
        <h1 className="text-5xl font-bold">{displayedProfile.full_name}</h1>
        <p className="text-gray-600 text-md">@{displayedProfile.username}</p>
        <p className="mt-2 text-gray-500 italic">{displayedProfile.bio}</p>

        <div className="flex space-x-4 border-b border-gray-400">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-4 py-4 font-medium transition-colors ${
              activeTab === "home"
                ? "border-b-2 border-black text-black "
                : "text-gray-500 hover:text-black"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "favorites"
                ? "border-b-2 border-black text-black "
                : "text-gray-500 hover:text-black"
            }`}
          >
            Favorites
          </button>
        </div>
      </div>

      {activeTab === "home" && (
        <div className="space-y-6">
          {userPosts && userPosts.length > 0 ? (
            userPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="text-gray-500">
              Bu kullanıcı henüz bir yazı yazmamış.
            </p>
          )}
        </div>
      )}

      {activeTab === "favorites" && <UserFavoriteList />}
    </div>
  );
};

export default UserDetailPage;
