# Design system — Kidima

**Version :** 0.2  
**Référence d’implémentation :** `project/styles.css` et `project/index.html`  
**Statut :** documentation de la maquette actuelle et règles recommandées pour les prochains écrans.

## 1. But et principes d’interface

Kidima doit être :
- **Compréhensible :** le client voit immédiatement qu’il peut chercher un service ou décrire son besoin.
- **Honnête :** distinction évidente entre démonstration, profil réel, information confirmée et promesse.
- **Accessible :** utilisable sur téléphone, au clavier et avec des besoins variés d’alphabétisation ou de connexion, après validation terrain.
- **Respectueux :** pas de partage surprenant de coordonnées ou de localisation.
- **Chaleureux sans infantiliser :** formes souples et tonalité humaine, mais informations sérieuses et précises.

Ce document n’affirme pas que l’interface satisfait déjà un niveau WCAG : un audit réel est nécessaire.

## 2. Identité et voix

- **Nom :** `kidima.` en bas de casse dans le logotype actuel.
- **Symbole :** lettre K dans une forme verte arrondie, complétée par un point orange.
- **Promesse de maquette :** « Les bons services, près de chez vous. » À revalider par recherche de marque et auprès d’utilisateurs.
- **Voix :** phrases courtes, concrètes et respectueuses ; expliquer l’action et son résultat.
- **À éviter :** « artisan vérifié », « garanti », « disponible maintenant » ou « meilleur artisan » sans méthode et preuves qui justifient précisément la formulation.

## 3. Couleurs et tokens

### Palette de base implémentée
Tokens déclarés dans `:root` de `styles.css` :

| Token | Valeur | Fonction prévue |
|---|---|---|
| `--ink` | `#172d28` | Texte principal, toast sombre |
| `--muted` | `#71807a` | Texte secondaire et descriptions |
| `--green` | `#176c53` | Action principale, liens d’action, accents |
| `--green-dark` | `#125842` | État hover du bouton vert |
| `--lime` | `#d7f075` | Accent lumineux sur fond vert |
| `--cream` | `#f7f7f1` | Fond global |
| `--line` | `#e7eae3` | Bordures légères et séparateurs |
| `--white` | `#fff` | Cartes, contrôles et dialogue |
| `--orange` | `#f5a06c` | Accent chaleureux général |
| `--shadow` | `0 18px 48px rgba(23,45,40,.08)` | Élévation douce |

### Couleurs complémentaires actuellement en CSS
- Illustration : `#e8efd8`, `#c7dfb9`.
- Surface de section : `#eef1e7`.
- Surfaces d’avatar : `#eaf1df`, `#fff0e4`, `#e7eff0`.
- Avertissement de démonstration : `#fff8ed`, bordure `#f3dec0`, texte `#8d6935`.

### Règles d’usage
- L’action primaire emploie le vert ; l’action secondaire ne doit pas visuellement rivaliser avec elle.
- Le vert ne doit pas être le seul indicateur d’un succès ou d’un état actif : associer texte, forme ou attribut accessible.
- L’orange signale un accent ou une information à regarder ; ne pas lui attribuer automatiquement un sens d’erreur.
- Une palette de succès/erreur/avertissement complète reste à définir avant la création de formulaires réels.
- Tester systématiquement les couples texte/fond avec un outil de contraste avant mise en production, y compris texte secondaire, placeholders, liens, états actifs et focus.

## 4. Typographie et contenu

### Familles utilisées
- **Manrope :** titres, logo et emphase.
- **DM Sans :** texte, commandes et formulaires.
- **Chargement :** `@import` Google Fonts avec fallback générique `sans-serif`.

Le chargement externe dépend du réseau. Pour connexion faible, envisager d’héberger les fontes autorisées localement ou de privilégier les fontes système, en évaluant le poids et les licences.

### Hiérarchie observée
- H1 : `clamp(36px, 4.5vw, 59px)` en grand écran, adaptation mobile distincte.
- H2 hero/CTA : Manrope, taille adaptée au viewport.
- Titre de section : environ 29 px, réduit sur petit écran.
- Titre de carte : environ 14 px.
- Petits libellés : 9–12 px dans la maquette.

Pour la cible, ne pas reprendre automatiquement les petites tailles sur les écrans à faible vision ; valider la lisibilité réelle, zoom et réglage de taille de texte.

