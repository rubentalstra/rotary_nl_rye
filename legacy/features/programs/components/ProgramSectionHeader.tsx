/**
 * Program section header component
 */

import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";

interface ProgramSectionHeaderProps {
  title: string;
}

export function ProgramSectionHeader({ title }: ProgramSectionHeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.primary }]}>{title}</Text>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  divider: {
    height: 2,
    borderRadius: 1,
  },
});
