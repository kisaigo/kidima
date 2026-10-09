import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Head from "expo-router/head";
import { useRouter } from "expo-router";
import { screenContent, screenContentWide, screenStyles } from "../components/layout";
import { AppIcon, ArtisanCard, Button, EmptyState, SearchField, SectionHeading, Surface } from "../components/ui";
import { AppNavigation } from "../components/navigation";
import { breakpoints, colors, fontWeights, layout, radius, spacing, typography } from "../constants/theme";
import { artisans, categories } from "../data/artisans";

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= breakpoints.desktop;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const featured = useMemo(() => artisans.filter((artisan) => {
    const term = query.trim().toLocaleLowerCase();
    const found = !term || [artisan.name, artisan.category, artisan.district, ...artisan.services].some((value) => value.toLocaleLowerCase().includes(term));
    return found && (category === "all" || artisan.category === category);
  }).slice(0, 4), [category, query]);

  const searchArtisans = () => router.push({ pathname: "/artisans", params: { q: query, category } });

  return (
    <View style={styles.root}>
      <Head>
        <title>Kidima — Trouver un artisan pour vos projets</title>
        <meta
          name="description"
          content="Kidima — démonstration d’interface pour la mise en relation entre particuliers et artisans à N’Djaména. Données fictives, aucun envoi réel."
        />
      </Head>
      <AppNavigation activeRoute="/" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={[styles.content, isWide && styles.contentWide]}>
          <View style={styles.contextBar}>
            <View style={styles.contextCopy}><Text style={styles.greeting}>Bonjour</Text><Text style={styles.accountLabel}>Compte de démonstration</Text></View>
            <View style={styles.location}><AppIcon name="location" size={15} color={colors.primary} /><Text style={styles.locationText}>Zone d’exemple · N’Djaména</Text></View>
          </View>
          <View style={[styles.hero, isWide && styles.heroWide]}>
            <View style={styles.heroCopy}>
              <Text style={styles.heroEyebrow}>DES SERVICES LOCAUX, SIMPLEMENT</Text>
              <Text style={styles.heroTitle}>Trouvez l’artisan qu’il vous faut, simplement.</Text>
              <Text style={styles.heroSubtitle}>Explorez les profils d’exemple ou préparez votre besoin en quelques étapes.</Text>
            </View>
            <Surface style={[styles.searchPanel, isWide && styles.searchPanelWide]}>
              <Text style={styles.searchLabel}>Que recherchez-vous ?</Text>
              <View style={[styles.searchRow, isWide && styles.searchRowWide]}>
                <View style={styles.searchInputWrap}><SearchField value={query} onChangeText={setQuery} placeholder="Métier, service ou quartier…" /></View>
                <Button label="Rechercher" icon="search" onPress={searchArtisans} />
              </View>
              <Text style={styles.searchHint}>La recherche porte sur les profils d’exemple.</Text>
            </Surface>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionIntro}><SectionHeading title="Corps de métier" action={<Text style={styles.sectionHint}>Sélection rapide</Text>} /><Text style={styles.sectionHint}>Choisissez une catégorie pour explorer les profils fictifs.</Text></View>
            <View style={styles.categoryGrid}>{["Plomberie", "Électricité", "Menuiserie", "Peinture", "Couture", "Climatisation"].map((label) => {
              const item = categories.find((entry) => entry.id === label);
              if (!item) return null;
              const icon = label === "Plomberie" ? "wrench" : label === "Électricité" ? "zap" : label === "Climatisation" ? "wind" : label === "Menuiserie" ? "hammer" : label === "Couture" ? "scissors" : "paintbrush";
              const selected = category === item.id;
              return <Pressable key={item.id} accessibilityRole="button" accessibilityLabel={`Filtrer par ${item.label}`} accessibilityState={{ selected }} onPress={() => setCategory(selected ? "all" : item.id)} style={[styles.categoryTile, selected && styles.categoryTileSelected]}>
                <View style={[styles.categoryIcon, selected && styles.categoryIconSelected]}><AppIcon name={icon} size={20} color={selected ? colors.white : colors.primary} /></View>
                <Text style={[styles.categoryLabel, selected && styles.categoryLabelSelected]}>{item.label}</Text>
              </Pressable>;
            })}</View>
          </View>
          <View style={styles.section}>
            <SectionHeading title="Artisans · profils d’exemple" action={<Text style={styles.resultCount}>{featured.length} profils</Text>} />
            <Text style={styles.helper}>Profils fictifs : aucun avis ni disponibilité réelle n’est affiché.</Text>
            {featured.length ? <View style={[styles.cards, isWide && styles.cardsWide]}>{featured.map((artisan) => <ArtisanCard key={artisan.id} layout={width >= breakpoints.wide ? "gridWide" : isWide ? "grid" : "row"} name={artisan.name} category={artisan.category} district={artisan.district} city={artisan.city} services={artisan.services} onPress={() => router.push(`/artisan/${artisan.id}` as never)} />)}</View> : <EmptyState title="Aucun profil trouvé" description="Essayez un autre métier ou service." icon="search" action={<Button label="Réinitialiser la recherche" variant="secondary" onPress={() => { setQuery(""); setCategory("all"); }} />} />}
            <Button label="Parcourir tous les artisans" variant="ghost" onPress={() => router.push("/artisans")} />
          </View>
          <View style={styles.processPanel}>
            <View style={styles.processCopy}><Text style={styles.processEyebrow}>UN PARCOURS SIMPLE</Text><Text style={styles.processTitle}>Vous avez un besoin précis ?</Text><Text style={styles.processBody}>Préparez un aperçu en quelques étapes. Rien n’est transmis depuis cette démonstration.</Text></View>
            <View style={[styles.processSteps, isWide && styles.processStepsWide]}><ProcessStep number="1" title="Décrivez le besoin" /><ProcessStep number="2" title="Précisez le lieu fictif" /><ProcessStep number="3" title="Préparez l’aperçu" /></View>
            <Button label="Faire une demande" variant="secondary" onPress={() => router.push("/demande")} />
          </View>
          <View style={styles.footer}><Text style={styles.footerText}>Profils et parcours de démonstration. Aucun message n’est transmis.</Text></View>
        </View>
      </ScrollView>
    </View>
  );
}

