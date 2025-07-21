import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { store } from "../store";
import CommentThunks from "../store/asyns-thunks/comment.thunks";

type Props = {
  postId: string;
};

const PostComments = ({postId}: Props) => {
  const { profile } = useAuth();
  const [content, setContent] = useState("");
  const [userId] = useState(profile?.id || "");
  const [author] = useState(profile?.full_name || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    store.dispatch(
      CommentThunks.newComment({
        content,
        postId,
        userId,
        author,
        date: new Date().toISOString(),
      })
    );

    setContent(""); 
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
            {author ? author.charAt(0).toUpperCase() : "?"}
          </div>
          <div className="flex-1">
            <textarea
              className="w-full border-none resize-none focus:outline-none text-sm placeholder-gray-500"
              rows={3}
              placeholder="Yorumunuzu yazın..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="bg-black text-white px-4 py-1.5 rounded-full text-sm hover:bg-gray-800 transition"
                disabled={!content.trim()}
              >
                Gönder
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostComments;
