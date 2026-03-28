import { useState, useCallback, useRef } from "react";
import { View, Platform, Pressable, Linking, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { contactSections } from "@/lib/data/contacts";
import { makePhoneCall, sendEmail, openWhatsApp } from "@/lib/utils/communications";
import type { Contact } from "@/lib/types";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

function ActionButton({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="items-center active:opacity-60">
      <View className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center mb-1">
        <Ionicons name={icon} size={22} className="text-primary" />
      </View>
      <Text className="text-xs text-muted-foreground">{label}</Text>
    </Pressable>
  );
}

export default function ContactScreen() {
  const [activeTab, setActiveTab] = useState<string>("mdjc");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();

  const currentSection = contactSections.find((s) => s.id === activeTab);
  const contacts = currentSection?.contacts ?? [];

  const handleContactPress = useCallback((contact: Contact) => {
    setSelectedContact(contact);
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <View style={{ flex: 1 }} className="bg-background">
      {/* Fixed Tabs at top — does NOT scroll */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <View className="px-4 pt-3 pb-2">
          <TabsList className="flex-row w-full">
            {contactSections.map((section) => (
              <TabsTrigger key={section.id} value={section.id} className="flex-1">
                <Text>{section.title}</Text>
              </TabsTrigger>
            ))}
          </TabsList>
        </View>
      </Tabs>

      {/* Scrollable contact list */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "android" ? 100 : 40,
        }}
      >
        {contacts.map((contact, idx) => (
          <View key={contact.id}>
            {idx > 0 && (
              <View className="pl-[76px] pr-6">
                <Separator />
              </View>
            )}
            <Pressable
              onPress={() => handleContactPress(contact)}
              className="flex-row items-center py-3.5 px-6 active:opacity-60"
            >
              <Avatar alt={contact.name} className="h-11 w-11 mr-4">
                {contact.imageUrl ? <AvatarImage source={{ uri: contact.imageUrl }} /> : null}
                <AvatarFallback>
                  <Text className="text-sm font-medium">{getInitials(contact.name)}</Text>
                </AvatarFallback>
              </Avatar>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">{contact.name}</Text>
                <Text className="text-sm text-muted-foreground">{contact.role}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} className="text-muted-foreground" />
            </Pressable>
          </View>
        ))}

        {contacts.length === 0 && (
          <View className="items-center py-16 px-8">
            <Text className="text-base text-muted-foreground">Geen contacten gevonden</Text>
          </View>
        )}
      </ScrollView>

      {/* Contact Detail Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["85%"]}
        enablePanDownToClose
        topInset={insets.top}
        onClose={() => setSelectedContact(null)}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
        )}
        backgroundStyle={{ backgroundColor: "white" }}
        handleIndicatorStyle={{ backgroundColor: "#d1d5db", width: 40 }}
      >
        {selectedContact && (
          <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 40 }}>
            <View className="items-center px-6 pt-4 pb-6">
              <Avatar alt={selectedContact.name} className="h-24 w-24 mb-4">
                {selectedContact.imageUrl ? (
                  <AvatarImage source={{ uri: selectedContact.imageUrl }} />
                ) : null}
                <AvatarFallback>
                  <Text className="text-2xl font-bold">
                    {getInitials(selectedContact.name)}
                  </Text>
                </AvatarFallback>
              </Avatar>
              <Text className="text-2xl font-bold text-foreground text-center">
                {selectedContact.name}
              </Text>
              <Text className="text-base text-muted-foreground text-center mt-1">
                {selectedContact.role}
              </Text>
              {selectedContact.club && (
                <Badge variant="secondary" className="mt-3">
                  <Text className="text-xs">{selectedContact.club}</Text>
                </Badge>
              )}
              {selectedContact.district && (
                <Text className="text-sm text-muted-foreground mt-1">
                  {selectedContact.district}
                </Text>
              )}
            </View>

            <View className="flex-row justify-center gap-8 px-6 pb-6">
              {selectedContact.phone && (
                <ActionButton
                  icon="call"
                  label="Bellen"
                  onPress={() => makePhoneCall(selectedContact.phone!, selectedContact.name)}
                />
              )}
              {selectedContact.email && (
                <ActionButton
                  icon="mail"
                  label="E-mail"
                  onPress={() => sendEmail(selectedContact.email!, selectedContact.name)}
                />
              )}
              {selectedContact.whatsapp && (
                <ActionButton
                  icon="logo-whatsapp"
                  label="WhatsApp"
                  onPress={() => openWhatsApp(selectedContact.whatsapp!)}
                />
              )}
              {selectedContact.socialMedia?.instagram && (
                <ActionButton
                  icon="logo-instagram"
                  label="Instagram"
                  onPress={() =>
                    Linking.openURL(
                      `https://instagram.com/${selectedContact.socialMedia!.instagram}`,
                    )
                  }
                />
              )}
            </View>

            <Separator className="mx-6" />

            {selectedContact.functions.length > 0 && (
              <View className="px-6 py-5">
                <Text className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Functies
                </Text>
                {selectedContact.functions.map((fn, idx) => (
                  <View key={idx} className="flex-row items-center py-1.5">
                    <View className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                    <Text className="text-base text-foreground">{fn}</Text>
                  </View>
                ))}
              </View>
            )}

            {selectedContact.bio && (
              <>
                <Separator className="mx-6" />
                <View className="px-6 py-5">
                  <Text className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Over
                  </Text>
                  <Text className="text-base leading-7 text-foreground">
                    {selectedContact.bio}
                  </Text>
                </View>
              </>
            )}

            <Separator className="mx-6" />
            <View className="px-6 py-5">
              <Text className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Contactgegevens
              </Text>
              {selectedContact.phone && (
                <Pressable
                  onPress={() => makePhoneCall(selectedContact.phone!, selectedContact.name)}
                  className="flex-row items-center py-2.5 active:opacity-60"
                >
                  <Ionicons name="call-outline" size={20} className="text-muted-foreground mr-3" />
                  <Text className="text-base text-primary">{selectedContact.phone}</Text>
                </Pressable>
              )}
              {selectedContact.email && (
                <Pressable
                  onPress={() => sendEmail(selectedContact.email!, selectedContact.name)}
                  className="flex-row items-center py-2.5 active:opacity-60"
                >
                  <Ionicons name="mail-outline" size={20} className="text-muted-foreground mr-3" />
                  <Text className="text-base text-primary">{selectedContact.email}</Text>
                </Pressable>
              )}
            </View>
          </BottomSheetScrollView>
        )}
      </BottomSheet>
    </View>
  );
}
