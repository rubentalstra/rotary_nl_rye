/**
 * Use settings actions hook
 */

import { useCallback } from "react";
import { Alert, Linking, Platform } from "react-native";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import * as StoreReview from "expo-store-review";

export function useSettingsActions() {
  const triggerHaptic = useCallback(async () => {
    if (Platform.OS === "ios") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, []);

  const openUrl = useCallback(
    async (url: string, errorMessage: string = "Kan link niet openen") => {
      await triggerHaptic();
      try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert("Fout", errorMessage);
        }
      } catch {
        Alert.alert("Fout", errorMessage);
      }
    },
    [triggerHaptic],
  );

  const handlePrivacyPolicy = useCallback(() => {
    openUrl(
      "https://www.rotary.nl/yep/yep-app/privacy-policy.html",
      "Kan privacybeleid link niet openen",
    );
  }, [openUrl]);

  const handleTermsAndConditions = useCallback(() => {
    openUrl(
      "https://www.rotary.nl/yep/yep-app/terms-and-conditions.html",
      "Kan algemene voorwaarden link niet openen",
    );
  }, [openUrl]);

  const handleContributors = useCallback(async () => {
    if (Platform.OS === "ios") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push("/settings/contributors");
  }, []);

  const handleSocialMedia = useCallback(() => {
    openUrl("https://www.instagram.com/rotexnederland/", "Kan Instagram link niet openen");
  }, [openUrl]);

  const handleStoreReview = useCallback(async () => {
    await triggerHaptic();

    const isAvailable = await StoreReview.hasAction();
    if (isAvailable) {
      await StoreReview.requestReview();
    } else {
      const storeUrl = StoreReview.storeUrl();
      if (storeUrl) {
        const supported = await Linking.canOpenURL(storeUrl);
        if (supported) {
          await Linking.openURL(storeUrl);
        } else {
          Alert.alert("Fout", "Kan winkel niet openen");
        }
      } else {
        Alert.alert("Niet beschikbaar", "Winkelbeoordeling is niet beschikbaar op dit apparaat.");
      }
    }
  }, [triggerHaptic]);

  return {
    handlePrivacyPolicy,
    handleTermsAndConditions,
    handleContributors,
    handleSocialMedia,
    handleStoreReview,
  };
}
