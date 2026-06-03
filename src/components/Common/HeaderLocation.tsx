import React from "react";
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { FONT_SIZE, THEME } from "../../theme";
import { PinIcon } from "../Icon/SvgIcons";
import RNText from "../Text/RNText";
import { useLanguage } from "../../localization";
import type { LocationStatus } from "../../redux/slice/location";

interface HeaderLocationProps {
  status: LocationStatus;
  label?: string;
  /** Retry the location fetch (used for the error state). */
  onRetry?: () => void;
  /** Text colour — lets each Home match its header palette. */
  textColor?: string;
}

/**
 * Compact, reusable header element that surfaces the device's current
 * location. Reacts to the global location slice status: shows a spinner while
 * resolving, the resolved city once granted, and tappable affordances for the
 * denied / error states.
 */
const HeaderLocation: React.FC<HeaderLocationProps> = ({
  status,
  label,
  onRetry,
  textColor = THEME.textSecondary,
}) => {
  const { t } = useLanguage();
  if (status === "loading" || status === "idle") {
    return (
      <View style={styles.row}>
        <ActivityIndicator size="small" color={THEME.primary} />
        <RNText size={FONT_SIZE.sm} color={textColor} style={styles.text}>
          {t("location.gettingLocation")}
        </RNText>
      </View>
    );
  }

  if (status === "denied") {
    return (
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.7}
        hitSlop={moderateScale(8)}
        onPress={() => Linking.openSettings()}
      >
        <PinIcon size={moderateScale(13)} color={THEME.danger} />
        <RNText size={FONT_SIZE.sm} color={THEME.danger} style={styles.text}>
          {t("location.enableAccess")}
        </RNText>
      </TouchableOpacity>
    );
  }

  if (status === "error") {
    return (
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.7}
        hitSlop={moderateScale(8)}
        onPress={onRetry}
      >
        <PinIcon size={moderateScale(13)} color={THEME.warning} />
        <RNText size={FONT_SIZE.sm} color={THEME.warning} style={styles.text}>
          {t("location.unavailableRetry")}
        </RNText>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.row}>
      <PinIcon size={moderateScale(13)} color={THEME.primary} />
      <RNText
        size={FONT_SIZE.sm}
        color={textColor}
        style={styles.text}
        numberOfLines={1}
      >
        {label || t("location.current")}
      </RNText>
    </View>
  );
};

export default HeaderLocation;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(4),
  },
  text: {
    marginLeft: moderateScale(5),
    flexShrink: 1,
  },
});
