import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { SPACING, THEME } from "../../theme";
import RNText from "../Text/RNText";

export interface SegmentedTab {
  key: string;
  label: string;
}

interface SegmentedControlProps {
  tabs: SegmentedTab[];
  value: string;
  onChange: (key: string) => void;
  style?: StyleProp<ViewStyle>;
  variant?: "pill" | "underline";
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  tabs,
  value,
  onChange,
  style,
  variant = "pill",
}) => {
  if (variant === "underline") {
    return (
      <View style={[styles.underlineContainer, style]}>
        {tabs.map((t) => {
          const active = t.key === value;
          return (
            <Pressable
              key={t.key}
              onPress={() => onChange(t.key)}
              style={styles.underlineTab}
            >
              <RNText
                font={active ? "semibold" : "regular"}
                size={14}
                color={active ? THEME.primary : THEME.textSecondary}
              >
                {t.label}
              </RNText>
              <View
                style={[styles.underline, active && styles.underlineActive]}
              />
            </Pressable>
          );
        })}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {tabs.map((t) => {
        const active = t.key === value;
        return (
          <Pressable
            key={t.key}
            onPress={() => onChange(t.key)}
            style={[styles.pill, active && styles.pillActive]}
          >
            <RNText
              font={active ? "semibold" : "medium"}
              size={13}
              color={active ? THEME.textOnPrimary : THEME.textSecondary}
            >
              {t.label}
            </RNText>
          </Pressable>
        );
      })}
    </View>
  );
};

export default SegmentedControl;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: THEME.surface,
    borderRadius: SPACING.radiusPill,
    gap: moderateScale(4),
    padding: moderateScale(4),
  },
  pill: {
    flex: 1,
    height: moderateScale(38),
    borderRadius: SPACING.radiusPill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  pillActive: {
    backgroundColor: THEME.primary,
  },
  underlineContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
  },
  underlineTab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: moderateScale(12),
    gap: moderateScale(8),
  },
  underline: {
    height: moderateScale(2),
    width: "60%",
    borderRadius: moderateScale(2),
    backgroundColor: "transparent",
  },
  underlineActive: {
    backgroundColor: THEME.primary,
  },
});
