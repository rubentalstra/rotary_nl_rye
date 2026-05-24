/**
 * Program card component for navigation
 */

import { Pressable, View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import type { ProgramItem } from "../types";

interface ProgramCardProps {
  program: ProgramItem;
  onPress: () => void;
}

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 2,
};

export function ProgramCard({ program, onPress }: ProgramCardProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        },
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={program.title}
      accessibilityHint="Tap to view details"
    >
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + "15" }]}>
          <FontAwesome5 name={program.icon} size={22} color={colors.primary} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text }]}>{program.title}</Text>
          {program.subtitle && (
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {program.subtitle}
            </Text>
          )}
        </View>
        <Ionicons
          name={Platform.OS === "ios" ? "chevron-forward" : "arrow-forward"}
          size={20}
          color={colors.textTertiary}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: spacing.radiusMd,
    marginBottom: spacing.sm,
    overflow: "hidden",
    ...(Platform.OS === "ios"
      ? shadowStyle
      : { elevation: 2, borderWidth: StyleSheet.hairlineWidth }),
  },
  cardPressed: {
    opacity: Platform.OS === "ios" ? 0.8 : 0.6,
    transform: Platform.OS === "ios" ? [{ scale: 0.98 }] : [],
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    minHeight: 72,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.xs,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
});
