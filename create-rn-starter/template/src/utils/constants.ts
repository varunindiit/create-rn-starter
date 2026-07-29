/**
 * Persistence keys (MMKV).
 *
 * Keep every key in this one file — a stray string literal in a component is
 * how a "why is the user still logged in" bug starts. `SESSION_KEYS` is what
 * logout clears, so a new session-scoped key only has to be added in one place.
 */
export const IS_LOGGED_IN = 'isLoggedIn';
export const TOKEN_KEY = 'authToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';
export const LANGUAGE_KEY = 'appLanguage';
export const LANGUAGE_SELECTED_KEY = 'languageSelected';
export const THEME_MODE_KEY = 'themeMode';

/**
 * Everything belonging to a signed-in session, cleared on logout. Deliberately
 * excludes language and theme, which are device preferences the user expects
 * to survive signing out.
 */
export const SESSION_KEYS = [
  IS_LOGGED_IN,
  TOKEN_KEY,
  REFRESH_TOKEN_KEY,
] as const;

/** Default network timeout for API requests, in milliseconds. */
export const REQUEST_TIMEOUT_MS = 20000;
