import { ScrollView, View, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

const menuItems = [
  {
    title: "Class of 2025-26",
    subtitle: "Meet the incoming exchange students",
    icon: "users",
    route: "/students/inbound/long-term/students",
  },
  {
    title: "Welcome to the Netherlands!",
    subtitle: "Important information for new students",
    icon: "door-open",
    route: "/students/inbound/long-term/welcome",
  },
  {
    title: "Flight and Arrival",
    subtitle: "Information about traveling to the Netherlands",
    icon: "plane",
    route: "/students/inbound/long-term/flight-arrival",
  },
  {
    title: "Language",
    subtitle: "Learning Dutch and language assistance",
    icon: "language",
    route: "/students/inbound/long-term/language",
  },
  {
    title: "Insurance",
    subtitle: "Healthcare and insurance information",
    icon: "umbrella",
    route: "/students/inbound/long-term/insurance",
  },
  {
    title: "Travel",
    subtitle: "Tips for exploring the Netherlands and Europe",
    icon: "passport",
    route: "/students/inbound/long-term/travel",
  },
] as const;

export default function InboundLongTermScreen() {
  const handlePress = (route: string) => {
    if (Platform.OS === "ios") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(route as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className="p-4 pb-8">
          {menuItems.map((item) => (
            <Pressable key={item.route} onPress={() => handlePress(item.route)}>
              <Card className="mb-3">
                <CardContent className="flex-row items-center p-4">
                  <View className="w-11 h-11 rounded-full bg-primary/10 items-center justify-center mr-4">
                    <FontAwesome5 name={item.icon} size={18} className="text-primary" />
                  </View>
                  <View className="flex-1 mr-2">
                    <Text className="text-base font-semibold">{item.title}</Text>
                    <Text className="text-[13px] text-muted-foreground">{item.subtitle}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} className="text-muted-foreground" />
                </CardContent>
              </Card>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
