import { Platform } from "react-native";

/**
 * Font system — Mona Sans family. Postscript names match the TTF files
 * dropped into src/assets/fonts and linked via react-native.config.js.
 */
export const FONTS = {
  light: "MonaSans-Light",
  regular: "MonaSans-Regular",
  italic: "MonaSans-Italic",
  medium: "MonaSans-Medium",
  semibold: "MonaSans-SemiBold",
  bold: "MonaSans-Bold",
  extraBold: "MonaSans-ExtraBold",
  black: "MonaSans-Black",
};

export const FONT_WEIGHTS = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  extraBold: "800" as const,
};

// Fallback in case a postscript name fails to resolve at runtime.
export const SYSTEM_FALLBACK = Platform.select({
  ios: "System",
  android: "Roboto",
}) as string;
