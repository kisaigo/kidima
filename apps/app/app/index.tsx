import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useRouter } from "expo-router";
import { AppIcon, ArtisanCard, Button, ChoiceChip, EmptyState, SearchField, SectionHeading, Surface } from "../components/ui";
import { AppNavigation } from "../components/navigation";
import { breakpoints, colors, layout, radius, spacing, typography } from "../constants/theme";
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

  return (
    <View style={styles.root}>
      <AppNavigation activeRoute="/" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={[styles.content, isWide && styles.contentWide]}>
          <View style={styles.header}>
            <View><Text style={styles.eyebrow}>KIDIMA · N’DJAMÉNA</Text><Text style={styles.heading}>Un artisan pour vos projets.</Text></View>
            <View style={styles.location}><AppIcon name="location" size={16} color={colors.primary} /><Text style={styles.locationText}>N’Djaména</Text></View>
          </View>
          <Text style={styles.intro}>Décrivez votre besoin ou explorez les métiers près de chez vous.</Text>
          <Surface style={styles.searchPanel}>
            <Text style={styles.searchLabel}>Que recherchez-vous ?</Text>
            <SearchField value={query} onChangeText={setQuery} placeholder="Métier, service ou quartier" />
            <Button label="Décrire mon besoin" icon="arrowRight" onPress={() => router.push("/demande")} />
          </Surface>
          <View style={styles.section}>
            <SectionHeading title="Explorer par métier" action={<Text style={styles.demoTag}>EXEMPLES</Text>} />
            <View style={styles.chips}>{categories.map((item) => <ChoiceChip key={item.id} label={item.label} selected={category === item.id} onPress={() => setCategory(item.id)} />)}</View>
          </View>
          <View style={styles.section}>
            <SectionHeading title="Profils à découvrir" action={<Text style={styles.resultCount}>{featured.length} exemples</Text>} />
            <Text style={styles.helper}>Profils entièrement fictifs ; aucune note ou disponibilité réelle.</Text>
            {featured.length ? <View style={[styles.cards, isWide && styles.cardsWide]}>{featured.map((artisan) => <ArtisanCard key={artisan.id} layout={isWide ? "grid" : "row"} name={artisan.name} category={artisan.category} district={artisan.district} city={artisan.city} services={artisan.services} onPress={() => router.push(`/artisan/${artisan.id}` as never)} />)}</View> : <EmptyState title="Aucun profil trouvé" description="Essayez un autre métier ou service." icon="search" />}
            <Button label="Parcourir tous les artisans" variant="quiet" onPress={() => router.push("/artisans")} />
          </View>
          <View style={styles.footer}><Text style={styles.footerText}>Kidima facilite la découverte. Les demandes de cette démonstration ne sont pas envoyées.</Text></View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background }, scroll: { flexGrow: 1 },
  content: { width: "100%", maxWidth: layout.contentMax, alignSelf: "center", paddingHorizontal: layout.pageGutter, paddingTop: spacing.x6, paddingBottom: spacing.x10, gap: spacing.x5 },
  contentWide: { paddingHorizontal: layout.pageGutterWide, paddingTop: spacing.x8 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.x3 },
  eyebrow: { ...typography.caption, color: colors.primary, fontWeight: "700", letterSpacing: 1 },
  heading: { ...typography.h1, color: colors.textPrimary, marginTop: spacing.x1 },
  intro: { ...typography.body, color: colors.textSecondary, maxWidth: 640 },
  location: { minHeight: 44, flexDirection: "row", alignItems: "center", gap: spacing.x1, paddingHorizontal: spacing.x3, borderRadius: radius.pill, backgroundColor: colors.primarySoft },
  locationText: { ...typography.label, color: colors.primaryDark },
  searchPanel: { gap: spacing.x3, borderRadius: radius.xlarge },
  searchLabel: { ...typography.title, color: colors.textPrimary },
  section: { gap: spacing.x3 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x2 },
  demoTag: { ...typography.caption, color: colors.textSecondary, fontWeight: "700", letterSpacing: 0.6 },
  resultCount: { ...typography.bodySmall, color: colors.textSecondary },
  helper: { ...typography.bodySmall, color: colors.textSecondary },
  cards: { gap: spacing.x3 },
  cardsWide: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x3 },
  footer: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.x4 },
  footerText: { ...typography.caption, color: colors.textSecondary },
});
