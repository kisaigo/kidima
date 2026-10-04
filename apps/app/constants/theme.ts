export const colors = {
  primary: "#176B55",
  primaryDark: "#0F4D3D",
  primarySoft: "#EAF4F0",
  background: "#F7F7F4",
  surface: "#FFFFFF",
  textPrimary: "#17201D",
  textSecondary: "#5E6B65",
  border: "#E4E8E5",
  accent: "#E8B34B",
  error: "#B42318",
  errorSoft: "#FCEDEC",
  success: "#287A5E",
  successSoft: "#E8F3ED",
  warning: "#875B0A",
  warningSoft: "#FFF5DF",
  info: "#285F83",
  infoSoft: "#EAF2F8",
  muted: "#F0F3F1",
  white: "#FFFFFF",
  focus: "#176B55",
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

export const typography = {
  display: { fontSize: 36, lineHeight: 42, fontWeight: "800" as const },
  h1: { fontSize: 28, lineHeight: 34, fontWeight: "800" as const },
  h2: { fontSize: 22, lineHeight: 28, fontWeight: "700" as const },
  h3: { fontSize: 18, lineHeight: 24, fontWeight: "700" as const },
  title: { fontSize: 16, lineHeight: 22, fontWeight: "700" as const },
  body: { fontSize: 14, lineHeight: 21, fontWeight: "400" as const },
  bodySmall: { fontSize: 13, lineHeight: 19, fontWeight: "400" as const },
  caption: { fontSize: 12, lineHeight: 17, fontWeight: "400" as const },
  label: { fontSize: 13, lineHeight: 18, fontWeight: "700" as const },
  button: { fontSize: 14, lineHeight: 20, fontWeight: "700" as const },
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
    shadowColor: "#17201D",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
} as const;

export const layout = {
  contentMax: 1160,
  readingMax: 760,
  detailMax: 960,
  navHeight: 64,
  pageGutter: spacing.x4,
  pageGutterWide: spacing.x8,
} as const;

export const breakpoints = {
  tablet: 760,
  desktop: 900,
  wide: 1200,
} as const;

export const contentWidth = layout.contentMax;
