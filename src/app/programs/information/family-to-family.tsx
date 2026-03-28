import { ScrollView, View, Linking, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

export default function FamilyToFamilyInfoScreen() {
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
                <Ionicons name="home-outline" size={32} className="text-primary" />
              </View>
              <Text className="text-2xl font-bold text-center mb-2">Family to Family</Text>
              <Text className="text-base text-center text-muted-foreground leading-[22px] px-5">
                Korte uitwisseling tussen families in binnen- en buitenland
              </Text>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardContent className="p-5">
              <Text className="text-base leading-6 text-muted-foreground">
                Het Family to Family programma biedt jongeren de mogelijkheid om 2 tot 4 weken bij
                een gastgezin in het buitenland te verblijven, en daarna het gastgezin bij hen thuis
                te ontvangen.
              </Text>
            </CardContent>
          </Card>

          <Card className="mb-4 border-l-4 border-l-accent">
            <CardContent className="flex-row items-center p-5">
              <View className="w-[60px] h-[60px] rounded-full bg-accent/10 items-center justify-center mr-4">
                <Ionicons name="calendar" size={28} className="text-accent" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-accent">15 - 19 jaar</Text>
                <Text className="text-sm font-semibold">Leeftijdscategorie</Text>
              </View>
            </CardContent>
          </Card>

          <Button
            className="flex-row gap-2"
            onPress={() => Linking.openURL("mailto:familytofamily@rotaryyep.nl")}
          >
            <Ionicons name="mail-outline" size={24} color="#fff" />
            <Text className="text-white font-semibold">familytofamily@rotaryyep.nl</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
