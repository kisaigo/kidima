# Backend

**Statut :** cible documentée, aucun projet NestJS n’est encore créé.

## Stack prévue

- NestJS et TypeScript
- PostgreSQL
- Prisma
- Redis pour les usages temporaires validés
- API REST versionnée `/api/v1`

Le backend est conçu comme un monolithe modulaire. Ne pas introduire de microservices avant des besoins opérationnels démontrés.

## Modules prévus

- `auth` : sessions, connexion, renouvellement et révocation des accès.
- `users` : comptes, coordonnées, préférences et état.
- `artisans` : profils publics et opérations de gestion.
- `categories` : métiers et référentiels actifs.
- `services` : prestations proposées et relations avec les artisans.
- `requests` : demandes clients et historique de statut.
- `quotes` : devis, lignes de prix, réponse et validité.
- `complaints` : signalements, traitement, messages et historique.
- `dashboard` : indicateurs définis, agrégats et activité autorisée.
- `notifications` : préférences, consentements, livraisons et échecs.
- `uploads` : métadonnées, validation et accès aux objets.
- `audit` : actions administratives sensibles, avec minimisation des données.
- `health` : disponibilité technique et dépendances nécessaires.

## Structure proposée

```text
apps/backend/src/
  main.ts
  app.module.ts
  common/
  config/
  modules/
    auth/ users/ artisans/ categories/ services/
    requests/ quotes/ complaints/ dashboard/
    notifications/ uploads/ audit/ health/
```

Chaque module pourra contenir contrôleur, service, DTO, repository et tests. Ne pas générer les modules ou un schéma Prisma avant validation du contrat et des règles métier.

## Contrats

Les DTO doivent être validés côté serveur. Les statuts, transitions, idempotence, pagination et autorisations doivent être documentés avant de brancher les écrans. Les anciennes routes mentionnées dans les documents de cadrage sont indicatives, pas un OpenAPI.
