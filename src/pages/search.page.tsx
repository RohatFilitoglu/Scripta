import { useEffect, useMemo, useState } from "react";
import PostThunks from "../store/asyns-thunks/post.thunks";
import { store } from "../store";
import PostCard from "../components/PostCard";
import usePostStore from "../store/hooks/use-post.hook";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchPage = () => {
  const params = useParams();
  const searchValue = params.search;

  const { searchPosts } = usePostStore();
  const { t } = useTranslation();

  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredPosts = useMemo(() => searchPosts ?? [], [searchPosts]);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (searchValue) {
      store.dispatch(PostThunks.getSearchPost(searchValue));
    }
  }, [searchValue]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 break-words">
        {t("searchResultsFor")}{" "}
        <span className="text-indigo-600 italic">"{searchValue}"</span>
      </h1>
      <p className="text-sm text-gray-500 mb-6">{t("searchResultsInfo")}</p>
      <hr className="border-t border-gray-300 mb-6" />

      {filteredPosts.length === 0 && (
        <div className="py-6">
          <p className="text-gray-600">
            "{searchValue}" için sonuç bulunamadı.
          </p>
        </div>
      )}

      {filteredPosts.length > 0 && (
        <>
          <div className="max-w-screen-md mx-auto px-4 space-y-4">
            {currentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center mt-6 mb-4 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    aria-current={currentPage === number ? "page" : undefined}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      currentPage === number
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {number}
                  </button>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
