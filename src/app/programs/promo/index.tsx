import { ScrollView, View, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

const items = [
  {
    title: "Podcast",
    subtitle: "Luister naar onze exchange verhalen",
    icon: "podcast",
    route: "/programs/promo/podcast",
  },
  {
    title: "Video",
    subtitle: "Bekijk onze promo video",
    icon: "video",
    route: "/programs/promo/video",
  },
] as const;

export default function PromoScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className={`p-4 ${Platform.OS === "android" ? "pb-24" : "pb-8"}`}>
          <Text className="text-2xl font-semibold text-primary mb-4">Promo Materiaal</Text>
          {items.map((item) => (
            <Pressable key={item.route} onPress={() => router.push(item.route as any)}>
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
