/**
 * News card component for displaying news items in a list
 */

import { memo } from "react";
import { Pressable, View, Text, StyleSheet, Platform } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import type { NewsItem } from "../types";

interface NewsCardProps {
  item: NewsItem;
  onPress: () => void;
}

function NewsCardComponent({ item, onPress }: NewsCardProps) {
  const { colors } = useTheme();

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.7 : 1,
        },
        Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
      ]}
      onPress={handlePress}
    >
      {/* Thumbnail Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Type indicator */}
        <View style={styles.topRow}>
          <View style={[styles.typeIndicator, { backgroundColor: colors.primary + "15" }]}>
            <Ionicons
              name={item.isPdf ? "document-text-outline" : "newspaper-outline"}
              size={12}
              color={colors.primary}
            />
            <Text style={[styles.typeText, { color: colors.primary }]}>
              {item.isPdf ? "PDF Document" : "Artikel"}
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>

        {/* Description */}
        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
          {item.description}
        </Text>
      </View>

      {/* Chevron */}
      <View style={styles.chevronContainer}>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </View>
    </Pressable>
  );
}

export const NewsCard = memo(NewsCardComponent);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm / 2,
    borderRadius: 12,
    borderWidth: Platform.OS === "android" ? StyleSheet.hairlineWidth : 0,
    overflow: "hidden",
  },
  shadowIOS: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shadowAndroid: {
    elevation: 2,
  },
  imageContainer: {
    width: 100,
    height: 100,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    padding: spacing.sm,
    paddingRight: 32,
    justifyContent: "center",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  typeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
  },
  typeText: {
    fontSize: 10,
    fontWeight: "600",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
    lineHeight: 20,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  chevronContainer: {
    position: "absolute",
    right: 12,
    top: "50%",
    marginTop: -10,
  },
});
