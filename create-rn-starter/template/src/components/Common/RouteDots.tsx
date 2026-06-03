import React from "react";
import { StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { SPACING, THEME } from "../../theme";
import RNText from "../Text/RNText";

interface RoutePoint {
  time?: string;
  city: string;
  area?: string;
}

interface RouteDotsProps {
  from: RoutePoint;
  to: RoutePoint;
  compact?: boolean;
}

/** Two-point timeline used on trip cards & detail pages */
const RouteDots: React.FC<RouteDotsProps> = ({ from, to, compact }) => (
  <View style={styles.wrap}>
    <View style={styles.timeline}>
      <View style={[styles.dot, styles.dotOutline]} />
      <View style={styles.line} />
      <View style={[styles.dot, styles.dotFilled]} />
    </View>
    <View style={[styles.col, compact && { gap: moderateScale(8) }]}>
      <View>
        {from.time ? (
          <RNText size={12} color={THEME.textMuted}>
            {from.time}
          </RNText>
        ) : null}
        <RNText font="semibold" size={14} color={THEME.text}>
          {from.city}
        </RNText>
        {from.area ? (
          <RNText size={12} color={THEME.textMuted}>
            {from.area}
          </RNText>
        ) : null}
      </View>
      <View>
        {to.time ? (
          <RNText size={12} color={THEME.textMuted}>
            {to.time}
          </RNText>
        ) : null}
        <RNText font="semibold" size={14} color={THEME.text}>
          {to.city}
        </RNText>
        {to.area ? (
          <RNText size={12} color={THEME.textMuted}>
            {to.area}
          </RNText>
        ) : null}
      </View>
    </View>
  </View>
);

export default RouteDots;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: SPACING.md,
  },
  timeline: {
    alignItems: "center",
    paddingVertical: moderateScale(4),
  },
  dot: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
  },
  dotOutline: {
    borderWidth: 2,
    borderColor: THEME.primary,
    backgroundColor: THEME.surface,
  },
  dotFilled: {
    backgroundColor: THEME.primary,
  },
  line: {
    flex: 1,
    width: 1.5,
    backgroundColor: THEME.primary,
    marginVertical: moderateScale(2),
  },
  col: {
    flex: 1,
    justifyContent: "space-between",
    gap: moderateScale(14),
  },
});
