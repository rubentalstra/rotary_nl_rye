import { Platform, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/ui/icon";
import { borderRadius, spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

export function ImportantNote() {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${theme.warning}10`,
          shadowColor: theme.shadow,
          borderLeftColor: theme.warning,
        },
      ]}
    >
      <View style={styles.header}>
        <Icon name="info" size={24} tintColor={theme.warning} />
        <Text style={[styles.title, { color: theme.text }]}>Important Reminder</Text>
      </View>
      <Text style={[styles.text, { color: theme.textSecondary }]}>
        Always keep your host family&apos;s contact information and home address accessible.
      </Text>
      <Text style={[styles.text, { color: theme.textSecondary }]}>
        Your host parents can assist you with medical appointments, hospital visits, or dental care.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.sm,
    borderLeftWidth: 4,
    ...(Platform.OS === "ios"
      ? { shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }
      : { elevation: 1 }),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.sm,
  },
});
