import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Linking, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppIcon, Badge, Button, Surface } from "../../components/ui";
import { colors, radius, spacing } from "../../constants/theme";

type Artisan = {
  id: string;
  name: string;
  category: string;
  district: string;
  city: string;
  phone: string;
  phoneOnline: boolean;
  experienceYears: number;
  services: string[];
  hours: Record<string, string>;
  rating: number;
  verified: boolean;
  priceRange: string;
};

const ARTISANS: Artisan[] = [
  {
    id: "plombier-1",
    name: "Ali Plomberie",
    category: "plomberie",
    district: "Moursal",
    city: "N'Djaména",
    phone: "+235 20 12 34 56",
    phoneOnline: false,
    experienceYears: 6,
    services: ["fuite eau", "robinets", "tuyaux", "puits sec"],
    hours: { mon: "08:00-17:00", tue: "08:00-17:00", wed: "08:00-17:00", thu: "08:00-17:00", fri: "08:00-17:00" },
    rating: 4.8,
    verified: true,
    priceRange: "1 500 à 4 000 Fcfa",
  },
  {
    id: "plombier-2",
    name: "Ousmane Plomberie",
    category: "plomberie",
    district: "Quartier central",
    city: "N'Djaména",
    phone: "+235 21 88 77 66",
    phoneOnline: true,
    experienceYears: 12,
    services: ["fuite eau", "ajout", "évier", "wc"],
    hours: { mon: "07:00-18:00", tue: "07:00-18:00", wed: "07:00-18:00", thu: "07:00-18:00", fri: "07:00-18:00" },
    rating: 4.9,
    verified: true,
    priceRange: "1 200 à 5 500 Fcfa",
  },
  {
    id: "electricien-1",
    name: "Karim Electrique",
    category: "électricité",
    district: "Moursal",
    city: "N'Djaména",
    phone: "+235 22 99 00 11",
    phoneOnline: true,
    experienceYears: 8,
    services: ["prise électrique", "installation", "éclairage", "révision"],
    hours: { mon: "08:00-17:00", tue: "08:00-17:00", wed: "08:00-17:00", thu: "08:00-17:00", fri: "08:00-17:00" },
    rating: 4.7,
    verified: true,
    priceRange: "1 800 à 6 000 Fcfa",
  },
  {
    id: "clim-1",
    name: "Nina Clim",
    category: "climatisation",
    district: "Quartier central",
    city: "N'Djaména",
    phone: "+235 23 44 55 66",
    phoneOnline: true,
    experienceYears: 5,
    services: ["réfrigération", "réparation", "installation", "maintenance"],
    hours: { mon: "09:00-18:00", tue: "09:00-18:00", wed: "09:00-18:00", thu: "09:00-18:00", fri: "09:00-18:00" },
    rating: 4.9,
    verified: false,
    priceRange: "35 000 à 80 000 Fcfa",
  },
  {
    id: "téléphone-1",
    name: "Thomas Réopt",
    category: "réparation téléphone",
    district: "Moursal",
    city: "N'Djaména",
    phone: "+235 24 55 66 77",
    phoneOnline: true,
    experienceYears: 3,
    services: ["écran cassé", "logiciel", "batterie", "chargeur"],
    hours: { mon: "10:00-19:00", tue: "10:00-19:00", wed: "10:00-19:00", thu: "10:00-19:00", fri: "10:00-19:00" },
    rating: 4.6,
    verified: true,
    priceRange: "4 000 à 25 000 Fcfa",
  },
];

