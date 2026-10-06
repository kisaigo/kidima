# Rapport final — refonte de l'interface (apps/app + apps/admin)

Périmètre : **frontend uniquement**. Aucun backend, aucune API réelle, aucune base de données,
aucune authentification réelle, aucun contrat d'API inventé. Toutes les données affichées sont
des exemples locaux, centralisés et explicitement étiquetés.

État : les écrans sont fonctionnels et cohérents, **mais l'application n'est pas « prête pour la
production »** tant que les données restent simulées et qu'aucune persistance n'existe.

---

## 1. Écrans modifiés

| Route | Fichier | Nature de la modification |
| --- | --- | --- |
| `/` | `app/index.tsx` | Accueil : introduction dédiée dans un bloc d’accueil, recherche et CTA regroupés, filtres par métier, jusqu'à 4 fiches d'exemple, grille sur tablette/desktop, transparence sur les données fictives. Aucune image externe. |
| `/artisans` | `app/artisans.tsx` | Recherche texte + filtres « métier » et « quartier », compteur honnête « N profils d'exemple », grille responsive, mention d'absence d'avis/disponibilité/vérification, espace mobile réservé sous les onglets. |
| `/artisan/[slug]` | `app/artisan/[slug].tsx` | Fiche profil d'exemple, encart « fiche fictive », panneau d'informations explicitement non renseignées (avis et note, disponibilité, vérification, tarifs et horaires), CTA de demande transmettant le contexte (profil + métier), marge mobile sous la navigation fixe. |
| `/demande` | `app/demande.tsx` | Assistant en 6 étapes (métier → service → lieu → moment → coordonnées fictives → récapitulatif), validation par étape, barre d'action collante, gestion du safe-area, avertissement « prototype local, aucun envoi ». |
| `/demandes` | `app/demandes.tsx` | « Mon activité » : onglets Demandes / Devis, liste puis détail en ligne (statuts, historique), rappel « données de démonstration », marge mobile sous la navigation fixe. |
| `/reclamations` | `app/reclamations.tsx` | Filtres par statut, liste et détail, historique illustratif, mention « aucun signalement n'a été envoyé », marge mobile sous la navigation fixe. |
| `/profil` | `app/profil.tsx` | Compte unique de démonstration, deux colonnes (activité / suivi), activation du mode artisan sur le **même** compte, accès à `/demandes` et `/reclamations`. |
| `/pro` | `app/pro.tsx` | Espace professionnel intégré au compte unique : Vue d'ensemble, Profil professionnel, Services (ajout et activation temporaires en mémoire), Disponibilités, Demandes reçues, Devis envoyés ; marge mobile sous la navigation fixe. |
| `/menu` | `app/menu.tsx` | Converti en redirection vers `/profil` (route conservée pour les anciens liens, retirée de la navigation). |
| `/book` | `app/book.tsx` | Converti en redirection vers `/demande`, avec transmission des paramètres. |
| `/dashboard` | `app/dashboard.tsx` | **Supprimé** (doublon de `/demandes`). |
| — | `app/_layout.tsx` | `SafeAreaProvider` + `AccountProvider` + `Stack`, en-têtes alignés sur le design system. |
| — | `app/+html.tsx` | **Nouveau** : document web (`lang="fr"`, fond, `focus-visible`, `prefers-reduced-motion`, titres). |
| — | `apps/admin/index.html` | Réécrit : variables du design system, points de rupture 1000/680/360, bannière de démonstration, données préfixées `EXEMPLE-` / `DÉMO`, « sans données connectées ». |

Aucun écran d'administration n'est exposé dans la navigation utilisateur.
Les en-têtes des écrans listés ci-dessus ne sont plus dupliqués : ils passent tous par l'unique
composant `PageHeading` (voir §2 et §10).

## 2. Composants créés

