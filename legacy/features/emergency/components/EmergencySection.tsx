/**
 * Emergency section component for grouping contacts
 */

import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import { EmergencyCard } from "./EmergencyCard";
import type { EmergencySection as EmergencySectionType } from "../types";

interface EmergencySectionProps {
  section: EmergencySectionType;
}

export function EmergencySection({ section }: EmergencySectionProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name={section.icon as any} size={20} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>{section.title}</Text>
      </View>

      {section.description && (
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {section.description}
        </Text>
      )}

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
  },
  title: {
    fontSize: Platform.OS === "ios" ? 22 : 18,
    fontWeight: Platform.OS === "ios" ? "700" : "600",
    marginLeft: spacing.sm,
  },
  description: {
    fontSize: 14,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
});
