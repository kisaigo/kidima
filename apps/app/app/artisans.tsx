import { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Head from "expo-router/head";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { screenContent, screenStyles } from "../components/layout";
import { AppIcon, ArtisanCard, Badge, Button, ChoiceChip, EmptyState, PageHeading, SearchField, SectionHeading, Surface } from "../components/ui";
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
  const activeFilterCount = Number(category !== "all") + Number(district !== "all");
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
          <PageHeading eyebrow="EXPLORER" title="Trouver un artisan" subtitle="Par métier, service ou quartier." />
          <View style={[styles.searchRow, isTablet && styles.searchRowTablet]}>
            <View style={styles.searchWrap}><SearchField value={query} onChangeText={setQuery} placeholder="Métier, spécialité ou nom d’artisan…" /></View>
            {!isTablet ? <Button label={activeFilterCount ? `Filtres · ${activeFilterCount}` : "Filtres"} accessibilityLabel={activeFilterCount ? `Ouvrir les filtres, ${activeFilterCount} sélectionnés` : "Ouvrir les filtres"} variant="secondary" icon="sliders" onPress={() => setFiltersVisible(true)} /> : null}
          </View>
          <View style={styles.locationRow}><AppIcon name="location" size={17} color={colors.primary} /><Text style={styles.locationText}>N’Djaména · zone d’exemple</Text><Badge label="Données locales" /></View>
          {!isTablet && (category !== "all" || district !== "all" || query.trim()) ? <View accessibilityLabel="Filtres actifs" style={styles.activeFilters}>
            {query.trim() ? <ChoiceChip label={`Recherche : ${query.trim()}`} selected onPress={() => setQuery("")} /> : null}
            {category !== "all" ? <ChoiceChip label={category} selected onPress={() => setCategory("all")} /> : null}
            {district !== "all" ? <ChoiceChip label={district} selected onPress={() => setDistrict("all")} /> : null}
            <Button label="Réinitialiser" variant="ghost" compact onPress={resetFilters} />
          </View> : null}
          {isTablet ? <Surface style={styles.filters}>
            <View style={styles.filterGroup}><Text style={styles.filterLabel}>Métier</Text><View accessibilityRole="radiogroup" accessibilityLabel="Filtrer par métier" style={styles.chips}>{categories.map((item) => <ChoiceChip accessibilityRole="radio" key={item.id} label={item.label} selected={category === item.id} onPress={() => setCategory(item.id)} />)}</View></View>
            <View style={styles.filterGroup}><Text style={styles.filterLabel}>Quartier</Text><View accessibilityRole="radiogroup" accessibilityLabel="Filtrer par quartier" style={styles.chips}><ChoiceChip accessibilityRole="radio" label="Tous" selected={district === "all"} onPress={() => setDistrict("all")} />{districts.map((item) => <ChoiceChip accessibilityRole="radio" key={item} label={item} selected={district === item} onPress={() => setDistrict(item)} />)}</View></View>
          </Surface> : null}
          {isTablet && (category !== "all" || district !== "all" || query.trim()) ? <View accessibilityLabel="Filtres actifs" style={styles.activeFilters}>
            {query.trim() ? <ChoiceChip label={`Recherche : ${query.trim()}`} selected onPress={() => setQuery("")} /> : null}
            {category !== "all" ? <ChoiceChip label={category} selected onPress={() => setCategory("all")} /> : null}
            {district !== "all" ? <ChoiceChip label={district} selected onPress={() => setDistrict("all")} /> : null}
            <Button label="Réinitialiser" variant="ghost" compact onPress={resetFilters} />
          </View> : null}
          <View accessibilityLiveRegion="polite" style={styles.resultsHeading}><View style={styles.resultCountLine}><View style={styles.resultDot} /><SectionHeading title={`${filtered.length} ${filtered.length === 1 ? "profil" : "profils"} d’exemple`} /></View><Text style={styles.resultsNotice}>Données fictives : avis, disponibilité et vérification non renseignés.</Text></View>
          {filtered.length ? <View style={[styles.results, isTablet && styles.resultsTablet, isWide && styles.resultsWide]}>{filtered.map((artisan) => <ArtisanCard key={artisan.id} layout={isWide ? "gridWide" : isTablet ? "grid" : "row"} name={artisan.name} category={artisan.category} district={artisan.district} city={artisan.city} services={artisan.services} onPress={() => router.push(`/artisan/${artisan.id}` as never)} />)}</View> : <EmptyState title="Aucun artisan ne correspond à vos critères" description="Modifiez votre recherche ou retirez un filtre pour voir les profils d’exemple." icon="search" action={<Button label="Réinitialiser les filtres" variant="secondary" onPress={resetFilters} />} />}
          <Modal visible={filtersVisible} transparent animationType="slide" onRequestClose={() => setFiltersVisible(false)}>
            <View style={[styles.modalBackdrop, { paddingBottom: insets.bottom }]}><View accessibilityViewIsModal accessibilityLabel="Filtres des profils d’artisans" style={styles.filterSheet}>
              <View style={styles.sheetHeader}><View style={styles.sheetTitleGroup}><Text accessibilityRole="header" style={styles.sheetTitle}>Filtres</Text><Text style={styles.resultsNotice}>Affinez les profils affichés.</Text></View><Pressable accessibilityRole="button" accessibilityLabel="Fermer les filtres" onPress={() => setFiltersVisible(false)} style={styles.closeButton}><AppIcon name="close" color={colors.textPrimary} /></Pressable></View>
              <ScrollView style={styles.filterOptionsScroll} contentContainerStyle={styles.filterOptionsContent} keyboardShouldPersistTaps="handled">
                <View style={styles.filterGroup}><Text style={styles.filterLabel}>Métier</Text><View accessibilityRole="radiogroup" accessibilityLabel="Filtrer par métier" style={styles.chips}>{categories.map((item) => <ChoiceChip accessibilityRole="radio" key={item.id} label={item.label} selected={category === item.id} onPress={() => setCategory(item.id)} />)}</View></View>
                <View style={styles.filterGroup}><Text style={styles.filterLabel}>Quartier</Text><View accessibilityRole="radiogroup" accessibilityLabel="Filtrer par quartier" style={styles.chips}><ChoiceChip accessibilityRole="radio" label="Tous" selected={district === "all"} onPress={() => setDistrict("all")} />{districts.map((item) => <ChoiceChip accessibilityRole="radio" key={item} label={item} selected={district === item} onPress={() => setDistrict(item)} />)}</View></View>
              </ScrollView>
              <View style={styles.sheetActions}><Button label="Réinitialiser" variant="ghost" onPress={resetFilters} /><Button label={`Voir ${filtered.length} profils`} accessibilityLabel={`Appliquer les filtres et voir ${filtered.length} profils`} onPress={() => setFiltersVisible(false)} /></View>
            </View></View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: screenStyles.root, scroll: screenStyles.scroll,
  content: screenContent({ maxWidth: layout.contentMax, top: spacing.x3, bottom: spacing.x10, gap: spacing.x5 }),
  contentMobile: { paddingBottom: spacing.x16 + layout.navHeight },
  locationRow: { minHeight: 40, flexDirection: "row", alignItems: "center", gap: spacing.x2, paddingHorizontal: spacing.x1 },
  locationText: { ...typography.caption, color: colors.textPrimary, flex: 1 },
  filters: { borderRadius: radius.xlarge, gap: spacing.x4 },
  searchRow: { flexDirection: "column", alignItems: "stretch", gap: spacing.x2 },
  searchRowTablet: { flexDirection: "row", alignItems: "center" },
  searchWrap: { flex: 1 },
  activeFilters: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: spacing.x2 },
  modalBackdrop: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(24, 58, 49, 0.38)" },
  filterSheet: { maxHeight: "90%", gap: spacing.x3, padding: spacing.x4, borderTopLeftRadius: radius.xlarge, borderTopRightRadius: radius.xlarge, backgroundColor: colors.background },
  filterOptionsScroll: { flexShrink: 1 },
  filterOptionsContent: { gap: spacing.x5, paddingBottom: spacing.x1 },
  sheetHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.x3 },
  sheetTitleGroup: { gap: spacing.x1 },
  sheetTitle: { ...typography.h2, color: colors.textPrimary },
  closeButton: { width: 44, height: 44, alignItems: "center", justifyContent: "center", borderRadius: radius.medium, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  sheetActions: { flexDirection: "row", justifyContent: "space-between", gap: spacing.x2 },
  filterGroup: { gap: spacing.x2 },
  filterLabel: { ...typography.label, color: colors.textPrimary },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x2 },
  resultsHeading: { gap: spacing.x1 },
  resultCountLine: { flexDirection: "row", alignItems: "center", gap: spacing.x2 },
  resultDot: { width: 8, height: 8, borderRadius: radius.pill, backgroundColor: colors.primary },
  resultsNotice: { ...typography.caption, color: colors.textSecondary },
  results: { gap: spacing.x3 },
  resultsTablet: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x3 },
  resultsWide: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x3 },
});
