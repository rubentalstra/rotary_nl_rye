/**
 * About Screen
 * Information about Rotary Youth Exchange Netherlands
 */

import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import { AboutCard, aboutSections } from "@/features/about";

export default function AboutScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      automaticallyAdjustContentInsets={true}
    >
      <View style={styles.content}>
        {aboutSections.map((section) => (
          <AboutCard key={section.id} section={section} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingTop: Platform.OS === "ios" ? spacing.sm : spacing.md,
    paddingBottom: Platform.OS === "android" ? 100 : 40,
  },
});
