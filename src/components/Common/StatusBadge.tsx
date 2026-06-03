import React from "react";
import { StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { SPACING, THEME } from "../../theme";
import RNText from "../Text/RNText";

type Tone = "success" | "warning" | "danger" | "info" | "primary";

interface StatusBadgeProps {
  label: string;
  tone?: Tone;
  dot?: boolean;
}

const PALETTE: Record<Tone, { bg: string; fg: string }> = {
  success: { bg: THEME.successLight, fg: THEME.success },
  warning: { bg: THEME.warningLight, fg: THEME.warning },
  danger: { bg: THEME.dangerLight, fg: THEME.danger },
  info: { bg: "#E6F0FF", fg: THEME.info },
  primary: { bg: THEME.primaryFaint, fg: THEME.primary },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  tone = "success",
  dot,
}) => {
  const p = PALETTE[tone];
  return (
    <View style={[styles.badge, { backgroundColor: p.bg }]}>
      {dot ? <View style={[styles.dot, { backgroundColor: p.fg }]} /> : null}
      <RNText font="medium" size={11} color={p.fg}>
        {label}
      </RNText>
    </View>
  );
};

export default StatusBadge;

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(6),
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: SPACING.radiusPill,
    alignSelf: "flex-start",
  },
  dot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
  },
});
