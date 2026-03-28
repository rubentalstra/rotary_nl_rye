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
import { Dot } from "lucide-react-native";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useCampsQuery } from "@/lib/hooks/use-camps-query";
import { getFlagAsset, getCountryName } from "@/lib/utils/flags";
import type { Camp } from "@/lib/types";

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

  const faded = past;

  return (
    <View className={`px-5 py-4 ${faded ? "opacity-35" : ""}`}>
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
          {/* Title */}
          <Text className="text-base font-semibold text-foreground mb-1 mr-2" numberOfLines={2}>
            {camp.title}
          </Text>

          {/* Country + status */}
          <View className="flex-row items-center mb-1.5">
            <Text className="text-sm text-muted-foreground">{countryName}</Text>
            {camp.isFull && (
              <View className="flex-row items-center ml-1">
                <Dot size={18} className="text-muted-foreground" strokeWidth={3} />
                <Text className="text-sm text-destructive font-medium">Vol</Text>
              </View>
            )}
          </View>

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

const MONTHS = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

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
  const [showFull, setShowFull] = useState(false);
  const [showPast, setShowPast] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [ageFilter, setAgeFilter] = useState<number | null>(null);
  const [ageModalVisible, setAgeModalVisible] = useState(false);
  const [startMonth, setStartMonth] = useState<number | null>(null);
  const [endMonth, setEndMonth] = useState<number | null>(null);
  const [periodModalVisible, setPeriodModalVisible] = useState(false);

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
    if (!showFull) {
      result = result.filter((c) => !c.isFull || isPastCamp(c));
    }
    if (selectedCountry) {
      result = result.filter((c) => c.hostCountryCode === selectedCountry);
    }
    if (priceRange) {
      const cost = (c: Camp) => parseFloat(c.contribution) || 0;
      switch (priceRange) {
        case "0":
          result = result.filter((c) => cost(c) === 0);
          break;
        case "0-500":
          result = result.filter((c) => cost(c) > 0 && cost(c) <= 500);
          break;
        case "500-1000":
          result = result.filter((c) => cost(c) > 500 && cost(c) <= 1000);
          break;
        case "1000+":
          result = result.filter((c) => cost(c) > 1000);
          break;
      }
    }
    if (ageFilter !== null) {
      result = result.filter((c) => {
        const min = parseInt(c.ageMin, 10) || 0;
        const max = parseInt(c.ageMax, 10) || 99;
        return ageFilter >= min && ageFilter <= max;
      });
    }
    if (startMonth !== null && endMonth !== null) {
      result = result.filter((c) => {
        const start = parseDate(c.startDate);
        if (!start) return true;
        const month = start.getMonth();
        if (startMonth <= endMonth) {
          return month >= startMonth && month <= endMonth;
        }
        return month >= startMonth || month <= endMonth;
      });
    }
    return result;
  }, [camps, showFull, showPast, selectedCountry, priceRange, ageFilter, startMonth, endMonth]);

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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="py-3"
        contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
      >
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
        {/* Age filter */}
        <Pressable onPress={() => setAgeModalVisible(true)} className="active:opacity-70">
          <View
            className={`flex-row items-center px-4 py-2 rounded-full ${ageFilter !== null ? "bg-foreground" : "bg-muted"}`}
          >
            <Ionicons
              name="people-outline"
              size={14}
              className={ageFilter !== null ? "text-background mr-1" : "text-foreground mr-1"}
            />
            <Text
              className={`text-sm font-medium ${ageFilter !== null ? "text-background" : "text-foreground"}`}
            >
              {ageFilter !== null ? `${ageFilter} jaar` : "Leeftijd"}
            </Text>
          </View>
        </Pressable>
        {/* Period filter */}
        <Pressable onPress={() => setPeriodModalVisible(true)} className="active:opacity-70">
          <View
            className={`flex-row items-center px-4 py-2 rounded-full ${startMonth !== null ? "bg-foreground" : "bg-muted"}`}
          >
            <Ionicons
              name="calendar-outline"
              size={14}
              className={startMonth !== null ? "text-background mr-1" : "text-foreground mr-1"}
            />
            <Text
              className={`text-sm font-medium ${startMonth !== null ? "text-background" : "text-foreground"}`}
            >
              {startMonth !== null && endMonth !== null
                ? `${MONTHS[startMonth]} – ${MONTHS[endMonth]}`
                : "Periode"}
            </Text>
          </View>
        </Pressable>
        {/* Price filter */}
        <Pressable onPress={() => setPriceModalVisible(true)} className="active:opacity-70">
          <View
            className={`flex-row items-center px-4 py-2 rounded-full ${priceRange !== null ? "bg-foreground" : "bg-muted"}`}
          >
            <Ionicons
              name="cash-outline"
              size={14}
              className={priceRange !== null ? "text-background mr-1" : "text-foreground mr-1"}
            />
            <Text
              className={`text-sm font-medium ${priceRange !== null ? "text-background" : "text-foreground"}`}
            >
              {priceRange === "0"
                ? "Gratis"
                : priceRange === "0-500"
                  ? "< €500"
                  : priceRange === "500-1000"
                    ? "€500–1000"
                    : priceRange === "1000+"
                      ? "> €1000"
                      : "Prijs"}
            </Text>
          </View>
        </Pressable>
        <FilterChip label="Vol" active={showFull} onPress={() => setShowFull(!showFull)} />
        <FilterChip label="Afgelopen" active={showPast} onPress={() => setShowPast(!showPast)} />
      </ScrollView>

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

      {/* Age Filter Modal */}
      <Modal
        visible={ageModalVisible}
        animationType="slide"
        presentationStyle={Platform.OS === "ios" ? "pageSheet" : "fullScreen"}
        onRequestClose={() => setAgeModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: "white" }}>
          {Platform.OS === "ios" && (
            <View className="items-center py-3">
              <View className="w-9 h-1 rounded-full bg-muted-foreground/30" />
            </View>
          )}

          <View className="flex-row justify-between items-center px-5 pb-3 border-b border-border">
            <Text className="text-lg font-semibold text-foreground">Leeftijd</Text>
            <Pressable
              onPress={() => setAgeModalVisible(false)}
              className="w-8 h-8 rounded-full bg-muted items-center justify-center"
            >
              <Ionicons name="close" size={18} className="text-foreground" />
            </Pressable>
          </View>

          <View className="px-5 pt-5">
            <Text className="text-base text-muted-foreground mb-6">
              Selecteer je leeftijd om kampen te vinden die bij je passen.
            </Text>

            {/* All ages option */}
            <Pressable
              onPress={() => {
                setAgeFilter(null);
                setAgeModalVisible(false);
              }}
              className="flex-row items-center py-3.5 active:opacity-60"
            >
              <Text className="text-base text-foreground flex-1">Alle leeftijden</Text>
              {ageFilter === null && (
                <Ionicons name="checkmark" size={20} className="text-primary" />
              )}
            </Pressable>
            <Separator />

            {/* Age options */}
            {Array.from({ length: 14 }, (_, i) => i + 13).map((age) => (
              <View key={age}>
                <Pressable
                  onPress={() => {
                    setAgeFilter(age);
                    setAgeModalVisible(false);
                  }}
                  className="flex-row items-center py-3.5 active:opacity-60"
                >
                  <Text className="text-base text-foreground flex-1">{age} jaar</Text>
                  {ageFilter === age && (
                    <Ionicons name="checkmark" size={20} className="text-primary" />
                  )}
                </Pressable>
                <Separator />
              </View>
            ))}
          </View>
        </View>
      </Modal>

      {/* Period Filter Modal */}
      <Modal
        visible={periodModalVisible}
        animationType="slide"
        presentationStyle={Platform.OS === "ios" ? "pageSheet" : "fullScreen"}
        onRequestClose={() => setPeriodModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: "white" }}>
          {Platform.OS === "ios" && (
            <View className="items-center py-3">
              <View className="w-9 h-1 rounded-full bg-muted-foreground/30" />
            </View>
          )}

          <View className="flex-row justify-between items-center px-5 pb-3 border-b border-border">
            <Text className="text-lg font-semibold text-foreground">Periode kiezen</Text>
            <Pressable
              onPress={() => setPeriodModalVisible(false)}
              className="w-8 h-8 rounded-full bg-muted items-center justify-center"
            >
              <Ionicons name="close" size={18} className="text-foreground" />
            </Pressable>
          </View>

          <ScrollView className="flex-1 px-5 pt-5">
            <Text className="text-base text-muted-foreground mb-4">
              Kies een startmaand en eindmaand om kampen binnen die periode te vinden.
            </Text>

            {/* Start Month */}
            <Text className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Startmaand
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-6">
              {MONTHS.map((label, idx) => (
                <Pressable
                  key={`start-${idx}`}
                  onPress={() => {
                    setStartMonth(idx);
                    if (endMonth === null || endMonth < idx) setEndMonth(idx);
                  }}
                  className="active:opacity-70"
                >
                  <View
                    className={`px-4 py-2.5 rounded-xl ${startMonth === idx ? "bg-foreground" : "bg-muted"}`}
                  >
                    <Text
                      className={`text-sm font-medium ${startMonth === idx ? "text-background" : "text-foreground"}`}
                    >
                      {label}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>

            {/* End Month */}
            <Text className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Eindmaand
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-8">
              {MONTHS.map((label, idx) => (
                <Pressable
                  key={`end-${idx}`}
                  onPress={() => setEndMonth(idx)}
                  className="active:opacity-70"
                >
                  <View
                    className={`px-4 py-2.5 rounded-xl ${endMonth === idx ? "bg-foreground" : "bg-muted"}`}
                  >
                    <Text
                      className={`text-sm font-medium ${endMonth === idx ? "text-background" : "text-foreground"}`}
                    >
                      {label}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>

            {/* Actions */}
            <View className="flex-row gap-3 mb-8">
              <Pressable
                onPress={() => {
                  setStartMonth(null);
                  setEndMonth(null);
                  setPeriodModalVisible(false);
                }}
                className="flex-1 py-3.5 rounded-xl bg-muted items-center active:opacity-70"
              >
                <Text className="text-base font-medium text-foreground">Wissen</Text>
              </Pressable>
              <Pressable
                onPress={() => setPeriodModalVisible(false)}
                className="flex-1 py-3.5 rounded-xl bg-foreground items-center active:opacity-70"
              >
                <Text className="text-base font-medium text-background">Toepassen</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Price Filter Modal */}
      <Modal
        visible={priceModalVisible}
        animationType="slide"
        presentationStyle={Platform.OS === "ios" ? "pageSheet" : "fullScreen"}
        onRequestClose={() => setPriceModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: "white" }}>
          {Platform.OS === "ios" && (
            <View className="items-center py-3">
              <View className="w-9 h-1 rounded-full bg-muted-foreground/30" />
            </View>
          )}

          <View className="flex-row justify-between items-center px-5 pb-3 border-b border-border">
            <Text className="text-lg font-semibold text-foreground">Prijsbereik</Text>
            <Pressable
              onPress={() => setPriceModalVisible(false)}
              className="w-8 h-8 rounded-full bg-muted items-center justify-center"
            >
              <Ionicons name="close" size={18} className="text-foreground" />
            </Pressable>
          </View>

          <View className="px-5 pt-5">
            {[
              { key: null, label: "Alle prijzen" },
              { key: "0", label: "Gratis" },
              { key: "0-500", label: "Tot €500" },
              { key: "500-1000", label: "€500 – €1.000" },
              { key: "1000+", label: "Meer dan €1.000" },
            ].map((option) => (
              <View key={option.key ?? "all"}>
                <Pressable
                  onPress={() => {
                    setPriceRange(option.key);
                    setPriceModalVisible(false);
                  }}
                  className="flex-row items-center py-4 active:opacity-60"
                >
                  <Text className="text-base text-foreground flex-1">{option.label}</Text>
                  {priceRange === option.key && (
                    <Ionicons name="checkmark" size={20} className="text-primary" />
                  )}
                </Pressable>
                <Separator />
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}
