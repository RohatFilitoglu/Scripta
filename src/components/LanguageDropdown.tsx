import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next"; 

const languages = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
];

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "en");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  const changeLanguage = (code: string) => {
    if (code !== currentLanguage) {
      i18n.changeLanguage(code); // ✅ i18n dilini değiştir
      setCurrentLanguage(code);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={`
          inline-flex items-center gap-1 px-2.5 py-1.5
          bg-white dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800
          text-xs text-neutral-600 dark:text-neutral-300
          font-normal rounded-md shadow-xs
          hover:bg-neutral-50 dark:hover:bg-neutral-800
          hover:text-sky-500 dark:hover:text-sky-400
          transition-all duration-150
        `}
        aria-label="Language selector"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{currentLanguage.toUpperCase()}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-3 h-3 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -6 }}
              transition={{ duration: 0.15 }}
              className="
                absolute z-20 right-0 mt-1 w-28
                bg-white dark:bg-neutral-900
                border border-neutral-200 dark:border-neutral-800
                rounded-md shadow-md ring-1 ring-black/5 dark:ring-white/5
              "
            >
              <div className="py-1">
                {languages.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => changeLanguage(code)}
                    disabled={code === currentLanguage}
                    className={`
                      flex items-center w-full px-3 py-1.5
                      text-xs text-left rounded-sm
                      transition-colors
                      ${
                        code === currentLanguage
                          ? "text-neutral-400 cursor-not-allowed opacity-60"
                          : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-sky-500"
                      }
                    `}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageDropdown;
