import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { AppIcon, Badge, BottomTabBar, Button, ChoiceChip } from "../components/ui";
import { colors, radius, spacing } from "../constants/theme";

type ReportStatus = "Reçu" | "En cours" | "Résolu" | "Rejeté";
type ReportFilter = "Tous" | ReportStatus;
type Report = {
  reference: string;
  title: string;
  date: string;
  subject: string;
  status: ReportStatus;
  description: string;
  response?: string;
  timeline: { title: string; date: string; complete: boolean }[];
};

const REPORTS: Report[] = [
  {
    reference: "SIG-2026-0142",
    title: "Numéro de téléphone non valide",
    date: "02 oct. 2026",
    subject: "Ali Plomberie · Plomberie",
    status: "En cours",
    description: "Le numéro affiché sur le profil ne permet pas de joindre l’artisan depuis plusieurs tentatives.",
    response: "L’équipe vérifie actuellement les coordonnées auprès de l’artisan.",
    timeline: [
      { title: "Signalement reçu", date: "02 oct. · 09:42", complete: true },
      { title: "Vérification des coordonnées", date: "02 oct. · 11:10", complete: true },
      { title: "Confirmation de l’artisan", date: "En attente", complete: false },
    ],
  },
  {
    reference: "SIG-2026-0138",
    title: "Demande de retrait du profil",
    date: "01 oct. 2026",
    subject: "Karim Electrique · Électricité",
    status: "Reçu",
    description: "Demande de retrait du profil envoyée par le professionnel concerné.",
    response: "Votre demande est enregistrée et sera examinée par l’équipe de modération.",
    timeline: [
      { title: "Demande reçue", date: "01 oct. · 16:25", complete: true },
      { title: "Examen par l’équipe", date: "À venir", complete: false },
    ],
  },
  {
    reference: "SIG-2026-0121",
    title: "Localisation incorrecte",
    date: "28 sept. 2026",
    subject: "Nina Clim · Climatisation",
    status: "Résolu",
    description: "Le quartier renseigné sur la fiche ne correspondait pas à la zone d’intervention indiquée.",
    response: "La zone d’intervention a été corrigée sur le profil.",
    timeline: [
      { title: "Signalement reçu", date: "28 sept. · 10:05", complete: true },
      { title: "Information vérifiée", date: "29 sept. · 14:30", complete: true },
      { title: "Profil mis à jour", date: "29 sept. · 15:02", complete: true },
    ],
  },
  {
    reference: "SIG-2026-0117",
    title: "Doublon de profil signalé",
    date: "25 sept. 2026",
    subject: "Thomas Réopt · Réparation téléphone",
    status: "Rejeté",
    description: "Un possible doublon a été signalé, mais les deux profils correspondent à des activités distinctes.",
    response: "Après vérification, aucun doublon n’a été confirmé.",
    timeline: [
      { title: "Signalement reçu", date: "25 sept. · 08:50", complete: true },
      { title: "Profils comparés", date: "25 sept. · 13:20", complete: true },
      { title: "Signalement clôturé", date: "25 sept. · 13:45", complete: true },
    ],
  },
];

const FILTERS: ReportFilter[] = ["Tous", "Reçu", "En cours", "Résolu", "Rejeté"];
const TAB_ITEMS = [
  { label: "Accueil", icon: "home", route: "/" },
  { label: "Artisans", icon: "users", route: "/artisans" },
  { label: "Besoin", icon: "create", route: "/demande" },
  { label: "Suivi", icon: "list", route: "/reclamations" },
  { label: "Admin", icon: "settings", route: "/dashboard" },
] as const;

function statusTone(status: ReportStatus): "neutral" | "primary" | "warning" | "success" | "error" {
  if (status === "En cours") return "warning";
  if (status === "Résolu") return "success";
  if (status === "Rejeté") return "neutral";
  return "primary";
}

