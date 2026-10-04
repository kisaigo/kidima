# KIDIMA

Kidima est une plateforme de mise en relation entre clients et artisans, éditée par KISAIGO. Le dépôt est organisé en monorepo. L’application Expo unique est présente dans `apps/app` pour les parcours clients, artisans, Android, iOS et Web ; l’administration et l’API backend restent des espaces réservés, et les données métier de l’application sont encore locales.

## Architecture

- `apps/app` : prototype Expo / React Native unique pour les parcours client et artisan avec un compte unique, sur Android, iOS et Web
- `apps/admin` : maquette web HTML statique et indépendante, sans authentification ni API ; pas un back-office opérationnel
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

### Admin
- Maquette HTML/CSS/JavaScript sans framework ; la stack de production reste à décider

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

La maquette indépendante du back-office (données fictives, sans authentification) se trouve dans `apps/admin/index.html` et peut être ouverte dans un navigateur.

Pour les contrôles :

```bash
npm run lint:app
npm run typecheck:app
npm run export:web
```

Les profils visibles sont fictifs ; les demandes, devis, signalements et indicateurs ne sont pas connectés à un backend. Aucune authentification, transmission métier ou persistance n’est configurée. L’interface ne doit pas être présentée comme un service opérationnel.

Voir [`docs/PRODUCT_UX.md`](docs/PRODUCT_UX.md) pour la vision UX, l’architecture d’information, les tokens et les parcours cible. La maquette admin est un prototype HTML isolé dans `apps/admin/index.html`, pas un back-office sécurisé.

## Documentation

Voir [`docs/`](docs/) pour l’architecture cible et les décisions encore ouvertes.

## Éditeur

KISAIGO
