/**
 * Button component for iOS
 * Uses SwiftUI Button from @expo/ui for native iOS styling
 */

import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Host, Button as ExpoButton } from "@expo/ui/swift-ui";
import { useTheme } from "@/core/theme";
import { useHaptics } from "@/shared/hooks";
import type { ButtonProps } from "./types";

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const { colors } = useTheme();
  const { lightImpact } = useHaptics();

  const handlePress = () => {
    if (!disabled && !loading) {
      lightImpact();
      onPress();
    }
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, style]}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  return (
    <Host matchContents style={style}>
      <ExpoButton onPress={handlePress} label={title} />
    </Host>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
});
