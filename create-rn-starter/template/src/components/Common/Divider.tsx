import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useTheme} from '../../theme/ThemeProvider';

interface DividerProps {
  style?: StyleProp<ViewStyle>;
  color?: string;
  thickness?: number;
  vertical?: boolean;
}

const Divider: React.FC<DividerProps> = ({
  style,
  color,
  thickness = 1,
  vertical = false,
}) => {
  const {colors} = useTheme();
  return (
    <View
      // Decorative: hidden from screen readers so it is not announced as a
      // blank element between the items it separates.
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        vertical
          ? [styles.vertical, {width: thickness}]
          : [styles.horizontal, {height: thickness}],
        {backgroundColor: color ?? colors.divider},
        style,
      ]}
    />
  );
};

export default Divider;

const styles = StyleSheet.create({
  vertical: {alignSelf: 'stretch'},
  horizontal: {width: '100%'},
});
