import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { THEME } from "../theme";
import BottomTabs from "./BottomTabs";
import RouteKey from "./RouteKey";

const Stack = createNativeStackNavigator();

/**
 * Root (authenticated) stack. Hosts the bottom tabs and is the place to add
 * further app-level stack screens (details, settings, etc.) as the app grows.
 */
const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: THEME.background },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name={RouteKey.BottomTabs} component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
