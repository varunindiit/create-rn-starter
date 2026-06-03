import RouteKey from "./RouteKey";
import { LocationValue } from "../services/places";

/**
 * Params for the shared Location Search screen.
 *
 * By default the selected location is written back to the ride draft based on
 * `field` (the "Pickup Location" flow). Callers that manage their own state
 * (e.g. the Home From/To fields) can instead pass an `onSelect` callback to
 * receive the resolved location directly, keeping the screen reusable.
 */
export type LocationSearchParams = {
  field?: "pickup" | "drop";
  title?: string;
  onSelect?: (location: LocationValue) => void;
};

export type AuthStackParamList = {
  [RouteKey.Login]: undefined;
};

export type UserTabParamList = {
  [RouteKey.UserHome]: undefined;
  [RouteKey.UserProfile]: undefined;
};
