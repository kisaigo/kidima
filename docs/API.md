# API

**Statut :** familles d’API cibles, aucune API n’est déployée et aucun contrat OpenAPI n’est défini.

Base cible à décider : `/api/v1`.

## Familles prévues

- `/api/v1/auth` : connexion, renouvellement et révocation de session.
- `/api/v1/artisans` : recherche publique et fiche filtrée ; gestion privée séparée.
- `/api/v1/categories` : liste des métiers actifs.
- `/api/v1/services` : référentiel des services et prestations.
- `/api/v1/requests` : création, consultation autorisée, retrait et transitions.
- `/api/v1/quotes` : sollicitation, réponse, lignes de prix et état.
- `/api/v1/complaints` : création, liste/détail autorisés, messages et historique.
- `/api/v1/admin` : opérations protégées, dashboard et gestion.

## Contrats à décider

- Méthodes, schémas de requête/réponse et pagination.
- Authentification visiteurs/clients/artisans/opérateurs et permissions par ressource.
- Statuts canoniques, transitions et champs visibles pour chaque rôle.
- Distinguer demande d’intervention et demande de devis, ou définir explicitement leur relation.
- Clés d’idempotence pour les soumissions et reprises réseau.
- Codes d’erreur structurés, identifiant de corrélation et messages sûrs.
- Définitions des KPI et fenêtres temporelles du dashboard.

La documentation technique historique dans `docs/legacy/DOCUMENTATION_TECHNIQUE.md` contient quelques routes indicatives. Elles ne doivent pas être traitées comme un contrat serveur confirmé.
