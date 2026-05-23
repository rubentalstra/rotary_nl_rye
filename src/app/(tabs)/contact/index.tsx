import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Column, Host, Text } from "@expo/ui";

import { useTheme } from "@/lib/theme/use-theme";
import { spacing } from "@/lib/theme/spacing";

export default function ContactScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Contact" }} />
      <ScrollView
        style={{ backgroundColor: theme.background }}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
      >
        <View style={styles.host}>
          <Host matchContents style={{ width: "100%" }}>
            <Column spacing={spacing.md}>
              <Text textStyle={{ fontSize: 28, fontWeight: "bold", color: theme.text }}>
                Contact
              </Text>
              <Text textStyle={{ color: theme.textSecondary }}>
                MDJC, LT, ST en ROTEX contacten worden hier opnieuw opgebouwd.
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
