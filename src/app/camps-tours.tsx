import { useState, useMemo } from "react";
import { View, RefreshControl, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCampsQuery } from "@/lib/hooks/use-camps-query";
import { getFlagAsset, getCountryName } from "@/lib/utils/flags";
import { Image } from "expo-image";
import type { Camp, AvailabilityFilter, TimingFilter } from "@/lib/types";

function CampCard({ camp }: { camp: Camp }) {
  const flagAsset = getFlagAsset(camp.hostCountryCode);
  const countryName = getCountryName(camp.hostCountryCode);

  return (
    <Card className="mb-3 mx-4">
      <CardContent className="p-3">
        <View className="flex-row items-start justify-between mb-1">
          <View className="flex-row items-center gap-2 flex-1">
            {flagAsset && (
              <Image source={flagAsset} style={{ width: 24, height: 18, borderRadius: 2 }} />
            )}
            <Text className="text-base font-semibold flex-1" numberOfLines={2}>
              {camp.title}
            </Text>
          </View>
          <Badge variant={camp.isFull ? "destructive" : "default"} className="ml-2">
            <Text className="text-xs">{camp.isFull ? "Vol" : "Beschikbaar"}</Text>
          </Badge>
        </View>

        <Text className="text-sm text-muted-foreground mb-1">{countryName}</Text>
        <Text className="text-sm text-muted-foreground">
          {camp.startDate} — {camp.endDate}
        </Text>
        <Text className="text-sm text-muted-foreground">
          Leeftijd: {camp.ageMin}-{camp.ageMax} | {camp.contribution} {camp.currency}
        </Text>
      </CardContent>
    </Card>
  );
}

export default function CampsToursScreen() {
  const { t } = useTranslation();
  const { data, isLoading, error, refetch, isFetching } = useCampsQuery();
  const [availability, setAvailability] = useState<AvailabilityFilter>("alle");
  const [timing, setTiming] = useState<TimingFilter>("alle");

  const camps = data?.camps ?? [];

  const filteredCamps = useMemo(() => {
    let result = camps;
    if (availability === "niet-vol") result = result.filter((c) => !c.isFull);
    if (availability === "vol") result = result.filter((c) => c.isFull);
    if (timing === "toekomstig") {
      const now = new Date();
      result = result.filter((c) => new Date(c.startDate) >= now);
    }
    if (timing === "afgelopen") {
      const now = new Date();
      result = result.filter((c) => new Date(c.endDate) < now);
    }
    return result;
  }, [camps, availability, timing]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background p-4 gap-3" edges={["bottom"]}>
        <Skeleton className="w-full h-[100px] rounded-xl" />
        <Skeleton className="w-full h-[100px] rounded-xl" />
        <Skeleton className="w-full h-[100px] rounded-xl" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center p-6" edges={["bottom"]}>
        <Text className="text-xl font-bold mb-2">{t("camps.loadError")}</Text>
        <Button onPress={() => refetch()}>
          <Text>{t("common.retry")}</Text>
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      {/* Filter chips */}
      <View className="flex-row gap-2 px-4 py-3">
        <Badge
          variant={availability === "niet-vol" ? "default" : "secondary"}
          className="px-3 py-1"
          onPress={() => setAvailability(availability === "niet-vol" ? "alle" : "niet-vol")}
        >
          <Text className="text-xs">Beschikbaar</Text>
        </Badge>
        <Badge
          variant={timing === "toekomstig" ? "default" : "secondary"}
          className="px-3 py-1"
          onPress={() => setTiming(timing === "toekomstig" ? "alle" : "toekomstig")}
        >
          <Text className="text-xs">Toekomstig</Text>
        </Badge>
        <View className="flex-1" />
        <Text className="text-sm text-muted-foreground self-center">
          {filteredCamps.length}/{camps.length}
        </Text>
      </View>

      <FlashList
        data={filteredCamps}
        renderItem={({ item }) => <CampCard camp={item} />}
        keyExtractor={(item) => item.id}
        estimatedItemSize={120}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        contentContainerClassName={Platform.OS === "android" ? "pb-24" : "pb-10"}
        ListEmptyComponent={
          <View className="items-center py-16">
            <Text className="text-base text-muted-foreground">{t("camps.noCamps")}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
