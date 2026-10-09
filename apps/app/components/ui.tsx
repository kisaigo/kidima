import { useState, type ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { screenStyles } from "./layout";
import { colors, contentWidth, fontWeights, iconSizes, layout, radius, shadows, spacing, typeScale, typography } from "../constants/theme";
import { APP_TABS } from "../data/navigation";
import { AppIcon, type IconName } from "./icons";
export { AppIcon } from "./icons";

export function PageContainer({
  children,
  maxWidth = contentWidth,
  style,
}: {
  children: ReactNode;
  maxWidth?: number;
  style?: object;
}) {
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[styles.pageContent, { maxWidth }, style]}>{children}</View>
    </ScrollView>
  );
}

export function PageHeading({
  title,
  subtitle,
  eyebrow,
  action,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  action?: ReactNode;
}) {
  return (
    <View style={styles.headingRow}>
      <View style={styles.headingCopy}>
        {eyebrow ? <View style={styles.eyebrowWrap}><Text style={styles.eyebrow}>{eyebrow}</Text></View> : null}
        <Text accessibilityRole="header" style={styles.pageTitle}>{title}</Text>
        {subtitle ? <Text style={styles.pageSubtitle}>{subtitle}</Text> : null}
      </View>
      {action ? <View style={styles.headingAction}>{action}</View> : null}
    </View>
  );
}

export function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <View style={styles.sectionHeading}>
      <Text accessibilityRole="header" style={styles.sectionTitle}>{title}</Text>
      {action}
    </View>
  );
}

