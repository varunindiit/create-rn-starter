import React from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { THEME } from "../../theme";
import { PlusIcon } from "../Icon/SvgIcons";

interface FABProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  size?: number;
  children?: React.ReactNode;
}

const FAB: React.FC<FABProps> = ({ onPress, style, size = 56, children }) => {
  const dim = moderateScale(size);
  const ringPad = moderateScale(6);
  const outerDim = dim + ringPad * 2;
  return (
    <View
      style={[
        styles.halo,
        {
          width: outerDim,
          height: outerDim,
          borderRadius: outerDim / 2,
          padding: ringPad,
        },
        style,
      ]}
    >
      <Pressable
        onPress={onPress}
        style={[
          styles.fab,
          {
            width: dim,
            height: dim,
            borderRadius: dim / 2,
            backgroundColor: THEME.primary,
          },
        ]}
      >
        {children ?? (
          <PlusIcon size={moderateScale(24)} color={THEME.textOnPrimary} />
        )}
      </Pressable>
    </View>
  );
};

export default FAB;

const styles = StyleSheet.create({
  halo: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(242, 107, 42, 0.18)",
  },
  fab: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F26B2A",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
});
