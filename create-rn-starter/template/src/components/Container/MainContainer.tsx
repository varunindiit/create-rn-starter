import React, { memo } from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView, Edges } from "react-native-safe-area-context";
import { THEME } from "../../theme";

interface MainContainerProps {
  children?: React.ReactNode;
  background?: ImageSourcePropType | null;
  edges?: Edges;
  bgColor?: string;
  statusBarStyle?: "light-content" | "dark-content";
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  gradient?: boolean;
  gradientColors?: string[];
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
}

const MainContainer: React.FC<MainContainerProps> = memo(
  ({
    children,
    background,
    edges = ["top", "bottom"] as const,
    bgColor = THEME.background,
    statusBarStyle = "dark-content",
    style,
    contentStyle,
    gradient = false,
    gradientColors = ["#FAE1CF", "#FFFFFF"],
    gradientStart = { x: 0, y: 0 },
    gradientEnd = { x: 0, y: 0.4 },
  }) => (
    <View style={[styles.root, { backgroundColor: bgColor }, style]}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor="transparent"
        translucent
      />
      {gradient ? (
        <LinearGradient
          colors={gradientColors}
          start={gradientStart}
          end={gradientEnd}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      {background ? (
        <ImageBackground
          source={background}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      ) : null}
      <SafeAreaView edges={edges} style={[styles.safe, contentStyle]}>
        {children}
      </SafeAreaView>
    </View>
  ),
);

export default MainContainer;

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
});
