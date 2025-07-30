import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import tr from "./locales/tr/translation.json";

i18n
  .use(LanguageDetector) // otomatik dil algılama
  .use(initReactI18next) // react entegrasyonu
  .init({
    fallbackLng: "tr", // desteklenmeyen dil seçilirse fallback
    debug: true, // dev ortamı için debug

    interpolation: {
      escapeValue: false, // React zaten XSS koruması sağlıyor
    },

    resources: {
      en: {
        translation: en,
      },
      tr: {
        translation: tr,
      },
    },
  });

export default i18n;
