/**
 * ErrorState component
 * Displays an error message with retry option
 */

import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";

interface ErrorStateProps {
  /** Error message to display */
  message?: string;
  /** Callback when retry is pressed */
  onRetry?: () => void;
  /** Whether to show the retry button */
  showRetry?: boolean;
}

export function ErrorState({
  message = "Er is iets misgegaan",
  onRetry,
  showRetry = true,
}: ErrorStateProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
      <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
      {showRetry && onRetry && (
        <Pressable
          style={[styles.retryButton, { backgroundColor: colors.primary }]}
          onPress={onRetry}
        >
          <Ionicons name="refresh" size={20} color={colors.onPrimary} />
          <Text style={[styles.retryText, { color: colors.onPrimary }]}>Opnieuw proberen</Text>
        </Pressable>
      )}
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
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  retryText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
