import { useMemo } from "react";
import { View, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { HomeCard } from "@/components/home-card";
import { ImageCarousel } from "@/components/image-carousel";

export default function HomeScreen() {
  const { t } = useTranslation();

  const carouselImages = useMemo(
    () => [
      require("@/assets/home/carousel/outbound-25-26-group.jpeg"),
      require("@/assets/home/carousel/inbounds-with-flags.jpeg"),
      require("@/assets/home/carousel/inbound-andre-schiphol.jpeg"),
    ],
    [],
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        {/* Logo */}
        <View className="items-center px-4 py-5 mb-7">
          <Image
            source={require("@/assets/home/rotary_rye_nl_logo_home.svg")}
            style={{ width: "100%", height: 80 }}
            contentFit="contain"
          />
        </View>

        <ImageCarousel images={carouselImages} />

        {/* Navigation Grid */}
        <View className={`px-4 ${Platform.OS === "android" ? "pb-24" : "pb-10"}`}>
          <View className="flex-row mb-4">
            <HomeCard
              icon="list-outline"
              title="Programma"
              onPress={() => router.push("/programs")}
            />
            <HomeCard
              icon="newspaper-outline"
              title="News"
              onPress={() => router.push("/news")}
            />
            <HomeCard
              icon="calendar-outline"
              title="Calendar"
              onPress={() => router.push("/calendar")}
            />
          </View>

          <View className="flex-row mb-4">
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

          <View className="flex-row mb-7">
            <HomeCard
              fontistoIcon="tent"
              title="Zomerkampen Lijst"
              variant="single"
              onPress={() => router.push("/camps-tours")}
            />
            <HomeCard
              title="voor Rotary Clubs"
              variant="single"
              useSvg
              svgSource={require("@/assets/logo/rotary-logo-icon.svg")}
              onPress={() => router.push("/rotary-clubs")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
