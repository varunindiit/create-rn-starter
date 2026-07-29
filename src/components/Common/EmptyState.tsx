import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {SPACING} from '../../theme/spacing';
import {useTheme} from '../../theme/ThemeProvider';
import RNText from '../Text/RNText';
import RNButton from '../Button/RNButton';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  style,
  testID = 'empty-state',
}) => {
  const {colors} = useTheme();

  return (
    <View testID={testID} style={[styles.wrap, style]}>
      {icon ? (
        <View
          style={styles.icon}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants">
          {icon}
        </View>
      ) : null}
      {title ? (
        <RNText font="semibold" size={16} textAlign="center">
          {title}
        </RNText>
      ) : null}
      {description ? (
        <RNText
          size={13}
          color={colors.textSecondary}
          textAlign="center"
          style={styles.description}>
          {description}
        </RNText>
      ) : null}
      {actionLabel && onAction ? (
        <RNButton
          title={actionLabel}
          onPress={onAction}
          variant="secondary"
          testID={`${testID}-action`}
          containerStyle={styles.action}
        />
      ) : null}
    </View>
  );
};

export default EmptyState;
export type {EmptyStateProps};

const styles = StyleSheet.create({
  wrap: {alignItems: 'center', justifyContent: 'center', padding: SPACING.xl},
  icon: {marginBottom: SPACING.md},
  description: {marginTop: SPACING.xs},
  action: {marginTop: SPACING.lg, paddingHorizontal: SPACING.xxl},
});
