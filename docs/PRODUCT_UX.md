# KIDIMA — vision produit et système UX/UI

**Statut :** direction produit et plan d’implémentation. L’application Expo est un prototype local ; elle ne comprend ni authentification réelle, ni API, ni demandes persistées, ni administration opérationnelle.

## A. Vision UX globale

Kidima aide les habitants de N’Djaména à découvrir des professionnels et à préparer une demande claire. La promesse produit doit rester mesurée : Kidima facilite la découverte et la mise en relation ; la plateforme ne garantit ni la disponibilité, ni le délai de réponse, ni la qualité d’une prestation sans mécanisme réel et explicité.

### Modèle de compte

```text
Compte utilisateur (identité, coordonnées, préférences)
├── Usage client : recherche, demandes, devis, réclamations, notifications
└── Activité artisan (optionnelle) : fiche pro, services, tarifs, disponibilités,
    demandes reçues, devis envoyés, activité

Administration : espace distinct, rôles et autorisations serveur
```

L’activité artisan est une extension du même utilisateur, jamais une identité parallèle. Le profil personnel garde les informations communes ; la fiche professionnelle contient les informations destinées au public. Une personne peut donc contacter un artisan en tant que client puis accéder à son espace pro sans changer de compte.

## B. Architecture d’information

### Espace public

- Accueil : proposition de valeur, recherche, métiers, aperçu des profils et transparence du prototype.
- Artisans : résultats, recherche, filtres métier/quartier, profil public.
- Demande : formulaire guidé ; connexion requise à terme au moment de l’enregistrement/transmission, avec explication du partage de coordonnées.
- Devis : demande contextualisée depuis une fiche ; détail et validation liés au compte après authentification.
- Authentification : connexion, création de compte, récupération d’accès (à construire avec le backend).

### Espace utilisateur (même application et identité)

Navigation mobile proposée : **Accueil · Artisans · Demandes · Espace pro · Profil**. L’entrée « Espace pro » est visible mais précise si l’activité n’est pas activée. Les réclamations, devis et notifications sont des sections de « Demandes/Activité » ; le profil rassemble identité, préférences, sécurité et activation artisan. Une notification ouvre directement son objet.

Sur web, reprendre les mêmes destinations dans une barre supérieure et un contenu centré ; réserver une barre latérale à l’espace professionnel lorsqu’elle apporte un vrai raccourci. Ne jamais afficher de navigation admin dans l’application utilisateur.

### Espace admin séparé

Application web distincte sous `apps/admin` et domaine/route d’exploitation dédiés. Sections : Vue d’ensemble, Artisans, Demandes, Devis, Réclamations, Utilisateurs, Audit, Paramètres. Rôles cibles : ADMIN, SUPER_ADMIN, SUPPORT avec permissions granulaires côté API ; masquer un lien dans l’interface n’est jamais une autorisation.

## C. Direction visuelle et design system

### Intention

Une interface calme et fonctionnelle : vert profond Kidima pour les actions et repères, fond ivoire discret, surfaces blanches, texte anthracite, bordures fines. Pas de gradient, décor inutile ou ombre lourde. Photographies seulement si elles sont autorisées, représentatives et disponibles ; sinon avatar initiales clairement assumé.

### Tokens implémentés

Les tokens partagés sont dans `apps/app/constants/theme.ts`. Voir aussi le référentiel de mise en œuvre [`KIDIMA_DESIGN_SYSTEM.md`](KIDIMA_DESIGN_SYSTEM.md).

| Token | Valeur / règle |
|---|---|
| Principal | `#176B55` ; sombre `#0F4D3D` ; doux `#EAF4F0` |
| Fond / surface | `#F7F7F4` / `#FFFFFF` |
| Texte principal / secondaire | `#17201D` / `#68746F` |
| Bordure | `#E4E8E5` |
| Succès / avertissement / erreur / info | `#287A5E` / `#A76E12` / `#D94F4F` / `#326C95` |
| Espacement | 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 px |
| Rayon | petit 6, moyen 10, large 14 px ; pilule seulement pour chips |
| Typographie | caption 12, label 13, corps 14, corps large 16, titre 20, H1 28, display 36 px |
| Ombres | éviter par défaut ; préférer bordure et contraste de surface |
| Icônes | Lucide React Native uniquement, avec libellé accessible pour les contrôles icon-only |

### Bibliothèque et règles de composants

Déjà présents dans `components/ui.tsx` : Button (primary/secondary/quiet/danger, disabled/loading), IconButton, Surface, ArtisanCard, Badge, Field, SearchField, ChoiceChip, EmptyState, BottomTabBar, PageContainer, PageHeading, SectionHeading et Divider.

À construire en priorité selon l’arrivée de vraies données : Textarea, Select/FilterSheet natif, StatusTag typé par domaine, ProfileCard, ServiceCard, timeline d’événement, tabs, top bar web, notification item, skeleton/error state et CTA fixe de formulaire. Ne créer un composant que si son contrat et ses états sont partagés par plusieurs écrans.

## D. Écrans et états attendus

