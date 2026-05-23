import { Stack } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Host, List, ListItem } from "@expo/ui";

import { Icon } from "@/components/ui/icon";
import { contributors } from "@/features/settings/contributors";
import { spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";
import { getInitials } from "@/utils/communications";

export default function ContributorsScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Bijdragers" }} />
      <ScrollView
        style={[styles.scroll, { backgroundColor: theme.background }]}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View style={[styles.headerIcon, { backgroundColor: `${theme.primary}1A` }]}>
            <Icon name="programs" size={40} tintColor={theme.primary} />
          </View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Contributors</Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Met dank aan iedereen die deze app mogelijk maakt.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: theme.textTertiary }]}>
            DEVELOPMENT TEAM
          </Text>
          <Host matchContents style={styles.host}>
            <List>
              {contributors.map((contributor) => (
                <ListItem
                  key={contributor.id}
                  leading={<Avatar initials={getInitials(contributor.name)} />}
                  supportingText={`${contributor.role} · ${contributor.location}`}
                >
                  {contributor.name}
                </ListItem>
              ))}
            </List>
          </Host>
        </View>
      </ScrollView>
    </>
  );
}

function Avatar({ initials }: { initials: string }) {
  const theme = useTheme();
  return (
    <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
      <Text style={[styles.avatarText, { color: theme.onPrimary }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: {
    padding: spacing.lg,
    paddingBottom: 48,
    gap: spacing.xl,
  },
  header: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.xl,
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: spacing.lg,
  },
  section: {
    gap: spacing.sm,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  host: { width: "100%" },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
