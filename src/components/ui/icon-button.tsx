import * as Haptics from "expo-haptics";
import { GlassView } from "expo-glass-effect";
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  type ColorValue,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/lib/icons";
import { useTheme } from "@/lib/theme/use-theme";

export type IconButtonSize = "small" | "medium" | "large";
export type IconButtonVariant = "default" | "filled" | "tinted";

interface IconButtonProps {
  icon: IconName;
  onPress: () => void;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  color?: ColorValue;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const SIZES: Record<IconButtonSize, { button: number; icon: number; radius: number }> = {
  small: { button: 30, icon: 17, radius: 15 },
  medium: { button: 40, icon: 20, radius: 20 },
  large: { button: 48, icon: 24, radius: 24 },
};

/**
 * Circular tappable icon button. Three variants:
 * - `default` — iOS-native glass effect (via `expo-glass-effect`) with a white symbol
 * - `filled` — solid primary background with a white symbol
 * - `tinted` — 15%-primary background with a primary-tinted symbol (used on iOS Settings-style action rows)
 */
export function IconButton({
  icon,
  onPress,
  size = "medium",
  variant = "default",
  color,
  disabled = false,
  style,
}: IconButtonProps) {
  const theme = useTheme();
  const cfg = SIZES[size];

  const handlePress = () => {
    if (disabled) return;
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  const iconColor: ColorValue = (() => {
    if (color) return color;
    if (disabled) return theme.textTertiary;
    if (variant === "tinted") return theme.primary;
    return "#FFFFFF";
  })();

  const buttonShape: ViewStyle = {
    width: cfg.button,
    height: cfg.button,
    borderRadius: cfg.radius,
  };

  if (variant === "default") {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={[styles.pressable, { borderRadius: cfg.radius }, style]}
      >
        {({ pressed }) => (
          <GlassView
            style={[styles.glassButton, buttonShape, pressed && styles.pressed]}
            isInteractive
          >
            <Icon name={icon} size={cfg.icon} tintColor={iconColor} />
          </GlassView>
        )}
      </Pressable>
    );
  }

  const solidBg =
    variant === "filled"
      ? disabled
        ? theme.textTertiary
        : theme.primary
      : disabled
      ? `${theme.textTertiary}15`
      : `${theme.primary}15`;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[styles.pressable, { borderRadius: cfg.radius }, style]}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.solidButton,
            buttonShape,
            { backgroundColor: solidBg },
            pressed && styles.pressed,
          ]}
        >
          <Icon name={icon} size={cfg.icon} tintColor={iconColor} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: { overflow: "hidden" },
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
