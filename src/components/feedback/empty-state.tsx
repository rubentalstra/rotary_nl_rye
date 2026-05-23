import { StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/lib/icons";
import { useTheme } from "@/lib/theme/use-theme";

interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: IconName;
}

export function EmptyState({ title, message, icon = "folder" }: EmptyStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Icon name={icon} size={64} tintColor={theme.textTertiary} />
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
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
  title: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  message: {
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
