/**
 * Student card component for displaying a student in a list
 */

import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import { NetworkImage } from "@/shared/components/media/NetworkImage";
import { getFlagAsset, getCountryName } from "@/shared/utils/flags";
import type { Student } from "../types";

interface StudentCardProps {
  student: Student;
  onPress: () => void;
  showExchangeInfo?: boolean;
}

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 4,
};

export function StudentCard({ student, onPress, showExchangeInfo = true }: StudentCardProps) {
  const { colors } = useTheme();

  const fromFlagAsset = getFlagAsset(student.homeCountryCode);
  const toFlagAsset = getFlagAsset(student.hostCountryCode);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        pressed && styles.containerPressed,
      ]}
      android_ripple={{
        color: "rgba(0, 122, 255, 0.2)",
        borderless: false,
      }}
    >
      <View style={styles.content}>
        <NetworkImage
          imageUrl={student.imageUrl}
          name={student.name}
          size={60}
          style={styles.avatar}
        />

        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {student.name}
          </Text>

          {student.description && (
            <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={1}>
              {student.description}
            </Text>
          )}

          {showExchangeInfo && (
            <View style={styles.exchangeInfo}>
              <View style={styles.countryContainer}>
                {fromFlagAsset ? (
                  <Image source={fromFlagAsset} style={styles.flag} contentFit="contain" />
                ) : (
                  <View
                    style={[styles.flagPlaceholder, { backgroundColor: colors.backgroundElevated }]}
                  >
                    <Text style={[styles.flagText, { color: colors.textTertiary }]}>
                      {student.homeCountryCode.toUpperCase()}
                    </Text>
                  </View>
                )}
                <Text style={[styles.countryText, { color: colors.textSecondary }]}>
                  {getCountryName(student.homeCountryCode)}
                </Text>
              </View>

              <Ionicons
                name="arrow-forward"
                size={14}
                color={colors.textTertiary}
                style={styles.arrow}
              />

              <View style={styles.countryContainer}>
                {toFlagAsset ? (
                  <Image source={toFlagAsset} style={styles.flag} contentFit="contain" />
                ) : (
                  <View
                    style={[styles.flagPlaceholder, { backgroundColor: colors.backgroundElevated }]}
                  >
                    <Text style={[styles.flagText, { color: colors.textTertiary }]}>
                      {student.hostCountryCode.toUpperCase()}
                    </Text>
                  </View>
                )}
                <Text style={[styles.countryText, { color: colors.textSecondary }]}>
                  {getCountryName(student.hostCountryCode)}
                </Text>
              </View>
            </View>
          )}
        </View>

        <Ionicons
          name={Platform.OS === "ios" ? "chevron-forward" : "chevron-forward-outline"}
          size={Platform.OS === "ios" ? 20 : 24}
          color={colors.textTertiary}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Platform.OS === "ios" ? spacing.md : 0,
    borderRadius: Platform.OS === "ios" ? spacing.radiusMd : 0,
    borderBottomWidth: Platform.OS === "ios" ? 0 : StyleSheet.hairlineWidth,
    ...(Platform.OS === "ios" ? shadowStyle : {}),
  },
  containerPressed: {
    opacity: Platform.OS === "ios" ? 0.8 : 1,
    transform: Platform.OS === "ios" ? [{ scale: 0.98 }] : [],
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    minHeight: Platform.OS === "ios" ? 80 : 88,
  },
  avatar: {
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  exchangeInfo: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  countryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    width: 20,
    height: 14,
    marginRight: 4,
    borderRadius: 2,
  },
  flagPlaceholder: {
    width: 20,
    height: 14,
    marginRight: 4,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  flagText: {
    fontSize: 8,
    fontWeight: "600",
  },
  countryText: {
    fontSize: 12,
    fontWeight: "500",
  },
  arrow: {
    marginHorizontal: spacing.xs,
  },
});
