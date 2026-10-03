# Sécurité

**Statut :** exigences cibles à implémenter et vérifier avant toute donnée réelle.

## Identité et autorisations

- JWT access token à durée courte et refresh token rotatif/révocable, selon une politique validée.
- Argon2id pour le hachage des mots de passe si l’authentification par mot de passe est retenue.
- Sessions persistées, révocables et protégées contre le rejeu.
- RBAC pour visiteur, client, artisan, opérateur et administrateur.
- Vérification d’ownership côté serveur à chaque lecture ou mutation d’une ressource.
- MFA et moindre privilège à évaluer pour les comptes administratifs.

## Entrées et API

- Validation stricte des DTO, tailles, formats et valeurs autorisées.
- Rate limiting et protections anti-abus sur authentification, demandes et signalements.
- CORS limité aux origines configurées ; Helmet et en-têtes adaptés.
- HTTPS obligatoire hors développement local.
- Erreurs normalisées sans fuite de données internes ou d’autres utilisateurs.
- Tests d’accès horizontal et de transitions interdites.

## Données, fichiers et secrets

- Secrets dans un gestionnaire de secrets ou variables d’environnement protégées, jamais dans Git ni le bundle mobile.
- `.env` exclus du dépôt ; seuls les `.env.example` sans secrets sont versionnés.
- Uploads avec liste blanche de types, limites de taille, inspection/scan, stockage non public par défaut et URLs d’accès temporaires.
- Coordonnées, descriptions et journaux minimisés ; ne pas logger de données sensibles.
- Politique de consentement, correction, retrait, suppression et conservation documentée.

## Audit et réponse aux incidents

- Audit logs pour changements de profil, permissions, décisions de modération et accès sensibles.
- Identité de l’acteur, action, ressource et horodatage ; pas de contenu privé superflu.
- Procédure de révocation des sessions/clefs, sauvegarde/restauration et gestion des incidents à documenter.

Ce document décrit une cible, pas des contrôles déjà implémentés. Une revue de sécurité indépendante reste nécessaire avant production.
