import type { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  FilePlus2,
  Filter,
  House,
  ListChecks,
  MapPin,
  MessageCircle,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  UserRound,
  UsersRound,
  X,
} from "lucide-react-native";
import { colors, contentWidth, radius, spacing, typeScale } from "../constants/theme";

const iconSet = {
  arrowDownUp: ArrowDownUp,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  badgeCheck: BadgeCheck,
  bell: Bell,
  calendar: CalendarDays,
  check: Check,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  help: CircleHelp,
  clock: Clock3,
  create: FilePlus2,
  filter: Filter,
  home: House,
  list: ListChecks,
  location: MapPin,
  message: MessageCircle,
  search: Search,
  settings: Settings,
  shield: ShieldCheck,
  sliders: SlidersHorizontal,
  star: Star,
  user: UserRound,
  users: UsersRound,
  close: X,
};

export type IconName = keyof typeof iconSet;

export function AppIcon({
  name,
  size = 20,
  color = colors.textSecondary,
  strokeWidth = 1.8,
}: {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const IconComponent = iconSet[name];
  return <IconComponent size={size} color={color} strokeWidth={strokeWidth} />;
}

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
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.pageTitle}>{title}</Text>
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
      <Text style={styles.sectionTitle}>{title}</Text>
      {action}
    </View>
  );
}

type ButtonVariant = "primary" | "secondary" | "quiet" | "danger";

