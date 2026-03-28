import { memo, useCallback } from "react";
import { ScrollView, View, Pressable, Linking, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type {
  InfoPageContent,
  ContentBlock,
  ContentSection,
  IconName,
  CTABlock,
} from "@/lib/types";

function SectionHeader({ icon, title }: { icon?: IconName; title?: string }) {
  if (!title) return null;
  return (
    <View className="flex-row items-center mb-3 px-1">
      {icon && <Ionicons name={icon} size={22} className="text-primary" />}
      <Text className={`text-xl font-bold ${icon ? "ml-3" : ""}`}>{title}</Text>
    </View>
  );
}

function BlockRenderer({
  block,
  onCTA,
}: {
  block: ContentBlock;
  onCTA: (block: CTABlock) => void;
}) {
  switch (block.type) {
    case "text":
      return (
        <Text className="text-base leading-6 text-muted-foreground mb-4">{block.content}</Text>
      );

    case "card":
      return (
        <Card className={`mb-3 ${block.accentColor ? "border-l-4 border-l-primary" : ""}`}>
          <CardContent className="p-4">
            {block.title && (
              <View className="flex-row items-center mb-2">
                {block.icon && (
                  <Ionicons name={block.icon} size={20} className="text-primary mr-2" />
                )}
                <Text className="text-base font-semibold">{block.title}</Text>
              </View>
            )}
            <Text className="text-base leading-6 text-muted-foreground">{block.content}</Text>
          </CardContent>
        </Card>
      );

    case "highlight":
      return (
        <View className="flex-row flex-wrap justify-between mb-4">
          {block.items.map((item, idx) => (
            <View
              key={idx}
              className="w-[48%] bg-primary/5 rounded-lg p-3 mb-3 flex-row items-center"
            >
              <Ionicons name={item.icon} size={20} className="text-primary mr-2" />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">{item.title}</Text>
                <Text className="text-sm font-semibold">{item.value}</Text>
              </View>
            </View>
          ))}
        </View>
      );

    case "timeline":
      return (
        <Card className="mb-4">
          <CardContent className="p-4">
            {block.items.map((item, idx) => (
              <View key={idx} className={`flex-row ${idx < block.items.length - 1 ? "mb-4" : ""}`}>
                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
                  <Ionicons name={item.icon} size={18} className="text-primary" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold">{item.title}</Text>
                  <Text className="text-sm text-muted-foreground leading-5">
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </CardContent>
        </Card>
      );

    case "grid":
      return (
        <View className="mb-4">
          {block.title && (
            <Text className="text-base font-medium text-center mb-4">{block.title}</Text>
          )}
          <View className="flex-row flex-wrap justify-between">
            {block.items.map((item, idx) => (
              <View key={idx} className="w-[48%] bg-success/5 rounded-lg p-3 mb-3 flex-row items-center">
                {item.icon && (
                  <Ionicons name={item.icon} size={16} className="text-success mr-2" />
                )}
                <Text className="text-sm font-semibold flex-1">{item.text}</Text>
              </View>
            ))}
          </View>
        </View>
      );

    case "tips":
      return (
        <Card className="mb-4">
          <CardContent className="p-4">
            {block.items.map((tip, idx) => (
              <View key={idx} className={`flex-row ${idx < block.items.length - 1 ? "mb-4" : ""}`}>
                <View className="w-8 h-8 rounded-full bg-secondary items-center justify-center mr-3">
                  <Text className="text-sm font-bold text-secondary-foreground">{tip.number}</Text>
                </View>
                <View className="flex-1">
                  {tip.title && <Text className="text-base font-semibold mb-1">{tip.title}</Text>}
                  <Text className="text-sm text-muted-foreground leading-5">{tip.content}</Text>
                </View>
              </View>
            ))}
          </CardContent>
        </Card>
      );

    case "cta":
      return (
        <View className="items-center my-4">
          <Button className="flex-row gap-2 min-w-[200px]" onPress={() => onCTA(block)}>
            <Ionicons
              name={block.action === "email" ? "mail" : "arrow-forward"}
              size={20}
              color="#fff"
            />
            <Text className="text-white font-semibold">{block.label}</Text>
          </Button>
          {block.description && (
            <Text className="text-sm text-center text-muted-foreground mt-3 px-5">
              {block.description}
            </Text>
          )}
        </View>
      );

    case "video":
      return null; // TODO: implement video player

    default:
      return null;
  }
}

export const InfoPage = memo(function InfoPage({ content }: { content: InfoPageContent }) {
  const handleCTA = useCallback(async (block: CTABlock) => {
    if (Platform.OS === "ios") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    switch (block.action) {
      case "email": {
        const subject = block.subject ? `?subject=${encodeURIComponent(block.subject)}` : "";
        await Linking.openURL(`mailto:${block.target}${subject}`);
        break;
      }
      case "link":
        await Linking.openURL(block.target);
        break;
      case "route":
        router.push(block.target as any);
        break;
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className="p-4 pb-8">
          {/* Header */}
          <View className="items-center py-6 mb-8">
            <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center mb-4">
              <Ionicons name={content.header.icon} size={32} className="text-primary" />
            </View>
            <Text className="text-2xl font-bold text-center mb-2">{content.header.title}</Text>
            {content.header.subtitle && (
              <Text className="text-base text-center text-muted-foreground leading-[22px] px-5">
                {content.header.subtitle}
              </Text>
            )}
          </View>

          {/* Sections */}
          {content.sections.map((section) => (
            <View key={section.id} className="mb-6">
              <SectionHeader icon={section.icon} title={section.title} />
              {section.blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} onCTA={handleCTA} />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});
