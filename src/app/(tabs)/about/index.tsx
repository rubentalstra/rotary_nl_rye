import { Platform, ScrollView, StyleSheet, View } from "react-native";

import { AboutCard } from "@/components/about/about-card";
import { aboutSections } from "@/features/about/about-data";
import { spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

export default function AboutScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      automaticallyAdjustContentInsets
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
  container: { flex: 1 },
  content: {
    padding: spacing.md,
    paddingTop: Platform.OS === "ios" ? spacing.sm : spacing.md,
    paddingBottom: Platform.OS === "android" ? 100 : 40,
  },
});
