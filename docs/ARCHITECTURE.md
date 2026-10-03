# Architecture Kidima

**Statut :** architecture cible. Seule l’application Expo de `apps/app` existe aujourd’hui ; les services backend, admin et packages partagés ne sont pas implémentés.

## Vue générale

```text
Utilisateur
   ↓
Expo App (Android / iOS / Web)
   ↓ HTTPS
REST API NestJS
   ↓
PostgreSQL

Backend (monolithe modulaire)
 ├── Redis (cache, limitations et tâches temporaires)
 ├── R2/S3 (fichiers et médias)
 ├── Email / Push / canaux externes (à décider)
 └── Audit
```

Le backend sera un **monolithe modulaire**, pas un ensemble de microservices. Il fournira une API versionnée commune aux clients et à l’administration.

## Applications et packages

- `apps/app` : application Expo / React Native unique pour clients et artisans, sur Android, iOS et Web. Les données métier sont encore locales.
- `apps/admin` : futur client web destiné aux opérations Kidima. Son framework reste à choisir.
- `apps/backend` : future API NestJS et règles métier.
- `packages/types` : futurs contrats TypeScript partagés et versionnés.
- `packages/config` : futures configurations lint/TypeScript communes.
- `packages/shared` : fonctions sans dépendance UI, après identification de besoins réels.
- `docs/legacy` : cadrage et documents antérieurs conservés.
- `archive/static-prototype` : maquette web historique conservée comme référence.

## Domaines métier

Le backend regroupera les domaines auth, utilisateurs, artisans, catégories, services, demandes, devis, réclamations, dashboard, notifications, uploads, audit et santé. Chaque module possède ses responsabilités et son interface interne ; les transactions sensibles restent contrôlées par le serveur.

## Données et infrastructure

PostgreSQL est la source de vérité pour les identités, profils, demandes, devis, réclamations, statuts et audits. Redis est optionnel et ne remplace pas la persistance transactionnelle. R2/S3 héberge les fichiers après validation et contrôle d’accès. Email/push et WhatsApp/SMS nécessitent des choix, consentements et politiques de conservation distincts.

## Sécurité et exploitation

Les clients Expo ne contiennent aucun secret serveur. L’API applique authentification, autorisation par rôle et ownership, validation des entrées, limitation d’abus et journalisation minimisée. HTTPS, secrets hors Git, sauvegardes restaurables, monitoring et procédure d’incident sont des prérequis de déploiement, pas des capacités déjà en place.

## Flux cible

1. L’application demande des données publiques ou envoie une action à l’API versionnée.
2. NestJS valide DTO, identité, permissions et règles métier.
3. Une transaction PostgreSQL enregistre le changement et son historique.
4. Les tâches externes éventuelles sont exécutées hors du chemin critique et leur résultat est traçable.
5. L’API retourne un résultat contractuel ; le client affiche succès seulement après accusé serveur.

La base de données, l’hébergement, le fournisseur Redis, le stockage objet et les canaux de notification restent à confirmer.
