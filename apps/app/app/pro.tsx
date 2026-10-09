import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, useWindowDimensions, View } from "react-native";
import Head from "expo-router/head";
import { useRouter } from "expo-router";
import { screenContent, screenContentWide, screenStyles } from "../components/layout";
import { AppNavigation } from "../components/navigation";
import { AppIcon, Badge, Button, EmptyState, Field, PageHeading, SectionHeading, Surface } from "../components/ui";
import { breakpoints, colors, fontWeights, layout, radius, shadows, spacing, typography } from "../constants/theme";
import { useDemoAccount } from "../contexts/account";
import { demoProfessionalProfile, demoProfessionalServices, demoWeekdays } from "../data/mock-professional";

const SECTIONS = ["Vue d’ensemble", "Profil professionnel", "Services", "Disponibilités", "Demandes reçues", "Devis envoyés"] as const;
type Section = typeof SECTIONS[number];

export default function ProfessionalScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { account, enableArtisanMode } = useDemoAccount();
  const [section, setSection] = useState<Section>("Vue d’ensemble");
  const [available, setAvailable] = useState(false);
  const [activeDays, setActiveDays] = useState<string[]>(["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]);
  const [displayName, setDisplayName] = useState<string>(demoProfessionalProfile.displayName);
  const [description, setDescription] = useState<string>(demoProfessionalProfile.description);
  const [services, setServices] = useState(demoProfessionalServices);
  const [newService, setNewService] = useState("");
  const isWide = width >= breakpoints.desktop;
  const configuredServices = services.filter((item) => item.active).length;

  return (
    <View style={styles.root}>
      <Head>
        <title>Espace professionnel — Kidima</title>
      </Head>
      <AppNavigation activeRoute="/pro" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.content, isWide && styles.contentWide, width < breakpoints.tablet && styles.contentMobile]}>
          <PageHeading eyebrow="VOTRE COMPTE UNIQUE · ESPACE PROFESSIONNEL" title={section} subtitle="Votre activité artisan reste liée à votre profil personnel." />
          {!account.artisanEnabled ? <Surface style={styles.notice}><View style={styles.noticeIcon}><AppIcon name="users" color={colors.primary} /></View><Text style={styles.cardTitle}>Activez votre activité professionnelle</Text><Text style={styles.body}>Une identité, un seul compte. Le mode artisan est uniquement simulé ici et ne publie aucune fiche.</Text><Button label="Activer sur mon compte" onPress={() => { enableArtisanMode(); setSection("Vue d’ensemble"); }} /></Surface> : <>
            <View style={styles.modeSwitch}><View style={styles.modeCopy}><Text style={styles.modeTitle}>Compte unique</Text><Text style={styles.helper}>Espace professionnel actif · pas de second profil</Text></View><Button label="Espace personnel" variant="ghost" compact onPress={() => router.push("/profil")} /></View>
            <Surface style={styles.disclaimer}><Text style={styles.disclaimerText}>Aucune donnée métier n’est connectée. Les réglages ci-dessous restent temporaires et locaux à cette session.</Text></Surface>
            <View style={[styles.workspace, isWide && styles.workspaceWide]}>
              <ScrollView accessibilityRole="tablist" horizontal={!isWide} showsHorizontalScrollIndicator={!isWide} contentContainerStyle={[styles.sectionNav, isWide && styles.sectionNavWide]} accessibilityLabel="Navigation de l’espace professionnel">
                {SECTIONS.map((item) => <Pressable key={item} accessibilityRole="tab" accessibilityLabel={item} accessibilityState={{ selected: section === item }} onPress={() => setSection(item)} style={[styles.navItem, section === item && styles.navItemSelected]}><Text style={[styles.navText, section === item && styles.navTextSelected]}>{item}</Text></Pressable>)}
              </ScrollView>
              <View style={styles.sectionPanel}>
                {section === "Vue d’ensemble" ? <Overview onSelect={setSection} onOpenRequests={() => router.push("/demandes")} available={available} onAvailabilityChange={setAvailable} services={services} configuredServices={configuredServices} /> : null}
                {section === "Profil professionnel" ? <Surface style={styles.panel}><SectionHeading title="Votre fiche d’exemple" /><Text style={styles.body}>Aperçu temporaire : ces modifications ne sont pas publiées et disparaîtront à la fermeture de la démonstration.</Text><Field label="Nom affiché (exemple)" value={displayName} onChangeText={setDisplayName} placeholder="Nom de démonstration" /><Field label="Présentation fictive" value={description} onChangeText={setDescription} multiline /><ProfileValue label="Métier principal" value={demoProfessionalProfile.trade} /><ProfileValue label="Zone d’intervention" value={demoProfessionalProfile.area} /><ProfileValue label="Vérification" value="Statut non disponible dans cette démonstration" /><Button label="Voir les profils d’exemple" variant="secondary" onPress={() => router.push("/artisans")} /></Surface> : null}
                {section === "Services" ? <View style={styles.sectionBody}><SectionHeading title="Mes services" action={<Text style={styles.helper}>Tarifs non configurés</Text>} />{services.map((item) => <Pressable key={item.id} accessibilityRole="checkbox" accessibilityLabel={`${item.title}, ${item.active ? "actif" : "inactif"} dans cet aperçu`} accessibilityState={{ checked: item.active }} onPress={() => setServices((current) => current.map((service) => service.id === item.id ? { ...service, active: !service.active } : service))} style={styles.serviceRow}><View style={styles.serviceIcon}><AppIcon name={item.active ? "check" : "close"} size={16} color={colors.primary} /></View><Text style={styles.serviceTitle}>{item.title}</Text><Badge label={item.active ? "Visible · démo" : "Masqué · démo"} tone={item.active ? "success" : "neutral"} /></Pressable>)}<Field label="Ajouter un service (exemple)" value={newService} onChangeText={setNewService} placeholder="Saisissez un libellé fictif" helper="Ajout temporaire à cette session uniquement." /><Button label="Ajouter à l’aperçu" variant="secondary" disabled={!newService.trim()} onPress={() => { const title = newService.trim(); if (!title) return; setServices((current) => [...current, { id: `service-demo-${Date.now()}`, title, active: false }]); setNewService(""); }} /></View> : null}
                {section === "Disponibilités" ? <Surface style={styles.panel}><SectionHeading title="Disponibilités" /><Text style={styles.helper}>Disponibilités de démonstration, non publiées.</Text><View style={styles.switchRow}><View style={styles.switchCopy}><Text style={styles.cardTitle}>Disponible dans cet aperçu</Text><Text style={styles.helper}>Ce réglage reste local et n’est pas visible publiquement.</Text></View><Switch value={available} onValueChange={setAvailable} accessibilityLabel="Disponibilité de démonstration" trackColor={{ true: colors.primary }} /></View><Text style={styles.sectionLabel}>Jours d’exemple</Text>{demoWeekdays.map((day) => <Pressable key={day} accessibilityRole="checkbox" accessibilityState={{ checked: activeDays.includes(day) }} onPress={() => setActiveDays((current) => current.includes(day) ? current.filter((item) => item !== day) : [...current, day])} style={styles.dayRow}><Text style={styles.body}>{day}</Text><Text style={styles.dayValue}>{activeDays.includes(day) ? "Sélectionné · démo" : "Non sélectionné"}</Text></Pressable>)}<Text style={styles.helper}>Aucune heure ou disponibilité réelle n’est déclarée.</Text></Surface> : null}
                {section === "Demandes reçues" ? <EmptyState title="Aucune demande reçue" description="Les demandes réelles ne sont pas connectées. Les exemples du compte client ne sont pas des demandes reçues." icon="list" action={<Button label="Voir l’activité d’exemple" variant="secondary" onPress={() => router.push("/demandes")} />} /> : null}
                {section === "Devis envoyés" ? <EmptyState title="Aucun devis envoyé" description="La préparation, l’envoi et le suivi des devis ne sont pas connectés à cette démonstration." icon="create" action={<Button label="Voir les devis d’exemple" variant="secondary" onPress={() => router.push("/demandes")} />} /> : null}
              </View>
            </View>
          </>}
        </View>
      </ScrollView>
    </View>
  );
}

