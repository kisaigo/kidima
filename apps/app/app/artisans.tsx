import { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Head from "expo-router/head";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { screenContent, screenStyles } from "../components/layout";
import { AppIcon, ArtisanCard, Button, ChoiceChip, EmptyState, PageHeading, SearchField, SectionHeading, Surface } from "../components/ui";
import { AppNavigation } from "../components/navigation";
import { breakpoints, colors, layout, radius, spacing, typography } from "../constants/theme";
import { artisans, categories } from "../data/artisans";

export default function ArtisansScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ q?: string; category?: string }>();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isWide = width >= breakpoints.wide;
  const isTablet = width >= breakpoints.tablet;
  const [category, setCategory] = useState(params.category ?? "all");
  const [district, setDistrict] = useState("all");
  const [query, setQuery] = useState(params.q ?? "");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const districts = [...new Set(artisans.map((artisan) => artisan.district))];
  const filtered = useMemo(() => artisans.filter((item) => {
    const term = query.trim().toLocaleLowerCase();
    const matchesQuery = !term || [item.name, item.category, item.district, ...item.services].some((value) => value.toLocaleLowerCase().includes(term));
    return matchesQuery && (category === "all" || item.category === category) && (district === "all" || item.district === district);
  }), [category, district, query]);
  const resetFilters = () => { setQuery(""); setCategory("all"); setDistrict("all"); };

  return (
    <View style={styles.root}>
      <Head>
        <title>Trouver un artisan — Kidima</title>
      </Head>
      <AppNavigation activeRoute="/artisans" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={[styles.content, width < breakpoints.tablet && styles.contentMobile]}>
          <PageHeading eyebrow="EXPLORER" title="Trouver un artisan" subtitle="Recherchez par métier, service ou quartier." />
          <View style={[styles.searchRow, isTablet && styles.searchRowTablet]}>
            <View style={styles.searchWrap}><SearchField value={query} onChangeText={setQuery} placeholder="Nom, métier, service ou quartier…" /></View>
            {!isTablet ? <Button label="Filtres" variant="secondary" icon="sliders" onPress={() => setFiltersVisible(true)} /> : null}
          </View>
          {isTablet ? <Surface style={styles.filters}>
            <View style={styles.filterGroup}><Text style={styles.filterLabel}>Métier</Text><View style={styles.chips}>{categories.map((item) => <ChoiceChip key={item.id} label={item.label} selected={category === item.id} onPress={() => setCategory(item.id)} />)}</View></View>
            <View style={styles.filterGroup}><Text style={styles.filterLabel}>Quartier</Text><View style={styles.chips}><ChoiceChip label="Tous" selected={district === "all"} onPress={() => setDistrict("all")} />{districts.map((item) => <ChoiceChip key={item} label={item} selected={district === item} onPress={() => setDistrict(item)} />)}</View></View>
          </Surface> : null}
          {(category !== "all" || district !== "all" || query.trim()) ? <View style={styles.activeFilters}>
            {query.trim() ? <ChoiceChip label={`Recherche : ${query.trim()}`} selected onPress={() => setQuery("")} /> : null}
            {category !== "all" ? <ChoiceChip label={category} selected onPress={() => setCategory("all")} /> : null}
            {district !== "all" ? <ChoiceChip label={district} selected onPress={() => setDistrict("all")} /> : null}
            <Button label="Réinitialiser" variant="ghost" compact onPress={resetFilters} />
          </View> : null}
          <View style={styles.resultsHeading}><SectionHeading title={`${filtered.length} ${filtered.length === 1 ? "profil" : "profils"} d’exemple`} /><Text style={styles.resultsNotice}>Profils illustratifs : avis, disponibilité et vérification ne sont pas renseignés.</Text></View>
          {filtered.length ? <View style={[styles.results, isTablet && styles.resultsTablet, isWide && styles.resultsWide]}>{filtered.map((artisan) => <ArtisanCard key={artisan.id} layout={isWide ? "gridWide" : isTablet ? "grid" : "row"} name={artisan.name} category={artisan.category} district={artisan.district} city={artisan.city} services={artisan.services} onPress={() => router.push(`/artisan/${artisan.id}` as never)} />)}</View> : <EmptyState title="Aucun artisan ne correspond à vos critères" description="Modifiez votre recherche ou retirez un filtre pour voir les profils d’exemple." icon="search" action={<Button label="Réinitialiser les filtres" variant="secondary" onPress={resetFilters} />} />}
          <Modal visible={filtersVisible} transparent animationType="slide" onRequestClose={() => setFiltersVisible(false)}>
            <View style={[styles.modalBackdrop, { paddingBottom: insets.bottom }]}><View style={styles.filterSheet}>
              <View style={styles.sheetHeader}><View style={styles.sheetTitleGroup}><Text style={styles.sheetTitle}>Filtres</Text><Text style={styles.resultsNotice}>Affinez les profils affichés.</Text></View><Pressable accessibilityRole="button" accessibilityLabel="Fermer les filtres" onPress={() => setFiltersVisible(false)} style={styles.closeButton}><AppIcon name="close" color={colors.textPrimary} /></Pressable></View>
              <View style={styles.filterGroup}><Text style={styles.filterLabel}>Métier</Text><View style={styles.chips}>{categories.map((item) => <ChoiceChip key={item.id} label={item.label} selected={category === item.id} onPress={() => setCategory(item.id)} />)}</View></View>
              <View style={styles.filterGroup}><Text style={styles.filterLabel}>Quartier</Text><View style={styles.chips}><ChoiceChip label="Tous" selected={district === "all"} onPress={() => setDistrict("all")} />{districts.map((item) => <ChoiceChip key={item} label={item} selected={district === item} onPress={() => setDistrict(item)} />)}</View></View>
              <View style={styles.sheetActions}><Button label="Réinitialiser" variant="ghost" onPress={() => { setCategory("all"); setDistrict("all"); setQuery(""); }} /><Button label={`Voir ${filtered.length} profils`} onPress={() => setFiltersVisible(false)} /></View>
            </View></View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: screenStyles.root, scroll: screenStyles.scroll,
  content: screenContent({ maxWidth: layout.contentMax, bottom: spacing.x10, gap: spacing.x5 }),
  contentMobile: { paddingBottom: spacing.x16 + layout.navHeight },
  filters: { borderRadius: radius.xlarge, gap: spacing.x4 },
  searchRow: { flexDirection: "column", alignItems: "stretch", gap: spacing.x2 },
  searchRowTablet: { flexDirection: "row", alignItems: "center" },
  searchWrap: { flex: 1 },
  activeFilters: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: spacing.x2 },
  modalBackdrop: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(24, 58, 49, 0.38)" },
  filterSheet: { gap: spacing.x5, padding: spacing.x6, paddingBottom: spacing.x8, borderTopLeftRadius: radius.xlarge, borderTopRightRadius: radius.xlarge, backgroundColor: colors.background },
  sheetHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.x3 },
  sheetTitleGroup: { gap: spacing.x1 },
  sheetTitle: { ...typography.h2, color: colors.textPrimary },
  closeButton: { width: 44, height: 44, alignItems: "center", justifyContent: "center", borderRadius: radius.medium, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  sheetActions: { flexDirection: "row", justifyContent: "space-between", gap: spacing.x2 },
  filterGroup: { gap: spacing.x2 },
  filterLabel: { ...typography.label, color: colors.textPrimary },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x2 },
  resultsHeading: { gap: spacing.x1 },
  resultsNotice: { ...typography.caption, color: colors.textSecondary },
  results: { gap: spacing.x3 },
  resultsTablet: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x3 },
  resultsWide: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x3 },
});
