import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {restoreSession} from '../redux/slice/auth';
import {useTheme} from '../theme/ThemeProvider';
import AuthNavigation from './AuthNavigation';
import RootNavigation from './RootNavigation';
import RouteKey from './RouteKey';

const Stack = createNativeStackNavigator();

/**
 * Top-level navigator and auth guard. The session flag in Redux decides whether
 * the Auth stack or the App stack is mounted, so toggling it swaps the whole
 * tree declaratively — no imperative navigation on login/logout, and no way for
 * a signed-out user to be left on an authed screen.
 */
const StackNavigation = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const isRestoring = useAppSelector(state => state.auth.isRestoring);
  const {colors} = useTheme();

  // Read the persisted session back before rendering anything, so the user
  // never sees Login flash before being sent to Home.
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  if (isRestoring) return null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.background},
      }}>
      {isLoggedIn ? (
        <Stack.Screen name={RouteKey.AppStack} component={RootNavigation} />
      ) : (
        <Stack.Screen name={RouteKey.AuthStack} component={AuthNavigation} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
