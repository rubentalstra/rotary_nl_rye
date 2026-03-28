/**
 * Settings Screen
 * App settings and information
 */

import { ScrollView, StyleSheet, View, Platform } from "react-native";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import {
  SettingsSection,
  SettingsItem,
  SettingsFooter,
  useSettingsActions,
  useAppVersion,
} from "@/features/settings";

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { formattedVersion } = useAppVersion();
  const {
    handlePrivacyPolicy,
    handleTermsAndConditions,
    handleContributors,
    handleSocialMedia,
    handleStoreReview,
  } = useSettingsActions();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      automaticallyAdjustContentInsets={true}
    >
      <View style={styles.content}>
        <SettingsSection title="Algemeen">
          <SettingsItem
            title="Volg ons op Instagram"
            subtitle="@rotexnederland"
            onPress={handleSocialMedia}
          />
          <SettingsItem
            title="Beoordeel de App"
            subtitle={
              Platform.OS === "ios"
                ? "Laat een beoordeling achter in de App Store"
                : "Laat een beoordeling achter in de Google Play Store"
            }
            onPress={handleStoreReview}
          />
        </SettingsSection>

        <SettingsSection title="Ontwikkeling">
          <SettingsItem
            title="Bijdragers"
            subtitle="Bekijk app-bijdragers"
            onPress={handleContributors}
          />
          <SettingsItem title="App Versie" subtitle={formattedVersion} />
        </SettingsSection>

        <SettingsSection title="Juridisch">
          <SettingsItem title="Privacybeleid" onPress={handlePrivacyPolicy} />
          <SettingsItem title="Algemene Voorwaarden" onPress={handleTermsAndConditions} />
        </SettingsSection>

        <SettingsFooter />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Platform.OS === "ios" ? spacing.md : spacing.sm,
    paddingTop: Platform.OS === "ios" ? spacing.sm : spacing.sm,
    paddingBottom: Platform.OS === "android" ? 100 : 40,
  },
});
