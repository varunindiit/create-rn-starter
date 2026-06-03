import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth";
import appSlice from "./slice/app";
import userProfileSlice from "./slice/userProfile";

const store = configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice,
    userProfile: userProfileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
