import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { AppNavigation } from "../../components/navigation";
import { AppIcon, Badge, Button, EmptyState, Surface } from "../../components/ui";
import { breakpoints, colors, layout, radius, spacing, typography } from "../../constants/theme";
import { artisans } from "../../data/artisans";

export default function ArtisanDetailScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const artisan = artisans.find((item) => item.id === slug);
  const isWide = width >= breakpoints.desktop;

  if (!artisan) {
    return <View style={styles.root}><AppNavigation activeRoute="/artisans" /><EmptyState title="Profil introuvable" description="Cette fiche n’existe pas parmi les exemples." icon="help" action={<Button label="Parcourir les artisans" onPress={() => router.replace("/artisans")} />} /></View>;
  }

  return (
    <View style={styles.root}>
      <AppNavigation activeRoute="/artisans" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.content, isWide && styles.contentWide]}>
          <View style={styles.notice}><AppIcon name="help" size={16} color={colors.info} /><Text style={styles.noticeText}>Fiche fictive — aucune information ci-dessous ne correspond à une annonce réelle.</Text></View>
          <Surface style={styles.profile}>
            <View style={styles.profileHeader}>
              <View style={styles.avatar}><Text style={styles.avatarText}>{artisan.category.slice(0, 1)}</Text></View>
              <View style={styles.profileText}><Badge label="Profil d’exemple" /><Text style={styles.name}>{artisan.name}</Text><Text style={styles.category}>{artisan.category}</Text></View>
            </View>
            <View style={styles.location}><AppIcon name="location" size={18} color={colors.primary} /><Text style={styles.locationText}>{artisan.district}, {artisan.city}</Text></View>
          </Surface>
          <View style={[styles.columns, isWide && styles.columnsWide]}>
            <View style={styles.mainColumn}>
              <Surface style={styles.section}><Text style={styles.sectionTitle}>Présentation</Text><Text style={styles.body}>{artisan.bio}</Text></Surface>
              <Surface style={styles.section}><Text style={styles.sectionTitle}>Services de démonstration</Text><View style={styles.tags}>{artisan.services.map((service) => <View key={service} style={styles.tag}><Text style={styles.tagText}>{service}</Text></View>)}</View></Surface>
            </View>
            <Surface style={styles.infoPanel}><Text style={styles.sectionTitle}>Informations du profil</Text><InfoRow label="Avis et note" value="Non disponibles en démonstration" /><InfoRow label="Disponibilité" value="Non renseignée" /><InfoRow label="Vérification" value="Aucun statut réel" /><InfoRow label="Tarifs et horaires" value="Non renseignés" /><Text style={styles.caption}>Les coordonnées ne sont pas affichées. Aucun contact réel ne peut être établi.</Text></Surface>
          </View>
          <Surface style={styles.quotePanel}><Text style={styles.sectionTitle}>Besoin d’un devis ?</Text><Text style={styles.body}>Préparez une demande de démonstration associée à ce métier. Elle ne sera ni enregistrée ni envoyée.</Text><Button label="Préparer une demande" onPress={() => router.push({ pathname: "/demande", params: { artisanId: artisan.id, category: artisan.category } })} /></Surface>
        </View>
      </ScrollView>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return <View style={styles.infoRow}><Text style={styles.infoLabel}>{label}</Text><Text style={styles.infoValue}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background }, scroll: { flexGrow: 1 },
  content: { width: "100%", maxWidth: layout.readingMax, alignSelf: "center", padding: layout.pageGutter, gap: spacing.x4 },
  contentWide: { maxWidth: layout.detailMax, paddingTop: spacing.x8 },
  notice: { flexDirection: "row", alignItems: "center", gap: spacing.x2, borderRadius: radius.medium, backgroundColor: colors.infoSoft, padding: spacing.x3 },
  noticeText: { ...typography.caption, color: colors.textSecondary, flex: 1 },
  profile: { borderRadius: radius.xlarge, gap: spacing.x4 },
  profileHeader: { flexDirection: "row", alignItems: "center", gap: spacing.x4 },
  avatar: { width: 72, height: 72, borderRadius: radius.large, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" },
  avatarText: { ...typography.h1, color: colors.primaryDark },
  profileText: { flex: 1, gap: spacing.x1 },
  name: { ...typography.h2, color: colors.textPrimary },
  category: { ...typography.body, color: colors.textSecondary },
  location: { flexDirection: "row", alignItems: "center", gap: spacing.x2, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.x3 },
  locationText: { ...typography.bodySmall, color: colors.textPrimary },
  columns: { gap: spacing.x3 }, columnsWide: { flexDirection: "row", alignItems: "flex-start" },
  mainColumn: { flex: 1, gap: spacing.x3 },
  section: { borderRadius: radius.large, gap: spacing.x3 },
  sectionTitle: { ...typography.title, color: colors.textPrimary },
  body: { ...typography.body, color: colors.textSecondary },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x2 },
  tag: { paddingHorizontal: spacing.x3, paddingVertical: spacing.x2, borderRadius: radius.small, backgroundColor: colors.muted },
  tagText: { ...typography.caption, color: colors.textPrimary },
  infoPanel: { flex: 1, borderRadius: radius.large, gap: spacing.x3 },
  infoRow: { gap: spacing.x1, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: spacing.x2 },
  infoLabel: { ...typography.caption, color: colors.textSecondary },
  infoValue: { ...typography.bodySmall, color: colors.textPrimary },
  caption: { ...typography.caption, color: colors.textSecondary },
  quotePanel: { borderRadius: radius.large, gap: spacing.x3 },
});
