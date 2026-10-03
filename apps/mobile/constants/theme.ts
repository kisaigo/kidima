export const colors = {
  primary: "#176B55",
  primaryDark: "#0F4D3D",
  primarySoft: "#EAF4F0",
  background: "#F7F7F4",
  surface: "#FFFFFF",
  textPrimary: "#17201D",
  textSecondary: "#68746F",
  border: "#E4E8E5",
  accent: "#F2B84B",
  error: "#D94F4F",
  errorSoft: "#FCEDEC",
  success: "#287A5E",
  warning: "#A76E12",
  warningSoft: "#FFF5DF",
  muted: "#F0F3F1",
  white: "#FFFFFF",
} as const;

export const spacing = {
  x1: 4,
  x2: 8,
  x3: 12,
  x4: 16,
  x6: 24,
  x8: 32,
  x12: 48,
  x16: 64,
} as const;

export const radius = {
  small: 6,
  medium: 10,
  large: 14,
  pill: 999,
} as const;

export const typeScale = {
  caption: 12,
  body: 14,
  bodyLarge: 16,
  title: 20,
  heading: 28,
  display: 34,
} as const;

export const contentWidth = 1160;