function ProcessStep({ number, title }: { number: string; title: string }) {
  return <View style={styles.processStep}><View style={styles.processNumber}><Text style={styles.processNumberText}>{number}</Text></View><Text style={styles.processStepText}>{title}</Text></View>;
}

const styles = StyleSheet.create({
  root: screenStyles.root, scroll: screenStyles.scroll,
  content: screenContent({ maxWidth: layout.contentMax, top: spacing.x3, bottom: spacing.x16 + layout.navHeight, gap: spacing.x6 }),
  contentWide: screenContentWide(),
  contextBar: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: spacing.x3 },
  contextCopy: { gap: 2 },
  greeting: { ...typography.bodySmall, color: colors.textSecondary },
  accountLabel: { ...typography.label, color: colors.textPrimary },
  hero: { gap: spacing.x4 },
  heroWide: { flexDirection: "row", alignItems: "center", gap: spacing.x8 },
  heroCopy: { flex: 1, gap: spacing.x2 },
  location: { minHeight: 36, maxWidth: "100%", flexShrink: 1, flexDirection: "row", alignItems: "center", alignSelf: "flex-start", gap: spacing.x1, paddingHorizontal: spacing.x3, borderRadius: radius.pill, backgroundColor: colors.primarySoft },
  locationText: { ...typography.caption, color: colors.primaryDark, fontWeight: fontWeights.bold, flexShrink: 1 },
  heroEyebrow: { ...typography.eyebrow, color: colors.primary },
  heroTitle: { ...typography.h1, color: colors.textPrimary, maxWidth: 560 },
  heroSubtitle: { ...typography.body, color: colors.textSecondary, maxWidth: 520 },
  searchPanel: { gap: spacing.x3, borderRadius: radius.xlarge, padding: spacing.x4, backgroundColor: colors.surface, borderColor: colors.border },
  searchPanelWide: { flex: 1, maxWidth: 580 },
  searchRow: { flexDirection: "column", alignItems: "stretch", gap: spacing.x2 },
  searchRowWide: { flexDirection: "row", alignItems: "center" },
  searchInputWrap: { flex: 1 },
  searchLabel: { ...typography.title, color: colors.textPrimary },
  searchHint: screenStyles.helper,
  searchDisclaimer: { ...typography.caption, color: colors.textSecondary, textAlign: "center" },
  processPanel: { gap: spacing.x4, backgroundColor: colors.accent, borderRadius: radius.large, padding: spacing.x5 },
  processCopy: { gap: spacing.x2 },
  processEyebrow: { ...typography.eyebrow, color: colors.primaryDark },
  processTitle: { ...typography.h2, color: colors.primaryDark },
  processBody: { ...typography.body, color: colors.primaryDark },
  processSteps: { gap: spacing.x2 },
  processStepsWide: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x4 },
  processStep: { flexDirection: "row", alignItems: "center", gap: spacing.x3 },
  processNumber: { width: 32, height: 32, alignItems: "center", justifyContent: "center", borderRadius: radius.medium, backgroundColor: colors.accent100 },
  processNumberText: { ...typography.label, color: colors.primaryDark },
  processStepText: { ...typography.bodySmall, color: colors.primaryDark },
  section: { gap: spacing.x3 },
  sectionIntro: { gap: spacing.x1 },
  sectionHint: { ...typography.caption, color: colors.textSecondary },
  categoryGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x2 },
  categoryTile: { flexGrow: 1, flexBasis: "30%", minWidth: 88, minHeight: 80, alignItems: "center", justifyContent: "center", gap: spacing.x1, padding: spacing.x2, borderWidth: 1, borderColor: colors.border, borderRadius: radius.medium, backgroundColor: colors.surface },
  categoryTileSelected: { borderColor: colors.primary, backgroundColor: colors.primaryDark },
  categoryIcon: { width: 32, height: 32, alignItems: "center", justifyContent: "center", borderRadius: radius.small, backgroundColor: colors.primarySoft },
  categoryIconSelected: { backgroundColor: "rgba(255,255,255,0.16)" },
  categoryLabel: { ...typography.caption, color: colors.textPrimary, fontWeight: fontWeights.bold, maxWidth: "100%" },
  categoryLabelSelected: { color: colors.white },
  resultCount: { ...typography.bodySmall, color: colors.textSecondary },
  helper: screenStyles.helper,
  cards: { gap: spacing.x3 },
  cardsWide: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x3 },
  footer: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.x4 },
  footerText: { ...typography.caption, color: colors.textSecondary },
});