### Règles éditoriales
- Casse phrase, verbes d’action, consignes positives et explicites.
- Utiliser « ville ou quartier », pas une adresse précise si elle n’est pas nécessaire.
- Donner le contexte des statuts et tarifs : « coordonnées confirmées le… », « devis à confirmer », plutôt qu’un badge ambigu.
- Écrire un message distinct pour chargement, résultat vide, échec réseau, transmission réussie et erreur de validation.
- Toute promesse doit correspondre au comportement réellement implémenté.

## 5. Espacement, grille et formes

Le CSS actuel utilise surtout des mesures directes, pas encore un système complet de tokens. Échelle de référence à formaliser progressivement :

| Token proposé | Valeur proposée | Exemple d’usage |
|---|---:|---|
| `space-1` | 4 px | petit intervalle |
| `space-2` | 8 px | icône/texte, petites commandes |
| `space-3` | 12 px | contrôle compact |
| `space-4` | 16 px | intérieur standard |
| `space-6` | 24 px | espacement de bloc |
| `space-8` | 32 px | séparation de groupe |
| `space-12` | 48 px | section compacte |
| `space-16` | 64 px | séparation de section |

Ces tokens sont une proposition à introduire dans `:root` si l’équipe adopte une échelle; ils ne sont pas tous codés actuellement.

- Contenu centré avec largeur maximale ; sections fluides et marges resserrées sur mobile.
- Coins actuels : 8–10 px pour boutons/champs, 12–13 px pour cartes, 17–22 px pour surfaces majeures.
- Élévation réservée aux surfaces sur lesquelles l’interaction ou la hiérarchie le justifie.
- Éviter l’empilement de bordures et d’ombres.

## 6. Spécification des composants

### 6.1 En-tête et logo
**Anatomie :** marque à gauche, liens de navigation sur grand écran, action de demande à droite.  
**Comportement actuel :** la navigation se masque à 650 px ; l’action reste accessible.  
**À vérifier :** les liens d’ancrage disponibles sur petit écran ne doivent pas rendre une fonction essentielle introuvable.

### 6.2 Boutons
- **Primaire :** fond `--green`, texte blanc, libellé décrivant l’action.
- **Secondaire :** fond transparent, bordure discrète et texte principal.
- **Inversé :** fond blanc sur surface verte.
- **Compact :** hauteur actuelle d’environ 40 px ; réservé à un en-tête si la cible tactile reste confortable.
- **États requis à la cible :** repos, hover, focus-visible, actif, désactivé, attente/chargement et erreur contextuelle.
- Les états non implémentés ne doivent pas être supposés à partir de la seule couleur.

### 6.3 Recherche et filtres
**Recherche texte :** champ de service avec libellé accessible (visuellement masqué dans la maquette) et placeholder illustratif.  
**Zone :** liste native `select`; contenu actuel codé en dur et limité à quatre villes d’exemple.  
**Catégories :** boutons avec `aria-pressed`; état actif visuel vert.  
**Cible :** conserver les filtres lors de l’ouverture d’un résultat, fournir suppression individuelle/totale si leur nombre augmente, et rendre l’état des filtres perceptible et annoncé.

### 6.4 Carte artisan
**Anatomie actuelle :** avatar d’initiales, nom fictif, catégorie, zone, badge `Exemple`, texte indicatif, action « Demander un devis ».  
**Cible possible :** nom d’affichage consenti, métier, zones couvertes, services, état de contact défini, date de mise à jour, devis/ordre de prix si fiable et action claire.  
**Règle :** ne pas ajouter note, badge, photo ou distance sans provenance, consentement et règle de modération.

### 6.5 Notes et bannières
La note ambrée de la maquette explique que les profils ne sont pas réels. Pour une mise en production, remplacer la note par une information adaptée et suffisamment visible ; ne jamais masquer une limitation importante dans une infobulle seule.

### 6.6 Formulaire et dialogue
**Champs actuels :** catégorie, ville/quartier, description, tous requis par HTML.  
**Dialogue actuel :** élément natif `<dialog>`, fermeture explicite, messages de démonstration.  
**Cible :** aide au format, champs réellement nécessaires uniquement, validation serveur, erreurs proches du champ, conservation de saisie après erreur sans perte, description de qui reçoit les données et consentement distinct si nécessaire.

