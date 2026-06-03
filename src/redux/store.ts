import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth";
import appSlice from "./slice/app";
import userProfileSlice from "./slice/userProfile";
import rideSlice from "./slice/ride";
import tripSlice from "./slice/trip";
import chatSlice from "./slice/chat";
import ratingsSlice from "./slice/ratings";
import earningsSlice from "./slice/earnings";
import locationSlice from "./slice/location";
import cardsSlice from "./slice/cards";

const store = configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice,
    userProfile: userProfileSlice,
    ride: rideSlice,
    trip: tripSlice,
    chat: chatSlice,
    ratings: ratingsSlice,
    earnings: earningsSlice,
    location: locationSlice,
    cards: cardsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
