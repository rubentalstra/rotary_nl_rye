/**
 * Contact section component for grouping contacts by category
 */

import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import { ContactCard } from "./ContactCard";
import type { Contact, ContactSection as ContactSectionType } from "../types";

interface ContactSectionProps {
  section: ContactSectionType;
  onContactPress: (contact: Contact) => void;
}

export function ContactSection({ section, onContactPress }: ContactSectionProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{section.title}</Text>
        {section.description && (
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {section.description}
          </Text>
        )}
        <Text style={[styles.count, { color: colors.textTertiary }]}>
          {section.contacts.length} {section.contacts.length === 1 ? "contact" : "contacts"}
        </Text>
      </View>

      <View style={styles.list}>
        {section.contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} onPress={() => onContactPress(contact)} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  count: {
    fontSize: 12,
    fontWeight: "500",
  },
  list: {
    gap: spacing.xs,
  },
});
