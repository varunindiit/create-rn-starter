import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV();

// Get string
export const getStorageValue = (KEY: string): string | null => {
  return storage.getString(KEY) ?? null;
};

// Set string
export const setStorageValue = (KEY: string, value: string) => {
  storage.set(KEY, value);
};

// Get boolean
export const getStorageBoolean = (KEY: string): boolean | undefined => {
  return storage.getBoolean(KEY);
};

// Set boolean
export const setStorageBoolean = (KEY: string, value: boolean) => {
  storage.set(KEY, value);
};

// Clear key
export const clearStorageValue = (KEY: string) => {
  storage.remove(KEY);
};

/** Clear all stored data (e.g. on logout) */
export const clearAllStorage = () => {
  storage.clearAll();
};
