import React, {memo} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Edges, SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../../theme/ThemeProvider';

interface MainContainerProps {
  children?: React.ReactNode;
  background?: ImageSourcePropType | null;
  edges?: Edges;
  bgColor?: string;
  /** Defaults to the inverse of the active theme, which is almost always right. */
  statusBarStyle?: 'light-content' | 'dark-content';
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  gradient?: boolean;
  gradientColors?: string[];
  gradientStart?: {x: number; y: number};
  gradientEnd?: {x: number; y: number};
  testID?: string;
}

const MainContainer: React.FC<MainContainerProps> = memo(
  ({
    children,
    background,
    edges = ['top', 'bottom'] as const,
    bgColor,
    statusBarStyle,
    style,
    contentStyle,
    gradient = false,
    gradientColors,
    gradientStart = {x: 0, y: 0},
    gradientEnd = {x: 0, y: 0.4},
    testID,
  }) => {
    const {colors, isDark} = useTheme();

    return (
      <View
        testID={testID}
        style={[
          styles.root,
          {backgroundColor: bgColor ?? colors.background},
          style,
        ]}>
        <StatusBar
          barStyle={statusBarStyle ?? (isDark ? 'light-content' : 'dark-content')}
          backgroundColor="transparent"
          translucent
        />
        {gradient ? (
          <LinearGradient
            colors={gradientColors ?? [colors.gradientFrom, colors.gradientTo]}
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
            // Decorative chrome — never the subject of the screen.
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          />
        ) : null}
        <SafeAreaView edges={edges} style={[styles.safe, contentStyle]}>
          {children}
        </SafeAreaView>
      </View>
    );
  },
);

MainContainer.displayName = 'MainContainer';

export default MainContainer;
export type {MainContainerProps};

const styles = StyleSheet.create({
  root: {flex: 1},
  safe: {flex: 1},
});
