import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LanguageSelection from '../screen/onboarding/LanguageSelection';
import { THEME } from '../theme';
import BottomTabs from './BottomTabs';
import RouteKey from './RouteKey';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: THEME.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name={RouteKey.BottomTabs} component={BottomTabs} />
      <Stack.Screen
        name={RouteKey.LanguageSettings}
        component={LanguageSelection}
        initialParams={{ mode: 'settings' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
