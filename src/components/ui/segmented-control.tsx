import {
  SegmentedControl as ExpoSegmentedControl,
  type NativeSegmentedControlChangeEvent,
} from "@expo/ui/community/segmented-control";
import type { StyleProp, ViewStyle } from "react-native";

import { useTheme } from "@/lib/theme/use-theme";

interface SegmentedControlProps {
  values: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Drop-in replacement for `@react-native-segmented-control/segmented-control`,
 * routed through `@expo/ui/community/segmented-control`. Renders a native iOS
 * `UISegmentedControl` on iOS and a Material 3 `SegmentedButton` on Android —
 * same single React file for both.
 */
export function SegmentedControl({
  values,
  selectedIndex,
  onChange,
  style,
}: SegmentedControlProps) {
  const theme = useTheme();
  return (
    <ExpoSegmentedControl
      values={values}
      selectedIndex={selectedIndex}
      tintColor={theme.primary}
      style={style}
      onChange={(event: NativeSegmentedControlChangeEvent) =>
        onChange(event.nativeEvent.selectedSegmentIndex)
      }
    />
  );
}
