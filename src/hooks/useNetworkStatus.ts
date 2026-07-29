import {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {setOnline} from '../redux/slice/app';

/**
 * Mirror device connectivity into Redux.
 *
 * Mount once, near the root. Everything else reads `useIsOnline()` so no screen
 * has to own a NetInfo subscription, and the offline banner and any retry logic
 * agree on a single source of truth.
 *
 * `isInternetReachable` is deliberately preferred over `isConnected`: a device
 * on a captive-portal wifi reports connected but cannot reach anything.
 */
export const useNetworkStatusListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const online =
        state.isInternetReachable === null
          ? !!state.isConnected
          : !!state.isInternetReachable;
      dispatch(setOnline(online));
    });

    NetInfo.fetch().then(state => {
      const online =
        state.isInternetReachable === null
          ? !!state.isConnected
          : !!state.isInternetReachable;
      dispatch(setOnline(online));
    });

    return unsubscribe;
  }, [dispatch]);
};

/** Current connectivity, as tracked by {@link useNetworkStatusListener}. */
export const useIsOnline = () => useAppSelector(state => state.app.isOnline);

export default useNetworkStatusListener;
