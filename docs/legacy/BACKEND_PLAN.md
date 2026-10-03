# PLAN COMPLET BACKEND — KIDIMA

## 1. Objectif

Construire le backend de Kidima permettant de faire fonctionner réellement l’application existante.

Le frontend est déjà conçu.

Le backend doit fournir les données et actions nécessaires pour :

- rechercher des artisans ;
- consulter un artisan ;
- gérer les métiers et services ;
- créer une demande d’intervention ;
- demander un devis ;
- suivre les demandes ;
- gérer les artisans ;
- gérer les signalements/réclamations ;
- gérer les statuts ;
- alimenter le dashboard d’administration ;
- authentifier les utilisateurs ;
- contrôler les permissions ;
- historiser les actions sensibles ;
- protéger les données et l’API.

IMPORTANT :

Ne pas modifier le frontend ou inventer de nouvelles fonctionnalités simplement pour faciliter le backend.

Le backend doit s’adapter au produit existant.

---

# 2. STACK TECHNIQUE RECOMMANDÉE

## Backend

Node.js LTS

NestJS

TypeScript

## Base de données

PostgreSQL

## ORM

Prisma recommandé.

Pourquoi :

- migrations propres ;
- schéma très lisible ;
- types TypeScript ;
- bonnes performances ;
- excellent pour un stagiaire ;
- réduit beaucoup d’erreurs SQL.

Alternative acceptable :
TypeORM si le projet l’utilise déjà.

Ne pas utiliser plusieurs ORM.

---

# 3. SERVICES D’INFRASTRUCTURE

Prévoir :

- PostgreSQL : données principales ;
- Redis : cache, rate limiting, OTP et jobs temporaires ;
- stockage S3/R2 : photos et fichiers ;
- SMTP/API email : notifications ;
- éventuellement SMS/WhatsApp plus tard ;
- Docker pour l’environnement serveur.

Architecture cible :

```text
Frontend Expo
      |
      v
REST API NestJS
      |
      +---- PostgreSQL
      |
      +---- Redis
      |
      +---- Object Storage S3/R2
      |
      +---- Email / notifications
```

---

# 4. STRUCTURE DU PROJET

Organisation recommandée :

```text
backend/
│
├── src/
│   ├── main.ts
│   ├── app.module.ts
│
│   ├── config/
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   ├── auth.config.ts
│   │   ├── storage.config.ts
│   │   └── env.validation.ts
│
│   ├── common/
│   │   ├── decorators/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── filters/
│   │   ├── pipes/
│   │   ├── constants/
│   │   └── utils/
│
│   ├── auth/
│   ├── users/
│   ├── artisans/
│   ├── categories/
│   ├── services/
│   ├── requests/
│   ├── quotes/
│   ├── complaints/
│   ├── dashboard/
│   ├── uploads/
│   ├── notifications/
│   ├── audit/
│   └── health/
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── test/
├── docker/
├── .env.example
├── Dockerfile
├── docker-compose.yml
└── README.md
```

Chaque domaine doit posséder :

```text
module.ts
controller.ts
service.ts
dto/
entities ou repository/
tests/
```

---

# 5. ENVIRONNEMENTS

Prévoir trois environnements.

```text
development
staging
production
```

Ne jamais utiliser la base production pour développer.

Variables :

```text
NODE_ENV
PORT

DATABASE_URL
REDIS_URL

JWT_ACCESS_SECRET
JWT_REFRESH_SECRET

JWT_ACCESS_TTL
JWT_REFRESH_TTL

CORS_ORIGINS

STORAGE_ENDPOINT
STORAGE_BUCKET
STORAGE_ACCESS_KEY
STORAGE_SECRET_KEY

SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD

APP_URL
API_URL
```

Créer :

```text
.env.example
```

Mais ne jamais mettre de vraies clés dedans.

---

# 6. BASE DE DONNÉES

## 6.1 User

```text
users
```

Champs :

```text
id UUID
first_name
last_name
phone
email
password_hash
role
status
phone_verified_at
email_verified_at
last_login_at
created_at
updated_at
deleted_at
```

Roles possibles :

```text
CLIENT
ARTISAN
ADMIN
SUPPORT
SUPER_ADMIN
```

Statuts :

```text
ACTIVE
PENDING
SUSPENDED
DISABLED
```

Email nullable si téléphone principal.

Téléphone unique.

Email unique lorsque renseigné.

---

# 7. ARTISANS

Table :

```text
artisans
```

Champs :

```text
id
user_id
slug
business_name
display_name
description
experience_years
phone
whatsapp_phone
city
district
address
latitude
longitude
profile_image_url

verification_status
publication_status

average_rating
reviews_count

is_available
created_at
updated_at
```

Verification :

```text
PENDING
VERIFIED
REJECTED
SUSPENDED
```

