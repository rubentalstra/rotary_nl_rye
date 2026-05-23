/**
 * About card component
 */

import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import type { AboutSection } from "../types";

interface AboutCardProps {
  section: AboutSection;
}

export function AboutCard({ section }: AboutCardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}15` }]}>
          <Ionicons
            name={section.icon as keyof typeof Ionicons.glyphMap}
            size={22}
            color={colors.primary}
          />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>{section.title}</Text>
      </View>

      {section.subtitle && (
        <Text style={[styles.subtitle, { color: colors.accent }]}>{section.subtitle}</Text>
      )}

      {section.content && (
        <Text style={[styles.content, { color: colors.textSecondary }]}>{section.content}</Text>
      )}

      {section.listItems?.map((item) => (
        <View key={item.substring(0, 30)} style={styles.listItem}>
          <View style={[styles.bulletPoint, { backgroundColor: colors.primary }]} />
          <Text style={[styles.listItemText, { color: colors.textSecondary }]}>{item}</Text>
        </View>
      ))}

      {section.quote && (
        <Text style={[styles.quote, { color: colors.text, borderTopColor: colors.border }]}>
          {section.quote}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: spacing.sm,
    fontStyle: "italic",
  },
  content: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: spacing.sm,
    flexShrink: 0,
  },
  listItemText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  quote: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
  },
});
