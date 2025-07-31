import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const { signUp, session } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(t("auth.passwords_do_not_match") || "Passwords do not match");
      return;
    }

    try {
      await signUp(email, password);
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("auth.signup_failed") || "Signup failed");
      }
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
          {t("auth.sign_up")}
        </h1>
        <p className="text-center text-gray-500 italic">
          {t("auth.create_account")}
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

        <input
          type="password"
          placeholder={t("auth.confirm_password")}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border-b border-gray-300 py-3 px-2 text-lg focus:outline-none focus:border-gray-900 transition-colors duration-300"
          required
        />

        <button
          type="submit"
          className="w-full text-gray-900 py-3 rounded-md text-lg font-medium hover:bg-gray-900 hover:text-white transition-colors duration-500"
        >
          {t("auth.sign_up")}
        </button>

        {error && <p className="text-center text-red-500">{error}</p>}

        <p className="text-center text-sm text-gray-500">
          {t("auth.have_account")}{" "}
          <Link to="/signin" className="text-gray-900 underline cursor-pointer">
            {t("auth.login_here")}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
