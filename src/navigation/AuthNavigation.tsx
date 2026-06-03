import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../screen/auth/Login";
import { THEME } from "../theme";
import RouteKey from "./RouteKey";
import { AuthStackParamList } from "./paramLists";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigation = () => (
  <Stack.Navigator
    initialRouteName={RouteKey.Login}
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: THEME.background },
      animation: "slide_from_right",
    }}
  >
    <Stack.Screen name={RouteKey.Login} component={Login} />
  </Stack.Navigator>
);

export default AuthNavigation;
