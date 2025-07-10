import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NewPostPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newPost = {
      title,
      author,
      excerpt,
      image,
      category,
      date,
      userId,
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Post oluşturulamadı");
      }

      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Bilinmeyen hata");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-1 bg-white rounded-xl  text-gray-900">
      <div className="flex items-center justify-between mb-10 border-b pb-4 border-gray-300">
        <div className="flex items-center space-x-4 ">
          <Link
            to="/home"
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            Scripta
          </Link>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Draft</span>
            <input
              id="author"
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-40 text-sm font-medium px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-transparent rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          form="postForm"
          className="w-auto px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold text-sm transition disabled:opacity-50"
        >
          {loading ? "Kaydediliyor..." : "publish"}
        </button>
      </div>

      <form id="postForm" onSubmit={handleSubmit} className="space-y-10">
        <div>
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full text-5xl px-6 py-4 rounded-lg placeholder-gray-300 placeholder:font-serif focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </div>

        <div>
          <textarea
            id="excerpt"
            placeholder="Tell your story..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
            rows={6}
            className="w-full text-xl px-6 py-4 placeholder-gray-400  placeholder:font-serif focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </div>

        <div>
          <input
            id="image"
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full text-xl px-6 py-4 placeholder-gray-400  placeholder:font-serif focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </div>

        <div>
          <input
            id="category"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full text-xl px-6 py-4 placeholder-gray-400  placeholder:font-serif focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </div>

        <div className="flex gap-10">
          <div className="flex-1">
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className=" text-xl px-6 py-4 text-gray-400  placeholder:font-serif focus:outline-none focus:ring-0 focus:border-transparent"
            />
          </div>
        </div>

        <input
          id="userId"
          type="text"
          placeholder="Kullanıcı ID girin"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          className="w-full text-xl px-6 py-4 placeholder-gray-400  placeholder:font-serif focus:outline-none focus:ring-0 focus:border-transparent"
        />

        {error && (
          <p className="text-red-600 font-semibold text-center mt-6">{error}</p>
        )}
      </form>
    </main>
  );
}
