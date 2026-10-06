import Head from "expo-router/head";
import { useRouter } from "expo-router";
import { screenContent, screenContentWide, screenStyles } from "../components/layout";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { AppNavigation } from "../components/navigation";
import { AppIcon, Button, PageHeading, SectionHeading, Surface } from "../components/ui";
import { breakpoints, colors, layout, radius, spacing, typography } from "../constants/theme";
import { useDemoAccount } from "../contexts/account";

export default function ProfileScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= breakpoints.desktop;
  const { account, enableArtisanMode } = useDemoAccount();

  const requestedArtisanActivity = account.artisanEnabled;

  return (
    <View style={styles.root}>
      <Head>
        <title>Mon compte — Kidima</title>
      </Head>
      <AppNavigation activeRoute="/profil" />
      <ScrollView contentContainerStyle={[styles.content, width >= breakpoints.desktop && styles.contentWide, width < breakpoints.tablet && styles.contentMobile]}>
        <PageHeading eyebrow="VOTRE ESPACE PERSONNEL" title="Mon profil" subtitle="Une même identité pour vos activités client et artisan." />
        <Surface style={styles.accountCard}><View style={styles.avatar}><AppIcon name="user" size={22} color={colors.primary} /></View><View style={styles.accountCopy}><Text style={styles.sectionTitle}>{account.name}</Text><Text style={styles.body}>Compte de démonstration · aucune donnée personnelle requise</Text><Text style={styles.accountStatus}>SESSION LOCALE</Text></View><View style={styles.identity}><AppIcon name="user" size={16} color={colors.primary} /></View></Surface>
        <View style={[styles.twoColumns, isWide && styles.twoColumnsWide]}>
          <View style={styles.column}>
            <SectionHeading title="Mon compte" />
            <Surface style={styles.section}><AccessRow icon="list" title="Mon activité" detail="Demandes et devis d’exemple" onPress={() => router.push("/demandes")} /><AccessRow icon="help" title="Mes réclamations" detail="Scénarios fictifs uniquement" onPress={() => router.push("/reclamations")} /></Surface>
            <SectionHeading title="Activité professionnelle" />
            <Surface style={styles.professionalCard}><View style={styles.sectionHeader}><View style={styles.sectionIcon}><AppIcon name="users" color={colors.primary} /></View><View style={styles.sectionCopy}><Text style={styles.sectionTitle}>Vous proposez aussi vos services ?</Text><Text style={styles.body}>{requestedArtisanActivity ? "Votre espace professionnel est activé sur ce compte." : "Ajoutez une activité artisan à votre compte Kidima."}</Text></View></View><Text style={styles.helper}>Votre activité professionnelle est liée à votre compte Kidima. Aucun second compte n’est nécessaire.</Text><Button label={requestedArtisanActivity ? "Gérer mon espace professionnel" : "Activer mon activité professionnelle"} variant={requestedArtisanActivity ? "secondary" : "primary"} onPress={() => { if (!requestedArtisanActivity) enableArtisanMode(); router.push("/pro"); }} /></Surface>
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
  return <View style={styles.accessRow}><View style={styles.accessIcon}><AppIcon name={icon} size={18} color={colors.primary} /></View><View style={styles.accessCopy}><Text style={styles.sectionTitle}>{title}</Text><Text style={styles.helper}>{detail}</Text></View><Button label="Ouvrir" variant="ghost" compact onPress={onPress} /></View>;
}

const styles = StyleSheet.create({
  root: screenStyles.root,
  content: screenContent({ bottom: spacing.x10 }),
  contentMobile: { paddingBottom: spacing.x16 + layout.navHeight },
  contentWide: screenContentWide({ maxWidth: layout.contentMax }),
  accountCard: { flexDirection: "row", alignItems: "center", gap: spacing.x3, borderRadius: radius.xlarge, backgroundColor: colors.primaryDark, borderColor: colors.primaryDark }, avatar: { width: spacing.x12, height: spacing.x12, alignItems: "center", justifyContent: "center", borderRadius: radius.large, backgroundColor: colors.primaryOnDark }, accountCopy: { flex: 1, gap: spacing.x1 }, accountStatus: { ...typography.eyebrow, color: colors.primaryOnDark }, identity: { width: spacing.x8, height: spacing.x8, alignItems: "center", justifyContent: "center", borderRadius: radius.pill, backgroundColor: colors.primaryOnDark },
  twoColumns: { gap: spacing.x4 }, twoColumnsWide: { flexDirection: "row", alignItems: "flex-start" }, column: { flex: 1, gap: spacing.x3 },  section: { gap: spacing.x3, borderRadius: radius.large }, professionalCard: { gap: spacing.x3, borderRadius: radius.xlarge, backgroundColor: colors.primarySoft, borderColor: colors.primarySoft }, accessRow: { flexDirection: "row", alignItems: "center", gap: spacing.x2, minHeight: spacing.x12, borderBottomWidth: 1, borderBottomColor: colors.border }, accessIcon: { width: spacing.x8, height: spacing.x8, justifyContent: "center", alignItems: "center", borderRadius: radius.medium, backgroundColor: colors.primarySoft }, accessCopy: { flex: 1, gap: spacing.x1 }, sectionHeader: { flexDirection: "row", alignItems: "center", gap: spacing.x3 }, sectionIcon: { width: spacing.x10, height: spacing.x10, borderRadius: radius.medium, alignItems: "center", justifyContent: "center", backgroundColor: colors.primarySoft }, sectionCopy: { flex: 1, gap: spacing.x1 }, sectionTitle: { ...typography.title, color: colors.textPrimary }, body: screenStyles.body, helper: screenStyles.helper, notice: { gap: spacing.x1, padding: spacing.x3, borderRadius: radius.medium, backgroundColor: colors.infoSoft }, noticeTitle: { ...typography.label, color: colors.info },
});
