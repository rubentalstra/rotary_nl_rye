import {
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetMethods,
} from "@expo/ui/community/bottom-sheet";
import {
  SegmentedControl,
  type NativeSegmentedControlChangeEvent,
} from "@expo/ui/community/segmented-control";
import { Image } from "expo-image";
import { router } from "expo-router";
import { forwardRef, useImperativeHandle, useRef, type Ref } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/ui/icon";
import { IconButton } from "@/components/ui/icon-button";
import { setCountryResolver } from "@/features/camps-tours/country-picker-bridge";
import type {
  AvailabilityFilter,
  FilterState,
  TimingFilter,
} from "@/features/camps-tours/types";
import { borderRadius, spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";
import { getCountryName, getFlagAsset } from "@/utils/flags";

interface FilterSheetProps {
  filters: FilterState;
  onFiltersChange: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export interface FilterSheetHandle {
  present: () => void;
  dismiss: () => void;
}

const AVAILABILITY_VALUES: AvailabilityFilter[] = ["niet-vol", "vol"];
const AVAILABILITY_LABELS = ["Beschikbaar", "Vol"];

const TIMING_VALUES: TimingFilter[] = ["toekomstig", "afgelopen"];
const TIMING_LABELS = ["Toekomstig", "Afgelopen"];

export const FilterSheet = forwardRef(function FilterSheet(
  { filters, onFiltersChange, onReset, hasActiveFilters }: FilterSheetProps,
  ref: Ref<FilterSheetHandle>,
) {
  const theme = useTheme();
  const sheetRef = useRef<BottomSheetMethods>(null);

  useImperativeHandle(ref, () => ({
    present: () => sheetRef.current?.present(),
    dismiss: () => sheetRef.current?.dismiss(),
  }));

  const availabilityIndex = AVAILABILITY_VALUES.indexOf(filters.availability);
  const timingIndex = TIMING_VALUES.indexOf(filters.timing);

  const handleClose = () => sheetRef.current?.dismiss();

  const handleOpenCountryPicker = () => {
    setCountryResolver((code) => {
      onFiltersChange((prev) => ({ ...prev, country: code }));
    });
    sheetRef.current?.dismiss();
    router.push("/country-picker" as never);
  };

  const countryFlag = filters.country ? getFlagAsset(filters.country.toLowerCase()) : null;
  const countryLabel = filters.country ? getCountryName(filters.country) : "Alle landen";

  return (
    <BottomSheetModal ref={sheetRef} snapPoints={["75%"]} enablePanDownToClose>
      <BottomSheetView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <IconButton icon="close" onPress={handleClose} size="medium" variant="tinted" />
          <Text style={[styles.headerTitle, { color: theme.text }]}>Filters</Text>
          <IconButton
            icon="refresh"
            onPress={onReset}
            disabled={!hasActiveFilters}
            size="medium"
            variant="tinted"
          />
        </View>

        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
          showsVerticalScrollIndicator={false}
        >
          <Section title="Beschikbaarheid" theme={theme}>
            <SegmentedControl
              values={AVAILABILITY_LABELS}
              selectedIndex={availabilityIndex === -1 ? 0 : availabilityIndex}
              onChange={(e: NativeSegmentedControlChangeEvent) => {
                const next = AVAILABILITY_VALUES[e.nativeEvent.selectedSegmentIndex];
                if (next) onFiltersChange((prev) => ({ ...prev, availability: next }));
              }}
              style={styles.segmented}
            />
          </Section>

          <Section title="Tijdperiode" theme={theme}>
            <SegmentedControl
              values={TIMING_LABELS}
              selectedIndex={timingIndex === -1 ? 0 : timingIndex}
              onChange={(e: NativeSegmentedControlChangeEvent) => {
                const next = TIMING_VALUES[e.nativeEvent.selectedSegmentIndex];
                if (next) onFiltersChange((prev) => ({ ...prev, timing: next }));
              }}
              style={styles.segmented}
            />
          </Section>

          <Section title="Land" theme={theme}>
            <Pressable
              onPress={handleOpenCountryPicker}
              style={({ pressed }) => [
                styles.landRow,
                { backgroundColor: theme.card, borderColor: theme.border },
                pressed && styles.landRowPressed,
              ]}
              android_ripple={{ color: `${theme.primary}20` }}
            >
              <View style={styles.landRowMain}>
                {countryFlag ? (
                  <Image source={countryFlag} style={styles.landFlag} contentFit="cover" />
                ) : (
                  <View style={[styles.landFlag, styles.flagPlaceholder]}>
                    <Icon name="globe" size={16} tintColor={theme.textSecondary} />
                  </View>
                )}
                <Text style={[styles.landLabel, { color: theme.text }]}>{countryLabel}</Text>
              </View>
              <Icon name="forward" size={16} tintColor={theme.textSecondary} />
            </Pressable>
          </Section>
        </ScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

function Section({
  title,
  children,
  theme,
}: {
  title: string;
  children: React.ReactNode;
  theme: ReturnType<typeof useTheme>;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginHorizontal: spacing.md,
  },
  body: { flex: 1 },
  bodyContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  segmented: {
    height: Platform.OS === "ios" ? 32 : 40,
  },
  landRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: borderRadius.md,
    borderWidth: Platform.OS === "android" ? StyleSheet.hairlineWidth : 0,
  },
  landRowPressed: {
    opacity: 0.7,
  },
  landRowMain: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  landFlag: {
    width: 24,
    height: 18,
    borderRadius: 2,
  },
  flagPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  landLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
});
