import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Column, Host, Text } from "@expo/ui";

import { useTheme } from "@/lib/theme/use-theme";
import { spacing } from "@/lib/theme/spacing";

export default function EmergencyScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Noodgeval" }} />
      <ScrollView
        style={{ backgroundColor: theme.background }}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
      >
        <View style={styles.host}>
          <Host matchContents style={{ width: "100%" }}>
            <Column spacing={spacing.md}>
              <Text textStyle={{ fontSize: 28, fontWeight: "bold", color: theme.error }}>
                Noodgeval
              </Text>
              <Text textStyle={{ color: theme.textSecondary }}>
                Bel 112 voor levensbedreigende situaties.
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