function ProfileValue({ label, value }: { label: string; value: string }) { return <View style={styles.profileValue}><Text style={styles.helper}>{label}</Text><Text style={styles.body}>{value}</Text></View>; }

function Overview({ onSelect, onOpenRequests, available, onAvailabilityChange, services, configuredServices }: { onSelect: (section: Section) => void; onOpenRequests: () => void; available: boolean; onAvailabilityChange: (value: boolean) => void; services: typeof demoProfessionalServices; configuredServices: number }) {
  return (
    <View style={styles.sectionBody}>
      <View style={styles.proHero}>
        <View style={styles.proHeroTop}>
          <View style={styles.proHeroIcon}><AppIcon name="hammer" size={23} color={colors.primaryOnDark} /></View>
          <Badge label="APERÇU LOCAL" tone="primary" />
        </View>
        <Text style={styles.proHeroTitle}>{demoProfessionalProfile.displayName}</Text>
        <Text style={styles.proHeroSubtitle}>Compte unique · fiche non publiée</Text>
        <View style={styles.proAvailability}>
          <View style={styles.proAvailabilityCopy}>
            <Text style={styles.proAvailabilityTitle}>{available ? "Disponible dans cet aperçu" : "Disponibilité non renseignée"}</Text>
            <Text style={styles.proAvailabilityHint}>Ce réglage reste local à la démonstration.</Text>
          </View>
          <Switch value={available} onValueChange={onAvailabilityChange} accessibilityLabel="Disponibilité de démonstration" trackColor={{ true: colors.accent }} />
        </View>
      </View>
      <View style={styles.metrics}>
        <View style={styles.metric}><View style={styles.metricHeader}><Text style={styles.metricLabel}>Demandes réelles</Text><AppIcon name="list" size={18} color={colors.primary} /></View><Text style={styles.metricValue}>—</Text><Text style={styles.helper}>Aucune donnée connectée</Text></View>
        <View style={styles.metric}><View style={styles.metricHeader}><Text style={styles.metricLabel}>Devis réels</Text><AppIcon name="create" size={18} color={colors.primary} /></View><Text style={styles.metricValue}>—</Text><Text style={styles.helper}>Aucune donnée connectée</Text></View>
        <Pressable accessibilityRole="button" onPress={() => onSelect("Profil professionnel")} style={styles.metric}><View style={styles.metricHeader}><Text style={styles.metricLabel}>Fiche professionnelle</Text><AppIcon name="users" size={18} color={colors.primary} /></View><Text style={styles.metricValue}>Aperçu</Text><Text style={styles.helper}>Modifications locales uniquement</Text></Pressable>
        <Pressable accessibilityRole="button" onPress={() => onSelect("Services")} style={styles.metric}><View style={styles.metricHeader}><Text style={styles.metricLabel}>Services d’exemple</Text><AppIcon name="wrench" size={18} color={colors.primary} /></View><Text style={styles.metricValue}>{configuredServices}<Text style={styles.metricTotal}> / {services.length}</Text></Text><Text style={styles.helper}>Configuration fictive</Text></Pressable>
      </View>
      <View style={styles.toolSection}>
        <SectionHeading title="Gestion & outils" />
        <View style={styles.quickLinks}>
          <QuickLink icon="wrench" title="Gérer les services" detail="Configuration locale" onPress={() => onSelect("Services")} />
          <QuickLink icon="calendar" title="Disponibilités" detail="Réglages de démonstration" onPress={() => onSelect("Disponibilités")} />
          <QuickLink icon="users" title="Fiche professionnelle" detail="Aperçu non publié" onPress={() => onSelect("Profil professionnel")} />
          <QuickLink icon="list" title="Demandes reçues" detail="Aucune donnée connectée" onPress={onOpenRequests} />
        </View>
      </View>
      <EmptyState title="Aucune activité reçue" description="Les demandes et devis métier ne sont pas connectés. Les exemples du compte client ne sont pas des demandes reçues." icon="list" action={<Button label="Voir l’activité d’exemple" variant="secondary" onPress={onOpenRequests} />} />
    </View>
  );
}

