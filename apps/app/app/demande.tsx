import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Head from "expo-router/head";
import { useLocalSearchParams, useRouter } from "expo-router";
import { screenContent, screenContentWide, screenStyles } from "../components/layout";
import { AppNavigation } from "../components/navigation";
import { Badge, Button, ChoiceChip, Field, PageHeading, Surface } from "../components/ui";
import { breakpoints, colors, fontWeights, radius, spacing, typography } from "../constants/theme";
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
  const requestedCategory = params.category?.toLocaleLowerCase("fr");
  const initialCategory = categories.find((item) =>
    item.id.toLocaleLowerCase("fr") === requestedCategory ||
    item.label.toLocaleLowerCase("fr") === requestedCategory ||
    item.id === artisan?.category ||
    item.label === artisan?.category
  )?.id ?? "all";
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

  const editStep = (target: Step) => {
    setFinished(false);
    setShowErrors(false);
    setStep(target);
  };

  const selectedServiceChoices = services.length ? services : SERVICES;

  return (
    <View style={styles.root}>
      <Head>
        <title>Nouvelle demande — Kidima</title>
      </Head>
      {width >= breakpoints.tablet ? <AppNavigation activeRoute="/demandes" showBottomTabs={false} /> : null}
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={[styles.content, width >= breakpoints.tablet && styles.contentWide]}>
          <PageHeading eyebrow="NOUVELLE DEMANDE · DÉMONSTRATION" title={finished ? "Aperçu terminé" : step === 5 ? "Votre récapitulatif" : "Parlons de votre besoin"} subtitle={finished ? "Rien n’a été envoyé. Vous pouvez fermer cet aperçu." : step === 5 ? "Vérifiez les informations fictives avant de terminer." : "Quelques étapes simples pour cadrer votre demande."} />
          <View style={styles.progressMeta}><Text style={styles.stepCount}>Étape {finished ? 6 : step + 1} sur 6</Text><Badge label={finished ? "Aperçu local" : STEP_TITLES[step]} /></View>
          {width >= breakpoints.desktop && !finished ? <View style={styles.desktopStepper} accessibilityLabel={`Progression étape ${step + 1} sur 6`}>{STEP_TITLES.map((title, index) => <View key={title} style={styles.stepperItem}><View style={[styles.stepperDot, index <= step && styles.stepperDotActive]}><Text style={[styles.stepperNumber, index <= step && styles.stepperNumberActive]}>{index + 1}</Text></View><Text style={[styles.stepperLabel, index === step && styles.stepperLabelActive]}>{title}</Text>{index < STEP_TITLES.length - 1 ? <View style={[styles.stepperLine, index < step && styles.stepperLineActive]} /> : null}</View>)}</View> : <View style={styles.progressTrack} accessibilityLabel={`Étape ${finished ? 6 : step + 1} sur 6`}>{STEP_TITLES.map((title, index) => <View key={title} style={[styles.progressSegment, index <= (finished ? 5 : step) && styles.progressSegmentActive]} />)}</View>}
          <Surface style={styles.disclaimer}><Text style={styles.disclaimerTitle}>Démonstration locale</Text><Text style={styles.disclaimerText}>Les informations saisies sont fictives et servent uniquement à cet aperçu. Rien n’est enregistré ou transmis.</Text></Surface>
          {finished ? <Surface style={styles.formSection}><View style={styles.previewHeader}><View style={styles.previewMark}><Text style={styles.previewCheck}>✓</Text></View><View style={styles.previewCopy}><Text style={styles.question}>Votre aperçu est prêt</Text><Text style={styles.helper}>Aucune demande n’est envoyée : ceci reste local à la démonstration.</Text></View></View><SummaryRow label="Métier" value={selectedCategory} onEdit={() => editStep(0)} /><SummaryRow label="Service" value={service} onEdit={() => editStep(1)} /><SummaryRow label="Lieu fictif" value={location} onEdit={() => editStep(2)} /><SummaryRow label="Moment souhaité" value={date} onEdit={() => editStep(3)} /><SummaryRow label="Contact de démonstration" value={`${name} · ${phone}`} onEdit={() => editStep(4)} />{note.trim() ? <SummaryRow label="Précision" value={note} onEdit={() => editStep(4)} /> : null}<Text style={styles.helper}>Aucune notification, transmission ou sauvegarde n’a lieu.</Text></Surface> : (
            <Surface style={styles.formSection}>
              <Text style={styles.question}>{step === 0 ? "Quel métier recherchez-vous ?" : step === 1 ? "Quel service vous faut-il ?" : step === 2 ? "Dans quel quartier ?" : step === 3 ? "À quel moment ?" : step === 4 ? "Comment vous joindre dans cette démo ?" : "Vérifiez votre aperçu"}</Text>
              {artisan && step === 1 ? <View style={styles.context}><Text style={styles.contextLabel}>Profil sélectionné</Text><Text style={styles.contextValue}>{artisan.name} · {artisan.category} · exemple fictif</Text></View> : null}
              {step === 0 ? <View style={styles.options}>{categories.filter((item) => item.id !== "all").map((item) => <ChoiceChip key={item.id} label={item.label} selected={category === item.id} onPress={() => setCategory(item.id)} />)}</View> : null}
              {step === 1 ? <><Text style={styles.helper}>{artisan ? "Sélectionnez un service proposé dans la fiche d’exemple." : "Choisissez le service qui correspond le mieux à votre besoin."}</Text><View style={styles.options}>{selectedServiceChoices.map((item) => <ChoiceChip key={item} label={item} selected={service === item} onPress={() => setService(item)} />)}</View></> : null}
              {step === 2 ? <><Field label="Quartier ou ville fictive" value={location} onChangeText={setLocation} placeholder="Ex. quartier d’exemple" helper="N’indiquez pas une adresse personnelle réelle." />{location.trim().length < 2 ? <Text style={styles.helper}>Saisissez un lieu fictif pour continuer.</Text> : null}</> : null}
              {step === 3 ? <><View style={styles.options}>{DATES.map((item) => <ChoiceChip key={item} label={item} selected={date === item} onPress={() => setDate(item)} />)}</View>{!date ? <Text style={styles.helper}>Choisissez une période souhaitée.</Text> : null}</> : null}
              {step === 4 ? <><Field label="Nom fictif" value={name} onChangeText={setName} placeholder="Ex. Personne de démonstration" helper="Utilisez un nom entièrement inventé." /><Field label="Numéro fictif" value={phone} onChangeText={setPhone} placeholder="Au moins 6 chiffres fictifs" keyboardType="phone-pad" helper="N’entrez jamais votre vrai numéro." /><Field label="Précision (facultatif)" value={note} onChangeText={setNote} placeholder="Détail de scénario fictif" multiline />{(!name.trim() || phone.replace(/\D/g, "").length < 6) ? <Text style={styles.helper}>Pour continuer, saisissez un nom fictif et au moins 6 chiffres fictifs.</Text> : null}</> : null}
              {step === 5 ? <><SummaryRow label="Métier" value={selectedCategory} /><SummaryRow label="Service" value={service} /><SummaryRow label="Lieu fictif" value={location} /><SummaryRow label="Moment souhaité" value={date} /><SummaryRow label="Contact de démonstration" value={`${name} · ${phone}`} />{note.trim() ? <SummaryRow label="Précision" value={note} /> : null}<Text style={styles.helper}>Aucune demande n’est envoyée : ceci est un aperçu local de démonstration.</Text></> : null}
              {showErrors && !valid() ? <Text accessibilityRole="alert" style={styles.error}>{step === 0 ? "Choisissez un métier pour poursuivre." : step === 1 ? "Choisissez un service pour poursuivre." : step === 2 ? "Saisissez un lieu fictif (2 caractères minimum)." : step === 3 ? "Choisissez une période souhaitée." : "Saisissez un nom fictif et au moins 6 chiffres fictifs."}</Text> : null}
            </Surface>
          )}
        </View>
      </ScrollView>
      <View style={[styles.stickyActions, { bottom: Math.max(insets.bottom, spacing.x2) }]}>{finished ? <Button label="Fermer l’aperçu" onPress={() => router.replace("/demandes")} /> : <>{step > 0 ? <Button label="Retour" variant="ghost" onPress={goBack} /> : <View />}{step < 5 ? <Button label="Continuer" icon="arrowRight" onPress={continueFlow} /> : <Button label="Prévisualiser la demande" onPress={continueFlow} />}</>}</View>
    </View>
  );
}

