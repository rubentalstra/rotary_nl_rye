import React, { useCallback } from "react";
import { View, Text, Pressable, Platform } from "react-native";
import { Ionicons, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import type { HomeCardProps } from "@/lib/types";
import { cn } from "@/lib/utils";

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
    const isDefault = variant === "default";

    const handlePress = useCallback(() => {
      if (Platform.OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      onPress?.();
    }, [onPress]);

    return (
      <View className="flex-1 px-[5px]">
        <Pressable
          className={cn(
            "rounded-[10px] bg-card shadow-sm",
            isDefault ? "h-[120px]" : "h-[80px]",
          )}
          style={({ pressed }) => (pressed ? { transform: [{ scale: 0.98 }], opacity: 0.8 } : {})}
          onPress={handlePress}
          android_ripple={{ color: "rgba(0,103,200,0.12)", borderless: false }}
        >
          <View className="flex-1 items-center justify-center p-4">
            <View className={isDefault ? "mb-4" : "mb-2.5"}>
              {useSvg && svgSource ? (
                <Image
                  source={svgSource}
                  style={{ width: 35, height: 35 }}
                  contentFit="contain"
                  tintColor="hsl(216 73% 32%)"
                />
              ) : materialIcon ? (
                <MaterialCommunityIcons name={materialIcon} size={35} className="text-primary" />
              ) : fontistoIcon ? (
                <Fontisto name={fontistoIcon} size={35} className="text-primary" />
              ) : (
                <Ionicons name={icon} size={35} className="text-primary" />
              )}
            </View>
            <Text
              className={cn(
                "text-sm font-normal text-center text-primary",
                isDefault && "max-w-[80px]",
              )}
            >
              {title}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  },
);

HomeCard.displayName = "HomeCard";
