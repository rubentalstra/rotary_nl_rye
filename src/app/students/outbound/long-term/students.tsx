import { useCallback } from "react";
import { View, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { outboundStudents } from "@/lib/data/students-outbound";
import { getFlagAsset, getCountryName } from "@/lib/utils/flags";
import { groupByHostCountry } from "@/lib/types";
import type { Student } from "@/lib/types";

const countryGroups = groupByHostCountry(outboundStudents);

export default function OutboundStudentsScreen() {
  const handleStudentPress = useCallback((student: Student) => {
    router.push({
      pathname: "/students/outbound/long-term/student-detail",
      params: { id: student.id, name: student.name },
    } as any);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <FlashList
        data={outboundStudents}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleStudentPress(item)}>
            <Card className="mb-2 mx-4">
              <CardContent className="flex-row items-center p-3">
                <Avatar alt={item.name} className="h-12 w-12 mr-3">
                  {item.imageUrl ? <AvatarImage source={{ uri: item.imageUrl }} /> : null}
                  <AvatarFallback>
                    <Text className="text-sm font-medium">
                      {item.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)}
                    </Text>
                  </AvatarFallback>
                </Avatar>
                <View className="flex-1">
                  <Text className="text-base font-semibold">{item.name}</Text>
                  <View className="flex-row items-center gap-1 mt-0.5">
                    {getFlagAsset(item.hostCountryCode) && (
                      <Image
                        source={getFlagAsset(item.hostCountryCode)!}
                        style={{ width: 16, height: 12, borderRadius: 1 }}
                      />
                    )}
                    <Text className="text-sm text-muted-foreground">
                      {getCountryName(item.hostCountryCode)}
                    </Text>
                  </View>
                </View>
              </CardContent>
            </Card>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingTop: 12,
          paddingBottom: Platform.OS === "android" ? 100 : 40,
        }}
        ListHeaderComponent={
          <View className="px-4 pb-3">
            <Text className="text-sm text-muted-foreground">
              {outboundStudents.length} students · {countryGroups.length} countries
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
