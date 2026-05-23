import { Stack } from "expo-router";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from "react-native";
import ShareIcon from "@expo/material-symbols/share.xml";

import { SettingsRow } from "@/components/settings/settings-row";
import { useAppVersion } from "@/hooks/use-app-version";
import { useSettingsActions } from "@/features/settings/use-settings-actions";
import { borderRadius, spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

export default function SettingsScreen() {
  const theme = useTheme();
  const { formattedVersion } = useAppVersion();
  const {
    handlePrivacyPolicy,
    handleTermsAndConditions,
    handleContributors,
    handleSocialMedia,
    handleStoreReview,
    handleShareApp,
  } = useSettingsActions();

  const reviewSubtitle =
    Platform.OS === "ios"
      ? "Laat een beoordeling achter in de App Store"
      : "Laat een beoordeling achter in de Google Play Store";

  return (
    <>
      <Stack.Screen options={{ title: "Instellingen", headerLargeTitle: true }} />
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          onPress={handleShareApp}
          accessibilityLabel="Deel de app"
          icon={
            Platform.OS === "ios"
              ? "square.and.arrow.up"
              : (ShareIcon as ImageSourcePropType)
          }
        />
      </Stack.Toolbar>

      <ScrollView
        style={[styles.scroll, { backgroundColor: theme.background }]}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
      >
        <SettingsSection title="Algemeen">
          <SettingsRow
            title="Volg ons op Instagram"
            subtitle="@rotexnederland"
            onPress={handleSocialMedia}
          />
          <Divider />
          <SettingsRow
            title="Beoordeel de App"
            subtitle={reviewSubtitle}
            onPress={handleStoreReview}
          />
        </SettingsSection>

        <SettingsSection title="Ontwikkeling">
          <SettingsRow
            title="Bijdragers"
            subtitle="Bekijk app-bijdragers"
            onPress={handleContributors}
          />
          <Divider />
          <SettingsRow title="App Versie" value={formattedVersion} />
        </SettingsSection>

        <SettingsSection title="Juridisch">
          <SettingsRow title="Privacybeleid" onPress={handlePrivacyPolicy} />
          <Divider />
          <SettingsRow title="Algemene Voorwaarden" onPress={handleTermsAndConditions} />
        </SettingsSection>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Rotary Youth Exchange Netherlands
          </Text>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Gemaakt met liefde voor jonge wereldburgers
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

function SettingsSection({ title, children }: SettingsSectionProps) {
  const theme = useTheme();
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionHeader, { color: theme.textTertiary }]}>
        {title.toUpperCase()}
      </Text>
      <View style={[styles.card, { backgroundColor: theme.surface }]}>{children}</View>
    </View>
  );
}

function Divider() {
  const theme = useTheme();
  return <View style={[styles.divider, { backgroundColor: theme.divider }]} />;
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: {
    paddingTop: spacing.md,
    paddingBottom: Platform.OS === "android" ? 100 : 40,
    gap: spacing.lg,
  },
  section: {
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
    paddingLeft: spacing.sm,
  },
  card: {
    borderRadius: borderRadius.lg,
    overflow: "hidden",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: spacing.lg,
  },
  footer: {
    alignItems: "center",
    marginTop: spacing.xxl,
    gap: 4,
    paddingHorizontal: spacing.lg,
  },
  footerText: {
    fontSize: 14,
    textAlign: "center",
  },
});
