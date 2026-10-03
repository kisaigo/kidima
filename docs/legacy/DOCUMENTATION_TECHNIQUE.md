# Documentation technique — Kidima

**Version :** 0.2 — architecture et exigences d’ingénierie  
**Statut :** front-end statique de démonstration ; l’architecture recommandée ci-dessous n’est pas encore implémentée.  
**Décision proposée :** Expo + Expo Router + React Native + TypeScript pour une application universelle Android, iOS et web, avec rendu web pré-rendu/SSR pour les pages publiques. La base de données, l’hébergement et les fournisseurs de notifications restent à choisir séparément. Cette recommandation privilégie le besoin explicite de multiplateforme ; elle n’est pas encore implémentée.

## 1. Résumé technique

La maquette Kidima est servie comme trois fichiers applicatifs et fonctionne dans le navigateur :

- HTML sémantique (`index.html`) ;
- CSS sans compilation (`styles.css`) ;
- JavaScript natif (`app.js`).

Elle ne possède aucun serveur, stockage persistant, API, compte utilisateur, transmission de demande ou outil de gestion. Les exemples d’artisans sont codés en dur et sont fictifs.

## 2. État actuel et dépendances

### Environnement
- Ouvrir `project/index.html` dans un navigateur moderne ; pas d’installation ou compilation.
- La feuille CSS demande DM Sans et Manrope via Google Fonts. Si le réseau est indisponible, le navigateur utilise `sans-serif`.
- Pas de fichier de dépendances (`package.json`), pas de framework et pas de suite de tests.
- Contrôle syntaxique effectué : `node --check app.js` (réussite).

### Fichiers
| Fichier | Responsabilité |
|---|---|
| `index.html` | Structure de la page, zones accessibles, filtres, dialogue et notes explicatives |
| `styles.css` | Design tokens partiels, composants et breakpoints à 900 px / 650 px |
| `app.js` | Jeu de données de démonstration, rendu des cartes, filtres et interactions |

### Flux réel dans la maquette
```text
Tableau artisans fictifs en mémoire
          ↓
renderArtisans() filtre texte + catégorie + ville
          ↓
DOM : cartes, compteur, état vide

Formulaire → validation HTML côté navigateur → message de démonstration
```

Le formulaire n’envoie pas de requête HTTP et ne persiste pas les valeurs. Ne pas mettre de données personnelles réelles dans la maquette.

## 3. Constatations d’implémentation à garder en tête

- Les recherches sont littérales et sensibles aux variantes de vocabulaire ; la normalisation des accents et les synonymes ne sont pas faits.
- Les profils contiennent nom d’exemple, catégorie, ville, quartier, initiales et texte de tarif indicatif. Aucun champ de contact, statut de vérification ou disponibilité réelle n’est présent.
- La fonction de carte injecte actuellement des chaînes issues du tableau local via `innerHTML`. C’est acceptable uniquement pour des constantes d’exemple contrôlées ; les futures données utilisateur/API doivent être insérées avec `textContent` ou échappées par une méthode éprouvée afin d’éviter les injections XSS.
- Le formulaire affiche une confirmation locale ; cette confirmation n’équivaut pas à une réception côté serveur.
- Les boutons, cartes et filtres doivent être revérifiés dans les navigateurs mobiles et avec clavier/lecteur d’écran avant un pilote.

## 4. Principes d’architecture cible

Une future version devrait respecter les principes suivants avant tout choix de stack :

1. **Mobile et débit limité d’abord :** HTML utile, ressources légères, dépendances limitées, fonctionnement tolérant aux erreurs réseau.
2. **Serveur source de vérité :** profils, statuts, consentements et demandes sont validés et autorisés côté serveur.
3. **Minimisation :** séparer coordonnées privées des informations destinées à l’annuaire public.
4. **Actions explicites :** l’utilisateur voit quand et à qui une demande est transmise.
5. **Traçabilité proportionnée :** journaliser les opérations d’administration importantes sans conserver inutilement le contenu sensible.
6. **Opérations réalistes :** construire un outil interne minimum pour maintenir les profils et gérer les incidents.
7. **Évolution incrémentale :** valider un pilote manuel avant d’investir dans une API et des intégrations externes.

## 5. Choix de framework recommandé

