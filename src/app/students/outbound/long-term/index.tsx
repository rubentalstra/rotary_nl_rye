import { ScrollView, View, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";

const classItems = [
  {
    title: "Huidige Studenten",
    subtitle: "Onze studenten in het buitenland dit jaar",
    icon: "users",
    route: "/students/outbound/long-term/students",
  },
] as const;

const infoItems = [
  {
    title: "Hoe meld ik me aan?",
    subtitle: "Volledige aanmeldprocedure en vereisten",
    icon: "edit",
    route: "/students/outbound/long-term/how-to-sign-up",
  },
  {
    title: "Selectie dag",
    subtitle: "Wat je kunt verwachten tijdens het selectieproces",
    icon: "calendar-day",
    route: "/students/outbound/long-term/selection-day",
  },
  {
    title: "Selectie weekend",
    subtitle: "Finale selectieweekend activiteiten en verwachtingen",
    icon: "calendar-week",
    route: "/students/outbound/long-term/selection-weekend",
  },
  {
    title: "Goede top 3 van landen",
    subtitle: "Hoe kies je jouw voorkeursbestemmingen",
    icon: "globe-americas",
    route: "/students/outbound/long-term/top-3-countries",
  },
  {
    title: "Waar moet ik aan voldoen?",
    subtitle: "Regels en richtlijnen voor uitwisselingsstudenten",
    icon: "shield-alt",
    route: "/students/outbound/long-term/comply-with",
  },
] as const;

function MenuItem({
  title,
  subtitle,
  icon,
  route,
}: {
  title: string;
  subtitle: string;
  icon: string;
  route: string;
}) {
  return (
    <Pressable
      onPress={() => {
        if (Platform.OS === "ios") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push(route as any);
      }}
    >
      <Card className="mb-3">
        <CardContent className="flex-row items-center p-4">
          <View className="w-11 h-11 rounded-full bg-primary/10 items-center justify-center mr-4">
            <FontAwesome5 name={icon} size={18} className="text-primary" />
          </View>
          <View className="flex-1 mr-2">
            <Text className="text-base font-semibold">{title}</Text>
            <Text className="text-[13px] text-muted-foreground">{subtitle}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} className="text-muted-foreground" />
        </CardContent>
      </Card>
    </Pressable>
  );
}

export default function OutboundLongTermScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className="p-4 pb-8">
          <Text className="text-lg font-semibold text-primary mb-2">Klas van 25-26</Text>
          <Separator className="mb-4" />
          {classItems.map((item) => (
            <MenuItem key={item.route} {...item} />
          ))}

          <Text className="text-lg font-semibold text-primary mb-2 mt-4">Informatie</Text>
          <Separator className="mb-4" />
          {infoItems.map((item) => (
            <MenuItem key={item.route} {...item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
