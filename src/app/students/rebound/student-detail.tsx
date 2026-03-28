import { useLayoutEffect, useMemo } from "react";
import { ScrollView, View, Pressable, Linking } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { reboundStudents } from "@/lib/data/students-rebound";
import { getFlagAsset, getCountryName } from "@/lib/utils/flags";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export default function ReboundStudentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const student = useMemo(() => reboundStudents.find((s) => s.id === id), [id]);

  useLayoutEffect(() => {
    if (student) navigation.setOptions({ title: student.name });
  }, [navigation, student]);

  if (!student) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-6">
        <Ionicons name="person-outline" size={48} className="text-muted-foreground mb-4" />
        <Text className="text-xl font-semibold text-foreground">Student niet gevonden</Text>
      </View>
    );
  }

  const flagAsset = getFlagAsset(student.hostCountryCode);

  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="px-5 pt-6 pb-10">
        {/* Profile */}
        <View className="items-center mb-8">
          {student.imageUrl ? (
            <Image
              source={{ uri: student.imageUrl }}
              style={{ width: 120, height: 120, borderRadius: 60 }}
              contentFit="cover"
            />
          ) : (
            <View className="w-[120px] h-[120px] rounded-full bg-muted items-center justify-center">
              <Text className="text-3xl font-bold text-muted-foreground">
                {getInitials(student.name)}
              </Text>
            </View>
          )}
          <Text className="text-2xl font-bold text-foreground mt-4">{student.name}</Text>
          <View className="flex-row items-center gap-2 mt-1.5">
            {flagAsset && (
              <Image source={flagAsset} style={{ width: 20, height: 15, borderRadius: 2 }} />
            )}
            <Text className="text-base text-muted-foreground">
              {getCountryName(student.hostCountryCode)}
            </Text>
          </View>
        </View>

        {/* Bio */}
        {student.bio && (
          <>
            <Text className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Over
            </Text>
            <Text className="text-base leading-7 text-foreground mb-6">{student.bio}</Text>
          </>
        )}

        {/* Contact */}
        {(student.email || student.socialMedia?.instagram) && (
          <>
            <Separator className="mb-6" />
            <Text className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Contact
            </Text>
            {student.email && (
              <Pressable
                onPress={() => Linking.openURL(`mailto:${student.email}`)}
                className="flex-row items-center py-3 active:opacity-60"
              >
                <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center mr-3">
                  <Ionicons name="mail" size={18} className="text-primary" />
                </View>
                <Text className="text-base text-primary">{student.email}</Text>
              </Pressable>
            )}
            {student.socialMedia?.instagram && (
              <Pressable
                onPress={() =>
                  Linking.openURL(`https://instagram.com/${student.socialMedia!.instagram}`)
                }
                className="flex-row items-center py-3 active:opacity-60"
              >
                <View className="w-10 h-10 rounded-xl bg-[#E4405F]/10 items-center justify-center mr-3">
                  <Ionicons name="logo-instagram" size={18} color="#E4405F" />
                </View>
                <Text className="text-base text-foreground">@{student.socialMedia.instagram}</Text>
              </Pressable>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}
