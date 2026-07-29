import React, {useEffect} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {moderateScale} from 'react-native-size-matters';
import {useTheme} from '../../theme/ThemeProvider';

interface ToggleProps {
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  testID?: string;
  /** Required for a standalone switch; optional when a visible label sits beside it. */
  accessibilityLabel?: string;
}

const TRAVEL = moderateScale(22);

const Toggle: React.FC<ToggleProps> = ({
  value,
  onChange,
  disabled,
  testID,
  accessibilityLabel,
}) => {
  const {colors} = useTheme();
  const tx = useSharedValue(value ? TRAVEL : 0);

  useEffect(() => {
    tx.value = withTiming(value ? TRAVEL : 0, {
      duration: 160,
      easing: Easing.out(Easing.cubic),
    });
  }, [value, tx]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{translateX: tx.value}],
  }));

  return (
    <Pressable
      testID={testID}
      disabled={disabled}
      onPress={() => onChange(!value)}
      // `switch` + checked state is what makes this announce as "on"/"off"
      // rather than as an unlabelled tappable box.
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{checked: value, disabled: !!disabled}}
      hitSlop={8}
      style={[
        styles.track,
        {backgroundColor: value ? colors.primary : colors.toggleTrack},
        disabled && styles.disabled,
      ]}>
      <Animated.View
        style={[
          styles.thumb,
          {backgroundColor: colors.toggleThumb},
          thumbStyle,
        ]}
      />
    </Pressable>
  );
};

export default Toggle;
export type {ToggleProps};

const styles = StyleSheet.create({
  track: {
    width: moderateScale(48),
    height: moderateScale(28),
    borderRadius: 999,
    padding: moderateScale(3),
    justifyContent: 'center',
  },
  thumb: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: 999,
  },
  disabled: {opacity: 0.5},
});
