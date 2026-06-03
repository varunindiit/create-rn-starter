import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { THEME } from "../../theme";
import RNText from "../Text/RNText";

interface SosButtonProps {
  /** Diameter of the button. Defaults to a header-friendly 38. */
  size?: number;
}

/**
 * Discreet, presentational SOS pill for the header. The press is owned by the
 * parent (e.g. Header `onRightPress`) so it can sit inside the header's touch
 * target. A subtle "breathing" pulse keeps it noticeable without being loud.
 */
const SosButton: React.FC<SosButtonProps> = ({ size = moderateScale(30) }) => {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const scale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.07],
  });

  return (
    <Animated.View
      style={[
        styles.core,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          transform: [{ scale }],
        },
      ]}
    >
      <RNText font="bold" size={9} color={THEME.textOnPrimary} letterSpacing={0.5}>
        SOS
      </RNText>
    </Animated.View>
  );
};

export default SosButton;

const styles = StyleSheet.create({
  core: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.danger,
    borderWidth: moderateScale(2),
    borderColor: "rgba(255,255,255,0.85)",
    shadowColor: THEME.danger,
    shadowOffset: { width: 0, height: moderateScale(3) },
    shadowOpacity: 0.35,
    shadowRadius: moderateScale(6),
    elevation: 4,
  },
});
