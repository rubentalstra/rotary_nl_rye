import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, DynamicColorIOS } from "react-native";
import { useTheme } from "@/core/theme";

export default function TabLayout() {
  const { colors: themeColors } = useTheme();

  // Use DynamicColorIOS for liquid glass effect on iOS
  const tintColor =
    Platform.OS === "ios"
      ? DynamicColorIOS({
          dark: themeColors.primary,
          light: themeColors.primary,
        })
      : themeColors.primary;

  const labelColor =
    Platform.OS === "ios"
      ? DynamicColorIOS({
          dark: "white",
          light: "black",
        })
      : undefined;

  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      disableTransparentOnScrollEdge
      tintColor={tintColor}
      labelStyle={
        labelColor
          ? {
              color: labelColor,
            }
          : undefined
      }
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        {Platform.select({
          ios: (
            <NativeTabs.Trigger.Icon
              sf={{ default: "house", selected: "house.fill" }}
              selectedColor={tintColor}
            />
          ),
          android: (
            <NativeTabs.Trigger.Icon
              src={<NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="home" />}
              selectedColor={themeColors.primary}
            />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="about">
        <NativeTabs.Trigger.Label>About</NativeTabs.Trigger.Label>
        {Platform.select({
          ios: (
            <NativeTabs.Trigger.Icon
              sf={{ default: "info.circle", selected: "info.circle.fill" }}
              selectedColor={tintColor}
            />
          ),
          android: (
            <NativeTabs.Trigger.Icon
              src={<NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="info" />}
              selectedColor={themeColors.primary}
            />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="emergency">
        <NativeTabs.Trigger.Label>Emergency</NativeTabs.Trigger.Label>
        {Platform.select({
          ios: (
            <NativeTabs.Trigger.Icon
              sf={{
                default: "exclamationmark.triangle",
                selected: "exclamationmark.triangle.fill",
              }}
              selectedColor={tintColor}
            />
          ),
          android: (
            <NativeTabs.Trigger.Icon
              src={<NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="warning" />}
              selectedColor={themeColors.primary}
            />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="contact">
        <NativeTabs.Trigger.Label>Contact</NativeTabs.Trigger.Label>
        {Platform.select({
          ios: (
            <NativeTabs.Trigger.Icon
              sf={{ default: "person.2", selected: "person.2.fill" }}
              selectedColor={tintColor}
            />
          ),
          android: (
            <NativeTabs.Trigger.Icon
              src={<NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="people" />}
              selectedColor={themeColors.primary}
            />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        {Platform.select({
          ios: (
            <NativeTabs.Trigger.Icon
              sf={{ default: "gear", selected: "gear" }}
              selectedColor={tintColor}
            />
          ),
          android: (
            <NativeTabs.Trigger.Icon
              src={<NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="settings" />}
              selectedColor={themeColors.primary}
            />
          ),
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
