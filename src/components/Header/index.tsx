import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { SIZES, THEME } from "../../theme";
import { ChevronLeftIcon } from "../Icon/SvgIcons";
import RNText from "../Text/RNText";

export interface HeaderProps {
  title?: string;
  titleColor?: string;
  rightLabel?: string;
  onRightPress?: () => void;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  onBack?: () => void;
  showBack?: boolean;
  safeArea?: boolean;
  background?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const Header: React.FC<HeaderProps> = ({
  title,
  titleColor = THEME.text,
  rightLabel,
  onRightPress,
  rightIcon,
  leftIcon,
  onBack,
  showBack = true,
  safeArea = true,
  background = "transparent",
  containerStyle,
}) => {
  const nav = useNavigation();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onBack) return onBack();
    if (nav.canGoBack()) nav.goBack();
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: background },
        safeArea && { paddingTop: insets.top + moderateScale(6) },
        containerStyle,
      ]}
    >
      <View style={styles.side}>
        {showBack || leftIcon ? (
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={0.7}
            hitSlop={10}
            style={styles.iconBtn}
          >
            {leftIcon ?? (
              <ChevronLeftIcon size={moderateScale(22)} color={THEME.text} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.titleWrap}>
        {title ? (
          <RNText
            font="semibold"
            size={17}
            color={titleColor}
            numberOfLines={1}
            textAlign="center"
          >
            {title}
          </RNText>
        ) : null}
      </View>

      <View style={[styles.side, styles.sideRight]}>
        {rightLabel ? (
          <TouchableOpacity
            onPress={onRightPress}
            activeOpacity={0.7}
            hitSlop={10}
          >
            <RNText font="medium" size={14} color={THEME.primary}>
              {rightLabel}
            </RNText>
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity
            onPress={onRightPress}
            activeOpacity={0.7}
            hitSlop={10}
            style={styles.iconBtn}
          >
            {rightIcon}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: SIZES.headerHeight,
    paddingHorizontal: moderateScale(8),
    paddingBottom: moderateScale(8),
  },
  side: {
    width: moderateScale(56),
    alignItems: "flex-start",
    justifyContent: "center",
  },
  sideRight: { alignItems: "flex-end" },
  iconBtn: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
