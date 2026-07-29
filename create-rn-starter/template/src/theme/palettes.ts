/**
 * Colour palettes.
 *
 * Both schemes declare exactly the same keys — `ColorScheme` is derived from
 * the light palette, so adding a token to one and forgetting the other is a
 * compile error rather than an `undefined` colour at runtime.
 *
 * The palette is deliberately brand-neutral: a starter should be a starting
 * point, not somebody else's identity. Change these values (and nothing else)
 * to rebrand the whole app.
 */

export const lightColors = {
  // Brand
  primary: '#4F46E5',
  primaryDark: '#3730A3',
  primaryLight: '#E0E7FF',
  primaryFaint: '#F5F3FF',

  // Backgrounds
  background: '#FFFFFF',
  backgroundAlt: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceMuted: '#F1F5F9',
  overlay: 'rgba(15, 23, 42, 0.45)',
  backdrop: '#000000',

  // Text
  text: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  textPlaceholder: '#CBD5E1',
  textOnPrimary: '#FFFFFF',

  // Borders / lines
  border: '#E2E8F0',
  divider: '#EEF2F6',
  inputBorder: '#E2E8F0',

  // Status
  success: '#15803D',
  successLight: '#DCFCE7',
  warning: '#B45309',
  warningLight: '#FEF3C7',
  danger: '#DC2626',
  dangerLight: '#FEE2E2',
  info: '#1D4ED8',
  infoLight: '#DBEAFE',

  // Misc
  star: '#F59E0B',
  unselectedStar: '#E2E8F0',
  shadow: '#0F172A',
  skeleton: '#E2E8F0',

  // Components
  tabBg: '#FFFFFF',
  toggleTrack: '#CBD5E1',
  toggleThumb: '#FFFFFF',
  gradientFrom: '#EEF2FF',
  gradientTo: '#FFFFFF',
} as const;

/** The token contract every scheme must satisfy. */
export type ColorScheme = {[K in keyof typeof lightColors]: string};

export const darkColors: ColorScheme = {
  // Brand — lifted for contrast against dark surfaces.
  primary: '#818CF8',
  primaryDark: '#A5B4FC',
  primaryLight: '#312E81',
  primaryFaint: '#1E1B4B',

  // Backgrounds
  background: '#0B1120',
  backgroundAlt: '#111827',
  surface: '#1E293B',
  surfaceMuted: '#243044',
  overlay: 'rgba(0, 0, 0, 0.6)',
  backdrop: '#000000',

  // Text
  text: '#F1F5F9',
  textSecondary: '#CBD5E1',
  textMuted: '#94A3B8',
  textPlaceholder: '#64748B',
  textOnPrimary: '#0B1120',

  // Borders / lines
  border: '#334155',
  divider: '#1F2937',
  inputBorder: '#334155',

  // Status — light/dark pairs swap roles so text stays legible.
  success: '#4ADE80',
  successLight: '#14532D',
  warning: '#FBBF24',
  warningLight: '#452C03',
  danger: '#F87171',
  dangerLight: '#4C1D1D',
  info: '#60A5FA',
  infoLight: '#1E3A8A',

  // Misc
  star: '#FBBF24',
  unselectedStar: '#334155',
  shadow: '#000000',
  skeleton: '#334155',

  // Components
  tabBg: '#111827',
  toggleTrack: '#475569',
  toggleThumb: '#F1F5F9',
  gradientFrom: '#1E1B4B',
  gradientTo: '#0B1120',
};

export const PALETTES = {light: lightColors, dark: darkColors} as const;

/** How the app decides which palette to use. */
export type ThemeMode = 'system' | 'light' | 'dark';

/** The concrete scheme in effect once `system` has been resolved. */
export type ResolvedScheme = 'light' | 'dark';
