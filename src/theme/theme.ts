import {ColorScheme, lightColors} from './palettes';

/**
 * Static colour access.
 *
 * Prefer `useTheme()` inside components — it follows the active light/dark
 * scheme. `COLORS`/`THEME` resolve to the light palette and exist for the
 * places a hook cannot reach: navigator `screenOptions` defaults, module-level
 * constants, and non-React helpers.
 */
export const COLORS = lightColors;

export const THEME = COLORS;

export type ThemeType = ColorScheme;

export type {ColorScheme, ThemeMode, ResolvedScheme} from './palettes';
export {lightColors, darkColors, PALETTES} from './palettes';
