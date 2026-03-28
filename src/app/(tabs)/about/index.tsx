import { ScrollView, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { aboutSections } from "@/lib/data/about";

export default function AboutScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className={`px-6 pt-6 ${Platform.OS === "android" ? "pb-28" : "pb-12"}`}>
        {aboutSections.map((section, idx) => (
          <View key={section.id}>
            {idx > 0 && <Separator className="my-6" />}

            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                <Ionicons
                  name={section.icon as keyof typeof Ionicons.glyphMap}
                  size={20}
                  className="text-primary"
                />
              </View>
              <Text className="text-xl font-bold text-foreground">{section.title}</Text>
            </View>

            {section.subtitle && (
              <Text className="text-base text-primary/80 italic mb-3">
                {section.subtitle}
              </Text>
            )}

            {section.content && (
              <Text className="text-base leading-7 text-muted-foreground mb-4">
                {section.content}
              </Text>
            )}

            {section.listItems?.map((item, itemIdx) => (
              <View key={itemIdx} className="flex-row items-start mb-3">
                <View className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 mr-3 shrink-0" />
                <Text className="text-base leading-7 text-muted-foreground flex-1">
                  {item}
                </Text>
              </View>
            ))}

            {section.quote && (
              <View className="mt-4 border-l-2 border-primary/30 pl-4">
                <Text className="text-lg italic text-foreground leading-7">
                  {section.quote}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
