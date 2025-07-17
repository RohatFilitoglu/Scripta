import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import PostCard from "../components/PostCard";
import type { PostType } from "../models/posts.type";

type UserProfile = {
  id: string;
  bio: string;
  username: string;
  full_name: string;
  avatar_url: string;
};

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const userId = id ?? "0";

  const [user, setUser] = useState<UserProfile | null>(null);
  const [userPosts, setUserPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError) {
        console.error("Profil alınamadı:", profileError);
      } else {
        setUser(profile);
      }

      const { data: posts, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .eq("userId", userId)
        .order("created_at", { ascending: false });

      if (postsError) {
        console.error("Postlar alınamadı:", postsError);
      } else {
        setUserPosts(posts as PostType[]);
      }

      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div className="text-center py-20">Yükleniyor...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="mb-6 border-b border-gray-400 pb-4">
        <h1 className="text-5xl font-bold">{user?.full_name || "Kullanıcı"}</h1>
        <p className="text-gray-600 text-md">
          @{user?.username || "bilgi yok"}
        </p>
        <p className="mt-2 text-gray-500 italic">{user?.bio}</p>
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
