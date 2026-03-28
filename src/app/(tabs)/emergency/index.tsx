import { ScrollView, View, Pressable, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { emergencySections } from "@/lib/data/emergency-contacts";
import { makePhoneCall, sendEmail } from "@/lib/utils/communications";
import type { EmergencyContact, EmergencySection } from "@/lib/types";

function ContactCard({ contact }: { contact: EmergencyContact }) {
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
    <View
      className="rounded-xl bg-card p-3 mb-2 flex-row items-center"
      style={Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
        },
        android: { elevation: 2 },
      })}
    >
      <View className="flex-1">
        <Text className="text-lg font-semibold text-foreground mb-0.5">{contact.name}</Text>
        <Text className="text-sm text-muted-foreground">{contact.role}</Text>
        <Text className="text-sm font-medium text-primary mt-0.5">{contact.phone}</Text>
      </View>
      <View className="flex-row gap-2">
        <Pressable
          onPress={handleCall}
          className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center active:opacity-60"
        >
          <Ionicons name="call" size={18} className="text-primary" />
        </Pressable>
        {contact.email && (
          <Pressable
            onPress={handleEmail}
            className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center active:opacity-60"
          >
            <Ionicons name="mail" size={18} className="text-primary" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

function SectionGroup({ section }: { section: EmergencySection }) {
  return (
    <View className="mb-8">
      <View className="flex-row items-center mb-2">
        <Ionicons
          name={section.icon as keyof typeof Ionicons.glyphMap}
          size={20}
          className="text-primary"
        />
        <Text className="text-[22px] font-bold ml-2 text-foreground">{section.title}</Text>
      </View>
      {section.description && (
        <Text className="text-sm text-muted-foreground mb-3 leading-5">
          {section.description}
        </Text>
      )}
      {section.contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </View>
  );
}

export default function EmergencyScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className={`px-4 pt-3 ${Platform.OS === "android" ? "pb-[100px]" : "pb-10"}`}>
        {/* 112 Section */}
        <View
          className="rounded-2xl bg-destructive/5 p-5 mb-6 items-center"
          style={Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 20,
            },
            android: { elevation: 3 },
          })}
        >
          <View className="flex-row items-center mb-2">
            <Ionicons name="warning" size={24} className="text-destructive" />
            <Text className="text-xl font-bold ml-2 text-foreground">Emergency Services</Text>
          </View>
          <Text className="text-base text-muted-foreground text-center mb-3">
            112 for ambulance, fire brigade or police
          </Text>
          <Image
            source={require("../../../../assets/emergency/112_logo.png")}
            style={{ width: "100%", height: 100, maxWidth: 200 }}
            contentFit="contain"
          />
        </View>

        {/* Contact Sections */}
        {emergencySections.map((section) => (
          <SectionGroup key={section.id} section={section} />
        ))}

        {/* Important Note */}
        <View
          className="rounded-2xl bg-secondary/50 p-5 mt-2 border-l-4 border-l-secondary"
          style={Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            android: { elevation: 1 },
          })}
        >
          <View className="flex-row items-center mb-2">
            <Ionicons name="information-circle" size={24} className="text-primary" />
            <Text className="text-lg font-semibold ml-2 text-foreground">Important Reminder</Text>
          </View>
          <Text className="text-base leading-6 text-muted-foreground mb-2">
            Always keep your host family's contact information and home address accessible.
          </Text>
          <Text className="text-base leading-6 text-muted-foreground">
            Your host parents can assist you with medical appointments, hospital visits, or dental
            care.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
