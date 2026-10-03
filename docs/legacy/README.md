# Kidima

Kidima est un projet de plateforme destinée à faciliter la recherche d’artisans et de services de proximité. Le dépôt de travail contient actuellement une **maquette front-end interactive** et sa documentation de cadrage ; il ne s’agit pas encore d’un service opérationnel.

## Commencer

Ouvrir `index.html` dans un navigateur récent. Aucun gestionnaire de paquets, installation ou build n’est requis. La maquette charge DM Sans et Manrope depuis Google Fonts lorsqu’une connexion est disponible ; sinon, des polices système sont utilisées.

## Documentation

| Document | Contenu |
|---|---|
| `DOCUMENTATION_METIER.md` | Vision, problème à valider, publics, fonctionnement opérationnel, modèle économique hypothétique, impact, risques et décisions ouvertes |
| `DOCUMENTATION_FONCTIONNELLE.md` | Fonctions de la maquette, parcours cible, rôles, règles métier, exigences priorisées et critères d’acceptation |
| `DOCUMENTATION_TECHNIQUE.md` | Architecture actuelle, modèle de données et API indicatifs, sécurité, confidentialité, tests, exploitation et préparation à la production |
| `DESIGN_SYSTEM.md` | Identité, palette, typographie, composants, responsive, accessibilité et règles éditoriales |
| `PLAN_DE_DEMARRAGE.md` | Phases proposées du cadrage et de la validation au pilote et à l’extension |
| `CADRAGE_PILOTE.md` | Décisions initiales pour N’Djaména, les métiers, le contact direct, ainsi que les risques et points à valider |
| `GUIDE_TEST_UTILISATEURS.md` | Script de test, tâches de maquette, questions clients/artisans et fiche d’observation |
| `NOTE_RECHERCHE.md` | Fiche de synthèse à compléter après les entretiens et tests utilisateurs |
| `SCRIPT_TEST_SIMPLE.md` | Script de test court et réutilisable pour un premier tour de recueil |

## Recommandation technique

Pour une première version multiplateforme, la documentation recommande **Expo + Expo Router + React Native + TypeScript**, avec des cibles web, Android et iOS. Les pages publiques web devront utiliser le rendu statique ou serveur adapté à l’annuaire. **Next.js** reste l’alternative si le pilote valide un lancement web/PWA uniquement. Expo n’est pas encore installé dans la maquette statique.

Les raisons, les limites et les solutions alternatives sont décrites dans `DOCUMENTATION_TECHNIQUE.md`.

## Fichiers applicatifs

- `index.html` : interface et formulaire de démonstration.
- `styles.css` : styles et responsive.
- `app.js` : recherche, filtres, profils d’exemple et interactions.

## Ce que la maquette permet

- Rechercher dans une liste locale de profils fictifs.
- Filtrer par métier et ville.
- Voir un état sans résultat et réinitialiser les filtres.
- Ouvrir un formulaire de démonstration.

## Ce qu’elle ne fait pas

Il n’y a ni base de données, ni comptes, ni profils réels, ni vérification d’artisans, ni transmission de demandes, ni messagerie, ni paiement, ni avis. Les six profils sont fictifs. Le formulaire indique explicitement qu’il n’envoie et ne stocke rien.

Les routes d’API, modèles de données, rôles et modèles économiques décrits dans les documents sont des **propositions à valider**, et non des fonctionnalités existantes ou des choix de fournisseurs définitifs.

## Vérification technique

La syntaxe du JavaScript peut être contrôlée avec :

```bash
node --check app.js
```

Ce contrôle ne remplace pas les tests dans un navigateur, les tests d’accessibilité ni une revue de sécurité.
