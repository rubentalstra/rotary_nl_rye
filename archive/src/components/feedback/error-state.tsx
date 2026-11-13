import { Pressable, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/ui/icon";
import { useTheme } from "@/lib/theme/use-theme";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ErrorState({
  message = "Er is iets misgegaan",
  onRetry,
  showRetry = true,
}: ErrorStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Icon name="alert" size={48} tintColor={theme.error} />
      <Text style={[styles.message, { color: theme.text }]}>{message}</Text>
      {showRetry && onRetry ? (
        <Pressable
          style={[styles.retryButton, { backgroundColor: theme.primary }]}
          onPress={onRetry}
        >
          <Icon name="refresh" size={20} tintColor={theme.onPrimary} />
          <Text style={[styles.retryText, { color: theme.onPrimary }]}>Opnieuw proberen</Text>
        </Pressable>
      ) : null}
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
