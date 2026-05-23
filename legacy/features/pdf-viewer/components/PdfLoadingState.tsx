/**
 * PDF loading state component
 */

import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";

export function PdfLoadingState() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.link} />
      <Text style={[styles.text, { color: colors.textSecondary }]}>Loading PDF...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: spacing.md,
  },
});
