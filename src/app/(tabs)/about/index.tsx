import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Column, Host, Text } from "@expo/ui";

import { useTheme } from "@/lib/theme/use-theme";
import { spacing } from "@/lib/theme/spacing";

export default function AboutScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Over de app" }} />
      <ScrollView
        style={{ backgroundColor: theme.background }}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
      >
        <View style={styles.host}>
          <Host matchContents style={{ width: "100%" }}>
            <Column spacing={spacing.md}>
              <Text textStyle={{ fontSize: 28, fontWeight: "bold", color: theme.text }}>
                Rotary Youth Exchange Nederland
              </Text>
              <Text textStyle={{ color: theme.textSecondary }}>
                Coming soon — wordt opnieuw opgebouwd in v13.
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
