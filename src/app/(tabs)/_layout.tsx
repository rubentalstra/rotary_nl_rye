import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

import { useTheme } from "@/lib/theme/use-theme";

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      tintColor={theme.primary}
      backgroundColor={theme.backgroundElevated}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        {Platform.select({
          ios: <NativeTabs.Trigger.Icon sf={{ default: "house", selected: "house.fill" }} />,
          android: <NativeTabs.Trigger.Icon md="home" />,
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="about">
        <NativeTabs.Trigger.Label>Over</NativeTabs.Trigger.Label>
        {Platform.select({
          ios: (
            <NativeTabs.Trigger.Icon
              sf={{ default: "info.circle", selected: "info.circle.fill" }}
            />
          ),
          android: <NativeTabs.Trigger.Icon md="info" />,
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="emergency">
        <NativeTabs.Trigger.Label>Noodgeval</NativeTabs.Trigger.Label>
        {Platform.select({
          ios: (
            <NativeTabs.Trigger.Icon
              sf={{
                default: "exclamationmark.triangle",
                selected: "exclamationmark.triangle.fill",
              }}
            />
          ),
          android: <NativeTabs.Trigger.Icon md="warning" />,
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="contact">
        <NativeTabs.Trigger.Label>Contact</NativeTabs.Trigger.Label>
        {Platform.select({
          ios: (
            <NativeTabs.Trigger.Icon
              sf={{ default: "person.2", selected: "person.2.fill" }}
            />
          ),
          android: <NativeTabs.Trigger.Icon md="people" />,
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Instellingen</NativeTabs.Trigger.Label>
        {Platform.select({
          ios: <NativeTabs.Trigger.Icon sf="gearshape" />,
          android: <NativeTabs.Trigger.Icon md="settings" />,
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
