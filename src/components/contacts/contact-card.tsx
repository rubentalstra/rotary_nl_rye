import { Pressable, StyleSheet, Text, View } from "react-native";

import { NetworkImage } from "@/components/media/network-image";
import { Icon } from "@/components/ui/icon";
import type { Contact } from "@/features/contacts/types";
import { borderRadius, spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

interface ContactCardProps {
  contact: Contact;
  onPress: () => void;
}

export function ContactCard({ contact, onPress }: ContactCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <NetworkImage
        imageUrl={contact.imageUrl}
        name={contact.name}
        size={56}
        expandable={false}
        style={styles.avatar}
      />

      <View style={styles.content}>
        <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
          {contact.name}
        </Text>
        <Text style={[styles.role, { color: theme.textSecondary }]} numberOfLines={1}>
          {contact.role}
        </Text>
        {contact.club ? (
          <Text style={[styles.club, { color: theme.textTertiary }]} numberOfLines={1}>
            {contact.club}
          </Text>
        ) : null}
      </View>

      <View style={styles.actions}>
        {contact.phone ? (
          <View style={[styles.iconBadge, { backgroundColor: `${theme.primary}15` }]}>
            <Icon name="phone" size={16} tintColor={theme.primary} />
          </View>
        ) : null}
        {contact.email ? (
          <View style={[styles.iconBadge, { backgroundColor: `${theme.primary}15` }]}>
            <Icon name="mail" size={16} tintColor={theme.primary} />
          </View>
        ) : null}
      </View>

      <Icon name="forward" size={20} tintColor={theme.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: spacing.sm,
  },
  avatar: { marginRight: spacing.md },
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
  club: { fontSize: 12 },
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
