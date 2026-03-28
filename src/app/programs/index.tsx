import { ScrollView, View, Pressable, Platform } from "react-native";
import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { programSections, introText } from "@/lib/data/programs";
import type { ProgramItem } from "@/lib/types";

function ProgramCard({ program, onPress }: { program: ProgramItem; onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Card className="mb-3">
        <CardContent className="flex-row items-center p-4">
          <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
            <FontAwesome5 name={program.icon} size={18} className="text-primary" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold">{program.title}</Text>
            {program.subtitle && (
              <Text className="text-sm text-muted-foreground">{program.subtitle}</Text>
            )}
          </View>
          <FontAwesome5 name="chevron-right" size={14} className="text-muted-foreground" />
        </CardContent>
      </Card>
    </Pressable>
  );
}

export default function ProgramsScreen() {
  const handlePress = (route: string) => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(route as any);
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className={`p-3 ${Platform.OS === "android" ? "pb-24" : "pb-10"}`}>
        {/* Intro */}
        <View className="mb-6">
          <Text className="text-2xl font-semibold text-primary mb-3">Programma's</Text>
          <Text className="text-[15px] leading-[22px] text-muted-foreground">{introText}</Text>
        </View>

        {/* Sections */}
        {programSections.map((section, idx) => (
          <View key={section.id} className={idx > 0 ? "mt-4" : ""}>
            <Text className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2 ml-1">
              {section.title}
            </Text>
            {section.items.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onPress={() => handlePress(program.route)}
              />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
