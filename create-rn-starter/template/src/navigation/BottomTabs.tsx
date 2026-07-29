import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import BottomTabBar from '../components/BottomTabBar';
import Home from '../screen/root/home';
import Profile from '../screen/root/profile';
import RouteKey from './RouteKey';
import type {UserTabParamList} from './paramLists';

const Tab = createBottomTabNavigator<UserTabParamList>();

const renderTabBar = (props: BottomTabBarProps) => <BottomTabBar {...props} />;

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      sceneStyle: {backgroundColor: 'transparent'},
    }}
    tabBar={renderTabBar}>
    <Tab.Screen
      name={RouteKey.UserHome}
      component={Home}
      options={{title: 'Home'}}
    />
    <Tab.Screen
      name={RouteKey.UserProfile}
      component={Profile}
      options={{title: 'Profile'}}
    />
  </Tab.Navigator>
);

export default BottomTabs;
