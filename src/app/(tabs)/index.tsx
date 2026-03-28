import { View, ScrollView, Pressable, Platform } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";

function NavItem({
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
      className="flex-1 items-center py-4 active:opacity-60"
    >
      <View className="w-14 h-14 rounded-2xl bg-muted items-center justify-center mb-2">
        {icon}
      </View>
      <Text className="text-xs font-medium text-foreground">{label}</Text>
    </Pressable>
  );
}

function LinkRow({
  icon,
  label,
  subtitle,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={() => {
        if (Platform.OS === "ios") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      className="flex-row items-center py-4 active:opacity-60"
    >
      <View className="w-12 h-12 rounded-xl bg-muted items-center justify-center mr-4">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-foreground">{label}</Text>
        {subtitle && (
          <Text className="text-sm text-muted-foreground mt-0.5">{subtitle}</Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} className="text-muted-foreground" />
    </Pressable>
  );
}

export default function HomeScreen() {
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
      <View className="px-4 mb-8">
        <Image
          source={require("../../../assets/home/carousel/outbound-25-26-group.jpeg")}
          style={{ width: "100%", height: 220, borderRadius: 20 }}
          contentFit="cover"
        />
      </View>

      {/* Quick Access */}
      <View className="px-6">
        <Text className="text-xl font-bold text-foreground mb-4">Ontdek</Text>

        <View className="flex-row mb-1">
          <NavItem
            icon={<Ionicons name="list-outline" size={26} className="text-foreground" />}
            label="Programma"
            onPress={() => router.push("/programs")}
          />
          <NavItem
            icon={<Ionicons name="newspaper-outline" size={26} className="text-foreground" />}
            label="Nieuws"
            onPress={() => router.push("/news")}
          />
          <NavItem
            icon={<Ionicons name="calendar-outline" size={26} className="text-foreground" />}
            label="Kalender"
            onPress={() => router.push("/calendar")}
          />
        </View>

        <View className="flex-row">
          <NavItem
            icon={
              <MaterialCommunityIcons
                name="airplane-takeoff"
                size={26}
                className="text-foreground"
              />
            }
            label="Outbound"
            onPress={() => router.push("/students/outbound")}
          />
          <NavItem
            icon={
              <MaterialCommunityIcons
                name="airplane-landing"
                size={26}
                className="text-foreground"
              />
            }
            label="Inbound"
            onPress={() => router.push("/students/inbound")}
          />
          <NavItem
            icon={<Ionicons name="refresh-outline" size={26} className="text-foreground" />}
            label="Rebound"
            onPress={() => router.push("/students/rebound")}
          />
        </View>
      </View>

      {/* More */}
      <View className={`px-6 pt-8 ${Platform.OS === "android" ? "pb-28" : "pb-12"}`}>
        <Text className="text-xl font-bold text-foreground mb-2">Meer</Text>

        <LinkRow
          icon={<Fontisto name="tent" size={20} className="text-foreground" />}
          label="Zomerkampen"
          subtitle="Bekijk beschikbare kampen"
          onPress={() => router.push("/camps-tours")}
        />
        <Separator />
        <LinkRow
          icon={
            <Image
              source={require("../../../assets/logo/rotary-logo-icon.svg")}
              style={{ width: 22, height: 22 }}
              contentFit="contain"
            />
          }
          label="Voor Rotary Clubs"
          subtitle="Informatie voor clubs"
          onPress={() => router.push("/rotary-clubs")}
        />
      </View>
    </ScrollView>
  );
}