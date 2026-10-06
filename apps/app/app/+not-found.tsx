import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { screenContent, screenStyles } from "../components/layout";
import { AppIcon, Button, PageHeading, Surface } from "../components/ui";
import { colors, radius, spacing, typography } from "../constants/theme";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <View style={styles.illustration}><View style={styles.illustrationMark}><AppIcon name="help" size={38} color={colors.primary} /></View><Text style={styles.errorCode}>404</Text></View>
        <PageHeading eyebrow="KIDIMA" title="Cette page n’existe pas." subtitle="Le lien utilisé semble incorrect ou la page a été déplacée." />
        <Surface style={styles.panel}>
          <Text style={styles.body}>Vous pouvez revenir à l’accueil ou parcourir les profils d’exemple.</Text>
          <Button label="Retour à l’accueil" onPress={() => router.replace("/")} />
          <Button label="Parcourir les artisans" variant="secondary" onPress={() => router.replace("/artisans")} />
        </Surface>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: screenStyles.root,
  content: screenContent({ maxWidth: 640, top: spacing.x16, bottom: spacing.x16, gap: spacing.x5 }),
  illustration: { minHeight: 170, alignItems: "center", justifyContent: "center", position: "relative" },
  illustrationMark: { width: 112, height: 112, alignItems: "center", justifyContent: "center", borderRadius: radius.xlarge, backgroundColor: colors.primarySoft, transform: [{ rotate: "-6deg" }] },
  errorCode: { position: "absolute", right: "20%", bottom: spacing.x4, ...typography.h1, color: colors.primary, backgroundColor: colors.background, paddingHorizontal: spacing.x2 },
  panel: { gap: spacing.x3, borderRadius: radius.large },
  body: { ...typography.body, color: colors.textSecondary },
});