Publication :

```text
DRAFT
PUBLISHED
HIDDEN
```

Ne pas confondre :

```text
artisan vérifié
```

et

```text
artisan publié
```

Un profil peut être vérifié mais temporairement masqué.

---

# 8. MÉTIERS / CATÉGORIES

Table :

```text
service_categories
```

Exemples :

```text
Plomberie
Électricité
Climatisation
Menuiserie
Peinture
Maçonnerie
```

Champs :

```text
id
name
slug
icon
description
is_active
sort_order
created_at
updated_at
```

---

# 9. SERVICES

Table :

```text
services
```

Exemple :

```text
Réparation fuite
Installation robinet
Débouchage
```

Champs :

```text
id
category_id
name
slug
description
is_active
created_at
updated_at
```

---

# 10. SERVICES DES ARTISANS

Relation :

```text
artisan_services
```

Champs :

```text
id
artisan_id
service_id
price_from
price_to
price_unit
description
is_active
```

Exemple :

```text
Ali
Réparation fuite
5 000 FCFA
```

Ne pas mettre les tarifs directement dans la table artisan.

---

# 11. ZONES D’INTERVENTION

Table :

```text
artisan_service_areas
```

Champs :

```text
id
artisan_id
city
district
radius_km
```

Permettra plus tard une recherche géographique correcte.

---

# 12. DISPONIBILITÉS

Table :

```text
artisan_availability
```

Champs :

```text
id
artisan_id
day_of_week
start_time
end_time
is_available
```

Possibilité d’ajouter :

```text
artisan_availability_exceptions
```

pour :

```text
vacances
fermetures
journée spéciale
```

---

# 13. DEMANDES D’INTERVENTION

Table principale :

```text
service_requests
```

Champs :

```text
id
reference
client_id nullable
client_name
client_phone
category_id
service_id nullable
description
city
district
address
preferred_date
preferred_time
latitude nullable
longitude nullable

status

created_at
updated_at
completed_at
cancelled_at
```

La référence utilisateur doit être lisible.

Exemple :

```text
DEM-2026-000142
```

Ne jamais afficher uniquement l’UUID.

---

# 14. STATUTS DES DEMANDES

Workflow :

```text
SUBMITTED
MATCHING
QUOTED
ACCEPTED
IN_PROGRESS
COMPLETED
CANCELLED
```

Interdire les transitions incohérentes.

Exemple :

Impossible de passer directement de :

```text
SUBMITTED
```

à :

```text
COMPLETED
```

sans règle explicite.

---

# 15. HISTORIQUE DES STATUTS

Créer :

```text
service_request_status_history
```

Champs :

```text
id
request_id
from_status
to_status
changed_by
reason
created_at
```

Très important.

Ne pas simplement écraser le statut.

Le système doit savoir :

```text
qui
a changé quoi
quand
```

---

# 16. ASSOCIATION ARTISAN / DEMANDE

Créer :

```text
request_artisans
```

Champs :

```text
id
request_id
artisan_id
status
assigned_at
responded_at
```

Cela permettra plus tard d’envoyer une demande à plusieurs professionnels sans refaire la base.

---

# 17. DEVIS

Table :

```text
quotes
```

Champs :

```text
id
reference
request_id nullable
artisan_id
client_id nullable
client_name
client_phone
service_id nullable

description

subtotal
discount
total
currency

status

valid_until
created_at
updated_at
sent_at
accepted_at
rejected_at
```

Référence :

```text
DEV-2026-000123
```

Status :

```text
DRAFT
SENT
ACCEPTED
REJECTED
EXPIRED
CANCELLED
```

---

# 18. LIGNES DE DEVIS

Même si le frontend actuel n’affiche qu’un montant global, prévoir :

```text
quote_items
```

Champs :

```text
id
quote_id
label
quantity
unit_price
total
```

Évite de reconstruire toute la base plus tard.

---

# 19. SIGNALEMENTS / RÉCLAMATIONS

Table :

```text
complaints
```

Champs :

```text
id
reference

created_by

artisan_id nullable
request_id nullable
quote_id nullable

subject
description

status
priority

assigned_to nullable

created_at
updated_at
resolved_at
```

Référence :

```text
SIG-2026-0117
```

Statuts alignés sur le frontend :

```text
RECEIVED
IN_PROGRESS
RESOLVED
REJECTED
```

---

# 20. HISTORIQUE DES SIGNALEMENTS

Créer :

```text
complaint_status_history
```

Champs :

```text
id
complaint_id
from_status
to_status
changed_by
comment
created_at
```

Cela alimente directement la timeline affichée dans le frontend.

---

# 21. RÉPONSES SUPPORT

Table :

```text
complaint_messages
```

Champs :

```text
id
complaint_id
author_id
message
is_internal
created_at
```

