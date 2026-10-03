# Plan de démarrage — Kidima

**Version :** 1.0  
**Statut :** plan de travail proposé, à adapter après validation du besoin  
**Projet actuel :** maquette web statique ; pas encore de service opérationnel.

## Objectif du plan

Faire passer Kidima de la maquette à un pilote utile, sans investir trop tôt dans une application complète. La première réussite n’est pas le nombre d’écrans développés : c’est de vérifier qu’un besoin réel existe, que des artisans souhaitent participer et que les demandes peuvent être traitées de manière fiable.

## Principes de démarrage

- Commencer dans une seule zone, avec peu de métiers.
- Tester le processus manuellement avant d’automatiser.
- Ne publier que des profils réels, consentis et dont les informations sont maintenues.
- Être explicite sur ce qui a été vérifié et ce qui ne l’a pas été.
- Ne pas collecter de données personnelles non nécessaires.
- Ne pas encaisser d’argent et ne pas promettre prix, disponibilité ou résultat au lancement.
- Choisir les technologies et fournisseurs après avoir arrêté le périmètre du pilote.

---

## Phase 0 — Cadrer le pilote

Le premier cadrage des choix du porteur est consigné dans [`CADRAGE_PILOTE.md`](CADRAGE_PILOTE.md). Il propose N’Djaména, une ambition de couverture de toute la ville, un catalogue ouvert à tous les métiers de service et un contact téléphonique direct. Ces orientations restent à valider avant de les traiter comme un engagement de lancement.

### Objectif
Définir un problème précis et un premier groupe d’utilisateurs au lieu de viser immédiatement tout le Tchad.

### Actions
1. Choisir une ville ou un territoire pilote en fonction de l’accès aux clients et artisans.
2. Identifier deux ou trois métiers à étudier en priorité.
3. Décrire le problème du client en une phrase claire.
4. Préciser le parcours souhaité : recherche autonome, aide d’un opérateur, ou combinaison des deux.
5. Lister les décisions à prendre sur le contact, la confidentialité, le contrôle des profils et les signalements.

### Livrables
- Périmètre de pilote d’une page.
- Liste des décisions prises et questions ouvertes.
- Hypothèses à tester, chacune associée à une preuve attendue.

### Critère de passage
L’équipe sait dire pour qui Kidima commence, quel problème elle teste et dans quelle zone. Les catégories affichées dans la maquette ne sont pas automatiquement les catégories retenues.

---

## Phase 1 — Vérifier le besoin auprès des personnes concernées

### Objectif
Comprendre comment les clients trouvent actuellement un artisan et ce qui rend cette recherche difficile ou incertaine.

### Actions
- Interroger des clients potentiels sur leurs expériences récentes, sans leur demander seulement s’ils « aiment l’idée ».
- Interroger des artisans sur la recherche de nouveaux clients, la réception de demandes, les informations qu’ils accepteraient de publier et les canaux qu’ils utilisent.
- Vérifier l’usage du téléphone, du web, des appels, de WhatsApp, des messages audio et des langues préférées.
- Identifier les inquiétudes : faux profils, tarifs, déplacements, données personnelles, disponibilité ou qualité du travail.
- Noter les comportements observés, les exemples concrets et les différences entre métiers ou quartiers.

### Livrables
- Synthèse des entretiens et problèmes récurrents.
- Proposition de parcours client et artisan révisée.
- Liste des informations nécessaires et de celles à ne pas collecter.

### Critère de passage
Plusieurs personnes décrivent un problème concret vécu récemment et les artisans interrogés comprennent la valeur de participer. Si ce n’est pas le cas, réviser le besoin ou le projet avant de développer.

---

## Phase 2 — Tester le service manuellement

### Objectif
Valider les mises en relation réelles sans attendre un backend ni une application mobile complète.

### Actions
1. Constituer un petit répertoire d’artisans ayant donné leur accord.
2. Définir ce que signifie « contact confirmé » ou tout autre statut utilisé ; ne pas employer un badge de confiance sans protocole précis.
3. Créer un formulaire léger pour recueillir les demandes, avec les seuls champs nécessaires.
4. Transmettre les demandes manuellement aux artisans concernés, avec l’accord du client.
5. Suivre les étapes : demande reçue, artisan contacté, réponse obtenue, service réalisé ou demande non aboutie.
6. Prévoir une personne responsable des relances, corrections de profils et signalements.

### Livrables
- Répertoire pilote avec consentements et dates de confirmation.
- Procédure écrite d’orientation et de traitement d’une demande.
- Journal minimal des résultats, sans données superflues.
- Retour des clients et artisans après les essais.

### Critère de passage
Le processus manuel permet de traiter des demandes et de constater où se produisent les blocages. Les profils restent joignables et les utilisateurs comprennent les limites du service.

---

## Phase 3 — Définir le MVP et ses règles

### Objectif
Décider quelles parties doivent être automatisées pour résoudre les blocages observés.

### Fonctions MVP possibles
- Recherche par métier et zone.
- Fiche publique d’artisan avec informations consenties, statut expliqué et date de mise à jour.
- Formulaire de demande avec confirmation de transmission.
- Vue opérateur pour créer, corriger, publier ou suspendre un profil.
- Suivi des demandes et traitement des signalements.
- Aide et information sur l’utilisation des données.

