import { usePathname, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppIcon } from "../components/ui";
import { colors, radius, spacing } from "../constants/theme";

const ITEMS = [
  { route: "/", label: "Accueil", icon: "home" },
  { route: "/artisans", label: "Artisans", icon: "users" },
  { route: "/demande", label: "Faire une demande", icon: "create" },
  { route: "/book", label: "Demander un devis", icon: "calendar" },
  { route: "/reclamations", label: "Mes signalements", icon: "list" },
  { route: "/dashboard", label: "Espace de gestion", icon: "settings" },
] as const;

export default function MenuScreen() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Kidima</Text>
        <Text style={styles.subtitle}>Navigation</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {ITEMS.map((item) => {
          const active = pathname === item.route;
          return (
            <Pressable
              key={item.route}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              style={({ pressed }) => [styles.item, active && styles.itemActive, pressed && styles.itemPressed]}
              onPress={() => router.push(item.route as never)}
            >
              <View style={[styles.itemIcon, active && styles.itemIconActive]}>
                <AppIcon name={item.icon} size={19} color={active ? colors.primary : colors.textSecondary} />
              </View>
              <View style={styles.itemBody}>
                <Text style={[styles.itemLabel, active && styles.itemLabelActive]}>{item.label}</Text>
                <Text style={styles.itemSubtext}>{active ? "Écran actif" : "Ouvrir"}</Text>
              </View>
              <AppIcon name="chevronRight" size={17} color={colors.textSecondary} />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.primaryDark, paddingHorizontal: spacing.x4, paddingTop: spacing.x12, paddingBottom: spacing.x4, gap: spacing.x1 },
  title: { color: colors.white, fontSize: 22, fontWeight: "800" },
  subtitle: { color: colors.primarySoft, fontSize: 13 },
  content: { width: "100%", maxWidth: 720, alignSelf: "center", padding: spacing.x4, gap: spacing.x2 },
  item: { minHeight: 68, flexDirection: "row", alignItems: "center", gap: spacing.x3, backgroundColor: colors.surface, borderRadius: radius.medium, padding: spacing.x3, borderWidth: 1, borderColor: colors.border },
  itemActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  itemPressed: { opacity: 0.72 },
  itemIcon: { width: 40, height: 40, borderRadius: radius.medium, backgroundColor: colors.muted, justifyContent: "center", alignItems: "center" },
  itemIconActive: { backgroundColor: colors.surface },
  itemBody: { flex: 1, gap: 2 },
  itemLabel: { fontSize: 14, fontWeight: "700", color: colors.textPrimary },
  itemLabelActive: { color: colors.primary },
  itemSubtext: { fontSize: 11, color: colors.textSecondary },
});