- `components/icons.tsx` — famille d'icônes **unique** (Lucide), type `IconName`, composant `AppIcon` (masqué aux lecteurs d'écran).
- `components/navigation.tsx` — `AppNavigation` : barre supérieure au-delà de 760 px, barre d'onglets inférieure en dessous, padding de safe-area, masquable (`showBottomTabs`).
- `data/mock-workflows.ts` — demandes, devis et réclamations d'exemple (types + libellés fictifs).
- `data/mock-professional.ts` — profil professionnel, services et jours d'exemple.
- `components/ui.tsx` — enrichi : `ArtisanCard` avec `layout` (`row` / `grid`), `BottomTabBar` avec `style`, recours systématique aux tokens (`iconSizes`, `typography`), suppression des propriétés fabriquées (note, distance, vérification, disponibilité).
- **`PageHeading`** (sur-titre, titre, sous-titre et action) : le composant existait dans `ui.tsx` mais **n'était utilisé par aucun écran**, chacun recopiant son propre en-tête. Il est désormais branché sur les 7 écrans concernés et aligné sur les tokens (`typography.eyebrow`, `typography.h1`, `typography.body`), ce qui a supprimé **27 déclarations de style locales**.
- `components/layout.tsx` — styles partagés : `screenStyles` (`root`, `scroll`, `back`, `backText`, `body`, `helper`, `caption`) et les fabriques `screenContent()` / `screenContentWide()` (largeur maximale, rembourrage vertical, `gap`). Les écrans référencent ces styles partagés ; plus aucun ne redéfinit ces styles.

## 3. Design system

Source unique de vérité : `constants/theme.ts`.

- **Couleurs** : `primary`, `primaryDark`, `primarySoft`, `background`, `surface`, `textPrimary`, `textSecondary`, `border`, `accent`, `error` / `errorSoft`, `success` / `successSoft`, `warning` / `warningSoft`, `info` / `infoSoft`, `muted`, `white`, `focus`.
- **Espacements** : `x1` → `x16` (4 → 64).
- **Rayons** : `small` 8, `medium` 12, `large` 16, `xlarge` 20, `pill` 999.
- **Typographie sémantique** : `display`, `h1`, `h2`, `h3`, `title`, `body`, `bodySmall`, `caption`, `label`, `eyebrow`,
  `button` (+ alias `typeScale` pour la migration).
- **Graisses** : `fontWeights` est limité à **trois** valeurs — `regular` (400), `bold` (700), `heavy` (800).
  Aucun écran n'écrit de graisse littérale : elles passent toutes par ces tokens, ce qui rend la palette
  vérifiable d'un simple `grep`.
- **Icônes** : `iconSizes` (small 16, medium 20, large 24, touchTarget 44).
- **Élévation** : `shadows.subtle` uniquement.
- **Mise en page** : `contentMax` 1160, `readingMax` 760, `detailMax` 960, `navHeight` 64, `pageGutter` 16, `pageGutterWide` 32.
- **Points de rupture** : `tablet` 760, `desktop` 900, `wide` 1200.

Règles appliquées : une seule famille d'icônes, tokens sémantiques au lieu de valeurs arbitraires,
pas de dégradé décoratif ni de grande ombre, pas d'indicateur inventé (note, avis, année
d'expérience, disponibilité, vérification, tarif).

## 4. Responsive

- Mobile (< 760 px) : barre d'onglets inférieure, contenu en une colonne, cartes pleine largeur.
- Tablette (≥ 760 px) : barre supérieure, grilles à 2 colonnes (`flexBasis` 48 % + `flexWrap`).
- Desktop (≥ 900 px) : grilles élargies, colonnes latérales, `maxWidth` de contenu.
- Large (≥ 1200 px) : contenu centré plafonné à 1160 px.
- Document web (`+html.tsx`) : `lang="fr"`, `theme-color`, anneau de focus visible, respect de
  `prefers-reduced-motion`, titre par page.

