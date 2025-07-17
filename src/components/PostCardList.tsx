import { useEffect } from "react";
import PostCard from "./PostCard";
import PostThunks from "../store/asyns-thunks/post.thunks";
import { store } from "../store";
import usePostStore from "../store/hooks/use-post.hook";

const PostCardList = ({ selectedCategory }: { selectedCategory: string }) => {
  const { allPosts } = usePostStore();

  useEffect(() => {
    store.dispatch(PostThunks.getAllPosts());
  }, []);

  if (allPosts?.length === 0) return <p>Hiç yazı yok.</p>;

  const filteredPosts =
    selectedCategory === "All"
      ? allPosts
      : allPosts?.filter((allPosts) => allPosts.category === selectedCategory);

  return (
    <div>
      {filteredPosts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostCardList;
 