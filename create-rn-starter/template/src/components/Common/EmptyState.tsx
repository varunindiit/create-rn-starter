import React from "react";
import { StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { SPACING, THEME } from "../../theme";
import RNText from "../Text/RNText";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon }) => (
  <View style={styles.wrap}>
    {icon ? <View style={styles.icon}>{icon}</View> : null}
    {title ? (
      <RNText
        font="semibold"
        size={16}
        color={THEME.text}
        textAlign="center"
        style={styles.title}
      >
        {title}
      </RNText>
    ) : null}
    {description ? (
      <RNText
        size={13}
        color={THEME.textMuted}
        textAlign="center"
        style={styles.desc}
      >
        {description}
      </RNText>
    ) : null}
  </View>
);

export default EmptyState;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xxl,
  },
  icon: { marginBottom: moderateScale(12) },
  title: { marginBottom: moderateScale(6) },
  desc: { maxWidth: "80%" },
});
