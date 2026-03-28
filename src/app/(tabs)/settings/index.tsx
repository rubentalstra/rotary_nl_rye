import { ScrollView, View, Pressable, Platform, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as StoreReview from "expo-store-review";
import * as WebBrowser from "expo-web-browser";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { APP_VERSION, APP_BUILD, SOCIAL_URLS } from "@/lib/constants";

function SettingsRow({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}) {
  const content = (
    <View className="flex-row items-center py-4">
      <View className="w-10 h-10 rounded-xl bg-muted items-center justify-center mr-4">
        <Ionicons name={icon} size={20} className="text-foreground" />
      </View>
      <View className="flex-1">
        <Text className="text-base text-foreground">{title}</Text>
        {subtitle && (
          <Text className="text-sm text-muted-foreground mt-0.5">{subtitle}</Text>
        )}
      </View>
      {onPress && (
        <Ionicons name="chevron-forward" size={18} className="text-muted-foreground" />
      )}
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable onPress={onPress} className="active:opacity-60">
      {content}
    </Pressable>
  );
}

export default function SettingsScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className={`px-6 pt-4 ${Platform.OS === "android" ? "pb-28" : "pb-12"}`}>
        {/* General */}
        <Text className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 mt-4">
          Algemeen
        </Text>
        <SettingsRow
          icon="logo-instagram"
          title="Volg ons op Instagram"
          subtitle="@rotexnederland"
          onPress={() => Linking.openURL(`${SOCIAL_URLS.INSTAGRAM}rotexnederland`)}
        />
        <Separator />
        <SettingsRow
          icon="star-outline"
          title="Beoordeel de App"
          subtitle={
            Platform.OS === "ios"
              ? "App Store beoordeling"
              : "Play Store beoordeling"
          }
          onPress={async () => {
            if (await StoreReview.isAvailableAsync()) {
              await StoreReview.requestReview();
            }
          }}
        />

        {/* Development */}
        <Text className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 mt-8">
          Ontwikkeling
        </Text>
        <SettingsRow
          icon="people-outline"
          title="Bijdragers"
          subtitle="Bekijk app-bijdragers"
          onPress={() => router.push("/settings/contributors")}
        />
        <Separator />
        <SettingsRow
          icon="information-circle-outline"
          title="App Versie"
          subtitle={`${APP_VERSION} (${APP_BUILD})`}
        />

        {/* Legal */}
        <Text className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 mt-8">
          Juridisch
        </Text>
        <SettingsRow
          icon="shield-checkmark-outline"
          title="Privacybeleid"
          onPress={() =>
            WebBrowser.openBrowserAsync("https://www.rotary.nl/yep/privacy-policy")
          }
        />
        <Separator />
        <SettingsRow
          icon="document-text-outline"
          title="Algemene Voorwaarden"
          onPress={() =>
            WebBrowser.openBrowserAsync("https://www.rotary.nl/yep/terms-and-conditions")
          }
        />

        {/* Footer */}
        <View className="items-center mt-12">
          <Text className="text-xs text-muted-foreground">
            Rotary Youth Exchange Netherlands
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