Différence importante :

```text
is_internal = true
```

= note visible uniquement par le support/admin.

```text
is_internal = false
```

= message affichable au client.

---

# 22. PIÈCES JOINTES

Créer une table générique :

```text
attachments
```

Exemple :

```text
id
entity_type
entity_id
file_name
file_url
mime_type
size
uploaded_by
created_at
```

Peut servir aux :

- photos artisans ;
- demandes ;
- devis ;
- signalements.

---

# 23. AVIS

Si les avis sont réellement affichés par le frontend :

```text
reviews
```

Champs :

```text
id
client_id
artisan_id
request_id
rating
comment
status
created_at
```

Rating :

```text
1 à 5
```

Un client ne doit pouvoir donner un avis que pour une intervention autorisée/terminée.

Ne jamais permettre :

```text
POST /reviews
artisan_id=X
```

sans vérifier la relation avec le client.

---

# 24. AUTHENTIFICATION

Le backend doit gérer une vraie authentification.

Endpoint :

```text
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
POST /auth/forgot-password
POST /auth/reset-password
GET /auth/me
```

Pour mobile :

Access token court.

Exemple :

```text
15 minutes
```

Refresh token :

```text
7 à 30 jours
```

---

# 25. MOTS DE PASSE

Utiliser :

```text
Argon2id
```

ou bcrypt correctement configuré.

Ne jamais :

- stocker le mot de passe ;
- logguer le mot de passe ;
- envoyer le mot de passe par email ;
- chiffrer simplement le mot de passe.

Il doit être hashé.

---

# 26. REFRESH TOKEN

Ne pas conserver les refresh tokens en clair en base.

Stocker leur hash.

Table possible :

```text
sessions
```

Champs :

```text
id
user_id
refresh_token_hash
device_name
ip_address
user_agent
expires_at
revoked_at
created_at
```

Permet :

- déconnexion appareil ;
- révocation ;
- détection de sessions suspectes.

---

# 27. STOCKAGE DES TOKENS FRONTEND

Sur application Expo/native :

utiliser :

```text
SecureStore
```

pour le refresh token.

Ne pas utiliser AsyncStorage pour un token sensible si SecureStore est disponible.

Pour le web :

préférer :

```text
cookie HttpOnly
Secure
SameSite
```

pour le refresh token.

---

# 28. RBAC — PERMISSIONS

Ne jamais sécuriser uniquement avec :

```text
if role === ADMIN
```

Créer un système cohérent.

Exemple :

CLIENT :

```text
REQUEST_CREATE
REQUEST_READ_OWN
QUOTE_READ_OWN
COMPLAINT_CREATE
COMPLAINT_READ_OWN
```

ARTISAN :

```text
PROFILE_UPDATE_OWN
REQUEST_READ_ASSIGNED
QUOTE_CREATE
QUOTE_UPDATE_OWN
```

SUPPORT :

```text
COMPLAINT_READ
COMPLAINT_REPLY
COMPLAINT_UPDATE_STATUS
```

ADMIN :

```text
ARTISAN_READ
ARTISAN_VERIFY
ARTISAN_SUSPEND
REQUEST_READ
DASHBOARD_READ
```

SUPER_ADMIN :

administration complète.

---

# 29. OWNERSHIP

Une permission seule ne suffit pas.

Exemple :

Un CLIENT ayant :

```text
REQUEST_READ_OWN
```

ne doit pas pouvoir faire :

```text
GET /requests/ID_AUTRE_CLIENT
```

Le backend doit vérifier :

```text
request.client_id === currentUser.id
```

Même principe pour :

- devis ;
- signalements ;
- profil artisan ;
- fichiers.

---

# 30. API PUBLIQUE ARTISANS

Endpoints :

```text
GET /api/v1/artisans
GET /api/v1/artisans/:slug
```

Filtres :

```text
?category=
?service=
?city=
?district=
?available=
?q=
?page=
?limit=
```

Exemple :

```text
GET /api/v1/artisans
?q=plombier
&city=NDjamena
&district=Moursal
&page=1
&limit=20
```

---

# 31. PAGINATION

Toutes les listes susceptibles de grossir doivent être paginées.

Réponse :

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 148,
    "totalPages": 8
  }
}
```

Ne jamais retourner :

```text
50 000 artisans
```

en une fois.

---

# 32. ENDPOINTS CATÉGORIES

```text
GET /api/v1/categories
GET /api/v1/categories/:slug
GET /api/v1/categories/:id/services
```

Admin :

```text
POST /api/v1/admin/categories
PATCH /api/v1/admin/categories/:id
DELETE /api/v1/admin/categories/:id
```

DELETE logique recommandé.

---

# 33. DEMANDES

```text
POST /api/v1/requests
GET /api/v1/requests
GET /api/v1/requests/:id
PATCH /api/v1/requests/:id
POST /api/v1/requests/:id/cancel
```

Admin :

```text
GET /api/v1/admin/requests
PATCH /api/v1/admin/requests/:id/status
POST /api/v1/admin/requests/:id/assign
```

---

# 34. DEVIS

```text
POST /api/v1/quotes
GET /api/v1/quotes
GET /api/v1/quotes/:id

