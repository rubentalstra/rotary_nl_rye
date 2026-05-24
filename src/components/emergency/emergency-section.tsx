import { Platform, StyleSheet, Text, View } from "react-native";

import { EmergencyCard } from "@/components/emergency/emergency-card";
import { Icon } from "@/components/ui/icon";
import type { EmergencySection as EmergencySectionType } from "@/features/emergency/types";
import { spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

interface EmergencySectionProps {
  section: EmergencySectionType;
}

export function EmergencySection({ section }: EmergencySectionProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name={section.icon} size={20} tintColor={theme.primary} />
        <Text style={[styles.title, { color: theme.text }]}>{section.title}</Text>
      </View>

      {section.description ? (
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          {section.description}
        </Text>
      ) : null}

      {section.contacts.map((contact) => (
        <EmergencyCard key={contact.id} contact={contact} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  title: {
    fontSize: Platform.OS === "ios" ? 22 : 18,
    fontWeight: Platform.OS === "ios" ? "700" : "600",
  },
  description: {
    fontSize: 14,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
});
