import React, { memo } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { useTheme } from "@/core/theme";
import type { TipItem } from "../types";

interface TipCardProps {
  /** Array of tip items */
  items: TipItem[];
}

/**
 * TipCard - Displays numbered tips in styled cards
 *
 * Used for providing step-by-step guidance or tips.
 */
export const TipCard = memo(function TipCard({ items }: TipCardProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View
          key={`tip-${item.number}`}
          style={[
            styles.tipCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              shadowColor: colors.shadow,
            },
          ]}
        >
          <View style={[styles.tipNumber, { backgroundColor: colors.primary }]}>
            <Text style={[styles.tipNumberText, { color: colors.card }]}>{item.number}</Text>
          </View>
          <View style={styles.tipContent}>
            {item.title && (
              <Text style={[styles.tipTitle, { color: colors.text }]}>{item.title}</Text>
            )}
            <Text style={[styles.tipText, { color: colors.textSecondary }]}>{item.content}</Text>
          </View>
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
  tipCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: Platform.OS === "android" ? StyleSheet.hairlineWidth : 0,
  },
  tipNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  tipNumberText: {
    fontSize: 16,
    fontWeight: "600",
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
