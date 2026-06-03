import { NativeModules, Platform } from "react-native";

/** Supported app languages. Add a new entry + resource file to scale. */
export type LanguageCode = "en" | "fr";

export interface LanguageOption {
  code: LanguageCode;
  /** Name shown in the user's own language */
  nativeLabel: string;
  /** English name of the language */
  englishLabel: string;
  /** Short subtitle on the selector card */
  region: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  {
    code: "en",
    nativeLabel: "English",
    englishLabel: "English",
    region: "English",
    flag: "🇬🇧",
  },
  {
    code: "fr",
    nativeLabel: "Français",
    englishLabel: "French",
    region: "Français",
    flag: "🇫🇷",
  },
];

export const DEFAULT_LANGUAGE: LanguageCode = "en";

export const SUPPORTED_CODES: LanguageCode[] = LANGUAGES.map((l) => l.code);

export const isSupportedLanguage = (code?: string | null): code is LanguageCode =>
  !!code && SUPPORTED_CODES.includes(code as LanguageCode);

export const getLanguageOption = (code: LanguageCode): LanguageOption =>
  LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];

/**
 * Best-effort device locale detection (no extra native deps). Used only to
 * pre-highlight a choice on the first-launch selector — the user always decides.
 */
export const getDeviceLanguage = (): LanguageCode => {
  let locale = "en";
  try {
    if (Platform.OS === "ios") {
      const settings = NativeModules.SettingsManager?.settings;
      locale =
        settings?.AppleLocale || settings?.AppleLanguages?.[0] || "en";
    } else {
      locale = NativeModules.I18nManager?.localeIdentifier || "en";
    }
  } catch {
    locale = "en";
  }
  return String(locale).toLowerCase().startsWith("fr") ? "fr" : "en";
};
