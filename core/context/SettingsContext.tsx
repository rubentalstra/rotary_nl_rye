import { createContext, use, useState, useEffect, useCallback, type ReactNode } from "react";
import { File, Directory, Paths } from "expo-file-system";

interface SettingsContextValue {
  // App review state
  hasRequestedReview: boolean;
  appOpenCount: number;

  // Actions
  incrementAppOpen: () => Promise<void>;
  setReviewRequested: () => Promise<void>;

  // Settings state
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

// Settings storage using file-based approach
const SETTINGS_DIR = new Directory(Paths.document, "settings");
const SETTINGS_FILE = new File(SETTINGS_DIR, "app-settings.json");

interface SettingsData {
  hasRequestedReview: boolean;
  appOpenCount: number;
}

function ensureSettingsDir(): void {
  try {
    if (!SETTINGS_DIR.exists) {
      SETTINGS_DIR.create();
    }
  } catch {
    // Directory might already exist
  }
}

async function loadSettingsData(): Promise<SettingsData | null> {
  try {
    if (!SETTINGS_FILE.exists) {
      return null;
    }
    const content = await SETTINGS_FILE.text();
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function saveSettingsData(data: SettingsData): void {
  try {
    ensureSettingsDir();
    SETTINGS_FILE.write(JSON.stringify(data));
  } catch {
    // Ignore errors
  }
}

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [hasRequestedReview, setHasRequestedReview] = useState(false);
  const [appOpenCount, setAppOpenCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await loadSettingsData();
        if (data) {
          setHasRequestedReview(data.hasRequestedReview);
          setAppOpenCount(data.appOpenCount);
        }
      } catch {
        // Ignore errors, use default values
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const incrementAppOpen = useCallback(async () => {
    const newCount = appOpenCount + 1;
    setAppOpenCount(newCount);
    try {
      saveSettingsData({
        hasRequestedReview,
        appOpenCount: newCount,
      });
    } catch {
      // Ignore storage errors
    }
  }, [appOpenCount, hasRequestedReview]);

  const setReviewRequested = useCallback(async () => {
    setHasRequestedReview(true);
    try {
      saveSettingsData({
        hasRequestedReview: true,
        appOpenCount,
      });
    } catch {
      // Ignore storage errors
    }
  }, [appOpenCount]);

  return (
    <SettingsContext
      value={{
        hasRequestedReview,
        appOpenCount,
        incrementAppOpen,
        setReviewRequested,
        isLoading,
      }}
    >
      {children}
    </SettingsContext>
  );
}

export function useSettings(): SettingsContextValue {
  const context = use(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
}
