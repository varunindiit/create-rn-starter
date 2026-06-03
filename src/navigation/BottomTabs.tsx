import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../screen/root/home";
import Profile from "../screen/root/profile";
import { THEME } from "../theme";
import RouteKey from "./RouteKey";
import { UserTabParamList } from "./paramLists";

const Tab = createBottomTabNavigator<UserTabParamList>();

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: THEME.tabActive,
      tabBarInactiveTintColor: THEME.tabInactive,
      sceneStyle: { backgroundColor: THEME.background },
    }}
  >
    <Tab.Screen
      name={RouteKey.UserHome}
      component={Home}
      options={{ tabBarLabel: "Home" }}
    />
    <Tab.Screen
      name={RouteKey.UserProfile}
      component={Profile}
      options={{ tabBarLabel: "Profile" }}
    />
  </Tab.Navigator>
);

export default BottomTabs;
