/**
 * Country navigation card for rebound screen
 * Displays a country with flag and student count for navigation
 */

import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import { getFlagAsset, getCountryName } from "@/shared/utils/flags";
import type { CountryGroup } from "../types";

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 4,
};

interface CountryNavCardProps {
  country: CountryGroup;
  onPress: () => void;
}

export function CountryNavCard({ country, onPress }: CountryNavCardProps) {
  const { colors } = useTheme();
  const flagAsset = getFlagAsset(country.countryCode);

  const handlePress = async () => {
    if (Platform.OS === "ios") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
        pressed && styles.cardPressed,
      ]}
      onPress={handlePress}
      android_ripple={{
        color: "rgba(0, 122, 255, 0.2)",
        borderless: false,
      }}
    >
      <View style={styles.content}>
        {flagAsset ? (
          <Image source={flagAsset} style={styles.flagImage} contentFit="contain" />
        ) : (
          <View
            style={[
              styles.flagImage,
              styles.flagPlaceholder,
              { backgroundColor: colors.backgroundElevated },
            ]}
          >
            <Text style={[styles.flagText, { color: colors.textTertiary }]}>
              {country.countryCode.toUpperCase()}
            </Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={[styles.countryName, { color: colors.text }]}>
            {getCountryName(country.countryCode)}
          </Text>
          <Text style={[styles.studentCount, { color: colors.textSecondary }]}>
            {country.students.length} student
            {country.students.length !== 1 ? "s" : ""}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.primary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginHorizontal: spacing.md,
    ...shadowStyle,
  },
  cardPressed: {
    opacity: Platform.OS === "ios" ? 0.8 : 1,
    transform: Platform.OS === "ios" ? [{ scale: 0.98 }] : [],
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    minHeight: 64,
  },
  flagImage: {
    width: 48,
    height: 32,
    marginRight: spacing.md,
  },
  flagPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  flagText: {
    fontSize: 10,
    fontWeight: "600",
  },
  info: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  studentCount: {
    fontSize: 14,
  },
});
