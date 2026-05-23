import { Image } from "expo-image";
import { router } from "expo-router";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { HomeCard } from "@/components/home/home-card";
import { ImageCarousel } from "@/components/home/image-carousel";
import { spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

const carouselImages = [
  require("@/assets/home/carousel/outbound-25-26-group.jpeg"),
  require("@/assets/home/carousel/inbounds-with-flags.jpeg"),
  require("@/assets/home/carousel/inbound-andre-schiphol.jpeg"),
];

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

        <ImageCarousel images={carouselImages} />

        <View style={styles.grid}>
          <View style={styles.row}>
            <HomeCard icon="programs" title="Programma" onPress={() => router.push("/programs")} />
            <HomeCard icon="news" title="News" onPress={() => router.push("/news")} />
            <HomeCard icon="calendar" title="Calendar" onPress={() => router.push("/calendar")} />
          </View>

          <View style={styles.row}>
            <HomeCard
              icon="outbound"
              title="Op Exchange"
              onPress={() => router.push("/students/outbound")}
            />
            <HomeCard
              icon="inbound"
              title="To NL"
              onPress={() => router.push("/students/inbound")}
            />
            <HomeCard
              icon="rebound"
              title="Rebound"
              onPress={() => router.push("/students/rebound")}
            />
          </View>

          <View style={styles.row}>
            <HomeCard
              icon="camps"
              title="Zomerkampen"
              variant="wide"
              onPress={() => router.push("/camps-tours")}
            />
            <HomeCard
              icon="clubs"
              title="Voor Rotary Clubs"
              variant="wide"
              onPress={() => router.push("/rotary-clubs")}
            />
          </View>
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
    height: 70,
  },
  grid: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
});
