import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "passenger" | "driver";

interface AuthState {
  /** Whether the user has an active (dummy) session. */
  isLoggedIn: boolean;
  role: UserRole;
}

const initialState: AuthState = {
  isLoggedIn: false,
  role: "passenger",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /** Start a session. Optionally set the active role. */
    login: (state, action: PayloadAction<UserRole | undefined>) => {
      state.isLoggedIn = true;
      if (action.payload) {
        state.role = action.payload;
      }
    },
    /** Clear the session and reset auth state. */
    logout: () => initialState,
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
  },
});

export const { login, logout, setIsLoggedIn, setRole } = authSlice.actions;

export default authSlice.reducer;
