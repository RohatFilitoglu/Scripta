import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { store } from "../store";
import PostThunks from "../store/asyns-thunks/post.thunks";
import usePostStore from "../store/hooks/use-post.hook";
import PostComments from "../components/PostComments";
import FavoriteButton from "../components/FavoriteButton";
import { clearSelectedPost } from "../store/slice/post.slice"; 

const PostDetailPage = () => {
  const { session } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedPost } = usePostStore();
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (id) {
      store.dispatch(clearSelectedPost()); 
      setLoading(true);
      store.dispatch(PostThunks.getPostById(id))
        .finally(() => setLoading(false));
    }
  }, [id]);

  useEffect(() => {
    return () => {
      store.dispatch(clearSelectedPost());
    };
  }, []);

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

  const confirmDeletePost = () => {
    if (!selectedPost?.id) return alert("Post bulunamadı.");
    setConfirmModalOpen(false);

    store.dispatch(PostThunks.deletePost(selectedPost.id)).then(() => {
      store.dispatch(PostThunks.getAllPosts());
      navigate("/");
    });
  };

  const handleDeleteClick = () => {
    setDropdownOpen(false);
    setConfirmModalOpen(true);
  };

  const cancelDelete = () => {
    setConfirmModalOpen(false);
  };

  if (loading || !selectedPost) {
    return <div className="text-center py-12 text-gray-500">Yükleniyor...</div>;
  }

  const imageUrl = `${supabaseUrl}/storage/v1/object/public/post-images/${selectedPost.image}`
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 prose prose-lg prose-indigo relative">
      <h1 className="font-serif font-bold text-4xl mb-6 leading-tight">
        {selectedPost.title}
      </h1>

      <div className="flex items-center justify-between text-gray-500 text-sm mb-8">
        <div>
          by <span className="font-medium">{selectedPost.author}</span> —{" "}
          {selectedPost.date}
        </div>
        <div className="flex flex-row items-center space-x-2">
          <FavoriteButton postId={selectedPost.id} />
        

          {session?.user?.id === selectedPost.userId && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="More options"
                className="p-2 text-gray-500 hover:text-gray-800 rounded-full transition"
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
                    onClick={handleDeleteClick}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-500"
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
          src={imageUrl}
          alt={selectedPost.title}
          className="w-full max-h-96 rounded-lg shadow-lg object-cover"
        />
      </div>

      <article className="text-gray-900 leading-relaxed font-serif text-lg">
        {selectedPost.excerpt}
      </article>

      <PostComments postid={selectedPost.id} />

      {confirmModalOpen && (
      <div
  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg z-50 w-96 max-w-full border border-gray-200 text-center"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <button
    type="button"
    onClick={cancelDelete}
    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 rounded-lg p-1.5 hover:bg-gray-100 transition"
    aria-label="Close modal"
  >
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </button>

  <svg
    className="mx-auto mb-4 w-12 h-12 text-gray-400"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>

  <h3 id="modal-title" className="text-lg font-semibold text-gray-800 mb-6">
    Are you sure you want to delete this post?
  </h3>

  <div className="flex justify-center gap-4">
    <button
      onClick={cancelDelete}
      className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 transition duration-200"
    >
      No, cancel
    </button>
    <button
      onClick={confirmDeletePost}
      className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition duration-200"
    >
      Yes, I'm sure
    </button>
  </div>
</div>

      )}
    </div>
  );
};

export default PostDetailPage;
