/**
 * Haptic feedback hook — iOS only (Android haptics differ enough that we just no-op).
 */

import { useCallback } from "react";
import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

interface UseHapticsReturn {
  /** Light impact — selection changes */
  lightImpact: () => void;
  /** Medium impact — button presses */
  mediumImpact: () => void;
  /** Heavy impact — significant actions */
  heavyImpact: () => void;
  /** Selection — picker changes */
  selection: () => void;
  /** Success notification */
  success: () => void;
  /** Warning notification */
  warning: () => void;
  /** Error notification */
  error: () => void;
}

export function useHaptics(): UseHapticsReturn {
  const isIOS = Platform.OS === "ios";

  const lightImpact = useCallback(() => {
    if (isIOS) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [isIOS]);

  const mediumImpact = useCallback(() => {
    if (isIOS) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, [isIOS]);

  const heavyImpact = useCallback(() => {
    if (isIOS) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, [isIOS]);

  const selection = useCallback(() => {
    if (isIOS) Haptics.selectionAsync();
  }, [isIOS]);

  const success = useCallback(() => {
    if (isIOS) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [isIOS]);

  const warning = useCallback(() => {
    if (isIOS) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }, [isIOS]);

  const error = useCallback(() => {
    if (isIOS) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, [isIOS]);

  return { lightImpact, mediumImpact, heavyImpact, selection, success, warning, error };
}
