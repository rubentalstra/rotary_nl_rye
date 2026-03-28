import { ScrollView, View, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { clubSections, introText } from "@/lib/data/rotary-clubs/navigation";

export default function RotaryClubsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className={`p-4 ${Platform.OS === "android" ? "pb-24" : "pb-8"}`}>
          <Text className="text-2xl font-semibold text-primary mb-4">Voor Rotary Clubs</Text>
          <Text className="text-[15px] leading-[22px] text-muted-foreground mb-6">{introText}</Text>
          {clubSections.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => {
                if (Platform.OS === "ios") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push({
                  pathname: "/rotary-clubs/[section]",
                  params: { section: item.id },
                } as any);
              }}
            >
              <Card className="mb-3">
                <CardContent className="flex-row items-center p-4">
                  <View className="w-11 h-11 rounded-full bg-primary/10 items-center justify-center mr-4">
                    <FontAwesome5 name={item.icon} size={18} className="text-primary" />
                  </View>
                  <View className="flex-1 mr-2">
                    <Text className="text-base font-semibold">{item.title}</Text>
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
