import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import React, { useCallback, useMemo } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from "react-native";

import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/lib/icons";
import { useTheme } from "@/lib/theme/use-theme";

export type HomeCardVariant = "default" | "single";

interface HomeCardProps {
  /** SF Symbol + Material Symbol mapping from `@/lib/icons`. Ignored when `svgSource` is set. */
  icon?: IconName;
  /** Optional SVG asset (tinted with the primary color) instead of a system symbol. */
  svgSource?: ImageSourcePropType;
  title: string;
  variant?: HomeCardVariant;
  onPress?: () => void;
}

const shadowStyle = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
  },
  android: { elevation: 4 },
  default: {},
});

export const HomeCard = React.memo<HomeCardProps>(function HomeCard({
  icon,
  svgSource,
  title,
  variant = "default",
  onPress,
}) {
  const { primary, primaryVariant, surface } = useTheme();
  const isDefault = variant === "default";

  const handlePress = useCallback(() => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.();
  }, [onPress]);

  const cardStyle = useMemo(
    () => (isDefault ? styles.homeCard : styles.homeCardSingle),
    [isDefault],
  );

  return (
    <View style={styles.cardWrapper}>
      <Pressable
        style={({ pressed }) => [cardStyle, { backgroundColor: surface }, pressed && styles.pressed]}
        onPress={handlePress}
        android_ripple={{ color: `${primaryVariant}20`, borderless: false }}
      >
        <View style={styles.cardContent}>
          <View style={isDefault ? styles.iconContainer : styles.iconContainerSingle}>
            {svgSource ? (
              <Image
                source={svgSource}
                style={styles.svgIcon}
                contentFit="contain"
                tintColor={primary}
              />
            ) : icon ? (
              <Icon name={icon} size={35} tintColor={primary} />
            ) : null}
          </View>
          {isDefault ? (
            <View style={styles.titleContainer}>
              <Text style={[styles.cardTitle, { color: primary }]}>{title}</Text>
            </View>
          ) : (
            <Text style={[styles.cardTitleSingle, { color: primary }]}>{title}</Text>
          )}
        </View>
      </Pressable>
    </View>
  );
});

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
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.8,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: { marginBottom: 16 },
  iconContainerSingle: { marginBottom: 10 },
  svgIcon: { width: 35, height: 35 },
  titleContainer: { width: 80, alignItems: "center" },
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
