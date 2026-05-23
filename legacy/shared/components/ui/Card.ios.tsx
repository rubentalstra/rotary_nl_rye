/**
 * Card component for iOS
 * Native-looking card using React Native with iOS styling
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
          shadowColor: colors.shadow,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
