import React from 'react';
import {StyleProp, Text, TextProps, TextStyle} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {FONTS} from '../../theme/fonts';
import {useTheme} from '../../theme/ThemeProvider';

type FontKey = keyof typeof FONTS;

interface RNTextProps extends TextProps {
  size?: number;
  font?: FontKey;
  color?: string;
  textAlign?: TextStyle['textAlign'];
  lineHeight?: number;
  letterSpacing?: number;
  style?: StyleProp<TextStyle>;
  /**
   * Opt back into OS font scaling for this text. The app disables it globally
   * so layouts stay predictable, but body copy in a content-heavy screen is a
   * good candidate for turning it back on.
   */
  scalable?: boolean;
}

const RNText: React.FC<RNTextProps> = ({
  size = 14,
  font = 'regular',
  color,
  textAlign,
  lineHeight,
  letterSpacing,
  style,
  children,
  scalable = false,
  ...rest
}) => {
  const {colors} = useTheme();

  return (
    <Text
      allowFontScaling={scalable}
      {...rest}
      style={[
        {
          fontFamily: FONTS[font] || FONTS.regular,
          fontSize: moderateScale(size, 0.3),
          color: color ?? colors.text,
          textAlign,
          lineHeight,
          letterSpacing,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default RNText;
export type {RNTextProps};
