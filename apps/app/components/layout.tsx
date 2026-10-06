import type { TextStyle, ViewStyle } from "react-native";
import { colors, layout, spacing, typography } from "../constants/theme";

/**
 * Styles de structure partagés par les écrans.
 *
 * Ils étaient recopiés dans chaque écran, avec des valeurs qui avaient dérivé
 * (`content` en `gap` 4 ou 5, `paddingBottom` 16 / 40 / 64, `body` en 13 ou 14).
 * Ils sont désormais définis une seule fois.
 *
 * Ce sont volontairement des objets simples (et non un `StyleSheet.create`) :
 * chaque écran les référence dans son propre `StyleSheet.create`, ce qui évite
 * d'imbriquer des identifiants de feuilles de style. Les types `ViewStyle` /
 * `TextStyle` sont explicites pour que cette imbrication reste typée.
 */
export const screenStyles = {
  root: {
    flex: 1,
    backgroundColor: colors.background,
  } satisfies ViewStyle,
  scroll: {
    flexGrow: 1,
  } satisfies ViewStyle,
  back: {
    minHeight: 44,
    justifyContent: "center",
    alignSelf: "flex-start",
  } satisfies ViewStyle,
  backText: {
    ...typography.label,
    color: colors.primary,
  } satisfies TextStyle,
  body: {
    ...typography.body,
    color: colors.textSecondary,
  } satisfies TextStyle,
  helper: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  } satisfies TextStyle,
  caption: {
    ...typography.caption,
    color: colors.textSecondary,
  } satisfies TextStyle,
};

/**
 * Colonne de contenu centrée et plafonnée à une largeur maximale.
 *
 * - `maxWidth` : `layout.readingMax` par défaut (colonnes étroites), à remplacer
 *   par `layout.contentMax` pour les écrans à grille ou à colonnes multiples.
 * - `top` / `bottom` : rembourrage vertical ; `bottom` doit être augmenté sur les
 *   écrans dont le bas est masqué par la barre d'onglets ou une barre d'action.
 * - `gap` : espacement entre les blocs de la page.
 */
export function screenContent({
  maxWidth = layout.readingMax,
  top = layout.pageGutter,
  bottom = layout.pageGutter,
  gap = spacing.x4,
}: {
  maxWidth?: number;
  top?: number;
  bottom?: number;
  gap?: number;
} = {}) {
  return {
    width: "100%" as const,
    maxWidth,
    alignSelf: "center" as const,
    padding: layout.pageGutter,
    paddingTop: top,
    paddingBottom: bottom,
    gap,
  };
}

/**
 * Élargissement appliqué au-delà du point de rupture desktop : gouttière plus
 * large, plus de respiration en haut et, au besoin, largeur maximale relevée.
 */
export function screenContentWide({
  maxWidth,
  top = spacing.x8,
}: {
  maxWidth?: number;
  top?: number;
} = {}) {
  return {
    ...(maxWidth === undefined ? {} : { maxWidth }),
    paddingHorizontal: layout.pageGutterWide,
    paddingTop: top,
  };
}
