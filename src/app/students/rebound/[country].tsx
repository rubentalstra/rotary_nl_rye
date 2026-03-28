import { useCallback } from "react";
import { View, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { reboundStudents } from "@/lib/data/students-rebound";
import type { Student } from "@/lib/types";

export default function ReboundCountryScreen() {
  const { country } = useLocalSearchParams<{ country: string }>();
  const students = reboundStudents.filter((s) => s.hostCountryCode === country);

  const handlePress = useCallback((student: Student) => {
    router.push({
      pathname: "/students/rebound/student-detail",
      params: { id: student.id },
    } as any);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <FlashList
        data={students}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item)}>
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
      />
    </SafeAreaView>
  );
}