### Décision
Pour Kidima, je recommande **Expo + Expo Router + React Native + TypeScript**, avec prise en charge Android, iOS et web depuis un même projet. Cette option correspond mieux à la demande explicite d’une solution multiplateforme que le choix « site web + emballage natif ultérieur ».

Le web doit rester un canal de première classe : les clients doivent pouvoir ouvrir et partager un lien sans installer l’application. Expo Router prend en charge le rendu web statique et, dans les versions récentes documentées, le rendu serveur (SSR). Pour la partie web publique, les routes de métiers et profils devront donc être pré-rendues ou rendues côté serveur et testées pour le SEO, les aperçus de partage et les temps de chargement. L’app mobile native et le site web peuvent partager navigation et logique, mais pas nécessairement chaque composant visuel.

Cette recommandation est un choix pragmatique, pas une garantie qu’un outil répond parfaitement à tout. Elle suppose de tester tôt le compromis entre découverte web, rendu multiplateforme et qualité native sur les appareils réellement utilisés au Tchad.

### Pourquoi ce choix pour Kidima
- **Web d’abord sans sacrifier le natif :** un client peut ouvrir un lien partagé depuis le navigateur ; les personnes qui veulent l’application peuvent utiliser le même produit sur Android ou iOS.
- **Découverte publique :** Expo Router offre le rendu web statique et, dans les versions récentes, SSR. Les pages publiques de métiers/artisans peuvent être rendues en HTML et partagées. Il faut sélectionner la stratégie de rendu par type de route et la tester réellement pour le SEO.
- **Modèles communs :** TypeScript peut maintenir les contrats d’artisans, demandes et statuts sur chaque plateforme ; la logique peut être partagée quand elle est indépendante de l’interface.
- **Une navigation unifiée :** Expo Router fournit des routes web et des liens universels natifs ; les composants purement métier peuvent être mutualisés sans obliger à partager tous les écrans.
- **App native directe :** les plateformes Android et iOS sont des cibles prises en charge par Expo, plutôt qu’une WebView ajoutée après coup.
- **Coût mieux maîtrisé qu’une app par plateforme :** une base de code et des équipes distinctes pour iOS, Android et web sont évitées, tout en gardant à l’esprit que les builds, tests et adaptations par cible restent nécessaires.

### Limites à accepter explicitement
- **Le partage de code n’est pas de la parité automatique :** composants mobiles de type `View`/`Text` et composants web HTML/CSS ne sont pas interchangeables dans tous les cas. Prévoir des variantes spécifiques avec conventions de fichiers par plateforme lorsque l’UX l’exige.
- **Référencement du web dynamique :** le mode de rendu doit être correctement configuré. Le rendu statique génère des pages connues à la construction ; un annuaire qui évolue fréquemment peut nécessiter SSR et un serveur déployé. Les routes dynamiques statiques non pré-générées ne fonctionnent pas magiquement.
- **Versions et compatibilité :** confirmer la version Expo stable au moment de démarrer, les exigences de Node/Xcode/Android Studio, les bibliothèques compatibles et les coûts de publication des stores.
- **Réseau et hors ligne :** les capacités natives n’éliminent pas la nécessité d’un réseau pour consulter les profils et transmettre des demandes. Définir précisément quelles données peuvent être disponibles hors ligne et éviter de conserver des coordonnées privées sur les téléphones partagés.
- **Qualité web :** le rendu web Expo est viable, mais les pages publiques doivent être testées pour sémantique, accessibilité, performance, formulaires et SEO ; ne pas supposer que l’apparence native se transpose telle quelle au navigateur.
- **Complexité :** configurer/build/tester iOS, Android et web est plus complexe qu’une maquette statique ou un seul site web. Si le pilote montre que les utilisateurs n’ont besoin que du web, un framework web seul pourrait coûter moins cher.

