import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SPACING, THEME } from '../../theme';

interface CardProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: number;
  bg?: string;
  radius?: number;
  shadow?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding,
  bg = THEME.surface,
  radius = SPACING.radiusLg,
  shadow = false,
}) => (
  <View
    style={[
      styles.card,
      shadow && styles.shadow,
      {
        backgroundColor: bg,
        borderRadius: radius,
        padding: padding ?? SPACING.lg,
      },
      style,
    ]}
  >
    {children}
  </View>
);

export default Card;

const styles = StyleSheet.create({
  card: { width: '100%', borderWidth: 1, borderColor: 'rgba(44, 26, 14, 0.1)' },
  shadow: {
    shadowColor: THEME.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
});
