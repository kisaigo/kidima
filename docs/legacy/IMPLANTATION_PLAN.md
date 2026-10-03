# Implémentation de l'application Kidima Expo

**Version :** 1.0  
**Statut :** plan de travail. Aucun projet Expo n'est encore créé.  
**Choix technique :** Expo Router, React Native, TypeScript, pour web + Android + iOS.

## 1. Pourquoi Expo

Cette proposition vise une application universelle à partir d'une seule base de code :
- navigation et liens web sur les navigateurs et mobiles ;
- pages publiques rendues pour le partage et le référencement ;
- builds Android et iOS sans maintenance d'un environnement natif manuel ;
- principes de sécurité et de consentement explicites dans le parcours de création de profil.

Ce n'est pas une garantie de parfaite parité UI. Le prototype devra vérifier les différences entre navigateur et applications natives.

## 2. Étape 0 — Conception rapide et agrément financier

### Livrables
- Sélection des métiers à tester (2 à 4 au début).
- Définition du territoire pilote et de l'ouverture progressive des zones.
- Définition des règles de consentement, de retrait et de données.
- Décision sur le canal de contact : téléphone, message, formulaire ou combinaison.
- Estimation des coûts de développement, de build et de distribution.

### Attendus
- Un document technique simplifié de l'application Expo.
- Une liste de métiers and zones à privilégier.
- Un budget officiel vérifié avant la commande.
- Un plan de tests validé.

---

## 3. Étape 1 — Projets Expo initiaux

### Objectifs
- Créer un projet React Native Expo avec Expo Router.
- Vérifier l'exécution sur web, Android et iOS.
- S'assurer que les builds et les dépôts sont accessibles et testés.

### Actions
1. Créer le projet Expo avec Expo Router.
2. Vérifier l'exécution du projet sur web.
3. Vérifier l'exécution sur Android pour la première fois.
4. Vérifier l'exécution sur iOS si matériel et autorisations disponibles.
5. Définir les ports d'exécution, les versions et les points de vérification.
6. Préparer le stockage privé des clés et fichiers d'exécution.

### Livrables
- Dossier de projet Expo initial.
- Commande de construction vérifiée.
- Fichier de test (CI/CI local) si applicable.
- Bus de parties publiques pour les tests obligatoires.

### Critère d'acceptation
- Le projet s'ouvre en mode développement dans tous les canaux requis.
- Les builds ne sont pas bloqués par une incompatibilité de profil ou d'équipement.

---

## 4. Étape 2 — Prototype web public

### Objectifs
- Répliquer le parcours de recherche et de fiche sur le web.
- Vérifier le référencement, le partage et l'accessibilité.
- Définir le mode de rendu : statique, serveur ou mixte.

### Actions
1. Créer les routes publiques : accueil, métiers, fiche, demande, vers les zones.
2. Implémenter le filtrage par métier et zone.
3. Vérifier que les tâches peuvent inclure une requête de recherche.
4. Tester le référencement, les aperçus de partage et l'accessibilité.
5. Vérifier la perspective et le chargement sur les appareils à faible débit.

### Livrables
- Page de recherche publique.
- Fiche artisan de démonstration.
- Page de demande de démonstration.
- Méthode de test pour l'accessibilité, le SEO et le rendu.

### Critère d'acceptation
- Un utilisateur peut rechercher un métier, voir une fiche et relancer la demande sur le web.
- Le rendu ne nuit pas à l'accessibilité ou à la prise en charge du contenu.

---

## 5. Étape 3 — Prototype mobile public

### Objectifs
- Vérifier les performances et l'expérience sur Android et iOS.
- Tester la navigation et la recherche sur appareils réels.
- Préparer les considérations de consentement et de mots-clés.

### Actions
1. Mettre en place les pages publique, création de demande et profil.
2. Vérifier la navigation, les listes et les formulaires.
3. Vérifier les performances sur les appareils realistes.
4. Tester la compatibilité avec le système de sécurité, les liens publics et la répartition du contenu.
5. Tester les essais sur différents appareils si disponibles.

### Livrables
- Version mobile avec pages publiques et demandes.
- Procédure de test par appareil et version.
- Liste des problèmes de résistance et de compatibilité.

