/**
 * IconButton component for Android
 * Uses Material Design 3 styling with ripple effect
 */

import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import type { IconButtonProps } from "./types";

const SIZES = {
  small: { button: 40, icon: 20, radius: 20 },
  medium: { button: 48, icon: 24, radius: 24 },
  large: { button: 56, icon: 28, radius: 28 },
};

export function IconButton({
  icon,
  onPress,
  size = "medium",
  variant = "default",
  color,
  disabled = false,
  style,
}: IconButtonProps) {
  const { colors } = useTheme();
  const sizeConfig = SIZES[size];

  const getIconColor = () => {
    if (color) return color;
    if (disabled) return colors.textTertiary;
    switch (variant) {
      case "filled":
        return "#FFFFFF";
      case "tinted":
        return colors.primary;
      default:
        return "#FFFFFF";
    }
  };

  const getBackgroundColor = () => {
    if (disabled) {
      return variant === "tinted" ? `${colors.textTertiary}15` : colors.textTertiary;
    }
    switch (variant) {
      case "filled":
        return colors.primary;
      case "tinted":
        return `${colors.primary}15`;
      default:
        return "rgba(0, 0, 0, 0.5)";
    }
  };

  const getRippleColor = () => {
    switch (variant) {
      case "filled":
        return "rgba(255, 255, 255, 0.3)";
      case "tinted":
        return `${colors.primary}30`;
      default:
        return "rgba(255, 255, 255, 0.3)";
    }
  };

  const buttonStyle = {
    width: sizeConfig.button,
    height: sizeConfig.button,
    borderRadius: sizeConfig.radius,
  };

  return (
    <View style={[styles.container, { borderRadius: sizeConfig.radius }, style]}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        android_ripple={{
          color: getRippleColor(),
          borderless: false,
          radius: sizeConfig.radius,
        }}
        style={[
          styles.button,
          buttonStyle,
          { backgroundColor: getBackgroundColor() },
          variant === "filled" && styles.elevated,
        ]}
      >
        <Ionicons name={icon as any} size={sizeConfig.icon} color={getIconColor()} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  elevated: {
    elevation: 3,
  },
});
