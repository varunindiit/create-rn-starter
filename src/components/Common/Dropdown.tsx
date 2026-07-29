import React, {useCallback, useState} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {SPACING} from '../../theme';
import RNText from '../Text/RNText';
import BottomSheet from '../BottomSheet/BottomSheet';
import ArrowDownSvg from '../../assets/svg/arrowDown.svg';
import {useTheme, useThemedStyles} from '../../theme/ThemeProvider';
import type {ColorScheme} from '../../theme/palettes';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  value?: string | null;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  title?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  triggerStyle?: StyleProp<ViewStyle>;
}

const Dropdown: React.FC<DropdownProps> = ({
  value,
  options,
  onChange,
  placeholder = 'Select',
  title,
  leftIcon,
  rightIcon,
  disabled,
  error,
  containerStyle,
  triggerStyle,
}) => {
  const {colors} = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [visible, setVisible] = useState(false);

  const selected = options.find(o => o.value === value);

  const open = useCallback(() => {
    if (!disabled) setVisible(true);
  }, [disabled]);
  const close = useCallback(() => setVisible(false), []);

  const handleSelect = useCallback(
    (val: string) => {
      onChange(val);
      setVisible(false);
    },
    [onChange],
  );

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={open}
        disabled={disabled}
        style={[
          styles.trigger,
          {borderColor: error ? colors.danger : colors.inputBorder},
          triggerStyle,
        ]}>
        {leftIcon ? <View style={styles.left}>{leftIcon}</View> : null}
        <RNText
          size={14}
          font="regular"
          color={selected ? colors.text : colors.textPlaceholder}
          style={styles.triggerText}>
          {selected ? selected.label : placeholder}
        </RNText>
        {rightIcon ?? (
          <ArrowDownSvg width={moderateScale(18)} height={moderateScale(18)} />
        )}
      </TouchableOpacity>

      {error ? (
        <RNText size={11} color={colors.danger} style={styles.errorText}>
          {error}
        </RNText>
      ) : null}

      <BottomSheet visible={visible} onClose={close}>
        {title ? (
          <RNText
            font="semibold"
            size={18}
            color={colors.text}
            style={styles.sheetTitle}>
            {title}
          </RNText>
        ) : null}

        {options.map(opt => {
          const active = opt.value === value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => handleSelect(opt.value)}
              style={({pressed}) => [
                styles.option,
                pressed && {backgroundColor: colors.primaryFaint},
              ]}>
              <RNText
                size={15}
                font={active ? 'semibold' : 'regular'}
                color={active ? colors.primary : colors.text}>
                {opt.label}
              </RNText>
            </Pressable>
          );
        })}
      </BottomSheet>
    </View>
  );
};

export default Dropdown;

const makeStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    trigger: {
      height: moderateScale(50),
      borderRadius: SPACING.radiusPill,
      borderWidth: 1,
      backgroundColor: colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: moderateScale(18),
    },
    left: {marginRight: moderateScale(10)},
    triggerText: {flex: 1},
    errorText: {marginTop: moderateScale(6)},
    sheetTitle: {
      marginBottom: moderateScale(12),
    },
    option: {
      paddingVertical: moderateScale(14),
      borderBottomWidth: 1,
      borderBottomColor: colors.divider,
    },
  });
