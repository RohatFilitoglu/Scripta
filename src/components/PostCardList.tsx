import PostCard from "./PostCard";
import posts from "../data/posts.json";

const PostCardList = ({ selectedCategory }: { selectedCategory: string }) => {
  return (
    <div>
      {posts
        .filter(
          (post) =>
            selectedCategory === "All" || post.category === selectedCategory
        )
        .map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
    </div>
  );
};

export default PostCardList;
