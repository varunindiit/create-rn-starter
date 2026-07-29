import {createMMKV} from 'react-native-mmkv';
import {SESSION_KEYS} from '../utils/constants';

export const storage = createMMKV();

/** Read a string, or null when unset. */
export const getStorageValue = (key: string): string | null =>
  storage.getString(key) ?? null;

export const setStorageValue = (key: string, value: string) => {
  storage.set(key, value);
};

export const getStorageBoolean = (key: string): boolean | undefined =>
  storage.getBoolean(key);

export const setStorageBoolean = (key: string, value: boolean) => {
  storage.set(key, value);
};

/** Remove a single key. */
export const clearStorageValue = (key: string) => {
  storage.remove(key);
};

/**
 * Read and parse a JSON value, returning `fallback` when the key is unset or
 * the stored text is not valid JSON (which happens after a shape migration).
 */
export const getStorageObject = <T>(key: string, fallback: T): T => {
  const raw = storage.getString(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export const setStorageObject = (key: string, value: unknown) => {
  storage.set(key, JSON.stringify(value));
};

/**
 * Drop every session-scoped key on logout.
 *
 * Deliberately narrower than `clearAllStorage`: the user's language and theme
 * are device preferences that should survive signing out. Add new session keys
 * to `SESSION_KEYS` and they get cleared here automatically.
 */
export const clearSession = () => {
  for (const key of SESSION_KEYS) storage.remove(key);
};

/** Wipe everything — account deletion, "reset app", or a failed migration. */
export const clearAllStorage = () => {
  storage.clearAll();
};
