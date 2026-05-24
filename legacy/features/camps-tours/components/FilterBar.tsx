/**
 * Filter bar component for camps filtering
 */

import { StyleSheet, View, FlatList, Alert } from "react-native";
import { useTheme } from "@/core/theme";
import { FilterChip } from "./FilterChip";
import type { FilterState, AvailabilityFilter, TimingFilter } from "../types";

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onCountryPress: () => void;
}

export function FilterBar({ filters, setFilters, onCountryPress }: FilterBarProps) {
  const { colors } = useTheme();

  const showAvailabilityOptions = () => {
    Alert.alert(
      "Beschikbaarheid",
      "Selecteer welke kampen je wilt zien:",
      [
        {
          text: "Alle kampen",
          onPress: () => setFilters((prev) => ({ ...prev, availability: "alle" })),
        },
        {
          text: "Alleen niet-volle kampen",
          onPress: () => setFilters((prev) => ({ ...prev, availability: "niet-vol" })),
        },
        {
          text: "Alleen volle kampen",
          onPress: () => setFilters((prev) => ({ ...prev, availability: "vol" })),
        },
        { text: "Annuleren", style: "cancel" },
      ],
      { cancelable: true },
    );
  };

  const showTimingOptions = () => {
    Alert.alert(
      "Tijdperiode",
      "Selecteer welke kampen je wilt zien:",
      [
        {
          text: "Alle kampen",
          onPress: () => setFilters((prev) => ({ ...prev, timing: "alle" })),
        },
        {
          text: "Alleen toekomstige kampen",
          onPress: () => setFilters((prev) => ({ ...prev, timing: "toekomstig" })),
        },
        {
          text: "Alleen afgelopen kampen",
          onPress: () => setFilters((prev) => ({ ...prev, timing: "afgelopen" })),
        },
        { text: "Annuleren", style: "cancel" },
      ],
      { cancelable: true },
    );
  };

  const getAvailabilityLabel = (value: AvailabilityFilter): string => {
    switch (value) {
      case "niet-vol":
        return "Niet vol";
      case "vol":
        return "Vol";
      default:
        return "Beschikbaarheid";
    }
  };

  const getTimingLabel = (value: TimingFilter): string => {
    switch (value) {
      case "toekomstig":
        return "Toekomstig";
      case "afgelopen":
        return "Afgelopen";
      default:
        return "Tijdperiode";
    }
  };

  const filterChips = [
    {
      id: "availability",
      icon: "checkmark-circle-outline" as const,
      label: getAvailabilityLabel(filters.availability),
      isActive: filters.availability !== "alle",
      onPress: showAvailabilityOptions,
    },
    {
      id: "timing",
      icon: "time-outline" as const,
      label: getTimingLabel(filters.timing),
      isActive: filters.timing !== "alle",
      onPress: showTimingOptions,
    },
    {
      id: "country",
      icon: "location-outline" as const,
      label: filters.country || "Land",
      isActive: filters.country !== "",
      onPress: onCountryPress,
    },
  ];

  return (
    <View style={[styles.container, { borderBottomColor: colors.border }]}>
      <FlatList
        data={filterChips}
        renderItem={({ item }) => (
          <FilterChip
            icon={item.icon}
            label={item.label}
            isActive={item.isActive}
            onPress={item.onPress}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
        style={styles.scrollView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    paddingLeft: 0,
    paddingRight: 16,
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
});
