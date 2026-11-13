import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

import { useTranslation } from "@/lib/i18n/use-translation";
import { useTheme } from "@/lib/theme/use-theme";

export default function TabsLayout() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      tintColor={theme.primary}
      backgroundColor={theme.backgroundElevated}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>{t("tabs.home")}</NativeTabs.Trigger.Label>
        {Platform.select({
          ios: <NativeTabs.Trigger.Icon sf={{ default: "house", selected: "house.fill" }} />,
          android: <NativeTabs.Trigger.Icon md="home" />,
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="about">
        <NativeTabs.Trigger.Label>{t("tabs.about")}</NativeTabs.Trigger.Label>
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
        <NativeTabs.Trigger.Label>{t("tabs.emergency")}</NativeTabs.Trigger.Label>
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
        <NativeTabs.Trigger.Label>{t("tabs.contact")}</NativeTabs.Trigger.Label>
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
        <NativeTabs.Trigger.Label>{t("tabs.settings")}</NativeTabs.Trigger.Label>
        {Platform.select({
          ios: <NativeTabs.Trigger.Icon sf="gearshape" />,
          android: <NativeTabs.Trigger.Icon md="settings" />,
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
