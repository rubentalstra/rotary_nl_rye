/**
 * iOS Segmented Control using @expo/ui SwiftUI Picker
 */

import { Host, Picker, Text } from "@expo/ui/swift-ui";
import { pickerStyle, tag } from "@expo/ui/swift-ui/modifiers";
import { StyleSheet, View, type ViewStyle } from "react-native";

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
  return (
    <View style={[styles.container, style]}>
      <Host matchContents style={styles.host}>
        <Picker
          selection={selectedIndex}
          onSelectionChange={(value) => onChange(value as number)}
          modifiers={[pickerStyle("segmented")]}
        >
          {values.map((label, index) => (
            <Text key={label} modifiers={[tag(index)]}>
              {label}
            </Text>
          ))}
        </Picker>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  host: {
    width: "100%",
  },
});
