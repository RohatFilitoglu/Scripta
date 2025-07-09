import React from "react";
import { useParams } from "react-router-dom";
import posts from "../data/posts.json";
import users from "../data/users.json";
import PostCard from "../components/PostCard";


const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const userId = id ?? "0"; // string olarak kullanıyoruz

  const user = users.find((u) => u.id === userId);
  const userPosts = posts.filter((post) => post.userId === userId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="mb-6 border-b border-gray-400 pb-4">
        <h1 className="text-5xl font-bold">{user?.name || "Kullanıcı"}</h1>
        <p className="text-gray-600 text-md">@{user?.username || "bilgi yok"}</p>
      </div>

      <div className="space-y-6">
        {userPosts.length > 0 ? (
          userPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="text-gray-500">Bu kullanıcı henüz bir yazı yazmamış.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetailPage;