export function Button({
  label,
  onPress,
  variant = "primary",
  icon,
  disabled = false,
  loading = false,
  compact = false,
  accessibilityLabel,
}: {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: IconName;
  disabled?: boolean;
  loading?: boolean;
  compact?: boolean;
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
        (disabled || loading) && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === "primary" ? colors.white : colors.primary} />
      ) : (
        <>
          {icon ? <AppIcon name={icon} size={17} color={variant === "primary" || variant === "danger" ? colors.white : colors.primary} /> : null}
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
      <AppIcon name={icon} size={19} color={colors.textPrimary} />
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
  rating,
  reviews = 0,
  verified = false,
  available = true,
  distance,
  services = [],
  onPress,
}: {
  name: string;
  category: string;
  district: string;
  city: string;
  rating: number;
  reviews?: number;
  verified?: boolean;
  available?: boolean;
  distance?: string;
  services?: string[];
  onPress: () => void;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.artisanCard, pressed && styles.buttonPressed]}>
      <View style={styles.artisanCardHeader}>
        <View style={styles.artisanAvatar}>
          <Text style={styles.artisanAvatarText}>{initials}</Text>
        </View>

        <View style={styles.artisanMeta}>
          <Text style={styles.artisanName}>{name}</Text>
          <Text style={styles.artisanCategory}>{category}</Text>
        </View>

        {verified ? <Badge label="Vérifié" tone="success" /> : <Badge label="À vérifier" tone="warning" />}
      </View>

      <View style={styles.artisanStatsRow}>
        <View style={styles.artisanStat}>
          <AppIcon name="star" size={13} color={colors.accent} />
          <Text style={styles.artisanStatText}>{rating.toFixed(1)}</Text>
        </View>
        <View style={styles.artisanStat}>
          <AppIcon name="users" size={13} color={colors.textSecondary} />
          <Text style={styles.artisanStatText}>{reviews} avis</Text>
        </View>
        {distance ? (
          <View style={styles.artisanStat}>
            <AppIcon name="location" size={13} color={colors.textSecondary} />
            <Text style={styles.artisanStatText}>{distance}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.artisanTagRow}>
        {services.slice(0, 2).map((service) => (
          <View key={service} style={styles.artisanTag}>
            <Text style={styles.artisanTagText}>{service}</Text>
          </View>
        ))}
      </View>

      <View style={styles.artisanFooter}>
        <Text style={[styles.artisanAvailability, !available && styles.artisanAvailabilityMuted]}>
          {available ? "Disponible maintenant" : "Disponibilité limitée"}
        </Text>
        <Text style={styles.artisanCta}>Voir profil</Text>
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
  multiline = false,
  keyboardType = "default",
  autoCapitalize,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  helper?: string;
  multiline?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        style={[styles.input, multiline && styles.inputMultiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
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
  return (
    <View style={styles.searchField}>
      <AppIcon name="search" size={19} color={colors.textSecondary} />
      <TextInput
        accessibilityLabel={placeholder}
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        returnKeyType="search"
      />
    </View>
  );
}

export function ChoiceChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
    >
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
}: {
  items: readonly { label: string; icon: IconName; route: string }[];
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  return (
    <View style={styles.tabBar}>
      {items.map((item, index) => {
        const active = index === activeIndex;
        return (
          <Pressable
            key={item.route}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            onPress={() => onChange(index)}
            style={({ pressed }) => [styles.tabItem, active && styles.tabItemActive, pressed && styles.buttonPressed]}
          >
            <AppIcon name={item.icon} size={18} color={active ? colors.primary : colors.textSecondary} />
            <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
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
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.x4,
  },
  headingCopy: {
    flex: 1,
    gap: spacing.x2,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: typeScale.caption,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  pageTitle: {
    color: colors.textPrimary,
    fontSize: typeScale.heading,
    fontWeight: "700",
    lineHeight: 34,
  },
  pageSubtitle: {
    color: colors.textSecondary,
    fontSize: typeScale.body,
    lineHeight: 21,
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
    fontWeight: "700",
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
    backgroundColor: colors.primary,
  },
  button_secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  button_quiet: {
    backgroundColor: "transparent",
  },
  button_danger: {
    backgroundColor: colors.error,
  },
  buttonCompact: {
    minHeight: 38,
    paddingHorizontal: spacing.x3,
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  buttonPressed: {
    opacity: 0.78,
  },
  buttonText: {
    fontSize: typeScale.body,
    fontWeight: "700",
  },
  buttonText_primary: {
    color: colors.white,
  },
  buttonText_secondary: {
    color: colors.textPrimary,
  },
  buttonText_quiet: {
    color: colors.primary,
  },
  buttonText_danger: {
    color: colors.white,
  },
  buttonTextCompact: {
    fontSize: typeScale.caption,
  },
  iconButton: {
    width: 40,
    height: 40,
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
    borderRadius: radius.large,
    padding: spacing.x4,
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
    fontWeight: "600",
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
    fontWeight: "700",
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
  helper: {
    color: colors.textSecondary,
    fontSize: typeScale.caption,
    lineHeight: 17,
  },
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
  searchInput: {
    flex: 1,
    paddingVertical: spacing.x3,
    color: colors.textPrimary,
    fontSize: typeScale.body,
  },
  chip: {
    minHeight: 38,
    justifyContent: "center",
    paddingHorizontal: spacing.x3,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  chipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: typeScale.caption,
    fontWeight: "600",
  },
  chipTextSelected: {
    color: colors.primaryDark,
  },
  artisanCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.large,
    padding: spacing.x4,
    gap: spacing.x3,
  },
  artisanCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.x3,
  },
  artisanAvatar: {
    width: 50,
    height: 50,
    borderRadius: radius.large,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  artisanAvatarText: {
    color: colors.primaryDark,
    fontWeight: "800",
    fontSize: 18,
  },
  artisanMeta: {
    flex: 1,
  },
  artisanName: {
    color: colors.textPrimary,
    fontSize: typeScale.bodyLarge,
    fontWeight: "700",
  },
  artisanCategory: {
    color: colors.textSecondary,
    fontSize: typeScale.caption,
    marginTop: 2,
  },
  artisanStatsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.x2,
  },
  artisanStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.muted,
    borderRadius: radius.small,
    paddingHorizontal: spacing.x2,
    paddingVertical: 6,
  },
  artisanStatText: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: "700",
  },
  artisanTagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.x2,
  },
  artisanTag: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.x3,
    paddingVertical: 6,
  },
  artisanTagText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "700",
  },
  artisanFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.x2,
  },
  artisanAvailability: {
    color: colors.success,
    fontSize: 11,
    fontWeight: "700",
    flex: 1,
  },
  artisanAvailabilityMuted: {
    color: colors.textSecondary,
  },
  artisanCta: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 12,
  },
  emptyState: {
    alignItems: "center",
    padding: spacing.x8,
    gap: spacing.x3,
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
    fontWeight: "700",
  },
  emptyDescription: {
    maxWidth: 420,
    color: colors.textSecondary,
    fontSize: typeScale.body,
    lineHeight: 21,
    textAlign: "center",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.x4,
    paddingTop: spacing.x2,
    paddingBottom: spacing.x4,
    backgroundColor: "rgba(255,255,255,0.96)",
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.x2,
    borderRadius: radius.medium,
    gap: 4,
  },
  tabItemActive: {
    backgroundColor: colors.primarySoft,
  },
  tabIcon: {
    fontSize: 18,
    opacity: 0.8,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: "700",
  },
  tabLabelActive: {
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});