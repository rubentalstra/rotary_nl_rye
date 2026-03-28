import { ScrollView, View, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

const menuItems = [
  {
    title: "Hoe aanmelden",
    subtitle: "Stap-voor-stap aanmeldingsproces",
    icon: "edit",
    route: "/students/outbound/short-term/family-to-family/how-to-sign-up",
  },
  {
    title: "Landen & Voorkeur",
    subtitle: "Beschikbare bestemmingen en hoe te kiezen",
    icon: "globe-americas",
    route: "/students/outbound/short-term/family-to-family/countries-preference",
  },
  {
    title: "Vereisten",
    subtitle: "Regels en richtlijnen om te volgen",
    icon: "shield-alt",
    route: "/students/outbound/short-term/family-to-family/comply-with",
  },
] as const;

export default function FamilyToFamilyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className="p-4 pb-8">
          <Text className="text-2xl font-semibold text-primary mb-4">Family to Family</Text>
          <Text className="text-[15px] leading-[22px] text-muted-foreground mb-6">
            Informatie over het Family to Family uitwisselingsprogramma.
          </Text>
          {menuItems.map((item) => (
            <Pressable
              key={item.route}
              onPress={() => {
                if (Platform.OS === "ios") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push(item.route as any);
              }}
            >
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
