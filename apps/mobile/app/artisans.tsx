import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ArtisanCard, BottomTabBar, Button, ChoiceChip, Surface } from "../components/ui";
import { colors, radius, spacing } from "../constants/theme";

type Artisan = {
  id: string;
  name: string;
  category: string;
  district: string;
  city: string;
  phone: string;
  verified: boolean;
  published: boolean;
};

const TAB_ITEMS = [
  { label: "Accueil", icon: "home", route: "/" },
  { label: "Artisans", icon: "users", route: "/artisans" },
  { label: "Besoin", icon: "create", route: "/demande" },
  { label: "Suivi", icon: "list", route: "/reclamations" },
  { label: "Admin", icon: "settings", route: "/dashboard" },
] as const;

const ARTISANS: Artisan[] = [
  { id: "plombier-1", name: "Ali Plomberie", category: "plomberie", district: "Moursal", city: "N'Djaména", phone: "+235 20 12 34 56", verified: true, published: true },
  { id: "plombier-2", name: "Ousmane Plomberie", category: "plomberie", district: "Quartier central", city: "N'Djaména", phone: "+235 21 88 77 66", verified: true, published: true },
  { id: "electricien-1", name: "Karim Electrique", category: "électricité", district: "Moursal", city: "N'Djaména", phone: "+235 22 99 00 11", verified: true, published: false },
  { id: "clim-1", name: "Nina Clim", category: "climatisation", district: "Quartier central", city: "N'Djaména", phone: "+235 23 44 55 66", verified: false, published: false },
];

const FILTERS = ["all", "plomberie", "électricité", "climatisation", "réparation téléphone"] as const;

export default function ArtisansScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<typeof FILTERS[number]>("all");
  const filtered = filter === "all" ? ARTISANS : ARTISANS.filter((item) => item.category === filter);

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.headerBar}>
          <View>
            <Text style={styles.eyebrow}>Gestion</Text>
            <Text style={styles.title}>Artisans et publication</Text>
          </View>
          <Button label="Créer" compact variant="secondary" onPress={() => router.push("/demande")} />
        </View>

        <Surface style={styles.panel}>
          <Text style={styles.panelTitle}>Filtres</Text>
          <View style={styles.chips}>
            {FILTERS.map((item) => (
              <ChoiceChip key={item} label={item === "all" ? "Tous" : item} selected={filter === item} onPress={() => setFilter(item)} />
            ))}
          </View>
        </Surface>

        {filtered.map((artisan) => (
          <ArtisanCard
            key={artisan.id}
            name={artisan.name}
            category={artisan.category}
            district={artisan.district}
            city={artisan.city}
            rating={4.8}
            reviews={26}
            verified={artisan.verified}
            available={artisan.published}
            distance={artisan.district}
            services={[artisan.category, artisan.city]}
            onPress={() => router.push(`/artisan/${artisan.id}` as any)}
          />
        ))}
      </ScrollView>

      <BottomTabBar items={TAB_ITEMS} activeIndex={1} onChange={(index) => router.push(TAB_ITEMS[index].route as any)} />
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
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.x2,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: "800",
  },
  panel: {
    borderRadius: radius.large,
    padding: spacing.x4,
  },
  panelTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  chips: {
    marginTop: spacing.x3,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.x2,
  },
  card: {
    borderRadius: radius.large,
    padding: spacing.x4,
    gap: spacing.x3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.x3,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radius.medium,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.primaryDark,
    fontWeight: "800",
    fontSize: 18,
  },
  cardBody: {
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "800",
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.x2,
  },
});
