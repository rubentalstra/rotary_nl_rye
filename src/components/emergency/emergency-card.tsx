import { Platform, StyleSheet, Text, View } from "react-native";

import { IconButton } from "@/components/ui/icon-button";
import type { EmergencyContact } from "@/features/emergency/types";
import { useHaptics } from "@/hooks/use-haptics";
import { borderRadius, spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";
import { makePhoneCall, sendEmail } from "@/utils/communications";

interface EmergencyCardProps {
  contact: EmergencyContact;
}

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 4,
};

export function EmergencyCard({ contact }: EmergencyCardProps) {
  const theme = useTheme();
  const { mediumImpact } = useHaptics();

  const handleCall = () => {
    mediumImpact();
    makePhoneCall(contact.phone, contact.name);
  };

  const handleEmail = () => {
    if (contact.email) {
      mediumImpact();
      sendEmail(contact.email, contact.name);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          shadowColor: theme.shadow,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.text }]}>{contact.name}</Text>
        <Text style={[styles.role, { color: theme.textSecondary }]}>{contact.role}</Text>
        <Text style={[styles.phone, { color: theme.accent }]}>{contact.phone}</Text>
      </View>

      <View style={styles.actions}>
        <IconButton
          icon="phone"
          onPress={handleCall}
          size="medium"
          variant="tinted"
          color={theme.primary}
        />
        {contact.email ? (
          <IconButton
            icon="mail"
            onPress={handleEmail}
            size="medium"
            variant="tinted"
            color={theme.primary}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    ...(Platform.OS === "ios"
      ? shadowStyle
      : { elevation: 2, borderWidth: StyleSheet.hairlineWidth }),
  },
  info: { flex: 1 },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
});
