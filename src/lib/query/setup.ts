import { AppState, type AppStateStatus, Platform } from "react-native";
import { focusManager } from "@tanstack/react-query";

/**
 * TanStack Query focus manager for React Native.
 * Re-fetches stale queries when the app returns to the foreground.
 */
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const subscription = AppState.addEventListener("change", onAppStateChange);

// Export for cleanup if needed
export { subscription };
