import { ScrollView, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { aboutSections } from "@/lib/data/about";
import type { AboutSection } from "@/lib/types";

export default function AboutScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className={`p-4 ${Platform.OS === "android" ? "pb-24" : "pb-10"}`}>
        {/* Header */}
        <View className="items-center mb-6">
          <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-3">
            <Ionicons name="information-circle" size={32} className="text-primary" />
          </View>
          <Text variant="h2" className="text-center">
            Over Ons
          </Text>
          <Text variant="muted" className="text-center mt-1">
            Rotary Youth Exchange Netherlands
          </Text>
        </View>

        {/* Accordion Sections */}
        <Accordion type="multiple" defaultValue={["wie-zijn-wij"]}>
          {aboutSections.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger>
                <View className="flex-row items-center gap-3">
                  <View className="w-9 h-9 rounded-full bg-primary/10 items-center justify-center">
                    <Ionicons
                      name={section.icon as keyof typeof Ionicons.glyphMap}
                      size={18}
                      className="text-primary"
                    />
                  </View>
                  <Text className="text-lg font-semibold flex-1">{section.title}</Text>
                </View>
              </AccordionTrigger>
              <AccordionContent>
                <View className="pt-2">
                  {/* Subtitle */}
                  {section.subtitle && (
                    <Text variant="muted" className="italic mb-3">
                      {section.subtitle}
                    </Text>
                  )}

                  {/* Content */}
                  {section.content && (
                    <Text variant="p" className="mb-3">
                      {section.content}
                    </Text>
                  )}

                  {/* List Items */}
                  {section.listItems?.map((item, idx) => (
                    <View key={idx} className="flex-row items-start mb-2.5">
                      <View className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 shrink-0" />
                      <Text variant="p" className="flex-1">
                        {item}
                      </Text>
                    </View>
                  ))}

                  {/* Quote */}
                  {section.quote && (
                    <>
                      <Separator className="my-3" />
                      <Text variant="blockquote">{section.quote}</Text>
                    </>
                  )}
                </View>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </View>
    </ScrollView>
  );
}
