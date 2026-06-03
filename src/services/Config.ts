// import {
//   REACT_APP_API,
//   REACT_APP_DOMAIN,
//   REACT_APP_SOCKET,
//   STRIPE_PUBLISHED_KEY,
// } from '@env';

class Config {
  public readonly coreAPI: string;

  /** Google API key — shared with the native Maps SDK (Android manifest / iOS AppDelegate). */
  public readonly googleMapsKey: string;

  // public readonly domain: string;
  // public readonly socketAPI: string;

  // public readonly releaseVersion: string | undefined;

  // public readonly releaseVersionNumber: string | undefined;
  // public readonly stripePublishableKey: string;

  constructor() {
    // @ts-ignore
    this.coreAPI = "http://13.134.217.35/api/v1";
    this.googleMapsKey = "AIzaSyBHQWCrTWJIMYz04ZN43VyZ9xv6agXnuyk";
    // this.coreAPI = "REACT_APP_API";
    // this.domain = REACT_APP_DOMAIN;
    // this.socketAPI = REACT_APP_SOCKET;
    // this.stripePublishableKey = STRIPE_PUBLISHED_KEY;
  }

  // public getRelease() {
  //   return `App Version @${this.releaseVersionNumber}`;
  // }
}

export default new Config();
