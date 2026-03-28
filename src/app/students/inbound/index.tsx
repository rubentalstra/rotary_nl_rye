import { ScrollView, View, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  subtitle: string;
  icon: keyof typeof FontAwesome5.glyphMap;
  route: string;
  enabled?: boolean;
}

const longTermPrograms: NavItem[] = [
  {
    title: "Long Term Exchange Program",
    subtitle: "Year Exchange",
    icon: "calendar-alt",
    route: "/students/inbound/long-term",
    enabled: true,
  },
];

const shortTermPrograms: NavItem[] = [
  {
    title: "Zomerkampen",
    subtitle: "Zomerkampen & Culturele Programmas",
    icon: "campground",
    route: "/students/inbound/short-term/camps-and-tours",
    enabled: false,
  },
  {
    title: "Family to Family",
    subtitle: "Exchange between families",
    icon: "home",
    route: "/students/inbound/short-term/family-to-family",
    enabled: false,
  },
];

function NavCard({ item }: { item: NavItem }) {
  const handlePress = () => {
    if (!item.enabled) return;
    if (Platform.OS === "ios") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(item.route as any);
  };

  return (
    <Pressable onPress={handlePress} disabled={!item.enabled}>
      <Card className={cn("mb-3", !item.enabled && "opacity-50")}>
        <CardContent className="flex-row items-center p-4">
          <View className="w-11 h-11 rounded-full bg-primary/10 items-center justify-center mr-4">
            <FontAwesome5
              name={item.icon}
              size={20}
              className={item.enabled ? "text-primary" : "text-muted-foreground"}
            />
          </View>
          <View className="flex-1 mr-2">
            <Text className="text-base font-semibold leading-[22px]">{item.title}</Text>
            <Text className="text-[13px] text-muted-foreground">{item.subtitle}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} className="text-muted-foreground" />
        </CardContent>
      </Card>
    </Pressable>
  );
}

export default function InboundScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className="p-4 pb-8">
          {/* Intro */}
          <View className="mb-8">
            <Text className="text-2xl font-semibold text-primary mb-4">Inbounds</Text>
            <Text className="text-[15px] leading-[22px] text-muted-foreground">
              Wow, we're so excited that you will be our inbound exchange student for the coming
              year. For this to happen we will need some extra information so please watch your
              email inbox on a regular basis. Also you can find some further information in this
              app.
            </Text>
          </View>

          {/* Long Term */}
          <View className="mb-4">
            <Text className="text-lg font-semibold text-primary mb-2">
              Long Term Exchange Program
            </Text>
            <Separator className="mb-4" />
            {longTermPrograms.map((item) => (
              <NavCard key={item.title} item={item} />
            ))}
          </View>

          {/* Short Term */}
          <View>
            <Text className="text-lg font-semibold text-primary mb-2">
              Short Term Exchange Program
            </Text>
            <Separator className="mb-4" />
            {shortTermPrograms.map((item) => (
              <NavCard key={item.title} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
