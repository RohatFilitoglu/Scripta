import { useNavigate } from "react-router-dom";
import profile from "../assets/image/profile.jpg";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-6">
            <a href="/" className="text-2xl font-bold text-gray-900">
              Scripta
            </a>

            <div className="hidden md:flex items-center w-64 bg-gray-100 rounded-full px-3 py-1.5">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search stories"
                className="flex-grow bg-transparent ml-2 placeholder-gray-500 focus:outline-none focus:ring-0 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden md:inline-flex items-center gap-2 text-sm text-black hover:text-white hover:bg-black px-4 py-2 rounded-full transition duration-200 border border-gray-300 cursor-pointer">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 5V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5M9 3v4a1 1 0 0 1-1 1H4m11.383.772 2.745 2.746m1.215-3.906a2.089 2.089 0 0 1 0 2.953l-6.65 6.646L9 17.95l.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z"
                />
              </svg>
              Write
            </button>

            {/* Sign In butonuna tıklayınca yönlendirme */}
            <button
              onClick={handleSignInClick}
              className="text-sm text-black hover:text-white hover:bg-black px-4 py-2 rounded-full transition duration-200 border border-gray-300 cursor-pointer"
            >
              Sign In
            </button>

            <div>
              <img
                src={profile}
                alt="Profile"
                className="w-8 h-8 rounded-full cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
