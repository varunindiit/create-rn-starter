import { Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";

const { width, height } = Dimensions.get("screen");

/** Persistence keys (MMKV) */
export const IS_LOGGED_IN = "isLoggedIn";
export const ROLE_KEY = "userRole";
export const TOKEN_KEY = "authToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const LANGUAGE_KEY = "appLanguage";
export const LANGUAGE_SELECTED_KEY = "languageSelected";

export const SCREEN_DIM = {
  width,
  height,
  paddingHorizontal: moderateScale(20),
};

export { FONTS } from "../theme/fonts";
export { THEME as COLORS } from "../theme/theme";

/** Static dropdown / picker data used across the app */
export const VEHICLE_BRANDS = [
  "Toyota",
  "Mercedes-Benz",
  "Honda",
  "Hyundai",
  "Kia",
  "Nissan",
  "Suzuki",
  "Peugeot",
];

export const GENDERS = ["Male", "Female", "Other"] as const;

export const LUGGAGE = ["Small", "Medium", "Large"] as const;
export const MUSIC_LEVELS = ["Any", "No Music", "Low", "Mixed"] as const;
export const CONVERSATION_LEVELS = ["Quiet", "Depends", "Talkative"] as const;
