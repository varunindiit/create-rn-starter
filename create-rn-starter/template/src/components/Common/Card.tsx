import React from 'react';
import {Platform, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {SPACING} from '../../theme/spacing';
import {useTheme} from '../../theme/ThemeProvider';

interface CardProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: number;
  bg?: string;
  radius?: number;
  shadow?: boolean;
  testID?: string;
  /** Set when the card is a meaningful group, so it is announced as one unit. */
  accessibilityLabel?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = SPACING.lg,
  bg,
  radius = SPACING.radiusLg,
  shadow = true,
  testID,
  accessibilityLabel,
}) => {
  const {colors} = useTheme();

  return (
    <View
      testID={testID}
      accessible={!!accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      style={[
        {
          padding,
          borderRadius: radius,
          backgroundColor: bg ?? colors.surface,
          borderColor: colors.border,
        },
        styles.base,
        shadow && {shadowColor: colors.shadow, ...styles.shadow},
        style,
      ]}>
      {children}
    </View>
  );
};

export default Card;
export type {CardProps};

const styles = StyleSheet.create({
  base: {borderWidth: StyleSheet.hairlineWidth},
  shadow: Platform.select({
    ios: {shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: {width: 0, height: 3}},
    android: {elevation: 2},
    default: {},
  }),
});