### Utilisation recommandée dans le code
- **Expo SDK stable et Expo Router** pour navigation, routes partageables et liens universels ; figer une version validée et planifier les mises à jour.
- **React Native + TypeScript** pour les composants et modèles communs. Garder les règles métier et validation dans des modules indépendants de l’UI.
- **Composants partagés avec discernement :** mutualiser logique, types et composants simples ; employer les conventions web/native d’Expo Router quand une page SEO ou un contrôle nécessite du HTML/CSS spécifique.
- **Web public :** activer le rendu statique pour les routes dont les données peuvent être connues à la compilation, ou SSR pour les pages dynamiques si le serveur choisi le prend en charge. Tester explicitement les pages d’artisans et métadonnées de partage.
- **API :** préférer une API versionnée séparée ou des API routes Expo seulement après confirmation de compatibilité de la version et de l’hébergement. Ne jamais confondre le routeur UI avec une API métier sécurisée.
- **PWA :** envisager une expérience web installable en complément ; elle ne remplace pas les builds natifs Android/iOS. Définir le cache et les notifications selon appareils et consentements.
- **Tests par cible :** tests composants/logique, tests navigateur web, simulateurs et appareils Android/iOS ; construire une matrice de versions et appareils supportés.
- **Backend contractuel :** garder la possibilité que site, PWA et clients natifs consomment la même API versionnée.

### Alternative : quand choisir Next.js ?
Next.js est préférable si la validation du projet indique que le web/PWA suffit et que les clients ne réclament pas les apps stores. Il donne une expérience web React directe et est particulièrement naturel pour un produit web public. Il ne partage toutefois pas directement une interface React Native native sans ajouter une application distincte. Dans ce scénario web-only, sa simplicité de modèle web peut réduire les adaptations multiplateformes.

### Décision de contrôle avant le développement
Construire un petit prototype Expo comportant une fiche artisan publique en SSR/pré-rendu, une recherche web et un écran mobile Android/iOS. Vérifier indexabilité et métadonnées de partage, bundle/temps de chargement, parcours clavier sur le web, rendu sur un téléphone cible et compatibilité des composants. Si ce test révèle trop de friction pour le web public, comparer explicitement une séparation Next.js web + Expo mobile avant d’engager le produit entier.

### Critères pour réexaminer le choix
Réévaluer après le pilote si les clients demandent une installation native, si les notifications natives sont indispensables, si des parcours doivent fonctionner durablement hors connexion, si les performances web ne sont pas acceptables sur les appareils testés, ou si des fonctions natives (appareil photo, géolocalisation, tâches en arrière-plan) deviennent centrales. Décider sur des retours observés, pas seulement sur la promesse « une base de code partout ».

### Sources officielles consultées
- Next.js, guide PWA : https://nextjs.org/docs/app/guides/progressive-web-apps
- Next.js, App Router : https://nextjs.org/docs/app
- Expo Router, introduction et navigation universelle web/iOS/Android : https://docs.expo.dev/router/introduction/
- Expo, développer des sites Web et rendu statique/SEO : https://docs.expo.dev/workflow/web/
- Expo Router, rendu statique : https://docs.expo.dev/router/web/static-rendering/
- Expo Router, rendu serveur (SSR) : https://docs.expo.dev/router/web/server-rendering/
- Capacitor, runtime natif multiplateforme pour applications web (option alternative à Expo) : https://capacitorjs.com/docs/

Les limites exactes évoluent avec les versions et les systèmes d’exploitation ; vérifier la documentation de la version retenue lors de l’initialisation.

## 6. Architecture logique cible avec ce choix (indicative)

```text
Web / PWA                     App Android / iOS
    │                               │
    └────────── HTTPS/API ──────────┘
                    │
        Expo Router / React Native
        ├── routes publiques : métiers et profils
        ├── parcours de demande client
        ├── espace artisan
        ├── expérience opérateur Kidima
        └── modules UI spécifiques web/native si requis
                    │
        API applicative sécurisée
        ├── profils, catégories et zones
        ├── demandes, consentements et réponses
        ├── signalements et modération
        └── authentification/autorisation
                    │
          stockage persistant à choisir
          notifications à choisir si nécessaires
          audit et métriques minimisées
```

Pour un petit pilote, le serveur et l’application peuvent être hébergés ou organisés ensemble si le runtime le permet ; les contrats d’API et règles métier doivent néanmoins rester séparés de l’UI. Le choix d’un framework ne décide pas le fournisseur de base de données, l’hébergement, l’authentification ou le canal de notification. Étudier chaque intégration selon budget, connectivité, confidentialité et obligations d’exploitation.

