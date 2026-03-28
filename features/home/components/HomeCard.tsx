/**
 * Home card component for navigation grid
 */

import React, { useCallback, useMemo } from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { Ionicons, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/core/theme";
import type { HomeCardProps } from "../types";

const shadowStyle = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
  },
  android: {
    elevation: 4,
  },
  default: {},
});

export const HomeCard = React.memo<HomeCardProps>(
  ({
    icon = "settings-outline",
    fontistoIcon,
    materialIcon,
    title,
    variant = "default",
    useSvg = false,
    svgSource,
    onPress,
  }) => {
    const { colors } = useTheme();
    const isDefault = variant === "default";

    const handlePress = useCallback(() => {
      if (Platform.OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      onPress?.();
    }, [onPress]);

    const cardStyle = useMemo(
      () => [
        isDefault
          ? { ...styles.homeCard, backgroundColor: colors.surface }
          : { ...styles.homeCardSingle, backgroundColor: colors.surface },
      ],
      [isDefault, colors.surface],
    );

    const iconColor = colors.primary;
    const textColor = colors.primary;

    return (
      <View style={styles.cardWrapper}>
        <Pressable
          style={({ pressed }) => [cardStyle, pressed && styles.pressedCard]}
          onPress={handlePress}
          android_ripple={{
            color: `${colors.primaryVariant}20`,
            borderless: false,
          }}
        >
          <View style={styles.cardContent}>
            <View style={isDefault ? styles.iconContainer : styles.iconContainerSingle}>
              {useSvg && svgSource ? (
                <Image
                  source={svgSource}
                  style={{ width: 35, height: 35 }}
                  contentFit="contain"
                  tintColor={iconColor}
                />
              ) : materialIcon ? (
                <MaterialCommunityIcons name={materialIcon} size={35} color={iconColor} />
              ) : fontistoIcon ? (
                <Fontisto name={fontistoIcon} size={35} color={iconColor} />
              ) : (
                <Ionicons name={icon} size={35} color={iconColor} />
              )}
            </View>
            {isDefault ? (
              <View style={styles.titleContainer}>
                <Text style={[styles.cardTitle, { color: textColor }]}>{title}</Text>
              </View>
            ) : (
              <Text style={[styles.cardTitleSingle, { color: textColor }]}>{title}</Text>
            )}
          </View>
        </Pressable>
      </View>
    );
  },
);

HomeCard.displayName = "HomeCard";

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    paddingHorizontal: 5,
  },
  homeCard: {
    height: 120,
    borderRadius: 10,
    ...shadowStyle,
  },
  homeCardSingle: {
    height: 80,
    borderRadius: 10,
    ...shadowStyle,
  },
  pressedCard: {
    transform: [{ scale: 0.98 }],
    opacity: 0.8,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    marginBottom: 16,
  },
  iconContainerSingle: {
    marginBottom: 10,
  },
  titleContainer: {
    width: 80,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    maxWidth: 80,
  },
  cardTitleSingle: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
});
