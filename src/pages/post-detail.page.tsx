import { useParams } from "react-router-dom";
import posts from "../data/posts.json";

const PostDetailPage = () => {
  const { id } = useParams();

  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return <div>Post bulunamadı!</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 prose prose-lg prose-indigo">
      <h1 className="font-serif font-bold text-4xl mb-6 leading-tight">
        {post.title}
      </h1>

      <div className="flex items-center justify-between text-gray-500 text-sm mb-8">
        {/* Yazar ve tarih */}
        <div>
          by <span className="font-medium">{post.author}</span> — {post.date}
        </div>

        {/* Likes butonu */}
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
          <span>{post.likes}</span>
        </button>
      </div>

      <div className="mb-10">
        <img
          src={`/${post.image}`}
          alt={post.title}
          className="w-full max-h-96 rounded-lg shadow-lg object-cover"
        />
      </div>

      <article className="text-gray-900 leading-relaxed font-serif text-lg">
        {post.excerpt}
      </article>
    </div>
  );
};

export default PostDetailPage;