### Environnements prévus pour un vrai produit
- développement local ;
- aperçu/test isolé avec données synthétiques ;
- production avec données réelles, droits restreints, sauvegardes et procédure de retour arrière.

Ne jamais copier des pièces d’identité ou demandes de production dans un environnement de test non protégé.

## 7. Modèle de données conceptuel cible

Les champs et durées ci-dessous sont une proposition de conception ; il faut les valider avec le métier et les obligations applicables.

### Artisan
- identifiant opaque ; nom d’affichage ; description et langues parlées si consenties ;
- téléphone ou moyen de contact privé ;
- métiers proposés et descriptions ;
- villes/quartiers desservis, sans localisation résidentielle précise par défaut ;
- statut du profil : brouillon, en revue, publié, suspendu, archivé ;
- indicateurs de contrôle explicitement définis, date et auteur du contrôle ;
- consentement de publication (version de notice, horodatage, retrait) ;
- dates de création, mise à jour et dernière confirmation.

### Catégorie et zone
Référentiels administrés (identifiant, libellé, alias, statut, relation de parenté éventuelle). Ne pas traiter une ville codée en dur dans le client comme un référentiel métier pérenne.

### Demande
- identifiant opaque, catégorie, description, zone approximative et créneau facultatif ;
- identifiant client ou contact protégé selon le parcours retenu ;
- statut et historique des transitions ;
- destinataires, horodatage, résultat de transmission et consentement correspondant ;
- dates de conservation/suppression.

### Réponse / mise en relation
Relation entre une demande et un artisan avec statut (envoyée, acceptée, refusée, expirée), horodatages et message non sensible éventuel.

### Signalement / audit
Motif, référence à l’objet concerné, date, état, responsable, action et journal des changements. Limiter les contenus privés et les personnes autorisées à les lire.

## 8. API logique indicative (non implémentée)

Une API éventuelle doit être versionnée, documentée et retourner des erreurs cohérentes. Les routes suivantes illustrent les capacités, sans constituer un contrat arrêté :

| Méthode / route | Accès | Intention |
|---|---|---|
| `GET /api/v1/categories` | Public | Liste des métiers actifs |
| `GET /api/v1/areas` | Public | Zones de recherche prises en charge |
| `GET /api/v1/artisans?category=&area=&q=` | Public | Rechercher des profils publiés uniquement |
| `GET /api/v1/artisans/{id}` | Public | Consulter une fiche publique avec données filtrées |
| `POST /api/v1/requests` | Public ou client identifié, à décider | Créer une demande après validation et consentement |
| `GET /api/v1/requests/{id}` | Client autorisé / opérateur | Consulter le statut de sa demande |
| `POST /api/v1/requests/{id}/withdraw` | Client autorisé | Retirer la demande |
| `POST /api/v1/reports` | Utilisateur | Signaler un profil ou un incident |
| `/api/v1/admin/...` | Opérateur/admin authentifié | Gérer profils, demandes, catégories et signalements |

Pour `POST /requests`, prévoir validation serveur, limitation anti-abus, déduplication idempotente lors des reprises, consentement explicite, limitation de taille et messages d’erreur qui n’exposent pas les données d’autres clients. Ne pas exposer les coordonnées privées dans la route publique de recherche.

## 9. Sécurité, confidentialité et menaces

### Actifs à protéger
Coordonnées client/artisan, descriptions de demandes, localisation, consentements, éventuels justificatifs, accès opérateur et historique de modération.

### Menaces et contrôles à étudier
- **Scraping de coordonnées :** ne publier que les champs nécessaires ; limiter les accès et mesurer l’abus.
- **Faux profils/usurpation :** processus d’inscription, confirmation du contact, signalement et suspension ; ne pas confondre confirmation de téléphone et qualification professionnelle.
- **XSS / injection :** échappement, rendu DOM sûr, validation serveur ; ne pas injecter de texte externe dans `innerHTML`.
- **Accès horizontal aux demandes :** contrôle serveur des permissions pour chaque ressource et test de séparation entre clients.
- **Abus de formulaire/spam :** limitation, détection proportionnée, protection anti-automatisation et procédure de recours si blocage erroné.
- **Fuite via journaux :** ne pas journaliser numéros ou descriptions complets sans besoin justifié ; accès et durée limités.
- **Compromission d’un compte opérateur :** comptes individuels, moindre privilège, authentification renforcée selon capacité, révocation d’accès.
- **Données perdues :** sauvegardes contrôlées, restauration testée et responsabilités désignées.

