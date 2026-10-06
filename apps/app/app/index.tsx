import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Head from "expo-router/head";
import { useRouter } from "expo-router";
import { screenContent, screenContentWide, screenStyles } from "../components/layout";
import { AppIcon, ArtisanCard, Button, ChoiceChip, EmptyState, SearchField, SectionHeading, Surface } from "../components/ui";
import { AppNavigation } from "../components/navigation";
import { breakpoints, colors, fontWeights, layout, radius, shadows, spacing, typography } from "../constants/theme";
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
          <View style={[styles.hero, isWide && styles.heroWide]}>
            <View style={styles.heroCopy}>
              <View style={styles.location}><AppIcon name="location" size={16} color={colors.primaryDark} /><Text style={styles.locationText}>N’Djaména · démonstration</Text></View>
              <Text style={styles.heroEyebrow}>DES SERVICES LOCAUX, SIMPLEMENT</Text>
              <Text style={styles.heroTitle}>Trouvez le bon métier pour votre projet.</Text>
              <Text style={styles.heroSubtitle}>Explorez les profils d’exemple et préparez votre besoin en quelques étapes.</Text>
            </View>
            <Surface style={[styles.searchPanel, isWide && styles.searchPanelWide]}>
              <Text style={styles.searchLabel}>Que recherchez-vous ?</Text>
              <View style={[styles.searchRow, isWide && styles.searchRowWide]}>
                <View style={styles.searchInputWrap}><SearchField value={query} onChangeText={setQuery} placeholder="Métier, service ou quartier…" /></View>
                <Button label="Rechercher" variant="secondary" icon="search" onPress={searchArtisans} />
              </View>
              <Text style={styles.searchHint}>La recherche porte sur les profils d’exemple.</Text>
              <Button label="Faire une demande" icon="arrowRight" onPress={() => router.push("/demande")} />
              <Text style={styles.searchDisclaimer}>Aucune demande réelle n’est envoyée.</Text>
            </Surface>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionIntro}><SectionHeading title="Explorer par métier" /><Text style={styles.sectionHint}>Choisissez une catégorie pour filtrer les profils d’exemple.</Text></View>
            <View style={styles.chips}>{categories.filter((item) => item.id !== "all").map((item) => <ChoiceChip key={item.id} label={item.label} icon={item.id === "Plomberie" ? "wrench" : item.id === "Électricité" ? "zap" : item.id === "Climatisation" ? "wind" : item.id === "Réparation téléphone" ? "smartphone" : item.id === "Menuiserie" ? "hammer" : item.id === "Couture" ? "scissors" : "paintbrush"} selected={category === item.id} onPress={() => setCategory(category === item.id ? "all" : item.id)} />)}</View>
          </View>
          <View style={styles.section}>
            <SectionHeading title="Profils d’exemple" action={<Text style={styles.resultCount}>{featured.length} affichés</Text>} />
            <Text style={styles.helper}>Profils fictifs : aucun avis ni disponibilité réelle n’est affiché.</Text>
            {featured.length ? <View style={[styles.cards, isWide && styles.cardsWide]}>{featured.map((artisan) => <ArtisanCard key={artisan.id} layout={width >= breakpoints.wide ? "gridWide" : isWide ? "grid" : "row"} name={artisan.name} category={artisan.category} district={artisan.district} city={artisan.city} services={artisan.services} onPress={() => router.push(`/artisan/${artisan.id}` as never)} />)}</View> : <EmptyState title="Aucun profil trouvé" description="Essayez un autre métier ou service." icon="search" action={<Button label="Réinitialiser la recherche" variant="secondary" onPress={() => { setQuery(""); setCategory("all"); }} />} />}
            <Button label="Parcourir tous les artisans" variant="ghost" onPress={() => router.push("/artisans")} />
          </View>
          <Surface style={styles.processPanel}>
            <View style={styles.processCopy}><Text style={styles.processEyebrow}>UN PARCOURS SIMPLE</Text><Text style={styles.processTitle}>Vous avez un besoin précis ?</Text><Text style={styles.processBody}>Préparez un aperçu en quelques étapes. Il reste local à cette démonstration.</Text></View>
            <View style={[styles.processSteps, isWide && styles.processStepsWide]}><ProcessStep number="1" title="Décrivez le besoin" /><ProcessStep number="2" title="Précisez le lieu fictif" /><ProcessStep number="3" title="Préparez l’aperçu" /></View>
            <Button label="Créer une demande" onPress={() => router.push("/demande")} />
          </Surface>
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
  content: screenContent({ maxWidth: layout.contentMax, top: spacing.x4, bottom: spacing.x16 + layout.navHeight, gap: spacing.x8 }),
  contentWide: screenContentWide(),
  hero: { gap: spacing.x5, padding: spacing.x6, borderRadius: radius.xlarge, backgroundColor: colors.primaryDark, ...shadows.floating },
  heroWide: { flexDirection: "row", alignItems: "center", gap: spacing.x8, padding: spacing.x10 },
  heroCopy: { flex: 1, gap: spacing.x3 },
  location: { minHeight: 36, flexDirection: "row", alignItems: "center", alignSelf: "flex-start", gap: spacing.x1, paddingHorizontal: spacing.x3, borderRadius: radius.pill, backgroundColor: colors.surface },
  locationText: { ...typography.caption, color: colors.primaryDark, fontWeight: fontWeights.bold },
  heroEyebrow: { ...typography.eyebrow, color: colors.primaryOnDark, marginTop: spacing.x2 },
  heroTitle: { ...typography.display, color: colors.white, maxWidth: 560 },
  heroSubtitle: { ...typography.body, color: colors.primaryOnDark, maxWidth: 520 },
  searchPanel: { gap: spacing.x3, borderRadius: radius.xlarge, padding: spacing.x6 },
  searchPanelWide: { flex: 1, maxWidth: 520 },
  searchRow: { flexDirection: "column", alignItems: "stretch", gap: spacing.x2 },
  searchRowWide: { flexDirection: "row", alignItems: "center" },
  searchInputWrap: { flex: 1 },
  searchLabel: { ...typography.title, color: colors.textPrimary },
  searchHint: screenStyles.helper,
  searchDisclaimer: { ...typography.caption, color: colors.textSecondary, textAlign: "center" },
  processPanel: { gap: spacing.x4, backgroundColor: colors.primaryDark, borderColor: colors.primaryDark, borderRadius: radius.xlarge, padding: spacing.x6 },
  processCopy: { gap: spacing.x2 },
  processEyebrow: { ...typography.eyebrow, color: colors.primaryOnDark },
  processTitle: { ...typography.h2, color: colors.white },
  processBody: { ...typography.body, color: colors.primaryOnDark },
  processSteps: { gap: spacing.x2 },
  processStepsWide: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x4 },
  processStep: { flexDirection: "row", alignItems: "center", gap: spacing.x3 },
  processNumber: { width: 32, height: 32, alignItems: "center", justifyContent: "center", borderRadius: radius.pill, backgroundColor: colors.primaryOnDark },
  processNumberText: { ...typography.label, color: colors.primaryDark },
  processStepText: { ...typography.bodySmall, color: colors.white },
  section: { gap: spacing.x3 },
  sectionIntro: { gap: spacing.x1 },
  sectionHint: screenStyles.helper,
  chips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x2 },
  resultCount: { ...typography.bodySmall, color: colors.textSecondary },
  helper: screenStyles.helper,
  cards: { gap: spacing.x3 },
  cardsWide: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x3 },
  footer: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.x4 },
  footerText: { ...typography.caption, color: colors.textSecondary },
});
