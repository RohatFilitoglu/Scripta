import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import ProfileDropdown from "./ProfileDropdown";
import { t } from "i18next";
import LanguageDropdown from "./LanguageDropdown";
import { useEffect, useState, useRef } from "react";
import { store } from "../store";
import PostThunks from "../store/asyns-thunks/post.thunks";
import usePostStore from "../store/hooks/use-post.hook";

const Navbar = () => {
  const { session } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const { searchPosts } = usePostStore();
  const navigate = useNavigate();
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    if (!searchValue.trim()) return;

    debounceRef.current = window.setTimeout(() => {
      store.dispatch(PostThunks.getSearchPost(searchValue.trim()));
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchValue]);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  const handleViewAll = () => {
    const trimmed = searchValue.trim();
    if (!trimmed) return;
    navigate(`/search/${encodeURIComponent(trimmed)}`);
    setSearchValue("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleViewAll();
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-3xl text-gray-900 font-bold"
              style={{ fontFamily: "'Pacifico', cursive" }}
            >
              Scripta
            </Link>
            <div className="relative">
              <div className="hidden md:flex items-center w-64 bg-gray-100 rounded-full px-3 py-1.5">
                <svg
                  className="w-5 h-5 text-gray-500"
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder={t("search")}
                  aria-label={t("search")}
                  className="flex-grow bg-transparent ml-2 placeholder-gray-500 focus:outline-none focus:ring-0 text-sm"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  onKeyDown={onKeyDown}
                />
              </div>
              {searchValue &&
                searchValue.trim() !== "" &&
                (searchPosts?.length ? (
                  <div className="absolute top-10 left-0 bg-white shadow-xl rounded-lg p-2 w-full max-w-md z-10">
                    <div className="overflow-y-auto max-h-80 divide-y divide-gray-300">
                      {searchPosts.map((post) => (
                        <div
                          key={post.id}
                          role="listitem"
                          onClick={() => navigate(`/post/${post.id}`)}
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                              {post.image ? (
                                <img
                                  src={`${supabaseUrl}/storage/v1/object/public/post-images/${post.image}`}
                                  alt={post.title || "Post görseli"}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                  onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src =
                                      "/placeholder-image.png";
                                  }}
                                />
                              ) : (
                                <div className="text-xs text-gray-400">
                                  Görsel yok
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col flex-grow min-w-0 gap-1">
                            <div className="font-medium truncate">
                              {post.title}
                            </div>
                            <div className="text-gray-500 text-xs flex items-center gap-1">
                              <span className="truncate">{post.author}</span>
                              {post.created_at && (
                                <span className="before:content-['·'] before:mx-1">
                                  {new Date(post.created_at).toLocaleDateString(
                                    "tr-TR",
                                    {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    }
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-center">
                      <button
                        type="button"
                        onClick={handleViewAll}
                        disabled={!searchValue.trim()}
                        aria-label={
                          searchValue.trim()
                            ? `Tüm sonuçları göster: ${searchValue.trim()}`
                            : "Arama terimi yok"
                        }
                        className={
                          "text-sm w-full py-2 rounded-md transition focus-visible:outline-none focus-visible:ring-2 " +
                          (searchValue.trim()
                            ? "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed")
                        }
                      >
                        Tüm arama sonuçlarını gör
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="absolute top-10 left-0 bg-white border rounded-lg p-4">
                    <div className="text-sm text-gray-600">
                      Aramaya uygun veri bulunamadı
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageDropdown />

            {session?.user ? (
              <>
                <Link
                  to="/new-post"
                  className="hidden md:inline-flex items-center gap-2 text-sm text-black hover:text-white hover:bg-black px-4 py-2 rounded-full transition duration-200 border border-gray-300 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 7V2.221a2 2 0 0 0-.5.365L3.586 6.5a2 2 0 0 0-.365.5H8Zm2 0V2h7a2 2 0 0 1 2 2v.126a5.087 5.087 0 0 0-4.74 1.368l-6.642 6.642a3 3 0 0 0-.82 1.532l-.74 3.692a3 3 0 0 0 3.53 3.53l3.694-.738a3 3 0 0 0 1.532-.82L19 15.149V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.447 8.08a1.087 1.087 0 0 1 1.187.238 1.088 1.088 0 0 1 0 1.539l-.377.377-1.54-1.542.373-.374a1.08 1.08 0 0 1 .357-.238Zm-2.143 2.027-4.644 4.644-.385 1.924 1.925-.385 4.644-4.642-1.54-1.54Zm2.56-4.11a3.087 3.087 0 0 0-2.187.909l-6.645 6.645a1 1 0 0 0-.274.51l-.739 3.693a1 1 0 0 0 1.177 1.176l3.693-.738a1 1 0 0 0 .51-.274l6.65-6.646a3.088 3.088 0 0 0-2.185-5.275Z"
                    />
                  </svg>
                  {t("write")}
                </Link>

                <ProfileDropdown />
              </>
            ) : (
              <Link
                to="/signin"
                className="hidden md:inline-flex items-center gap-2 text-sm text-gray-900 px-4 py-2 rounded-full border border-gray-300 cursor-pointer hover:text-white hover:bg-black transition-colors duration-200 font-medium"
              >
                {t("signIn")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
