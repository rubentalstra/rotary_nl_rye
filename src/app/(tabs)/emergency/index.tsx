import { Platform, ScrollView, StyleSheet, View } from "react-native";

import { Emergency112Section } from "@/components/emergency/emergency-112-section";
import { EmergencySection } from "@/components/emergency/emergency-section";
import { ImportantNote } from "@/components/emergency/important-note";
import { emergencySections } from "@/features/emergency/data";
import { spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

export default function EmergencyScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      automaticallyAdjustContentInsets
    >
      <View style={styles.content}>
        <Emergency112Section />

        {emergencySections.map((section) => (
          <EmergencySection key={section.id} section={section} />
        ))}

        <ImportantNote />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: Platform.OS === "ios" ? spacing.md : spacing.sm,
    paddingTop: spacing.sm,
    paddingBottom: Platform.OS === "android" ? 100 : 40,
  },
});
