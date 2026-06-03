import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setRole } from "../redux/slice/auth";
import { RootState } from "../redux/store";
import { storage } from "../services/storage";
import { IS_LOGGED_IN, ROLE_KEY } from "../utils/constants";
import AuthNavigation from "./AuthNavigation";
import RootNavigation from "./RootNavigation";
import RouteKey from "./RouteKey";
import { THEME } from "../theme";
import LanguageSelection from "../screen/onboarding/LanguageSelection";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { isLoggedIn } = useSelector((s: RootState) => s.auth);
  const languageSelected = useSelector(
    (s: RootState) => s.app.languageSelected,
  );
  const dispatch = useDispatch();
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    const isLogged = storage.getBoolean(IS_LOGGED_IN) || false;
    const role =
      (storage.getString(ROLE_KEY) as "passenger" | "driver") || "passenger";
    dispatch(setIsLoggedIn(isLogged));
    dispatch(setRole(role));
    setBootstrapped(true);
  }, [dispatch]);

  if (!bootstrapped) return null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: THEME.background },
      }}
    >
      {!languageSelected ? (
        // First-launch step — shown before auth/splash content.
        <Stack.Screen
          name={RouteKey.LanguageSelection}
          component={LanguageSelection}
        />
      ) : isLoggedIn ? (
        <Stack.Screen name={RouteKey.AppStack} component={RootNavigation} />
      ) : (
        <Stack.Screen name={RouteKey.AuthStack} component={AuthNavigation} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
