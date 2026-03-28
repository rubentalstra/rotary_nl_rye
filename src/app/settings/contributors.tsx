import { ScrollView, View, Linking, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

const contributors = [{ name: "Ruben Talstra", role: "Lead Developer", github: "rubentalstra" }];

export default function ContributorsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className={`p-4 ${Platform.OS === "android" ? "pb-24" : "pb-8"}`}>
          <Text className="text-2xl font-semibold text-primary mb-4">Contributors</Text>
          <Text className="text-[15px] leading-[22px] text-muted-foreground mb-6">
            De mensen die aan deze app hebben bijgedragen.
          </Text>

          {contributors.map((contributor) => (
            <Card key={contributor.name} className="mb-3">
              <CardContent className="p-4">
                <Text className="text-lg font-semibold">{contributor.name}</Text>
                <Text className="text-sm text-muted-foreground">{contributor.role}</Text>
                {contributor.github && (
                  <Button
                    variant="outline"
                    className="mt-3"
                    onPress={() => Linking.openURL(`https://github.com/${contributor.github}`)}
                  >
                    <Text>GitHub</Text>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