### À garder hors périmètre tant que non justifié
- Paiement intégré, portefeuille ou crédit.
- Avis publics et classement automatique.
- Géolocalisation précise et suivi en continu.
- Chat complexe, réservation garantie ou disponibilité en temps réel.
- Extension simultanée à de nombreuses villes.

### Livrables
- Spécification fonctionnelle MVP.
- Règles de publication et de suspension des profils.
- Consentement, notice de confidentialité et durée de conservation à faire réviser.
- Parcours d’assistance et de signalement.

### Critère de passage
Chaque fonction du MVP répond à un blocage observé ou à une exigence de sécurité/gestion. Les responsabilités humaines sont assignées.

---

## Phase 4 — Construire une preuve technique multiplateforme

### Choix recommandé à tester
**Expo + Expo Router + React Native + TypeScript** pour les cibles web, Android et iOS. Le web doit rester accessible par lien sans installation. Les pages publiques de métiers et d’artisans devront être rendues en HTML exploitable, avec rendu statique ou serveur selon les besoins de mise à jour.

### Prototype technique limité
- Une page de recherche.
- Une fiche artisan partageable par URL.
- Une demande de démonstration.
- Vérification du fonctionnement sur navigateur web, Android et iOS.
- Test du référencement, des aperçus de partage, de la navigation clavier, de l’accessibilité et du temps de chargement.

### Livrables
- Prototype Expo minimal.
- Décision documentée sur statique ou SSR pour le web.
- Liste des contraintes de rendu et des composants nécessitant une adaptation plateforme.
- Retour de test sur les appareils réellement disponibles.

### Critère de passage
La même expérience répond aux besoins essentiels sur le web et les téléphones ciblés. Si la partie web publique est trop contraignante, comparer une option web dédiée avant de construire tout le produit.

---

## Phase 5 — Construire le MVP connecté

### Ordre de réalisation indicatif
1. Initialiser Expo, Expo Router, TypeScript, les conventions de code et le design system.
2. Créer les types et règles métier : artisan, catégorie, zone, demande, consentement et statuts.
3. Construire une interface opérateur minimale pour maintenir les profils et catégories.
4. Connecter la recherche aux profils publiés.
5. Créer la demande, enregistrer son consentement et confirmer sa réception seulement après succès serveur.
6. Ajouter la transmission aux artisans et gérer les erreurs ou doublons.
7. Ajouter signalements, suspension de profils et assistance.
8. Tester les autorisations, la confidentialité, l’accessibilité et le réseau faible.

### Livrables
- MVP sur environnement de test avec données fictives.
- Procédures de sauvegarde, support, correction et suppression.
- Suite de tests adaptée aux parcours importants.

### Critère de passage
Aucun profil fictif n’est visible comme réel ; les demandes ont une confirmation serveur ; les utilisateurs ne peuvent pas consulter les demandes d’autres personnes ; l’équipe sait gérer un signalement et suspendre un profil.

---

## Phase 6 — Pilote contrôlé

### Objectif
Mesurer si Kidima rend effectivement la recherche ou la mise en relation plus utile.

### À mesurer
- Part des demandes qualifiées recevant une réponse utile.
- Délai médian de réponse, par métier et zone.
- Part des demandes aboutissant à une prestation déclarée.
- Part des profils joignables et actualisés.
- Satisfaction des clients et artisans.
- Signalements, incidents et délais de résolution.
- Temps humain et coût opérationnel par demande aboutie.

### Critère de passage
Définir les seuils avant le lancement du pilote, puis décider de continuer, corriger ou arrêter selon les résultats et la sécurité des utilisateurs — pas seulement selon le nombre d’inscriptions.

---

## Phase 7 — Étendre progressivement

N’ajouter une ville, un métier, un canal (SMS, messagerie, notifications) ou une fonction native que si :
- l’offre existante est suffisamment dense et actualisée ;
- la capacité de support et de modération suit ;
- les résultats du pilote montrent une valeur réelle ;
- les coûts et responsabilités associés sont compris ;
- les utilisateurs concernés sont consultés.

---

## Décisions à prendre avant le premier développement produit

- Quelle ville ou zone sera pilote ?
- Quels métiers sont les plus utiles à tester en premier ?
- Le lancement cible-t-il web seulement, ou Android/iOS dès la première version ?
- Qui recrute, confirme et actualise les artisans ?
- Comment une demande est-elle transmise, et à combien de personnes ?
- Quel contact client est nécessaire et quand est-il partagé ?
- Comment traite-t-on les plaintes et les profils injoignables ?
- Quel budget est réservé au développement, au support et aux opérations ?

## Sources techniques de référence

- [Expo Router — introduction](https://docs.expo.dev/router/introduction/)
- [Expo — développement web](https://docs.expo.dev/workflow/web/)
- [Expo Router — rendu statique](https://docs.expo.dev/router/web/static-rendering/)
- [Expo Router — rendu serveur](https://docs.expo.dev/router/web/server-rendering/)
- [Expo — tests unitaires](https://docs.expo.dev/develop/unit-testing/)
- [Expo — builds](https://docs.expo.dev/build/introduction/)
