import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostThunks from "../store/asyns-thunks/post.thunks";
import type { RootState, AppDispatch } from "../store";
import type { PostType } from "../models/posts.type";
import { t } from "i18next";
import PostCard from "../components/PostCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const query = useQuery().get("query") || "";

  const searchPosts = useSelector(
    (state: RootState) => state.postStore.searchPosts
  ) as PostType[] | undefined;
  const loading = useSelector((state: RootState) => state.postStore.loading);

  useEffect(() => {
    if (query.trim() !== "") {
      dispatch(PostThunks.getSearchPost(query));
    }
  }, [dispatch, query]);

  if (!query.trim()) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-semibold mb-4">
          {t("searchResultsFor", { search: "" })}
        </h1>
        <p className="text-gray-600">
          Arama terimi boş. Aramak için üstteki kutuya bir şey yazıp gönder.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 break-words">
        {t("searchResultsFor")}{" "}
        <span className="text-indigo-600 italic">“{query}”</span>
      </h1>
      <p className="text-sm text-gray-500 mb-6">{t("searchResultsInfo")}</p>
      <hr className="border-t border-gray-300 mb-6" />

      {!loading && (!searchPosts || searchPosts.length === 0) && (
        <div className="py-6">
          <p className="text-gray-600">"{query}" için sonuç bulunamadı.</p>
        </div>
      )}

      {!loading && searchPosts && searchPosts.length > 0 && (
        <div className="max-w-screen-md mx-auto px-4">
          {searchPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
