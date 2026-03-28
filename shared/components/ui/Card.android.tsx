/**
 * Card component for Android
 * Native-looking card using React Native with Material Design styling
 */

import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "@/core/theme";
import type { CardProps } from "./types";

export function Card({ children, style, onPress }: CardProps) {
  const { colors } = useTheme();

  const cardContent = (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        android_ripple={{ color: colors.primary + "20" }}
        style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
      >
        {cardContent}
      </Pressable>
    );
  }

  return cardContent;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    elevation: 2,
  },
});
