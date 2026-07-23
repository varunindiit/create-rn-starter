import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  /** Whether the user has an active (dummy) session. */
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /** Start a session. */
    login: (state) => {
      state.isLoggedIn = true;
    },
    /** Clear the session and reset auth state. */
    logout: () => initialState,
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { login, logout, setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
