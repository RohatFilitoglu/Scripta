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
  const [username, setUsername] = useState("");
  const [full_name, setFull_name] = useState("");
  const [avatar_url, setAvatar_url] = useState("");
  const [error, setError] = useState("");

  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(t("auth.passwords_do_not_match") || "Passwords do not match");
      return;
    }

    try {
      await signUp(email, password, username, full_name, avatar_url);
      setShowVerificationModal(true);
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
          type="text"
          value={full_name}
          placeholder={t("auth.full_name")}
          onChange={(e) => setFull_name(e.target.value)}
          className="w-full border-b border-gray-300 py-3 px-2 text-lg focus:outline-none focus:border-gray-900 transition-colors duration-300"
        />

        <input
          type="text"
          value={username}
          placeholder={t("auth.username")}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border-b border-gray-300 py-3 px-2 text-lg focus:outline-none focus:border-gray-900 transition-colors duration-300"
        />

        <input
          type="file"
          value={avatar_url}
          placeholder={t("auth.avatar_url") || "Avatar URL"}
          onChange={(e) => setAvatar_url(e.target.value)}
          className="w-full border-b border-gray-300 py-3 px-2 text-lg focus:outline-none focus:border-gray-900 transition-colors duration-300"
        />

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
      {showVerificationModal && (
        <div className="fixed inset-0 backdrop-blur-xs bg-black/20 flex justify-center items-center z-50 p-4">
          <div className="bg-white/95  border border-gray-200/50 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center relative overflow-hidden">
            <div className="absolute inset-0  rounded-2xl"></div>

            <div className="relative z-10">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-700 to-yellow-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0L12 13.5 2.25 6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                {t("auth.check_email_title")}
              </h2>

              <p className="text-gray-600 leading-relaxed mb-8 text-sm">
                {t("auth.check_email_description")}
              </p>

              <div className="flex items-center justify-center gap-2 text-emerald-600 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm font-medium">E-posta gönderildi</span>
              </div>

              <button
                onClick={() => navigate("/")}
                className="w-full px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-medium rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {t("auth.ok_button")}
              </button>

              <p className="text-xs text-gray-400 mt-4">
                {t("auth.check_spam_hint")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
