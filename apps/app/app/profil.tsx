import Head from "expo-router/head";
import { useRouter } from "expo-router";
import { screenContent, screenContentWide, screenStyles } from "../components/layout";
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
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
        <PageHeading eyebrow="VOTRE ESPACE PERSONNEL" title="Mon profil" subtitle="Gérez votre activité client et, si vous le souhaitez, votre activité d’artisan." />
        <Surface style={styles.accountCard}><View style={styles.avatar}><AppIcon name="user" size={22} color={colors.primary} /></View><View style={styles.accountCopy}><Text style={styles.sectionTitle}>{account.name}</Text><Text style={styles.body}>Profil de démonstration · vos informations personnelles ne sont pas nécessaires.</Text></View><Text style={styles.accountStatus}>DÉMO LOCALE</Text></Surface>
        <View style={[styles.twoColumns, isWide && styles.twoColumnsWide]}>
          <View style={styles.column}>
            <SectionHeading title="Mon compte" />
            <View style={styles.accountLinks}><AccessRow icon="list" title="Mon activité" detail="Demandes et devis d’exemple" onPress={() => router.push("/demandes")} /><AccessRow icon="help" title="Mes réclamations" detail="Exemples de démonstration" onPress={() => router.push("/reclamations")} /></View>
            <SectionHeading title="Activité professionnelle" />
            <Surface style={styles.professionalCard}><View style={styles.professionalEyebrow}><AppIcon name="users" size={16} color={colors.primary} /><Text style={styles.professionalEyebrowText}>UN COMPTE, DEUX USAGES</Text></View><View style={styles.sectionCopy}><Text style={styles.sectionTitle}>{requestedArtisanActivity ? "Votre espace artisan" : "Vous êtes aussi artisan ?"}</Text><Text style={styles.body}>{requestedArtisanActivity ? "Votre activité professionnelle est activée sur ce compte." : "Gérez votre activité professionnelle depuis votre compte Kidima."}</Text></View><Text style={styles.helper}>L’activation est temporaire dans cette démonstration. Aucun second compte n’est nécessaire et rien n’est publié.</Text><Button label={requestedArtisanActivity ? "Gérer mon activité" : "Activer mon activité artisan"} variant={requestedArtisanActivity ? "secondary" : "primary"} onPress={() => { if (!requestedArtisanActivity) enableArtisanMode(); router.push("/pro"); }} /></Surface>
          </View>
          <View style={styles.column}>
            <SectionHeading title="Préférences" />
            <View style={styles.preferences}><View style={styles.preferencesIcon}><AppIcon name="help" size={18} color={colors.info} /></View><View style={styles.preferencesCopy}><Text style={styles.sectionTitle}>Disponibles avec un compte connecté</Text><Text style={styles.body}>Notifications, sécurité et confidentialité ne sont pas configurables dans cette démonstration. Vos choix ne sont pas enregistrés.</Text></View></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function AccessRow({ icon, title, detail, onPress }: { icon: "list" | "help"; title: string; detail: string; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={`${title} — ${detail}`} onPress={onPress} style={({ pressed }) => [styles.accessRow, pressed && styles.accessRowPressed]}><View style={styles.accessIcon}><AppIcon name={icon} size={18} color={colors.primary} /></View><View style={styles.accessCopy}><Text style={styles.sectionTitle}>{title}</Text><Text style={styles.helper}>{detail}</Text></View><AppIcon name="chevronRight" size={18} color={colors.primary} /></Pressable>;
}

const styles = StyleSheet.create({
  root: screenStyles.root,
  content: screenContent({ bottom: spacing.x10 }),
  contentMobile: { paddingBottom: spacing.x16 + layout.navHeight },
  contentWide: screenContentWide({ maxWidth: layout.contentMax }),
  accountCard: { flexDirection: "row", alignItems: "center", gap: spacing.x3, borderRadius: radius.large, backgroundColor: colors.primaryDark, borderColor: colors.primaryDark }, avatar: { width: spacing.x12, height: spacing.x12, flexShrink: 0, alignItems: "center", justifyContent: "center", borderRadius: radius.large, backgroundColor: colors.primaryOnDark }, accountCopy: { flex: 1, minWidth: 0, gap: spacing.x1 }, accountStatus: { ...typography.eyebrow, flexShrink: 0, color: colors.primaryOnDark },
  twoColumns: { gap: spacing.x4 }, twoColumnsWide: { flexDirection: "row", alignItems: "flex-start" }, column: { flex: 1, minWidth: 0, gap: spacing.x3 }, accountLinks: { paddingHorizontal: spacing.x2 }, professionalCard: { gap: spacing.x3, borderRadius: radius.large, backgroundColor: colors.primarySoft, borderColor: colors.primarySoft }, professionalEyebrow: { flexDirection: "row", alignItems: "center", gap: spacing.x2 }, professionalEyebrowText: { ...typography.eyebrow, color: colors.primaryDark }, accessRow: { flexDirection: "row", alignItems: "center", gap: spacing.x3, minHeight: 72, paddingVertical: spacing.x3, borderBottomWidth: 1, borderBottomColor: colors.border }, accessRowPressed: { opacity: 0.72 }, accessIcon: { width: spacing.x10, height: spacing.x10, flexShrink: 0, justifyContent: "center", alignItems: "center", borderRadius: radius.medium, backgroundColor: colors.primarySoft }, accessCopy: { flex: 1, minWidth: 0, gap: spacing.x1 }, sectionCopy: { gap: spacing.x1 }, sectionTitle: { ...typography.title, color: colors.textPrimary }, body: screenStyles.body, helper: screenStyles.helper, preferences: { flexDirection: "row", alignItems: "flex-start", gap: spacing.x3, paddingVertical: spacing.x2 }, preferencesIcon: { width: spacing.x10, height: spacing.x10, flexShrink: 0, justifyContent: "center", alignItems: "center", borderRadius: radius.medium, backgroundColor: colors.infoSoft }, preferencesCopy: { flex: 1, minWidth: 0, gap: spacing.x1 },
});
