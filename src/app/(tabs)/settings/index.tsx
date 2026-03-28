import { ScrollView, View, Platform, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as StoreReview from "expo-store-review";
import * as WebBrowser from "expo-web-browser";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { APP_VERSION, APP_BUILD, SOCIAL_URLS } from "@/lib/constants";

function SettingsButton({
  title,
  subtitle,
  onPress,
}: {
  title: string;
  subtitle?: string;
  onPress?: () => void;
}) {
  if (!onPress) {
    return (
      <View className="flex-row items-center justify-between py-3 px-1">
        <View className="flex-1 mr-4">
          <Text className="text-base">{title}</Text>
          {subtitle && <Text variant="muted" className="mt-0.5">{subtitle}</Text>}
        </View>
      </View>
    );
  }

  return (
    <Button
      variant="ghost"
      className="h-auto justify-between py-3 px-1"
      onPress={onPress}
    >
      <View className="flex-1 mr-4">
        <Text className="text-base text-left">{title}</Text>
        {subtitle && (
          <Text variant="muted" className="mt-0.5 text-left">
            {subtitle}
          </Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={18} className="text-muted-foreground" />
    </Button>
  );
}

export default function SettingsScreen() {
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
      <View className={`p-4 ${Platform.OS === "android" ? "pb-24" : "pb-10"}`}>
        {/* General */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Algemeen
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-2">
            <SettingsButton
              title="Volg ons op Instagram"
              subtitle="@rotexnederland"
              onPress={handleInstagram}
            />
            <Separator />
            <SettingsButton
              title="Beoordeel de App"
              subtitle={
                Platform.OS === "ios"
                  ? "Laat een beoordeling achter in de App Store"
                  : "Laat een beoordeling achter in de Play Store"
              }
              onPress={handleStoreReview}
            />
          </CardContent>
        </Card>

        {/* Development */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Ontwikkeling
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-2">
            <SettingsButton
              title="Bijdragers"
              subtitle="Bekijk app-bijdragers"
              onPress={() => router.push("/settings/contributors")}
            />
            <Separator />
            <SettingsButton
              title="App Versie"
              subtitle={`${APP_VERSION} (${APP_BUILD})`}
            />
          </CardContent>
        </Card>

        {/* Legal */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Juridisch
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-2">
            <SettingsButton title="Privacybeleid" onPress={handlePrivacyPolicy} />
            <Separator />
            <SettingsButton title="Algemene Voorwaarden" onPress={handleTerms} />
          </CardContent>
        </Card>

        {/* Footer */}
        <View className="items-center mt-4">
          <Text variant="muted" className="text-xs">
            Rotary Youth Exchange Netherlands
          </Text>
          <Text variant="muted" className="text-xs mt-1">
            Made with love for exchange students worldwide
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
