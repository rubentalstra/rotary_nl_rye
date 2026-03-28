import { useMemo } from "react";
import { ScrollView, View, Pressable, Platform, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation, router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { algemeneInformatieContent } from "@/lib/data/rotary-clubs/algemene-informatie";
import { counselorContent } from "@/lib/data/rotary-clubs/counselor";
import { documentenContent } from "@/lib/data/rotary-clubs/documenten";
import { gastgezinContent } from "@/lib/data/rotary-clubs/gastgezin";
import { jeugdcommissarisContent } from "@/lib/data/rotary-clubs/jeugdcommissaris";
import type { SectionPageContent } from "@/lib/types";

const sectionMap: Record<string, SectionPageContent> = {
  "algemene-informatie": algemeneInformatieContent,
  counselor: counselorContent,
  documenten: documentenContent,
  gastgezin: gastgezinContent,
  jeugdcommissaris: jeugdcommissarisContent,
};

export default function RotaryClubSectionScreen() {
  const { section } = useLocalSearchParams<{ section: string }>();
  const navigation = useNavigation();
  const content = useMemo(() => sectionMap[section ?? ""], [section]);

  useLayoutEffect(() => {
    if (content) navigation.setOptions({ title: content.title });
  }, [navigation, content]);

  if (!content) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center" edges={["bottom"]}>
        <Text className="text-xl font-semibold text-destructive">Sectie niet gevonden</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className={`p-4 ${Platform.OS === "android" ? "pb-24" : "pb-8"}`}>
          <Text className="text-2xl font-bold text-primary mb-2">{content.title}</Text>
          {content.description && (
            <Text className="text-base text-muted-foreground mb-4">{content.description}</Text>
          )}

          {content.type === "info" &&
            content.infoSections?.map((section) => (
              <Card key={section.id} className="mb-3">
                <CardContent className="p-4">
                  <Text className="text-lg font-semibold mb-2">{section.title}</Text>
                  <Text className="text-base leading-6 text-muted-foreground">
                    {section.content}
                  </Text>
                </CardContent>
              </Card>
            ))}

          {content.type === "documents" &&
            content.documents?.map((doc) => (
              <Pressable
                key={doc.id}
                onPress={() =>
                  router.push({
                    pathname: "/pdf-viewer",
                    params: { url: doc.pdfUrl, title: doc.title },
                  })
                }
              >
                <Card className="mb-3">
                  <CardContent className="flex-row items-center p-4">
                    <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
                      <FontAwesome5 name={doc.icon} size={16} className="text-primary" />
                    </View>
                    <Text className="text-base font-semibold flex-1">{doc.title}</Text>
                  </CardContent>
                </Card>
              </Pressable>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