function iconForCategory(category: string): IconName {
  if (category === "Plomberie") return "wrench";
  if (category === "Électricité") return "zap";
  if (category === "Menuiserie") return "hammer";
  if (category === "Couture") return "scissors";
  if (category === "Peinture") return "paintbrush";
  if (category === "Climatisation") return "wind";
  if (category === "Réparation téléphone") return "smartphone";
  return "users";
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export function Button({
  label,
  onPress,
  variant = "primary",
  icon,
  disabled = false,
  loading = false,
  compact = false,
  fullWidth = false,
  accessibilityLabel,
}: {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: IconName;
  disabled?: boolean;
  loading?: boolean;
  compact?: boolean;
  fullWidth?: boolean;
  accessibilityLabel?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: disabled || loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[`button_${variant}`],
        compact && styles.buttonCompact,
        fullWidth && styles.buttonFullWidth,
        (disabled || loading) && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === "primary" ? colors.primaryDark : colors.primary} />
      ) : (
        <>
          {icon ? <AppIcon name={icon} size={17} color={variant === "primary" ? colors.primaryDark : variant === "danger" ? colors.white : colors.primary} /> : null}
          <Text style={[styles.buttonText, styles[`buttonText_${variant}`], compact && styles.buttonTextCompact]}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

export function IconButton({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: IconName;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [styles.iconButton, pressed && styles.buttonPressed]}
    >
      <AppIcon name={icon} size={iconSizes.medium} color={colors.textPrimary} />
    </Pressable>
  );
}

export function Surface({
  children,
  style,
}: {
  children: ReactNode;
  style?: object;
}) {
  return <View style={[styles.surface, style]}>{children}</View>;
}

export function ArtisanCard({
  name,
  category,
  district,
  city,
  services = [],
  onPress,
  layout = "row",
}: {
  name: string;
  category: string;
  district: string;
  city: string;
  services?: string[];
  onPress: () => void;
  layout?: "row" | "grid" | "gridWide";
}) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Voir la fiche de démonstration de ${name}, ${category}, ${district}`} onPress={onPress} style={({ pressed }) => [styles.artisanCard, layout === "grid" && styles.artisanCardGrid, layout === "gridWide" && styles.artisanCardGridWide, pressed && styles.buttonPressed]}>
      <View style={styles.artisanCardHeader}>
        <View style={styles.artisanAvatar} accessibilityLabel={`Icône du métier ${category}`}>
          <AppIcon name={iconForCategory(category)} size={25} color={colors.primary} />
        </View>
        <View style={styles.artisanMeta}>
          <Text style={styles.artisanName}>{name}</Text>
          <Text numberOfLines={2} style={styles.artisanCategory}>{category}</Text>
        </View>
        <View style={styles.demoMark}><AppIcon name="users" size={15} color={colors.primary} /></View>
      </View>

      <View style={styles.artisanStatsRow}>
        <View style={styles.artisanStat}>
          <AppIcon name="location" size={14} color={colors.primary} />
          <Text numberOfLines={1} style={styles.artisanStatText}>{district} · {city}</Text>
        </View>
        <Text style={styles.artisanDemo}>Zone d’exemple</Text>
      </View>

      {services.length ? <View style={styles.artisanTagRow}>
        {services.slice(0, 2).map((service) => (
          <View key={service} style={styles.artisanTag}>
            <Text numberOfLines={1} style={styles.artisanTagText}>{service}</Text>
          </View>
        ))}
      </View> : null}

      <View style={styles.artisanFooter}>
        <Text style={styles.artisanDemo}>Profil fictif</Text>
        <View style={styles.artisanAction}><Text style={styles.artisanCta}>Voir le profil</Text><AppIcon name="chevronRight" size={16} color={colors.primary} /></View>
      </View>
    </Pressable>
  );
}

export function Badge({
  label,
  tone = "neutral",
  icon,
}: {
  label: string;
  tone?: "neutral" | "primary" | "success" | "warning" | "error";
  icon?: IconName;
}) {
  return (
    <View style={[styles.badge, styles[`badge_${tone}`]]}>
      {icon ? (
        <AppIcon
          name={icon}
          size={13}
          color={
            tone === "primary"
              ? colors.primary
              : tone === "success"
                ? colors.success
                : tone === "warning"
                  ? colors.warning
                  : tone === "error"
                    ? colors.error
                    : colors.textSecondary
          }
        />
      ) : null}
      <Text style={[styles.badgeText, styles[`badgeText_${tone}`]]}>{label}</Text>
    </View>
  );
}

export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  helper,
  error,
  onBlur,
  multiline = false,
  keyboardType = "default",
  autoCapitalize,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  helper?: string;
  error?: string;
  onBlur?: () => void;
  multiline?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        accessibilityHint={error ? `Erreur : ${error}` : helper}
        style={[styles.input, multiline && styles.inputMultiline, focused && styles.inputFocused, error && styles.inputError]}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); onBlur?.(); }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {error ? <Text accessibilityLiveRegion="polite" style={styles.fieldError}>{error}</Text> : helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

export function SearchField({
  value,
  onChangeText,
  placeholder = "Rechercher",
}: {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.searchField, focused && styles.searchFieldFocused]}>
      <AppIcon name="search" size={19} color={colors.textSecondary} />
      <TextInput
        accessibilityLabel={placeholder}
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        returnKeyType="search"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {value ? <Pressable accessibilityRole="button" accessibilityLabel="Effacer la recherche" hitSlop={8} onPress={() => onChangeText("")} style={styles.searchClear}>
        <AppIcon name="close" size={17} color={colors.textSecondary} />
      </Pressable> : null}
    </View>
  );
}

export function ChoiceChip({
  label,
  selected,
  onPress,
  accessibilityRole = "button",
  icon,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  accessibilityRole?: "button" | "radio";
  icon?: IconName;
}) {
  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityRole === "radio" ? { checked: selected } : { selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.chip, selected && styles.chipSelected, pressed && styles.buttonPressed]}
    >
      {icon ? <AppIcon name={icon} size={15} color={selected ? colors.primary : colors.textSecondary} /> : null}
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

export function EmptyState({
  title,
  description,
  icon = "list",
  action,
}: {
  title: string;
  description: string;
  icon?: IconName;
  action?: ReactNode;
}) {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <AppIcon name={icon} size={22} color={colors.primary} />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDescription}>{description}</Text>
      {action}
    </View>
  );
}

export function BottomTabBar({
  items,
  activeIndex,
  onChange,
  style,
}: {
  items: readonly { label: string; icon: IconName; route: string }[];
  activeIndex: number;
  onChange: (index: number) => void;
  style?: object;
}) {
  return (
    <View accessibilityRole="tablist" accessibilityLabel="Navigation principale" style={[styles.tabBar, style]}>
      <View style={styles.tabBarInner}>
        {items.map((item, index) => {
          const active = index === activeIndex;
          return (
            <Pressable
              key={item.route}
              accessibilityRole="tab"
              accessibilityLabel={item.label}
              accessibilityState={{ selected: active }}
              onPress={() => onChange(index)}
              style={({ pressed }) => [styles.tabItem, active && styles.tabItemActive, pressed && styles.buttonPressed]}
            >
              <AppIcon name={item.icon} size={18} color={active ? colors.primary : colors.textSecondary} />
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function TopAppNav({
  activeIndex,
  onChange,
}: {
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  return (
    <View accessibilityRole="toolbar" accessibilityLabel="Navigation principale" style={styles.topAppNav}>
      <View style={styles.navBrand} accessibilityLabel="Kidima — démonstration">
        <Pressable accessibilityRole="button" accessibilityLabel="Retour à l’accueil Kidima" onPress={() => onChange(APP_TABS.findIndex((tab) => tab.route === "/"))} style={styles.navBrandMark}>
          <Text style={styles.navBrandInitial}>K</Text>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="Retour à l’accueil Kidima" onPress={() => onChange(APP_TABS.findIndex((tab) => tab.route === "/"))} style={styles.navBrandCopy}>
          <Text style={styles.navBrandName}>kidima</Text>
          <Text style={styles.navBrandCaption}>DÉMONSTRATION</Text>
        </Pressable>
      </View>
      <View style={styles.topAppNavLinks}>
        {APP_TABS.map((item, index) => {
          const active = index === activeIndex;
          return (
            <Pressable
              key={item.route}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              accessibilityState={{ selected: active }}
              onPress={() => onChange(index)}
              style={({ pressed }) => [styles.topAppNavItem, active && styles.topAppNavItemActive, pressed && styles.buttonPressed]}
            >
              <AppIcon name={item.icon} size={17} color={active ? colors.primaryOnDark : colors.textSecondary} />
              <Text style={[styles.topAppNavLabel, active && styles.topAppNavLabelActive]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  pageContent: {
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: spacing.x4,
    paddingTop: spacing.x6,
    paddingBottom: spacing.x12,
    gap: spacing.x6,
  },
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.x4,
  },
  headingCopy: {
    flex: 1,
    gap: spacing.x2,
  },
  eyebrowWrap: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.x2,
    paddingVertical: spacing.x1,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  eyebrow: {
    ...typography.eyebrow,
    color: colors.primaryDark,
    textTransform: "uppercase",
  },
  pageTitle: {
    ...typography.h1,
    color: colors.textPrimary,
    letterSpacing: -0.45,
  },
  pageSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    maxWidth: 640,
  },
  headingAction: {
    flexShrink: 0,
    alignItems: "flex-end",
  },
  sectionHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.x3,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typeScale.bodyLarge,
    fontWeight: fontWeights.bold,
  },
  button: {
    minHeight: 46,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.x2,
    paddingHorizontal: spacing.x4,
    borderRadius: radius.medium,
    borderWidth: 1,
    borderColor: "transparent",
  },
  button_primary: {
    backgroundColor: colors.accent,
  },
  button_secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
  },
  button_ghost: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  button_danger: {
    backgroundColor: colors.error,
  },
  buttonCompact: {
    minHeight: iconSizes.touchTarget,
    paddingHorizontal: spacing.x3,
  },
  buttonFullWidth: {
    width: "100%",
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  buttonPressed: {
    opacity: 0.78,
  },
  buttonText: {
    fontSize: typeScale.body,
    fontWeight: fontWeights.bold,
  },
  buttonText_primary: {
    color: colors.primaryDark,
  },
  buttonText_secondary: {
    color: colors.primaryDark,
  },
  buttonText_ghost: {
    color: colors.primary,
  },
  buttonText_danger: {
    color: colors.white,
  },
  buttonTextCompact: {
    fontSize: typeScale.caption,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.medium,
    backgroundColor: colors.surface,
  },
  surface: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xlarge,
    padding: spacing.x5,
    ...shadows.subtle,
  },
  badge: {
    alignSelf: "flex-start",
    minHeight: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.x1,
    paddingHorizontal: spacing.x2,
    paddingVertical: spacing.x1,
    borderRadius: radius.small,
  },
  badge_neutral: { backgroundColor: colors.muted },
  badge_primary: { backgroundColor: colors.primarySoft },
  badge_success: { backgroundColor: colors.primarySoft },
  badge_warning: { backgroundColor: colors.warningSoft },
  badge_error: { backgroundColor: colors.errorSoft },
  badgeText: {
    fontSize: typeScale.caption,
    fontWeight: fontWeights.bold,
  },
  badgeText_neutral: { color: colors.textSecondary },
  badgeText_primary: { color: colors.primary },
  badgeText_success: { color: colors.success },
  badgeText_warning: { color: colors.warning },
  badgeText_error: { color: colors.error },
  field: {
    gap: spacing.x2,
  },
  fieldLabel: {
    color: colors.textPrimary,
    fontSize: typeScale.caption,
    fontWeight: fontWeights.bold,
  },
  input: {
    minHeight: 48,
    paddingHorizontal: spacing.x3,
    paddingVertical: spacing.x3,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.medium,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    fontSize: typeScale.body,
  },
  inputMultiline: {
    minHeight: 112,
  },
  inputError: {
    borderColor: colors.error,
  },
  fieldError: {
    ...typography.caption,
    color: colors.error,
  },
  inputFocused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 1,
  },
  helper: screenStyles.helper,
  searchField: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.x3,
    paddingHorizontal: spacing.x4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.medium,
    backgroundColor: colors.surface,
  },
  searchFieldFocused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    paddingVertical: spacing.x3,
    color: colors.textPrimary,
    fontSize: typeScale.body,
  },
  searchClear: {
    width: 32,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.small,
    backgroundColor: colors.muted,
  },
  chip: {
    minHeight: iconSizes.touchTarget,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.x2,
    paddingHorizontal: spacing.x3,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.medium,
    backgroundColor: colors.surface,
  },
  chipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: typeScale.caption,
    fontWeight: fontWeights.bold,
  },
  chipTextSelected: {
    color: colors.primaryDark,
  },
  artisanCard: {
    flexGrow: 1,
    flexBasis: "100%",
    minWidth: 0,
    minHeight: 176,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.large,
    padding: spacing.x4,
    gap: spacing.x3,
    ...shadows.subtle,
  },
  artisanCardGrid: {
    flexBasis: "44%",
    maxWidth: "49%",
  },
  artisanCardGridWide: {
    flexBasis: "30%",
    maxWidth: "32%",
  },
  artisanCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.x3,
  },
  demoMark: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.small,
    backgroundColor: colors.primarySoft,
  },
  artisanAvatar: {
    width: 56,
    height: 56,
    position: "relative",
    borderRadius: radius.medium,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  artisanMeta: {
    flex: 1,
    minWidth: 0,
  },
  artisanName: {
    color: colors.textPrimary,
    fontSize: typeScale.bodyLarge,
    fontWeight: fontWeights.bold,
  },
  artisanCategory: {
    color: colors.textSecondary,
    fontSize: typeScale.caption,
    marginTop: 2,
  },
  artisanStatsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing.x2,
  },
  artisanStat: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.x1,
    backgroundColor: "transparent",
    borderRadius: radius.small,
    paddingVertical: spacing.x1,
  },
  artisanStatText: {
    color: colors.textSecondary,
    ...typography.caption,
  },
  artisanTagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.x2,
  },
  artisanTag: {
    maxWidth: "100%",
    backgroundColor: colors.primarySoft,
    borderRadius: radius.small,
    paddingHorizontal: spacing.x2,
    paddingVertical: spacing.x1,
  },
  artisanTagText: {
    color: colors.primary,
    ...typography.caption,
    fontSize: 12,
    fontWeight: fontWeights.bold,
  },
  artisanFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.x2,
    paddingTop: spacing.x3,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  artisanAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.x1,
  },
  artisanCta: {
    color: colors.primary,
    fontWeight: fontWeights.bold,
    fontSize: 13,
  },
  artisanDemo: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
    flexShrink: 1,
  },
  emptyState: {
    alignItems: "center",
    padding: spacing.x8,
    width: "100%",
    gap: spacing.x3,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xlarge,
    backgroundColor: colors.surface,
    ...shadows.subtle,
  },
  emptyIcon: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.medium,
    backgroundColor: colors.primarySoft,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: typeScale.bodyLarge,
    fontWeight: fontWeights.bold,
    textAlign: "center",
  },
  emptyDescription: {
    maxWidth: 420,
    color: colors.textSecondary,
    fontSize: typeScale.body,
    lineHeight: 21,
    textAlign: "center",
  },
  tabBar: {
    minHeight: layout.navHeight,
    alignItems: "center",
    paddingTop: spacing.x2,
    paddingHorizontal: spacing.x2,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 8,
  },
  tabBarInner: {
    width: "100%",
    maxWidth: 560,
    minHeight: layout.navHeight - spacing.x2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: spacing.x1,
  },
  tabItem: {
    flex: 1,
    minHeight: iconSizes.touchTarget,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.x2,
    borderRadius: radius.medium,
    gap: 4,
  },
  tabItemActive: {
    backgroundColor: "transparent",
  },
  tabLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: fontWeights.bold,
  },
  tabLabelActive: {
    color: colors.primary,
  },
  topAppNav: {
    minHeight: layout.headerHeight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: spacing.x3,
    paddingHorizontal: spacing.x4,
    paddingVertical: spacing.x2,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.035,
    shadowRadius: 8,
    elevation: 1,
  },
  navBrand: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.x2,
    marginLeft: spacing.x2,
  },
  navBrandMark: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    borderRadius: radius.medium,
    backgroundColor: colors.primary,
  },
  navBrandCopy: {
    justifyContent: "center",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  navBrandInitial: {
    color: colors.white,
    fontSize: 19,
    fontWeight: fontWeights.heavy,
  },
  navBrandName: {
    color: colors.textPrimary,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: fontWeights.heavy,
  },
  navBrandCaption: {
    color: colors.textSecondary,
    fontSize: 9,
    lineHeight: 13,
    fontWeight: fontWeights.bold,
    letterSpacing: 0.6,
  },
  topAppNavLinks: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: spacing.x1,
  },
  topAppNavItem: {
    minHeight: iconSizes.touchTarget,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.x2,
    paddingHorizontal: spacing.x3,
    borderRadius: radius.medium,
    borderWidth: 1,
    borderColor: "transparent",
  },
  topAppNavItemActive: {
    backgroundColor: colors.primary,
  },
  topAppNavLabel: {
    color: colors.textSecondary,
    fontSize: typeScale.caption,
    fontWeight: fontWeights.bold,
  },
  topAppNavLabelActive: {
    color: colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});