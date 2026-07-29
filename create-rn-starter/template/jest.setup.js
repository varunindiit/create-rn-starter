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

// NetInfo has no native side in the test environment; report a healthy
// connection so the offline banner does not appear in every snapshot.
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(() => jest.fn()),
  fetch: jest.fn(() =>
    Promise.resolve({isConnected: true, isInternetReachable: true}),
  ),
}));

// crns:if imagePicker
// Image picker is a TurboModule with no JS fallback. Resolve with a fake image
// so a test can assert what happens *after* a pick without touching a camera.
jest.mock('react-native-image-crop-picker', () => ({
  __esModule: true,
  default: {
    openCamera: jest.fn(() =>
      Promise.resolve({path: 'file:///tmp/camera.jpg', mime: 'image/jpeg'}),
    ),
    openPicker: jest.fn(() =>
      Promise.resolve({path: 'file:///tmp/gallery.jpg', mime: 'image/jpeg'}),
    ),
    clean: jest.fn(() => Promise.resolve()),
  },
}));
// crns:endif

// SafeAreaProvider measures the native window before rendering children, so in
// Jest it renders nothing at all. The shipped mock supplies static insets.
jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);
