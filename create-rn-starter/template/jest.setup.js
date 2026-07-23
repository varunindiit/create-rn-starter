/**
 * Jest mocks for native modules that have no JS fallback in the test
 * environment (TurboModules / Nitro modules are unavailable under Jest).
 */

jest.mock('react-native-splash-view', () => ({
  showSplash: jest.fn(),
  hideSplash: jest.fn(),
}));

// In-memory stand-in for MMKV (Nitro module).
jest.mock('react-native-mmkv', () => {
  const stores = new Map();
  const createMMKV = () => {
    const data = new Map();
    return {
      set: (key, value) => data.set(key, value),
      getString: key => {
        const v = data.get(key);
        return typeof v === 'string' ? v : undefined;
      },
      getBoolean: key => {
        const v = data.get(key);
        return typeof v === 'boolean' ? v : undefined;
      },
      getNumber: key => {
        const v = data.get(key);
        return typeof v === 'number' ? v : undefined;
      },
      contains: key => data.has(key),
      remove: key => data.delete(key),
      delete: key => data.delete(key),
      clearAll: () => data.clear(),
      getAllKeys: () => [...data.keys()],
    };
  };
  return { createMMKV, MMKV: jest.fn(createMMKV), stores };
});

jest.mock('react-native-keyboard-controller', () =>
  require('react-native-keyboard-controller/jest'),
);
