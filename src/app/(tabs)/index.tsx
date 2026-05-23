import { Image } from "expo-image";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/lib/theme/use-theme";
import { spacing } from "@/lib/theme/spacing";

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoWrap}>
          <Image
            source={require("@/assets/home/rotary_rye_nl_logo_home.svg")}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        <View
          style={[
            styles.heroImage,
            {
              backgroundColor: theme.surfaceVariant,
              borderColor: theme.outline,
            },
          ]}
        >
          <Image
            source={require("@/assets/home/carousel/outbound-25-26-group.jpeg")}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: {
    paddingBottom: Platform.OS === "android" ? 100 : 40,
  },
  logoWrap: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  logo: {
    width: "100%",
    height: 80,
  },
  heroImage: {
    marginHorizontal: spacing.lg,
    height: 220,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
});
