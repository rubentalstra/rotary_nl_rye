import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/lib/theme/use-theme";

interface LoadingStateProps {
  message?: string;
  size?: "small" | "large";
}

export function LoadingState({ message, size = "large" }: LoadingStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={theme.primary} />
      {message ? (
        <Text style={[styles.message, { color: theme.textSecondary }]}>{message}</Text>
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
  },
});
