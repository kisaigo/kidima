import Head from "expo-router/head";
import { useLocalSearchParams, useRouter } from "expo-router";
import { screenContent, screenContentWide, screenStyles } from "../../components/layout";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { AppNavigation } from "../../components/navigation";
import { AppIcon, Badge, Button, EmptyState, PageHeading, Surface } from "../../components/ui";
import { breakpoints, colors, layout, radius, shadows, spacing, typography } from "../../constants/theme";
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
      <Head>
        <title>{`${artisan.name} — Kidima`}</title>
      </Head>
      <AppNavigation activeRoute="/artisans" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.content, isWide && styles.contentWide, width < breakpoints.tablet && styles.contentMobile]}>
          <View style={styles.notice}><AppIcon name="help" size={16} color={colors.info} /><Text style={styles.noticeText}>Fiche d’exemple — informations fictives, sans annonce réelle.</Text></View>
          <Surface style={styles.profile}>
            <View style={styles.profileHeader}>
              <View style={styles.avatar}><AppIcon name={artisan.category === "Plomberie" ? "wrench" : artisan.category === "Électricité" ? "zap" : artisan.category === "Menuiserie" ? "hammer" : artisan.category === "Couture" ? "scissors" : artisan.category === "Peinture" ? "paintbrush" : artisan.category === "Climatisation" ? "wind" : "users"} size={28} color={colors.primaryDark} /></View>
              <View style={styles.profileText}><Badge label="Profil d’exemple" /><Text style={styles.name}>{artisan.name}</Text><Text style={styles.category}>{artisan.category}</Text><Text style={styles.profileBio}>{artisan.bio}</Text></View>
            </View>
            <View style={styles.location}><AppIcon name="location" size={18} color={colors.primaryOnDark} /><Text style={styles.locationText}>{artisan.district}, {artisan.city} · zone d’exemple</Text></View>
          </Surface>
          <PageHeading title="À propos" subtitle="Présentation du profil et de ses services proposés." />
          <View style={[styles.columns, isWide && styles.columnsWide]}>
            <View style={styles.mainColumn}>
              <Surface style={styles.section}><Text style={styles.sectionTitle}>Services proposés</Text><View style={styles.serviceList}>{artisan.services.map((service) => <View key={service} style={styles.serviceRow}><View style={styles.serviceMark}><AppIcon name="check" size={15} color={colors.primary} /></View><Text style={styles.serviceText}>{service}</Text><Badge label="Exemple" /></View>)}</View></Surface>
              <Surface style={styles.section}><Text style={styles.sectionTitle}>Zone d’intervention</Text><View style={styles.locationDetail}><AppIcon name="location" size={18} color={colors.primary} /><View><Text style={styles.body}>{artisan.district}</Text><Text style={styles.caption}>{artisan.city} · zone fictive de démonstration</Text></View></View></Surface>
            </View>
            <Surface style={styles.infoPanel}><Text style={styles.sectionTitle}>Informations du profil</Text><InfoRow label="Avis" value="Non disponibles dans cette démonstration" /><InfoRow label="Disponibilité" value="Non renseignée" /><InfoRow label="Vérification" value="Statut non disponible" /><InfoRow label="Tarifs" value="Communiqués après échange" /><InfoRow label="Horaires" value="Non renseignés" /><Text style={styles.caption}>Aucun contact réel n’est disponible.</Text></Surface>
          </View>
          <Surface style={styles.quotePanel}><Text style={styles.sectionTitle}>Un besoin pour ce métier ?</Text><Text style={styles.body}>Préparez un aperçu local associé au métier de ce profil.</Text><Button label="Faire une demande à cet artisan" icon="arrowRight" onPress={() => router.push({ pathname: "/demande", params: { artisanId: artisan.id, category: artisan.category } })} /></Surface>
        </View>
      </ScrollView>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return <View style={styles.infoRow}><Text style={styles.infoLabel}>{label}</Text><Text style={styles.infoValue}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  root: screenStyles.root, scroll: screenStyles.scroll,
  content: screenContent({ bottom: spacing.x10 }),
  contentMobile: { paddingBottom: spacing.x16 + layout.navHeight },
  contentWide: screenContentWide({ maxWidth: layout.detailMax }),
  notice: { flexDirection: "row", alignItems: "center", gap: spacing.x2, borderRadius: radius.medium, backgroundColor: colors.infoSoft, padding: spacing.x3 },
  noticeText: { ...typography.caption, color: colors.textSecondary, flex: 1 },
  profile: { borderRadius: radius.xlarge, gap: spacing.x4, backgroundColor: colors.primaryDark, borderColor: colors.primaryDark, ...shadows.floating },
  profileHeader: { flexDirection: "row", alignItems: "flex-start", gap: spacing.x4 },
  avatar: { width: 72, height: 72, borderRadius: radius.large, backgroundColor: colors.primaryOnDark, alignItems: "center", justifyContent: "center" },
  avatarText: { ...typography.h1, color: colors.primaryDark },
  profileText: { flex: 1, gap: spacing.x1 },
  name: { ...typography.h2, color: colors.white },
  category: { ...typography.body, color: colors.primaryOnDark },
  profileBio: { ...typography.bodySmall, color: colors.primaryOnDark, marginTop: spacing.x1 },
  location: { flexDirection: "row", alignItems: "center", gap: spacing.x2, borderTopWidth: 1, borderTopColor: colors.borderOnDark, paddingTop: spacing.x3 },
  locationText: { ...typography.bodySmall, color: colors.primaryOnDark },
  columns: { gap: spacing.x3 }, columnsWide: { flexDirection: "row", alignItems: "flex-start" },
  mainColumn: { flex: 1, gap: spacing.x3 },
  section: { borderRadius: radius.large, gap: spacing.x3 },
  sectionTitle: { ...typography.title, color: colors.textPrimary },
  body: screenStyles.body,
  serviceList: { gap: spacing.x2 },
  serviceRow: { minHeight: 48, flexDirection: "row", alignItems: "center", gap: spacing.x2, borderBottomWidth: 1, borderBottomColor: colors.border },
  serviceMark: { width: 28, height: 28, alignItems: "center", justifyContent: "center", borderRadius: radius.pill, backgroundColor: colors.primarySoft },
  serviceText: { ...typography.body, color: colors.textPrimary, flex: 1 },
  locationDetail: { flexDirection: "row", alignItems: "center", gap: spacing.x3 },
  infoPanel: { flex: 1, borderRadius: radius.large, gap: spacing.x3 },
  infoRow: { gap: spacing.x1, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: spacing.x2 },
  infoLabel: { ...typography.caption, color: colors.textSecondary },
  infoValue: { ...typography.bodySmall, color: colors.textPrimary },
  caption: screenStyles.caption,
  quotePanel: { borderRadius: radius.large, gap: spacing.x3 },
});
