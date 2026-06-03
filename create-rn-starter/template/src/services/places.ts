import axios from "axios";
import Config from "./Config";

/**
 * Google Places / Directions helpers.
 *
 * Uses the same Google key the native Maps SDK is configured with. The key
 * must have the "Places API", "Directions API" and "Geocoding API" enabled in
 * the Google Cloud console for these calls to succeed.
 */

const GOOGLE_BASE = "https://maps.googleapis.com/maps/api";

/** A resolved location with everything callers need to render and route. */
export interface LocationValue {
  latitude: number;
  longitude: number;
  address: string;
}

/** A single autocomplete suggestion shown while typing. */
export interface PlaceSuggestion {
  placeId: string;
  primaryText: string;
  secondaryText: string;
  description: string;
}

/** A decoded route between two points. */
export interface RouteResult {
  coordinates: LocationValue[];
  distanceText?: string;
  durationText?: string;
}

/**
 * A single alternative route returned by the Directions API. Carries both the
 * human-readable labels (for the route cards) and the raw values (for sorting
 * the fastest route to the top), plus any intermediate "via" segments parsed
 * from the route summary so the detail timeline can show the path it takes.
 */
export interface RouteOption {
  id: string;
  coordinates: LocationValue[];
  distanceText?: string;
  durationText?: string;
  /** Distance in metres — used to sort/compare routes. */
  distanceValue: number;
  /** Duration in seconds — used to sort/compare routes. */
  durationValue: number;
  /** Google's route summary, e.g. "N3" or "N3 and N8". */
  summary?: string;
  /** Intermediate via roads/towns derived from the summary (may be empty). */
  stops: string[];
}

const placesApi = axios.create({ baseURL: GOOGLE_BASE, timeout: 15000 });

/** Dedicated session token so autocomplete + details are billed as one session. */
let sessionToken = "";
export const newSessionToken = (): string => {
  sessionToken = `${Date.now().toString(36)}-${Math.floor(
    Math.random() * 1e9,
  ).toString(36)}`;
  return sessionToken;
};

/**
 * Live city suggestions for the search field. Returns cities worldwide, but
 * when an optional `bias` (e.g. the device location) is supplied, nearby cities
 * are prioritised to the top of the list while global matches still appear.
 */
export const autocompletePlaces = async (
  input: string,
  signal?: AbortSignal,
  bias?: { latitude: number; longitude: number },
): Promise<PlaceSuggestion[]> => {
  const query = input.trim();
  if (query.length < 2) return [];

  const { data } = await placesApi.get("/place/autocomplete/json", {
    signal,
    params: {
      input: query,
      key: Config.googleMapsKey,
      sessiontoken: sessionToken || newSessionToken(),
      language: "en",
      // Restrict suggestions to cities/towns only — excludes shops, streets,
      // buildings and other place types.
      types: "(cities)",
      // Bias (not restrict) toward the user's location so nearby cities rank
      // first; global cities are still returned.
      ...(bias
        ? { location: `${bias.latitude},${bias.longitude}`, radius: 50000 }
        : {}),
    },
  });

  if (data?.status !== "OK" && data?.status !== "ZERO_RESULTS") {
    throw new Error(data?.error_message || data?.status || "Places request failed");
  }

  return (data?.predictions ?? []).map((p: any) => ({
    placeId: p.place_id,
    primaryText: p.structured_formatting?.main_text ?? p.description,
    secondaryText: p.structured_formatting?.secondary_text ?? "",
    description: p.description,
  }));
};

/** Resolve a suggestion (place id) into coordinates + a full formatted address. */
export const getPlaceDetails = async (
  placeId: string,
): Promise<LocationValue> => {
  const { data } = await placesApi.get("/place/details/json", {
    params: {
      place_id: placeId,
      key: Config.googleMapsKey,
      sessiontoken: sessionToken || newSessionToken(),
      fields: "geometry,formatted_address,name",
      language: "en",
    },
  });

  if (data?.status !== "OK") {
    throw new Error(data?.error_message || data?.status || "Place details failed");
  }

  // A details call closes the autocomplete session — start a fresh one next time.
  sessionToken = "";

  const loc = data.result.geometry.location;
  return {
    latitude: loc.lat,
    longitude: loc.lng,
    address: data.result.formatted_address ?? data.result.name ?? "",
  };
};

/** Forward-geocode a free-text address (fallback when only a string is known). */
export const geocodeAddress = async (
  address: string,
): Promise<LocationValue | null> => {
  const query = address.trim();
  if (!query) return null;

  const { data } = await placesApi.get("/geocode/json", {
    params: { address: query, key: Config.googleMapsKey, language: "en" },
  });

  if (data?.status !== "OK" || !data.results?.length) return null;

  const best = data.results[0];
  const loc = best.geometry.location;
  return {
    latitude: loc.lat,
    longitude: loc.lng,
    address: best.formatted_address ?? query,
  };
};

