import { StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/ui/icon";
import type { AboutSection } from "@/features/about/types";
import { spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

interface AboutCardProps {
  section: AboutSection;
}

export function AboutCard({ section }: AboutCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${theme.primary}15` }]}>
          <Icon name={section.icon} size={22} tintColor={theme.primary} />
        </View>
        <Text style={[styles.title, { color: theme.text }]}>{section.title}</Text>
      </View>

      {section.subtitle ? (
        <Text style={[styles.subtitle, { color: theme.accent }]}>{section.subtitle}</Text>
      ) : null}

      {section.content ? (
        <Text style={[styles.content, { color: theme.textSecondary }]}>{section.content}</Text>
      ) : null}

      {section.listItems?.map((item) => (
        <View key={item.substring(0, 30)} style={styles.listItem}>
          <View style={[styles.bulletPoint, { backgroundColor: theme.primary }]} />
          <Text style={[styles.listItemText, { color: theme.textSecondary }]}>{item}</Text>
        </View>
      ))}

      {section.quote ? (
        <Text style={[styles.quote, { color: theme.text, borderTopColor: theme.border }]}>
          {section.quote}
        </Text>
      ) : null}
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
