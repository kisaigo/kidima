import Head from "expo-router/head";
import { useLocalSearchParams, useRouter } from "expo-router";
import { screenContent, screenContentWide, screenStyles } from "../../components/layout";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppNavigation } from "../../components/navigation";
import { AppIcon, Badge, Button, EmptyState, PageHeading, Surface } from "../../components/ui";
import { breakpoints, colors, fontWeights, layout, radius, shadows, spacing, typography } from "../../constants/theme";
import { artisans } from "../../data/artisans";

export default function ArtisanDetailScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const artisan = artisans.find((item) => item.id === slug);
  const isWide = width >= breakpoints.desktop;
  const isMobile = width < breakpoints.tablet;

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
        <View style={[styles.content, isWide && styles.contentWide, isMobile && { paddingBottom: spacing.x16 + layout.navHeight + spacing.x10 + insets.bottom }]}>
          <View style={styles.notice}><AppIcon name="help" size={16} color={colors.info} /><Text style={styles.noticeText}>Fiche d’exemple — informations fictives, sans annonce réelle.</Text></View>
          <Surface style={styles.profile}>
            <View style={styles.profileHeader}>
              <View style={styles.avatar}><AppIcon name={artisan.category === "Plomberie" ? "wrench" : artisan.category === "Électricité" ? "zap" : artisan.category === "Menuiserie" ? "hammer" : artisan.category === "Couture" ? "scissors" : artisan.category === "Peinture" ? "paintbrush" : artisan.category === "Climatisation" ? "wind" : "users"} size={28} color={colors.primary} /></View>
              <View style={styles.profileText}><Badge label="Profil d’exemple" tone="primary" /><Text style={styles.name}>{artisan.name}</Text><Text style={styles.category}>{artisan.category}</Text><Text style={styles.profileBio}>{artisan.bio}</Text></View>
            </View>
            <View style={styles.location}><AppIcon name="location" size={18} color={colors.primary} /><Text style={styles.locationText}>{artisan.district}, {artisan.city} · zone d’exemple</Text></View>
          </Surface>
          {!isWide ? <View style={styles.profileStats}><ProfileStat label="Avis" value="Non disponibles" /><ProfileStat label="Disponibilité" value="Non renseignée" /><ProfileStat label="Tarifs" value="Après échange" /><ProfileStat label="Vérification" value="Non renseignée" /></View> : null}
          <PageHeading title="À propos" subtitle="Présentation du profil et des services proposés." />
          <View style={[styles.columns, isWide && styles.columnsWide]}>
            <View style={styles.mainColumn}>
              <Surface style={styles.section}><Text style={styles.sectionTitle}>Services proposés</Text><View style={styles.serviceList}>{artisan.services.map((service) => <View key={service} style={styles.serviceRow}><View style={styles.serviceMark}><AppIcon name="check" size={15} color={colors.primary} /></View><Text style={styles.serviceText}>{service}</Text><Badge label="Exemple" /></View>)}</View></Surface>
              <Surface style={styles.section}><Text style={styles.sectionTitle}>Zone d’intervention</Text><View style={styles.locationDetail}><AppIcon name="location" size={18} color={colors.primary} /><View><Text style={styles.body}>{artisan.district}</Text><Text style={styles.caption}>{artisan.city} · zone fictive de démonstration</Text></View></View></Surface>
              {!isWide ? <Surface style={styles.section}><Text style={styles.sectionTitle}>Informations pratiques</Text><InfoRow label="Horaires" value="Non renseignés" /><InfoRow label="Contact" value="Non disponible dans cette démonstration" /><Text style={styles.caption}>Aucun contact réel n’est disponible depuis ce profil.</Text></Surface> : null}
            </View>
            {isWide ? <Surface style={styles.infoPanel}><Text style={styles.sectionTitle}>Informations du profil</Text><InfoRow label="Avis" value="Non disponibles" /><InfoRow label="Disponibilité" value="Non renseignée" /><InfoRow label="Vérification" value="Statut non disponible" /><InfoRow label="Tarifs" value="Communiqués après échange" /><InfoRow label="Horaires" value="Non renseignés" /><InfoRow label="Contact" value="Non disponible dans cette démonstration" /><Text style={styles.caption}>Aucun contact réel n’est disponible depuis ce profil.</Text></Surface> : null}
          </View>
          {!isMobile ? <Surface style={styles.quotePanel}><Text style={styles.sectionTitle}>Un besoin pour ce métier ?</Text><Text style={styles.body}>Préparez un aperçu local associé au métier de ce profil.</Text><Button label="Faire une demande à cet artisan" icon="arrowRight" onPress={() => router.push({ pathname: "/demande", params: { artisanId: artisan.id, category: artisan.category } })} /></Surface> : null}
        </View>
      </ScrollView>
      {isMobile ? <View pointerEvents="box-none" style={[styles.mobileCta, { bottom: layout.navHeight + insets.bottom + spacing.x2 }]}><Button fullWidth label="Faire une demande" icon="arrowRight" accessibilityLabel={`Préparer une demande d’exemple pour ${artisan.category}`} onPress={() => router.push({ pathname: "/demande", params: { artisanId: artisan.id, category: artisan.category } })} /></View> : null}
    </View>
  );
}

function ProfileStat({ label, value }: { label: string; value: string }) {
  return <View style={styles.profileStat}><Text style={styles.profileStatLabel}>{label}</Text><Text style={styles.profileStatValue}>{value}</Text></View>;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return <View style={styles.infoRow}><Text style={styles.infoLabel}>{label}</Text><Text style={styles.infoValue}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  root: screenStyles.root, scroll: screenStyles.scroll,
  content: screenContent({ top: spacing.x3, bottom: spacing.x10, gap: spacing.x5 }),
  contentWide: screenContentWide({ maxWidth: layout.detailMax }),
  notice: { flexDirection: "row", alignItems: "center", gap: spacing.x2, borderRadius: radius.medium, backgroundColor: colors.infoSoft, padding: spacing.x3 },
  noticeText: { ...typography.caption, color: colors.textSecondary, flex: 1 },
  profile: { borderRadius: radius.large, gap: spacing.x4, backgroundColor: colors.surface, borderColor: colors.border, ...shadows.subtle },
  profileHeader: { flexDirection: "row", alignItems: "flex-start", gap: spacing.x4 },
  avatar: { width: 72, height: 72, borderRadius: radius.medium, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" },
  profileText: { flex: 1, minWidth: 0, gap: spacing.x1 },
  name: { ...typography.h2, color: colors.textPrimary },
  category: { ...typography.body, color: colors.textSecondary },
  profileBio: { ...typography.bodySmall, color: colors.textSecondary, marginTop: spacing.x1 },
  location: { minHeight: 40, flexDirection: "row", alignItems: "center", gap: spacing.x2, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.x3 },
  locationText: { ...typography.bodySmall, color: colors.textPrimary, flex: 1 },
  profileStats: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x2 },
  profileStat: { flexGrow: 1, flexBasis: "45%", gap: spacing.x1, padding: spacing.x3, borderWidth: 1, borderColor: colors.border, borderRadius: radius.medium, backgroundColor: colors.surface },
  profileStatLabel: { ...typography.caption, color: colors.textSecondary },
  profileStatValue: { ...typography.bodySmall, color: colors.primaryDark, fontWeight: fontWeights.bold },
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
  mobileCta: { position: "absolute", left: spacing.x4, right: spacing.x4, zIndex: 9, padding: spacing.x2, borderWidth: 1, borderColor: colors.border, borderRadius: radius.large, backgroundColor: colors.surface, ...shadows.floating },
});
