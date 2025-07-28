import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import PostThunks from "../store/asyns-thunks/post.thunks";
import { store } from "../store";

const NewPostPage = () => {
  const { profile } = useAuth();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author] = useState(profile?.full_name || "");
  const [userId] = useState(profile?.id || "");
  const [date] = useState(
    new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  );
  const [likes] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [loading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Lütfen bir görsel seçin");
      return;
    }

    const formData = new FormData();
    formData.append("author", author);
    formData.append("title", title);
    formData.append("userId", userId);
    formData.append("excerpt", excerpt);
    formData.append("date", date);
    formData.append("likes", likes.toString());
    formData.append("category", category);
    formData.append("image", imageFile);

    try {
      await store.dispatch(PostThunks.newPost(formData));
      navigate("/");
    } catch (error) {
      console.error("Post gönderilirken hata:", error);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-1 bg-white rounded-xl text-gray-900">
      <div className="flex items-center justify-between mb-10 border-b pb-4 border-gray-300">
        <div className="flex items-center space-x-4 ">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            Scripta
          </Link>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Draft</span>
            <div className="w-40 text-sm font-medium px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-transparent rounded">
              {profile?.full_name}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          form="postForm"
          className="w-auto px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold text-sm transition disabled:opacity-50"
        >
          {loading ? "saving..." : "Publish"}
        </button>
      </div>

      <form id="postForm" onSubmit={handleSubmit} className="space-y-10">
        <div>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImageFile(e.target.files[0]);
              }
            }}
            required
            className="w-full text-md px-6 py-4 rounded-lg placeholder-gray-300 placeholder:font-serif focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </div>
        <div>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
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
            className="w-full text-xl px-6 py-4 placeholder-gray-400 placeholder:font-serif focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </div>

        <div>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            required
            className="w-50 text-xl px-6 py-4 placeholder-gray-400 placeholder:font-serif focus:outline-none focus:ring-0 focus:border-transparent"
          >
            <option value="Technology">Technology</option>
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
            <option value="Tutorials">Tutorials</option>
            <option value="Productivity">Productivity</option>
            <option value="Career">Career</option>
            <option value="Data Science">Data Science</option>
            <option value="Startups">Startups</option>
            <option value="Life & Thoughts">Life & Thoughts</option>
          </select>
        </div>
      </form>
    </main>
  );
};

export default NewPostPage;
