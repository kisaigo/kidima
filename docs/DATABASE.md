# Base de données

**Statut :** modèle conceptuel prévu ; PostgreSQL et Prisma ne sont pas encore configurés. Aucune migration ni table n’existe.

## Tables envisagées

- `users`
- `sessions`
- `artisans`
- `service_categories`
- `services`
- `artisan_services`
- `artisan_service_areas`
- `artisan_availability`
- `service_requests`
- `service_request_status_history`
- `request_artisans`
- `quotes`
- `quote_items`
- `complaints`
- `complaint_status_history`
- `complaint_messages`
- `reviews`
- `attachments`
- `notifications`
- `audit_logs`

## Principes à confirmer

- Identifiants opaques et clés étrangères cohérentes.
- Séparer coordonnées privées et champs visibles publiquement.
- Historiser les changements de statut nécessaires au suivi et à l’audit.
- Définir suppression, anonymisation et durées de conservation avant données réelles.
- Encadrer les pièces jointes par taille, type, scan et politique de rétention.
- Définir les invariants transactionnels des demandes et devis.
- Ajouter index et contraintes à partir des requêtes et volumes attendus.

Les rôles, statuts, cardinalités, contraintes uniques et colonnes restent à valider avec le produit. Ne pas générer Prisma tant que ces décisions et les contrats API ne sont pas arrêtés.
