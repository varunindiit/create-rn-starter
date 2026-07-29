import React, {useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {moderateScale} from 'react-native-size-matters';
import {SIZES, SPACING} from '../../theme/spacing';
import {ColorScheme} from '../../theme/palettes';
import {useTheme} from '../../theme/ThemeProvider';
import RNText from '../Text/RNText';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

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
  testID?: string;
  /** Defaults to `title`. Set this when the button shows only an icon. */
  accessibilityLabel?: string;
  /** Longer description read after the label, e.g. what will happen. */
  accessibilityHint?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const variantStyles = (
  c: ColorScheme,
): Record<Variant, {bg: string; border: string; color: string}> => ({
  primary: {bg: c.primary, border: c.primary, color: c.textOnPrimary},
  secondary: {bg: c.primaryLight, border: c.primaryLight, color: c.primary},
  outline: {bg: 'transparent', border: c.primary, color: c.primary},
  ghost: {bg: 'transparent', border: 'transparent', color: c.primary},
  danger: {bg: c.dangerLight, border: c.dangerLight, color: c.danger},
});

const RNButton: React.FC<RNButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  containerStyle,
  textStyle,
  leftIcon,
  rightIcon,
  children,
  height = SIZES.buttonHeight,
  textSize = 16,
  testID,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const {colors} = useTheme();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const onPressIn = useCallback(() => {
    scale.value = withSpring(0.97, {damping: 18, stiffness: 220});
  }, [scale]);
  const onPressOut = useCallback(() => {
    scale.value = withSpring(1, {damping: 18, stiffness: 220});
  }, [scale]);

  const v = useMemo(() => variantStyles(colors)[variant], [colors, variant]);
  const isDisabled = !!disabled || !!loading;

  const inner =
    children ??
    (title ? (
      <View style={styles.contentRow}>
        {leftIcon}
        <RNText
          font="semibold"
          size={textSize}
          color={v.color}
          style={textStyle}>
          {title}
        </RNText>
        {rightIcon}
      </View>
    ) : null);

  return (
    <AnimatedPressable
      testID={testID}
      // Announced as a button, with its label and disabled/busy state, so the
      // control is usable with TalkBack and VoiceOver.
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{disabled: isDisabled, busy: !!loading}}
      disabled={isDisabled}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.shell,
        {height, backgroundColor: v.bg, borderColor: v.border},
        variant === 'outline' && styles.shellOutline,
        isDisabled && styles.shellDisabled,
        styles.center,
        containerStyle,
        animatedStyle,
      ]}>
      {loading ? <ActivityIndicator color={v.color} /> : inner}
    </AnimatedPressable>
  );
};

export default RNButton;
export type {RNButtonProps};

const styles = StyleSheet.create({
  shellOutline: {borderWidth: 1.2},
  shellDisabled: {opacity: 0.55},
  shell: {
    borderWidth: 0,
    borderRadius: SPACING.radiusPill,
    overflow: 'hidden',
  },
  center: {alignItems: 'center', justifyContent: 'center'},
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(8),
  },
});
