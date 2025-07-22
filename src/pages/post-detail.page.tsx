import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useEffect, useState, useRef } from "react";
import { store } from "../store";
import PostThunks from "../store/asyns-thunks/post.thunks";
import usePostStore from "../store/hooks/use-post.hook";
import PostComments from "../components/PostComments";
import { supabase } from "../../supabaseClient";

const PostDetailPage = () => {
  const { session } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedPost } = usePostStore();

  useEffect(() => {
    if (!id) return;
    store.dispatch(PostThunks.getPostById(id));
  }, [id]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async () => {
    if (!session?.user?.id || !selectedPost?.userId) return;

    if (session.user.id !== selectedPost.userId) {
      alert("Bu postun sahibi değilsiniz.");
      return;
    }

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", selectedPost.id)
      .eq("userId", session.user.id);

    if (error) {
      console.error("Post silinemedi:", error.message);
      return;
    }

    navigate("/");
  };

  if (!selectedPost) {
    return <div>Post bulunamadı!</div>;
  }
  

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 prose prose-lg prose-indigo">
      <h1 className="font-serif font-bold text-4xl mb-6 leading-tight">
        {selectedPost.title}
      </h1>

      <div className="flex items-center justify-between text-gray-500 text-sm mb-8">
        <div>
          by <span className="font-medium">{selectedPost.author}</span> —{" "}
          {selectedPost.date}
        </div>
        <div className="flex flex-row items-center space-x-2">
          <button
            type="button"
            className="flex items-center space-x-2 px-3 py-1 rounded-full font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Clap"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 003.958-5.084 1.6 1.6 0 01.582-.628 1.549 1.549 0 011.466-.087c.205.095.388.233.537.406a1.64 1.64 0 01.384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 005.5 19v0A1.5 1.5 0 007 17.5V11zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 01.215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
            </svg>
            <span>{selectedPost.likes}</span>
          </button>

          {session?.user?.id === selectedPost.userId && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="More options"
                className="p-2 text-gray-500 hover:text-gray-800 rounded-full  transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="6" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="18" cy="12" r="2" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-2xl border rounded-sm z-50 border-gray-200">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleDelete();
                    }}
                    className="w-full  text-left px-4 py-2 text-sm text-red-400 hover:text-red-500"
                  >
                    Delete Post
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mb-10">
        <img
          src={selectedPost.image}
          alt={selectedPost.title}
          className="w-full max-h-96 rounded-lg shadow-lg object-cover"
        />
      </div>

      <article className="text-gray-900 leading-relaxed font-serif text-lg">
        {selectedPost.excerpt}
      </article>
      <PostComments postid={selectedPost.id} />
    </div>
  );
};

export default PostDetailPage;
