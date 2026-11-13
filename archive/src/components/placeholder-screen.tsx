import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Column, Host, Text } from "@expo/ui";

import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/lib/icons";
import { spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

interface PlaceholderScreenProps {
  title: string;
  icon: IconName;
  blurb?: string;
}

/**
 * Pre-content stub used by routes that are wired up for navigation but whose
 * real screens land in later commits. Removes a route as soon as the real
 * implementation arrives.
 */
export function PlaceholderScreen({
  title,
  icon,
  blurb = "Wordt opnieuw opgebouwd in v13.",
}: PlaceholderScreenProps) {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ title, headerLargeTitle: true }} />
      <ScrollView
        style={{ backgroundColor: theme.background }}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
      >
        <View style={[styles.iconWrap, { backgroundColor: theme.surfaceVariant }]}>
          <Icon name={icon} size={64} tintColor={theme.primary} />
        </View>

        <Host matchContents style={{ width: "100%" }}>
          <Column spacing={spacing.sm} alignment="center">
            <Text textStyle={{ fontSize: 24, fontWeight: "bold", color: theme.text, textAlign: "center" }}>
              {title}
            </Text>
            <Text textStyle={{ color: theme.textSecondary, textAlign: "center" }}>{blurb}</Text>
          </Column>
        </Host>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
    gap: spacing.xl,
    alignItems: "center",
  },
  iconWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xl,
  },
});
