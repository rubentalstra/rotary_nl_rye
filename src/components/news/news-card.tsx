import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { memo } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/ui/icon";
import type { NewsItem } from "@/features/news/types";
import { spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

interface NewsCardProps {
  item: NewsItem;
  onPress: () => void;
}

function NewsCardComponent({ item, onPress }: NewsCardProps) {
  const theme = useTheme();

  const handlePress = () => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          opacity: pressed ? 0.7 : 1,
        },
        Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
      ]}
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={[styles.typeIndicator, { backgroundColor: `${theme.primary}15` }]}>
            <Icon name={item.isPdf ? "document" : "news"} size={12} tintColor={theme.primary} />
            <Text style={[styles.typeText, { color: theme.primary }]}>
              {item.isPdf ? "PDF Document" : "Artikel"}
            </Text>
          </View>
        </View>

        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.description, { color: theme.textSecondary }]} numberOfLines={2}>
          {item.description}
        </Text>
      </View>

      <View style={styles.chevronContainer}>
        <Icon name="forward" size={20} tintColor={theme.textSecondary} />
      </View>
    </Pressable>
  );
}

export const NewsCard = memo(NewsCardComponent);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
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
  shadowAndroid: { elevation: 2 },
  imageContainer: {
    width: 100,
    height: 100,
    position: "relative",
  },
  image: { width: "100%", height: "100%" },
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
