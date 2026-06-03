import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../redux/slice/auth";
import { RootState } from "../redux/store";
import { getStorageBoolean } from "../services/storage";
import { IS_LOGGED_IN } from "../utils/constants";
import AuthNavigation from "./AuthNavigation";
import RootNavigation from "./RootNavigation";
import RouteKey from "./RouteKey";
import { THEME } from "../theme";

const Stack = createNativeStackNavigator();

/**
 * Top-level navigator and auth guard. The session flag in redux decides
 * whether the Auth stack or the Root (app) stack is mounted, so toggling
 * `isLoggedIn` swaps the whole tree declaratively — no imperative navigation
 * needed on login/logout.
 */
const StackNavigation = () => {
  const isLoggedIn = useSelector((s: RootState) => s.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [bootstrapped, setBootstrapped] = useState(false);

  // Restore the persisted (dummy) session before rendering the tree.
  useEffect(() => {
    dispatch(setIsLoggedIn(getStorageBoolean(IS_LOGGED_IN) || false));
    setBootstrapped(true);
  }, [dispatch]);

  if (!bootstrapped) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: THEME.background },
      }}
    >
      {isLoggedIn ? (
        <Stack.Screen name={RouteKey.AppStack} component={RootNavigation} />
      ) : (
        <Stack.Screen name={RouteKey.AuthStack} component={AuthNavigation} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
