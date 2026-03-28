/**
 * Important note component for emergency screen
 */

import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";

export function ImportantNote() {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${colors.warning}10`,
          shadowColor: colors.shadow,
          borderLeftColor: colors.warning,
        },
      ]}
    >
      <View style={styles.header}>
        <Ionicons name="information-circle" size={24} color={colors.warning} />
        <Text style={[styles.title, { color: colors.text }]}>Important Reminder</Text>
      </View>
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        Always keep your host family&apos;s contact information and home address accessible.
      </Text>
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        Your host parents can assist you with medical appointments, hospital visits, or dental care.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: spacing.radiusLg,
    padding: spacing.lg,
    marginTop: spacing.sm,
    borderLeftWidth: 4,
    ...(Platform.OS === "ios"
      ? {
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }
      : { elevation: 1 }),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: spacing.sm,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.sm,
  },
});
