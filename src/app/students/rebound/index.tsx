import { ScrollView, View, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { reboundStudents } from "@/lib/data/students-rebound";
import { getFlagAsset, getCountryName } from "@/lib/utils/flags";
import { groupByHostCountry } from "@/lib/types";

const countryGroups = groupByHostCountry(reboundStudents);

export default function ReboundScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className={`p-4 ${Platform.OS === "android" ? "pb-24" : "pb-8"}`}>
          <Text className="text-2xl font-semibold text-primary mb-4">Rebound</Text>
          <Text className="text-[15px] leading-[22px] text-muted-foreground mb-6">
            Teruggekeerde exchange studenten, gesorteerd op land.
          </Text>
          {countryGroups.map((group) => {
            const flagAsset = getFlagAsset(group.countryCode);
            return (
              <Pressable
                key={group.countryCode}
                onPress={() =>
                  router.push({
                    pathname: "/students/rebound/[country]",
                    params: { country: group.countryCode },
                  } as any)
                }
              >
                <Card className="mb-3">
                  <CardContent className="flex-row items-center p-4">
                    {flagAsset && (
                      <Image
                        source={flagAsset}
                        style={{ width: 32, height: 24, borderRadius: 3, marginRight: 12 }}
                      />
                    )}
                    <View className="flex-1">
                      <Text className="text-base font-semibold">
                        {getCountryName(group.countryCode)}
                      </Text>
                      <Text className="text-sm text-muted-foreground">
                        {group.students.length} student
                        {group.students.length !== 1 ? "s" : ""}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} className="text-muted-foreground" />
                  </CardContent>
                </Card>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
