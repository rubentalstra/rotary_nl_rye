/**
 * Contact card component for displaying a contact in a list
 */

import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import { NetworkImage } from "@/shared/components/media/NetworkImage";
import type { Contact } from "../types";

interface ContactCardProps {
  contact: Contact;
  onPress: () => void;
}

export function ContactCard({ contact, onPress }: ContactCardProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <NetworkImage
        imageUrl={contact.imageUrl}
        name={contact.name}
        size={56}
        style={styles.avatar}
      />

      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {contact.name}
        </Text>
        <Text style={[styles.role, { color: colors.textSecondary }]} numberOfLines={1}>
          {contact.role}
        </Text>
        {contact.club && (
          <Text style={[styles.club, { color: colors.textTertiary }]} numberOfLines={1}>
            {contact.club}
          </Text>
        )}
      </View>

      <View style={styles.actions}>
        {contact.phone && (
          <View style={[styles.iconBadge, { backgroundColor: colors.primary + "15" }]}>
            <Ionicons name="call" size={16} color={colors.primary} />
          </View>
        )}
        {contact.email && (
          <View style={[styles.iconBadge, { backgroundColor: colors.primary + "15" }]}>
            <Ionicons name="mail" size={16} color={colors.primary} />
          </View>
        )}
      </View>

      <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: spacing.radiusMd,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: spacing.sm,
  },
  avatar: {
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
    marginRight: spacing.sm,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  role: {
    fontSize: 14,
    marginBottom: 2,
  },
  club: {
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.xs,
    marginRight: spacing.sm,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
});
