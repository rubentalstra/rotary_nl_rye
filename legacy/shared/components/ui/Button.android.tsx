/**
 * Button component for Android
 * Uses Jetpack Compose Button from @expo/ui for native Material Design styling
 */

import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Button as ExpoButton } from "@expo/ui/jetpack-compose";
import { useTheme } from "@/core/theme";
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

  const getButtonVariant = (): "default" | "bordered" | "borderless" | "outlined" | "elevated" => {
    switch (variant) {
      case "primary":
        return "elevated";
      case "secondary":
        return "outlined";
      case "destructive":
        return "elevated";
      default:
        return "default";
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
    <View style={style}>
      <ExpoButton variant={getButtonVariant()} disabled={disabled} onPress={onPress}>
        {title}
      </ExpoButton>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
});
