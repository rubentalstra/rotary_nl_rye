import { ScrollView, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { aboutSections } from "@/lib/data/about";
import type { AboutSection } from "@/lib/types";

function SectionBlock({ section }: { section: AboutSection }) {
  return (
    <View className="mb-8">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <View className="w-11 h-11 rounded-2xl bg-primary/10 items-center justify-center mr-3">
          <Ionicons
            name={section.icon as keyof typeof Ionicons.glyphMap}
            size={22}
            className="text-primary"
          />
        </View>
        <Text className="text-xl font-bold text-foreground flex-1">{section.title}</Text>
      </View>

      {/* Subtitle */}
      {section.subtitle && (
        <Text className="text-[15px] font-medium text-primary/70 italic mb-3 ml-14">
          {section.subtitle}
        </Text>
      )}

      {/* Content */}
      {section.content && (
        <Text className="text-[15px] leading-[24px] text-muted-foreground mb-4 ml-14">
          {section.content}
        </Text>
      )}

      {/* List Items */}
      {section.listItems && (
        <View className="ml-14">
          {section.listItems.map((item, idx) => (
            <View key={idx} className="flex-row items-start mb-3">
              <View className="w-[6px] h-[6px] rounded-full bg-primary mt-[9px] mr-3 shrink-0" />
              <Text className="text-[15px] leading-[24px] text-muted-foreground flex-1">
                {item}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Quote */}
      {section.quote && (
        <View className="ml-14 mt-4 pt-4 border-t border-border">
          <Text className="text-base leading-6 font-semibold italic text-center text-foreground">
            {section.quote}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function AboutScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className={`px-5 pt-6 ${Platform.OS === "android" ? "pb-[100px]" : "pb-10"}`}>
        {aboutSections.map((section, idx) => (
          <View key={section.id}>
            {idx > 0 && <Separator className="mb-8" />}
            <SectionBlock section={section} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
