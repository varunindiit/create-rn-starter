import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguageCode } from "../../localization/languages";
import {
  getStoredLanguage,
  hasSelectedLanguage,
} from "../../localization/languageStorage";

interface AppState {
  language: LanguageCode;
  languageSelected: boolean;
}

const initialState: AppState = {
  language: getStoredLanguage(),
  languageSelected: hasSelectedLanguage(),
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLanguage: (
      state,
      action: PayloadAction<{ code: LanguageCode; selected?: boolean }>,
    ) => {
      state.language = action.payload.code;
      if (action.payload.selected) state.languageSelected = true;
    },
    resetAppState: (state) => ({
      ...initialState,
      // Preserve language choice across logout/reset.
      language: state.language,
      languageSelected: state.languageSelected,
    }),
  },
});

export const { setLanguage, resetAppState } = appSlice.actions;
export default appSlice.reducer;
