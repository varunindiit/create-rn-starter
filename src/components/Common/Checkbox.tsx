import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import {CheckIcon} from '../Icon/SvgIcons';
import RNText from '../Text/RNText';
import {useTheme} from '../../theme/ThemeProvider';

interface CheckboxProps {
  value: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  shape?: 'square' | 'circle';
}

const Checkbox: React.FC<CheckboxProps> = ({
  value,
  onChange,
  label,
  shape = 'circle',
}) => {
  const {colors} = useTheme();

  return (
    <Pressable onPress={() => onChange(!value)} style={styles.row} hitSlop={8}>
      <View
        style={[
          styles.box,
          shape === 'circle' && styles.boxCircle,
          {
            backgroundColor: value ? colors.primary : colors.surface,
            borderColor: value ? colors.primary : colors.inputBorder,
          },
        ]}>
        {value ? (
          <CheckIcon size={moderateScale(12)} color={colors.textOnPrimary} />
        ) : null}
      </View>
      {label ? (
        <RNText size={13} color={colors.textSecondary}>
          {label}
        </RNText>
      ) : null}
    </Pressable>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  box: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(5),
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxCircle: {borderRadius: moderateScale(10)},
});
