import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useRouter } from "expo-router";
import { ArtisanCard, ChoiceChip, EmptyState, SearchField, SectionHeading, Surface } from "../components/ui";
import { AppNavigation } from "../components/navigation";
import { breakpoints, colors, layout, radius, spacing, typography } from "../constants/theme";
import { artisans, categories } from "../data/artisans";

export default function ArtisansScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= breakpoints.desktop;
  const [category, setCategory] = useState("all");
  const [district, setDistrict] = useState("all");
  const [query, setQuery] = useState("");
  const districts = [...new Set(artisans.map((artisan) => artisan.district))];
  const filtered = useMemo(() => artisans.filter((item) => {
    const term = query.trim().toLocaleLowerCase();
    const matchesQuery = !term || [item.name, item.category, item.district, ...item.services].some((value) => value.toLocaleLowerCase().includes(term));
    return matchesQuery && (category === "all" || item.category === category) && (district === "all" || item.district === district);
  }), [category, district, query]);

  return (
    <View style={styles.root}>
      <AppNavigation activeRoute="/artisans" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View><Text style={styles.eyebrow}>EXPLORER</Text><Text style={styles.title}>Trouver un artisan</Text><Text style={styles.subtitle}>Recherchez par métier, service ou quartier.</Text></View>
          <Surface style={styles.filters}>
            <SearchField value={query} onChangeText={setQuery} placeholder="Métier, service ou quartier" />
            <View style={styles.filterGroup}><Text style={styles.filterLabel}>Métier</Text><View style={styles.chips}>{categories.map((item) => <ChoiceChip key={item.id} label={item.label} selected={category === item.id} onPress={() => setCategory(item.id)} />)}</View></View>
            <View style={styles.filterGroup}><Text style={styles.filterLabel}>Quartier</Text><View style={styles.chips}><ChoiceChip label="Tous" selected={district === "all"} onPress={() => setDistrict("all")} />{districts.map((item) => <ChoiceChip key={item} label={item} selected={district === item} onPress={() => setDistrict(item)} />)}</View></View>
          </Surface>
          <View style={styles.resultsHeading}><SectionHeading title={`${filtered.length} ${filtered.length === 1 ? "profil" : "profils"} d’exemple`} /><Text style={styles.resultsNotice}>Démonstration : disponibilité, avis et vérification non renseignés.</Text></View>
          {filtered.length ? <View style={[styles.results, isWide && styles.resultsWide]}>{filtered.map((artisan) => <ArtisanCard key={artisan.id} layout={isWide ? "grid" : "row"} name={artisan.name} category={artisan.category} district={artisan.district} city={artisan.city} services={artisan.services} onPress={() => router.push(`/artisan/${artisan.id}` as never)} />)}</View> : <EmptyState title="Aucun profil trouvé" description="Modifiez le métier, le quartier ou votre recherche." icon="search" />}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background }, scroll: { flexGrow: 1 },
  content: { width: "100%", maxWidth: layout.contentMax, alignSelf: "center", padding: layout.pageGutter, gap: spacing.x5 },
  eyebrow: { ...typography.caption, color: colors.primary, fontWeight: "700", letterSpacing: 1 },
  title: { ...typography.h1, color: colors.textPrimary, marginTop: spacing.x1 },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.x1 },
  filters: { borderRadius: radius.xlarge, gap: spacing.x4 },
  filterGroup: { gap: spacing.x2 },
  filterLabel: { ...typography.label, color: colors.textPrimary },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x2 },
  resultsHeading: { gap: spacing.x1 },
  resultsNotice: { ...typography.caption, color: colors.textSecondary },
  results: { gap: spacing.x3 },
  resultsWide: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x3 },
});
