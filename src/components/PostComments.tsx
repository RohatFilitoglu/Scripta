import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { getCommentsByPostId } from "../store/asyns-thunks/comment.thunks";

type Props = {
  postId: string;
};

export default function PostComments({ postId }: Props) {
  const dispatch = useAppDispatch();
  const { comments, loading, error } = useAppSelector(
    (state) => state.commentStore
  );

  useEffect(() => {
    dispatch(getCommentsByPostId(postId));
  }, [dispatch, postId]);

  if (loading)
    return <p className="text-center py-6 text-gray-500">Yorumlar yükleniyor...</p>;

  if (error)
    return <p className="text-center py-6 text-red-500">Hata: {error}</p>;

  if (!comments || comments.length === 0)
    return <p className="text-center py-6 text-gray-400">Henüz yorum yok.</p>;

  return (
    <section className="mt-12 max-w-3xl mx-auto px-4">
      <h3 className="text-3xl font-semibold mb-8 border-b pb-2 border-gray-200">
        Comments
      </h3>
      <ul className="space-y-8">
        {comments.map(({ id, author, content, date }) => (
          <li key={id} className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-lg">
                {author.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">{author}</h4>
                <time
                  dateTime={date || ""}
                  className="text-sm text-gray-500"
                  title={date ? new Date(date).toLocaleString() : ""}
                >
                  {date
                    ? new Date(date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : ""}
                </time>
              </div>
              <p className="mt-2 text-gray-800 leading-relaxed whitespace-pre-line">
                {content}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
