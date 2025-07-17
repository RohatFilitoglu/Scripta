import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function ProfileDropdown() {
  const { signOut, session, profile } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    console.log(session);
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <img
        src={profile?.avatar_url}
        alt="Profile"
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full cursor-pointer border border-gray-300 hover:ring-2 ring-gray-400 transition"
      />

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white  border border-gray-200 rounded-md shadow-md z-50 animate-dropdown">
          <div className="flex flex-col py-2">
            <div className="flex items-center gap-4 px-4 py-2 transition-colors  cursor-pointer group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-500 transition-colors duration-200 group-hover:text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <Link
                to={`/users/${session?.user.id}`}
                className="text-md font-sans text-gray-500 group-hover:text-black transition-colors duration-200"
              >
                Profile
              </Link>
            </div>

            <div
              className="flex items-center gap-4 px-4 py-2 transition-colors  cursor-pointer group"
              onClick={signOut}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>

              <button className="text-md font-sans text-red-400 group-hover:text-red-600 transition-colors duration-200">
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
