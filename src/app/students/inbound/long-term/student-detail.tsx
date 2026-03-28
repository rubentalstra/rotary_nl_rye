import { useLayoutEffect, useMemo } from "react";
import { ScrollView, View, Linking, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { inboundStudents } from "@/lib/data/students-inbound";
import { getFlagAsset, getCountryName } from "@/lib/utils/flags";

export default function InboundStudentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  const student = useMemo(() => inboundStudents.find((s) => s.id === id), [id]);

  useLayoutEffect(() => {
    if (student) navigation.setOptions({ title: student.name });
  }, [navigation, student]);

  if (!student) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center" edges={["bottom"]}>
        <Text className="text-xl font-semibold text-destructive">Student niet gevonden</Text>
      </SafeAreaView>
    );
  }

  const flagAsset = getFlagAsset(student.homeCountryCode);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic">
        <View className="p-4 pb-8">
          {/* Profile Header */}
          <View className="items-center mb-6">
            {student.imageUrl ? (
              <Image
                source={{ uri: student.imageUrl }}
                style={{ width: 120, height: 120, borderRadius: 60 }}
                contentFit="cover"
              />
            ) : (
              <View className="w-[120px] h-[120px] rounded-full bg-primary/10 items-center justify-center">
                <Text className="text-3xl font-bold text-primary">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)}
                </Text>
              </View>
            )}
            <Text className="text-2xl font-bold mt-4">{student.name}</Text>
            <View className="flex-row items-center gap-2 mt-1">
              {flagAsset && (
                <Image source={flagAsset} style={{ width: 20, height: 15, borderRadius: 2 }} />
              )}
              <Text className="text-base text-muted-foreground">
                {getCountryName(student.homeCountryCode)}
              </Text>
            </View>
          </View>

          {/* Bio */}
          {student.bio && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <Text className="text-base leading-6 text-muted-foreground">{student.bio}</Text>
              </CardContent>
            </Card>
          )}

          {/* Contact */}
          <View className="gap-2">
            {student.email && (
              <Button
                variant="secondary"
                onPress={() => Linking.openURL(`mailto:${student.email}`)}
              >
                <Text>E-mail</Text>
              </Button>
            )}
            {student.socialMedia?.instagram && (
              <Button
                variant="outline"
                onPress={() =>
                  Linking.openURL(`https://instagram.com/${student.socialMedia!.instagram}`)
                }
              >
                <Text>Instagram</Text>
              </Button>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
