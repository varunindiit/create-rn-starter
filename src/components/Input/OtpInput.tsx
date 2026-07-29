import React, {useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {FONTS} from '../../theme';
import {useTheme, useThemedStyles} from '../../theme/ThemeProvider';
import type {ColorScheme} from '../../theme/palettes';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (val: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
  cellSize?: number;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 4,
  value,
  onChange,
  autoFocus = false,
  placeholder = '',
  cellSize,
}) => {
  const {colors} = useTheme();
  const styles = useThemedStyles(makeStyles);
  const inputs = useRef<Array<TextInput | null>>([]);
  const [focusIndex, setFocusIndex] = useState(autoFocus ? 0 : -1);

  const setCharAt = (i: number, c: string) => {
    const next = value.split('');
    while (next.length < length) next.push('');
    next[i] = c;
    onChange(next.slice(0, length).join(''));
  };

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      const chars = text.replace(/\s/g, '').split('').slice(0, length);
      onChange(chars.join('').padEnd(length, '').slice(0, length).trim());
      const next = Math.min(chars.length, length - 1);
      inputs.current[next]?.focus();
      return;
    }
    setCharAt(index, text);
    if (text && index < length - 1) inputs.current[index + 1]?.focus();
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
      setCharAt(index - 1, '');
    }
  };

  return (
    <View style={styles.row}>
      {Array.from({length}).map((_, i) => {
        const char = value[i] ?? '';
        const active = focusIndex === i;
        return (
          <TextInput
            allowFontScaling={false}
            key={i}
            ref={r => {
              inputs.current[i] = r;
            }}
            value={char}
            onChangeText={t => handleChange(t, i)}
            onKeyPress={e => handleKeyPress(e, i)}
            onFocus={() => setFocusIndex(i)}
            onBlur={() => setFocusIndex(-1)}
            keyboardType="number-pad"
            maxLength={1}
            autoFocus={autoFocus && i === 0}
            placeholder={placeholder}
            style={[
              styles.cell,
              cellSize ? {width: cellSize, height: cellSize} : null,
              {borderColor: active ? colors.primary : colors.inputBorder},
            ]}
            selectionColor={colors.primary}
            placeholderTextColor={colors.textPlaceholder}
          />
        );
      })}
    </View>
  );
};

export default OtpInput;

const makeStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: moderateScale(12),
    },
    cell: {
      flex: 1,
      height: moderateScale(60),
      borderRadius: moderateScale(20),
      borderWidth: 1,
      backgroundColor: colors.surface,
      textAlign: 'center',
      color: colors.text,
      fontFamily: FONTS.regular,
      fontWeight: '400',
      fontSize: moderateScale(14, 0.3),
    },
  });
