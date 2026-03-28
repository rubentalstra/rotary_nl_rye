/**
 * Section component for Android
 * Native Android implementation with Material Design styling
 */

import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import type { SectionProps } from "./types";

export function Section({ title, footer, children }: SectionProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {title && <Text style={[styles.title, { color: colors.textSecondary }]}>{title}</Text>}
      <View style={[styles.content, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {children}
      </View>
      {footer && <Text style={[styles.footer, { color: colors.textSecondary }]}>{footer}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.md,
  },
  content: {
    borderRadius: spacing.radiusMd,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
  footer: {
    fontSize: 13,
    marginTop: spacing.xs,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
});
