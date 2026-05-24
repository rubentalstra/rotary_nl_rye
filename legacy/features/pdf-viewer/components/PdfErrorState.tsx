/**
 * PDF error state component
 */

import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";

interface PdfErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function PdfErrorState({ error, onRetry }: PdfErrorStateProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={64} color={colors.error} />
      <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.retryButton,
          { backgroundColor: colors.link },
          pressed && styles.buttonPressed,
        ]}
        onPress={onRetry}
      >
        <Text style={styles.buttonText}>Try Again</Text>
      </Pressable>
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
  errorText: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    marginVertical: spacing.lg,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: spacing.radiusSm,
    marginTop: spacing.lg,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
