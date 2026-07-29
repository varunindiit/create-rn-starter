import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screen/auth/Login';
import {useTheme} from '../theme/ThemeProvider';
import RouteKey from './RouteKey';
import type {AuthStackParamList} from './paramLists';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigation = () => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={RouteKey.Login}
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.background},
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={RouteKey.Login} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
