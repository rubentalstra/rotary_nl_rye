import { ScrollView, View, Pressable, Platform, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { emergencySections } from "@/lib/data/emergency-contacts";
import { makePhoneCall, sendEmail } from "@/lib/utils/communications";
import type { EmergencyContact, EmergencySection } from "@/lib/types";

function ContactRow({ contact }: { contact: EmergencyContact }) {
  return (
    <View className="flex-row items-center py-4">
      <View className="flex-1">
        <Text className="text-base font-semibold text-foreground">{contact.name}</Text>
        <Text className="text-sm text-muted-foreground mt-0.5">{contact.role}</Text>
        <Text className="text-sm text-primary font-medium mt-0.5">{contact.phone}</Text>
      </View>
      <View className="flex-row gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
              <Ionicons name="call" size={18} className="text-primary" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{contact.name} bellen?</AlertDialogTitle>
              <AlertDialogDescription>{contact.phone}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Text>Annuleren</Text>
              </AlertDialogCancel>
              <AlertDialogAction
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  makePhoneCall(contact.phone, contact.name);
                }}
              >
                <Text>Bellen</Text>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {contact.email && (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              sendEmail(contact.email!, contact.name);
            }}
          >
            <Ionicons name="mail" size={18} className="text-primary" />
          </Button>
        )}
      </View>
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
      <View className={`px-6 pt-6 ${Platform.OS === "android" ? "pb-28" : "pb-12"}`}>
        {/* 112 Section */}
        <View className="items-center mb-8">
          <View className="bg-destructive/10 rounded-full px-4 py-1.5 mb-4">
            <Text className="text-sm font-bold text-destructive">NOODGEVAL</Text>
          </View>
          <Text className="text-2xl font-bold text-foreground mb-1">112</Text>
          <Text className="text-base text-muted-foreground text-center">
            Ambulance, brandweer of politie
          </Text>
          <Image
            source={require("../../../../assets/emergency/112_logo.png")}
            style={{ width: 160, height: 80, marginTop: 16 }}
            contentFit="contain"
          />
        </View>

        <Separator className="mb-6" />

        {/* Contact Sections */}
        {emergencySections.map((section, idx) => (
          <View key={section.id}>
            {idx > 0 && <Separator className="my-6" />}

            <View className="flex-row items-center gap-2 mb-1">
              <Ionicons
                name={section.icon as keyof typeof Ionicons.glyphMap}
                size={20}
                className="text-primary"
              />
              <Text className="text-lg font-bold text-foreground">{section.title}</Text>
            </View>
            {section.description && (
              <Text className="text-sm text-muted-foreground mb-2">
                {section.description}
              </Text>
            )}

            {section.contacts.map((contact, contactIdx) => (
              <View key={contact.id}>
                {contactIdx > 0 && <Separator />}
                <ContactRow contact={contact} />
              </View>
            ))}
          </View>
        ))}

        {/* Important Reminder */}
        <Separator className="my-6" />
        <View className="border-l-2 border-secondary pl-4">
          <Text className="text-base font-semibold text-foreground mb-2">
            Belangrijk
          </Text>
          <Text className="text-base leading-7 text-muted-foreground">
            Bewaar altijd de contactgegevens en het adres van je gastgezin. Je
            gastouders kunnen je helpen met doktersafspraken, ziekenhuisbezoeken
            of tandheelkundige zorg.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
