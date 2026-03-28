import { ScrollView, View, Pressable, Platform, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { emergencySections } from "@/lib/data/emergency-contacts";
import { makePhoneCall, sendEmail } from "@/lib/utils/communications";
import type { EmergencyContact, EmergencySection } from "@/lib/types";

function EmergencyContactCard({ contact }: { contact: EmergencyContact }) {
  const handleCall = () => {
    if (Platform.OS === "ios") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    makePhoneCall(contact.phone, contact.name);
  };

  const handleEmail = () => {
    if (contact.email) {
      if (Platform.OS === "ios") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      sendEmail(contact.email, contact.name);
    }
  };

  return (
    <Card className="mb-2">
      <CardContent className="flex-row items-center p-3">
        <View className="flex-1">
          <Text className="text-lg font-semibold">{contact.name}</Text>
          <Text className="text-sm text-muted-foreground">{contact.role}</Text>
          <Text className="text-sm font-medium text-accent">{contact.phone}</Text>
        </View>
        <View className="flex-row gap-2">
          <Pressable
            onPress={handleCall}
            className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center"
          >
            <Ionicons name="call" size={20} className="text-primary" />
          </Pressable>
          {contact.email && (
            <Pressable
              onPress={handleEmail}
              className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center"
            >
              <Ionicons name="mail" size={20} className="text-primary" />
            </Pressable>
          )}
        </View>
      </CardContent>
    </Card>
  );
}

function EmergencySectionGroup({ section }: { section: EmergencySection }) {
  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-2">
        <Ionicons
          name={section.icon as keyof typeof Ionicons.glyphMap}
          size={20}
          className="text-primary"
        />
        <Text className="text-xl font-bold ml-2">{section.title}</Text>
      </View>
      {section.description && (
        <Text className="text-sm text-muted-foreground mb-3 leading-5">{section.description}</Text>
      )}
      {section.contacts.map((contact) => (
        <EmergencyContactCard key={contact.id} contact={contact} />
      ))}
    </View>
  );
}

export default function EmergencyScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className={`p-3 ${Platform.OS === "android" ? "pb-24" : "pb-10"}`}>
        {/* 112 Section */}
        <Card className="mb-4 border-destructive/20 bg-destructive/5">
          <CardContent className="items-center p-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="warning" size={24} className="text-destructive" />
              <Text className="text-xl font-bold ml-2">Emergency Services</Text>
            </View>
            <Text className="text-base text-muted-foreground text-center mb-3">
              112 for ambulance, fire brigade or police
            </Text>
            <Image
              source={require("@/assets/emergency/112_logo.png")}
              style={{ width: 200, height: 100 }}
              contentFit="contain"
            />
          </CardContent>
        </Card>

        {/* Contact Sections */}
        {emergencySections.map((section) => (
          <EmergencySectionGroup key={section.id} section={section} />
        ))}

        {/* Important Note */}
        <Card className="mt-2 border-l-4 border-l-warning bg-warning/5">
          <CardContent className="p-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="information-circle" size={24} className="text-warning" />
              <Text className="text-lg font-semibold ml-2">Important Reminder</Text>
            </View>
            <Text className="text-base leading-6 text-muted-foreground mb-2">
              Always keep your host family's contact information and home address accessible.
            </Text>
            <Text className="text-base leading-6 text-muted-foreground">
              Your host parents can assist you with medical appointments, hospital visits, or dental
              care.
            </Text>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