**Vérification réelle effectuée** : audit statique — aucun `width`/`minWidth` fixe supérieur à
72 px (avatars, pastilles), toutes les grilles utilisent `flexWrap`, tous les conteneurs de page
sont `width: "100%"` + `maxWidth` + `alignSelf: "center"`.

**Vérification NON effectuée** : contrôle visuel automatisé aux largeurs 320 / 360 / 390 / 430 /
768 / 1024 / 1440 px. Motif : aucun outil de test navigateur n'est présent dans le dépôt
(pas de Playwright, pas de Puppeteer) et le mode `--dump-dom` de Chrome headless se bloque sur
cette machine. Aucune dépendance n'a été ajoutée pour y remédier. Un passage manuel reste à faire
(Chrome est installé) : `npm run export:web` puis servir `apps/app/dist`.

## 5. Accessibilité

- Cibles tactiles ≥ 44 px (`minHeight` 44 / 46 / 48, `iconSizes.touchTarget` 44).
- `accessibilityRole`, `accessibilityLabel` et `accessibilityState` sur les éléments interactifs
  (onglets, cases, interrupteurs, boutons, liens).
- Statuts jamais exprimés par la couleur seule : chaque pastille porte un libellé textuel.
- Anneau de focus visible (`:focus-visible`, 2 px, couleur `focus`) sur le web.
- `prefers-reduced-motion` respecté côté web.
- Contrastes renforcés (`textSecondary` `#5E6B65`, `error` `#B42318`, `warning` `#875B0A`,
  `info` `#285F83`).
- Filtres admin de démonstration accessibles au clavier, combinables et accompagnés d’un état « aucun résultat ».

Limites : aucun audit automatisé (axe / Lighthouse) et aucun test avec lecteur d'écran réels
n'ont été réalisés ; le comportement du focus sur iOS / Android n'a pas été vérifié sur appareil.

## 6. UX

- Règle métier respectée : **une personne = un compte**. Le mode artisan est une option du même
  compte (`artisanEnabled`), jamais un second compte ni une fiche publique réelle.
- Chaque écran contenant des données simulées affiche un avertissement explicite (fictif,
  démonstration, aucun envoi, aucun dossier réel).
- Assistant de demande : validation étape par étape, récapitulatif final, retour au contexte
  depuis une fiche artisan.
- Accueil : hiérarchie dédiée (lieu, promesse, recherche, action), recherche clairement reliée aux
  profils d’exemple filtrés, catégories expliquées et rappel explicite qu’aucune demande réelle n’est envoyée.
- Navigation mobile : espace de fin de contenu harmonisé avec la barre d’onglets fixe pour éviter
  que le dernier résultat ou la dernière action soit masqué sur les listes, la fiche artisan, le profil et l’espace pro.
- Espace professionnel : ajout et activation/désactivation de services fictifs temporairement en mémoire, avec libellé requis et mention de non-persistance ; l’aperçu public conduit aux profils d’exemple au lieu d’une fiche arbitraire.
- Assistant de demande : l’action Continuer reste accessible même si l’étape est incomplète, afin que la validation explicite annoncée puisse s’afficher.
- Maquette admin : recherche de profil et filtre d’état combinables, avec retour explicite lorsqu’aucune ligne ne correspond.
- États vides soignés (« Profil introuvable ») et cohérence de navigation sur tous les écrans.
- Suppression assumée de tous les faux signaux de confiance précédemment affichés (note, avis,
  distance, vérification, disponibilité, tarifs).

## 7. Éléments encore mockés

Toute la donnée provient de fichiers locaux ; **aucune requête réseau n'existe**.

