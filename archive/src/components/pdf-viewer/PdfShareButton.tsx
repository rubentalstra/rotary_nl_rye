/**
 * PDF share button component for navigation header
 */

import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useTheme } from "@/lib/theme/use-theme";
import { borderRadius, spacing } from "@/lib/theme/spacing";

interface PdfShareButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export function PdfShareButton({ onPress, disabled }: PdfShareButtonProps) {
  const colors = useTheme();

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
    borderRadius: borderRadius.sm,
  },
});
