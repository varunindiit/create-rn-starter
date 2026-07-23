import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";
import { THEME } from "../../theme";

interface ToggleProps {
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ value, onChange, disabled }) => {
  const tx = useSharedValue(value ? moderateScale(22) : 0);

  useEffect(() => {
    tx.value = withTiming(value ? moderateScale(22) : 0, {
      duration: 160,
      easing: Easing.out(Easing.cubic),
    });
  }, [tx, value]);

  const thumb = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }],
  }));

  return (
    <Pressable
      disabled={disabled}
      onPress={() => onChange(!value)}
      hitSlop={6}
      style={[
        styles.track,
        value ? styles.trackOn : styles.trackOff,
        disabled && styles.trackDisabled,
      ]}
    >
      <Animated.View style={[styles.thumb, thumb]} />
    </Pressable>
  );
};

export default Toggle;

const styles = StyleSheet.create({
  trackOn: {
    backgroundColor: THEME.primary,
  },
  trackOff: {
    backgroundColor: "#E2D7CB",
  },
  trackDisabled: {
    opacity: 0.4,
  },
  track: {
    width: moderateScale(48),
    height: moderateScale(28),
    borderRadius: moderateScale(14),
    padding: moderateScale(3),
    justifyContent: "center",
  },
  thumb: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(11),
    backgroundColor: "#FFFFFF",
  },
});
