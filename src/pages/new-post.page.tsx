import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import PostThunks from "../store/asyns-thunks/post.thunks";
import { store } from "../store";
import { useTranslation } from "react-i18next";

const NewPostPage = () => {
  const { t } = useTranslation();
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
      alert(t("alert-select-image"));
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
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            Scripta
          </Link>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{t("draft")}</span>
            <div className="w-40 text-sm font-medium px-3 py-2">
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
          {loading ? t("saving") : t("publish")}
        </button>
      </div>

      <form id="postForm" onSubmit={handleSubmit} className="space-y-10">
        <div className="flex flex-col">
          <label htmlFor="image" className="mb-2 font-semibold text-gray-700">
            {t("upload-image")}
          </label>

          <label
            htmlFor="image"
            className="cursor-pointer inline-block w-fit px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold text-sm hover:bg-green-200 transition"
          >
            {t("select-file")}
          </label>

          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && !file.type.startsWith("image/")) {
                alert(t("invalid-image"));
                e.target.value = "";
                setImageFile(null);
              } else {
                setImageFile(file || null);
              }
            }}
            className="hidden"
          />

          {imageFile && (
            <p className="mt-2 text-sm text-gray-700 italic">
              {t("selected-file")}{" "}
              <span className="font-medium">{imageFile.name}</span>
            </p>
          )}
        </div>

        <div>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("title")}
            required
            className="w-full text-5xl px-6 py-4 rounded-lg placeholder-gray-300 placeholder:font-serif focus:outline-none"
          />
        </div>

        <div>
          <textarea
            id="excerpt"
            placeholder={t("story-placeholder")}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
            rows={6}
            className="w-full text-xl px-6 py-4 placeholder-gray-400 placeholder:font-serif focus:outline-none"
          />
        </div>

        <div>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-50 text-xl px-6 py-4"
          >
            <option value="">{t("select-category")}</option>
            <option value="Technology">{t("technology")}</option>
            <option value="Programming">{t("programming")}</option>
            <option value="Design">{t("design")}</option>
            <option value="Tutorials">{t("tutorials")}</option>
            <option value="Productivity">{t("productivity")}</option>
            <option value="Career">{t("career")}</option>
            <option value="Data Science">{t("dataScience")}</option>
            <option value="Startups">{t("startups")}</option>
            <option value="Life & Thoughts">{t("lifeThoughts")}</option>
          </select>
        </div>
      </form>
    </main>
  );
};

export default NewPostPage;
