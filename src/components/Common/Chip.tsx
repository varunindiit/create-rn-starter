import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { SPACING, THEME } from "../../theme";
import RNText from "../Text/RNText";

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  size?: "sm" | "md";
  variant?: "filled" | "outline" | "soft";
}

const Chip: React.FC<ChipProps> = ({
  label,
  active,
  onPress,
  icon,
  size = "md",
  variant = "outline",
}) => {
  const bg =
    active
      ? THEME.primary
      : variant === "soft"
      ? THEME.primaryFaint
      : variant === "filled"
      ? THEME.primaryLight
      : THEME.surface;
  const border =
    active
      ? THEME.primary
      : variant === "outline"
      ? THEME.inputBorder
      : "transparent";
  const color = active ? THEME.textOnPrimary : THEME.text;

  const Comp = onPress ? Pressable : View;
  return (
    <Comp
      onPress={onPress}
      style={[
        styles.base,
        size === "sm" ? styles.sm : styles.md,
        {
          backgroundColor: bg,
          borderColor: border,
        },
      ]}
    >
      {icon}
      <RNText font={active ? "semibold" : "medium"} size={13} color={color}>
        {label}
      </RNText>
    </Comp>
  );
};

export default Chip;

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(6),
    borderRadius: SPACING.radiusPill,
    borderWidth: 1,
  },
  md: {
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(8),
  },
  sm: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
  },
});
