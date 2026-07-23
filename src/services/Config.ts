/**
 * Centralised runtime configuration.
 *
 * Replace the placeholder values below with your real endpoints/keys, or wire
 * them up to `.env` variables with a library such as `react-native-config`
 * (see `.env.example` in the project root).
 */
class Config {
  /** Base URL of your REST API. */
  public readonly coreAPI: string;

  /** Google API key — shared with the native Maps SDK (Android manifest / iOS AppDelegate). */
  public readonly googleMapsKey: string;

  constructor() {
    this.coreAPI = "http://localhost:3000/api/v1";
    this.googleMapsKey = "";
  }
}

export default new Config();
