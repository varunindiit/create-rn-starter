import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import BottomTabBar from "../components/BottomTabBar";
import Home from "../screen/root/home";
import Profile from "../screen/root/profile";
import RouteKey from "./RouteKey";
import { UserTabParamList } from "./paramLists";

const Tab = createBottomTabNavigator<UserTabParamList>();

const renderTabBar = (props: React.ComponentProps<typeof BottomTabBar>) => (
  <BottomTabBar {...props} />
);

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      sceneStyle: { backgroundColor: "transparent" },
    }}
    tabBar={renderTabBar}
  >
    <Tab.Screen name={RouteKey.UserHome} component={Home} />
    <Tab.Screen name={RouteKey.UserProfile} component={Profile} />
  </Tab.Navigator>
);

export default BottomTabs;
