import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Badge, Button, ChoiceChip, Field, Surface } from "../components/ui";
import { colors, radius, spacing } from "../constants/theme";

type Category = "plomberie" | "électricité" | "climatisation" | "réparation téléphone" | "entretien ménager";
type Service = "réfection" | "installation" | "maintenance" | "dépannage";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "plomberie", label: "Plomberie" },
  { id: "électricité", label: "Électricité" },
  { id: "climatisation", label: "Climatisation" },
  { id: "réparation téléphone", label: "Réparation téléphone" },
  { id: "entretien ménager", label: "Entretien ménager" },
];

const SERVICES: Service[] = ["réfection", "installation", "maintenance", "dépannage"];
const SERVICE_RANGES: Record<Service, string> = {
  réfection: "1 500 à 8 000 Fcfa",
  installation: "2 000 à 12 000 Fcfa",
  maintenance: "1 000 à 6 000 Fcfa",
  dépannage: "2 000 à 15 000 Fcfa",
};

export default function DemandeScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<Category>("plomberie");
  const [service, setService] = useState<Service>("réfection");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("Dès que possible");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const steps = [
    { title: "Professionnel", subtitle: "Quel type d’artisan cherchez-vous ?" },
    { title: "Besoin", subtitle: "Quel service est nécessaire ?" },
    { title: "Lieu", subtitle: "Où l’intervention est-elle nécessaire ?" },
    { title: "Disponibilité", subtitle: "Quand souhaitez-vous être contacté ?" },
    { title: "Coordonnées", subtitle: "Restez simple et direct." },
  ];

  const isCurrentStepValid = () => {
    if (step === 0 || step === 1) return true;
    if (step === 2) return location.trim().length > 0;
    if (step === 3) return date.trim().length > 0;
    if (step === 4) return name.trim().length > 0 && phone.trim().length > 0;
    return true;
  };

  const handleContinue = () => {
    if (step === steps.length - 1) {
      if (!name.trim() || !phone.trim()) {
        Alert.alert("Vérifiez les champs", "Veuillez renseigner votre nom et votre numéro.");
        return;
      }

      setLoading(true);
      setTimeout(() => {
        Alert.alert(
          "Demande enregistrée",
          [
            `Professionnel : ${CATEGORIES.find((item) => item.id === category)?.label}`,
            `Service : ${service}`,
            `Lieu : ${location || "À préciser"}`,
            `Disponibilité : ${date}`,
            "Un artisan vous contactera sous 24h.",
          ].join("\n")
        );
        setLoading(false);
        router.back();
      }, 350);
      return;
    }

    setStep((value) => Math.min(value + 1, steps.length - 1));
  };

  const current = steps[step];

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Surface style={styles.progressCard}>
          <Text style={styles.eyebrow}>Demande</Text>
          <View style={styles.progressHeader}>
            <Text style={styles.title}>Étape {step + 1} / {steps.length}</Text>
            <Badge label={current.title} tone="primary" />
          </View>
          <Text style={styles.subtitle}>{current.subtitle}</Text>
          <View style={styles.progressTrack}>
            {steps.map((item, index) => (
              <View key={item.title} style={[styles.progressDot, index <= step && styles.progressDotActive]} />
            ))}
          </View>
        </Surface>

        {step === 0 && (
          <Surface style={styles.section}>
            <Text style={styles.sectionTitle}>Quel professionnel recherchez-vous ?</Text>
            <View style={styles.chipRow}>
              {CATEGORIES.map((item) => (
                <ChoiceChip key={item.id} label={item.label} selected={category === item.id} onPress={() => setCategory(item.id)} />
              ))}
            </View>
          </Surface>
        )}

        {step === 1 && (
          <Surface style={styles.section}>
            <Text style={styles.sectionTitle}>Quel est votre besoin principal ?</Text>
            <View style={styles.chipRow}>
              {SERVICES.map((item) => (
                <ChoiceChip key={item} label={item} selected={service === item} onPress={() => setService(item)} />
              ))}
            </View>
            <Text style={styles.helperText}>Fourchette indicative : {SERVICE_RANGES[service]}</Text>
          </Surface>
        )}

        {step === 2 && (
          <Surface style={styles.section}>
            <Text style={styles.sectionTitle}>Où se déroule l’intervention ?</Text>
            <Field label="Quartier ou ville" value={location} onChangeText={setLocation} placeholder="Ex. Moursal, N Djaména" />
          </Surface>
        )}

        {step === 3 && (
          <Surface style={styles.section}>
            <Text style={styles.sectionTitle}>Quand souhaitez-vous être contacté ?</Text>
            <Field label="Disponibilité" value={date} onChangeText={setDate} placeholder="Ex. Aujourd’hui, ce soir, demain" />
          </Surface>
        )}

        {step === 4 && (
          <Surface style={styles.section}>
            <Text style={styles.sectionTitle}>Vos coordonnées</Text>
            <Field label="Nom" value={name} onChangeText={setName} placeholder="Votre nom complet" autoCapitalize="words" />
            <Field label="Téléphone" value={phone} onChangeText={setPhone} placeholder="Numéro de contact" keyboardType="phone-pad" autoCapitalize="none" />
            <Field label="Détails complémentaires" value={note} onChangeText={setNote} placeholder="Ajoutez une précision utile" multiline helper={`Service : ${service} • Budget : ${SERVICE_RANGES[service]}`} />
          </Surface>
        )}

        <View style={styles.actionsRow}>
          {step > 0 ? (
            <Button label="Précédent" variant="secondary" onPress={() => setStep((value) => Math.max(value - 1, 0))} />
          ) : null}
          <Button
            label={loading ? "Envoi..." : step === steps.length - 1 ? "Envoyer la demande" : "Continuer"}
            onPress={handleContinue}
            disabled={!isCurrentStepValid() || loading}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.x4,
    paddingTop: spacing.x6,
    paddingBottom: spacing.x8,
    gap: spacing.x4,
  },
  progressCard: {
    borderRadius: radius.large,
    padding: spacing.x4,
    gap: spacing.x3,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.x2,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: "800",
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  progressTrack: {
    flexDirection: "row",
    gap: 6,
  },
  progressDot: {
    flex: 1,
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
  },
  progressDotActive: {
    backgroundColor: colors.primary,
  },
  section: {
    borderRadius: radius.large,
    padding: spacing.x4,
    gap: spacing.x4,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.x2,
  },
  helperText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  actionsRow: {
    flexDirection: "row",
    gap: spacing.x2,
  },
});