### 6.7 État vide, chargement et erreur
- **État vide actuel :** texte d’absence de résultat et bouton pour effacer les filtres.
- **À créer pour le produit :** squelette/chargement, erreur réseau réessayable, échec d’envoi, succès confirmé serveur, service indisponible, profil ancien et zone non couverte.
- Le toast ne doit pas être le seul endroit où apparaît un résultat important ; garder un message persistant accessible.

## 7. Responsive design

### Breakpoints implémentés
- Au-dessus de 900 px : composition large et grille de cartes en trois colonnes.
- Jusqu’à 900 px : espaces latéraux resserrés et cartes en deux colonnes.
- Jusqu’à 650 px : en-tête simplifié, recherche reconfigurée, listes en une colonne et étapes verticales.

### Règles de validation cible
Tester au minimum une largeur étroite de 320–360 px, téléphone courant, tablette, grand écran, zoom 200 %, orientation paysage et clavier virtuel ouvert. Vérifier absence de débordement, ordre de lecture, hauteur visible du formulaire et accès à chaque action.

La mise en page doit s’adapter au contenu et au zoom ; les breakpoints ne doivent pas être considérés comme des catégories d’appareils rigides.

## 8. Accessibilité

### Déjà présent dans la maquette
- `lang="fr"`, en-tête/nav/main/footer, hiérarchie de titres, labels de recherche et formulaire.
- Icônes décoratives marquées `aria-hidden` à plusieurs endroits.
- Compteur et cartes annoncés avec `aria-live`, retours via `role="status"`.
- État des filtres exposé par `aria-pressed`.
- Règle `prefers-reduced-motion` pour animations et défilement.

### À auditer et compléter
- Focus visible pour tous les contrôles (non défini explicitement de façon globale actuellement).
- Contraste WCAG de chaque texte, couleur, bordure et état.
- Dialog : focus initial, piège de focus, restitution du focus, fermeture Escape et lecteur d’écran dans navigateurs cibles.
- Lien de saut au contenu, erreurs de formulaire programmatiquement reliées, annonces de résultats non trop bavardes.
- Icônes seules, tailles de cibles tactiles, zoom texte et tests avec technologies d’assistance.
- Lisibilité pour les personnes utilisant audio, traduction ou assistance humaine ; valider les besoins linguistiques avec les utilisateurs.

## 9. Mouvement, performance et médias

- La maquette utilise transitions légères et désactive les transitions/défilements fluides pour `prefers-reduced-motion`.
- Pas d’images distantes de profils ; illustration construite avec CSS/emoji.
- Charger uniquement des polices, images et scripts utiles ; prévoir fallback si ressource tierce indisponible.
- Préférer des formats et tailles adaptés aux appareils modestes ; ne pas ajouter carte lourde ou vidéo en arrière-plan sans preuve d’utilité.

## 10. États et nomenclature recommandés

Créer des classes et tokens sémantiques, non basés sur la couleur seule :
- `is-active` / état sémantique équivalent ;
- `is-loading` avec libellé d’attente et action désactivée si requise ;
- `is-error` avec explication et reprise ;
- `is-success` avec confirmation persistante ;
- `is-disabled` avec explication si la raison n’est pas évidente.

Ces conventions sont à formaliser dans le code à mesure que les composants sont extraits ; la maquette ne possède pas encore de bibliothèque de composants autonome.

## 11. Cohérence et maintenance

- Les couleurs globales doivent être centralisées dans `:root` ; éviter des variantes locales qui contredisent la palette.
- Lorsqu’une nouvelle page réutilise un composant, reprendre sa sémantique, ses états clavier et son vocabulaire, pas seulement son apparence.
- Toute modification du texte de confiance doit être revue avec les responsables métier.
- Les exemples de données doivent rester visiblement fictifs jusqu’au remplacement contrôlé par des données consenties.
- Mettre à jour ce document à chaque évolution substantielle des composants, breakpoints, typographie ou tokens.

## 12. Checklist de revue UI

- Le client comprend-il en quelques secondes ce que Kidima fait et où c’est disponible ?
- Les profils affichés sont-ils réels, consentis et accompagnés d’un statut compréhensible ?
- Le bouton principal correspond-il exactement à son effet ?
- L’utilisateur sait-il si ses données sont envoyées, stockées ou transmises ?
- Recherche vide, erreur réseau, attente, succès et retour arrière sont-ils conçus ?
- Contraste, clavier, zoom, lecteurs d’écran et usage mobile ont-ils été testés ?
- L’interface reste-t-elle utilisable si les polices distantes ne se chargent pas ?
