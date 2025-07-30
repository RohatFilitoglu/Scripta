import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { store } from "../store";
import CommentThunks from "../store/asyns-thunks/comment.thunks";
import useCommentStore from "../store/hooks/use-comment";
import { useTranslation } from "react-i18next";

type Props = {
  postid: string;
};

const PostComments = ({ postid }: Props) => {
  const { comments } = useCommentStore();
  const { profile, session } = useAuth();

  const [content, setContent] = useState("");
  const userid = profile?.id || "";
  const author = profile?.full_name || "";

    const { t } = useTranslation();
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) return;

    await store.dispatch(
      CommentThunks.newComment({
        content: content.trim(),
        postid,
        userid,
        author,
        date: new Date().toISOString(),
      })
    );

    setContent("");
    loadComments();
  };

  const loadComments = () => {
    store.dispatch(CommentThunks.getCommentById(postid));
  };

  useEffect(() => {
    loadComments();
  }, [postid]);

  const handleDelete = async (commentId: string) => {
    await store.dispatch(CommentThunks.deleteComment(commentId));
    loadComments();
  };

  return (
    <section className="max-w-2xl mx-auto mt-10 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg select-none">
            {author ? author.charAt(0).toUpperCase() : "?"}
          </div>
          <div className="flex-1">
            <textarea
              className="w-full border-none resize-none focus:outline-none text-sm placeholder-gray-500"
              rows={3}
              placeholder={t('comment')}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              spellCheck={false}
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="bg-white text-gray-900 border border-gray-900 px-5 py-2 rounded-full text-sm hover:bg-gray-900 hover:text-white font-semibold transition cursor-pointer"
                disabled={!content.trim()}
              >
                {t('send')}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="mt-10 space-y-8">
        {comments.length === 0 && (
          <p className="text-center text-gray-500 italic text-sm">{t('no-comments')}</p>
        )}

        {comments.map((comment) => (
          <article
            key={comment.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-lg text-gray-600 select-none">
                {comment.author ? comment.author.charAt(0).toUpperCase() : "?"}
              </div>

              <div className="flex-1">
                <header className="flex justify-between items-start">
                  <div>
                    <h4 className="text-gray-900 font-semibold text-base leading-tight">
                      {comment.author}
                    </h4>
                    <time
                      className="text-gray-400 text-xs mt-0.5 block"
                      dateTime={comment.date}
                      title={new Date(comment.date).toLocaleString()}
                    >
                      {new Date(comment.date).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </div>

                  {session?.user?.id === comment.userid && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      aria-label="Yorumu sil"
                      title="Yorumu sil"
                      className="text-gray-400 hover:text-red-600 transition p-1 rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                        />
                      </svg>
                    </button>
                  )}
                </header>

                <p className="mt-3 text-gray-800 text-sm whitespace-pre-line leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PostComments;