PATCH /api/v1/quotes/:id
POST /api/v1/quotes/:id/send
POST /api/v1/quotes/:id/accept
POST /api/v1/quotes/:id/reject
```

Vérifier qui peut faire chaque action.

Un artisan ne peut modifier que ses propres devis.

---

# 35. SIGNALEMENTS

Utilisateur :

```text
POST /api/v1/complaints
GET /api/v1/complaints
GET /api/v1/complaints/:id
```

Support/admin :

```text
GET /api/v1/admin/complaints
GET /api/v1/admin/complaints/:id

PATCH /api/v1/admin/complaints/:id/status
POST /api/v1/admin/complaints/:id/messages
```

Filtres :

```text
status
priority
date
artisan
```

---

# 36. DASHBOARD

Créer un endpoint dédié.

```text
GET /api/v1/admin/dashboard
```

Ne pas faire 15 appels frontend pour générer 4 KPI.

Réponse exemple :

```json
{
  "kpis": {
    "activeArtisans": 142,
    "openRequests": 36,
    "completedRequests": 281,
    "openComplaints": 7
  },
  "recentRequests": [],
  "recentComplaints": [],
  "artisansPendingVerification": [],
  "activity": []
}
```

---

# 37. DÉFINITION DES KPI

Documenter exactement chaque chiffre.

Exemple :

```text
activeArtisans
```

=

```text
verification_status = VERIFIED
AND
publication_status = PUBLISHED
AND
user.status = ACTIVE
```

Sinon deux développeurs finiront avec deux valeurs différentes.

---

# 38. VALIDATION DES DONNÉES

Tous les inputs doivent passer par DTO.

Exemple NestJS :

```text
CreateRequestDto
UpdateRequestDto
CreateQuoteDto
CreateComplaintDto
```

Utiliser :

```text
class-validator
class-transformer
```

Activer :

```text
whitelist: true
forbidNonWhitelisted: true
transform: true
```

Ne jamais enregistrer directement :

```text
req.body
```

en base.

---

# 39. RÉPONSE API STANDARDISÉE

Erreur :

```json
{
  "statusCode": 400,
  "code": "VALIDATION_ERROR",
  "message": "Les données envoyées sont invalides",
  "errors": {
    "phone": "Numéro de téléphone invalide"
  }
}
```

Ne jamais exposer une stack trace à l’utilisateur.

---

# 40. VERSIONNEMENT API

Utiliser dès le début :

```text
/api/v1
```

Exemple :

```text
/api/v1/artisans
```

Cela permettra un jour :

```text
/api/v2
```

sans casser les anciennes applications.

---

# 41. SWAGGER / OPENAPI

Installer Swagger.

URL développement :

```text
/api/docs
```

Chaque endpoint doit documenter :

- paramètres ;
- body ;
- réponse ;
- code HTTP ;
- authentification ;
- erreurs.

Le stagiaire doit considérer Swagger comme contrat API.

---

# 42. INDEX SQL

Créer les index nécessaires.

Minimum :

```text
users.phone
users.email

artisans.slug
artisans.city
artisans.district
artisans.verification_status
artisans.publication_status

service_requests.reference
service_requests.status
service_requests.client_id

quotes.reference
quotes.status
quotes.artisan_id

complaints.reference
complaints.status
```

Index composites potentiels :

```text
artisans(city, district)
complaints(status, created_at)
service_requests(status, created_at)
```

Ne pas indexer toutes les colonnes aveuglément.

---

# 43. RECHERCHE

Pour démarrer :

PostgreSQL peut suffire.

Utiliser :

```text
ILIKE
```

ou recherche full text.

Ne pas installer Elasticsearch pour quelques centaines/milliers d’artisans.

---

# 44. TRANSACTIONS

Utiliser des transactions pour les opérations critiques.

Exemple :

Acceptation devis :

```text
BEGIN

quote -> ACCEPTED
request -> ACCEPTED
status history
audit log

