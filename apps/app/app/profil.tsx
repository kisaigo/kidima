import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { AppNavigation } from "../components/navigation";
import { AppIcon, Button, SectionHeading, Surface } from "../components/ui";
import { breakpoints, colors, layout, radius, spacing, typography } from "../constants/theme";
import { useDemoAccount } from "../contexts/account";

export default function ProfileScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { account, enableArtisanMode } = useDemoAccount();

  return (
    <View style={styles.root}>
      <AppNavigation activeRoute="/profil" />
      <ScrollView contentContainerStyle={[styles.content, width >= breakpoints.desktop && styles.contentWide]}>
        <View style={styles.header}><Text style={styles.eyebrow}>VOTRE ESPACE PERSONNEL</Text><Text style={styles.title}>Mon profil</Text><Text style={styles.subtitle}>Une même identité pour vos activités client et artisan.</Text></View>
        <Surface style={styles.accountCard}><View style={styles.avatar}><AppIcon name="user" size={22} color={colors.primary} /></View><View style={styles.accountCopy}><Text style={styles.sectionTitle}>{account.name}</Text><Text style={styles.body}>Compte de démonstration · aucune donnée personnelle requise</Text></View><View style={styles.identity}><AppIcon name="check" size={16} color={colors.primary} /></View></Surface>
        <View style={styles.twoColumns}>
          <View style={styles.column}>
            <SectionHeading title="Mon activité" />
            <Surface style={styles.section}><View style={styles.sectionHeader}><View style={styles.sectionIcon}><AppIcon name="users" color={colors.primary} /></View><View style={styles.sectionCopy}><Text style={styles.sectionTitle}>Activité professionnelle</Text><Text style={styles.body}>{account.artisanEnabled ? "Activée sur ce compte" : "Optionnelle · liée à votre identité"}</Text></View></View><Text style={styles.helper}>L’activité artisan n’est pas un second compte et ne crée pas une fiche publique réelle.</Text><Button label={account.artisanEnabled ? "Ouvrir mon activité artisan" : "Activer le mode artisan"} variant={account.artisanEnabled ? "primary" : "secondary"} onPress={() => { if (!account.artisanEnabled) enableArtisanMode(); router.push("/pro"); }} /></Surface>
            <SectionHeading title="Mon suivi" />
            <Surface style={styles.section}><AccessRow icon="list" title="Demandes et devis" detail="Exemples uniquement" onPress={() => router.push("/demandes")} /><AccessRow icon="help" title="Réclamations" detail="Scénarios fictifs" onPress={() => router.push("/reclamations")} /></Surface>
          </View>
          <View style={styles.column}>
            <SectionHeading title="Préférences" />
            <Surface style={styles.section}><Text style={styles.sectionTitle}>Paramètres de démonstration</Text><Text style={styles.body}>Les préférences de notification, de sécurité et de confidentialité seront disponibles dans le produit connecté.</Text><View style={styles.notice}><Text style={styles.noticeTitle}>Aucune authentification active</Text><Text style={styles.body}>Ce profil n’est pas un compte enregistré et les changements ne sont pas persistés.</Text></View></Surface>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function AccessRow({ icon, title, detail, onPress }: { icon: "list" | "help"; title: string; detail: string; onPress: () => void }) {
  return <View style={styles.accessRow}><View style={styles.accessIcon}><AppIcon name={icon} size={18} color={colors.primary} /></View><View style={styles.accessCopy}><Text style={styles.sectionTitle}>{title}</Text><Text style={styles.helper}>{detail}</Text></View><Button label="Ouvrir" variant="quiet" compact onPress={onPress} /></View>;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { width: "100%", maxWidth: layout.readingMax, alignSelf: "center", padding: layout.pageGutter, paddingBottom: spacing.x16 + layout.navHeight, gap: spacing.x4 },
  contentWide: { maxWidth: layout.contentMax, paddingHorizontal: layout.pageGutterWide, paddingTop: spacing.x8 },
  header: { gap: spacing.x1 }, eyebrow: { ...typography.caption, color: colors.primary, fontWeight: "700", letterSpacing: 0.8 }, title: { ...typography.h1, color: colors.textPrimary }, subtitle: { ...typography.body, color: colors.textSecondary },
  accountCard: { flexDirection: "row", alignItems: "center", gap: spacing.x3, borderRadius: radius.xlarge }, avatar: { width: spacing.x12, height: spacing.x12, alignItems: "center", justifyContent: "center", borderRadius: radius.large, backgroundColor: colors.primarySoft }, accountCopy: { flex: 1, gap: spacing.x1 }, identity: { width: spacing.x8, height: spacing.x8, alignItems: "center", justifyContent: "center", borderRadius: radius.pill, backgroundColor: colors.primarySoft },
  twoColumns: { gap: spacing.x4 }, column: { flex: 1, gap: spacing.x3 }, section: { gap: spacing.x3, borderRadius: radius.large }, accessRow: { flexDirection: "row", alignItems: "center", gap: spacing.x2, minHeight: spacing.x12, borderBottomWidth: 1, borderBottomColor: colors.border }, accessIcon: { width: spacing.x8, height: spacing.x8, justifyContent: "center", alignItems: "center", borderRadius: radius.medium, backgroundColor: colors.primarySoft }, accessCopy: { flex: 1, gap: spacing.x1 }, sectionHeader: { flexDirection: "row", alignItems: "center", gap: spacing.x3 }, sectionIcon: { width: spacing.x10, height: spacing.x10, borderRadius: radius.medium, alignItems: "center", justifyContent: "center", backgroundColor: colors.primarySoft }, sectionCopy: { flex: 1, gap: spacing.x1 }, sectionTitle: { ...typography.title, color: colors.textPrimary }, body: { ...typography.bodySmall, color: colors.textSecondary }, helper: { ...typography.caption, color: colors.textSecondary }, notice: { gap: spacing.x1, padding: spacing.x3, borderRadius: radius.medium, backgroundColor: colors.infoSoft }, noticeTitle: { ...typography.label, color: colors.info },
});
