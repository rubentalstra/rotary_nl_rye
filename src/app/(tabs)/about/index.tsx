import { ScrollView, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { aboutSections } from "@/lib/data/about";
import type { AboutSection } from "@/lib/types";

function AboutCard({ section }: { section: AboutSection }) {
  return (
    <Card className="mb-3">
      <CardContent className="p-3">
        {/* Header */}
        <View className="flex-row items-center mb-2">
          <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-2">
            <Ionicons
              name={section.icon as keyof typeof Ionicons.glyphMap}
              size={22}
              className="text-primary"
            />
          </View>
          <Text className="text-xl font-semibold flex-1">{section.title}</Text>
        </View>

        {/* Subtitle */}
        {section.subtitle && (
          <Text className="text-[15px] font-medium text-accent italic mb-2">
            {section.subtitle}
          </Text>
        )}

        {/* Content */}
        {section.content && (
          <Text className="text-[15px] leading-[22px] text-muted-foreground mb-2">
            {section.content}
          </Text>
        )}

        {/* List Items */}
        {section.listItems?.map((item) => (
          <View key={item.substring(0, 30)} className="flex-row items-start mb-2.5">
            <View className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 shrink-0" />
            <Text className="text-[15px] leading-[22px] text-muted-foreground flex-1">{item}</Text>
          </View>
        ))}

        {/* Quote */}
        {section.quote && (
          <>
            <Separator className="my-2" />
            <Text className="text-base leading-6 font-semibold italic text-center text-foreground">
              {section.quote}
            </Text>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function AboutScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className={`p-3 ${Platform.OS === "android" ? "pb-24" : "pb-10"}`}>
        {aboutSections.map((section) => (
          <AboutCard key={section.id} section={section} />
        ))}
      </View>
    </ScrollView>
  );
}
