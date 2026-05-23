/**
 * Camps & Tours screen route
 * Thin wrapper using the camps-tours feature module
 */

import { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { useTheme } from "@/core/theme";
import {
  CampsHeaderRight,
  CampsView,
  useCampsFilters,
  useCampsQuery,
} from "@/features/camps-tours";

export default function CampsToursScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { camps, isLoading } = useCampsQuery();
  const { filteredCamps, hasActiveFilters, clearFilters } = useCampsFilters(camps);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CampsHeaderRight
          filteredCount={filteredCamps.length}
          totalCount={camps.length}
          hasActiveFilters={hasActiveFilters}
          isLoading={isLoading}
          onClearFilters={clearFilters}
        />
      ),
    });
  }, [navigation, camps.length, filteredCamps.length, hasActiveFilters, isLoading, clearFilters]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["bottom"]}>
      <CampsView />
    </SafeAreaView>
  );
}
