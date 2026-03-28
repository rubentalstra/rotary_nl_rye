import { useState, useMemo } from "react";
import { View, RefreshControl, Platform, Pressable, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useCampsQuery } from "@/lib/hooks/use-camps-query";
import { getFlagAsset, getCountryName } from "@/lib/utils/flags";
import type { Camp, AvailabilityFilter, TimingFilter } from "@/lib/types";

const currencySymbols: Record<string, string> = {
  EUR: "\u20AC",
  USD: "$",
  GBP: "\u00A3",
  CHF: "CHF",
  SEK: "kr",
  NOK: "kr",
  DKK: "kr",
  JPY: "\u00A5",
  INR: "\u20B9",
  TRY: "\u20BA",
  BRL: "R$",
};

function getCurrencySymbol(code: string): string {
  return currencySymbols[code.toUpperCase()] ?? code;
}

function isPastCamp(camp: Camp): boolean {
  try {
    return new Date(camp.endDate) < new Date();
  } catch {
    return false;
  }
}

function CampRow({ camp }: { camp: Camp }) {
  const flagAsset = getFlagAsset(camp.hostCountryCode);
  const countryName = getCountryName(camp.hostCountryCode);
  const past = isPastCamp(camp);

  return (
    <View className={`px-5 py-4 ${past ? "opacity-35" : ""}`}>
      <View className="flex-row">
        {/* Flag — prominent in rounded container */}
        <View className="w-14 h-14 rounded-2xl bg-muted items-center justify-center mr-4 mt-0.5">
          {flagAsset ? (
            <Image source={flagAsset} style={{ width: 32, height: 24, borderRadius: 3 }} />
          ) : (
            <Ionicons name="flag-outline" size={24} className="text-muted-foreground" />
          )}
        </View>

        {/* Content */}
        <View className="flex-1">
          {/* Title + Vol badge */}
          <View className="flex-row items-start mb-1">
            <Text className="text-base font-semibold text-foreground flex-1 mr-2" numberOfLines={2}>
              {camp.title}
            </Text>
            {camp.isFull && (
              <View className="bg-destructive/10 px-2 py-0.5 rounded-full">
                <Text className="text-xs font-semibold text-destructive">Vol</Text>
              </View>
            )}
          </View>

          {/* Country */}
          <Text className="text-sm text-muted-foreground mb-1.5">{countryName}</Text>

          {/* Date + details */}
          <View className="flex-row items-center flex-wrap gap-y-1">
            <View className="flex-row items-center mr-4">
              <Ionicons name="calendar-outline" size={13} className="text-primary mr-1" />
              <Text className="text-[13px] font-medium text-foreground">
                {camp.startDate} — {camp.endDate}
              </Text>
            </View>
            <View className="flex-row items-center mr-4">
              <Ionicons name="people-outline" size={13} className="text-muted-foreground mr-1" />
              <Text className="text-[13px] text-muted-foreground">
                {camp.ageMin}–{camp.ageMax}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-[13px] font-medium text-muted-foreground">
                {getCurrencySymbol(camp.currency)}{camp.contribution}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="active:opacity-70">
      <View
        className={`px-4 py-2 rounded-full ${active ? "bg-foreground" : "bg-muted"}`}
      >
        <Text
          className={`text-sm font-medium ${active ? "text-background" : "text-foreground"}`}
        >
          {label}
        </Text>
      </View>
    </Pressable>
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
      <View className="flex-1 bg-background p-5 gap-4">
        <Skeleton className="w-full h-20 rounded-xl" />
        <Skeleton className="w-full h-20 rounded-xl" />
        <Skeleton className="w-full h-20 rounded-xl" />
        <Skeleton className="w-full h-20 rounded-xl" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-6">
        <Ionicons name="alert-circle" size={48} className="text-destructive mb-4" />
        <Text className="text-xl font-bold text-foreground mb-2">
          {t("camps.loadError")}
        </Text>
        <Button onPress={() => refetch()}>
          <Text>{t("common.retry")}</Text>
        </Button>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} className="bg-background">
      {/* Filters */}
      <View className="flex-row items-center gap-2 px-5 py-3">
        <FilterChip
          label="Beschikbaar"
          active={availability === "niet-vol"}
          onPress={() =>
            setAvailability(availability === "niet-vol" ? "alle" : "niet-vol")
          }
        />
        <FilterChip
          label="Toekomstig"
          active={timing === "toekomstig"}
          onPress={() => setTiming(timing === "toekomstig" ? "alle" : "toekomstig")}
        />
        <View className="flex-1" />
        <Text className="text-sm text-muted-foreground">
          {filteredCamps.length}/{camps.length}
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={filteredCamps}
        renderItem={({ item }) => <CampRow camp={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View className="mx-5">
            <Separator />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        contentContainerStyle={{
          paddingBottom: Platform.OS === "android" ? 100 : 40,
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-16">
            <Text className="text-base text-muted-foreground">
              {t("camps.noCamps")}
            </Text>
          </View>
        }
      />
    </View>
  );
}