COMMIT
```

Si une opération échoue :

```text
ROLLBACK
```

---

# 45. IDEMPOTENCE

Éviter les doubles créations lorsque l’utilisateur appuie deux fois sur :

```text
Envoyer
```

Le frontend doit désactiver le bouton.

Le backend doit aussi pouvoir protéger les actions sensibles.

Pour paiement futur ou action critique :

```text
Idempotency-Key
```

---

# 46. SOFT DELETE

Pour :

- utilisateurs ;
- artisans ;
- catégories ;
- services.

Préférer :

```text
deleted_at
```

plutôt que suppression physique immédiate.

Les devis, demandes et signalements ne doivent généralement pas être supprimés arbitrairement.

---

# 47. AUDIT LOG

Créer :

```text
audit_logs
```

Champs :

```text
id
actor_id
action
entity_type
entity_id
old_values
new_values
ip_address
user_agent
created_at
```

Historiser au minimum :

```text
ARTISAN_VERIFIED
ARTISAN_REJECTED
ARTISAN_SUSPENDED

REQUEST_STATUS_CHANGED

QUOTE_ACCEPTED

COMPLAINT_STATUS_CHANGED

USER_ROLE_CHANGED

USER_DISABLED
```

Ne pas permettre de modifier les audit logs via API standard.

---

# 48. RATE LIMITING

Protéger :

```text
login
register
forgot-password
OTP
création demande
création signalement
```

Exemple :

Login :

```text
5 tentatives / minute / IP
```

Puis ralentissement ou blocage temporaire.

Ne pas utiliser exactement les mêmes limites partout.

---

# 49. BRUTE FORCE

Après plusieurs échecs :

- ralentir ;
- enregistrer l’événement ;
- éventuellement verrouiller temporairement ;
- alerter si comportement suspect.

Ne pas révéler :

```text
Cet email existe
```

dans forgot password.

Réponse :

```text
Si le compte existe, un message sera envoyé.
```

---

# 50. CORS

Whitelist stricte.

Développement :

```text
http://localhost:8081
```

Production :

uniquement les domaines Kidima.

Pas :

```text
origin: "*"
```

avec authentification.

---

# 51. HEADERS HTTP

Utiliser Helmet.

Configurer :

- CSP si applicable ;
- X-Content-Type-Options ;
- Referrer-Policy ;
- frame protection ;
- HSTS en production HTTPS.

---

# 52. HTTPS

Production uniquement via HTTPS.

Jamais d’API publique :

```text
http://api...
```

en production.

TLS doit être terminé par :

- Nginx ;
- Caddy ;
- reverse proxy cloud ;
- load balancer.

---

# 53. SQL INJECTION

Utiliser Prisma/ORM correctement.

Ne jamais construire :

```text
"SELECT * FROM users WHERE name = '" + input + "'"
```

Les requêtes raw doivent être paramétrées.

---

# 54. MASS ASSIGNMENT

Très important.

Ne jamais accepter ceci :

```json
{
  "firstName": "...",
  "role": "SUPER_ADMIN",
  "status": "ACTIVE"
}
```

sur un endpoint utilisateur générique.

DTO différents selon le contexte.

---

# 55. AUTORISATION

Authentification :

```text
Qui es-tu ?
```

Autorisation :

```text
As-tu le droit ?
```

Les deux doivent être séparées.

Un utilisateur connecté ne doit pas automatiquement pouvoir accéder à toutes les ressources.

---

# 56. ENUMERATION D’IDENTIFIANTS

Même avec UUID :

toujours vérifier l’ownership.

UUID ne remplace jamais les permissions.

---

# 57. XSS

Ne jamais considérer un texte utilisateur comme sûr.

Descriptions concernées :

- profil artisan ;
- demande ;
- devis ;
- signalement ;
- réponse support.

Sanitiser si rendu HTML.

Si simple texte React Native, conserver comme texte.

---

# 58. UPLOAD DE FICHIERS

Ne jamais accepter n’importe quel fichier.

Limiter :

```text
images
PDF si réellement nécessaire
```

Exemple :

```text
JPEG
PNG
WEBP
PDF
```

Limiter taille.

Exemple :

```text
5 Mo
```

Vérifier :

- MIME ;
- extension ;
- taille ;
- signature du fichier si possible.

Générer le nom côté serveur.

Ne pas utiliser directement :

```text
monfichier../../../etc/passwd
```

---

# 59. STOCKAGE DE FICHIERS

Ne pas sauvegarder les fichiers utilisateur directement dans le repo.

Utiliser :

```text
Cloudflare R2
AWS S3
MinIO
```

avec URLs signées si contenu privé.

---

# 60. DONNÉES SENSIBLES

Ne pas logguer :

- mots de passe ;
- tokens ;
- cookies ;
- Authorization header ;
- clés API.

Limiter les informations personnelles dans les logs.

---

# 61. LOGGING

Utiliser logs structurés.

Exemple :

```text
timestamp
level
requestId
route
method
status
duration
userId
```

Jamais :

```text
console.log(req.body)
```

sur des endpoints sensibles.

---

# 62. REQUEST ID

Chaque requête API doit recevoir :

```text
X-Request-ID
```

ou identifiant généré.

Cela facilite énormément le debugging.

---

# 63. MONITORING

Minimum :

- uptime ;
- erreurs 5xx ;
- temps de réponse ;
- CPU ;
- RAM ;
- espace disque ;
- connexions PostgreSQL.

Option :

Sentry pour erreurs applicatives.

---

# 64. HEALTH CHECK

Créer :

```text
GET /health
GET /health/ready
```

Exemple :

```json
{
  "status": "ok",
  "database": "ok",
  "redis": "ok"
}
```

Ne pas exposer de secrets.

---

# 65. BACKUP

PostgreSQL doit être sauvegardé.

Minimum :

backup quotidien.

Politique possible :

```text
7 backups quotidiens
4 hebdomadaires
3 mensuels
```

Le stagiaire doit documenter :

```text
comment restaurer
```

Un backup jamais testé n’est pas une vraie stratégie de backup.

---

# 66. MIGRATIONS

Toute modification base doit passer par migration.

Interdit :

modifier manuellement la production avec pgAdmin sans migration.

Workflow :

```text
modifier schema Prisma
↓
migration
↓
review
↓
staging
↓
production
```

---

# 67. SEED

Créer :

```text
prisma/seed.ts
```

Avec uniquement données de développement :

- catégories ;
- services ;
- admin test ;
- quelques artisans fictifs.

Ne jamais injecter les comptes de test en production.

---

# 68. TESTS UNITAIRES

Tester les services critiques :

```text
AuthService
RequestService
QuoteService
ComplaintService
ArtisanService
```

Cas :

- normal ;
- interdit ;
- données invalides ;
- ressource introuvable.

---

# 69. TESTS INTÉGRATION

Tester avec vraie base de test.

Exemple :

```text
POST request
↓
row créé
↓
status SUBMITTED
↓
history créé
```

---

# 70. TESTS E2E

Parcours prioritaires.

## Parcours 1

```text
client
→ recherche artisan
→ fiche artisan
→ demande
→ création backend
```

## Parcours 2

```text
demande
→ artisan
→ devis
→ client accepte
```

## Parcours 3

```text
client
→ signalement
→ support
→ IN_PROGRESS
→ réponse
→ RESOLVED
```

## Parcours 4

```text
admin
→ artisan pending
→ verify
→ visible plateforme
```

---

# 71. TESTS SÉCURITÉ

Tester manuellement :

```text
client accède demande autre client
artisan modifie autre artisan
support modifie rôle admin
token expiré
refresh token révoqué
ID invalide
payload supplémentaire
fichier trop gros
mauvais MIME
brute force login
```

Chaque tentative doit être bloquée.

---

# 72. CODE HTTP

Utiliser correctement :

```text
200 OK
201 Created
204 No Content

