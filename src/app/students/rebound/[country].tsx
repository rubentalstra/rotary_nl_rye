import { useCallback } from "react";
import { View, Pressable, Platform, FlatList } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { reboundStudents } from "@/lib/data/students-rebound";
import type { Student } from "@/lib/types";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export default function ReboundCountryScreen() {
  const { country } = useLocalSearchParams<{ country: string }>();
  const students = reboundStudents.filter((s) => s.hostCountryCode === country);

  const handlePress = useCallback((student: Student) => {
    router.push({
      pathname: "/students/rebound/student-detail",
      params: { id: student.id },
    } as never);
  }, []);

  return (
    <View style={{ flex: 1 }} className="bg-background">
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "android" ? 100 : 40,
          flexGrow: 1,
        }}
        ItemSeparatorComponent={() => (
          <View className="ml-[80px] mr-5">
            <Separator />
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handlePress(item)}
            className="flex-row items-center px-5 py-4 active:opacity-60"
          >
            <Avatar alt={item.name} className="h-14 w-14 mr-4">
              {item.imageUrl ? <AvatarImage source={{ uri: item.imageUrl }} /> : null}
              <AvatarFallback>
                <Text className="text-base font-semibold">{getInitials(item.name)}</Text>
              </AvatarFallback>
            </Avatar>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-foreground">{item.name}</Text>
              {item.year && (
                <Text className="text-base text-muted-foreground">Class of {item.year}</Text>
              )}
            </View>
            <Ionicons name="chevron-forward" size={18} className="text-muted-foreground" />
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-16">
            <Text className="text-base text-muted-foreground">Geen studenten gevonden</Text>
          </View>
        }
      />
    </View>
  );
}