function SummaryRow({ label, value, onEdit }: { label: string; value: string; onEdit?: () => void }) { return <View style={styles.summaryRow}><View style={styles.summaryCopy}><Text style={styles.summaryLabel}>{label}</Text><Text style={styles.summaryValue}>{value}</Text></View>{onEdit ? <Pressable accessibilityRole="button" onPress={onEdit} style={styles.editButton}><Text style={styles.editText}>Modifier</Text></Pressable> : null}</View>; }

const styles = StyleSheet.create({
  root: screenStyles.root, scroll: screenStyles.scroll, content: screenContent({ maxWidth: 840, bottom: spacing.x16 + 80, gap: spacing.x5 }), contentWide: screenContentWide({ maxWidth: 1000 }), progressMeta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, stepCount: { ...typography.label, color: colors.textSecondary }, progressTrack: { flexDirection: "row", gap: spacing.x1 }, progressSegment: { flex: 1, height: spacing.x1, borderRadius: radius.pill, backgroundColor: colors.border }, progressSegmentActive: { backgroundColor: colors.primary },
  desktopStepper: { flexDirection: "row", alignItems: "flex-start" }, stepperItem: { flex: 1, minWidth: 0, alignItems: "center", position: "relative", gap: spacing.x2 }, stepperDot: { width: 34, height: 34, zIndex: 1, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, backgroundColor: colors.surface }, stepperDotActive: { borderColor: colors.primary, backgroundColor: colors.primary }, stepperNumber: { ...typography.caption, color: colors.textSecondary, fontWeight: fontWeights.bold }, stepperNumberActive: { color: colors.white }, stepperLabel: { ...typography.caption, color: colors.textSecondary, textAlign: "center" }, stepperLabelActive: { color: colors.primaryDark, fontWeight: fontWeights.bold }, stepperLine: { position: "absolute", top: 16, left: "50%", right: "-50%", height: 1, backgroundColor: colors.border }, stepperLineActive: { backgroundColor: colors.primary },
  disclaimer: { gap: spacing.x1, backgroundColor: colors.infoSoft, borderColor: colors.infoSoft, borderRadius: radius.medium }, disclaimerTitle: { ...typography.label, color: colors.info }, disclaimerText: { ...typography.caption, color: colors.textSecondary }, formSection: { borderRadius: radius.xlarge, gap: spacing.x4 }, question: { ...typography.h3, color: colors.textPrimary }, helper: screenStyles.helper, options: { flexDirection: "row", flexWrap: "wrap", gap: spacing.x2 }, context: { padding: spacing.x3, gap: spacing.x1, borderRadius: radius.medium, backgroundColor: colors.primarySoft }, contextLabel: { ...typography.caption, color: colors.primaryDark, fontWeight: fontWeights.bold }, contextValue: { ...typography.bodySmall, color: colors.textPrimary }, error: { ...typography.bodySmall, color: colors.error },
  stickyActions: { position: "absolute", left: spacing.x4, right: spacing.x4, flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.x2, minHeight: 64, paddingHorizontal: spacing.x3, borderRadius: radius.large, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface }, summaryRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: spacing.x3, gap: spacing.x3 }, summaryCopy: { flex: 1, gap: spacing.x1 }, summaryLabel: { ...typography.caption, color: colors.textSecondary }, summaryValue: { ...typography.body, color: colors.textPrimary, fontWeight: fontWeights.bold }, editButton: { minHeight: 44, justifyContent: "center", paddingHorizontal: spacing.x2 }, editText: { ...typography.label, color: colors.primary }, previewHeader: { flexDirection: "row", alignItems: "center", gap: spacing.x3, marginBottom: spacing.x2 }, previewMark: { width: 44, height: 44, alignItems: "center", justifyContent: "center", borderRadius: radius.pill, backgroundColor: colors.primarySoft }, previewCheck: { ...typography.h3, color: colors.primary }, previewCopy: { flex: 1, gap: spacing.x1 },
});
