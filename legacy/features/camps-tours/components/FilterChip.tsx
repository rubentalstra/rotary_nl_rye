/**
 * Reusable filter chip component
 */

import { StyleSheet, Pressable, Platform, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";

interface FilterChipProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export function FilterChip({ icon, label, isActive, onPress }: FilterChipProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: isActive ? colors.primary : colors.card,
          borderColor: colors.border,
        },
        pressed && styles.chipPressed,
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={16} color={isActive ? "#FFFFFF" : colors.textSecondary} />
      <Text style={[styles.chipText, { color: isActive ? "#FFFFFF" : colors.text }]}>{label}</Text>
      <Ionicons
        name="chevron-down"
        size={14}
        color={isActive ? "#FFFFFF" : colors.textSecondary}
        style={styles.chevron}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    minHeight: 36,
  },
  chipPressed: {
    opacity: 0.7,
    transform: Platform.OS === "ios" ? [{ scale: 0.96 }] : [],
  },
  chipText: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 6,
  },
  chevron: {
    marginLeft: 4,
  },
});