400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 éventuellement

429 Too Many Requests

500 Internal Server Error
```

Ne jamais renvoyer :

```text
200
```

pour toutes les erreurs.

---

# 73. GESTION DES ERREURS

Créer un filtre global.

En production :

ne jamais retourner :

```text
stack
SQL
chemin serveur
variables
```

Retourner uniquement une erreur contrôlée.

---

# 74. PERFORMANCES

Ne pas optimiser prématurément.

Mais éviter :

- N+1 queries ;
- énorme pagination ;
- SELECT * inutiles ;
- relations chargées automatiquement partout.

Mesurer avant optimisation.

---

# 75. CACHE

Redis seulement quand utile.

Bons candidats :

```text
categories
services
configuration publique
artisans populaires
```

Ne pas cacher aveuglément les demandes ou signalements utilisateurs.

---

# 76. CONCURRENCE

Exemple :

Deux admins traitent le même artisan.

Prévoir contrôle de mise à jour.

Minimum :

```text
updated_at
```

et logique métier cohérente.

---

# 77. NOTIFICATIONS

Créer une architecture de notification indépendante.

Table :

```text
notifications
```

Champs :

```text
id
user_id
type
title
message
data
read_at
created_at
```

Événements possibles :

```text
REQUEST_CREATED
REQUEST_ASSIGNED
QUOTE_RECEIVED
QUOTE_ACCEPTED
COMPLAINT_UPDATED
ARTISAN_VERIFIED
```

Plus tard :

- push ;
- email ;
- SMS.

Le code métier ne doit pas dépendre directement d’un fournisseur.

---

# 78. JOBS ASYNCHRONES

Utiliser Redis/BullMQ uniquement pour tâches réellement asynchrones.

Exemple :

- emails ;
- notifications ;
- génération PDF ;
- traitement image.

Ne pas mettre tout le backend dans des queues.

---

# 79. API ADMIN

Séparer clairement :

```text
/api/v1/admin/...
```

Exemple :

```text
/api/v1/admin/artisans
/api/v1/admin/requests
/api/v1/admin/complaints
/api/v1/admin/dashboard
```

Mais la sécurité vient des guards/permissions, pas simplement du préfixe `/admin`.

---

# 80. GESTION ARTISANS ADMIN

Endpoints :

```text
GET /admin/artisans

