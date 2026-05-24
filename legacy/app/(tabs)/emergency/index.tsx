/**
 * Emergency Screen
 * Displays emergency contacts and important safety information
 * Uses components and data from @/features/emergency
 */

import { ScrollView, StyleSheet, View, Platform } from "react-native";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import {
  Emergency112Section,
  EmergencySection,
  ImportantNote,
  emergencySections,
} from "@/features/emergency";

export default function EmergencyScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      automaticallyAdjustContentInsets={true}
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
  container: {
    flex: 1,
  },
  content: {
    padding: Platform.OS === "ios" ? spacing.md : spacing.sm,
    paddingTop: Platform.OS === "ios" ? spacing.sm : spacing.sm,
    paddingBottom: Platform.OS === "android" ? 100 : 40,
  },
});
