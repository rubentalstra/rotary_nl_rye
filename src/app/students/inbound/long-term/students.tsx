import { useCallback } from "react";
import { View, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { inboundStudents } from "@/lib/data/students-inbound";
import { getFlagAsset, getCountryName } from "@/lib/utils/flags";
import { groupByHomeCountry } from "@/lib/types";
import type { Student } from "@/lib/types";

const countryGroups = groupByHomeCountry(inboundStudents);
const allStudents = countryGroups.flatMap((g) =>
  g.students.map((s, idx) => ({
    ...s,
    isFirstInGroup: idx === 0,
    countryName: getCountryName(g.countryCode),
    countryCode: g.countryCode,
  })),
);

function StudentCard({ student, onPress }: { student: Student; onPress: () => void }) {
  const flagAsset = getFlagAsset(student.homeCountryCode);
  return (
    <Pressable onPress={onPress}>
      <Card className="mb-2 mx-4">
        <CardContent className="flex-row items-center p-3">
          <Avatar alt={student.name} className="h-12 w-12 mr-3">
            {student.imageUrl ? <AvatarImage source={{ uri: student.imageUrl }} /> : null}
            <AvatarFallback>
              <Text className="text-sm font-medium">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)}
              </Text>
            </AvatarFallback>
          </Avatar>
          <View className="flex-1">
            <Text className="text-base font-semibold">{student.name}</Text>
            <View className="flex-row items-center gap-1 mt-0.5">
              {flagAsset && (
                <Image source={flagAsset} style={{ width: 16, height: 12, borderRadius: 1 }} />
              )}
              <Text className="text-sm text-muted-foreground">
                {getCountryName(student.homeCountryCode)}
              </Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </Pressable>
  );
}

export default function InboundStudentsScreen() {
  const handleStudentPress = useCallback((student: Student) => {
    router.push({
      pathname: "/students/inbound/long-term/student-detail",
      params: { id: student.id, name: student.name },
    } as any);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <FlashList
        data={inboundStudents}
        renderItem={({ item }) => (
          <StudentCard student={item} onPress={() => handleStudentPress(item)} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingTop: 12,
          paddingBottom: Platform.OS === "android" ? 100 : 40,
        }}
        ListHeaderComponent={
          <View className="px-4 pb-3">
            <Text className="text-sm text-muted-foreground">
              {inboundStudents.length} students · {countryGroups.length} countries
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
