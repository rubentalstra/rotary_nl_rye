/**
 * LoadingState component
 * Displays a loading indicator with optional message
 */

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/core/theme";

interface LoadingStateProps {
  /** Optional message to display */
  message?: string;
  /** Size of the indicator */
  size?: "small" | "large";
}

export function LoadingState({ message, size = "large" }: LoadingStateProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
  },
});
