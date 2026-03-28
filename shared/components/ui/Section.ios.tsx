/**
 * Section component for iOS
 * Uses SwiftUI List component from @expo/ui for native iOS styling
 */

import { View, Text, StyleSheet } from "react-native";
import { Host, List } from "@expo/ui/swift-ui";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import type { SectionProps } from "./types";

export function Section({ title, footer, children }: SectionProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {title && <Text style={[styles.title, { color: colors.textSecondary }]}>{title}</Text>}
      <Host style={styles.host}>
        <List>{children}</List>
      </Host>
      {footer && <Text style={[styles.footer, { color: colors.textSecondary }]}>{footer}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  host: {
    minHeight: 44,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.md,
  },
  footer: {
    fontSize: 13,
    marginTop: spacing.xs,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
});
