import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, DynamicColorIOS, useColorScheme } from "react-native";
import { THEME } from "@/lib/theme";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const primaryColor = colorScheme === "dark" ? THEME.dark.primary : THEME.light.primary;

  const tintColor =
    Platform.OS === "ios"
      ? DynamicColorIOS({ dark: THEME.dark.primary, light: THEME.light.primary })
      : primaryColor;

  const labelColor =
    Platform.OS === "ios" ? DynamicColorIOS({ dark: "white", light: "black" }) : undefined;

  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      disableTransparentOnScrollEdge
      tintColor={tintColor}
      labelStyle={labelColor ? { color: labelColor } : undefined}
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
              selectedColor={primaryColor}
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
              selectedColor={primaryColor}
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
              selectedColor={primaryColor}
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
              selectedColor={primaryColor}
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
              selectedColor={primaryColor}
            />
          ),
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
