import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  clearSession,
  setStorageBoolean,
  setStorageValue,
  storage,
} from '../../services/storage';
import {IS_LOGGED_IN, REFRESH_TOKEN_KEY, TOKEN_KEY} from '../../utils/constants';

interface AuthState {
  /** Whether the user has an active session. */
  isLoggedIn: boolean;
  /** True until the persisted session has been read back on cold start. */
  isRestoring: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isRestoring: true,
};

export interface Credentials {
  token: string;
  refreshToken?: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Start a session. Persisting here rather than in the screen means every
     * caller — login form, deep link, biometric unlock — gets identical
     * behaviour and cannot forget a key.
     *
     * The starter's demo login carries no credentials; a real one dispatches
     * `login({token})` with what the API returned.
     */
    login: (state, action: PayloadAction<Credentials | undefined>) => {
      const credentials = action.payload;
      if (credentials?.token) {
        setStorageValue(TOKEN_KEY, credentials.token);
        if (credentials.refreshToken) {
          setStorageValue(REFRESH_TOKEN_KEY, credentials.refreshToken);
        }
      }
      setStorageBoolean(IS_LOGGED_IN, true);
      state.isLoggedIn = true;
      state.isRestoring = false;
    },

    /**
     * End the session and clear every session-scoped key — the flag, the access
     * token and the refresh token. Clearing only the flag (as this template
     * used to) left a valid bearer token on the device for the next user.
     */
    logout: () => {
      clearSession();
      return {...initialState, isRestoring: false};
    },

    /** Rehydrate from storage on cold start. */
    restoreSession: state => {
      state.isLoggedIn = storage.getBoolean(IS_LOGGED_IN) ?? false;
      state.isRestoring = false;
    },

    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      setStorageBoolean(IS_LOGGED_IN, action.payload);
      state.isLoggedIn = action.payload;
      state.isRestoring = false;
    },
  },
});

export const {login, logout, restoreSession, setIsLoggedIn} = authSlice.actions;

export default authSlice.reducer;
