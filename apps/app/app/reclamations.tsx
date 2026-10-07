import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Head from "expo-router/head";
import { useRouter } from "expo-router";
import { screenContent, screenContentWide, screenStyles } from "../components/layout";
import { AppNavigation } from "../components/navigation";
import { Badge, Button, ChoiceChip, EmptyState, PageHeading, Surface } from "../components/ui";
import { breakpoints, colors, fontWeights, layout, radius, shadows, spacing, typography } from "../constants/theme";
import { demoComplaints, type DemoComplaint } from "../data/mock-workflows";

type Filter = "Toutes" | "Ouvertes" | "En cours" | "Clôturées";
const FILTERS: Filter[] = ["Toutes", "Ouvertes", "En cours", "Clôturées"];

function matchesFilter(status: DemoComplaint["status"], filter: Filter) {
  if (filter === "Toutes") return true;
  if (filter === "Ouvertes") return status === "Exemple reçu";
  if (filter === "En cours") return status === "Exemple en cours";
  return status === "Exemple clos";
}

export default function ComplaintsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [filter, setFilter] = useState<Filter>("Toutes");
  const [selected, setSelected] = useState<DemoComplaint | null>(null);
  const filtered = demoComplaints.filter((item) => matchesFilter(item.status, filter));

  return (
    <View style={styles.root}>
      <Head>
        <title>Mes réclamations — Kidima</title>
      </Head>
      <AppNavigation activeRoute="/demandes" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.content, width >= breakpoints.desktop && styles.contentWide, width < breakpoints.tablet && styles.contentMobile]}>
          <PageHeading eyebrow="SUIVI · DÉMONSTRATION" title={selected ? "Détail de l’exemple" : "Réclamations"} subtitle="Exemples d’interface uniquement, sans dossier réel." />
          <Surface style={styles.disclaimer}><Text style={styles.disclaimerTitle}>Aucun signalement n’a été envoyé</Text><Text style={styles.disclaimerText}>Les contenus ci-dessous sont fictifs. N’utilisez pas cette démo pour un problème réel.</Text></Surface>
          {selected ? <>
            <Pressable accessibilityRole="button" onPress={() => setSelected(null)} style={styles.back}><Text style={styles.backText}>‹  Tous les exemples</Text></Pressable>
            <Surface style={styles.detail}><Text style={styles.reference}>{selected.reference}</Text><Text style={styles.detailTitle}>{selected.title}</Text><Badge label={selected.status} /><Row label="Sujet" value={selected.subject} /><Row label="Date" value={selected.dateLabel} /><Text style={styles.sectionTitle}>Description</Text><Text style={styles.body}>{selected.description}</Text><Text style={styles.sectionTitle}>Historique illustratif</Text><View style={styles.timeline}>{selected.timeline.map((event) => <View key={event.title} style={styles.timelineRow}><View style={styles.timelineDot} /><View style={styles.timelineCopy}><Text style={styles.timelineTitle}>{event.title}</Text><Text style={styles.caption}>{event.dateLabel}</Text></View></View>)}</View><Text style={styles.sectionTitle}>Message de démonstration</Text><Text style={styles.body}>{selected.response}</Text></Surface>
          </> : <>
            <View style={styles.filters} accessibilityRole="radiogroup" accessibilityLabel="Filtrer les réclamations">{FILTERS.map((item) => <ChoiceChip accessibilityRole="radio" key={item} label={item} selected={filter === item} onPress={() => setFilter(item)} />)}</View>
            {filtered.length ? filtered.map((item) => <Pressable key={item.reference} accessibilityRole="button" accessibilityLabel={`Ouvrir ${item.reference}, exemple de réclamation`} onPress={() => setSelected(item)} style={({ pressed }) => [styles.item, pressed && styles.pressed]}><View style={styles.itemTop}><Text style={styles.reference}>{item.reference}</Text><Badge label={item.status} tone="neutral" /></View><Text style={styles.itemTitle}>{item.title}</Text><Text style={styles.itemMeta}>{item.dateLabel} · {item.subject}</Text><Text style={styles.itemAction}>Voir l’exemple  ›</Text></Pressable>) : <EmptyState title="Aucun exemple dans ce filtre" description="Choisissez un autre statut pour voir les scénarios disponibles." icon="help" action={<Button label="Voir toutes les réclamations" variant="secondary" onPress={() => setFilter("Toutes")} />} />}
            <Button label="Retour à mes demandes" variant="ghost" onPress={() => router.push("/demandes")} />
          </>}
        </View>
      </ScrollView>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) { return <View style={styles.row}><Text style={styles.caption}>{label}</Text><Text style={styles.rowValue}>{value}</Text></View>; }

const styles = StyleSheet.create({
  root: screenStyles.root, scroll: screenStyles.scroll,
  content: screenContent({ bottom: spacing.x10 }), contentWide: screenContentWide({ maxWidth: layout.contentMax, top: layout.pageGutter }), contentMobile: { paddingBottom: spacing.x16 + layout.navHeight },
  disclaimer: { gap: spacing.x1, borderRadius: radius.medium, backgroundColor: colors.infoSoft, borderColor: colors.infoSoft }, disclaimerTitle: { ...typography.label, color: colors.info }, disclaimerText: { ...typography.caption, color: colors.textSecondary },
  filters: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x2 }, item: { padding: spacing.x5, gap: spacing.x2, borderWidth: 1, borderColor: colors.border, borderRadius: radius.xlarge, backgroundColor: colors.surface, ...shadows.subtle }, pressed: { opacity: 0.7 }, itemTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.x2 }, reference: { ...typography.caption, color: colors.primary, fontWeight: fontWeights.bold }, itemTitle: { ...typography.title, color: colors.textPrimary }, itemMeta: { ...typography.bodySmall, color: colors.textSecondary }, itemAction: { ...typography.label, color: colors.primary, alignSelf: "flex-end" },
  back: screenStyles.back, backText: screenStyles.backText,  detail: { gap: spacing.x4, borderRadius: radius.xlarge }, detailTitle: { ...typography.h2, color: colors.textPrimary }, sectionTitle: { ...typography.title, color: colors.textPrimary, marginTop: spacing.x2 }, body: screenStyles.body, row: { flexDirection: "row", justifyContent: "space-between", gap: spacing.x3, borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: spacing.x2 }, caption: screenStyles.caption, rowValue: { ...typography.bodySmall, color: colors.textPrimary, textAlign: "right", flex: 1 }, timeline: { gap: spacing.x2 }, timelineRow: { flexDirection: "row", alignItems: "flex-start", gap: spacing.x3 }, timelineDot: { width: spacing.x2, height: spacing.x2, marginTop: spacing.x1, borderRadius: radius.pill, backgroundColor: colors.primarySoft, borderWidth: 2, borderColor: colors.primary }, timelineCopy: { flex: 1, gap: spacing.x1 }, timelineTitle: { ...typography.bodySmall, color: colors.textPrimary, fontWeight: fontWeights.bold },
});
