import { Link, useNavigate } from "react-router-dom";

type Post = {
  id: string;
  title: string;
  userId: string;
  author: string;
  excerpt: string;
  date: string;
  likes?: number;
  image: string;
};

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  const navigate = useNavigate();

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const imageUrl = `${supabaseUrl}/storage/v1/object/public/post-images/${post.image}`;

  return (
    <section className="max-w-screen-md mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4 border-b border-gray-200 pb-6 mb-6">
        <div className="flex-1">
          <Link
            to={`/users/${post.userId}`}
            className="text-sm text-gray-900 hover:underline"
          >
            {post.author}
          </Link>

          <h2
            onClick={() => navigate(`/post/${post.id}`)}
            className="text-xl font-bold text-gray-900 mt-1 hover:underline cursor-pointer"
          >
            {post.title}
          </h2>

          <p className="text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>

          <div className="flex items-center space-x-6 mt-4 text-gray-500 text-sm">
            <time className="whitespace-nowrap">{post.date}</time>
          </div>
        </div>

        <div
          onClick={() => navigate(`/post/${post.id}`)}
          className="w-full md:w-50 h-35 flex-shrink-0 cursor-pointer"
        >
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default PostCard;
