/**
 * IconButton component for iOS
 * Uses native iOS glass effect with SF Symbol-style icons
 */

import { Pressable, StyleSheet, View } from "react-native";
import { GlassView } from "expo-glass-effect";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/core/theme";
import type { IconButtonProps } from "./types";

const SIZES = {
  small: { button: 30, icon: 17, radius: 15 },
  medium: { button: 40, icon: 20, radius: 20 },
  large: { button: 48, icon: 24, radius: 24 },
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

  const handlePress = async () => {
    if (disabled) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

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

  const buttonStyle = {
    width: sizeConfig.button,
    height: sizeConfig.button,
    borderRadius: sizeConfig.radius,
  };

  // Glass variant (default) - uses native glass effect
  if (variant === "default") {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={[styles.pressable, { borderRadius: sizeConfig.radius }, style]}
      >
        {({ pressed }) => (
          <GlassView
            style={[styles.glassButton, buttonStyle, pressed && styles.pressed]}
            isInteractive
          >
            <Ionicons name={icon as any} size={sizeConfig.icon} color={getIconColor()} />
          </GlassView>
        )}
      </Pressable>
    );
  }

  // Filled variant - solid primary color background
  if (variant === "filled") {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={[styles.pressable, { borderRadius: sizeConfig.radius }, style]}
      >
        {({ pressed }) => (
          <View
            style={[
              styles.solidButton,
              buttonStyle,
              { backgroundColor: disabled ? colors.textTertiary : colors.primary },
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name={icon as any} size={sizeConfig.icon} color={getIconColor()} />
          </View>
        )}
      </Pressable>
    );
  }

  // Tinted variant - primary color with opacity
  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[styles.pressable, { borderRadius: sizeConfig.radius }, style]}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.solidButton,
            buttonStyle,
            {
              backgroundColor: disabled ? `${colors.textTertiary}15` : `${colors.primary}15`,
            },
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name={icon as any} size={sizeConfig.icon} color={getIconColor()} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    overflow: "hidden",
  },
  glassButton: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  solidButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
});
