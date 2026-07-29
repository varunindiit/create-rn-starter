/** Centralised route names. */
export enum RouteKey {
  /* Stacks */
  AuthStack = 'AuthStack',
  AppStack = 'AppStack',
  BottomTabs = 'BottomTabs',

  /* Auth */
  Login = 'Login',

  /* User tabs */
  UserHome = 'Home',
  UserProfile = 'Profile',

  /* App stack */
  // crns:if gallery
  Gallery = 'Gallery',
  // crns:endif
}

export default RouteKey;
