/**
 * Settings item component
 */

import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";

interface SettingsItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

export function SettingsItem({ title, subtitle, onPress, rightElement }: SettingsItemProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        { borderBottomColor: colors.border },
        pressed && styles.itemPressed,
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
        )}
      </View>
      {rightElement ||
        (onPress && (
          <Ionicons
            name={Platform.OS === "ios" ? "chevron-forward" : "chevron-forward-outline"}
            size={Platform.OS === "ios" ? 20 : 24}
            color={colors.textTertiary}
          />
        ))}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Platform.OS === "ios" ? spacing.md : 14,
    paddingHorizontal: spacing.md,
    minHeight: Platform.OS === "ios" ? 60 : 64,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemPressed: {
    opacity: 0.8,
    transform: Platform.OS === "ios" ? [{ scale: 0.98 }] : [],
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: Platform.OS === "ios" ? "600" : "500",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
});
