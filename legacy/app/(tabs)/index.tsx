/**
 * Home Screen
 * Main navigation hub for the Rotary YEP NL app
 */

import { useMemo } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useTheme } from "@/core/theme";
import { HomeCard, ImageCarousel } from "@/features/home";

export default function HomeScreen() {
  const { colors } = useTheme();

  const carouselImages = useMemo(
    () => [
      require("@/assets/home/carousel/outbound-25-26-group.jpeg"),
      require("@/assets/home/carousel/inbounds-with-flags.jpeg"),
      require("@/assets/home/carousel/inbound-andre-schiphol.jpeg"),
    ],
    [],
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustContentInsets={true}
      >
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/home/rotary_rye_nl_logo_home.svg")}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        <ImageCarousel images={carouselImages} />

        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            <HomeCard
              icon="list-outline"
              title="Programma"
              onPress={() => router.push("/programs")}
            />
            <HomeCard icon="newspaper-outline" title="News" onPress={() => router.push("/news")} />
            <HomeCard
              icon="calendar-outline"
              title="Calendar"
              onPress={() => router.push("/calendar")}
            />
          </View>

          <View style={styles.gridRow}>
            <HomeCard
              materialIcon="airplane-takeoff"
              title="Op Exchange"
              onPress={() => router.push("/students/outbound")}
            />
            <HomeCard
              materialIcon="airplane-landing"
              title="To NL"
              onPress={() => router.push("/students/inbound")}
            />
            <HomeCard
              icon="refresh-outline"
              title="Rebound"
              onPress={() => router.push("/students/rebound")}
            />
          </View>

          <View style={styles.gridRowSingle}>
            <HomeCard
              fontistoIcon="tent"
              title="Zomerkampen Lijst"
              variant="single"
              onPress={() => router.push("/camps-tours")}
            />
            <HomeCard
              title="voor Rotary Clubs"
              variant="single"
              useSvg={true}
              svgSource={require("@/assets/logo/rotary-logo-icon.svg")}
              onPress={() => router.push("/rotary-clubs")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  logo: {
    width: "100%",
    height: 80,
  },
  gridContainer: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "android" ? 100 : 40,
  },
  gridRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  gridRowSingle: {
    flexDirection: "row",
    marginBottom: 30,
  },
});
