import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";

export default function InboundFamilyToFamilyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center" edges={["bottom"]}>
      <View className="p-8 items-center">
        <Text className="text-xl font-semibold text-primary mb-2">Binnenkort beschikbaar</Text>
        <Text className="text-base text-muted-foreground text-center">
          Informatie over inbound Family to Family wordt binnenkort toegevoegd.
        </Text>
      </View>
    </SafeAreaView>
  );
}
