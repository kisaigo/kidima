export const colors = {
  primary: "#1B604B",
  primaryDark: "#183A31",
  primarySoft: "#E8F0EA",
  primaryOnDark: "#DCE9E2",
  background: "#F5F4ED",
  surface: "#FFFEFA",
  textPrimary: "#183A31",
  textSecondary: "#58645D",
  border: "#E4E4DA",
  accent: "#F7C65C",
  borderOnDark: "rgba(255, 255, 255, 0.22)",
  error: "#A64236",
  errorSoft: "#F8E9E5",
  success: "#28674F",
  successSoft: "#E8F0EA",
  warning: "#875B0A",
  warningSoft: "#FBF1D8",
  info: "#385F70",
  infoSoft: "#EAF0F0",
  muted: "#F0F0E8",
  white: "#FFFFFF",
  focus: "#1B604B",
} as const;

export const spacing = {
  x1: 4,
  x2: 8,
  x3: 12,
  x4: 16,
  x5: 20,
  x6: 24,
  x8: 32,
  x10: 40,
  x12: 48,
  x16: 64,
} as const;

export const radius = {
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 20,
  pill: 999,
} as const;

/**
 * Palette de graisses volontairement limitée à trois valeurs.
 * Les écrans ne doivent jamais écrire de graisse littérale : ils passent par
 * ces tokens, ce qui rend la palette vérifiable d'un simple grep.
 */
export const fontWeights = {
  regular: "400",
  bold: "700",
  heavy: "800",
} as const;

export const typography = {
  display: { fontSize: 40, lineHeight: 48, fontWeight: fontWeights.heavy },
  h1: { fontSize: 32, lineHeight: 38, fontWeight: fontWeights.heavy },
  h2: { fontSize: 24, lineHeight: 30, fontWeight: fontWeights.bold },
  h3: { fontSize: 20, lineHeight: 26, fontWeight: fontWeights.bold },
  title: { fontSize: 17, lineHeight: 24, fontWeight: fontWeights.bold },
  body: { fontSize: 15, lineHeight: 23, fontWeight: fontWeights.regular },
  bodySmall: { fontSize: 14, lineHeight: 20, fontWeight: fontWeights.regular },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: fontWeights.regular },
  label: { fontSize: 13, lineHeight: 18, fontWeight: fontWeights.bold },
  // Rôle unique pour les sur-titres de section, afin d'éviter la dérive des
  // valeurs d'interlettrage recopiées d'un écran à l'autre.
  eyebrow: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: fontWeights.bold,
    letterSpacing: 0.8,
  },
  button: { fontSize: 14, lineHeight: 20, fontWeight: fontWeights.bold },
} as const;

// Backwards-compatible aliases while routes migrate to the semantic type scale.
export const typeScale = {
  caption: typography.caption.fontSize,
  label: typography.label.fontSize,
  body: typography.body.fontSize,
  bodyLarge: typography.title.fontSize,
  title: typography.h2.fontSize,
  heading: typography.h1.fontSize,
  display: typography.display.fontSize,
} as const;

export const iconSizes = {
  small: 16,
  medium: 20,
  large: 24,
  touchTarget: 44,
} as const;

export const shadows = {
  subtle: {
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.035,
    shadowRadius: 8,
    elevation: 1,
  },
  floating: {
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 3,
  },
} as const;

export const layout = {
  contentMax: 1160,
  readingMax: 760,
  detailMax: 960,
  navHeight: 64,
  headerHeight: 68,
  pageGutter: spacing.x4,
  pageGutterWide: spacing.x8,
} as const;

export const breakpoints = {
  tablet: 760,
  desktop: 900,
  wide: 1200,
} as const;

export const contentWidth = layout.contentMax;
