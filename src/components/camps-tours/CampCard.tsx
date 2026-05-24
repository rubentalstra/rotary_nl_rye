import { Image } from "expo-image";
import { router } from "expo-router";
import { Linking, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/ui/icon";
import { isCampPast } from "@/features/camps-tours/api/fetch-camps";
import type { Camp } from "@/features/camps-tours/types";
import { useHaptics } from "@/hooks/use-haptics";
import { borderRadius, spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";
import { getCountryName, getFlagAsset } from "@/utils/flags";

interface CampCardProps {
  camp: Camp;
}

function isPdfUrl(url: string): boolean {
  return url.toLowerCase().endsWith(".pdf");
}

function formatAge(min: string, max: string): string {
  if (min && max) return `${min}–${max} jr`;
  if (min) return `${min}+ jr`;
  if (max) return `t/m ${max} jr`;
  return "—";
}

function formatCost(contribution: string, currency: string): string {
  if (!contribution) return "—";
  if (contribution === "0") return "Gratis";
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency ?? "";
  return symbol ? `${symbol} ${contribution}` : contribution;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  JPY: "¥",
  CHF: "CHF",
  CAD: "CA$",
  AUD: "A$",
  SEK: "kr",
  NOK: "kr",
  DKK: "kr",
  BRL: "R$",
  INR: "₹",
  TWD: "NT$",
  TRY: "₺",
};

export function CampCard({ camp }: CampCardProps) {
  const theme = useTheme();
  const { lightImpact } = useHaptics();
  const isPast = isCampPast(camp);

  const codes = camp.hostCountryCode
    .split(/[\s,]+/)
    .map((c) => c.trim().toLowerCase())
    .filter(Boolean);
  const primaryCode = codes[0];
  const extraCount = Math.max(0, codes.length - 1);

  const hasInvitation = Boolean(camp.invitation && camp.invitation.trim());
  const isPdf = hasInvitation && isPdfUrl(camp.invitation);

  const handlePress = () => {
    if (!hasInvitation) return;
    lightImpact();
    if (isPdf) {
      router.push({
        pathname: "/pdf-viewer",
        params: { url: camp.invitation, title: camp.title },
      } as never);
    } else {
      Linking.openURL(camp.invitation);
    }
  };

  const flagAsset = primaryCode ? getFlagAsset(primaryCode) : null;
  const countryName = primaryCode ? getCountryName(primaryCode) : "—";

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
        isPast && styles.cardPast,
        pressed && styles.cardPressed,
      ]}
      android_ripple={{ color: `${theme.primary}30` }}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {camp.title}
        </Text>
        {hasInvitation ? (
          <Icon
            name={isPdf ? "document" : "external"}
            size={18}
            tintColor={theme.textSecondary}
          />
        ) : null}
      </View>

      {(isPast || camp.isFull) && (
        <View style={styles.badgeRow}>
          {isPast ? (
            <View style={[styles.badge, { borderColor: theme.textSecondary }]}>
              <Text style={[styles.badgeText, { color: theme.textSecondary }]}>AFGELOPEN</Text>
            </View>
          ) : null}
          {camp.isFull ? (
            <View style={[styles.badge, { borderColor: "#FF3B30" }]}>
              <Text style={[styles.badgeText, { color: "#FF3B30" }]}>VOL</Text>
            </View>
          ) : null}
        </View>
      )}

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      <View style={styles.grid}>
        <View style={styles.gridRow}>
          <DetailCell
            icon="location"
            label="Land"
            value={
              <View style={styles.countryValue}>
                {flagAsset ? (
                  <Image source={flagAsset} style={styles.flag} contentFit="cover" />
                ) : (
                  <Icon name="flag" size={14} tintColor={theme.textSecondary} />
                )}
                <Text style={[styles.value, { color: theme.text }]} numberOfLines={1}>
                  {countryName}
                  {extraCount > 0 ? ` +${extraCount}` : ""}
                </Text>
              </View>
            }
          />
          <DetailCell
            icon="district"
            label="District"
            value={
              <Text
                style={[
                  styles.value,
                  { color: camp.hostDistrict ? theme.text : theme.textSecondary },
                ]}
                numberOfLines={1}
              >
                {camp.hostDistrict || "—"}
              </Text>
            }
          />
        </View>

        <View style={styles.gridRow}>
          <DetailCell
            icon="calendar"
            label="Start"
            value={
              <Text style={[styles.value, { color: theme.text }]}>{camp.startDate || "—"}</Text>
            }
          />
          <DetailCell
            icon="calendar"
            label="Einde"
            value={
              <Text style={[styles.value, { color: theme.text }]}>{camp.endDate || "—"}</Text>
            }
          />
        </View>

        <View style={styles.gridRow}>
          <DetailCell
            icon="people"
            label="Leeftijd"
            value={
              <Text style={[styles.value, { color: theme.text }]}>
                {formatAge(camp.ageMin, camp.ageMax)}
              </Text>
            }
          />
          <DetailCell
            icon="wallet"
            label="Kosten"
            value={
              <Text style={[styles.value, { color: theme.text }]}>
                {formatCost(camp.contribution, camp.currency)}
              </Text>
            }
          />
        </View>
      </View>
    </Pressable>
  );
}

interface DetailCellProps {
  icon: "location" | "district" | "calendar" | "people" | "wallet";
  label: string;
  value: React.ReactNode;
}

function DetailCell({ icon, label, value }: DetailCellProps) {
  const theme = useTheme();
  return (
    <View style={styles.cell}>
      <View style={styles.cellLabelRow}>
        <Icon name={icon} size={13} tintColor={theme.textSecondary} />
        <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
      </View>
      {value}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: Platform.OS === "android" ? StyleSheet.hairlineWidth : 0,
    ...(Platform.OS === "ios"
      ? {}
      : {
          elevation: 1,
        }),
  },
  cardPast: {
    opacity: 0.6,
  },
  cardPressed: {
    opacity: 0.7,
    transform: Platform.OS === "ios" ? [{ scale: 0.99 }] : [],
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 6,
  },
  badge: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  grid: {
    gap: spacing.md,
  },
  gridRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  cell: {
    flex: 1,
    gap: 4,
  },
  cellLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
  },
  value: {
    fontSize: 15,
    fontWeight: "500",
  },
  countryValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  flag: {
    width: 18,
    height: 13,
    borderRadius: 2,
  },
});
