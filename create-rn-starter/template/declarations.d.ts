declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

/**
 * Values inlined from `.env` at build time by `react-native-dotenv`.
 *
 * Every key is optional: a `.env` missing a line yields `undefined` rather than
 * a build error, so `src/services/Config.ts` is where defaults and validation
 * live. Add a key here whenever you add one to `.env.example`.
 */
declare module '@env' {
  export const APP_ENV: string | undefined;
  export const REACT_APP_API: string | undefined;
  export const GOOGLE_MAPS_KEY: string | undefined;
  export const SENTRY_DSN: string | undefined;
  export const ENABLE_API_LOGGING: string | undefined;
}
