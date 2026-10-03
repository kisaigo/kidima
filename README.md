# KIDIMA

Kidima est une plateforme de mise en relation entre clients et artisans, éditée par KISAIGO. Le dépôt est organisé en monorepo. L’application Expo unique est présente dans `apps/app` pour les parcours clients, artisans, Android, iOS et Web ; l’administration et l’API backend restent des espaces réservés, et les données métier de l’application sont encore locales.

## Architecture

- `apps/app` : application Expo / React Native unique pour clients et artisans, sur Android, iOS et Web
- `apps/admin` : futur espace d’administration
- `apps/backend` : future API NestJS
- `packages` : futurs types, configuration et modules partagés
- `docs` : architecture, API, sécurité, déploiement et feuille de route
- `archive/static-prototype` : ancienne maquette HTML conservée comme référence
- `docs/legacy` : documents de cadrage et plans antérieurs conservés

## Stack

### Application principale
- Expo
- React Native
- Expo Router
- TypeScript

### Admin (prévu)
- React avec Vite ou Next.js, décision à confirmer

### Backend (prévu)
- NestJS
- TypeScript
- PostgreSQL
- Prisma
- Redis

### Infrastructure (cible)
- Docker
- Cloudflare R2 ou stockage S3 compatible
- GitHub Actions
- Nginx ou Caddy
- Monitoring et sauvegardes

Les technologies marquées « prévu » ou « cible » ne sont pas encore installées ni déployées.

## Modules métier

Authentification, utilisateurs, artisans, métiers, services, demandes, devis, réclamations, dashboard, notifications, audit et sécurité.

## Démarrage de l’application

Depuis la racine du monorepo :

```bash
npm install
npm run app
```

Pour lancer le web :

```bash
npm run app:web
```

Pour les contrôles :

```bash
npm run lint:app
npm run typecheck:app
npm run export:web
```

Les profils, demandes, devis, signalements et indicateurs visibles dans l’application restent des données de démonstration. Aucune transmission métier persistante n’est configurée.

## Documentation

Voir [`docs/`](docs/) pour l’architecture cible et les décisions encore ouvertes.

## Éditeur

KISAIGO
