import React, { useEffect } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { hideSplash } from "react-native-splash-view";
import { moderateScale } from "react-native-size-matters";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";

import store from "./src/redux/store";
import StackNavigation from "./src/navigation/StackNavigation";
import "./src/localization/i18n";

const setupFontScaling = () => {
  if ((Text as any).defaultProps) {
    (Text as any).defaultProps.allowFontScaling = false;
  } else {
    (Text as any).defaultProps = { allowFontScaling: false };
  }
  if ((TextInput as any).defaultProps) {
    (TextInput as any).defaultProps.allowFontScaling = false;
  } else {
    (TextInput as any).defaultProps = { allowFontScaling: false };
  }
};

setupFontScaling();

const FlashMessageView = ({ message }: any) => (
  <View style={styles.flashMessage}>
    <Text style={styles.flashMessageText}>
      {message.description || message.message || "Default message"}
    </Text>
  </View>
);

const renderFlashMessage = (props: any) => <FlashMessageView {...props} />;

const App = () => {
  useEffect(() => {
    hideSplash();
  }, []);
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <Provider store={store}>
          <KeyboardProvider>
            <NavigationContainer>
              <FlashMessage
                position="top"
                duration={1500}
                statusBarHeight={
                  Platform.OS === "ios" ? moderateScale(50) : moderateScale(40)
                }
                MessageComponent={renderFlashMessage}
              />
              <StatusBar
                backgroundColor="transparent"
                barStyle="light-content"
                translucent
              />
              <StackNavigation />
            </NavigationContainer>
          </KeyboardProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flashMessage: {
    marginTop: moderateScale(40),
    backgroundColor: "#1B2148",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(8),
    marginHorizontal: moderateScale(12),
  },
  flashMessageText: {
    color: "#fff",
    fontSize: moderateScale(12),
    fontWeight: "600",
  },
});
