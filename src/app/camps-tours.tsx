import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { CampsHeaderRight } from "@/components/camps-tours/CampsHeaderRight";
import { CampsView } from "@/components/camps-tours/CampsView";
import { useCampsFilters } from "@/features/camps-tours/hooks/use-camps-filters";
import { useCampsQuery } from "@/features/camps-tours/hooks/use-camps-query";
import { useTheme } from "@/lib/theme/use-theme";

export default function CampsToursScreen() {
  const theme = useTheme();
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
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={["bottom"]}>
      <CampsView />
    </SafeAreaView>
  );
}
