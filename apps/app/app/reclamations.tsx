import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useRouter } from "expo-router";
import { AppNavigation } from "../components/navigation";
import { Badge, Button, ChoiceChip, EmptyState, Surface } from "../components/ui";
import { breakpoints, colors, layout, radius, spacing, typography } from "../constants/theme";
import { demoComplaints, type DemoComplaint } from "../data/mock-workflows";

type Filter = "Tous" | DemoComplaint["status"];
const FILTERS: Filter[] = ["Tous", "Exemple reçu", "Exemple en cours", "Exemple clos"];

export default function ComplaintsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [filter, setFilter] = useState<Filter>("Tous");
  const [selected, setSelected] = useState<DemoComplaint | null>(null);
  const filtered = filter === "Tous" ? demoComplaints : demoComplaints.filter((item) => item.status === filter);

  return (
    <View style={styles.root}>
      <AppNavigation activeRoute="/demandes" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.content, width >= breakpoints.desktop && styles.contentWide]}>
          <View style={styles.header}><Text style={styles.eyebrow}>SUIVI · DÉMONSTRATION</Text><Text style={styles.title}>{selected ? "Détail de l’exemple" : "Réclamations"}</Text><Text style={styles.subtitle}>Exemples d’interface uniquement, sans dossier réel.</Text></View>
          <Surface style={styles.disclaimer}><Text style={styles.disclaimerTitle}>Aucun signalement n’a été envoyé</Text><Text style={styles.disclaimerText}>Les contenus ci-dessous sont fictifs. N’utilisez pas cette démo pour un problème réel.</Text></Surface>
          {selected ? <>
            <Pressable accessibilityRole="button" onPress={() => setSelected(null)} style={styles.back}><Text style={styles.backText}>‹  Tous les exemples</Text></Pressable>
            <Surface style={styles.detail}><Text style={styles.reference}>{selected.reference}</Text><Text style={styles.detailTitle}>{selected.title}</Text><Badge label={selected.status} /><Row label="Sujet" value={selected.subject} /><Row label="Date" value={selected.dateLabel} /><Text style={styles.sectionTitle}>Description</Text><Text style={styles.body}>{selected.description}</Text><Text style={styles.sectionTitle}>Historique illustratif</Text><View style={styles.timeline}>{selected.timeline.map((event) => <View key={event.title} style={styles.timelineRow}><View style={styles.timelineDot} /><View style={styles.timelineCopy}><Text style={styles.timelineTitle}>{event.title}</Text><Text style={styles.caption}>{event.dateLabel}</Text></View></View>)}</View><Text style={styles.sectionTitle}>Message de démonstration</Text><Text style={styles.body}>{selected.response}</Text></Surface>
          </> : <>
            <View style={styles.filters}>{FILTERS.map((item) => <ChoiceChip key={item} label={item} selected={filter === item} onPress={() => setFilter(item)} />)}</View>
            {filtered.length ? filtered.map((item) => <Pressable key={item.reference} accessibilityRole="button" accessibilityLabel={`Ouvrir ${item.reference}, exemple de réclamation`} onPress={() => setSelected(item)} style={({ pressed }) => [styles.item, pressed && styles.pressed]}><View style={styles.itemTop}><Text style={styles.reference}>{item.reference}</Text><Badge label={item.status} tone="neutral" /></View><Text style={styles.itemTitle}>{item.title}</Text><Text style={styles.itemMeta}>{item.dateLabel} · {item.subject}</Text><Text style={styles.itemAction}>Voir l’exemple  ›</Text></Pressable>) : <EmptyState title="Aucun exemple dans ce filtre" description="Choisissez un autre statut pour voir les scénarios disponibles." />}
            <Button label="Retour à mes demandes" variant="quiet" onPress={() => router.push("/demandes")} />
          </>}
        </View>
      </ScrollView>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) { return <View style={styles.row}><Text style={styles.caption}>{label}</Text><Text style={styles.rowValue}>{value}</Text></View>; }

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background }, scroll: { flexGrow: 1 },
  content: { width: "100%", maxWidth: layout.readingMax, alignSelf: "center", padding: layout.pageGutter, paddingBottom: spacing.x10, gap: spacing.x4 }, contentWide: { maxWidth: layout.contentMax, paddingHorizontal: layout.pageGutterWide },
  header: { gap: spacing.x1 }, eyebrow: { ...typography.caption, color: colors.primary, fontWeight: "700", letterSpacing: 0.8 }, title: { ...typography.h1, color: colors.textPrimary }, subtitle: { ...typography.body, color: colors.textSecondary },
  disclaimer: { gap: spacing.x1, borderRadius: radius.medium, backgroundColor: colors.infoSoft, borderColor: colors.infoSoft }, disclaimerTitle: { ...typography.label, color: colors.info }, disclaimerText: { ...typography.caption, color: colors.textSecondary },
  filters: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x2 }, item: { padding: spacing.x4, gap: spacing.x2, borderWidth: 1, borderColor: colors.border, borderRadius: radius.large, backgroundColor: colors.surface }, pressed: { opacity: 0.7 }, itemTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.x2 }, reference: { ...typography.caption, color: colors.primary, fontWeight: "700" }, itemTitle: { ...typography.title, color: colors.textPrimary }, itemMeta: { ...typography.bodySmall, color: colors.textSecondary }, itemAction: { ...typography.label, color: colors.primary, alignSelf: "flex-end" },
  back: { minHeight: 44, justifyContent: "center", alignSelf: "flex-start" }, backText: { ...typography.label, color: colors.primary }, detail: { gap: spacing.x3, borderRadius: radius.xlarge }, detailTitle: { ...typography.h2, color: colors.textPrimary }, sectionTitle: { ...typography.title, color: colors.textPrimary, marginTop: spacing.x2 }, body: { ...typography.body, color: colors.textSecondary }, row: { flexDirection: "row", justifyContent: "space-between", gap: spacing.x3, borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: spacing.x2 }, caption: { ...typography.caption, color: colors.textSecondary }, rowValue: { ...typography.bodySmall, color: colors.textPrimary, textAlign: "right", flex: 1 }, timeline: { gap: spacing.x2 }, timelineRow: { flexDirection: "row", alignItems: "flex-start", gap: spacing.x3 }, timelineDot: { width: spacing.x2, height: spacing.x2, marginTop: spacing.x1, borderRadius: radius.pill, backgroundColor: colors.primarySoft, borderWidth: 2, borderColor: colors.primary }, timelineCopy: { flex: 1, gap: spacing.x1 }, timelineTitle: { ...typography.bodySmall, color: colors.textPrimary, fontWeight: "600" },
});