| Écran | Objectif et contenu | Actions et états |
|---|---|---|
| Accueil public | Recherche, métiers, profils d’exemple, explication du prototype | Rechercher, choisir métier, ouvrir profil ou préparer demande ; résultat vide et image indisponible |
| Liste artisans | Comparer profils, filtrer métier et quartier | Réinitialiser filtres ; chargement, erreur, aucun résultat |
| Fiche artisan | Services, zone et éléments de profil sourcés | Demander un devis, contacter seulement si numéro confirmé ; statut de publication/vérification expliqué, données absentes explicites |
| Demande guidée | Métier → besoin → lieu → disponibilité → coordonnées → récapitulatif/consentement | Précédent/suivant, validation par étape, erreur, confirmation serveur ; ne pas annoncer un envoi avant accusé serveur |
| Devis | Demande contextualisée, description, validité et lignes tarifaires réelles | Brouillon, envoyé, accepté/refusé selon permissions ; historique et preuve de changement |
| Accueil connecté | Raccourcis, activité client récente, entrée espace pro | Vide première connexion, activité réelle, accès notification |
| Mes demandes / détail | Référence, besoin, dates, statut, intervenant, timeline, devis | Filtrer, ouvrir, annuler si règle autorisée ; état vide/erreur/chargement |
| Réclamations / détail | Sujet, référence, suivi, réponse support et pièces jointes autorisées | Déposer depuis un objet, répondre, voir timeline ; statut explicite et erreurs d’envoi |
| Notifications | Éléments lus/non lus et cible | Marquer lu, ouvrir objet, tout marquer lu ; vide et erreur |
| Profil unique | Identité/coordonnées, préférences, sécurité, mode artisan | Modifier, activer activité pro sans second compte ; confirmation, validation, erreur |
| Tableau pro | Demandes entrantes, devis en cours, disponibilité, derniers événements | Répondre, créer devis, ouvrir profil/service ; zéro activité plutôt que faux KPIs |
| Profil pro/services/tarifs/disponibilité | Présence publique éditable avec aperçu | Brouillon/prêt à publier/en revue/publié/suspendu ; prix indicatifs et unités transparents |
| Admin dashboard | Volume, dossiers à traiter et activité auditée | Filtres par période/statut, lien vers liste ; données agrégées du serveur seulement |
| Admin listes/détails | Artisans, demandes, devis, réclamations, utilisateurs | Recherche, filtres, actions de modération avec confirmation et motif, audit obligatoire |
| Admin audit/paramètres | Traçabilité, catégories, configuration métier | Permission explicite, pagination, état vide et échec réseau |

États transversaux : défaut, focus clavier, pressé, sélectionné, désactivé, chargement, vide, erreur récupérable, succès confirmé, non lu/lu, actif/inactif. Le succès n’est affiché qu’après confirmation du service. Les libellés ne doivent pas dépendre uniquement de la couleur.

## E. Parcours clés

1. **Trouver un artisan :** accueil → mot-clé ou métier/quartier → résultats filtrables → profil avec statut des données et de vérification → action de contact/devis seulement si coordonnées publiées et consentement valides.
2. **Demander un service :** catégorie → description/photos facultatives → zone (niveau nécessaire seulement) → date/flexibilité → récapitulatif des données partagées → connexion/création de compte si nécessaire → consentement → envoi serveur → confirmation avec référence et prochaine étape réelle.
3. **Demander un devis :** fiche et service préremplis → besoin/localisation → coordonnées et consentement → transmission → suivi dans Mes demandes ; aucun délai promis sans SLA mesuré.
4. **Suivre / réclamer :** Mes demandes → détail et timeline → ouvrir un devis ou signaler un problème associé → accusé de réception → suivi et échanges dans le dossier.
5. **Activer mode artisan :** Profil unique → « Activer mon activité artisan » → collecte séparée des données professionnelles → aperçu → vérification/conditions → publication après décision ; même identifiant et préférences personnelles.
6. **Usage pro :** entrée Espace pro → tableau léger → gérer fiche/services/disponibilités → répondre à une demande → composer un devis → mise à jour auditable.
7. **Admin :** authentification privilégiée indépendante → dashboard → liste filtrée → détail → action motivée → contrôle d’autorisation serveur → entrée d’audit → notification des parties si prévue.

## F. Responsive et accessibilité

- Petit mobile : colonne unique, recherche visible tôt, filtres horizontaux ou feuille de filtres, formulaires une question par étape, CTA atteignable sans masquer le contenu.
- Grand mobile/tablette : contenu plafonné, grille uniquement quand les cartes gardent une largeur lisible.
- Web : largeur de lecture plafonnée, vrais états hover/focus, navigation clavier, filtres permanents uniquement lorsque la place le justifie.
- Admin : desktop d’abord, sidebar et tables filtrables ; sur écran étroit, navigation compacte et listes sous forme de lignes/cartes, jamais un tableau illisible.
- Zones tactiles d’au moins 44–48 px, texte redimensionnable, contraste WCAG AA visé, ordre de focus logique, labels/erreurs associés aux champs, boutons icon-only nommés, statut annoncé sans couleur seule.

## G. Recommandations d’implémentation

### Priorité actuelle (prototype)

1. Assainir les dépendances Expo et restaurer typecheck/export multi-plateforme.
2. Centraliser types/données de démonstration et supprimer les données personnelles, notes, tarifs, disponibilités et badges de confiance fabriqués.
3. Mettre en place la navigation client/pro avec compte unique ; garder l’admin hors de cette navigation.
4. Unifier demande et devis, validation et confirmation explicite de non-transmission.
5. Ajouter tests de composants et parcours essentiels.

### Avant pilote réel

1. Auth, API et persistance ; modèle `User` commun et `ProfessionalProfile` optionnel lié par clé utilisateur.
2. Contrats de statuts/versioning, permissions ownership, événements de timeline et audit.
3. Gouvernance de vérification (ce qui est vérifié, par qui, à quelle date), consentement, confidentialité et rétention des pièces.
4. Notifications consenties, mesure des délais de réponse, signalement/support et expérience hors connexion/réseau instable.
5. Application admin web indépendante avec autorisation RBAC appliquée par backend, tests et journal d’audit.

Ne jamais réutiliser des noms, numéros, montants, avis ou dossiers de test comme données de production. Les valeurs de démonstration sont des illustrations, non des preuves de couverture locale, de validation ou de performance.