export default function ReclamationsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<ReportFilter>("Tous");
  const [selected, setSelected] = useState<Report | null>(null);
  const [hasError, setHasError] = useState(false);
  const filtered = filter === "Tous" ? REPORTS : REPORTS.filter((report) => report.status === filter);
  const openCount = REPORTS.filter((report) => report.status === "Reçu" || report.status === "En cours").length;

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {selected ? (
          <>
            <Pressable accessibilityRole="button" onPress={() => setSelected(null)} style={styles.backLink}>
              <AppIcon name="arrowLeft" size={17} color={colors.primary} />
              <Text style={styles.backText}>Tous les signalements</Text>
            </Pressable>
            <View style={styles.detailHeading}>
              <View style={styles.detailHeadingCopy}>
                <Text style={styles.reference}>{selected.reference}</Text>
                <Text style={styles.title}>{selected.title}</Text>
              </View>
              <Badge label={selected.status} tone={statusTone(selected.status)} />
            </View>
            <View style={styles.detailSection}>
              <Text style={styles.sectionLabel}>Résumé</Text>
              <Text style={styles.bodyText}>{selected.title}</Text>
              <Text style={styles.mutedText}>{selected.subject}</Text>
            </View>
            <View style={styles.detailSection}>
              <Text style={styles.sectionLabel}>Description</Text>
              <Text style={styles.bodyText}>{selected.description}</Text>
              <View style={styles.createdRow}>
                <Text style={styles.mutedText}>Créé le</Text>
                <Text style={styles.bodyText}>{selected.date}</Text>
              </View>
            </View>
            <View style={styles.detailSection}>
              <Text style={styles.sectionLabel}>Traitement</Text>
              <View style={styles.timeline}>
                {selected.timeline.map((event, index) => (
                  <View key={`${event.title}-${index}`} style={styles.timelineRow}>
                    <View style={styles.timelineRail}>
                      <View style={[styles.timelineDot, event.complete && styles.timelineDotComplete]} />
                      {index < selected.timeline.length - 1 ? <View style={styles.timelineLine} /> : null}
                    </View>
                    <View style={styles.timelineCopy}>
                      <Text style={[styles.timelineTitle, !event.complete && styles.mutedText]}>{event.title}</Text>
                      <Text style={styles.mutedText}>{event.date}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            {selected.response ? (
              <View style={styles.responseSection}>
                <Text style={styles.sectionLabel}>Réponse de l’équipe</Text>
                <Text style={styles.bodyText}>{selected.response}</Text>
              </View>
            ) : null}
            {selected.status === "Reçu" || selected.status === "En cours" ? (
              <Button label="Contacter l’assistance" variant="secondary" onPress={() => Alert.alert("Assistance", "Le contact avec l’assistance sera disponible après connexion au service.")} />
            ) : null}
          </>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Mes signalements</Text>
              <Text style={styles.subtitle}>Consultez l’avancement de vos dossiers.</Text>
            </View>
            <View style={styles.summary}>
              <View>
                <Text style={styles.summaryValue}>{REPORTS.length}</Text>
                <Text style={styles.summaryLabel}>Dossiers au total</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View>
                <Text style={styles.summaryValue}>{openCount}</Text>
                <Text style={styles.summaryLabel}>En traitement</Text>
              </View>
            </View>
            <View style={styles.chipRow}>
              {FILTERS.map((item) => (
                <ChoiceChip key={item} label={item} selected={filter === item} onPress={() => setFilter(item)} />
              ))}
            </View>
            {hasError ? (
              <View style={styles.stateBlock}>
                <AppIcon name="help" size={22} color={colors.error} />
                <Text style={styles.stateTitle}>Impossible de charger les dossiers</Text>
                <Text style={styles.mutedText}>Vérifiez votre connexion puis réessayez.</Text>
                <Button label="Réessayer" variant="secondary" compact onPress={() => setHasError(false)} />
              </View>
            ) : REPORTS.length === 0 ? (
              <View style={styles.stateBlock}>
                <Text style={styles.stateTitle}>Aucun signalement</Text>
                <Text style={styles.mutedText}>Vos dossiers apparaîtront ici.</Text>
              </View>
            ) : filtered.length === 0 ? (
              <View style={styles.stateBlock}>
                <Text style={styles.stateTitle}>Aucun résultat</Text>
                <Text style={styles.mutedText}>Aucun dossier ne correspond au filtre « {filter} ».</Text>
              </View>
            ) : (
              <View style={styles.reportList}>
                {filtered.map((report) => (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Ouvrir ${report.reference}, ${report.title}, statut ${report.status}`}
                    key={report.reference}
                    onPress={() => setSelected(report)}
                    style={({ pressed }) => [styles.reportRow, pressed && styles.reportRowPressed]}
                  >
                    <View style={styles.reportCopy}>
                      <View style={styles.reportMeta}>
                        <Text style={styles.reference}>{report.reference}</Text>
                        <Text style={styles.reportDate}>{report.date}</Text>
                      </View>
                      <Text numberOfLines={2} style={styles.reportTitle}>{report.title}</Text>
                      <Text numberOfLines={1} style={styles.reportSubject}>{report.subject}</Text>
                    </View>
                    <View style={styles.reportTrailing}>
                      <Badge label={report.status} tone={statusTone(report.status)} />
                      <AppIcon name="chevronRight" size={18} color={colors.textSecondary} />
                    </View>
                  </Pressable>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
      <BottomTabBar items={TAB_ITEMS} activeIndex={3} onChange={(index) => router.push(TAB_ITEMS[index].route as never)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { width: "100%", maxWidth: 760, alignSelf: "center", paddingHorizontal: spacing.x4, paddingTop: spacing.x4, paddingBottom: spacing.x6, gap: spacing.x4 },
  header: { gap: spacing.x1 },
  title: { color: colors.textPrimary, fontSize: 24, fontWeight: "800", flexShrink: 1 },
  subtitle: { color: colors.textSecondary, fontSize: 13, lineHeight: 19 },
  summary: { flexDirection: "row", alignItems: "center", gap: spacing.x6, paddingVertical: spacing.x3, borderBottomWidth: 1, borderBottomColor: colors.border },
  summaryValue: { color: colors.textPrimary, fontSize: 21, fontWeight: "800" },
  summaryLabel: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  summaryDivider: { width: 1, height: 34, backgroundColor: colors.border },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x2 },
  reportList: { borderTopWidth: 1, borderTopColor: colors.border },
  reportRow: { flexDirection: "row", alignItems: "center", gap: spacing.x3, paddingVertical: spacing.x4, borderBottomWidth: 1, borderBottomColor: colors.border },
  reportRowPressed: { opacity: 0.62 },
  reportCopy: { flex: 1, gap: 4, minWidth: 0 },
  reportMeta: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", columnGap: spacing.x2, rowGap: 2 },
  reference: { color: colors.primary, fontSize: 11, fontWeight: "800" },
  reportDate: { color: colors.textSecondary, fontSize: 11 },
  reportTitle: { color: colors.textPrimary, fontSize: 14, fontWeight: "700", lineHeight: 19 },
  reportSubject: { color: colors.textSecondary, fontSize: 12 },
  reportTrailing: { alignItems: "flex-end", justifyContent: "space-between", alignSelf: "stretch", gap: spacing.x2 },
  stateBlock: { alignItems: "center", gap: spacing.x2, paddingVertical: spacing.x8, paddingHorizontal: spacing.x4 },
  stateTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: "700", textAlign: "center" },
  backLink: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", gap: spacing.x1, minHeight: 36 },
  backText: { color: colors.primary, fontSize: 13, fontWeight: "700" },
  detailHeading: { flexDirection: "row", alignItems: "flex-start", gap: spacing.x2 },
  detailHeadingCopy: { flex: 1, gap: spacing.x1 },
  detailSection: { paddingVertical: spacing.x3, borderBottomWidth: 1, borderBottomColor: colors.border, gap: spacing.x2 },
  sectionLabel: { color: colors.textSecondary, fontSize: 11, fontWeight: "800", textTransform: "uppercase" },
  bodyText: { color: colors.textPrimary, fontSize: 14, lineHeight: 21 },
  mutedText: { color: colors.textSecondary, fontSize: 12, lineHeight: 18 },
  createdRow: { flexDirection: "row", justifyContent: "space-between", gap: spacing.x2, marginTop: spacing.x2 },
  timeline: { gap: spacing.x1, paddingTop: spacing.x1 },
  timelineRow: { flexDirection: "row", minHeight: 48, gap: spacing.x3 },
  timelineRail: { alignItems: "center", width: 12 },
  timelineDot: { width: 9, height: 9, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  timelineDotComplete: { borderColor: colors.success, backgroundColor: colors.success },
  timelineLine: { width: 1, flex: 1, backgroundColor: colors.border, marginVertical: 3 },
  timelineCopy: { flex: 1, gap: 2, paddingBottom: spacing.x2 },
  timelineTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: "700" },
  responseSection: { gap: spacing.x2, paddingVertical: spacing.x3 },
});