### Confidentialité
Avant la collecte réelle : publier une notice intelligible, expliquer le responsable et les usages, obtenir les consentements requis, définir base d’accès, durée, retrait, correction, suppression et gestion d’incident. La conformité aux règles applicables doit être évaluée par des personnes compétentes ; ce document ne constitue pas un avis juridique.

Ne pas stocker de pièces d’identité par défaut. Si une vérification exige un justificatif, définir pourquoi, qui le voit, comment il est protégé et quand il est détruit.

## 10. Connexion faible et canaux

- Garder la page et les données initiales compactes ; préférer pagination ou chargement progressif si l’annuaire grandit.
- Éviter carte interactive, géolocalisation continue, images lourdes ou dépendances non nécessaires dans la première version.
- Afficher chargement, succès, erreur et option de reprise de façon distinguable.
- Ne pas annoncer le succès d’une demande avant accusé de réception serveur.
- Tester si les utilisateurs préfèrent site, appel, WhatsApp, SMS ou message audio avant de connecter un canal. Un canal tiers implique consentement, coûts et règles de conservation.
- Si le mode hors ligne est retenu ultérieurement, indiquer clairement ce qui est enregistré localement, chiffrer les données sensibles et éviter de cacher l’échec de synchronisation.

## 11. Observabilité et exploitation cible

Suivre des événements métier agrégés : recherche sans résultat, demande validée, transmission réussie/échouée, temps de réponse, profil expiré, signalement reçu/résolu. Les événements analytiques ne doivent pas contenir les descriptions libres ni les numéros par défaut.

Définir avant lancement :
- responsable du support et heures de disponibilité ;
- procédure de suspension de profil ;
- délais internes de traitement selon gravité ;
- sauvegarde, rétention, restauration et escalade d’incident ;
- procédure d’annonce d’une panne ou d’une interruption ;
- revue régulière des comptes et droits administratifs.

Ne pas publier une garantie de disponibilité avant mesure et capacité d’exploitation.

## 12. Tests et qualité

### Tests minimaux à prévoir avant pilote réel
- unitaires : normalisation et combinaison des filtres, statuts et règles de visibilité ;
- intégration : création/transmission/retrait de demande, autorisations et échecs de notification ;
- end-to-end : recherche mobile, profil, demande et message de confirmation ;
- sécurité : injection/XSS, accès à la demande d’un autre client, abus de formulaire ;
- accessibilité : clavier, lecteurs d’écran, zoom, contraste, erreurs de formulaire ;
- compatibilité : appareils et navigateurs recensés pendant la découverte ;
- résilience : connexion lente/interrompue, double soumission, reprise après erreur ;
- opérations : restauration d’une sauvegarde de test et suspension d’un profil.

### Tests actuels
Il n’y a pas de tests automatisés de la maquette. `node --check app.js` valide la syntaxe seulement, pas le DOM, le style ou les parcours navigateur.

## 13. Déploiement et gestion du changement

Pour un éventuel produit réel : utiliser revue de code, environnements séparés, secrets hors dépôt, versionnement des migrations et sauvegarde avant changement à risque. Définir une procédure de retour arrière. Aucun déploiement n’est configuré par ce dépôt/document.

Les données fictives de la maquette doivent être supprimées ou isolées avant l’arrivée de données réelles. Toute évolution de modèle doit considérer migration, export, correction et suppression.

## 14. Organisation de code Expo proposée

Structure indicative, à adapter à la taille de l’équipe :

```text
kidima/
├── app/                         # Routes Expo Router (web + native)
│   ├── _layout.tsx              # Layout racine et providers globaux
│   ├── index.tsx                # Accueil/recherche
│   ├── artisans/[slug].tsx      # Fiche publique artisan
│   ├── demande/nouvelle.tsx     # Formulaire de demande
│   ├── artisan/                 # Parcours privé artisan, après décision auth
│   └── admin/                   # Console opérateur, accès restreint
├── src/
│   ├── features/                # artisan, recherche, demandes, signalements
│   ├── components/              # composants UI partagés
│   ├── domain/                  # types et règles métier sans dépendance UI
│   ├── services/                # client API et adaptateurs
│   ├── validation/              # schémas de validation communs
│   ├── platform/                # comportements spécifiquement web/native
│   └── theme/                   # design tokens et thèmes
├── assets/                      # icônes et médias optimisés
├── tests/                       # tests logique et intégration
├── app.json                     # configuration Expo
├── package.json                 # dépendances et scripts
└── tsconfig.json
```

