import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Badge, Button, ChoiceChip, Field, Surface } from "../components/ui";
import { colors, radius, spacing } from "../constants/theme";

type Service = "réfection" | "installation" | "maintenance" | "dépannage";

const SERVICE_OPTIONS: { id: Service; label: string; price: string }[] = [
  { id: "réfection", label: "Réfection", price: "1 500 à 8 000 Fcfa" },
  { id: "installation", label: "Installation", price: "2 000 à 12 000 Fcfa" },
  { id: "maintenance", label: "Maintenance", price: "1 000 à 6 000 Fcfa" },
  { id: "dépannage", label: "Dépannage", price: "2 000 à 15 000 Fcfa" },
];

export default function BookScreen() {
  const router = useRouter();
  const [service, setService] = useState<Service>("réfection");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedService = SERVICE_OPTIONS.find((item) => item.id === service)!;

  const submit = () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert("Vérifiez les champs", "Veuillez renseigner votre nom et votre numéro.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      Alert.alert(
        "Devis envoyé",
        [
          "Votre demande a bien été prise en charge.",
          `Service : ${selectedService.label}`,
          `Budget estimé : ${selectedService.price}`,
          "Un artisan vous rappellera rapidement.",
        ].join("\n")
      );
      setLoading(false);
      router.back();
    }, 350);
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Surface style={styles.summaryCard}>
          <Text style={styles.eyebrow}>Devis</Text>
          <View style={styles.summaryHeader}>
            <View>
              <Text style={styles.title}>Demande de devis</Text>
              <Text style={styles.subtitle}>Personnalisation rapide avec un artisan référencé.</Text>
            </View>
            <Badge label="Priorité" tone="primary" />
          </View>
        </Surface>

        <Surface style={styles.section}>
          <Text style={styles.sectionTitle}>Choisissez le type de besoin</Text>
          <View style={styles.chipRow}>
            {SERVICE_OPTIONS.map((item) => (
              <ChoiceChip key={item.id} label={item.label} selected={service === item.id} onPress={() => setService(item.id)} />
            ))}
          </View>
          <Text style={styles.helperText}>Budget estimé : {selectedService.price}</Text>
        </Surface>

        <Surface style={styles.section}>
          <Field label="Nom complet" value={name} onChangeText={setName} placeholder="Votre nom" autoCapitalize="words" />
          <Field label="Téléphone" value={phone} onChangeText={setPhone} placeholder="Numéro de contact" keyboardType="phone-pad" autoCapitalize="none" />
          <Field label="Détails" value={message} onChangeText={setMessage} placeholder="Ajoutez un détail utile (quartier, urgence ou date)" multiline helper="Le message est facultatif mais aide l’artisan à préparer le devis." />
        </Surface>

        <Button label={loading ? "Envoi..." : "Envoyer le devis"} onPress={submit} disabled={!name.trim() || !phone.trim() || loading} />
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
  summaryCard: {
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
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.x3,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: "800",
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
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
});
