# Kidima — Design system

**Portée :** application Expo / React Native / Web et maquette admin séparée. Le produit reste une démonstration frontend : les parcours locaux ne créent, ne transmettent ni ne conservent de données métier.

## Direction produit

Kidima aide à trouver un artisan local et à préparer clairement un besoin. Les trois intentions prioritaires sont : **trouver un artisan**, **préparer une demande**, **gérer son activité artisan depuis le même compte**.

La direction visuelle est un **minimalisme fonctionnel chaleureux** : ivoire, vert profond, surfaces calmes, une touche de jaune, peu d’ornements et des actions sans ambiguïté. Chaque page met en avant un objectif et une action principale. La confiance se construit par la transparence et la lisibilité, jamais par de faux avis, badges, tarifs, disponibilités ou statistiques.

L’analyse UI UX Pro Max pour Kidima a convergé vers des recommandations de marketplace locale / services à domicile : minimalisme fonctionnel, recherche et catégories visibles, pages de profil simples, formulaires progressifs, cibles tactiles adaptées, focus clavier visible et réduction des mouvements. Les propositions génériques de palette bleue/orange ou de preuve sociale ont été écartées au profit de la marque existante et de l’exigence de données véridiques. Les conseils du skill mobile préinstallé confortent la zone de confort tactile, la hiérarchie compacte et des états vides qui aident à poursuivre.

## Identité et tokens

Source TypeScript : `apps/app/constants/theme.ts`. Les valeurs ci-dessous sont les correspondances sémantiques de l’identité, pas une nouvelle palette à appliquer mécaniquement.

| Rôle | Token(s) | Valeur |
|---|---|---|
| Marque profonde | `brand950` | `#102A23` |
| Texte profond / marque | `brand900`, `primaryDark` | `#183A31` |
| Primaire Kidima | `brand800`, `primary` | `#1B604B` |
| Vert profond clair | `brand700` | `#24745A` |
| Vert moyen | `brand600` | `#2E8567` |
| Vert lumineux | `brand500` | `#3F9878` |
| Vert très clair | `brand100`, `brand50`, `primarySoft` | `#DCE9E2`, `#E8F0EA` |
| Accent Kidima | `accent500`, `accent` | `#F7C65C` |
| Accent sombre / fonds | `accent600`, `accent100`, `accent50` | `#8A610E`, `#FBECC5`, `#FCF6E8` |
| Neutres | `neutral950` → `neutral50` | `#18211D`, `#35413B`, `#58645D`, `#7A847F`, `#C7CBC5`, `#E4E4DA`, `#F0F0E8`, `#FFFEFA` |
| Fond / surface | `background`, `surface` | `#F5F4ED`, `#FFFEFA` |
| État | `success`, `warning`, `error`, `info` + variantes soft | couleurs sémantiques, discrètes, toujours accompagnées d’un libellé |
| Focus | `focus` | `#1B604B` |

Le jaune sert aux CTA principaux ou aux mises en relief contextuelles, jamais à décorer tous les panneaux. Les couleurs d’état ne remplacent pas un libellé textuel. Mesurer les contrastes effectifs sur appareil/navigateur avant une mise en production.

## Typographie

- Famille : `fontFamily.sans` (`System`), sans téléchargement de fonte et avec couverture iOS/Android/Web.
- Échelle : `display`, `h1`, `h2`, `h3`, `title`, `body`, `bodySmall`, `caption`, `label`, `eyebrow`, `button` dans `typography`.
- Graisses partagées : `regular` 400, `bold` 700, `heavy` 800.
- Préférer les retours à la ligne à la troncature ; ne pas imposer de hauteur fixe au contenu textuel.
- Les champs Web passent à 16 px sur petit écran pour éviter le zoom automatique des navigateurs mobiles.

## Rythme et mise en page

- Espacement : `spacing.x1` à `x16` — 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 px.
- Rayons : 8 / 12 / 16 / 20 px (`small` à `xlarge`), pilule réservée aux contrôles qui en ont le sens.
- Largeurs : `readingMax` 720 px, `detailMax` 960 px, `contentMax` 1200 px.
- Gouttières : 16 px par défaut, 32 px en largeur.
- Élévation : `shadows.subtle` pour une séparation légère, `floating` pour les CTA flottants seulement ; privilégier bordures et surfaces.
- Bordures : tokens `borders.width`, `focusWidth`, `focusOffset`.
- Opacité, superposition et mouvement : `opacity`, `zIndex` et `motion` (`fast` 140 ms, `standard` 200 ms, `slow` 300 ms).
- Les animations non essentielles doivent respecter `prefers-reduced-motion`; aucune animation n’est nécessaire au bon fonctionnement d’un parcours.

