import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setLanguage as setLanguageAction } from "../redux/slice/app";
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  LanguageCode,
  getLanguageOption,
} from "./languages";
import { markLanguageSelected, setStoredLanguage } from "./languageStorage";

/**
 * Single source of truth for reading and changing the app language.
 * Persists to MMKV, updates i18next (re-renders all `t()` usages) and Redux.
 */
export const useLanguage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const current = (i18n.language?.split("-")[0] as LanguageCode) || DEFAULT_LANGUAGE;

  const changeLanguage = useCallback(
    (code: LanguageCode, { markSelected = true }: { markSelected?: boolean } = {}) => {
      i18n.changeLanguage(code);
      setStoredLanguage(code);
      if (markSelected) markLanguageSelected();
      dispatch(setLanguageAction({ code, selected: markSelected }));
    },
    [dispatch, i18n],
  );

  return {
    t,
    current,
    currentOption: getLanguageOption(current),
    languages: LANGUAGES,
    changeLanguage,
  };
};

export default useLanguage;
