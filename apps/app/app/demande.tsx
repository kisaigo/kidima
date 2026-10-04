import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AppNavigation } from "../components/navigation";
import { Badge, Button, ChoiceChip, Field, Surface } from "../components/ui";
import { breakpoints, colors, layout, radius, spacing, typography } from "../constants/theme";
import { artisans, categories } from "../data/artisans";

type Step = 0 | 1 | 2 | 3 | 4 | 5;
const SERVICES = ["Installation", "Entretien", "Réparation", "Dépannage", "Diagnostic"];
const DATES = ["Dès que possible", "Cette semaine", "Date flexible"];
const STEP_TITLES = ["Métier", "Besoin", "Lieu", "Quand", "Coordonnées fictives", "Récapitulatif"] as const;

export default function DemandeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const params = useLocalSearchParams<{ artisanId?: string; category?: string }>();
  const artisan = artisans.find((item) => item.id === params.artisanId);
  const initialCategory = categories.find((item) => item.id === params.category || item.id === artisan?.category)?.id ?? "all";
  const [step, setStep] = useState<Step>(params.artisanId ? 1 : 0);
  const [category, setCategory] = useState(initialCategory);
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [finished, setFinished] = useState(false);
  const selectedCategory = categories.find((item) => item.id === category)?.label ?? "Métier non choisi";
  const services = useMemo(() => artisan ? artisan.services : SERVICES, [artisan]);

  const valid = () => {
    if (step === 0) return category !== "all";
    if (step === 1) return service.length > 0;
    if (step === 2) return location.trim().length >= 2;
    if (step === 3) return date.length > 0;
    if (step === 4) return name.trim().length >= 2 && phone.replace(/\D/g, "").length >= 6;
    return true;
  };

  const continueFlow = () => {
    setShowErrors(true);
    if (!valid()) return;
    if (step === 5) {
      setFinished(true);
      return;
    }
    setShowErrors(false);
    setStep((current) => Math.min(current + 1, 5) as Step);
  };

  const goBack = () => {
    if (finished) {
      setFinished(false);
      setStep(5);
      return;
    }
    setShowErrors(false);
    setStep((current) => Math.max(current - 1, 0) as Step);
  };

  return (
    <View style={styles.root}>
      {width >= breakpoints.tablet ? <AppNavigation activeRoute="/demandes" showBottomTabs={false} /> : null}
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={[styles.content, width >= breakpoints.tablet && styles.contentWide]}>
          <View style={styles.header}><Text style={styles.eyebrow}>NOUVELLE DEMANDE · DÉMONSTRATION</Text><Text style={styles.title}>{finished ? "Aperçu terminé" : step === 5 ? "Votre récapitulatif" : "Parlons de votre besoin"}</Text><Text style={styles.subtitle}>{finished ? "Rien n’a été envoyé. Vous pouvez fermer cet aperçu." : step === 5 ? "Vérifiez les informations fictives avant de terminer." : "Quelques étapes simples pour cadrer votre demande."}</Text></View>
          <View style={styles.progressMeta}><Text style={styles.stepCount}>Étape {finished ? 6 : step + 1} sur 6</Text><Badge label={finished ? "Aperçu local" : STEP_TITLES[step]} /></View>
          <View style={styles.progressTrack} accessibilityLabel={`Étape ${finished ? 6 : step + 1} sur 6`}>{STEP_TITLES.map((title, index) => <View key={title} style={[styles.progressSegment, index <= (finished ? 5 : step) && styles.progressSegmentActive]} />)}</View>
          <Surface style={styles.disclaimer}><Text style={styles.disclaimerTitle}>Prototype local</Text><Text style={styles.disclaimerText}>N’utilisez aucune donnée personnelle réelle. Rien ne sera enregistré ou transmis.</Text></Surface>
          {finished ? <Surface style={styles.formSection}><Text style={styles.question}>Aperçu non envoyé</Text><SummaryRow label="Métier" value={selectedCategory} /><SummaryRow label="Service" value={service} /><SummaryRow label="Lieu fictif" value={location} /><SummaryRow label="Moment souhaité" value={date} /><SummaryRow label="Contact de démonstration" value={`${name} · ${phone}`} />{note.trim() ? <SummaryRow label="Précision" value={note} /> : null}<Text style={styles.helper}>La demande reste uniquement dans cet écran. Aucune notification, transmission ou sauvegarde n’a lieu.</Text></Surface> : (
            <Surface style={styles.formSection}>
              <Text style={styles.question}>{step === 0 ? "Quel métier recherchez-vous ?" : step === 1 ? "Quel service vous faut-il ?" : step === 2 ? "Dans quel quartier ?" : step === 3 ? "À quel moment ?" : step === 4 ? "Comment vous joindre dans cette démo ?" : "Vérifiez votre aperçu"}</Text>
              {artisan && step === 1 ? <View style={styles.context}><Text style={styles.contextLabel}>Profil sélectionné</Text><Text style={styles.contextValue}>{artisan.name} · {artisan.category} · exemple fictif</Text></View> : null}
              {step === 0 ? <View style={styles.options}>{categories.filter((item) => item.id !== "all").map((item) => <ChoiceChip key={item.id} label={item.label} selected={category === item.id} onPress={() => setCategory(item.id)} />)}</View> : null}
              {step === 1 ? <><Text style={styles.helper}>{artisan ? "Sélectionnez un service proposé dans la fiche d’exemple." : "Choisissez le service qui correspond le mieux à votre besoin."}</Text><View style={styles.options}>{services.map((item) => <ChoiceChip key={item} label={item} selected={service === item} onPress={() => setService(item)} />)}</View></> : null}
              {step === 2 ? <><Field label="Quartier ou ville fictive" value={location} onChangeText={setLocation} placeholder="Ex. quartier d’exemple" helper="N’indiquez pas une adresse personnelle réelle." />{location.trim().length < 2 ? <Text style={styles.helper}>Saisissez un lieu fictif pour continuer.</Text> : null}</> : null}
              {step === 3 ? <><View style={styles.options}>{DATES.map((item) => <ChoiceChip key={item} label={item} selected={date === item} onPress={() => setDate(item)} />)}</View>{!date ? <Text style={styles.helper}>Choisissez une période souhaitée.</Text> : null}</> : null}
              {step === 4 ? <><Field label="Nom fictif" value={name} onChangeText={setName} placeholder="Ex. Personne de démonstration" helper="Utilisez un nom entièrement inventé." /><Field label="Numéro fictif" value={phone} onChangeText={setPhone} placeholder="Au moins 6 chiffres fictifs" keyboardType="phone-pad" helper="N’entrez jamais votre vrai numéro." /><Field label="Précision (facultatif)" value={note} onChangeText={setNote} placeholder="Détail de scénario fictif" multiline />{(!name.trim() || phone.replace(/\D/g, "").length < 6) ? <Text style={styles.helper}>Pour continuer, saisissez un nom fictif et au moins 6 chiffres fictifs.</Text> : null}</> : null}
              {step === 5 ? <><SummaryRow label="Métier" value={selectedCategory} /><SummaryRow label="Service" value={service} /><SummaryRow label="Lieu fictif" value={location} /><SummaryRow label="Moment souhaité" value={date} /><SummaryRow label="Contact de démonstration" value={`${name} · ${phone}`} />{note.trim() ? <SummaryRow label="Précision" value={note} /> : null}<Text style={styles.helper}>Aucune action réseau ou sauvegarde. Le parcours ne préjuge pas du consentement ou du partage qui seront requis dans le produit réel.</Text></> : null}
              {showErrors && !valid() ? <Text accessibilityRole="alert" style={styles.error}>{step === 0 ? "Choisissez un métier pour poursuivre." : step === 1 ? "Choisissez un service pour poursuivre." : step === 2 ? "Saisissez un lieu fictif (2 caractères minimum)." : step === 3 ? "Choisissez une période souhaitée." : "Saisissez un nom fictif et au moins 6 chiffres fictifs."}</Text> : null}
            </Surface>
          )}
        </View>
      </ScrollView>
      <View style={[styles.stickyActions, { bottom: Math.max(insets.bottom, spacing.x2) }]}>{finished ? <Button label="Retour à mes demandes" onPress={() => router.replace("/demandes")} /> : <>{step > 0 ? <Button label="Précédent" variant="quiet" onPress={goBack} /> : <View />}{step < 5 ? <Button label="Continuer" icon="arrowRight" onPress={continueFlow} disabled={!valid()} /> : <Button label="Terminer l’aperçu" onPress={continueFlow} />}</>}</View>
    </View>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) { return <View style={styles.summaryRow}><Text style={styles.summaryLabel}>{label}</Text><Text style={styles.summaryValue}>{value}</Text></View>; }

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background }, scroll: { flexGrow: 1 }, content: { width: "100%", maxWidth: layout.readingMax, alignSelf: "center", padding: layout.pageGutter, paddingBottom: spacing.x16 + 80, gap: spacing.x4 }, contentWide: { paddingTop: spacing.x8 }, header: { gap: spacing.x2 },
  eyebrow: { ...typography.caption, color: colors.primary, fontWeight: "700", letterSpacing: 0.8 }, title: { ...typography.h1, color: colors.textPrimary }, subtitle: { ...typography.body, color: colors.textSecondary }, progressMeta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, stepCount: { ...typography.label, color: colors.textSecondary }, progressTrack: { flexDirection: "row", gap: spacing.x1 }, progressSegment: { flex: 1, height: spacing.x1, borderRadius: radius.pill, backgroundColor: colors.border }, progressSegmentActive: { backgroundColor: colors.primary },
  disclaimer: { gap: spacing.x1, backgroundColor: colors.infoSoft, borderColor: colors.infoSoft, borderRadius: radius.medium }, disclaimerTitle: { ...typography.label, color: colors.info }, disclaimerText: { ...typography.caption, color: colors.textSecondary }, formSection: { borderRadius: radius.xlarge, gap: spacing.x4 }, question: { ...typography.h3, color: colors.textPrimary }, helper: { ...typography.bodySmall, color: colors.textSecondary }, options: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x2 }, context: { padding: spacing.x3, gap: spacing.x1, borderRadius: radius.medium, backgroundColor: colors.primarySoft }, contextLabel: { ...typography.caption, color: colors.primaryDark, fontWeight: "700" }, contextValue: { ...typography.bodySmall, color: colors.textPrimary }, error: { ...typography.bodySmall, color: colors.error },
  stickyActions: { position: "absolute", left: spacing.x4, right: spacing.x4, flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.x2, minHeight: 64, paddingHorizontal: spacing.x3, borderRadius: radius.large, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface }, summaryRow: { borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: spacing.x3, gap: spacing.x1 }, summaryLabel: { ...typography.caption, color: colors.textSecondary }, summaryValue: { ...typography.body, color: colors.textPrimary, fontWeight: "600" },
});
