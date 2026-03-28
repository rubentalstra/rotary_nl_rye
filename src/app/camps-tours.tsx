import { useState, useMemo, useLayoutEffect } from "react";
import {
  View,
  RefreshControl,
  Platform,
  Pressable,
  FlatList,
  Modal,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useCampsQuery } from "@/lib/hooks/use-camps-query";
import { getFlagAsset, getCountryName } from "@/lib/utils/flags";
import type { Camp, AvailabilityFilter } from "@/lib/types";

const currencyIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  EUR: "logo-euro",
  USD: "logo-usd",
  GBP: "cash-outline",
  JPY: "logo-yen",
  INR: "cash-outline",
  BRL: "cash-outline",
  CHF: "cash-outline",
  SEK: "cash-outline",
  NOK: "cash-outline",
  DKK: "cash-outline",
  TRY: "cash-outline",
};

function getCurrencyIcon(code: string): keyof typeof Ionicons.glyphMap {
  return currencyIcons[code.toUpperCase()] ?? "cash-outline";
}

function parseDate(dateStr: string): Date | null {
  const parts = dateStr.split(/[/\-]/);
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  const d = new Date(year, month, day);
  return isNaN(d.getTime()) ? null : d;
}

function isPastCamp(camp: Camp): boolean {
  const end = parseDate(camp.endDate);
  return end ? end < new Date() : false;
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
              <Ionicons
                name={getCurrencyIcon(camp.currency)}
                size={13}
                className="text-muted-foreground mr-1"
              />
              <Text className="text-[13px] font-medium text-muted-foreground">
                {camp.contribution}
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
      <View className={`px-4 py-2 rounded-full ${active ? "bg-foreground" : "bg-muted"}`}>
        <Text className={`text-sm font-medium ${active ? "text-background" : "text-foreground"}`}>
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
  const [showPast, setShowPast] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  const navigation = useNavigation();
  const camps = data?.camps ?? [];
  const countries = data?.countries ?? [];

  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return countries;
    const q = countrySearch.toLowerCase();
    return countries.filter((c) => c.country.toLowerCase().includes(q));
  }, [countries, countrySearch]);

  const filteredCamps = useMemo(() => {
    let result = camps;
    if (!showPast) {
      result = result.filter((c) => !isPastCamp(c));
    }
    if (availability === "niet-vol") result = result.filter((c) => !c.isFull);
    if (availability === "vol") result = result.filter((c) => c.isFull);
    if (selectedCountry) {
      result = result.filter((c) => c.hostCountryCode === selectedCountry);
    }
    return result;
  }, [camps, availability, showPast, selectedCountry]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text className="text-sm text-muted-foreground mr-1">
          {filteredCamps.length}/{camps.length}
        </Text>
      ),
    });
  }, [navigation, filteredCamps.length, camps.length]);

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
        <Text className="text-xl font-bold text-foreground mb-2">{t("camps.loadError")}</Text>
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
          onPress={() => setAvailability(availability === "niet-vol" ? "alle" : "niet-vol")}
        />
        <FilterChip label="Afgelopen" active={showPast} onPress={() => setShowPast(!showPast)} />
        <Pressable onPress={() => setCountryModalVisible(true)} className="active:opacity-70">
          <View
            className={`flex-row items-center px-4 py-2 rounded-full ${selectedCountry ? "bg-foreground" : "bg-muted"}`}
          >
            <Ionicons
              name="globe-outline"
              size={14}
              className={selectedCountry ? "text-background mr-1" : "text-foreground mr-1"}
            />
            <Text
              className={`text-sm font-medium ${selectedCountry ? "text-background" : "text-foreground"}`}
            >
              {selectedCountry ? getCountryName(selectedCountry) : "Land"}
            </Text>
          </View>
        </Pressable>
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
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "android" ? 100 : 40,
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-16">
            <Text className="text-base text-muted-foreground">{t("camps.noCamps")}</Text>
          </View>
        }
      />

      {/* Country Filter Modal */}
      <Modal
        visible={countryModalVisible}
        animationType="slide"
        presentationStyle={Platform.OS === "ios" ? "pageSheet" : "fullScreen"}
        onRequestClose={() => setCountryModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: "white" }}>
          {Platform.OS === "ios" && (
            <View className="items-center py-3">
              <View className="w-9 h-1 rounded-full bg-muted-foreground/30" />
            </View>
          )}

          <View className="flex-row justify-between items-center px-5 pb-3 border-b border-border">
            <Text className="text-lg font-semibold text-foreground">Land kiezen</Text>
            <Pressable
              onPress={() => setCountryModalVisible(false)}
              className="w-8 h-8 rounded-full bg-muted items-center justify-center"
            >
              <Ionicons name="close" size={18} className="text-foreground" />
            </Pressable>
          </View>

          {/* Search */}
          <View className="px-5 py-3">
            <View className="flex-row items-center bg-muted rounded-xl px-3 py-2.5">
              <Ionicons name="search" size={18} className="text-muted-foreground mr-2" />
              <TextInput
                placeholder="Zoek land..."
                value={countrySearch}
                onChangeText={setCountrySearch}
                className="flex-1 text-base text-foreground"
                placeholderTextColor="#9ca3af"
              />
              {countrySearch.length > 0 && (
                <Pressable onPress={() => setCountrySearch("")}>
                  <Ionicons name="close-circle" size={18} className="text-muted-foreground" />
                </Pressable>
              )}
            </View>
          </View>

          {/* All option */}
          <Pressable
            onPress={() => {
              setSelectedCountry(null);
              setCountrySearch("");
              setCountryModalVisible(false);
            }}
            className="flex-row items-center px-5 py-3.5 active:opacity-60"
          >
            <View className="w-10 h-10 rounded-2xl bg-muted items-center justify-center mr-3">
              <Ionicons name="globe-outline" size={20} className="text-foreground" />
            </View>
            <Text className="text-base font-medium text-foreground flex-1">Alle landen</Text>
            {!selectedCountry && <Ionicons name="checkmark" size={20} className="text-primary" />}
          </Pressable>
          <View className="mx-5">
            <Separator />
          </View>

          {/* Country list */}
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {filteredCountries.map((country, idx) => {
              const flagAsset = getFlagAsset(country.code);
              return (
                <View key={country.code}>
                  {idx > 0 && (
                    <View className="ml-[68px] mr-5">
                      <Separator />
                    </View>
                  )}
                  <Pressable
                    onPress={() => {
                      setSelectedCountry(country.code);
                      setCountrySearch("");
                      setCountryModalVisible(false);
                    }}
                    className="flex-row items-center px-5 py-3.5 active:opacity-60"
                  >
                    <View className="w-10 h-10 rounded-2xl bg-muted items-center justify-center mr-3">
                      {flagAsset ? (
                        <Image
                          source={flagAsset}
                          style={{ width: 24, height: 18, borderRadius: 2 }}
                        />
                      ) : (
                        <Ionicons name="flag-outline" size={18} className="text-muted-foreground" />
                      )}
                    </View>
                    <Text className="text-base text-foreground flex-1">{country.country}</Text>
                    {selectedCountry === country.code && (
                      <Ionicons name="checkmark" size={20} className="text-primary" />
                    )}
                  </Pressable>
                </View>
              );
            })}
            <View style={{ height: 40 }} />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
