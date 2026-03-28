import { View, Pressable, Platform, FlatList } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { reboundStudents } from "@/lib/data/students-rebound";
import { getFlagAsset, getCountryName } from "@/lib/utils/flags";
import { groupByHostCountry } from "@/lib/types";

const countryGroups = groupByHostCountry(reboundStudents);

export default function ReboundScreen() {
  return (
    <View style={{ flex: 1 }} className="bg-background">
      <FlatList
        data={countryGroups}
        keyExtractor={(item) => item.countryCode}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "android" ? 100 : 40,
          flexGrow: 1,
        }}
        ListHeaderComponent={
          <View className="px-5 pt-5 pb-2">
            <Text className="text-sm text-muted-foreground">
              {reboundStudents.length} studenten · {countryGroups.length} landen
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => (
          <View className="ml-[72px] mr-5">
            <Separator />
          </View>
        )}
        renderItem={({ item: group }) => {
          const flagAsset = getFlagAsset(group.countryCode);
          return (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/students/rebound/[country]",
                  params: { country: group.countryCode },
                } as never)
              }
              className="flex-row items-center px-5 py-3.5 active:opacity-60"
            >
              <View className="w-12 h-12 rounded-2xl bg-muted items-center justify-center mr-4">
                {flagAsset ? (
                  <Image source={flagAsset} style={{ width: 28, height: 20, borderRadius: 2 }} />
                ) : (
                  <Ionicons name="flag-outline" size={20} className="text-muted-foreground" />
                )}
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">
                  {getCountryName(group.countryCode)}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {group.students.length} student{group.students.length !== 1 ? "en" : ""}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} className="text-muted-foreground" />
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-16">
            <Text className="text-base text-muted-foreground">Geen studenten gevonden</Text>
          </View>
        }
      />
    </View>
  );
}