/** A reverse-geocoded location enriched with header-friendly labels. */
export interface ReverseGeocodeResult extends LocationValue {
  /** City / locality, e.g. "Yaoundé". */
  city?: string;
  /** Country name, e.g. "Cameroon". */
  country?: string;
  /** Compact label for headers, e.g. "Yaoundé, Cameroon". */
  shortLabel: string;
}

/** Pull the first matching component (by type) out of a geocode result. */
const pickComponent = (components: any[], type: string): string | undefined =>
  components?.find((c) => c.types?.includes(type))?.long_name;

/** Reverse-geocode raw GPS coordinates into a human-readable address. */
export const reverseGeocode = async (
  latitude: number,
  longitude: number,
): Promise<ReverseGeocodeResult> => {
  const { data } = await placesApi.get("/geocode/json", {
    params: {
      latlng: `${latitude},${longitude}`,
      key: Config.googleMapsKey,
      language: "en",
    },
  });

  const best =
    data?.status === "OK" && data.results?.length ? data.results[0] : null;
  const address = best?.formatted_address ?? "Current location";

  const components = best?.address_components ?? [];
  const city =
    pickComponent(components, "locality") ??
    pickComponent(components, "administrative_area_level_2") ??
    pickComponent(components, "administrative_area_level_1");
  const country = pickComponent(components, "country");

  const shortLabel = city
    ? country
      ? `${city}, ${country}`
      : city
    : address;

  return { latitude, longitude, address, city, country, shortLabel };
};

/**
 * Fetch a drivable route between two points and return the decoded polyline
 * (used for the BlaBlaCar-style path on the map).
 */
export const getDirections = async (
  origin: LocationValue,
  destination: LocationValue,
): Promise<RouteResult> => {
  const { data } = await placesApi.get("/directions/json", {
    params: {
      origin: `${origin.latitude},${origin.longitude}`,
      destination: `${destination.latitude},${destination.longitude}`,
      key: Config.googleMapsKey,
      mode: "driving",
      language: "en",
    },
  });

  if (data?.status !== "OK" || !data.routes?.length) {
    throw new Error(data?.error_message || data?.status || "Directions failed");
  }

  const route = data.routes[0];
  const leg = route.legs?.[0];
  return {
    coordinates: decodePolyline(route.overview_polyline.points),
    distanceText: leg?.distance?.text,
    durationText: leg?.duration?.text,
  };
};

/**
 * Fetch every drivable alternative between two points, sorted fastest-first.
 * Powers the route picker bottom sheet so the driver can compare and choose a
 * path. Falls back to a single straight geodesic option if the request fails.
 */
export const getRouteAlternatives = async (
  origin: LocationValue,
  destination: LocationValue,
): Promise<RouteOption[]> => {
  const { data } = await placesApi.get("/directions/json", {
    params: {
      origin: `${origin.latitude},${origin.longitude}`,
      destination: `${destination.latitude},${destination.longitude}`,
      key: Config.googleMapsKey,
      mode: "driving",
      alternatives: true,
      language: "en",
    },
  });

  if (data?.status !== "OK" || !data.routes?.length) {
    throw new Error(data?.error_message || data?.status || "Directions failed");
  }

  const options: RouteOption[] = data.routes.map((route: any, i: number) => {
    const leg = route.legs?.[0];
    const summary: string | undefined = route.summary;
    // Split the summary ("N3 and N8", "A1/A2") into individual via roads.
    const stops = summary
      ? summary
          .split(/\s+and\s+|\/|,/i)
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];
    return {
      id: `route-${i}`,
      coordinates: decodePolyline(route.overview_polyline.points),
      distanceText: leg?.distance?.text,
      durationText: leg?.duration?.text,
      distanceValue: leg?.distance?.value ?? 0,
      durationValue: leg?.duration?.value ?? 0,
      summary,
      stops,
    };
  });

  return options.sort((a, b) => a.durationValue - b.durationValue);
};

/** Decode a Google "encoded polyline" string into lat/lng coordinates. */
export const decodePolyline = (encoded: string): LocationValue[] => {
  const points: LocationValue[] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let result = 1;
    let shift = 0;
    let b: number;
    do {
      b = encoded.charCodeAt(index++) - 63 - 1;
      result += b << shift;
      shift += 5;
    } while (b >= 0x1f);
    lat += result & 1 ? ~(result >> 1) : result >> 1;

    result = 1;
    shift = 0;
    do {
      b = encoded.charCodeAt(index++) - 63 - 1;
      result += b << shift;
      shift += 5;
    } while (b >= 0x1f);
    lng += result & 1 ? ~(result >> 1) : result >> 1;

    points.push({ latitude: lat * 1e-5, longitude: lng * 1e-5, address: "" });
  }

  return points;
};