| Source | Contenu simulé |
| --- | --- |
| `data/artisans.ts` | 5 profils fictifs (`demo: true`), quartier « Quartier d'exemple », catégories de métiers. |
| `data/mock-workflows.ts` | Demandes `EXEMPLE-*`, devis associés, réclamations avec historique « illustratif ». |
| `data/mock-professional.ts` | Profil professionnel, 2 services (« Service de démonstration A / B »), jours d'exemple. |
| `contexts/account.tsx` | Compte de démonstration en mémoire, activable en mode artisan. **Réinitialisé à chaque rechargement.** |
| `app/+html.tsx` | Attributs de document web uniquement. |
| `apps/admin/index.html` | Maquette statique, données préfixées `EXEMPLE-` / `DÉMO`, aucune action réelle. |

Conséquences explicites : rien n'est enregistré, aucune notification n'est envoyée, les saisies de
l'assistant et les réglages de l'espace professionnel ne vivent que dans la session en cours, et
les écrans perdent leur contenu au rechargement de la page.

## 8. Validations

| Contrôle | Commande | Résultat |
| --- | --- | --- |
| Typecheck | `npm run typecheck:app` | **exit 0** (`tsc --noEmit`) |
| Lint | `npm run lint:app` | **exit 0** (`expo lint`, 0 avertissement) |
| Export web | `npm run export:web` | **exit 0** — 12 routes statiques + `/artisan/[slug]` |
| Dépendances | `expo install --check` | « Dependencies are up to date » |
| Espaces | `git diff --check` | **propre** (aucune erreur de fin de ligne / d'espace) |
| Lockfiles | `git diff --stat -- package-lock.json apps/app/package-lock.json` | **inchangés** |

Contrôles supplémentaires sur le build exporté (`apps/app/dist`) :

- Aucun emoji, aucune note chiffrée, aucun `/5`, aucune année d'expérience, aucun kilométrage,
  aucun statut de vérification, aucun téléphone ou e-mail réels dans les pages générées.
- Avertissements de démonstration présents sur les pages qui affichent des données simulées.
- Titres de document renseignés et distincts par page (`Kidima — Trouver un artisan pour vos
  projets`, `Trouver un artisan — Kidima`, `Mon activité — Kidima`, `Nouvelle demande — Kidima`,
  `Mon compte — Kidima`, `Espace professionnel — Kidima`, `Mes réclamations — Kidima`) et
  `meta description` sur l'accueil.

État Git : 9 fichiers modifiés et 1 fichier ajouté (`apps/app/app/+html.tsx`) non commités dans
cette itération ; le reste de la refonte est déjà dans le commit `e9fe800`.
(`docs/skills.md` est un fichier non suivi préexistant, sans lien avec cette refonte.)

## 9. Risques restants

1. **Aucune régression visuelle automatisée.** Un test de rendu (Playwright) serait nécessaire ;
   il n'est pas installé et aucune dépendance n'a été ajoutée volontairement.
2. **Revue responsive manuelle non faite** aux largeurs 320 / 360 / 390 / 430 / 768 / 1024 /
   1440 px (voir §4 pour la méthode et le blocage rencontré).
3. **Aucune persistance** : compte, demandes et réglages professionnels disparaissent au
   rechargement. À ne surtout pas présenter comme un état application réel.
4. **Routes typées** : les navigations dynamiques utilisent des casts (`as never`) ; un renommage
   de route ne sera pas détecté par le compilateur à cet endroit.
5. **Titres web uniquement** : `expo-router/head` s'applique au web ; la plupart des écrans sont en
   `headerShown: false`, donc pas d'en-tête natif.
6. **Vues imbriquées sans route dédiée** : le détail d'une demande et l'onglet Devis s'affichent en
   ligne dans `/demandes` — pas de lien profond possible vers ces sous-vues.
7. **Pas de squelettes de chargement ni d'animations** : choix assumé en l'absence de backend, mais
   la partie « états de chargement / mouvement » du brief n'est donc que partiellement couverte.
8. **Accessibilité non testée en conditions réelles** (lecteur d'écran, appareils physiques).
9. **Nettoyage à prévoir** : la donnée simulée n'est distinguée que par convention (`demo: true`,
   préfixes `EXEMPLE-`) ; rien n'empêche techniquement son usage après branchement d'une API.

---

## 10. Audit croisé avec le skill `mobile-app-ui-design`

Skill communautaire installé dans `.agents/skills/mobile-app-ui-design`
(`npx skills add ceorkm/mobile-app-ui-design` — analyse de sécurité : risque faible, 0 alerte).
Fichiers ajoutés par l'installation, non suivis par Git : `.agents/`, `.claude/skills/`
(symlink) et `skills-lock.json` — à committer ou à ignorer selon la convention de l'équipe.

### Déjà conforme

- Grille d'espacement : toutes les valeurs sont divisibles par 4 (4, 8, 12, 16, 20, 24, 32, 40, 48, 64).
- Une seule famille d'icônes, hiérarchie typographique sémantique, pas de valeur arbitraire.
- Règle 60/30/10 : neutre (fond et surfaces) dominant, vert principal en accent.
- Cibles tactiles ≥ 44 px, focus visible, états vides renseignés.
- Sélection par puces plutôt que saisie libre (métier, quartier, moment).

### Corrections appliquées

- **Rôle `typography.eyebrow`** ajouté et appliqué sur les 7 écrans qui recopiaient le style de
  sur-titre avec un interlettrage dérivant de 0,7 à 1 sans justification.
- **Ombre teintée** : `shadows.subtle` utilise désormais `colors.primaryDark` au lieu d'un noir
  neutre, conformément à la règle « tinted shadows ».
- **États vides transformés en points de reprise** : 4 états vides laissaient l'utilisateur
  bloqué et ont reçu une action (« Réinitialiser la recherche », « Réinitialiser les filtres »,
  « Voir toutes les réclamations », « Voir mes demandes d'exemple »).
- **Palette typographique ramenée à 3 graisses** : le produit utilisait 4 graisses (400, 600,
  700, 800) ; `600` a été supprimé au profit de `700`. La règle est désormais portée par le token
  `fontWeights` et aucun littéral ne subsiste hors de `constants/theme.ts`.
  Vérification sur les 12 pages exportées : seules 400 / 700 / 800 sont appliquées, `200` / `500` /
  `600` / `bold` ne sont que des classes déclarées par la feuille de style de React Native Web et
  ne portent sur **aucun** élément. Côté `apps/admin`, `600` et un `650` isolé ont été ramenés à `700`.
  Aucune sémantique perdue : les libellés qui étaient en 600 (pastilles, puces, libellés de
  navigation, valeurs de récapitulatif, titres d'historique) sont des textes d'emphase, et la
  sélection d'une puce n'a jamais reposé sur la graisse (bordure + fond + couleur +
  `accessibilityState`).
- **En-tête de page factorisé** : les 7 écrans redéfinissaient chacun leur sur-titre, titre et
  sous-titre (27 déclarations de style au total, dont un `header` avec des valeurs de `gap`
  divergentes). Ils passent maintenant par l'unique composant `PageHeading`. La graisse, les
  tailles et l'interlettrage des trois niveaux viennent des tokens : un changement d'en-tête
  n'est plus à répercuter sept fois.
  Vérification sur l'export : les 12 pages conservent leurs textes d'en-tête, sans doublon, et les
  7 titres de page sont rendus avec le token `h1` (graisse 800).
  **Un changement de rythme assumé** : sur l'accueil, le texte d'introduction (ancien `intro`
  propre à l'écran, 20 px sous l'en-tête) devient le `subtitle` du composant, donc à 8 px du
  titre — soit exactement le rythme des six autres écrans.

### Divergences assumées — le brief Kidima prime

- **Emoji, dégradés, glassmorphism, halos lumineux** : recommandés par le skill pour la
  personnalité et l'effet « premium ». Interdits ici (pas d'emoji, pas de dégradé décoratif,
  pas d'ombre lourde).
- **Signaux de confiance (avis, notes, estimations)** : recommandés pour l'e-commerce. Interdits
  ici : aucune note, aucun avis, aucun statut de vérification ne peut être inventé.
- **Avatars photo** : le skill privilégie les vraies photos ; les profils étant fictifs, on
  n'affiche que des initiales — pas de fausse photo de personne.
- **Fin « célébratoire » (Peak-End)** : le skill veut une célébration de réussite. La demande
  n'étant jamais envoyée, l'écran final reste factuel (« Rien n'a été envoyé ») : célébrer
  reviendrait à mentir. Le récapitulatif joue néanmoins le rôle de fermeture. À revoir avec un
  vrai backend.
- **Padding de carte de 24-32 px et padding de section de 80-96 px** : baseline web du skill ;
  16 px et 40-64 px conservés, plus justes sur mobile.

### Factorisation des styles de structure

`root`, `scroll`, `back`, `backText`, `body`, `helper`, `caption`, `content` et `contentWide` étaient recopiés dans les
8 écrans, avec des valeurs qui avaient dérivé : `content` en `gap` 4 ou 5, `paddingBottom` 16 / 40 /
64 / 144, `body` en 13 ou 14, `helper` en 12 ou 13, `paddingHorizontal` de `contentWide` présent ou absent. Ils vivent
désormais dans `components/layout.tsx` ; aucun écran ne redéfinit plus ces styles.

`helper` est désormais uniforme à 13 px (`typography.bodySmall`) dans les écrans et dans le composant
`Field` ; `caption` reste uniformément à 12 px (`typography.caption`) pour les libellés courts et
métadonnées. Les deux rôles ont chacun un style partagé (`screenStyles.helper` / `screenStyles.caption`),
plutôt que des styles locaux identiques ou des aides qui rapetissaient selon l'écran.

Vérification menée en comparant, écran par écran, la définition d'origine et la définition
partagée, puis en comparant les valeurs **effectives** du conteneur (tokens résolus, raccourci
`padding` déployé en quatre côtés, `content` fusionné avec `contentWide` comme le fait React Native).

Résultat : **24 styles partagés repris à l'identique** (seule différence de forme, une virgule
finale) et **deux changements volontaires**, tous deux signalés ici :

1. **`body` unifié sur `typography.body`** — les écrans `demandes`, `pro` et `profil` utilisaient
   `typography.bodySmall` (13 px) là où la fiche artisan et les réclamations utilisaient
   `typography.body` (14 px). Le style s'appelle `body` et le token correspondant vaut 14 px :
   ces trois écrans passent donc à 14 px. L'alternative (tout ramener à 13 px) aurait rapetissé
   les deux autres écrans.
2. **Gouttière horizontale en desktop** — sur la fiche artisan (`/artisan/[slug]`) et l'assistant
   (`/demande`), elle passe de 16 à 32 px. Ces deux écrans étaient les seuls à ne pas élargir la
   gouttière au-delà de 760 px, alors que tous leurs équivalents (même largeur maximale) le font ;
   la factorisation a rendu cet écart visible. Le comportement précédent se rétablit en passant la
   gouttière souhaitée à `screenContentWide`.

Tout le reste est strictement inchangé, y compris les `paddingBottom` spécifiques (`spacing.x16 + 80`
de l'assistant, `spacing.x16 + layout.navHeight` du profil).

### Points du skill non couverts (et pourquoi)

- **Animations, micro-interactions, squelettes de chargement** : rien à animer tant qu'aucun
  appel asynchrone n'existe ; à traiter avec le branchement du backend.
- **Recherche « intelligente » (recherches récentes, tendances)** : les puces de métiers visibles
  sous le champ jouent déjà ce rôle, et inventer des « tendances » serait un faux signal.
- **Mode sombre / thèmes** : hors périmètre du brief.
