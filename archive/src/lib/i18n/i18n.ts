import { I18n, type TranslateOptions } from "i18n-js";

import en from "./locales/en.json";
import nl from "./locales/nl.json";

export const SUPPORTED_LOCALES = ["nl", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "nl";

export const i18n = new I18n({ nl, en });
i18n.enableFallback = true;
i18n.defaultLocale = DEFAULT_LOCALE;
i18n.locale = DEFAULT_LOCALE;

export function isSupportedLocale(value: unknown): value is Locale {
  return typeof value === "string" && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export type TFunction = (key: string, options?: TranslateOptions) => string;
