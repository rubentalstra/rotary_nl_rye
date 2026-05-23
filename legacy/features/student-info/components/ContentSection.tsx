import React, { memo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import type { IconName } from "../types";

interface ContentSectionProps {
  /** Optional icon for section header */
  icon?: IconName;
  /** Optional section title */
  title?: string;
  /** Section content */
  children: React.ReactNode;
  /** Add bottom margin (default: true) */
  withMargin?: boolean;
}

/**
 * ContentSection - A section wrapper with optional icon and title header
 *
 * Used to group related content blocks with a consistent header style.
 */
export const ContentSection = memo(function ContentSection({
  icon,
  title,
  children,
  withMargin = true,
}: ContentSectionProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.section, withMargin && styles.sectionMargin]}>
      {(icon || title) && (
        <View style={styles.sectionHeader}>
          {icon && <Ionicons name={icon} size={24} color={colors.primary} />}
          {title && (
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text },
                icon && styles.sectionTitleWithIcon,
              ]}
            >
              {title}
            </Text>
          )}
        </View>
      )}
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  section: {},
  sectionMargin: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  sectionTitleWithIcon: {
    marginLeft: 12,
  },
});
