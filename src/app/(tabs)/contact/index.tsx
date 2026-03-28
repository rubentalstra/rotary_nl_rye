import { useState, useCallback } from "react";
import { View, Platform, Pressable } from "react-native";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { contactSections } from "@/lib/data/contacts";
import { makePhoneCall, sendEmail } from "@/lib/utils/communications";
import type { Contact, ContactCategory } from "@/lib/types";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

function ContactCard({ contact, onPress }: { contact: Contact; onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Card className="mb-3">
        <CardContent className="flex-row items-center p-3">
          <Avatar alt={contact.name} className="h-12 w-12 mr-3">
            {contact.imageUrl ? (
              <AvatarImage source={{ uri: contact.imageUrl }} />
            ) : null}
            <AvatarFallback>
              <Text className="text-sm font-medium">{getInitials(contact.name)}</Text>
            </AvatarFallback>
          </Avatar>
          <View className="flex-1">
            <Text className="text-base font-semibold">{contact.name}</Text>
            <Text className="text-sm text-muted-foreground">{contact.role}</Text>
            {contact.club && (
              <Text className="text-xs text-muted-foreground mt-0.5">{contact.club}</Text>
            )}
          </View>
        </CardContent>
      </Card>
    </Pressable>
  );
}

export default function ContactScreen() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("mdjc");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const currentSection = contactSections.find((s) => s.id === activeTab);
  const contacts = currentSection?.contacts ?? [];

  const handleContactPress = useCallback((contact: Contact) => {
    setSelectedContact(contact);
    setDialogOpen(true);
  }, []);

  return (
    <View className="flex-1 bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <View className="px-4 py-3">
          <TabsList className="flex-row">
            {contactSections.map((section) => (
              <TabsTrigger key={section.id} value={section.id} className="flex-1">
                <Text>{section.title}</Text>
              </TabsTrigger>
            ))}
          </TabsList>
        </View>

        {contactSections.map((section) => (
          <TabsContent key={section.id} value={section.id} className="flex-1">
            <FlashList
              data={section.contacts}
              renderItem={({ item }) => (
                <ContactCard contact={item} onPress={() => handleContactPress(item)} />
              )}
              keyExtractor={(item) => item.id}
              estimatedItemSize={80}
              contentContainerClassName={`px-4 pt-3 ${Platform.OS === "android" ? "pb-24" : "pb-10"}`}
              ListEmptyComponent={
                <View className="flex-1 items-center justify-center py-16 px-8">
                  <Text className="text-xl font-semibold text-primary mb-2">
                    Geen contacten beschikbaar
                  </Text>
                  <Text className="text-base text-center text-muted-foreground leading-[22px]">
                    Er zijn momenteel geen contacten in deze sectie.
                  </Text>
                </View>
              }
            />
          </TabsContent>
        ))}
      </Tabs>

      {/* Contact Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedContact?.name}</DialogTitle>
            <DialogDescription>{selectedContact?.role}</DialogDescription>
          </DialogHeader>
          {selectedContact?.bio && (
            <Text className="text-sm text-muted-foreground leading-5 mb-4">
              {selectedContact.bio}
            </Text>
          )}
          <View className="gap-2">
            {selectedContact?.phone && (
              <Button
                onPress={() => makePhoneCall(selectedContact.phone!, selectedContact.name)}
              >
                <Text>Bellen</Text>
              </Button>
            )}
            {selectedContact?.email && (
              <Button
                variant="secondary"
                onPress={() => sendEmail(selectedContact.email!, selectedContact.name)}
              >
                <Text>E-mail</Text>
              </Button>
            )}
          </View>
        </DialogContent>
      </Dialog>
    </View>
  );
}