Ne pas créer tous ces dossiers par avance si le MVP n’en a pas besoin. La séparation de `domain` et des accès réseau est importante : elle permet de tester les statuts et règles sans lancer l’interface. Éviter les composants surchargés et l’architecture en couches artificielle pour un petit projet.

### Stratégie de composants
- Partager les types, validation, textes, logique de filtrage et composants simples lorsque l’expérience est réellement commune.
- Utiliser du code spécifique web pour sémantique HTML, SEO, partage social et comportements navigateur si nécessaire ; utiliser des composants natifs pour navigation et contrôles mobiles.
- Employer une convention de fichiers web/native seulement lorsqu’un composant diverge (`.web.tsx`, `.native.tsx` selon les conventions supportées par le bundler).
- Éviter d’accéder à `window`, `document` ou APIs navigateur dans un module exécuté côté serveur ; isoler ce code au web et après montage.

## 15. Contrats fonctionnels des principaux modules

### Catalogue public
Entrée : métier, zone, texte libre et pagination éventuelle. Sortie : profils publiés et champs explicitement publics. N’inclure ni numéro privé par défaut, ni justificatif, ni note interne.

### Création de demande
Entrée : catégorie, description, zone, contact choisi, consentement et clé de déduplication. Sortie : identifiant et état de réception, ou erreur structurée. Réponse de succès uniquement après écriture persistante ; aucun contenu de demande en analytics.

### Transmission / notification
Entrée : demande autorisée, destinataire(s) consentis, canal retenu. Sortie : statut d’envoi (en attente, envoyé, échec, expiré), identifiant externe minimal et date. Les erreurs du fournisseur sont journalisées sans exposer les coordonnées en clair lorsque c’est évitable.

### Console opérateur
Actions sensibles : publier, suspendre, corriger, supprimer/archiver et traiter un signalement. Chaque action a un motif, un acteur et un horodatage. Les secrets et justificatifs ne sont accessibles qu’aux personnes et durées nécessaires.

## 16. Gestion des erreurs et résilience

- Définir un format API uniforme (`code`, message destiné à l’utilisateur, détails de validation sûrs, identifiant de corrélation).
- Distinguer absence de résultats, service temporairement indisponible, erreur de saisie et demande effectivement reçue.
- Utiliser une clé idempotente ou mécanisme équivalent pour limiter les doublons lors d’un double clic/retry.
- Ne pas répéter automatiquement une transmission externe sans identifier si le destinataire l’a déjà reçue.
- Prévoir un mode de reprise manuel pour l’équipe si le canal de notification tombe en panne.
- Mettre des limites de taille sur description et pièces jointes éventuelles ; le MVP devrait probablement éviter les fichiers tant que la modération n’est pas conçue.

## 17. Stratégie de rendu web et partage

Expo documente le rendu statique pour produire le HTML à la construction ainsi que le SSR dans les versions récentes du SDK. Ce sont deux modes de déploiement distincts :

- **Rendu statique :** idéal pour accueil, pages d’explication et pages de profil dont la liste est connue au build. Les routes dynamiques doivent être pré-générées ; un nouveau profil n’apparaît pas nécessairement avant une reconstruction.
- **SSR :** rend les pages dynamiques à la requête à partir des données courantes et requiert un serveur de production compatible.
- **API routes :** capacités et configuration dépendent de la version Expo retenue ; elles nécessitent un environnement de serveur lorsqu’activées. Ne pas supposer qu’un export statique seul peut gérer dynamiquement une demande POST.

Décision à tester : pour un annuaire qui change souvent, utiliser SSR pour les fiches publiques ou une génération/revalidation adaptée, tout en maintenant les parcours privés derrière autorisation serveur. Vérifier métadonnées par profil, URL canonique, aperçu social, `robots`, sitemap et pages introuvables.

