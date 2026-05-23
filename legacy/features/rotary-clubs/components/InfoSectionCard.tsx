/**
 * Info section card for displaying title and content blocks
 */

import { View, Text, StyleSheet, Platform } from "react-native";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import type { InfoSection } from "../types";

interface InfoSectionCardProps {
  section: InfoSection;
}

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 2,
};

export function InfoSectionCard({ section }: InfoSectionCardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>{section.title}</Text>
      <Text style={[styles.content, { color: colors.textSecondary }]}>{section.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: spacing.radiusMd,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...(Platform.OS === "ios"
      ? shadowStyle
      : { elevation: 2, borderWidth: StyleSheet.hairlineWidth }),
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: spacing.sm,
    lineHeight: 24,
  },
  content: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "left",
  },
});
