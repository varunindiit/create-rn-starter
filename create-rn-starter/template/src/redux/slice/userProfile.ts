import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Vehicle {
  id: string;
  model: string;
  registration: string;
  type?: string;
  manufacturer?: string;
  color?: string;
  year?: number;
  seats?: number;
  imageUri?: string | null;
  images?: string[];
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  gender?: "Male" | "Female" | "Other";
  dob?: string;
  address?: string;
  about?: string;
  avatarUri?: string | null;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  /** Driver only */
  isDriverVerified?: boolean;
  licenseNumber?: string;
  licenseExpiry?: string;
  licenseImageUri?: string | null;
  nationalIdImageUri?: string | null;
  vehicles?: Vehicle[];
  rating?: number;
  totalTrips?: number;
  since?: string;
}

export interface UserProfileState {
  profile: UserProfile;
}

const initialState: UserProfileState = {
  profile: {
    fullName: "Justin Watson",
    email: "justin785@gmail.com",
    phone: "82 123 4567",
    countryCode: "+27",
    gender: "Male",
    dob: "10/05/1989",
    address: "Yaoundé, Cameroon",
    about:
      "Hi, I commute to Douala every weekend. I love listening to jazz and keep the car quiet. I drive a comfortable Toyota Yaris.",
    avatarUri: null,
    isPhoneVerified: true,
    isEmailVerified: false,
    isDriverVerified: true,
    licenseNumber: "DLN-22988-CMR",
    licenseExpiry: "12/2028",
    rating: 4.8,
    totalTrips: 124,
    since: "2024",
    vehicles: [
      {
        id: "v1",
        model: "Maybach S680",
        type: "Sedan",
        registration: "HSA627272",
        manufacturer: "Mercedes-Benz, S...",
        color: "Black",
        year: 2022,
        seats: 5,
        imageUri:
          "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400",
      },
      {
        id: "v2",
        model: "Toyota Yaris",
        type: "Sedan",
        registration: "HSA627272",
        manufacturer: "Mercedes-Benz, S...",
        color: "Red",
        year: 2020,
        seats: 5,
        imageUri:
          "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400",
      },
    ],
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
    addVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.profile.vehicles = [
        ...(state.profile.vehicles ?? []),
        action.payload,
      ];
    },
    removeVehicle: (state, action: PayloadAction<string>) => {
      state.profile.vehicles =
        state.profile.vehicles?.filter((v) => v.id !== action.payload) ?? [];
    },
    resetUserProfile: () => initialState,
  },
});

export const {
  setProfile,
  setAvatarUri,
  addVehicle,
  removeVehicle,
  resetUserProfile,
} = userProfileSlice.actions;
export default userProfileSlice.reducer;
