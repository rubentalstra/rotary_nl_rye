/**
 * Haptic feedback hook
 * Provides haptic feedback for user interactions
 */

import { useCallback } from "react";
import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

interface UseHapticsReturn {
  /** Light impact feedback - for selection changes */
  lightImpact: () => void;
  /** Medium impact feedback - for button presses */
  mediumImpact: () => void;
  /** Heavy impact feedback - for significant actions */
  heavyImpact: () => void;
  /** Selection feedback - for picker changes */
  selection: () => void;
  /** Success notification - for successful actions */
  success: () => void;
  /** Warning notification - for warnings */
  warning: () => void;
  /** Error notification - for errors */
  error: () => void;
}

/**
 * Hook for haptic feedback
 * Only provides feedback on iOS (Android has different haptic APIs)
 */
export function useHaptics(): UseHapticsReturn {
  const isIOS = Platform.OS === "ios";

  const lightImpact = useCallback(() => {
    if (isIOS) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [isIOS]);

  const mediumImpact = useCallback(() => {
    if (isIOS) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, [isIOS]);

  const heavyImpact = useCallback(() => {
    if (isIOS) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }, [isIOS]);

  const selection = useCallback(() => {
    if (isIOS) {
      Haptics.selectionAsync();
    }
  }, [isIOS]);

  const success = useCallback(() => {
    if (isIOS) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [isIOS]);

  const warning = useCallback(() => {
    if (isIOS) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  }, [isIOS]);

  const error = useCallback(() => {
    if (isIOS) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }, [isIOS]);

  return {
    lightImpact,
    mediumImpact,
    heavyImpact,
    selection,
    success,
    warning,
    error,
  };
}
