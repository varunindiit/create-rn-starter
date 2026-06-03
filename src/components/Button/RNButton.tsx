import React, { useCallback } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";
import { SIZES, SPACING, THEME } from "../../theme";
import RNText from "../Text/RNText";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";

interface RNButtonProps {
  title?: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  height?: number;
  textSize?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const VARIANT_STYLES: Record<
  Variant,
  { bg: string; border: string; color: string }
> = {
  primary: {
    bg: THEME.primary,
    border: THEME.primary,
    color: THEME.textOnPrimary,
  },
  secondary: {
    bg: THEME.primaryLight,
    border: THEME.primaryLight,
    color: THEME.primary,
  },
  outline: {
    bg: "transparent",
    border: THEME.primary,
    color: THEME.primary,
  },
  ghost: {
    bg: "transparent",
    border: "transparent",
    color: THEME.primary,
  },
  danger: {
    bg: THEME.dangerLight,
    border: THEME.dangerLight,
    color: THEME.danger,
  },
};

const RNButton: React.FC<RNButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  disabled,
  loading,
  containerStyle,
  textStyle,
  leftIcon,
  rightIcon,
  children,
  height = SIZES.buttonHeight,
  textSize = 16,
}) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = useCallback(() => {
    scale.value = withSpring(0.97, { damping: 18, stiffness: 220 });
  }, [scale]);
  const onPressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 18, stiffness: 220 });
  }, [scale]);

  const v = VARIANT_STYLES[variant];

  const inner =
    children ??
    (title ? (
      <View style={styles.contentRow}>
        {leftIcon}
        <RNText font="semibold" size={textSize} color={v.color} style={textStyle}>
          {title}
        </RNText>
        {rightIcon}
      </View>
    ) : null);

  return (
    <AnimatedPressable
      disabled={disabled || loading}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.shell,
        {
          height,
          backgroundColor: v.bg,
          borderColor: v.border,
          borderWidth: variant === "outline" ? 1.2 : 0,
          opacity: disabled ? 0.55 : 1,
        },
        styles.center,
        containerStyle,
        animatedStyle,
      ]}
    >
      {loading ? <ActivityIndicator color={v.color} /> : inner}
    </AnimatedPressable>
  );
};

export default RNButton;

const styles = StyleSheet.create({
  shell: {
    borderRadius: SPACING.radiusPill,
    overflow: "hidden",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(8),
  },
});
