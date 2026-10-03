import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
  AppIcon,
  ArtisanCard,
  Badge,
  BottomTabBar,
  Button,
  ChoiceChip,
  SearchField,
  SectionHeading,
  Surface,
} from "../components/ui";
import { colors, radius, spacing } from "../constants/theme";

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
  rating: number;
};

const TAB_ITEMS = [
  { label: "Accueil", icon: "home", route: "/" },
  { label: "Artisans", icon: "users", route: "/artisans" },
  { label: "Besoin", icon: "create", route: "/demande" },
  { label: "Suivi", icon: "list", route: "/reclamations" },
  { label: "Admin", icon: "settings", route: "/dashboard" },
] as const;

const ARTISANS: Artisan[] = [
  {
    id: "plombier-1",
    name: "Ali Plomberie",
    category: "plomberie",
    district: "Moursal",
    city: "N'Djaména",
    phone: "+235 20 12 34 56",
    phoneOnline: true,
    experienceYears: 6,
    services: ["fuite eau", "robinets", "tuyaux"],
    rating: 4.8,
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
    services: ["fuite eau", "ajout", "évier"],
    rating: 4.9,
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
    services: ["prise", "installation", "éclairage"],
    rating: 4.7,
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
    services: ["maintenance", "réparation", "installation"],
    rating: 4.9,
  },
];

const CATEGORIES = [
  { id: "all", label: "Tout voir" },
  { id: "plomberie", label: "Plomberie" },
  { id: "électricité", label: "Électricité" },
  { id: "climatisation", label: "Climatisation" },
  { id: "réparation téléphone", label: "Réparation tél." },
];

export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = ARTISANS.filter((artisan) => {
    const keyword = query.trim().toLowerCase();
    const matchesQuery =
      keyword.length === 0 ||
      artisan.name.toLowerCase().includes(keyword) ||
      artisan.category.toLowerCase().includes(keyword) ||
      artisan.services.some((service) => service.toLowerCase().includes(keyword));
    const matchesCategory = category === "all" || artisan.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <View style={styles.root}>
      <View style={styles.hero}>
        <Image
        source={{
          uri: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80",
        }}
        style={[StyleSheet.absoluteFill, styles.heroImage]}
        resizeMode="cover"
        accessible={false}
      />
        <View style={styles.heroOverlay}>
          <View style={styles.headerRow}>
            <View style={styles.brandBadge}>
              <Text style={styles.brandMark}>K</Text>
            </View>
            <Text style={styles.brandLabel}>kidima</Text>
            <View style={styles.cityPill}>
              <AppIcon name="location" size={14} color={colors.primary} />
              <Text style={styles.cityText}>N Djaména</Text>
            </View>
          </View>

          <Text style={styles.heroEyebrow}>Service local premium</Text>
          <Text style={styles.heroTitle}>Le bon artisan au bon moment.</Text>
          <Text style={styles.heroText}>
            Plomberie, électricité et dépannage fiables, rapidement près de chez vous.
          </Text>

          <View style={styles.heroActions}>
            <Button label="Décrire mon besoin" onPress={() => router.push("/demande")} />
            <Button label="Voir les artisans" variant="secondary" onPress={() => router.push("/artisans")} />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.metricsRow}>
          <Surface style={styles.metricCard}>
            <Text style={styles.metricValue}>4.8/5</Text>
            <Text style={styles.metricLabel}>Avis clients</Text>
          </Surface>
          <Surface style={styles.metricCard}>
            <Text style={styles.metricValue}>24h</Text>
            <Text style={styles.metricLabel}>Réponse moyenne</Text>
          </Surface>
          <Surface style={styles.metricCard}>
            <Text style={styles.metricValue}>15+</Text>
            <Text style={styles.metricLabel}>Métiers</Text>
          </Surface>
        </View>

        <Surface style={styles.searchSurface}>
          <SectionHeading title="Recherche rapide" />
          <SearchField value={query} onChangeText={setQuery} placeholder="Ex. fuite, électricité, climatisation" />
        </Surface>

        <View style={styles.filterWrap}>
          <Text style={styles.filterTitle}>Métiers</Text>
          <View style={styles.chipRow}>
            {CATEGORIES.map((item) => (
              <ChoiceChip
                key={item.id}
                label={item.label}
                selected={category === item.id}
                onPress={() => setCategory(item.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Artisans disponibles</Text>
          <Badge label={String(filtered.length)} tone="primary" />
        </View>

        {filtered.map((artisan) => (
          <ArtisanCard
            key={artisan.id}
            name={artisan.name}
            category={artisan.category}
            district={artisan.district}
            city={artisan.city}
            rating={artisan.rating}
            reviews={artisan.experienceYears * 4}
            verified={artisan.phoneOnline}
            available={artisan.phoneOnline}
            distance="1.2 km"
            services={artisan.services}
            onPress={() => router.push(`/artisan/${artisan.id}` as any)}
          />
        ))}
      </ScrollView>

      <BottomTabBar items={TAB_ITEMS} activeIndex={0} onChange={(index) => router.push(TAB_ITEMS[index].route as any)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    minHeight: 280,
    overflow: "hidden",
  },
  heroImage: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: "rgba(12, 40, 32, 0.28)",
    paddingHorizontal: spacing.x4,
    paddingTop: 52,
    paddingBottom: 24,
    justifyContent: "flex-end",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.x4,
  },
  brandBadge: {
    width: 36,
    height: 36,
    borderRadius: radius.medium,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  brandMark: {
    color: colors.white,
    fontWeight: "800",
    fontSize: 18,
  },
  brandLabel: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "800",
    marginLeft: spacing.x2,
    flex: 1,
  },
  cityPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  cityText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primaryDark,
  },
  heroEyebrow: {
    color: colors.primarySoft,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: spacing.x2,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 36,
    marginBottom: spacing.x2,
  },
  heroText: {
    color: "rgba(255,255,255,0.88)",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.x4,
  },
  heroActions: {
    flexDirection: "row",
    gap: spacing.x2,
    flexWrap: "wrap",
  },
  content: {
    paddingHorizontal: spacing.x4,
    paddingTop: spacing.x4,
    paddingBottom: spacing.x6,
    gap: spacing.x4,
  },
  metricsRow: {
    flexDirection: "row",
    gap: spacing.x2,
    marginTop: -18,
  },
  metricCard: {
    flex: 1,
    padding: spacing.x3,
    borderRadius: radius.large,
  },
  metricValue: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "800",
  },
  metricLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 4,
  },
  searchSurface: {
    padding: spacing.x4,
    borderRadius: radius.large,
  },
  filterWrap: {
    gap: spacing.x2,
  },
  filterTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.x2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.x2,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "800",
  },
  artisanCard: {
    borderRadius: radius.large,
    padding: spacing.x4,
    gap: spacing.x3,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.x3,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.large,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.primaryDark,
    fontSize: 18,
    fontWeight: "800",
  },
  cardMeta: {
    flex: 1,
  },
  cardName: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "800",
  },
  cardCategory: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.x2,
  },
  tag: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: {
    color: colors.primaryDark,
    fontSize: 11,
    fontWeight: "700",
  },
  cardActions: {
    alignItems: "flex-end",
  },
});
