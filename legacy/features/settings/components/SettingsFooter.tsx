/**
 * Settings footer component
 */

import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";

export function SettingsFooter() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        Rotary Youth Exchange Netherlands
      </Text>
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        Gemaakt met ❤️ voor jonge wereldburgers
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 6,
    lineHeight: 20,
  },
});
