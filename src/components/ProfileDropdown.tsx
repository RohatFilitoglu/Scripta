import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ProfileDropdown() {
  const { signOut, session, profile } = useAuth();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    setOpen(false);
    await signOut();
    navigate("/");
  };

  const menuItems = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      label: t("profile"),
      action: () => {
        navigate(`/users/${session?.user.id}`);
        setOpen(false);
      },
      type: "link"
    },
   
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="relative">
          <img
            src={profile?.avatar_url || "/default-avatar.png"}
            alt="Profile"
            className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border-2 border-transparent hover:border-gray-200 transition-all duration-200"
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 24,
                duration: 0.2 
              }}
              className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-2xl shadow-xl shadow-black/5 z-50 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <img
                    src={profile?.avatar_url || "/default-avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {profile?.full_name || session?.user.email}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {session?.user.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                    className="mx-2 rounded-lg cursor-pointer"
                    onClick={item.action}
                  >
                    <div className="flex items-center px-3 py-2.5 text-sm">
                      <div className="text-gray-500 mr-3 transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-gray-700 font-medium">
                        {item.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-gray-100 mx-2"></div>

              <div className="py-2">
                <motion.div
                  whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.05)" }}
                  className="mx-2 rounded-lg cursor-pointer"
                  onClick={handleLogout}
                >
                  <div className="flex items-center px-3 py-2.5 text-sm">
                    <div className="text-red-500 mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <span className="text-red-600 font-medium">
                      {t("logout")}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}