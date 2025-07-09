import { Link } from "react-router-dom";
import backgroundImage from "../assets/image/landing-page.jpg";

export default function LandingPage() {
  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
     

      {/* İçerik */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-xl">
          Welcome to{" "}
          <Link
            to="/"
            className="inline-block text-white"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            Scripta
          </Link>
        </h1>

        <p className="text-base md:text-xl text-white mb-12 max-w-2xl leading-relaxed drop-shadow-sm">
          Write, express, and share your story with the world — your words
          matter, your voice is powerful.
        </p>

        <div className="flex space-x-4">
          <Link to="/signin">
            <button className="px-6 py-3 text-sm font-medium rounded-full border border-white text-white hover:bg-white hover:text-black transition duration-300 shadow-lg">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
