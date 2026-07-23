/**
 * HD WAKA — design tokens
 * Brand: warm orange on cream/peach. Cards are white with subtle shadows.
 */
export const COLORS = {
  // Brand
  primary: "rgba(232, 124, 62, 1)",
  primaryDark: "rgba(196, 82, 26, 1)",
  primaryLight: "#FCE4D2",
  primaryFaint: "#FFF3EA",

  // Backgrounds
  background: "#FBE9D6",
  backgroundAlt: "#FFF6EC",
  surface: "rgba(255, 251, 249, 1)",
  surfaceMuted: "#FAF7F4",
  overlay: "rgba(0,0,0,0.45)",

  // Text
  text: "rgba(44, 26, 14, 1)",
  textSecondary: "#5C5C5C",
  textMuted: "#9A9A9A",
  textPlaceholder: "#BDBDBD",
  textOnPrimary: "#FFFFFF",

  // Borders / Lines
  border: "#F2DDC8",
  divider: "#F0EAE3",
  inputBorder: "#EADFD2",

  // Status
  success: "#1FA971",
  successLight: "#E7F8F0",
  warning: "#F4B400",
  warningLight: "#FFF6DA",
  danger: "#E5484D",
  dangerLight: "#FDECEC",
  info: "#2D7FF9",

  // Misc
  star: "#F4B400",
  unselectedStar: "#E5DAC9",
  shadow: "rgba(28, 22, 14, 0.10)",

  // Tab bar
  tabBg: "#FFFFFF",
};

export const THEME = {
  ...COLORS,
};

export type ThemeType = typeof THEME;
