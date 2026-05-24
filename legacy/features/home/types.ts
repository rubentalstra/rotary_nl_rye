/**
 * Home feature types
 */

import type { Ionicons, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";

export interface HomeCardProps {
  icon?: keyof typeof Ionicons.glyphMap;
  fontistoIcon?: keyof typeof Fontisto.glyphMap;
  materialIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  variant?: "default" | "single";
  useSvg?: boolean;
  svgSource?: number | { uri: string };
  onPress?: () => void;
}

export interface CarouselImage {
  id: string;
  source: number | { uri: string };
}
