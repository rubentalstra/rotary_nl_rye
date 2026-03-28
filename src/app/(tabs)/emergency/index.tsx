import { useState } from "react";
import { ScrollView, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

function CallButton({ contact }: { contact: EmergencyContact }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Ionicons name="call" size={18} className="text-primary" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{contact.name} bellen?</AlertDialogTitle>
          <AlertDialogDescription>
            Je belt naar {contact.phone}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>Annuleren</Text>
          </AlertDialogCancel>
          <AlertDialogAction
            onPress={() => {
              if (Platform.OS === "ios")
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              makePhoneCall(contact.phone, contact.name);
            }}
          >
            <Text>Bellen</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function ContactCard({ contact }: { contact: EmergencyContact }) {
  return (
    <Card className="mb-2">
      <CardContent className="flex-row items-center p-3">
        <View className="flex-1">
          <Text className="text-base font-semibold">{contact.name}</Text>
          <Text variant="muted">{contact.role}</Text>
          <Text variant="small" className="text-accent mt-0.5 font-medium">
            {contact.phone}
          </Text>
        </View>
        <View className="flex-row gap-2">
          <CallButton contact={contact} />
          {contact.email && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onPress={() => {
                if (Platform.OS === "ios")
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                sendEmail(contact.email!, contact.name);
              }}
            >
              <Ionicons name="mail" size={18} className="text-primary" />
            </Button>
          )}
        </View>
      </CardContent>
    </Card>
  );
}

function EmergencySectionGroup({ section }: { section: EmergencySection }) {
  return (
    <View className="mb-6">
      <View className="flex-row items-center gap-2 mb-3">
        <Ionicons
          name={section.icon as keyof typeof Ionicons.glyphMap}
          size={20}
          className="text-primary"
        />
        <Text variant="h4">{section.title}</Text>
      </View>
      {section.description && (
        <Text variant="muted" className="mb-3">
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
      <View className={`p-4 ${Platform.OS === "android" ? "pb-24" : "pb-10"}`}>
        {/* 112 Emergency Section */}
        <Card className="mb-6 border-destructive/30">
          <CardContent className="items-center p-5">
            <Badge variant="destructive" className="mb-3">
              <Text className="text-sm font-bold">NOODGEVAL</Text>
            </Badge>
            <Text variant="h3" className="mb-2">
              Emergency Services
            </Text>
            <Text variant="muted" className="text-center mb-4">
              112 for ambulance, fire brigade or police
            </Text>
            <Image
              source={require("../../../../assets/emergency/112_logo.png")}
              style={{ width: 180, height: 90 }}
              contentFit="contain"
            />
          </CardContent>
        </Card>

        {/* Contact Sections */}
        {emergencySections.map((section) => (
          <EmergencySectionGroup key={section.id} section={section} />
        ))}

        {/* Important Reminder */}
        <Card className="mt-2 border-l-4 border-l-secondary">
          <CardContent className="p-4">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons name="information-circle" size={22} className="text-secondary" />
              <Text variant="h4">Important Reminder</Text>
            </View>
            <Text variant="p">
              Always keep your host family's contact information and home address accessible.
            </Text>
            <Text variant="p" className="mt-2">
              Your host parents can assist you with medical appointments, hospital visits, or
              dental care.
            </Text>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