### Critère d'acceptation
- Le parcours public est utilisable sur les appareils cibles.
- Les performances sont acceptables sur les appareils de débit faible.

---

## 6. Étape 4 — Création et gestion des profils

### Objectifs
- Garantir que la publicité d'un artisan est explicite, vérifiable et révocable.
- Exiger un consentement clair avant la publication.
- Permettre la correction et le retrait de données.

### Actions
1. Construire le formulaire et le guide d'inscription pour les artisans.
2. Séparer les données publiques et privées.
3. Ajouter un état d'approbation, de mise à jour et de retrait.
4. Ajouter une notice de consentement et la date de la dernière vérification.
5. Prévoir les champs nécessaires seulement pour les métiers et zones.

### Livrables
- Formulaire d'inscription et de création de profil.
- Journal de quelques lignes et autorisations.
- Procédure de retrait et de suspension.
- Document d'explication pour l'artisan.

### Critère d'acceptation
- Un artisan peut voir ses informations publiques à partir de la procédure.
- Le numéro ou le contact n'est pas affiché sans accord explicite.
- Un artisan peut demander le retrait sans frais compatibles.

---

## 7. Étape 5 — Demande et confirmation

### Objectifs
- Recueillir les données nécessaires au service.
- Confirmer la réception pour toute demande réelle.
- Éviter les erreurs de doublons, de formulaire inutile et de champs non nécessaires.

### Actions
1. Construire le formulaire de demande : métier, zone, description, contact, consentement.
2. Ajouter une vérification du navigateur et un message de confirmation.
3. Accepter les silences pendant la requête, sauf si le service est réellement réceptionné.
4. Ajouter les limites de taille et les règles de doublons.
5. Ajouter une option pour masquer le profil après la demande.

### Livrables
- Formulaire de demande du client.
- Méthode de transmission pour la première phase.
- Journal des journaux de demande et de requête.
- Procédure de suppression et de suppression des données.

### Critère d'acceptation
- Une demande réelle génère une réponse et un accusé de réception.
- Un double clic ne crée pas de demande dupliquée.
- Les données restent limitées au service nécessaire.

---

## 8. Étape 6 — Sécurité, confidentialité et modération

### Livrables
- Accès limités aux administrateurs et opérateurs.
- Log minimal et traçable des actions sensibles.
- Méthode de suppression et de modification de données.
- Procédure de signalement et de modération.
- Protocole de rétractation d'un profil ou de suppression des données.

### Critère d'acceptation
- Un administrateur peut contrôler la disponibilité et les traces.
- Les droits sont adaptés et délivrés de manière individuelle.
- Les données sensibles ne sont pas stockées ou publiées sans enjeu explicite.

---

## 9. Étape 7 — Tests et analyse

### Tests requis
- Composants et logique métier.
- Formulaires, filtres, statuts et consommation d'API.
- Navigateur web, Android et iOS sur appareils variés.
- Accessibilité, contraste, clavier et exploration vocale.
- Connexion lente, appels multiples et reprise après erreur.

### Livrables
- Rapport de tests avec les problèmes critiques.
- Liste des paramètres et versions à prendre en charge.
- Procédure de correction des bugs.
- Indicateurs initiales de satisfaction et d'engagement.

### Critère d'acceptation
- Aucun objectif essentiel non corrigé.
- Le processus de réparation est documenté et clair.
- Les tests sont confirables et reproductibles.

---

## 10. Prochaines étapes après cette phase

1. Valider l'interface et le contenu initial.
2. Confirmer le périmètre réel et les risques d'inclusion de services.
3. Définir la solution d'API et le mode de stockage.
4. Évaluer les coûts et les besoins en construction.
5. Préparer une version de démonstration à partager avec des artisans et des clients.

---

## 11. Documents de soutien à conserver

- Fichiers d'interface, statuts et consentements.
- Procédure de demande et de transmission.
- Journal d'audit des actions sensibles.
- Procédure de réponse et de réparation.
- Plan de tests, liste d'appareils et versions.
- Budget, coûts de build et prévisions de maintenance.
