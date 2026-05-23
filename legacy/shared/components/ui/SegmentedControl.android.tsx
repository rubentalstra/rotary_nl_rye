/**
 * Android Segmented Control using React Native components
 * Custom implementation for reliable text rendering
 */

import { StyleSheet, View, Text, TouchableOpacity, type ViewStyle } from "react-native";
import { useTheme } from "@/core/theme";

interface SegmentedControlProps {
  values: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  style?: ViewStyle;
}

export function SegmentedControl({
  values,
  selectedIndex,
  onChange,
  style,
}: SegmentedControlProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
        style,
      ]}
    >
      {values.map((value, index) => {
        const isSelected = index === selectedIndex;
        const isFirst = index === 0;
        const isLast = index === values.length - 1;

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => onChange(index)}
            style={[
              styles.segment,
              isSelected && [styles.selectedSegment, { backgroundColor: colors.primary }],
              isFirst && styles.firstSegment,
              isLast && styles.lastSegment,
              !isLast && [styles.segmentBorder, { borderRightColor: colors.border }],
            ]}
          >
            <Text
              style={[
                styles.segmentText,
                { color: isSelected ? "#FFFFFF" : colors.text },
                isSelected && styles.selectedText,
              ]}
              numberOfLines={1}
            >
              {value}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedSegment: {
    elevation: 2,
  },
  firstSegment: {
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  lastSegment: {
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  segmentBorder: {
    borderRightWidth: 1,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  selectedText: {
    fontWeight: "600",
  },
});
