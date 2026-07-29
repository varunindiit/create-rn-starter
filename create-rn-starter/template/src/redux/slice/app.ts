import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LanguageCode} from '../../localization/languages';
import {
  getStoredLanguage,
  hasSelectedLanguage,
} from '../../localization/languageStorage';

interface AppState {
  language: LanguageCode;
  languageSelected: boolean;
  /** Last known connectivity, kept in state so any screen can react to it. */
  isOnline: boolean;
  /** Set once the app has finished its first-launch bootstrap. */
  isReady: boolean;
}

const initialState: AppState = {
  language: getStoredLanguage(),
  languageSelected: hasSelectedLanguage(),
  isOnline: true,
  isReady: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage: (
      state,
      action: PayloadAction<{code: LanguageCode; selected?: boolean}>,
    ) => {
      state.language = action.payload.code;
      if (action.payload.selected) state.languageSelected = true;
    },

    setOnline: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },

    setReady: (state, action: PayloadAction<boolean>) => {
      state.isReady = action.payload;
    },

    /**
     * Reset transient app state, preserving the device preferences a user
     * expects to survive a logout.
     */
    resetAppState: state => ({
      ...initialState,
      language: state.language,
      languageSelected: state.languageSelected,
      isOnline: state.isOnline,
      isReady: true,
    }),
  },
});

export const {
  setLanguage,
  setOnline,
  setReady,
  resetAppState,
} = appSlice.actions;

export default appSlice.reducer;
