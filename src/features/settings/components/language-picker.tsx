import { MenuView, type MenuAction } from "@expo/ui/community/menu";
import { Pressable, StyleSheet, Text } from "react-native";

import { Icon } from "@/components/ui/icon";
import { useHaptics } from "@/hooks/use-haptics";
import { isSupportedLocale, SUPPORTED_LOCALES } from "@/lib/i18n/i18n";
import { useTranslation } from "@/lib/i18n/use-translation";
import { spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

export function LanguagePicker() {
  const theme = useTheme();
  const haptics = useHaptics();
  const { locale, setLocale, t } = useTranslation();

  const actions: MenuAction[] = SUPPORTED_LOCALES.map((code) => ({
    id: code,
    title: t(`languages.${code}`),
    state: locale === code ? "on" : "off",
  }));

  return (
    <MenuView
      title={t("settings.row_language")}
      actions={actions}
      onPressAction={({ nativeEvent }) => {
        if (isSupportedLocale(nativeEvent.event)) {
          setLocale(nativeEvent.event);
        }
      }}
    >
      <Pressable
        onPress={haptics.lightImpact}
        android_ripple={{ color: theme.surfaceVariant }}
        style={({ pressed }) => [
          styles.row,
          pressed && { backgroundColor: theme.surfaceVariant },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>{t("settings.row_language")}</Text>
        <Text style={[styles.value, { color: theme.textSecondary }]}>
          {t(`languages.${locale}`)}
        </Text>
        <Icon name="forward" size={16} tintColor={theme.textTertiary} />
      </Pressable>
    </MenuView>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 56,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  title: {
    flex: 1,
    fontSize: 17,
  },
  value: {
    fontSize: 15,
  },
});
