import React, {useCallback, useId, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {FONTS} from '../../theme/fonts';
import {SPACING} from '../../theme/spacing';
import {useTheme} from '../../theme/ThemeProvider';
import RNText from '../Text/RNText';
import {EyeIcon, EyeOffIcon} from '../Icon/SvgIcons';

interface RNInputProps extends TextInputProps {
  label?: string;
  error?: string;
  secure?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPressRightIcon?: () => void;
  focusedBorderColor?: string;
  testID?: string;
}

const RNInput: React.FC<RNInputProps> = ({
  label,
  error,
  secure = false,
  containerStyle,
  inputContainerStyle,
  leftIcon,
  rightIcon,
  onPressRightIcon,
  focusedBorderColor,
  style,
  onFocus,
  onBlur,
  testID,
  accessibilityLabel,
  ...rest
}) => {
  const {colors} = useTheme();
  const [secureVisible, setSecureVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const errorId = useId();

  const toggleSecure = useCallback(() => setSecureVisible(v => !v), []);

  const right = secure ? (
    <TouchableOpacity
      onPress={toggleSecure}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={secureVisible ? 'Hide password' : 'Show password'}
      accessibilityState={{selected: secureVisible}}
      testID={testID ? `${testID}-toggle-secure` : undefined}>
      {secureVisible ? (
        <EyeIcon color={colors.textMuted} />
      ) : (
        <EyeOffIcon color={colors.textMuted} />
      )}
    </TouchableOpacity>
  ) : rightIcon ? (
    <TouchableOpacity
      onPress={onPressRightIcon}
      hitSlop={10}
      disabled={!onPressRightIcon}
      accessibilityRole="button"
      accessibilityLabel={`${label ?? 'Input'} action`}
      testID={testID ? `${testID}-action` : undefined}>
      {rightIcon}
    </TouchableOpacity>
  ) : null;

  const borderColor = error
    ? colors.danger
    : focused
    ? focusedBorderColor ?? colors.primary
    : colors.inputBorder;

  return (
    <View style={[styles.wrap, containerStyle]}>
      {label ? (
        <RNText
          size={13}
          color={colors.textSecondary}
          font="medium"
          style={styles.label}>
          {label}
        </RNText>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          {borderColor, backgroundColor: colors.surface},
          inputContainerStyle,
        ]}>
        {leftIcon ? <View style={styles.left}>{leftIcon}</View> : null}
        <TextInput
          testID={testID}
          allowFontScaling={false}
          // The visible label is the accessible name; the error is announced
          // after it so a screen-reader user hears why the field is rejected.
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityHint={error}
          aria-invalid={!!error}
          aria-errormessage={error ? errorId : undefined}
          {...rest}
          onFocus={e => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={e => {
            setFocused(false);
            onBlur?.(e);
          }}
          placeholderTextColor={colors.textPlaceholder}
          secureTextEntry={secure && !secureVisible}
          style={[styles.input, {color: colors.text}, style]}
        />
        {right ? <View style={styles.right}>{right}</View> : null}
      </View>

      {error ? (
        <RNText
          nativeID={errorId}
          testID={testID ? `${testID}-error` : undefined}
          accessibilityLiveRegion="polite"
          size={11}
          color={colors.danger}
          style={styles.errorText}>
          {error}
        </RNText>
      ) : null}
    </View>
  );
};

export default React.memo(RNInput);
export type {RNInputProps};

const styles = StyleSheet.create({
  wrap: {width: '100%'},
  label: {marginBottom: moderateScale(6)},
  inputContainer: {
    minHeight: moderateScale(50),
    paddingHorizontal: moderateScale(18),
    borderRadius: SPACING.radiusPill,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: moderateScale(14, 0.3),
    paddingVertical: 0,
  },
  left: {marginRight: moderateScale(10)},
  right: {marginLeft: moderateScale(10)},
  errorText: {marginTop: moderateScale(6)},
});
