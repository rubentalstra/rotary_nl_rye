import React, { memo, useCallback } from "react";
import { StyleSheet, View, Text, Pressable, Platform } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/core/theme";
import type { MenuItem } from "../types";

interface MenuListProps {
  /** Array of menu items */
  items: MenuItem[];
  /** Optional title for the menu section */
  title?: string;
}

/**
 * MenuList - A list of navigation menu items
 *
 * Displays menu items with icons and handles navigation with haptic feedback.
 */
export const MenuList = memo(function MenuList({ items, title }: MenuListProps) {
  const { colors } = useTheme();

  const handleItemPress = useCallback(async (route: string) => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      router.push(route as any);
    } catch (error) {
      console.error("Error navigating to route:", error);
      router.push(route as any);
    }
  }, []);

  const renderIcon = (iconName: string) => {
    // Check if it's a FontAwesome5 icon (simple heuristic)
    const fontAwesomeIcons = [
      "campground",
      "home",
      "users",
      "calendar-alt",
      "suitcase",
      "landmark",
      "phone-alt",
      "clipboard-list",
    ];

    if (fontAwesomeIcons.includes(iconName)) {
      return <FontAwesome5 name={iconName as any} size={22} color={colors.primary} />;
    }

    return <Ionicons name={iconName as any} size={24} color={colors.primary} />;
  };

  return (
    <View style={styles.container}>
      {title && <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>}
      {items.map((item) => (
        <Pressable
          key={item.id}
          style={({ pressed }) => [
            styles.menuItem,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              shadowColor: colors.shadow,
            },
            pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
            item.enabled === false && styles.menuItemDisabled,
          ]}
          onPress={() => item.enabled !== false && handleItemPress(item.route)}
          disabled={item.enabled === false}
          accessibilityRole="button"
          accessibilityLabel={item.title}
          accessibilityHint={`Navigate to ${item.title}`}
          android_ripple={{
            color: `${colors.primary}20`,
            borderless: false,
          }}
        >
          <View style={styles.menuContent}>
            <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}15` }]}>
              {renderIcon(item.icon)}
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.menuTitle, { color: colors.text }]}>{item.title}</Text>
              {item.subtitle && (
                <Text style={[styles.menuSubtitle, { color: colors.textSecondary }]}>
                  {item.subtitle}
                </Text>
              )}
            </View>
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-forward" : "arrow-forward"}
              size={20}
              color={colors.textTertiary}
            />
          </View>
        </Pressable>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  menuItem: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: Platform.OS === "android" ? StyleSheet.hairlineWidth : 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItemDisabled: {
    opacity: 0.5,
  },
  menuContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    minHeight: 72,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 22,
  },
  menuSubtitle: {
    fontSize: 13,
    fontWeight: "400",
  },
});
