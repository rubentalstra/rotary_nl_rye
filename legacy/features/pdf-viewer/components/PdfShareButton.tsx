/**
 * PDF share button component for navigation header
 */

import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";

interface PdfShareButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export function PdfShareButton({ onPress, disabled }: PdfShareButtonProps) {
  const { colors } = useTheme();

  if (disabled) return null;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? colors.surface : "transparent" },
      ]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons name="share-outline" size={24} color={colors.link} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: spacing.xs,
    borderRadius: spacing.radiusSm,
  },
});
