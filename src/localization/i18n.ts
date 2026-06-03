import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./resources/en";
import fr from "./resources/fr";
import { DEFAULT_LANGUAGE } from "./languages";
import { getStoredLanguage } from "./languageStorage";

export const resources = {
  en: { translation: en },
  fr: { translation: fr },
} as const;

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getStoredLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;
