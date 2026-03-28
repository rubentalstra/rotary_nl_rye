import { useState } from "react";
import { ScrollView, View, Pressable, Linking, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const exchangeImages = [
  { id: 1, source: require("@/assets/pictures/outbound.jpeg") },
  { id: 2, source: require("@/assets/pictures/outbound-arrive.jpeg") },
  { id: 3, source: require("@/assets/pictures/outbound-nilla.jpeg") },
  { id: 4, source: require("@/assets/pictures/outbound-simon.jpeg") },
];

const whyReasons = [
  {
    title: "Internationale ervaring",
    bullets: [
      "Jongeren leren een nieuwe cultuur, taal en manier van leven kennen",
      "Het vergroot hun wereldbeeld en respect voor diversiteit",
    ],
  },
  {
    title: "Persoonlijke ontwikkeling",
    bullets: [
      "Zelfstandigheid, zelfvertrouwen en verantwoordelijkheid nemen",
      "Aanpassen aan nieuwe situaties en omgaan met uitdagingen",
    ],
  },
  {
    title: "Taalontwikkeling",
    bullets: [
      "Door dagelijks contact met de taal van het gastland, leren jongeren snel en effectief communiceren",
    ],
  },
  {
    title: "Onderwijs en culturele verrijking",
    bullets: [
      "Scholing in het gastland én vaak ook het geven van presentaties over de eigen cultuur",
      "Wederzijdse uitwisseling van kennis en gebruiken",
    ],
  },
  {
    title: "Rotary netwerk",
    bullets: [
      "Betrouwbare begeleiding: jongeren verblijven bij gastgezinnen die door Rotary zorgvuldig zijn geselecteerd",
      "Ondersteuning van lokale Rotaryclubs en toegang tot een wereldwijd netwerk van contacten",
    ],
  },
  {
    title: "Vriendschappen voor het leven",
    bullets: [
      "Contacten met mensen uit het gastland én met andere uitwisselingsstudenten van over de hele wereld",
      "Rotary Youth Exchange draait om vrede, begrip en vriendschap tussen culturen",
    ],
  },
];

export default function LongTermExchangeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className={`p-3 ${Platform.OS === "android" ? "pb-24" : "pb-8"}`}>
          {/* Header */}
          <Card className="mb-5 items-center">
            <CardContent className="items-center p-5">
              <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-4">
                <Ionicons name="school-outline" size={32} className="text-primary" />
              </View>
              <Text className="text-2xl font-bold text-center mb-2">Long Term Exchange</Text>
              <Text className="text-base text-center text-muted-foreground leading-[22px] px-5">
                Een jaar High School in het buitenland via Rotary International
              </Text>
            </CardContent>
          </Card>

          {/* What is it */}
          <View className="mb-6">
            <View className="flex-row items-center mb-3 px-1">
              <Ionicons name="help-circle-outline" size={24} className="text-primary" />
              <Text className="text-xl font-bold ml-3">Wat houdt dat in?</Text>
            </View>
            <Card>
              <CardContent className="p-5">
                <Text className="text-base leading-6 text-muted-foreground">
                  Dit programma van Rotary International is bestemd voor alle hierin geïnteresseerde
                  scholieren uit het Voortgezet Onderwijs. Het is de bedoeling dat je in het
                  buitenland een jaar High School volgt.
                </Text>
              </CardContent>
            </Card>
          </View>

          {/* Age */}
          <Card className="mb-6 border-l-4 border-l-accent">
            <CardContent className="flex-row items-center p-5">
              <View className="w-[60px] h-[60px] rounded-full bg-accent/10 items-center justify-center mr-4">
                <Ionicons name="calendar" size={28} className="text-accent" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-accent">15,5 - 18,5 jaar</Text>
                <Text className="text-sm font-semibold">Indicatieve leeftijdsgrenzen</Text>
                <Text className="text-xs text-muted-foreground italic">
                  Selectiedag in oktober + selectieweekend in november
                </Text>
              </View>
            </CardContent>
          </Card>

          {/* Countries */}
          <View className="mb-6">
            <View className="flex-row items-center mb-3 px-1">
              <Ionicons name="earth-outline" size={24} className="text-primary" />
              <Text className="text-xl font-bold ml-3">Met welke landen?</Text>
            </View>
            <Card>
              <CardContent className="p-5">
                <View className="mb-4">
                  <Text className="text-base font-semibold mb-2">Noordelijk halfrond</Text>
                  <Text className="text-sm text-muted-foreground leading-5">
                    USA, Canada, Mexico, India, Indonesië, Japan, Thailand, Taiwan en diverse
                    Europese landen
                  </Text>
                </View>
                <Separator className="my-2" />
                <View>
                  <Text className="text-base font-semibold mb-2">Zuidelijk halfrond</Text>
                  <Text className="text-sm text-muted-foreground leading-5">
                    Brazilië, Chili, Argentinië, Ecuador, Peru
                  </Text>
                </View>
              </CardContent>
            </Card>
          </View>

          {/* Gallery */}
          <View className="mb-6">
            <View className="flex-row items-center mb-3 px-1">
              <Ionicons name="images-outline" size={24} className="text-primary" />
              <Text className="text-xl font-bold ml-3">Exchange Pictures</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pr-10">
              {exchangeImages.map((image) => (
                <Image
                  key={image.id}
                  source={image.source}
                  style={{ width: 200, height: 150, marginRight: 12, borderRadius: 8 }}
                  contentFit="cover"
                />
              ))}
            </ScrollView>
          </View>

          {/* Costs */}
          <View className="mb-6">
            <View className="flex-row items-center mb-3 px-1">
              <Ionicons name="card-outline" size={24} className="text-primary" />
              <Text className="text-xl font-bold ml-3">Kosten</Text>
            </View>
            <Card className="border-l-4 border-l-secondary bg-secondary/5">
              <CardContent className="items-center p-5">
                <Text className="text-2xl font-bold text-secondary">Vanaf €2.400</Text>
                <Text className="text-sm text-muted-foreground text-center">
                  Exclusief BTW, verzekering, ticket kosten etc.
                </Text>
              </CardContent>
            </Card>
          </View>

          {/* Registration */}
          <View className="mb-6">
            <View className="flex-row items-center mb-3 px-1">
              <Ionicons name="person-outline" size={24} className="text-primary" />
              <Text className="text-xl font-bold ml-3">Aanmelden</Text>
            </View>
            <Button
              className="flex-row gap-2"
              onPress={() => Linking.openURL("mailto:interesse@rotaryyep.nl")}
            >
              <Ionicons name="mail-outline" size={24} color="#fff" />
              <Text className="text-white font-semibold">interesse@rotaryyep.nl</Text>
            </Button>
          </View>

          {/* Why Rotary */}
          <View>
            <View className="flex-row items-center mb-3 px-1">
              <Ionicons name="heart-outline" size={24} className="text-primary" />
              <Text className="text-xl font-bold ml-3">Waarom Rotary Youth Exchange?</Text>
            </View>
            {whyReasons.map((reason, idx) => (
              <Card key={idx} className="mb-3 border-l-4 border-l-primary">
                <CardContent className="p-5">
                  <View className="flex-row items-center mb-4">
                    <View className="w-8 h-8 rounded-full bg-primary items-center justify-center mr-3">
                      <Text className="text-base font-bold text-primary-foreground">{idx + 1}</Text>
                    </View>
                    <Text className="text-lg font-semibold flex-1">{reason.title}</Text>
                  </View>
                  <View className="pl-11">
                    {reason.bullets.map((bullet, bIdx) => (
                      <View key={bIdx} className="flex-row items-start mb-2">
                        <View className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3" />
                        <Text className="text-base leading-[22px] text-muted-foreground flex-1">
                          {bullet}
                        </Text>
                      </View>
                    ))}
                  </View>
                </CardContent>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
