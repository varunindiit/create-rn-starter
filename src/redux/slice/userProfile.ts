import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  about?: string;
  avatarUri?: string | null;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
}

export interface UserProfileState {
  profile: UserProfile;
}

/** Placeholder profile shown until a real backend hydrates the store. */
const initialState: UserProfileState = {
  profile: {
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "555 010 0123",
    countryCode: "+1",
    about: "",
    avatarUri: null,
    isPhoneVerified: true,
    isEmailVerified: false,
  },
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    setAvatarUri: (state, action: PayloadAction<string | null>) => {
      state.profile.avatarUri = action.payload;
    },
    resetUserProfile: () => initialState,
  },
});

export const { setProfile, setAvatarUri, resetUserProfile } =
  userProfileSlice.actions;
export default userProfileSlice.reducer;
