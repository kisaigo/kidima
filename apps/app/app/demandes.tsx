import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useRouter } from "expo-router";
import { AppNavigation } from "../components/navigation";
import { Badge, Button, EmptyState, SectionHeading, Surface } from "../components/ui";
import { breakpoints, colors, layout, radius, spacing, typography } from "../constants/theme";
import { demoQuotes, demoRequests, type DemoQuote, type DemoRequest } from "../data/mock-workflows";

type Filter = "Demandes" | "Devis";

export default function ActivityScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [filter, setFilter] = useState<Filter>("Demandes");
  const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<DemoQuote | null>(null);
  const isWide = width >= breakpoints.desktop;
  const selected = selectedRequest ?? selectedQuote;
  const count = useMemo(() => filter === "Demandes" ? demoRequests.length : demoQuotes.length, [filter]);

  const changeFilter = (next: Filter) => { setFilter(next); setSelectedRequest(null); setSelectedQuote(null); };

  return (
    <View style={styles.root}>
      <AppNavigation activeRoute="/demandes" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.content, isWide && styles.contentWide]}>
          <View style={styles.header}><Text style={styles.eyebrow}>ESPACE PERSONNEL</Text><Text style={styles.title}>{selected ? "Détail d’exemple" : "Mon activité"}</Text><Text style={styles.subtitle}>Demandes et devis associés à votre compte unique.</Text></View>
          <Surface style={styles.disclaimer}><Text style={styles.disclaimerText}>Données de démonstration uniquement. Rien n’a été envoyé, accepté ou enregistré.</Text></Surface>
          {selected ? (
            <>
              <Pressable accessibilityRole="button" onPress={() => { setSelectedRequest(null); setSelectedQuote(null); }} style={styles.back}><Text style={styles.backText}>‹  Retour à mon activité</Text></Pressable>
              {selectedRequest ? <RequestDetail request={selectedRequest} quote={demoQuotes.find((quote) => quote.requestReference === selectedRequest.reference)} onOpenQuote={setSelectedQuote} /> : null}
              {selectedQuote ? <QuoteDetail quote={selectedQuote} /> : null}
            </>
          ) : (
            <>
              <View style={styles.filters}><FilterButton label="Demandes" selected={filter === "Demandes"} onPress={() => changeFilter("Demandes")} /><FilterButton label="Devis" selected={filter === "Devis"} onPress={() => changeFilter("Devis")} /></View>
              <SectionHeading title={filter} action={<Text style={styles.count}>{count} exemple{count > 1 ? "s" : ""}</Text>} />
              {filter === "Demandes" ? demoRequests.map((request) => <RequestCard key={request.reference} request={request} onPress={() => setSelectedRequest(request)} />) : demoQuotes.length ? demoQuotes.map((quote) => <QuoteCard key={quote.reference} quote={quote} onPress={() => setSelectedQuote(quote)} />) : <EmptyState title="Aucun devis" description="Les devis liés à vos demandes apparaîtront ici." icon="create" />}
              <Button label="Préparer une demande" onPress={() => router.push("/demande")} />
              <Button label="Voir les réclamations d’exemple" variant="quiet" onPress={() => router.push("/reclamations")} />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function FilterButton({ label, selected, onPress }: { label: Filter; selected: boolean; onPress: () => void }) {
  return <Pressable accessibilityRole="tab" accessibilityState={{ selected }} onPress={onPress} style={[styles.filter, selected && styles.filterSelected]}><Text style={[styles.filterText, selected && styles.filterTextSelected]}>{label}</Text></Pressable>;
}

function RequestCard({ request, onPress }: { request: DemoRequest; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={`Ouvrir l’exemple ${request.reference}, ${request.service}`} onPress={onPress} style={({ pressed }) => [styles.item, pressed && styles.pressed]}><View style={styles.itemTop}><Text style={styles.reference}>{request.reference}</Text><Badge label={request.status} tone="primary" /></View><Text style={styles.itemTitle}>{request.service}</Text><Text style={styles.itemMeta}>{request.category} · {request.dateLabel}</Text><Text style={styles.itemMeta}>{request.locationLabel}</Text><Text style={styles.itemAction}>Voir le détail  ›</Text></Pressable>;
}

function QuoteCard({ quote, onPress }: { quote: DemoQuote; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={`Ouvrir l’exemple de devis ${quote.reference}`} onPress={onPress} style={({ pressed }) => [styles.item, pressed && styles.pressed]}><View style={styles.itemTop}><Text style={styles.reference}>{quote.reference}</Text><Badge label="Démo" /></View><Text style={styles.itemTitle}>{quote.service}</Text><Text style={styles.itemMeta}>{quote.artisanLabel} · {quote.dateLabel}</Text><Text style={styles.itemMeta}>{quote.amountLabel}</Text><Text style={styles.itemAction}>Voir le détail  ›</Text></Pressable>;
}

function RequestDetail({ request, quote, onOpenQuote }: { request: DemoRequest; quote?: DemoQuote; onOpenQuote: (quote: DemoQuote) => void }) {
  return <Surface style={styles.detail}><Text style={styles.reference}>{request.reference}</Text><Text style={styles.detailTitle}>{request.service}</Text><Badge label={request.status} tone="primary" /><Row label="Métier" value={request.category} /><Row label="Lieu" value={request.locationLabel} /><Row label="Date souhaitée" value={request.dateLabel} /><Row label="Artisan" value={request.artisanLabel} /><Text style={styles.body}>{request.summary}</Text><Text style={styles.sectionTitle}>Historique illustratif</Text><Timeline events={["Demande créée · étape de démonstration", "Aucun envoi réel", "Aucun artisan notifié"]} />{quote ? <><Text style={styles.sectionTitle}>Devis associé</Text><QuoteCard quote={quote} onPress={() => onOpenQuote(quote)} /></> : <Text style={styles.body}>Aucun devis associé à cet exemple.</Text>}</Surface>;
}

function QuoteDetail({ quote }: { quote: DemoQuote }) {
  return <Surface style={styles.detail}><Text style={styles.reference}>{quote.reference}</Text><Text style={styles.detailTitle}>{quote.service}</Text><Badge label="Démo" /><Row label="Profil" value={quote.artisanLabel} /><Row label="Demande associée" value={quote.requestReference} /><Row label="Date" value={quote.dateLabel} /><Row label="Validité" value={quote.validityLabel} />{quote.lineItems.map((line) => <Row key={line.label} label={line.label} value={line.amountLabel} />)}<Row label="Total" value={quote.amountLabel} /><Text style={styles.body}>Ce devis n’est pas une offre commerciale. Aucun prix n’est fourni ni aucune décision enregistrée.</Text></Surface>;
}

function Row({ label, value }: { label: string; value: string }) { return <View style={styles.row}><Text style={styles.rowLabel}>{label}</Text><Text style={styles.rowValue}>{value}</Text></View>; }
function Timeline({ events }: { events: string[] }) { return <View style={styles.timeline}>{events.map((event) => <View key={event} style={styles.timelineRow}><View style={styles.timelineDot} /><Text style={styles.body}>{event}</Text></View>)}</View>; }

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background }, scroll: { flexGrow: 1 },
  content: { width: "100%", maxWidth: layout.readingMax, alignSelf: "center", padding: layout.pageGutter, paddingBottom: spacing.x10, gap: spacing.x4 }, contentWide: { maxWidth: layout.contentMax, paddingHorizontal: layout.pageGutterWide, paddingTop: spacing.x8 },
  header: { gap: spacing.x1 }, eyebrow: { ...typography.caption, color: colors.primary, fontWeight: "700", letterSpacing: 0.8 }, title: { ...typography.h1, color: colors.textPrimary }, subtitle: { ...typography.body, color: colors.textSecondary },
  disclaimer: { borderRadius: radius.medium, backgroundColor: colors.infoSoft, borderColor: colors.infoSoft }, disclaimerText: { ...typography.caption, color: colors.textSecondary },
  filters: { flexDirection: "row", alignSelf: "flex-start", padding: spacing.x1, borderRadius: radius.medium, backgroundColor: colors.muted }, filter: { minHeight: 40, paddingHorizontal: spacing.x4, justifyContent: "center", borderRadius: radius.small }, filterSelected: { backgroundColor: colors.surface }, filterText: { ...typography.label, color: colors.textSecondary }, filterTextSelected: { color: colors.textPrimary }, count: { ...typography.caption, color: colors.textSecondary },
  item: { padding: spacing.x4, borderWidth: 1, borderColor: colors.border, borderRadius: radius.large, backgroundColor: colors.surface, gap: spacing.x2 }, pressed: { opacity: 0.72 }, itemTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.x2 }, reference: { ...typography.caption, color: colors.primary, fontWeight: "700" }, itemTitle: { ...typography.title, color: colors.textPrimary }, itemMeta: { ...typography.bodySmall, color: colors.textSecondary }, itemAction: { ...typography.label, color: colors.primary, alignSelf: "flex-end" },
  back: { minHeight: 44, justifyContent: "center", alignSelf: "flex-start" }, backText: { ...typography.label, color: colors.primary }, detail: { gap: spacing.x3, borderRadius: radius.xlarge }, detailTitle: { ...typography.h2, color: colors.textPrimary }, sectionTitle: { ...typography.title, color: colors.textPrimary, marginTop: spacing.x2 }, body: { ...typography.bodySmall, color: colors.textSecondary }, row: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: spacing.x3, borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: spacing.x2 }, rowLabel: { ...typography.caption, color: colors.textSecondary, flex: 1 }, rowValue: { ...typography.bodySmall, color: colors.textPrimary, flex: 1, textAlign: "right" },
  timeline: { gap: spacing.x2 }, timelineRow: { flexDirection: "row", alignItems: "center", gap: spacing.x2 }, timelineDot: { width: 8, height: 8, borderRadius: radius.pill, backgroundColor: colors.primary },
});
