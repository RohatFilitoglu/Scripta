import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import tr from "./locales/tr/translation.json";

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    fallbackLng: "tr", 
    debug: true, 

    interpolation: {
      escapeValue: false, 
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
