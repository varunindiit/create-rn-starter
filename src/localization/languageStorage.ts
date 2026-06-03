import { storage } from "../services/storage";
import { LANGUAGE_KEY, LANGUAGE_SELECTED_KEY } from "../utils/constants";
import {
  DEFAULT_LANGUAGE,
  LanguageCode,
  getDeviceLanguage,
  isSupportedLanguage,
} from "./languages";

/** Persisted language, or the best device-locale guess on first launch. */
export const getStoredLanguage = (): LanguageCode => {
  const saved = storage.getString(LANGUAGE_KEY);
  if (isSupportedLanguage(saved)) return saved;
  return getDeviceLanguage() ?? DEFAULT_LANGUAGE;
};

export const setStoredLanguage = (code: LanguageCode) => {
  storage.set(LANGUAGE_KEY, code);
};

/** Whether the user has explicitly completed the language step. */
export const hasSelectedLanguage = (): boolean =>
  storage.getBoolean(LANGUAGE_SELECTED_KEY) ?? false;

export const markLanguageSelected = () => {
  storage.set(LANGUAGE_SELECTED_KEY, true);
};
