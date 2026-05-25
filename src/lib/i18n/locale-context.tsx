import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";

import {
  DEFAULT_LOCALE,
  i18n,
  isSupportedLocale,
  type Locale,
  type TFunction,
} from "@/lib/i18n/i18n";

const STORAGE_KEY = "app:locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => Promise<void>;
  t: TFunction;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function detectInitialLocale(): Locale {
  const deviceCode = getLocales()[0]?.languageCode;
  return isSupportedLocale(deviceCode) ? deviceCode : DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let next: Locale;
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        next = isSupportedLocale(stored) ? stored : detectInitialLocale();
      } catch {
        next = detectInitialLocale();
      }
      if (cancelled) return;
      i18n.locale = next;
      setLocaleState(next);
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setLocale = useCallback(async (next: Locale) => {
    i18n.locale = next;
    setLocaleState(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Persistence failure is non-fatal — in-memory locale still applied.
    }
  }, []);

  const t = useCallback<TFunction>(
    (key, options) => i18n.t(key, { locale, ...options }),
    [locale],
  );

  if (!ready) return null;

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
  );
}

export function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocaleContext must be used inside <LocaleProvider>");
  }
  return ctx;
}
