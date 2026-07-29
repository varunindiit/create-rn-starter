import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import RouteKey from './RouteKey';

export type AuthStackParamList = {
  [RouteKey.Login]: undefined;
};

export type UserTabParamList = {
  [RouteKey.UserHome]: undefined;
  [RouteKey.UserProfile]: undefined;
};

export type RootStackParamList = {
  [RouteKey.BottomTabs]: undefined;
  // crns:if gallery
  [RouteKey.Gallery]: undefined;
  // crns:endif
};

/**
 * Per-screen prop helpers. A screen typed as
 * `RootStackScreenProps<RouteKey.Gallery>` gets a checked `route.params` and a
 * `navigation` that only accepts routes that actually exist.
 */
export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type UserTabScreenProps<T extends keyof UserTabParamList> =
  BottomTabScreenProps<UserTabParamList, T>;

/**
 * Makes the untyped `useNavigation()` calls in shared components (Header, for
 * one) resolve against the real route list instead of `never`.
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList, AuthStackParamList {}
  }
}
