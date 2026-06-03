import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/auth";
import { setStorageBoolean } from "../../services/storage";
import { IS_LOGGED_IN } from "../../utils/constants";
import { FONTS } from "../../theme/fonts";
import { THEME } from "../../theme";

const Login = () => {
  const dispatch = useDispatch();

  const onLogin = () => {
    // Persist the dummy session, then flip auth state. The top-level guard
    // swaps to the Root stack automatically.
    setStorageBoolean(IS_LOGGED_IN, true);
    dispatch(login());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Login Screen</Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={onLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: moderateScale(24),
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: moderateScale(22),
    color: THEME.text,
    marginBottom: moderateScale(28),
  },
  button: {
    backgroundColor: THEME.primary,
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(48),
    borderRadius: moderateScale(12),
  },
  buttonText: {
    fontFamily: FONTS.semibold,
    fontSize: moderateScale(16),
    color: THEME.textOnPrimary,
  },
});
