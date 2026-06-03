import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { THEME } from "../../theme";

interface DividerProps {
  color?: string;
  thickness?: number;
  style?: StyleProp<ViewStyle>;
  vertical?: boolean;
}

const Divider: React.FC<DividerProps> = ({
  color = THEME.divider,
  thickness = 1,
  style,
  vertical,
}) => (
  <View
    style={[
      vertical ? styles.vertical : styles.horizontal,
      vertical ? { width: thickness } : { height: thickness },
      { backgroundColor: color },
      style,
    ]}
  />
);

export default Divider;

const styles = StyleSheet.create({
  vertical: { height: "100%" },
  horizontal: { width: "100%" },
});
