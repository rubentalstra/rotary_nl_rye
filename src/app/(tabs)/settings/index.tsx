import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Column, Host, Text } from "@expo/ui";

import { useTheme } from "@/lib/theme/use-theme";
import { spacing } from "@/lib/theme/spacing";

export default function SettingsScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Instellingen" }} />
      <ScrollView
        style={{ backgroundColor: theme.background }}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
      >
        <View style={styles.host}>
          <Host matchContents style={{ width: "100%" }}>
            <Column spacing={spacing.md}>
              <Text textStyle={{ fontSize: 28, fontWeight: "bold", color: theme.text }}>
                Instellingen
              </Text>
              <Text textStyle={{ color: theme.textSecondary }}>
                App-versie, thema en links worden hier opnieuw opgebouwd.
              </Text>
            </Column>
          </Host>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  host: { minHeight: 120 },
});
