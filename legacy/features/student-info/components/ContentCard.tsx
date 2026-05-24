import React, { memo } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import type { IconName, AccentColor } from "../types";

interface ContentCardProps {
  /** Optional icon to display */
  icon?: IconName;
  /** Color for the icon */
  iconColor?: AccentColor;
  /** Optional card title */
  title?: string;
  /** Card content text (optional if using children) */
  content?: string;
  /** Color for the left border accent */
  accentColor?: AccentColor;
  /** Custom content */
  children?: React.ReactNode;
}

/**
 * ContentCard - A styled card with optional icon and accent border
 *
 * Used for displaying content blocks with visual hierarchy.
 */
export const ContentCard = memo(function ContentCard({
  icon,
  iconColor = "primary",
  title,
  content,
  accentColor,
  children,
}: ContentCardProps) {
  const { colors } = useTheme();

  const getAccentColorValue = (color?: AccentColor): string | undefined => {
    if (!color) return undefined;
    const colorMap: Record<AccentColor, string> = {
      primary: colors.primary,
      secondary: colors.secondary,
      success: colors.success,
      warning: colors.warning,
      info: colors.info,
      accent: colors.accent,
    };
    return colorMap[color];
  };

  const iconColorValue = getAccentColorValue(iconColor) || colors.primary;
  const borderColor = getAccentColorValue(accentColor);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          shadowColor: colors.shadow,
          borderColor: colors.border,
        },
        borderColor && {
          borderLeftWidth: 4,
          borderLeftColor: borderColor,
        },
      ]}
    >
      {(icon || title) && (
        <View style={styles.header}>
          {icon && <Ionicons name={icon} size={20} color={iconColorValue} />}
          {title && (
            <Text style={[styles.title, { color: colors.text }, icon && styles.titleWithIcon]}>
              {title}
            </Text>
          )}
        </View>
      )}
      {content && <Text style={[styles.content, { color: colors.textSecondary }]}>{content}</Text>}
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: Platform.OS === "android" ? StyleSheet.hairlineWidth : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  titleWithIcon: {
    marginLeft: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});
