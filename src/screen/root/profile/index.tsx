import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slice/auth";
import { clearStorageValue } from "../../../services/storage";
import { IS_LOGGED_IN } from "../../../utils/constants";
import { FONTS } from "../../../theme/fonts";
import { THEME } from "../../../theme";

const Profile = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    // Clear the persisted dummy session, then reset auth state. The top-level
    // guard swaps back to the Auth (Login) stack automatically.
    clearStorageValue(IS_LOGGED_IN);
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile Screen</Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={onLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

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
    backgroundColor: THEME.danger,
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(44),
    borderRadius: moderateScale(12),
  },
  buttonText: {
    fontFamily: FONTS.semibold,
    fontSize: moderateScale(16),
    color: THEME.textOnPrimary,
  },
});
