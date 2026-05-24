import { useCallback } from "react";
import { Alert, Linking, Platform, Share } from "react-native";
import * as StoreReview from "expo-store-review";
import { router } from "expo-router";

import { useHaptics } from "@/hooks/use-haptics";

const PRIVACY_POLICY_URL = "https://www.rotary.nl/yep/yep-app/privacy-policy.html";
const TERMS_URL = "https://www.rotary.nl/yep/yep-app/terms-and-conditions.html";
const INSTAGRAM_URL = "https://www.instagram.com/rotexnederland/";
const APP_STORE_URL = "https://apps.apple.com/nl/app/rotary-youth-exchange-nl/id1567096118";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.caelitechnologies.rotary_nl_rye";

export function useSettingsActions() {
  const haptics = useHaptics();

  const openUrl = useCallback(
    async (url: string, errorMessage: string) => {
      haptics.lightImpact();
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
    [haptics],
  );

  const handlePrivacyPolicy = useCallback(
    () => openUrl(PRIVACY_POLICY_URL, "Kan privacybeleid link niet openen"),
    [openUrl],
  );

  const handleTermsAndConditions = useCallback(
    () => openUrl(TERMS_URL, "Kan algemene voorwaarden link niet openen"),
    [openUrl],
  );

  const handleContributors = useCallback(() => {
    haptics.mediumImpact();
    router.push("/settings/contributors");
  }, [haptics]);

  const handleSocialMedia = useCallback(
    () => openUrl(INSTAGRAM_URL, "Kan Instagram link niet openen"),
    [openUrl],
  );

  const handleStoreReview = useCallback(async () => {
    haptics.lightImpact();

    const isAvailable = await StoreReview.hasAction();
    if (isAvailable) {
      await StoreReview.requestReview();
      return;
    }

    const storeUrl = StoreReview.storeUrl();
    if (!storeUrl) {
      Alert.alert("Niet beschikbaar", "Winkelbeoordeling is niet beschikbaar op dit apparaat.");
      return;
    }

    try {
      const supported = await Linking.canOpenURL(storeUrl);
      if (supported) {
        await Linking.openURL(storeUrl);
      } else {
        Alert.alert("Fout", "Kan winkel niet openen");
      }
    } catch {
      Alert.alert("Fout", "Kan winkel niet openen");
    }
  }, [haptics]);

  const handleShareApp = useCallback(async () => {
    haptics.lightImpact();
    const url = Platform.OS === "ios" ? APP_STORE_URL : PLAY_STORE_URL;
    try {
      await Share.share({
        message: `Bekijk de Rotary Youth Exchange NL app: ${url}`,
        url,
        title: "Rotary YEP NL",
      });
    } catch {
      Alert.alert("Fout", "Kan deel-actie niet uitvoeren");
    }
  }, [haptics]);

  return {
    handlePrivacyPolicy,
    handleTermsAndConditions,
    handleContributors,
    handleSocialMedia,
    handleStoreReview,
    handleShareApp,
  };
}