## Primitives et composants partagés

Implémentation actuelle dans `apps/app/components/ui.tsx` et `components/navigation.tsx` :

- Navigation : `AppNavigation`, `TopAppNav`, `BottomTabBar` — 5 destinations principales ; `/pro` reste une navigation secondaire.
- Structure : `PageContainer`, `PageHeading`, `SectionHeading`, `Surface`, `Divider` et helpers `screenContent`.
- Actions : `Button` (primary, secondary, ghost, danger), `IconButton`; cible visuelle d’au moins 44 px, nom accessible pour les contrôles icône seule.
- Saisie : `Field`, `SearchField`, `ChoiceChip`; label visible, état focus et erreur affichée près du champ.
- Contenu : `ArtisanCard`, `Badge`, `EmptyState`, `AppIcon` (Lucide uniquement).

Réutiliser les composants existants avant d’en créer un autre. Ajouter un état de chargement uniquement quand une opération asynchrone réelle le justifie. Toute action locale qui pourrait paraître enregistrée doit expliquer son caractère temporaire.

## Navigation et responsive

- Mobile : navigation inférieure à cinq destinations avec icône, libellé et état actif ; espace réservé au contenu sous les éléments fixes et prise en compte des safe areas.
- Filtres mobiles : bouton explicite et panneau modal en bas, contenu scrollable, remise à zéro et action d’application.
- Demande : une étape visible à la fois ; indicateur compact, retour et action principale fixe uniquement quand cela aide le parcours.
- Tablette et desktop : barre supérieure, contenu centré et plafonné ; grilles seulement si les éléments conservent une largeur lisible.
- Cas cibles à vérifier visuellement : 320, 360, 375, 390, 430, 768, 1024, 1280 et 1440 px, orientation paysage et agrandissement du texte.

## Accessibilité et interaction

- Utiliser les rôles React Native/Web correspondants : bouton, lien, radio, checkbox, tablist, titres.
- Fournir nom, état sélectionné/activé et retour visible pour les interactions ; masquer l’icône décorative lorsque le contrôle possède déjà un nom descriptif.
- Conserver un focus clavier visible, des cibles de toucher d’au moins 44 px et un espacement évitant les erreurs de sélection.
- Associer les erreurs au champ concerné et annoncer leur apparition sans déplacer le focus de manière inattendue.
- Les filtres d’un seul choix exposent une sélection radio ; les catégories de l’accueil restent des boutons indépendants car l’absence de sélection est valide.
- Garder l’ordre de lecture identique à l’ordre visuel ; permettre le zoom et l’agrandissement de texte.
- Vérifier le contraste WCAG AA des paires réellement rendues. L’audit statique ne remplace pas l’essai avec un lecteur d’écran ni le test sur appareils.

## Données, contenu et états

Toutes les données de `apps/app/data` sont des exemples locaux. Une demande prévisualisée n’est pas envoyée. Les modifications professionnelles sont temporaires. Ne pas présenter comme réels des prix, disponibilités, coordonnées, vérifications, statistiques ou contacts fictifs. Les informations manquantes sont dites indisponibles ou non renseignées.

Un état vide indique quoi faire ensuite. Une erreur décrit le problème et comment reprendre. Un indicateur de réussite doit décrire le succès réel : dans la démonstration, parler d’aperçu terminé et rappeler qu’aucune transmission n’a eu lieu.

## Maquette admin

`apps/admin/index.html` est une maquette isolée, sans authentification, base de données ni autorisations. Elle reprend l’ivoire, le vert, l’accent mesuré, des tableaux plus denses et des états d’exemple clairement identifiés. Aucune action admin affichée ne peut être interprétée comme réellement exécutée. Le backend futur devra protéger séparément les rôles et journaliser les opérations.

## Anti-patterns à éviter

- Notes, avis, badges de vérification, délais, disponibilité, distances, prix, statistiques ou preuve sociale inventés.
- Faux workflow, faux envoi, faux enregistrement ou action admin qui semble avoir réussi.
- Plusieurs CTA primaires concurrents, pages remplies de cartes, badges purement décoratifs, icônes sans rôle.
- Dégradés/glassmorphism omniprésents, ombres lourdes, rayons identiques et excessifs.
- Troncature de textes utiles, zones interactives sous-dimensionnées, navigation qui masque le contenu.
- Dépendance à la couleur seule, au hover, à une photo non autorisée ou à une animation pour comprendre l’interface.
