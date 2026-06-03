import { useCallback, useEffect } from "react";
import GetLocation, { isLocationError } from "react-native-get-location";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  locationDenied,
  locationError,
  locationLoading,
  locationResolved,
} from "../redux/slice/location";
import { reverseGeocode } from "../services/places";

/**
 * Reusable device-location hook.
 *
 * Requests location permission (the OS prompt is triggered by GetLocation on
 * both platforms), fetches the current coordinates, reverse-geocodes them into
 * a readable city label and stores everything in the global `location` slice so
 * any screen (Passenger or Driver home) can render it.
 *
 * The fetch runs automatically once per app session (when the slice is still
 * `idle`); call `refetch()` to retry after a denial or error.
 */
export const useCurrentLocation = (auto = true) => {
  const dispatch = useDispatch();
  const location = useSelector((s: RootState) => s.location);

  const fetchLocation = useCallback(async () => {
    dispatch(locationLoading());
    try {
      const position = await GetLocation.getCurrentPosition({
        enableHighAccuracy: false,
        timeout: 15000,
      });
      const result = await reverseGeocode(
        position.latitude,
        position.longitude,
      );
      dispatch(
        locationResolved({
          label: result.shortLabel,
          address: result.address,
          latitude: result.latitude,
          longitude: result.longitude,
        }),
      );
    } catch (err) {
      if (isLocationError(err) && err.code === "UNAUTHORIZED") {
        dispatch(locationDenied());
        return;
      }
      const message = isLocationError(err)
        ? err.code === "UNAVAILABLE"
          ? "Location services are off"
          : "Couldn't get your location"
        : "Couldn't get your location";
      dispatch(locationError(message));
    }
  }, [dispatch]);

  // Fire once per session while the slice is still idle.
  useEffect(() => {
    if (auto && location.status === "idle") {
      fetchLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...location, refetch: fetchLocation };
};

export default useCurrentLocation;
