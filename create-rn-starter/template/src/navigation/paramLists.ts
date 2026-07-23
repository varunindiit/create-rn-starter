import RouteKey from "./RouteKey";

export type AuthStackParamList = {
  [RouteKey.Login]: undefined;
};

export type UserTabParamList = {
  [RouteKey.UserHome]: undefined;
  [RouteKey.UserProfile]: undefined;
};