GET /admin/artisans/:id

POST /admin/artisans/:id/verify

POST /admin/artisans/:id/reject

POST /admin/artisans/:id/suspend

POST /admin/artisans/:id/publish

POST /admin/artisans/:id/hide
```

Chaque action sensible :

```text
audit log
```

---

# 81. RECHERCHE ADMIN

Filtres :

```text
name
phone
status
verification
publication
city
category
createdFrom
createdTo
```

Toujours paginé.

---

# 82. FORMAT DATE

API :

ISO 8601.

Exemple :

```text
2026-10-03T18:45:00.000Z
```

Stocker en UTC.

Le frontend s’occupe du fuseau.

---

# 83. DEVISE

Montants financiers :

ne jamais utiliser float.

Utiliser :

```text
INTEGER
```

si FCFA uniquement.

Exemple :

```text
5000
```

ou Decimal si plusieurs monnaies.

Devise :

```text
XAF
```

---

# 84. TÉLÉPHONE

Normaliser les numéros.

Exemple :

```text
+23566000000
```

Stocker format E.164.

Le frontend peut afficher :

```text
+235 66 00 00 00
```

---

# 85. SLUG

Slug unique artisan.

Exemple :

```text
ali-plomberie
```

Ne pas utiliser :

```text
plombier-1
```

comme identité permanente si un vrai slug peut être créé.

UUID reste identifiant interne.

Slug = URL publique.

---

# 86. CONFIDENTIALITÉ

L’API publique artisan ne doit pas nécessairement exposer :

- email privé ;
- adresse personnelle exacte ;
- IDs internes ;
- notes administratives.

Créer DTO de réponse publique.

Exemple :

```text
PublicArtisanDto
```

différent de :

```text
AdminArtisanDto
```

---

# 87. DONNÉES CLIENT

Un artisan ne doit voir que les données nécessaires pour la prestation.

Ne jamais donner l’ensemble du profil client sans raison.

---

# 88. CI/CD

GitHub Actions recommandé.

Pipeline PR :

```text
npm ci
lint
typecheck
tests
build
```

Une PR cassée ne doit pas être mergée.

---

# 89. GIT

Branches :

```text
main
develop
feature/...
fix/...
```

Commits clairs.

Exemple :

```text
feat(auth): add refresh token rotation
fix(requests): prevent foreign request access
```

Pas :

```text
update
fix
final
final2
```

---

# 90. DOCKER

Créer :

```text
Dockerfile
```

et :

```text
docker-compose.yml
```

Développement :

```text
api
postgres
redis
```

Production :

PostgreSQL peut être externalisé.

---

# 91. REVERSE PROXY

Architecture production :

```text
Internet
   |
Cloudflare
   |
Nginx/Caddy
   |
NestJS
   |
PostgreSQL
Redis
```

Le port NestJS ne doit pas nécessairement être directement accessible depuis Internet.

---

# 92. BASE PRODUCTION

Créer utilisateur PostgreSQL spécifique.

Pas :

```text
postgres / superuser
```

pour l’application.

Permissions minimales nécessaires.

---

# 93. SECRETS

Ne jamais committer :

```text
.env
private keys
passwords
API keys
```

Ajouter `.env` dans `.gitignore`.

Production :

secrets injectés par infrastructure.

---

# 94. DOCUMENTATION

Créer :

```text
README.md
docs/architecture.md
docs/database.md
docs/api.md
docs/security.md
docs/deployment.md
docs/backup-restore.md
```

README doit expliquer :

```text
installation
configuration
migration
seed
test
build
run
```

---

# 95. ORDRE EXACT DE RÉALISATION

Le stagiaire ne doit pas tout coder simultanément.

## PHASE 1 — Fondation

Faire :

- NestJS ;
- PostgreSQL ;
- Prisma ;
- Redis ;
- Docker ;
- config ;
- validation env ;
- logger ;
- `/health`.

Validation :

```text
API démarre
Postgres connecté
Redis connecté
migration fonctionne
```

---

## PHASE 2 — Modèle de données

Créer :

- users ;
- artisans ;
- categories ;
- services ;
- artisan_services ;
- availability ;
- service_requests ;
- request history ;
- quotes ;
- quote items ;
- complaints ;
- complaint history ;
- complaint messages ;
- attachments ;
- notifications ;
- audit logs ;
- sessions.

Faire une migration propre.

---

## PHASE 3 — Authentification

Implémenter :

- register ;
- login ;
- logout ;
- refresh ;
- me ;
- reset password ;
- sessions ;
- JWT ;
- guards ;
- RBAC ;
- ownership.

Tests obligatoires avant phase suivante.

---

## PHASE 4 — Catalogue artisans

Implémenter :

- catégories ;
- services ;
- recherche artisan ;
- filtres ;
- détail artisan ;
- gestion admin artisan.

Puis brancher frontend :

```text
/
 /artisans
 /artisan/[slug]
