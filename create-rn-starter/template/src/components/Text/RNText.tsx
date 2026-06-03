import React from "react";
import { Text, TextProps, TextStyle, StyleProp } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { FONTS, THEME } from "../../theme";

type FontKey =
  | "light"
  | "regular"
  | "italic"
  | "medium"
  | "semibold"
  | "bold"
  | "extraBold"
  | "black";

interface RNTextProps extends TextProps {
  size?: number;
  font?: FontKey;
  color?: string;
  textAlign?: TextStyle["textAlign"];
  lineHeight?: number;
  letterSpacing?: number;
  style?: StyleProp<TextStyle>;
}

const RNText: React.FC<RNTextProps> = ({
  size = 14,
  font = "regular",
  color = THEME.text,
  textAlign,
  lineHeight,
  letterSpacing,
  style,
  children,
  ...rest
}) => {
  const fontSize = moderateScale(size, 0.3);
  const fontFamily = FONTS[font] || FONTS.regular;

  return (
    <Text
      allowFontScaling={false}
      {...rest}
      style={[
        {
          fontFamily,
          fontSize,
          color,
          textAlign,
          lineHeight,
          letterSpacing,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default RNText;
export type { RNTextProps };
