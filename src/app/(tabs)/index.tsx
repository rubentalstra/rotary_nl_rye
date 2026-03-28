import React, { useCallback, useMemo } from "react";
import { View, ScrollView, Pressable, Platform } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Ionicons, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Text } from "@/components/ui/text";
import { ImageCarousel } from "@/components/image-carousel";
import type { HomeCardProps } from "@/lib/types";

const HomeCard = React.memo<HomeCardProps>(
  ({
    icon = "settings-outline",
    fontistoIcon,
    materialIcon,
    title,
    variant = "default",
    useSvg = false,
    svgSource,
    onPress,
  }) => {
    const isDefault = variant === "default";

    const handlePress = useCallback(() => {
      if (Platform.OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      onPress?.();
    }, [onPress]);

    return (
      <View className="flex-1 px-[5px]">
        <Pressable
          onPress={handlePress}
          style={({ pressed }) =>
            pressed ? { transform: [{ scale: 0.98 }], opacity: 0.8 } : {}
          }
          android_ripple={{ color: "rgba(0,103,200,0.12)", borderless: false }}
        >
          <View
            className={`rounded-[10px] bg-card ${isDefault ? "h-[120px]" : "h-[80px]"}`}
            style={Platform.select({
              ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 20,
              },
              android: { elevation: 4 },
            })}
          >
            <View className="flex-1 items-center justify-center p-4">
              <View className={isDefault ? "mb-4" : "mb-2.5"}>
                {useSvg && svgSource ? (
                  <Image
                    source={svgSource}
                    style={{ width: 35, height: 35 }}
                    contentFit="contain"
                    tintColor="hsl(216, 73%, 32%)"
                  />
                ) : materialIcon ? (
                  <MaterialCommunityIcons name={materialIcon} size={35} className="text-primary" />
                ) : fontistoIcon ? (
                  <Fontisto name={fontistoIcon} size={35} className="text-primary" />
                ) : (
                  <Ionicons name={icon} size={35} className="text-primary" />
                )}
              </View>
              {isDefault ? (
                <View className="w-[80px] items-center">
                  <Text className="text-sm text-center text-primary">{title}</Text>
                </View>
              ) : (
                <Text className="text-sm text-center text-primary">{title}</Text>
              )}
            </View>
          </View>
        </Pressable>
      </View>
    );
  },
);

HomeCard.displayName = "HomeCard";

export default function HomeScreen() {
  const carouselImages = useMemo(
    () => [
      require("../../../assets/home/carousel/outbound-25-26-group.jpeg"),
      require("../../../assets/home/carousel/inbounds-with-flags.jpeg"),
      require("../../../assets/home/carousel/inbound-andre-schiphol.jpeg"),
    ],
    [],
  );

  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
        {/* Logo */}
        <View className="items-center mb-[30px] py-5 px-4">
          <Image
            source={require("../../../assets/home/rotary_rye_nl_logo_home.svg")}
            style={{ width: "100%", height: 80 }}
            contentFit="contain"
          />
        </View>

        {/* Carousel */}
        <ImageCarousel images={carouselImages} />

        {/* Navigation Grid */}
        <View className={`px-4 ${Platform.OS === "android" ? "pb-[100px]" : "pb-10"}`}>
          {/* Row 1: 3 cards */}
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

          {/* Row 2: 3 cards */}
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

          {/* Row 3: 2 single cards */}
          <View className="flex-row mb-[30px]">
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
              svgSource={require("../../../assets/logo/rotary-logo-icon.svg")}
              onPress={() => router.push("/rotary-clubs")}
            />
          </View>
        </View>
    </ScrollView>
  );
}