Sources Expo :
- SSR : https://docs.expo.dev/router/web/server-rendering/
- Statique : https://docs.expo.dev/router/web/static-rendering/
- Web : https://docs.expo.dev/workflow/web/

## 18. Build, livraison et plateformes

- Développement : Expo CLI, émulateur ou appareil ; Expo Go peut faciliter une première exploration, mais une development build devient préférable dès qu’un plugin natif ou une configuration réelle est nécessaire.
- Android : vérifier Android Studio/SDK, appareils physiques, tailles et versions OS prises en charge.
- iOS : la compilation locale nécessite macOS et Xcode ; les builds cloud peuvent être évalués si l’équipe n’a pas de Mac, en tenant compte des coûts et du compte de distribution requis.
- Web : build/export et test sur le serveur qui sera réellement utilisé, notamment si SSR ou API routes sont nécessaires.
- Distinguer builds de développement, aperçu interne et production ; ne pas partager les identifiants de production avec les builds de test.
- Les coûts, conditions d’EAS et publication sur les stores ne sont pas couverts par le choix du framework et doivent être budgétés séparément.

Documentation officielle :
- Expo development builds : https://docs.expo.dev/develop/development-builds/introduction/
- Expo EAS Build : https://docs.expo.dev/build/introduction/

## 19. Plan de tests de la stack proposée

### Logique et composants
- Jest avec preset Expo pour règles pures et composants sélectionnés ; garder les tests de rendu déterministes.
- Tester notamment recherche insensible aux accents (si mise en œuvre), permission de visibilité, transitions d’état et validation du formulaire.

### Parcours d’intégration
- Tests web pour navigation, formulaire de demande, erreurs réseau et partage de fiches.
- Tests sur Android et iOS pour liens entrants, champs, clavier, retour système, tailles d’écran et notifications si ajoutées.
- E2E avec Maestro ou solution équivalente seulement pour quelques parcours à forte valeur ; maintenir les tests qui couvrent une vraie exigence.

### Sécurité / qualité
- Tester qu’un utilisateur ne peut lire/modifier la demande d’un autre.
- Tester les profils suspendus/non consentis : jamais présents dans les réponses publiques ou HTML pré-rendu.
- Vérifier que les secrets serveur ne se retrouvent pas dans le bundle web ou l’application native.
- Tester contraste, focus, lecteurs d’écran, mode texte agrandi et connexion limitée.

Références :
- Tests unitaires Expo : https://docs.expo.dev/develop/unit-testing/
- E2E avec Maestro via EAS Workflows : https://docs.expo.dev/eas/workflows/examples/e2e-tests/

## 20. Jalons techniques proposés

1. **Validation sans backend :** tester le prototype et le processus manuel avec participants consentants.
2. **Spike multiplateforme Expo :** route SSR/pré-rendue de fiche artisan, recherche, partage de lien, build Android/iOS ; vérifier web SEO, accessibilité et performances sur appareils réels.
3. **Spécification pilote :** arrêter zone, métiers, données, rôles, notifications et procédure d’incident.
4. **Fondations produit :** initialiser Expo Router/TypeScript, design tokens, tests, règles métier pures et environnements.
5. **API et outil opérateur minimaux :** gestion consentie des profils, statuts, demandes et signalements avec contrôle d’accès.
6. **Parcours public connecté :** recherche de profils réels et demande avec accusé serveur, échec géré et suppression/retrait.
7. **Renforcement :** tests, sécurité, observabilité, sauvegardes, support et audits d’accessibilité.
8. **Évolution :** étendre aux stores, nouveaux métiers ou territoires seulement lorsque l’offre et l’opération sont fiables.

## 21. Critères de préparation production

Ne pas considérer Kidima comme prêt à collecter des demandes réelles tant que :
- les données fictives sont retirées et des profils consentis sont disponibles ;
- la transmission serveur confirme effectivement réception ;
- les autorisations et la politique de données sont implémentées ;
- un opérateur peut maintenir les profils et traiter les signalements ;
- les contacts d’assistance et procédures d’incident existent ;
- les parcours mobiles, clavier et réseau faible ont été testés ;
- les limites de responsabilité et les messages utilisateurs ont été revus.
