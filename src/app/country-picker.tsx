import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/ui/icon";
import { resolveCountry } from "@/features/camps-tours/country-picker-bridge";
import { useCampsQuery } from "@/features/camps-tours/hooks/use-camps-query";
import type { CountryWithCode } from "@/features/camps-tours/types";
import { spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";
import { getFlagAsset } from "@/utils/flags";

const ALL_COUNTRIES_ROW: CountryWithCode = { code: "", country: "Alle landen" };

export default function CountryPickerScreen() {
  const theme = useTheme();
  const { countries } = useCampsQuery();
  const [query, setQuery] = useState("");

  const data = useMemo(() => {
    const sorted = [...countries].sort((a, b) => a.country.localeCompare(b.country, "nl"));
    const q = query.trim().toLowerCase();
    if (q) return sorted.filter((c) => c.country.toLowerCase().includes(q));
    return [ALL_COUNTRIES_ROW, ...sorted];
  }, [countries, query]);

  const handleSelect = useCallback((code: string) => {
    resolveCountry(code);
    router.back();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Zoek land",
            autoCapitalize: "none",
            inputType: "text",
            onChangeText: (e) => setQuery(e.nativeEvent.text),
            onClose: () => setQuery(""),
          },
        }}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.code || "__all__"}
        renderItem={({ item }) => (
          <CountryRow item={item} onPress={() => handleSelect(item.code)} />
        )}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: theme.border }]} />
        )}
        style={{ backgroundColor: theme.background }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="on-drag"
      />
    </>
  );
}

function CountryRow({
  item,
  onPress,
}: {
  item: CountryWithCode;
  onPress: () => void;
}) {
  const theme = useTheme();
  const flag = item.code ? getFlagAsset(item.code.toLowerCase()) : null;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        pressed && { backgroundColor: theme.backgroundElevated },
      ]}
      android_ripple={{ color: `${theme.primary}20` }}
    >
      {item.code === "" ? (
        <View style={[styles.flagWrapper, styles.flagPlaceholder]}>
          <Icon name="globe" size={18} tintColor={theme.textSecondary} />
        </View>
      ) : flag ? (
        <Image source={flag} style={styles.flag} contentFit="cover" />
      ) : (
        <View style={[styles.flagWrapper, styles.flagPlaceholder]}>
          <Icon name="flag" size={16} tintColor={theme.textSecondary} />
        </View>
      )}
      <Text style={[styles.rowText, { color: theme.text }]}>{item.country}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: spacing.xl,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
  },
  flag: {
    width: 28,
    height: 21,
    borderRadius: 2,
  },
  flagWrapper: {
    width: 28,
    height: 21,
    borderRadius: 2,
    overflow: "hidden",
  },
  flagPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  rowText: {
    fontSize: 16,
    fontWeight: "400",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: spacing.lg + 28 + 14,
  },
});
