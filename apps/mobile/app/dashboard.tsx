import { useWindowDimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { AppIcon, Badge, BottomTabBar, Button } from "../components/ui";
import { colors, radius, spacing } from "../constants/theme";

const NAV_ITEMS = [
  { label: "Vue d’ensemble", icon: "list", route: "/dashboard" },
  { label: "Artisans", icon: "users", route: "/artisans" },
  { label: "Demandes", icon: "create", route: "/demande" },
  { label: "Signalements", icon: "shield", route: "/reclamations" },
  { label: "Navigation", icon: "settings", route: "/menu" },
] as const;

const ARTISANS_TO_VERIFY = [
  { name: "Nina Clim", category: "Climatisation", since: "Inscrit le 30 sept." },
  { name: "Moussa Services", category: "Entretien ménager", since: "Inscrit le 29 sept." },
];

const RECENT_REQUESTS = [
  { reference: "DEM-2026-0384", service: "Dépannage plomberie", place: "Moursal", status: "À attribuer" },
  { reference: "DEM-2026-0382", service: "Installation électrique", place: "Chagoua", status: "En attente" },
  { reference: "DEM-2026-0379", service: "Entretien climatisation", place: "Sabangali", status: "Terminée" },
];

const REPORTS_TO_REVIEW = [
  { reference: "SIG-2026-0142", subject: "Numéro non valide", artisan: "Ali Plomberie", status: "En cours" },
  { reference: "SIG-2026-0138", subject: "Retrait de profil", artisan: "Karim Electrique", status: "Reçu" },
];

const ACTIVITY = [
  { label: "Demande de dépannage créée", detail: "DEM-2026-0384 · il y a 18 min" },
  { label: "Profil en attente de vérification", detail: "Nina Clim · il y a 2 h" },
  { label: "Signalement mis à jour", detail: "SIG-2026-0142 · il y a 4 h" },
];

const MOBILE_TABS = [
  { label: "Accueil", icon: "home", route: "/" },
  { label: "Artisans", icon: "users", route: "/artisans" },
  { label: "Besoin", icon: "create", route: "/demande" },
  { label: "Suivi", icon: "list", route: "/reclamations" },
  { label: "Admin", icon: "settings", route: "/dashboard" },
] as const;

export default function DashboardScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 960;
  const kpis = [
    { label: "Artisans actifs", value: "18", icon: "users", tone: colors.primary },
    { label: "Demandes ouvertes", value: "07", icon: "create", tone: colors.warning },
    { label: "Demandes terminées", value: "42", icon: "check", tone: colors.success },
    { label: "Signalements ouverts", value: "02", icon: "shield", tone: colors.error },
  ] as const;

  const goTo = (route: string) => router.push(route as never);

  return (
    <View style={styles.root}>
      {isDesktop ? (
        <View style={styles.sidebar}>
          <View style={styles.brandRow}>
            <View style={styles.brandMark}><Text style={styles.brandMarkText}>K</Text></View>
            <View>
              <Text style={styles.brandName}>kidima</Text>
              <Text style={styles.brandCaption}>ESPACE OPÉRATIONS</Text>
            </View>
          </View>
          <Text style={styles.navCaption}>GESTION</Text>
          <View style={styles.navList}>
            {NAV_ITEMS.map((item) => {
              const active = item.route === "/dashboard";
              return (
                <Pressable key={item.route} accessibilityRole="button" onPress={() => goTo(item.route)} style={[styles.navItem, active && styles.navItemActive]}>
                  <AppIcon name={item.icon} size={17} color={active ? colors.primary : colors.textSecondary} />
                  <Text style={[styles.navLabel, active && styles.navLabelActive]}>{item.label}</Text>
                </Pressable>
              );
            })}
          </View>
          <View style={styles.sidebarFooter}>
            <View style={styles.operatorAvatar}><Text style={styles.operatorInitials}>OP</Text></View>
            <View style={styles.operatorCopy}>
              <Text style={styles.operatorName}>Équipe Kidima</Text>
              <Text style={styles.operatorRole}>Opérations</Text>
            </View>
          </View>
        </View>
      ) : null}

      <View style={styles.main}>
        <View style={styles.topbar}>
          <View>
            <Text style={styles.topbarEyebrow}>GESTION · N’DJAMÉNA</Text>
            <Text style={styles.pageTitle}>Vue d’ensemble</Text>
          </View>
          <View style={styles.topbarAction}>
            <Button label="Voir les artisans" variant="secondary" compact icon="users" onPress={() => goTo("/artisans")} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.mainScroll} keyboardShouldPersistTaps="handled">
          <View style={styles.mainContent}>
            <View style={styles.kpiGrid}>
              {kpis.map((item) => (
                <View key={item.label} style={[styles.kpi, isDesktop ? styles.kpiDesktop : styles.kpiMobile]}>
                  <View style={styles.kpiTop}>
                    <Text style={styles.kpiLabel}>{item.label}</Text>
                    <AppIcon name={item.icon} size={16} color={item.tone} />
                  </View>
                  <Text style={styles.kpiValue}>{item.value}</Text>
                  <Text style={styles.kpiCaption}>dans votre espace</Text>
                </View>
              ))}
            </View>

            <View style={[styles.workGrid, isDesktop && styles.workGridDesktop]}>
              <View style={styles.column}>
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View>
                      <Text style={styles.sectionTitle}>Artisans à vérifier</Text>
                      <Text style={styles.sectionSubtitle}>Profils en attente de validation</Text>
                    </View>
                    <Badge label={`${ARTISANS_TO_VERIFY.length}`} tone="warning" />
                  </View>
                  <View style={styles.rowList}>
                    {ARTISANS_TO_VERIFY.map((artisan) => (
                      <Pressable key={artisan.name} accessibilityRole="button" onPress={() => goTo("/artisans")} style={styles.dataRow}>
                        <View style={styles.rowIcon}><AppIcon name="user" size={16} color={colors.textSecondary} /></View>
                        <View style={styles.rowCopy}>
                          <Text style={styles.rowTitle}>{artisan.name}</Text>
                          <Text style={styles.rowDetail}>{artisan.category} · {artisan.since}</Text>
                        </View>
                        <AppIcon name="chevronRight" size={17} color={colors.textSecondary} />
                      </Pressable>
                    ))}
                  </View>
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View>
                      <Text style={styles.sectionTitle}>Demandes récentes</Text>
                      <Text style={styles.sectionSubtitle}>Dernières prestations enregistrées</Text>
                    </View>
                    <Pressable accessibilityRole="button" onPress={() => goTo("/demande")}><Text style={styles.linkText}>Tout voir</Text></Pressable>
                  </View>
                  <View style={styles.rowList}>
                    {RECENT_REQUESTS.map((request) => (
                      <Pressable key={request.reference} accessibilityRole="button" onPress={() => goTo("/demande")} style={styles.dataRow}>
                        <View style={styles.rowCopy}>
                          <Text style={styles.rowTitle}>{request.service}</Text>
                          <Text style={styles.rowDetail}>{request.reference} · {request.place}</Text>
                        </View>
                        <Badge label={request.status} tone={request.status === "Terminée" ? "success" : "neutral"} />
                      </Pressable>
                    ))}
                  </View>
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View>
                      <Text style={styles.sectionTitle}>Signalements à traiter</Text>
                      <Text style={styles.sectionSubtitle}>Dossiers nécessitant une attention</Text>
                    </View>
                    <Pressable accessibilityRole="button" onPress={() => goTo("/reclamations")}><Text style={styles.linkText}>Tout voir</Text></Pressable>
                  </View>
                  <View style={styles.rowList}>
                    {REPORTS_TO_REVIEW.map((report) => (
                      <Pressable key={report.reference} accessibilityRole="button" onPress={() => goTo("/reclamations")} style={styles.dataRow}>
                        <View style={styles.rowCopy}>
                          <Text style={styles.rowTitle}>{report.subject}</Text>
                          <Text style={styles.rowDetail}>{report.reference} · {report.artisan}</Text>
                        </View>
                        <Badge label={report.status} tone={report.status === "En cours" ? "warning" : "primary"} />
                      </Pressable>
                    ))}
                  </View>
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View>
                      <Text style={styles.sectionTitle}>Activité récente</Text>
                      <Text style={styles.sectionSubtitle}>Dernières mises à jour de l’espace</Text>
                    </View>
                  </View>
                  <View style={styles.activityList}>
                    {ACTIVITY.map((item, index) => (
                      <View key={item.label} style={styles.activityRow}>
                        <View style={[styles.activityDot, index === 0 && styles.activityDotActive]} />
                        <View style={styles.rowCopy}>
                          <Text style={styles.rowTitle}>{item.label}</Text>
                          <Text style={styles.rowDetail}>{item.detail}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {!isDesktop ? <BottomTabBar items={MOBILE_TABS} activeIndex={4} onChange={(index) => goTo(MOBILE_TABS[index].route)} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, flexDirection: "row", backgroundColor: colors.background },
  sidebar: { width: 238, backgroundColor: colors.surface, borderRightWidth: 1, borderRightColor: colors.border, paddingHorizontal: spacing.x4, paddingTop: spacing.x6, paddingBottom: spacing.x4 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: spacing.x3, paddingBottom: spacing.x8 },
  brandMark: { width: 36, height: 36, borderRadius: radius.medium, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  brandMarkText: { color: colors.white, fontSize: 18, fontWeight: "800" },
  brandName: { color: colors.textPrimary, fontSize: 17, fontWeight: "800" },
  brandCaption: { color: colors.textSecondary, fontSize: 9, fontWeight: "800", marginTop: 2 },
  navCaption: { color: colors.textSecondary, fontSize: 10, fontWeight: "800", marginBottom: spacing.x2 },
  navList: { gap: 3 },
  navItem: { minHeight: 42, flexDirection: "row", alignItems: "center", gap: spacing.x3, paddingHorizontal: spacing.x3, borderRadius: radius.medium },
  navItemActive: { backgroundColor: colors.primarySoft },
  navLabel: { color: colors.textSecondary, fontSize: 13, fontWeight: "600" },
  navLabelActive: { color: colors.primary, fontWeight: "800" },
  sidebarFooter: { flexDirection: "row", alignItems: "center", gap: spacing.x2, marginTop: "auto", paddingTop: spacing.x4, borderTopWidth: 1, borderTopColor: colors.border },
  operatorAvatar: { width: 34, height: 34, borderRadius: radius.pill, backgroundColor: colors.muted, alignItems: "center", justifyContent: "center" },
  operatorInitials: { color: colors.textPrimary, fontSize: 10, fontWeight: "800" },
  operatorCopy: { flex: 1 },
  operatorName: { color: colors.textPrimary, fontSize: 12, fontWeight: "700" },
  operatorRole: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  main: { flex: 1, minWidth: 0 },
  topbar: { minHeight: 76, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.x3, paddingHorizontal: spacing.x4, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.surface },
  topbarEyebrow: { color: colors.textSecondary, fontSize: 9, fontWeight: "800", letterSpacing: 0.5 },
  pageTitle: { color: colors.textPrimary, fontSize: 20, fontWeight: "800", marginTop: 3 },
  topbarAction: { flexShrink: 0 },
  mainScroll: { flexGrow: 1, paddingHorizontal: spacing.x4, paddingTop: spacing.x4, paddingBottom: spacing.x6 },
  mainContent: { width: "100%", maxWidth: 1180, alignSelf: "center", gap: spacing.x6 },
  kpiGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x3 },
  kpi: { minHeight: 104, padding: spacing.x3, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.medium, justifyContent: "space-between" },
  kpiDesktop: { flexBasis: "23%", flexGrow: 1 },
  kpiMobile: { flexBasis: "46%", flexGrow: 1 },
  kpiTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.x1 },
  kpiLabel: { color: colors.textSecondary, fontSize: 11, fontWeight: "700", flexShrink: 1 },
  kpiValue: { color: colors.textPrimary, fontSize: 25, fontWeight: "800", marginTop: spacing.x2 },
  kpiCaption: { color: colors.textSecondary, fontSize: 10, marginTop: 2 },
  workGrid: { gap: spacing.x6 },
  workGridDesktop: { flexDirection: "row", alignItems: "flex-start" },
  column: { flex: 1, minWidth: 0, gap: spacing.x6 },
  section: { gap: spacing.x3 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.x2 },
  sectionTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: "800" },
  sectionSubtitle: { color: colors.textSecondary, fontSize: 11, marginTop: 3 },
  linkText: { color: colors.primary, fontSize: 12, fontWeight: "700" },
  rowList: { borderTopWidth: 1, borderTopColor: colors.border },
  dataRow: { minHeight: 56, flexDirection: "row", alignItems: "center", gap: spacing.x2, paddingVertical: spacing.x2, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowIcon: { width: 30, height: 30, borderRadius: radius.small, backgroundColor: colors.muted, alignItems: "center", justifyContent: "center" },
  rowCopy: { flex: 1, minWidth: 0, gap: 3 },
  rowTitle: { color: colors.textPrimary, fontSize: 12, fontWeight: "700" },
  rowDetail: { color: colors.textSecondary, fontSize: 10 },
  activityList: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.x2, gap: spacing.x3 },
  activityRow: { flexDirection: "row", alignItems: "flex-start", gap: spacing.x3 },
  activityDot: { width: 8, height: 8, marginTop: 4, borderRadius: radius.pill, backgroundColor: colors.border },
  activityDotActive: { backgroundColor: colors.primary },
});