export default function ArtisanDetailScreen() {
  const router = useRouter();
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const artisan = ARTISANS.find((item) => item.id === slug) ?? ARTISANS[0];

  const handleCall = async () => {
    const number = artisan.phone.replace(/\s+/g, "");
    await Linking.openURL(`tel:${number}`);
  };

  const handleWhatsApp = async () => {
    const number = artisan.phone.replace(/\D/g, "");
    const message = encodeURIComponent(`Bonjour ${artisan.name}, je vous contacte via Kidima au sujet de vos services de ${artisan.category}.`);
    const url = `https://wa.me/${number}?text=${message}`;

    if (Platform.OS === "web") {
      const openedWindow = window.open(url, "_blank");
      if (openedWindow) {
        openedWindow.opener = null;
      } else {
        window.location.assign(url);
      }
      return;
    }

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("WhatsApp indisponible", `Vous pouvez appeler ${artisan.name} au ${artisan.phone}.`);
    }
  };

  const handleDemande = () => {
    Alert.alert("Demande enregistrée", "Votre demande est préparée pour le prochain contact avec l'artisan.");
    router.push("/demande");
  };

  const hoursList = Object.entries(artisan.hours)
    .map(([day, range]) => `${day.slice(0, 1).toUpperCase() + day.slice(1)} ${range}`)
    .join(" • ");

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Surface style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{artisan.name.charAt(0)}</Text>
            </View>
            <View style={styles.heroMeta}>
              <Text style={styles.categoryLabel}>{artisan.category}</Text>
              <Text style={styles.name}>{artisan.name}</Text>
            </View>
            {artisan.verified ? <Badge label="Vérifié" tone="success" /> : <Badge label="À vérifier" tone="warning" />}
          </View>

          <View style={styles.kpis}>
            <View style={styles.kpi}> 
              <AppIcon name="star" size={16} color={colors.accent} />
              <Text style={styles.kpiValue}>{artisan.rating.toFixed(1)}</Text>
            </View>
            <View style={styles.kpi}>
              <AppIcon name="clock" size={16} color={colors.primary} />
              <Text style={styles.kpiValue}>{artisan.experienceYears} ans</Text>
            </View>
            <View style={styles.kpi}>
              <AppIcon name="location" size={16} color={colors.primary} />
              <Text style={styles.kpiValue}>{artisan.district}</Text>
            </View>
          </View>
        </Surface>

        <Surface style={styles.section}>
          <Text style={styles.sectionTitle}>À propos</Text>
          <View style={styles.infoRow}>
            <AppIcon name="location" size={15} color={colors.textSecondary} />
            <Text style={styles.infoText}>{artisan.district}, {artisan.city}</Text>
          </View>
          <View style={styles.infoRow}>
            <AppIcon name="message" size={15} color={colors.textSecondary} />
            <Text style={styles.infoText}>{artisan.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <AppIcon name="shield" size={15} color={colors.textSecondary} />
            <Text style={styles.infoText}>{artisan.verified ? "Profil vérifié" : "Profil en attente de vérification"}</Text>
          </View>
        </Surface>

        <Surface style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.tagList}>
            {artisan.services.map((service) => (
              <View key={service} style={styles.tag}>
                <Text style={styles.tagText}>{service}</Text>
              </View>
            ))}
          </View>
        </Surface>

        <Surface style={styles.section}>
          <Text style={styles.sectionTitle}>Horaires</Text>
          <Text style={styles.scheduleText}>{hoursList}</Text>
        </Surface>

        <Surface style={styles.section}>
          <Text style={styles.sectionTitle}>Prix indicatif</Text>
          <Text style={styles.priceText}>{artisan.priceRange}</Text>
        </Surface>

        <View style={styles.actionsRow}>
          <Button label="Appeler" onPress={handleCall} />
          <Button label="WhatsApp" variant="secondary" onPress={handleWhatsApp} />
        </View>

        <Button label="Demander un devis" onPress={handleDemande} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.x4,
    paddingTop: spacing.x6,
    paddingBottom: spacing.x6,
    gap: spacing.x4,
  },
  heroCard: {
    borderRadius: radius.large,
    padding: spacing.x4,
    gap: spacing.x3,
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.x3,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: radius.large,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.primaryDark,
    fontSize: 22,
    fontWeight: "800",
  },
  heroMeta: {
    flex: 1,
  },
  categoryLabel: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  name: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 2,
  },
  kpis: {
    flexDirection: "row",
    gap: spacing.x2,
  },
  kpi: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.muted,
    borderRadius: radius.medium,
    paddingHorizontal: spacing.x3,
    paddingVertical: spacing.x2,
  },
  kpiValue: {
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 12,
  },
  section: {
    borderRadius: radius.large,
    padding: spacing.x4,
    gap: spacing.x3,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
  },
  tagList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.x2,
  },
  tag: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.x3,
    paddingVertical: 6,
  },
  tagText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 11,
  },
  scheduleText: {
    color: colors.textPrimary,
    fontSize: 13,
    lineHeight: 20,
  },
  priceText: {
    color: colors.primaryDark,
    fontWeight: "800",
    fontSize: 15,
  },
  actionsRow: {
    flexDirection: "row",
    gap: spacing.x2,
  },
});
