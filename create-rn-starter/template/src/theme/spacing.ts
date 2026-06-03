import { Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const { width, height } = Dimensions.get("window");

export const SCREEN = { width, height };

/** Margin / padding scale */
export const SPACING = {
  xxs: moderateScale(2),
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(12),
  base: moderateScale(14),
  lg: moderateScale(16),
  xl: moderateScale(20),
  xxl: moderateScale(24),
  xxxl: moderateScale(32),
  huge: moderateScale(40),

  hPadding: scale(20),
  vPadding: verticalScale(20),

  radiusXs: moderateScale(4),
  radiusSm: moderateScale(8),
  radiusMd: moderateScale(12),
  radiusLg: moderateScale(16),
  radiusXl: moderateScale(20),
  radiusXxl: moderateScale(28),
  radiusPill: moderateScale(999),
};

export const SIZES = {
  buttonHeight: moderateScale(52),
  buttonHeightSm: moderateScale(40),
  inputHeight: moderateScale(54),
  iconXs: moderateScale(12),
  iconSm: moderateScale(14),
  iconMd: moderateScale(18),
  iconLg: moderateScale(22),
  iconXl: moderateScale(28),
  iconXxl: moderateScale(34),
  avatarSm: moderateScale(36),
  avatar: moderateScale(48),
  avatarLg: moderateScale(64),
  circleBtn: moderateScale(40),
  tabBarHeight: moderateScale(64),
  headerHeight: moderateScale(50),
};

export const FONT_SIZE = {
  xxs: moderateScale(10),
  xs: moderateScale(11),
  sm: moderateScale(12),
  md: moderateScale(13),
  base: moderateScale(14),
  lg: moderateScale(15),
  xl: moderateScale(16),
  xxl: moderateScale(18),
  h6: moderateScale(20),
  h5: moderateScale(22),
  h4: moderateScale(24),
  h3: moderateScale(28),
  h2: moderateScale(32),
  h1: moderateScale(40),
};
