import React, {useEffect} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {hideSplash} from 'react-native-splash-view';
import {moderateScale} from 'react-native-size-matters';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';

import store from './src/redux/store';
import StackNavigation from './src/navigation/StackNavigation';
import ErrorBoundary from './src/components/ErrorBoundary';
import RNText from './src/components/Text/RNText';
import {ThemeProvider, useTheme} from './src/theme/ThemeProvider';
import {useNetworkStatusListener} from './src/hooks/useNetworkStatus';
import './src/localization/i18n';

/**
 * Flash message body. Rendered inside the themed tree so it follows dark mode.
 */
const FlashMessageView = ({message}: any) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.flashMessage, {backgroundColor: colors.surfaceMuted}]}>
      <RNText size={12} font="semibold" color={colors.text}>
        {message.description || message.message}
      </RNText>
    </View>
  );
};

const renderFlashMessage = (props: any) => <FlashMessageView {...props} />;

/**
 * Everything that needs the store or the theme lives here rather than in
 * `App`, because a provider's value is not visible to the component that
 * renders it.
 */
const AppContent = () => {
  const {colors, isDark} = useTheme();
  useNetworkStatusListener();

  useEffect(() => {
    hideSplash();
  }, []);

  return (
    <NavigationContainer
      // Start from React Navigation's own theme so future keys (fonts, etc.)
      // keep sensible defaults, then override the colours with ours.
      theme={{
        ...(isDark ? DarkTheme : DefaultTheme),
        colors: {
          ...(isDark ? DarkTheme : DefaultTheme).colors,
          primary: colors.primary,
          background: colors.background,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
          notification: colors.danger,
        },
      }}>
      <FlashMessage
        position="top"
        duration={2500}
        statusBarHeight={
          Platform.OS === 'ios' ? moderateScale(50) : moderateScale(40)
        }
        MessageComponent={renderFlashMessage}
      />
      <StackNavigation />
    </NavigationContainer>
  );
};

const App = () => (
  <ErrorBoundary>
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <Provider store={store}>
          <ThemeProvider>
            <KeyboardProvider>
              <AppContent />
            </KeyboardProvider>
          </ThemeProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  </ErrorBoundary>
);

export default App;

const styles = StyleSheet.create({
  container: {flex: 1},
  flashMessage: {
    marginTop: moderateScale(40),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(8),
    marginHorizontal: moderateScale(12),
  },
});
