import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { supabase } from "../../supabaseClient";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user) navigate("/");
  }, [session, navigate]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    // 1. Supabase auth ile kullanıcı oluştur
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;

    // 2. Profil verisini 'profiles' tablosuna kaydet
    const user = data.user;
    if (!user) throw new Error("User creation failed.");

    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      email,
      full_name: fullName,
      username,
    });

    if (profileError) throw profileError;

    navigate("/");
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("An unexpected error occurred.");
    }
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="mb-20">
        <Link to="/" className="text-5xl font-bold text-gray-900" style={{ fontFamily: "'Pacifico', cursive" }}>
          Scripta
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-sm p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-gray-900 text-center">{t("auth.sign_up")}</h1>
        <p className="text-center text-gray-500 italic">{t("auth.create_account")}</p>

        <input
          type="email"
          placeholder={t("auth.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-b border-gray-300 py-3 px-2 text-lg focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder={t("auth.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-b border-gray-300 py-3 px-2 text-lg focus:outline-none"
          required
        />
        <input
          type="text"
          placeholder={t("auth.full_name")}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border-b border-gray-300 py-3 px-2 text-lg focus:outline-none"
          required
        />
        <input
          type="text"
          placeholder={t("auth.username")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border-b border-gray-300 py-3 px-2 text-lg focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-3 rounded-md text-lg font-medium hover:bg-gray-700 transition-colors"
        >
          {t("auth.sign_up")}
        </button>

        {error && <p className="text-center text-red-500">{error}</p>}

        <p className="text-center text-sm text-gray-500">
          {t("auth.already_account")}{" "}
          <Link to="/signin" className="text-gray-900 underline">
            {t("auth.sign_in")}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
