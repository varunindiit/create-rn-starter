import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {SPACING} from '../../theme/spacing';
import {ColorScheme} from '../../theme/palettes';
import {useTheme} from '../../theme/ThemeProvider';
import RNText from '../Text/RNText';

type Tone = 'success' | 'warning' | 'danger' | 'info' | 'primary';

interface StatusBadgeProps {
  label: string;
  tone?: Tone;
  dot?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const tones = (c: ColorScheme): Record<Tone, {bg: string; fg: string}> => ({
  success: {bg: c.successLight, fg: c.success},
  warning: {bg: c.warningLight, fg: c.warning},
  danger: {bg: c.dangerLight, fg: c.danger},
  info: {bg: c.infoLight, fg: c.info},
  primary: {bg: c.primaryFaint, fg: c.primary},
});

const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  tone = 'primary',
  dot = false,
  style,
  testID,
}) => {
  const {colors} = useTheme();
  const palette = tones(colors)[tone];

  return (
    <View
      testID={testID}
      // Colour alone must not carry the meaning — the label is the status, and
      // it is what a screen reader announces.
      accessible
      accessibilityRole="text"
      accessibilityLabel={label}
      style={[styles.wrap, {backgroundColor: palette.bg}, style]}>
      {dot ? (
        <View style={[styles.dot, {backgroundColor: palette.fg}]} />
      ) : null}
      <RNText size={11} font="medium" color={palette.fg}>
        {label}
      </RNText>
    </View>
  );
};

export default StatusBadge;
export type {StatusBadgeProps, Tone};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: moderateScale(6),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    borderRadius: SPACING.radiusPill,
  },
  dot: {width: moderateScale(6), height: moderateScale(6), borderRadius: 999},
});
