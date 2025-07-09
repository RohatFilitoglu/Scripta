import { useEffect, useState } from "react";
import PostCard from "./PostCard";

type Post = {
  id: string;
  title: string;
  author: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  userId: string;
  likes?: number;
};

const PostCardList = ({ selectedCategory }: { selectedCategory: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Veriler yüklenemedi");
        return res.json();
      })
      .then((data) => setPosts(data.posts ?? data)) // MirageJS schema.posts.all() için
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;
  if (posts.length === 0) return <p>Hiç yazı yok.</p>;

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div>
      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostCardList;
