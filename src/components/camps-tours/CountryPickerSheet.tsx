import { Image } from "expo-image";
import { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Icon } from "@/components/ui/icon";
import { IconButton } from "@/components/ui/icon-button";
import type { CountryWithCode } from "@/features/camps-tours/types";
import { spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";
import { getFlagAsset } from "@/utils/flags";

interface CountryPickerSheetProps {
  visible: boolean;
  onClose: () => void;
  countries: CountryWithCode[];
  selectedCountry: string;
  onSelect: (code: string) => void;
}

const ALL_ROW: CountryWithCode = { code: "", country: "Alle landen" };

export function CountryPickerSheet({
  visible,
  onClose,
  countries,
  selectedCountry,
  onSelect,
}: CountryPickerSheetProps) {
  const theme = useTheme();
  const [query, setQuery] = useState("");

  const data = useMemo(() => {
    const sorted = [...countries].sort((a, b) => a.country.localeCompare(b.country, "nl"));
    const trimmed = query.trim().toLowerCase();
    const filtered = trimmed
      ? sorted.filter((c) => c.country.toLowerCase().includes(trimmed))
      : sorted;
    return trimmed ? filtered : [ALL_ROW, ...filtered];
  }, [countries, query]);

  const handleSelect = (code: string) => {
    onSelect(code);
    setQuery("");
    onClose();
  };

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle={Platform.OS === "ios" ? "pageSheet" : "fullScreen"}
      onRequestClose={handleClose}
    >
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
        edges={["top"]}
      >
        {Platform.OS === "ios" ? (
          <View style={styles.handleContainer}>
            <View style={[styles.handleBar, { backgroundColor: theme.textTertiary }]} />
          </View>
        ) : null}

        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Selecteer land</Text>
          <IconButton icon="close" onPress={handleClose} size="medium" variant="tinted" />
        </View>

        <View style={[styles.searchRow, { backgroundColor: theme.backgroundElevated }]}>
          <Icon name="search" size={16} tintColor={theme.textSecondary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Zoek land"
            placeholderTextColor={theme.textSecondary}
            style={[styles.searchInput, { color: theme.text }]}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.code || "__all__"}
          renderItem={({ item }) => {
            const isSelected = selectedCountry === item.code;
            const flag = item.code ? getFlagAsset(item.code.toLowerCase()) : null;
            return (
              <Pressable
                onPress={() => handleSelect(item.code)}
                style={({ pressed }) => [
                  styles.row,
                  isSelected && {
                    backgroundColor: theme.backgroundElevated,
                  },
                  pressed && { backgroundColor: theme.backgroundElevated, opacity: 0.85 },
                ]}
                android_ripple={{ color: `${theme.primary}20` }}
              >
                <View style={styles.rowMain}>
                  {item.code === "" ? (
                    <View style={[styles.flagWrapper, styles.allFlag]}>
                      <Icon name="globe" size={16} tintColor={theme.textSecondary} />
                    </View>
                  ) : flag ? (
                    <Image source={flag} style={styles.flag} contentFit="cover" />
                  ) : (
                    <View style={[styles.flagWrapper, styles.allFlag]}>
                      <Icon name="flag" size={14} tintColor={theme.textSecondary} />
                    </View>
                  )}
                  <Text
                    style={[
                      styles.rowText,
                      { color: theme.text },
                      isSelected && styles.rowTextSelected,
                    ]}
                  >
                    {item.country}
                  </Text>
                </View>
                {isSelected ? <Icon name="forward" size={16} tintColor={theme.primary} /> : null}
              </Pressable>
            );
          }}
          ItemSeparatorComponent={() => (
            <View style={[styles.separator, { backgroundColor: theme.border }]} />
          )}
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  handleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    opacity: 0.4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: Platform.OS === "ios" ? spacing.sm : spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    marginRight: spacing.md,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    padding: 0,
  },
  listContent: {
    paddingVertical: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: spacing.lg,
  },
  rowMain: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  flag: {
    width: 24,
    height: 18,
    borderRadius: 2,
  },
  flagWrapper: {
    width: 24,
    height: 18,
    borderRadius: 2,
    overflow: "hidden",
  },
  allFlag: {
    justifyContent: "center",
    alignItems: "center",
  },
  rowText: {
    fontSize: 16,
    fontWeight: "400",
  },
  rowTextSelected: {
    fontWeight: "600",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: spacing.lg + 24 + 12,
  },
});
