import { ScrollView, View, Pressable, Linking, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CampsToursInfoScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className={`p-4 ${Platform.OS === "android" ? "pb-24" : "pb-8"}`}>
          <Card className="mb-5 items-center">
            <CardContent className="items-center p-5">
              <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-4">
                <Ionicons name="sunny-outline" size={32} className="text-primary" />
              </View>
              <Text className="text-2xl font-bold text-center mb-2">Zomerkampen</Text>
              <Text className="text-base text-center text-muted-foreground leading-[22px] px-5">
                Korte uitwisselingsprogramma's via zomerkampen wereldwijd
              </Text>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardContent className="p-5">
              <Text className="text-base leading-6 text-muted-foreground">
                Rotary Youth Exchange organiseert elk jaar zomerkampen in binnen- en buitenland. Dit
                zijn korte uitwisselingsprogramma's van 1-4 weken waarbij jongeren een andere
                cultuur leren kennen.
              </Text>
            </CardContent>
          </Card>

          <Card className="mb-4 border-l-4 border-l-accent">
            <CardContent className="flex-row items-center p-5">
              <View className="w-[60px] h-[60px] rounded-full bg-accent/10 items-center justify-center mr-4">
                <Ionicons name="calendar" size={28} className="text-accent" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-accent">16 - 25 jaar</Text>
                <Text className="text-sm font-semibold">Leeftijdscategorie</Text>
              </View>
            </CardContent>
          </Card>

          <Button
            className="flex-row gap-2"
            onPress={() => Linking.openURL("mailto:campsandtours@rotaryyep.nl")}
          >
            <Ionicons name="mail-outline" size={24} color="#fff" />
            <Text className="text-white font-semibold">campsandtours@rotaryyep.nl</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