```

---

## PHASE 5 — Demandes

Implémenter :

- création ;
- lecture ;
- modification contrôlée ;
- statuts ;
- historique ;
- assignation artisan.

Puis brancher :

```text
/demande
```

Supprimer les mocks correspondants.

---

## PHASE 6 — Devis

Implémenter :

- création ;
- lignes ;
- envoi ;
- acceptation ;
- rejet ;
- expiration ;
- historique.

Brancher :

```text
/book
```

---

## PHASE 7 — Signalements

Implémenter :

- création ;
- liste ;
- détail ;
- messages ;
- timeline ;
- status ;
- support/admin.

Brancher :

```text
/reclamations
```

---

## PHASE 8 — Dashboard

Créer agrégations backend.

Brancher :

```text
/dashboard
```

Éliminer tous les KPI statiques.

---

## PHASE 9 — Upload

Photos artisans et pièces jointes.

R2/S3.

Validation MIME/taille.

---

## PHASE 10 — Notifications

Créer le système d’événements.

Commencer par :

```text
notification interne
email
```

Push plus tard si nécessaire.

---

## PHASE 11 — Sécurité complète

Faire audit :

- auth ;
- permissions ;
- ownership ;
- CORS ;
- Helmet ;
- rate limit ;
- upload ;
- injection ;
- logs ;
- secrets ;
- sessions ;
- refresh rotation ;
- brute force.

---

## PHASE 12 — Tests

Unitaires.

Intégration.

E2E.

Sécurité.

Responsive/API frontend.

---

## PHASE 13 — Staging

Déployer une version staging.

Le frontend staging ne doit appeler que :

```text
API staging
```

Tester tous les parcours.

---

## PHASE 14 — Production

Avant production :

```text
migration vérifiée
backup configuré
monitoring actif
HTTPS actif
CORS strict
secrets production
rate limits actifs
logs actifs
health checks actifs
aucun compte demo
aucun mock
aucun debug
```

---

# 96. CRITÈRES DE FIN

Le stagiaire ne doit pas dire :

```text
backend terminé
```

simplement parce que les endpoints répondent.

Le projet est terminé lorsque :

### Auth

- login fonctionnel ;
- refresh fonctionnel ;
- logout révoque session ;
- permissions testées.

### Artisans

- liste DB ;
- recherche ;
- filtres ;
- détail ;
- admin ;
- validation.

### Demandes

- création réelle ;
- stockage ;
- suivi ;
- statuts ;
- historique.

### Devis

- création ;
- stockage ;
- envoi ;
- acceptation/rejet.

### Signalements

- création ;
- suivi ;
- timeline ;
- support ;
- changement statut.

### Dashboard

- aucune donnée mockée.

### Sécurité

- RBAC ;
- ownership ;
- validation DTO ;
- rate limiting ;
- CORS ;
- HTTPS ;
- audit logs ;
- secrets sécurisés.

### Technique

- lint OK ;
- typecheck OK ;
- tests OK ;
- migrations OK ;
- build OK ;
- Swagger OK ;
- Docker OK.

### Exploitation

- staging ;
- production ;
- backups ;
- restore documenté ;
- logs ;
- monitoring.

---

# 97. RÈGLE IMPORTANTE POUR LE STAGIAIRE

Avant de développer une fonctionnalité :

1. regarder l’écran frontend concerné ;
2. déterminer les données réellement nécessaires ;
3. définir le modèle ;
4. définir l’API ;
5. écrire DTO et permissions ;
6. développer le service ;
7. développer controller ;
8. écrire tests ;
9. documenter Swagger ;
10. brancher frontend ;
11. supprimer le mock correspondant.

Ne jamais commencer par créer au hasard des tables ou endpoints.

---

# 98. LIVRABLE FINAL DU STAGIAIRE

À la fin, il doit fournir :

```text
backend/
README.md
.env.example
docker-compose.yml
Dockerfile
prisma/schema.prisma
migrations/
seed.ts
Swagger complet
tests/
docs/architecture.md
docs/database.md
docs/security.md
docs/deployment.md
docs/backup-restore.md
```

Et un rapport :

```text
FINAL_REPORT.md
```

avec :

- modules terminés ;
- endpoints ;
- modèle DB ;
- permissions ;
- tests ;
- sécurité ;
- bugs connus ;
- limitations ;
- mocks restants ;
- instructions déploiement ;
- instructions rollback ;
- instructions restauration backup.