import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { THEME } from "../../theme";
import { CheckIcon } from "../Icon/SvgIcons";
import RNText from "../Text/RNText";

interface CheckboxProps {
  value: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  shape?: "square" | "circle";
}

const Checkbox: React.FC<CheckboxProps> = ({
  value,
  onChange,
  label,
  shape = "circle",
}) => (
  <Pressable
    onPress={() => onChange(!value)}
    style={styles.row}
    hitSlop={8}
  >
    <View
      style={[
        styles.box,
        shape === "circle" && styles.boxCircle,
        {
          backgroundColor: value ? THEME.primary : THEME.surface,
          borderColor: value ? THEME.primary : THEME.inputBorder,
        },
      ]}
    >
      {value ? (
        <CheckIcon size={moderateScale(12)} color={THEME.textOnPrimary} />
      ) : null}
    </View>
    {label ? (
      <RNText size={13} color={THEME.textSecondary}>
        {label}
      </RNText>
    ) : null}
  </Pressable>
);

export default Checkbox;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(8),
  },
  box: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(5),
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  boxCircle: { borderRadius: moderateScale(10) },
});
