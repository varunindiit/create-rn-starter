import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import BottomTabBar from '../components/BottomTabBar';
import Home from '../screen/root/home';
import Profile from '../screen/shared/Profile';
import RouteKey from './RouteKey';
import { UserTabParamList } from './paramLists';

const Tab = createBottomTabNavigator<UserTabParamList>();

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      sceneStyle: { backgroundColor: 'transparent' },
    }}
    tabBar={(props: any) => <BottomTabBar {...props} />}
  >
    <Tab.Screen name={RouteKey.UserHome} component={Home} />
    <Tab.Screen name={RouteKey.UserProfile} component={Profile} />
  </Tab.Navigator>
);

export default BottomTabs;
