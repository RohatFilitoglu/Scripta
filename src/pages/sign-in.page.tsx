import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const { signIn, session } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signIn(email, password);
      navigate("/");
    } catch {
      setError(t("auth.invalid_credentials"));
    }
  };

  useEffect(() => {
    if (session?.user) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="flex items-center space-x-6 mb-20">
        <Link
          to="/"
          className="text-5xl text-gray-900 font-bold"
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          Scripta
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full space-y-8 bg-white border border-gray-200 rounded-lg shadow-sm p-8"
      >
        <h1 className="text-3xl font-semibold text-gray-900 text-center">
          {t("auth.sign_in")}
        </h1>
        <p className="text-center text-gray-500 italic">
          {t("auth.welcome_back")}
        </p>

        <input
          type="email"
          placeholder={t("auth.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-b border-gray-300 py-3 px-2 text-lg focus:outline-none focus:border-gray-900 transition-colors duration-300"
          required
        />

        <input
          type="password"
          placeholder={t("auth.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-b border-gray-300 py-3 px-2 text-lg focus:outline-none focus:border-gray-900 transition-colors duration-300"
          required
        />

        <button
          type="submit"
          className="w-full text-gray-900 py-3 rounded-md text-lg font-medium hover:bg-gray-900 hover:text-white transition-colors duration-500"
        >
          {t("auth.sign_in")}
        </button>

        {error && <p className="text-center text-red-500">{error}</p>}

        <p className="text-center text-sm text-gray-500">
          {t("auth.no_account")}{" "}
          <Link to="/signup" className="text-gray-900 underline cursor-pointer">
            {t("auth.register_here")}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
