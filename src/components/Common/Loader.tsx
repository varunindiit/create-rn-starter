import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useTheme} from '../../theme/ThemeProvider';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  /** Announced to screen readers while the spinner is visible. */
  label?: string;
  testID?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color,
  label = 'Loading',
  testID = 'loader',
}) => {
  const {colors} = useTheme();
  return (
    <View
      testID={testID}
      style={styles.center}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}>
      <ActivityIndicator size={size} color={color ?? colors.primary} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
