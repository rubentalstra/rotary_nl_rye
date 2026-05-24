import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
export default function CampsAndToursInboundScreen() {
  const { colors: themeColors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.background }]}
      edges={["bottom"]}
    >
      <View style={styles.emptyState}>
        <Ionicons name="construct-outline" size={48} color={themeColors.primary} />
        <Text style={[styles.emptyStateTitle, { color: themeColors.text }]}>Coming Soon</Text>
        <Text style={[styles.emptyStateMessage, { color: themeColors.textSecondary }]}>
          Information for inbound zomerkampen participants will be available here soon.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateMessage: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
});
