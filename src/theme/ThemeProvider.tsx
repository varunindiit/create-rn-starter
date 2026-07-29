import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useColorScheme} from 'react-native';
import {storage} from '../services/storage';
import {THEME_MODE_KEY} from '../utils/constants';
import {
  ColorScheme,
  PALETTES,
  ResolvedScheme,
  ThemeMode,
  lightColors,
} from './palettes';

interface ThemeContextValue {
  /** The active palette — read colours from here, never from a module import. */
  colors: ColorScheme;
  /** What the user chose: follow the OS, or a fixed scheme. */
  mode: ThemeMode;
  /** What `mode` resolves to right now. */
  scheme: ResolvedScheme;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
  /** Cycle light → dark → system, for a single toggle control. */
  toggleTheme: () => void;
}

const isThemeMode = (value: unknown): value is ThemeMode =>
  value === 'system' || value === 'light' || value === 'dark';

const readStoredMode = (): ThemeMode => {
  const saved = storage.getString(THEME_MODE_KEY);
  return isThemeMode(saved) ? saved : 'system';
};

/**
 * Default value keeps `useTheme()` usable outside a provider — in a unit test
 * that renders one component in isolation, for example — instead of throwing.
 */
const ThemeContext = createContext<ThemeContextValue>({
  colors: lightColors,
  mode: 'system',
  scheme: 'light',
  isDark: false,
  setMode: () => {},
  toggleTheme: () => {},
});

const MODE_CYCLE: ThemeMode[] = ['light', 'dark', 'system'];

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>(readStoredMode);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    storage.set(THEME_MODE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setModeState(current => {
      const next = MODE_CYCLE[(MODE_CYCLE.indexOf(current) + 1) % MODE_CYCLE.length];
      storage.set(THEME_MODE_KEY, next);
      return next;
    });
  }, []);

  // Keep the persisted value authoritative if another part of the app writes it.
  useEffect(() => {
    const stored = readStoredMode();
    if (stored !== mode) setModeState(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scheme: ResolvedScheme =
    mode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : mode;

  const value = useMemo<ThemeContextValue>(
    () => ({
      colors: PALETTES[scheme],
      mode,
      scheme,
      isDark: scheme === 'dark',
      setMode,
      toggleTheme,
    }),
    [scheme, mode, setMode, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/** Read the active palette and theme controls. */
export const useTheme = () => useContext(ThemeContext);

/**
 * Build a `StyleSheet`-shaped object from the active palette, memoised per
 * scheme so the styles are not recreated on every render:
 *
 *   const styles = useThemedStyles(c => ({ box: { backgroundColor: c.surface } }));
 */
export function useThemedStyles<T>(factory: (colors: ColorScheme) => T): T {
  const {colors} = useTheme();
  return useMemo(() => factory(colors), [colors, factory]);
}

export default ThemeProvider;
