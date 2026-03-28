import { ScrollView, View, Platform, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as StoreReview from "expo-store-review";
import * as WebBrowser from "expo-web-browser";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { Pressable } from "react-native";
import { APP_VERSION, APP_BUILD, SOCIAL_URLS } from "@/lib/constants";

function SettingsRow({
  title,
  subtitle,
  onPress,
}: {
  title: string;
  subtitle?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center justify-between py-3"
    >
      <View className="flex-1 mr-4">
        <Text className="text-base">{title}</Text>
        {subtitle && (
          <Text className="text-sm text-muted-foreground mt-0.5">{subtitle}</Text>
        )}
      </View>
      {onPress && (
        <Ionicons name="chevron-forward" size={18} className="text-muted-foreground" />
      )}
    </Pressable>
  );
}

function SettingsGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="mb-3">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-1">{children}</CardContent>
    </Card>
  );
}

export default function SettingsScreen() {
  const { t } = useTranslation();

  const handleInstagram = () => {
    Linking.openURL(`${SOCIAL_URLS.INSTAGRAM}rotexnederland`);
  };

  const handleStoreReview = async () => {
    if (await StoreReview.isAvailableAsync()) {
      await StoreReview.requestReview();
    }
  };

  const handlePrivacyPolicy = () => {
    WebBrowser.openBrowserAsync("https://www.rotary.nl/yep/privacy-policy");
  };

  const handleTerms = () => {
    WebBrowser.openBrowserAsync("https://www.rotary.nl/yep/terms-and-conditions");
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className={`p-3 ${Platform.OS === "android" ? "pb-24" : "pb-10"}`}>
        <SettingsGroup title="Algemeen">
          <SettingsRow
            title="Volg ons op Instagram"
            subtitle="@rotexnederland"
            onPress={handleInstagram}
          />
          <Separator />
          <SettingsRow
            title="Beoordeel de App"
            subtitle={
              Platform.OS === "ios"
                ? "Laat een beoordeling achter in de App Store"
                : "Laat een beoordeling achter in de Play Store"
            }
            onPress={handleStoreReview}
          />
        </SettingsGroup>

        <SettingsGroup title="Ontwikkeling">
          <SettingsRow
            title="Bijdragers"
            subtitle="Bekijk app-bijdragers"
            onPress={() => router.push("/settings/contributors")}
          />
          <Separator />
          <SettingsRow
            title="App Versie"
            subtitle={`${APP_VERSION} (${APP_BUILD})`}
          />
        </SettingsGroup>

        <SettingsGroup title="Juridisch">
          <SettingsRow title="Privacybeleid" onPress={handlePrivacyPolicy} />
          <Separator />
          <SettingsRow title="Algemene Voorwaarden" onPress={handleTerms} />
        </SettingsGroup>

        {/* Footer */}
        <View className="items-center mt-6">
          <Text className="text-xs text-muted-foreground">
            Rotary Youth Exchange Netherlands
          </Text>
          <Text className="text-xs text-muted-foreground mt-1">
            Made with love for exchange students worldwide
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
