import React from 'react';
import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {SPACING} from '../../theme/spacing';
import {useTheme} from '../../theme/ThemeProvider';
import RNText from '../Text/RNText';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  size?: 'sm' | 'md';
  variant?: 'filled' | 'outline' | 'soft';
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const Chip: React.FC<ChipProps> = ({
  label,
  active = false,
  onPress,
  icon,
  size = 'md',
  variant = 'soft',
  style,
  testID,
}) => {
  const {colors} = useTheme();

  const background =
    variant === 'outline'
      ? 'transparent'
      : active
      ? colors.primary
      : variant === 'filled'
      ? colors.surfaceMuted
      : colors.primaryFaint;

  const foreground = active
    ? variant === 'outline'
      ? colors.primary
      : colors.textOnPrimary
    : colors.textSecondary;

  const Wrapper: React.ComponentType<any> = onPress ? Pressable : View;

  return (
    <Wrapper
      testID={testID}
      onPress={onPress}
      hitSlop={onPress ? 6 : undefined}
      // A tappable chip is a filter control, so it announces as a button
      // and reports whether it is currently selected.
      accessible
      accessibilityRole={onPress ? 'button' : 'text'}
      accessibilityLabel={label}
      accessibilityState={onPress ? {selected: active} : undefined}
      style={[
        styles.base,
        size === 'sm' ? styles.sm : styles.md,
        {
          backgroundColor: background,
          borderColor: active ? colors.primary : colors.border,
        },
        variant === 'outline' && styles.outline,
        style,
      ]}>
      {icon}
      <RNText size={size === 'sm' ? 11 : 12} font="medium" color={foreground}>
        {label}
      </RNText>
    </Wrapper>
  );
};

export default Chip;
export type {ChipProps};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: moderateScale(6),
    borderRadius: SPACING.radiusPill,
    borderWidth: StyleSheet.hairlineWidth,
  },
  sm: {paddingHorizontal: moderateScale(10), paddingVertical: moderateScale(5)},
  md: {paddingHorizontal: moderateScale(14), paddingVertical: moderateScale(8)},
  outline: {borderWidth: 1.2},
});
