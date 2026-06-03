import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { THEME } from "../../theme";

interface LoaderProps {
  size?: "small" | "large";
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "large",
  color = THEME.primary,
}) => (
  <View style={styles.center}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

export default Loader;

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
