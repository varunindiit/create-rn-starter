import {configureStore, Middleware} from '@reduxjs/toolkit';
// crns:if rtkQuery
import {setupListeners} from '@reduxjs/toolkit/query';
import {apiSlice} from '../services/apiSlice';
// crns:endif
import {setUnauthorizedHandler} from '../services/api';
import authSlice, {logout} from './slice/auth';
import appSlice from './slice/app';
import userProfileSlice from './slice/userProfile';

/**
 * Middleware added on top of the RTK defaults. Kept as a plain array so the
 * store definition below reads the same whether or not the optional data layer
 * is present.
 */
const extraMiddleware: Middleware[] = [];
// crns:if rtkQuery
extraMiddleware.push(apiSlice.middleware);
// crns:endif

const store = configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice,
    userProfile: userProfileSlice,
    // crns:if rtkQuery
    [apiSlice.reducerPath]: apiSlice.reducer,
    // crns:endif
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // These checks walk the whole state tree on every action — useful while
      // developing, far too slow to ship.
      immutableCheck: __DEV__,
      serializableCheck: __DEV__,
    }).concat(extraMiddleware),
});

// crns:if rtkQuery
// Enables refetchOnFocus / refetchOnReconnect on every endpoint.
setupListeners(store.dispatch);
// crns:endif

/**
 * When the API reports the session is gone, tear it down here rather than in
 * whichever screen happened to make the request. The auth guard in
 * `StackNavigation` reacts to the state change and swaps back to the Auth
 * stack on its own.
 */
setUnauthorizedHandler(() => {
  store.dispatch(logout());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
