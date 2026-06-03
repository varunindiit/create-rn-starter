import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { CardBrand, CARD_BRAND_LABEL } from "../../utils/card";
import { MastercardIcon, VisaIcon } from "../Icon/SvgIcons";
import RNText from "../Text/RNText";

interface CardBrandLogoProps {
  brand: CardBrand;
  size?: number;
  /** Render light text for use on a dark card preview. */
  light?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Brand mark for a saved/preview card. Vector logos for Visa & Mastercard,
 * a clean wordmark badge for the rest.
 */
const CardBrandLogo: React.FC<CardBrandLogoProps> = ({
  brand,
  size = 24,
  light = false,
  style,
}) => {
  if (brand === "visa") {
    return (
      <View style={style}>
        <VisaIcon size={moderateScale(size)} />
      </View>
    );
  }
  if (brand === "mastercard") {
    return (
      <View style={style}>
        <MastercardIcon size={moderateScale(size)} />
      </View>
    );
  }
  return (
    <View style={[styles.badge, light && styles.badgeLight, style]}>
      <RNText
        font="bold"
        size={11}
        color={light ? "#FFFFFF" : "#2C1A0E"}
        letterSpacing={0.4}
      >
        {CARD_BRAND_LABEL[brand].toUpperCase()}
      </RNText>
    </View>
  );
};

export default CardBrandLogo;

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(6),
    backgroundColor: "rgba(44, 26, 14, 0.08)",
  },
  badgeLight: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },
});
