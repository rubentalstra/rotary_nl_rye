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
import { LanguagePicker } from "@/features/settings/components/language-picker";
import { useSettingsActions } from "@/features/settings/use-settings-actions";
import { useAppVersion } from "@/hooks/use-app-version";
import { useTranslation } from "@/lib/i18n/use-translation";
import { borderRadius, spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

export default function SettingsScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
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
      ? t("settings.row_review_subtitle_ios")
      : t("settings.row_review_subtitle_android");

  return (
    <>
      <Stack.Screen options={{ title: t("settings.title"), headerLargeTitleEnabled: true }} />
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          onPress={handleShareApp}
          accessibilityLabel={t("settings.share")}
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
        <SettingsSection title={t("settings.section_general")}>
          <SettingsRow
            title={t("settings.row_instagram")}
            subtitle={t("settings.row_instagram_subtitle")}
            onPress={handleSocialMedia}
          />
          <Divider />
          <SettingsRow
            title={t("settings.row_review")}
            subtitle={reviewSubtitle}
            onPress={handleStoreReview}
          />
        </SettingsSection>

        <SettingsSection title={t("settings.section_preferences")}>
          <LanguagePicker />
        </SettingsSection>

        <SettingsSection title={t("settings.section_development")}>
          <SettingsRow
            title={t("settings.row_contributors")}
            subtitle={t("settings.row_contributors_subtitle")}
            onPress={handleContributors}
          />
          <Divider />
          <SettingsRow title={t("settings.row_version")} value={formattedVersion} />
        </SettingsSection>

        <SettingsSection title={t("settings.section_legal")}>
          <SettingsRow title={t("settings.row_privacy")} onPress={handlePrivacyPolicy} />
          <Divider />
          <SettingsRow title={t("settings.row_terms")} onPress={handleTermsAndConditions} />
        </SettingsSection>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            {t("settings.footer_org")}
          </Text>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            {t("settings.footer_tagline")}
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