function QuickLink({ icon, title, detail, onPress }: { icon: "wrench" | "calendar" | "users" | "list"; title: string; detail: string; onPress: () => void }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.quickLink, pressed && styles.quickLinkPressed]}><View style={styles.quickLinkIcon}><AppIcon name={icon} size={19} color={colors.primary} /></View><View style={styles.quickLinkCopy}><Text numberOfLines={1} style={styles.quickLinkTitle}>{title}</Text><Text numberOfLines={1} style={styles.quickLinkDetail}>{detail}</Text></View><AppIcon name="chevronRight" size={17} color={colors.textSecondary} /></Pressable>;
}

const styles = StyleSheet.create({
  root: screenStyles.root, scroll: screenStyles.scroll, content: screenContent({ maxWidth: layout.contentMax, bottom: spacing.x10 }), contentWide: screenContentWide(), contentMobile: { paddingBottom: spacing.x16 + layout.navHeight },
  modeSwitch: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.x3, padding: spacing.x3, borderWidth: 1, borderColor: colors.border, borderRadius: radius.large, backgroundColor: colors.surface }, modeCopy: { flex: 1, gap: spacing.x1 }, modeTitle: { ...typography.label, color: colors.primaryDark },
  notice: { gap: spacing.x3, alignItems: "flex-start", borderRadius: radius.xlarge }, noticeIcon: { width: spacing.x12, height: spacing.x12, alignItems: "center", justifyContent: "center", backgroundColor: colors.primarySoft, borderRadius: radius.large }, cardTitle: { ...typography.title, color: colors.textPrimary }, body: screenStyles.body, disclaimer: { backgroundColor: colors.infoSoft, borderColor: colors.infoSoft, borderRadius: radius.medium }, disclaimerText: { ...typography.caption, color: colors.textSecondary },
  workspace: { gap: spacing.x3 }, workspaceWide: { flexDirection: "row", alignItems: "flex-start", gap: spacing.x6 },  sectionNav: { flexDirection: "row", alignItems: "center", gap: spacing.x2, paddingRight: spacing.x4 }, sectionNavWide: { width: 220, flexDirection: "column", alignItems: "stretch", paddingRight: 0 }, sectionPanel: { flex: 1, minWidth: 0 }, navItem: { minHeight: 44, flexShrink: 0, justifyContent: "center", paddingHorizontal: spacing.x3, borderRadius: radius.medium, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }, navItemSelected: { backgroundColor: colors.primaryDark, borderColor: colors.primaryDark }, navText: { ...typography.caption, color: colors.textSecondary, fontWeight: fontWeights.bold }, navTextSelected: { color: colors.white, fontWeight: fontWeights.bold },
  sectionBody: { gap: spacing.x4 }, panel: { borderRadius: radius.large, gap: spacing.x3 }, profileValue: { gap: spacing.x1, paddingVertical: spacing.x2, borderBottomWidth: 1, borderBottomColor: colors.border }, panelHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.x3 },
  proHero: { gap: spacing.x3, padding: spacing.x5, borderRadius: radius.large, backgroundColor: colors.primaryDark, ...shadows.subtle }, proHeroTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.x3 }, proHeroIcon: { width: 44, height: 44, alignItems: "center", justifyContent: "center", borderRadius: radius.medium, backgroundColor: "rgba(255,255,255,0.12)" }, proHeroTitle: { ...typography.h2, color: colors.white }, proHeroSubtitle: { ...typography.bodySmall, color: colors.primaryOnDark }, proAvailability: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.x3, padding: spacing.x3, borderRadius: radius.medium, backgroundColor: "rgba(255,255,255,0.1)" }, proAvailabilityCopy: { flex: 1, gap: spacing.x1 }, proAvailabilityTitle: { ...typography.label, color: colors.white }, proAvailabilityHint: { ...typography.caption, color: colors.primaryOnDark },
  metrics: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x2 }, metric: { flexGrow: 1, flexBasis: "45%", minWidth: 130, gap: spacing.x1, padding: spacing.x4, borderWidth: 1, borderColor: colors.border, borderRadius: radius.large, backgroundColor: colors.surface, ...shadows.subtle }, metricHeader: { minHeight: 38, flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: spacing.x1 }, metricLabel: { ...typography.caption, color: colors.textSecondary, flex: 1 }, metricValue: { ...typography.h2, color: colors.primaryDark }, metricTotal: { ...typography.bodySmall, color: colors.textSecondary }, helper: screenStyles.helper,
  toolSection: { gap: spacing.x3 }, quickLink: { flexGrow: 1, flexBasis: "45%", minWidth: 200, minHeight: 64, flexDirection: "row", alignItems: "center", gap: spacing.x2, padding: spacing.x3, borderWidth: 1, borderColor: colors.border, borderRadius: radius.medium, backgroundColor: colors.surface }, quickLinkPressed: { opacity: 0.78 }, quickLinkIcon: { width: 38, height: 38, alignItems: "center", justifyContent: "center", borderRadius: radius.medium, backgroundColor: colors.primarySoft }, quickLinkCopy: { flex: 1, minWidth: 0, gap: 2 }, quickLinkTitle: { ...typography.caption, color: colors.textPrimary, fontWeight: fontWeights.bold }, quickLinkDetail: { ...typography.caption, color: colors.textSecondary, fontSize: 11 },
  availability: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.x3, borderRadius: radius.large }, switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.x3, paddingBottom: spacing.x2, borderBottomWidth: 1, borderBottomColor: colors.border }, switchCopy: { flex: 1, gap: spacing.x1 }, sectionLabel: { ...typography.label, color: colors.textPrimary, marginTop: spacing.x2 }, dayRow: { minHeight: spacing.x12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.x2, borderBottomWidth: 1, borderBottomColor: colors.border }, dayValue: { ...typography.caption, color: colors.textSecondary }, serviceRow: { minHeight: spacing.x12, flexDirection: "row", alignItems: "center", gap: spacing.x2, paddingVertical: spacing.x2, borderBottomWidth: 1, borderBottomColor: colors.border }, serviceIcon: { width: spacing.x8, height: spacing.x8, borderRadius: radius.medium, alignItems: "center", justifyContent: "center", backgroundColor: colors.primarySoft }, serviceTitle: { ...typography.body, color: colors.textPrimary, flex: 1 }, quickLinks: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x2 },
});
