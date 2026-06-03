import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguageCode } from "../../localization/languages";
import {
  getStoredLanguage,
  hasSelectedLanguage,
} from "../../localization/languageStorage";

interface AppState {
  notificationsEnabled: { push: boolean; email: boolean; sms: boolean };
  unreadNotificationCount: number;
  driverOnline: boolean;
  language: LanguageCode;
  languageSelected: boolean;
}

const initialState: AppState = {
  notificationsEnabled: { push: true, email: true, sms: false },
  unreadNotificationCount: 2,
  driverOnline: true,
  language: getStoredLanguage(),
  languageSelected: hasSelectedLanguage(),
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setNotificationPref: (
      state,
      action: PayloadAction<Partial<AppState["notificationsEnabled"]>>,
    ) => {
      state.notificationsEnabled = {
        ...state.notificationsEnabled,
        ...action.payload,
      };
    },
    setUnreadNotificationCount: (state, action: PayloadAction<number>) => {
      state.unreadNotificationCount = action.payload;
    },
    setDriverOnline: (state, action: PayloadAction<boolean>) => {
      state.driverOnline = action.payload;
    },
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

export const {
  setNotificationPref,
  setUnreadNotificationCount,
  setDriverOnline,
  setLanguage,
  resetAppState,
} = appSlice.actions;
export default appSlice.reducer;
