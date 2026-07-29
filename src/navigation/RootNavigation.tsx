import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '../theme/ThemeProvider';
import BottomTabs from './BottomTabs';
import RouteKey from './RouteKey';
import type {RootStackParamList} from './paramLists';
// crns:if gallery
import Gallery from '../screen/root/gallery';
// crns:endif

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root (authenticated) stack. Hosts the bottom tabs and is where app-level
 * push screens — details, settings — belong as the app grows.
 */
const RootNavigation = () => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.background},
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={RouteKey.BottomTabs} component={BottomTabs} />
      {/* crns:if gallery */}
      <Stack.Screen name={RouteKey.Gallery} component={Gallery} />
      {/* crns:endif */}
    </Stack.Navigator>
  );
};

export default RootNavigation;
