import { View, ScrollView, Pressable, Platform, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Text } from "@/components/ui/text";

function GridItem({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={() => {
        if (Platform.OS === "ios") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      className="flex-1 mx-1.5 mb-3 aspect-square rounded-2xl bg-secondary items-center justify-center active:opacity-70"
    >
      <View className="mb-2">{icon}</View>
      <Text className="text-sm font-semibold text-foreground">{label}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const squareSize = (width - 32 - 12) / 3;

  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Logo */}
      <View className="px-6 pt-6 pb-6">
        <Image
          source={require("../../../assets/home/rotary_rye_nl_logo_home.svg")}
          style={{ width: "100%", height: 64 }}
          contentFit="contain"
        />
      </View>

      {/* Hero Image */}
      <View className="px-4 mb-6">
        <Image
          source={require("../../../assets/home/carousel/outbound-25-26-group.jpeg")}
          style={{ width: "100%", height: 220, borderRadius: 20 }}
          contentFit="cover"
        />
      </View>

      {/* Grid */}
      <View className={`px-4 ${Platform.OS === "android" ? "pb-28" : "pb-12"}`}>
        <View className="flex-row">
          <GridItem
            icon={<Ionicons name="list-outline" size={30} className="text-foreground" />}
            label="Programma"
            onPress={() => router.push("/programs")}
          />
          <GridItem
            icon={<Ionicons name="newspaper-outline" size={30} className="text-foreground" />}
            label="Nieuws"
            onPress={() => router.push("/news")}
          />
          <GridItem
            icon={<Ionicons name="calendar-outline" size={30} className="text-foreground" />}
            label="Kalender"
            onPress={() => router.push("/calendar")}
          />
        </View>

        <View className="flex-row">
          <GridItem
            icon={
              <MaterialCommunityIcons
                name="airplane-takeoff"
                size={30}
                className="text-foreground"
              />
            }
            label="Outbound"
            onPress={() => router.push("/students/outbound")}
          />
          <GridItem
            icon={
              <MaterialCommunityIcons
                name="airplane-landing"
                size={30}
                className="text-foreground"
              />
            }
            label="Inbound"
            onPress={() => router.push("/students/inbound")}
          />
          <GridItem
            icon={<Ionicons name="refresh-outline" size={30} className="text-foreground" />}
            label="Rebound"
            onPress={() => router.push("/students/rebound")}
          />
        </View>

        <View className="flex-row" style={{ height: squareSize }}>
          <Pressable
            onPress={() => {
              if (Platform.OS === "ios") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push("/camps-tours");
            }}
            className="flex-1 mx-1.5 rounded-2xl bg-secondary items-center justify-center active:opacity-70"
          >
            <View className="mb-2">
              <Fontisto name="tent" size={26} className="text-foreground" />
            </View>
            <Text className="text-sm font-semibold text-foreground">Zomerkampen</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (Platform.OS === "ios") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push("/rotary-clubs");
            }}
            className="flex-1 mx-1.5 rounded-2xl bg-secondary items-center justify-center active:opacity-70"
          >
            <View className="mb-2">
              <Image
                source={require("../../../assets/logo/rotary-logo-icon.svg")}
                style={{ width: 30, height: 30 }}
                contentFit="contain"
              />
            </View>
            <Text className="text-sm font-semibold text-foreground">Rotary Clubs</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
