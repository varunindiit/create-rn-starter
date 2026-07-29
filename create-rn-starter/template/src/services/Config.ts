import {
  APP_ENV,
  ENABLE_API_LOGGING,
  GOOGLE_MAPS_KEY,
  REACT_APP_API,
  SENTRY_DSN,
} from '@env';
import {REQUEST_TIMEOUT_MS} from '../utils/constants';

/**
 * Centralised runtime configuration.
 *
 * Values come from `.env` via `react-native-dotenv`, which inlines them at
 * build time — there is no native module and nothing to configure in Xcode or
 * Gradle. Edit `.env` (created for you from `.env.example`), then restart Metro
 * with `--reset-cache` so Babel re-inlines the new values.
 *
 * Never put a real secret here. Anything bundled into a mobile app is readable
 * by anyone who downloads it; keys that must stay secret belong behind your API.
 */

const bool = (value: string | undefined, fallback = false): boolean => {
  if (value === undefined || value === '') return fallback;
  return value === 'true' || value === '1';
};

const str = (value: string | undefined, fallback = ''): string =>
  value === undefined || value === '' ? fallback : value;

export type AppEnvironment = 'development' | 'staging' | 'production';

const environment = ((): AppEnvironment => {
  const raw = str(APP_ENV, __DEV__ ? 'development' : 'production');
  return raw === 'staging' || raw === 'production' ? raw : 'development';
})();

class Config {
  /** Base URL of your REST API. */
  public readonly coreAPI: string = str(
    REACT_APP_API,
    'http://localhost:3000/api/v1',
  );

  /** Google API key, if you add Maps/Places to the app. */
  public readonly googleMapsKey: string = str(GOOGLE_MAPS_KEY);

  /** Crash reporting DSN — empty disables reporting. */
  public readonly sentryDsn: string = str(SENTRY_DSN);

  /** Which environment this build points at. */
  public readonly environment: AppEnvironment = environment;

  public readonly isProduction: boolean = environment === 'production';

  /** Log every request/response. Defaults on in dev, off everywhere else. */
  public readonly enableApiLogging: boolean = bool(
    ENABLE_API_LOGGING,
    __DEV__ === true,
  );

  /** Network timeout applied to every API call. */
  public readonly requestTimeoutMs: number = REQUEST_TIMEOUT_MS;

  /**
   * Warn in development when a required value is missing, rather than letting
   * requests silently go to localhost from a staging build.
   */
  public assertValid(): void {
    if (!__DEV__) return;
    if (!this.coreAPI) {
      console.warn(
        '[Config] REACT_APP_API is empty — set it in .env and restart Metro with --reset-cache.',
      );
    }
  }
}

const config = new Config();
config.assertValid();

export default config;
