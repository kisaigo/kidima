# Déploiement

**Statut :** architecture cible ; aucun environnement backend n’est déployé.

## Architecture cible

```text
Internet
  ↓
Cloudflare (DNS / protection / TLS selon configuration)
  ↓
Nginx ou Caddy
  ↓
NestJS (monolithe modulaire)
  ├── PostgreSQL
  ├── Redis
  └── R2/S3
```

Le choix des fournisseurs, l’hébergement, les régions, les coûts et les obligations de résidence des données restent à décider. Le client mobile/web est publié séparément de l’API.

## Environnements

- `development` : données synthétiques, services locaux, secrets de développement uniquement.
- `staging` : configuration proche production, données non sensibles et tests d’intégration.
- `production` : accès restreints, sauvegardes, supervision, alertes et procédure de retour arrière.

## Pipeline cible

1. Vérifier lint, types, tests et dépendances.
2. Construire l’application et le backend de manière reproductible.
3. Publier vers staging et exécuter les smoke tests.
4. Appliquer des migrations contrôlées avec sauvegarde préalable.
5. Promouvoir vers production après validation.

Les workflows GitHub Actions, Dockerfiles, reverse proxy, migrations, backups, monitoring et rollback restent à mettre en place. Aucun secret réel ne doit être commité.
