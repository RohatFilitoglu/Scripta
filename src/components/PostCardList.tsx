import { useEffect } from "react";
import PostCard from "./PostCard";
import PostThunks from "../store/asyns-thunks/post.thunks";
import { store } from "../store";
import usePostStore from "../store/hooks/use-post.hook";

type Props = {
  selectedCategory: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const PostCardList = ({ selectedCategory, currentPage, setCurrentPage }: Props) => {
  const { allPosts } = usePostStore();
  const postsPerPage = 10;

  useEffect(() => {
    store.dispatch(PostThunks.getAllPosts());
  }, []);

  if (!allPosts || allPosts.length === 0) {
    return <p>Hiç yazı yok.</p>;
  }

  const filteredPosts =
    selectedCategory === "All"
      ? allPosts
      : allPosts.filter((post) => post.category === selectedCategory);

  if (filteredPosts.length === 0) {
    return <p>Bu kategoride yazı yok.</p>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      {currentPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 mb-4 space-x-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                currentPage === number
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCardList;
