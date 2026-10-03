# Architecture globale — KIDIMA

## 1. Vision générale

Kidima est une plateforme de mise en relation entre :

- clients ;
- artisans ;
- équipe support ;
- administrateurs.

Le système doit permettre :

- recherche d’artisans ;
- consultation d’un profil ;
- création d’une demande ;
- demande et gestion de devis ;
- suivi d’intervention ;
- gestion des réclamations ;
- administration des artisans ;
- pilotage via dashboard ;
- notifications ;
- sécurité et traçabilité.

Architecture cible :

```text
                           KIDIMA
                             │
              ┌──────────────┴──────────────┐
              │                             │
        APPLICATION CLIENT            ADMINISTRATION
         Expo / React Native           Web / Expo Web
              │                             │
              └──────────────┬──────────────┘
                             │
                             ▼
                       API BACKEND
                    NestJS + TypeScript
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
   PostgreSQL              Redis             Object Storage
                                             S3 / R2
        │                    │                    │
        │                    │                    │
        └─────────────── Backend ─────────────────┘
                             │
             ┌───────────────┼─────────────────┐
             ▼               ▼                 ▼
         Email            Push           WhatsApp/SMS
```

---

# 2. Organisation des dépôts

Je recommande un monorepo.

```text
kidima/
│
├── apps/
│   ├── mobile/
│   ├── admin/
│   └── backend/
│
├── packages/
│   ├── types/
│   ├── config/
│   └── shared/
│
├── docs/
│
├── docker/
│
├── .github/
│   └── workflows/
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

# 3. Application utilisateur

## apps/mobile

Application principale Kidima.

Technologie actuelle :

```text
Expo
React Native
Expo Router
TypeScript
```

L’application peut fonctionner sur :

```text
Android
iOS
Web
```

Structure :

```text
apps/mobile/
│
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── artisans.tsx
│   ├── demande.tsx
│   ├── book.tsx
│   ├── reclamations.tsx
│   ├── menu.tsx
│   └── artisan/
│       └── [slug].tsx
│
├── components/
│   ├── ui/
│   ├── artisans/
│   ├── forms/
│   ├── navigation/
│   └── feedback/
│
├── services/
│   ├── api/
│   ├── artisans/
│   ├── requests/
│   ├── quotes/
│   └── complaints/
│
├── hooks/
├── constants/
├── types/
├── utils/
└── assets/
```

---

# 4. Écrans utilisateur

## Accueil

```text
/
```

Fonctions :

- recherche ;
- catégories ;
- localisation ;
- artisans recommandés ;
- artisans disponibles ;
- création de demande.

---

## Artisans

```text
/artisans
```

Fonctions :

- liste ;
- recherche ;
- filtres ;
- disponibilité ;
- métier ;
- quartier ;
- localisation.

---

## Fiche artisan

```text
/artisan/[slug]
```

Contenu :

- photo ;
- métier ;
- services ;
- expérience ;
- prix indicatifs ;
- disponibilité ;
- zone d’intervention ;
- WhatsApp ;
- demande de devis.

---

## Demande

```text
/demande
```

Wizard :

```text
Métier
   ↓
Service
   ↓
Localisation
   ↓
Date / disponibilité
   ↓
Coordonnées
   ↓
Confirmation
```

---

## Devis

```text
/book
```

Flux :

```text
Artisan
↓
Service
↓
Description
↓
Informations client
↓
Demande de devis
```

---

## Réclamations

```text
/reclamations
```

Fonctions :

- création ;
- liste ;
- filtre ;
- suivi ;
- historique ;
- réponse support.

---

# 5. Application administration

Je recommande de séparer progressivement l’administration du frontend utilisateur.

```text
apps/admin/
```

Technologie possible :

```text
React
Vite
TypeScript
```

ou

```text
Next.js
```

Le choix importe moins que la séparation.

Structure :

```text
apps/admin/
│
├── pages/
│   ├── dashboard/
│   ├── artisans/
│   ├── requests/
│   ├── quotes/
│   ├── complaints/
│   ├── users/
│   └── settings/
│
├── components/
├── services/
├── hooks/
├── auth/
└── types/
```

---

# 6. Dashboard admin

Route :

```text
/dashboard
```

Contenu :

```text
Artisans actifs
Demandes ouvertes
Interventions terminées
Signalements ouverts
```

Puis :

```text
Activité récente
Demandes récentes
Artisans à vérifier
Réclamations à traiter
```

Les KPI doivent venir du backend.

---

# 7. Backend

## apps/backend

Stack :

```text
NestJS
TypeScript
PostgreSQL
Prisma
Redis
```

Structure :

```text
apps/backend/
│
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   │
│   ├── config/
│   │
│   ├── common/
│   │   ├── guards/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── interceptors/
│   │   ├── pipes/
│   │   └── utils/
│   │
│   ├── auth/
│   ├── users/
│   ├── artisans/
│   ├── categories/
│   ├── services/
│   ├── requests/
│   ├── quotes/
│   ├── complaints/
│   ├── dashboard/
│   ├── notifications/
│   ├── uploads/
│   ├── audit/
│   └── health/
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
└── test/
```

---

# 8. Architecture interne du backend

Chaque module suit :

```text
Controller
   ↓
Service
   ↓
Repository / Prisma
   ↓
PostgreSQL
```

Exemple :

```text
RequestController
      ↓
RequestService
      ↓
Prisma
      ↓
service_requests
```

Le Controller ne contient pas la logique métier.

---

# 9. Modules backend

## Auth

Responsabilités :

```text
register
login
logout
refresh-token
forgot-password
reset-password
sessions
```

---

## Users

```text
profil
statut
rôle
permissions
```

---

## Artisans

```text
profil artisan
publication
validation
disponibilité
zone
services
```

---

## Categories

```text
métiers
catégories
```

Exemples :

```text
Plomberie
Électricité
Peinture
Climatisation
Menuiserie
```

---

## Services

```text
Réparation fuite
Débouchage
Installation
Réparation électrique
etc.
```

---

## Requests

Demandes client.

```text
création
attribution
statut
historique
annulation
```

---

## Quotes

```text
devis
lignes
acceptation
rejet
expiration
```

---

## Complaints

```text
réclamations
messages
timeline
statut
assignation support
```

---

## Dashboard

Agrégations :

```text
KPI
activité
demandes
signalements
artisans à valider
```

---

## Uploads

Gestion :

```text
photos
documents
pièces jointes
```

---

## Notifications

```text
notifications internes
email
push
```

---

## Audit

Historisation actions critiques.

---

# 10. Base de données globale

Tables principales :

```text
users
artisans
service_categories
services
artisan_services
artisan_service_areas
artisan_availability

service_requests
service_request_status_history
request_artisans

quotes
quote_items

complaints
complaint_status_history
complaint_messages

reviews

notifications
attachments
sessions
audit_logs
```

---

# 11. Relations principales

```text
USER
 │
 ├──────── CLIENT
 │
 └──────── ARTISAN
              │
              ▼
           ARTISAN
              │
       ┌──────┼────────┐
       ▼      ▼        ▼
    SERVICES ZONES  AVAILABILITY
```

Client :

```text
USER
 │
 ▼
SERVICE_REQUEST
 │
 ├──── ARTISAN
 │
 ├──── QUOTE
 │
 └──── COMPLAINT
```

---

# 12. Flux principal

## Recherche artisan

```text
Mobile
   ↓
GET /api/v1/artisans
   ↓
ArtisanService
   ↓
PostgreSQL
   ↓
résultats
```

---

# 13. Flux demande

```text
Client
  ↓
Wizard
  ↓
POST /api/v1/requests
  ↓
RequestService
  ↓
PostgreSQL
  ↓
Notification
  ↓
Admin / Artisan
```

---

# 14. Flux devis

```text
Client
  ↓
Demande
  ↓
Artisan
  ↓
Création devis
  ↓
Client
  ↓
Acceptation / rejet
```

Architecture :

```text
request
   │
   ▼
quote
   │
   ├── accepted
   ├── rejected
   └── expired
```

---

# 15. Flux réclamation

```text
Client
  ↓
Complaint
  ↓
Support
  ↓
IN_PROGRESS
  ↓
Messages / analyse
  ↓
RESOLVED
```

Chaque changement crée une ligne :

```text
complaint_status_history
```

---

# 16. Authentification

Architecture :

```text
Login
  ↓
API
  ↓
Password hash check
  ↓
Access Token
+
Refresh Token
```

Access token :

```text
15 min
```

Refresh :

```text
7 à 30 jours
```

Sessions stockées en base.

Refresh token hashé.

---

# 17. Rôles

```text
CLIENT
ARTISAN
SUPPORT
ADMIN
SUPER_ADMIN
```

---

# 18. Permissions

Exemple :

```text
CLIENT
├── créer demande
├── lire ses demandes
├── accepter devis
└── créer réclamation
```

```text
ARTISAN
├── modifier son profil
├── consulter demandes assignées
├── créer devis
└── gérer disponibilité
```

```text
SUPPORT
├── lire réclamations
├── répondre
└── modifier statut
```

```text
ADMIN
├── valider artisans
├── gérer demandes
├── consulter dashboard
└── superviser signalements
```

---

# 19. Sécurité globale

Architecture sécurité :

```text
Client
  ↓
HTTPS
  ↓
Reverse proxy
  ↓
Rate Limiting
  ↓
Authentication Guard
  ↓
Permission Guard
  ↓
DTO Validation
  ↓
Business Rules
  ↓
Database
```

---

# 20. Protection API

Activer :

```text
Helmet
CORS strict
Rate limiting
DTO validation
JWT
RBAC
Ownership
Request ID
Logging
```

---

# 21. Sécurité mot de passe

Utiliser :

```text
Argon2id
```

Jamais stockage plaintext.

---

# 22. Upload sécurisé

Flux :

```text
Mobile
 ↓
API
 ↓
validation
 ├── taille
 ├── MIME
 └── extension
 ↓
S3 / R2
```

Pas de stockage de fichiers directement dans PostgreSQL.

---

# 23. Stockage objet

Recommandation :

```text
Cloudflare R2
```

Structure :

```text
kidima/
├── artisans/
│   └── profiles/
├── requests/
├── complaints/
└── attachments/
```

---

# 24. Redis

Redis ne remplace pas PostgreSQL.

Utilisation :

```text
rate limiting
cache
OTP
queues
sessions temporaires
```

---

# 25. Notifications

Architecture :

```text
Business Event
       ↓
NotificationService
       │
 ┌─────┼─────┐
 ▼     ▼     ▼
App   Email  Push
```

Exemple :

```text
QuoteCreated
```

génère :

```text
notification interne
+
push éventuel
```

---

# 26. Jobs asynchrones

BullMQ + Redis.

Pour :

```text
email
push
traitement image
PDF
```

Architecture :

```text
API
 ↓
Queue
 ↓
Worker
 ↓
Email / Push / Storage
```

---

# 27. API

Préfixe :

```text
/api/v1
```

Exemples :

```text
/api/v1/auth
/api/v1/artisans
/api/v1/categories
/api/v1/services
/api/v1/requests
/api/v1/quotes
/api/v1/complaints
/api/v1/admin
```

---

# 28. API publique

Accessible sans connexion :

```text
GET /artisans
GET /artisans/:slug
GET /categories
GET /services
```

---

# 29. API privée client

```text
POST /requests
GET /requests
GET /requests/:id

POST /complaints
GET /complaints

GET /quotes
POST /quotes/:id/accept
```

---

# 30. API artisan

```text
GET /artisan/profile
PATCH /artisan/profile

GET /artisan/requests

POST /quotes
PATCH /quotes/:id

GET /artisan/availability
PATCH /artisan/availability
```

---

# 31. API administration

```text
/api/v1/admin/dashboard

/api/v1/admin/artisans
/api/v1/admin/requests
/api/v1/admin/quotes
/api/v1/admin/complaints
/api/v1/admin/users
```

---

# 32. Services frontend

Le frontend ne doit jamais faire ceci partout :

```text
fetch(...)
```

Créer :

```text
services/api/client.ts
```

Puis :

```text
artisans.service.ts
requests.service.ts
quotes.service.ts
complaints.service.ts
auth.service.ts
```

---

# 33. Client HTTP

Exemple :

```text
API Client
   │
   ├── Authorization
   ├── refresh token
   ├── timeout
   ├── error normalization
   └── request ID
```

---

# 34. Gestion des erreurs

Format commun backend :

```json
{
  "statusCode": 400,
  "code": "VALIDATION_ERROR",
  "message": "Données invalides"
}
```

Le frontend traduit ensuite cela en UI.

---

# 35. États frontend

Tous les écrans connectés doivent gérer :

```text
loading
success
empty
error
offline
```

---

# 36. Offline

Kidima ne nécessite probablement pas une architecture offline-first complexe au début.

Mais on peut mettre en cache :

```text
catégories
dernière recherche
profils récemment consultés
```

Ne jamais créer une demande offline automatiquement sans stratégie de synchronisation.

---

# 37. Environnements

```text
Development
Staging
Production
```

Architecture :

```text
LOCAL

mobile local
   ↓
localhost API
   ↓
postgres local
```

```text
STAGING

staging.kidima...
   ↓
API staging
   ↓
DB staging
```

```text
PRODUCTION

kidima...
   ↓
API production
   ↓
DB production
```

Aucune donnée partagée entre environnements.

---

# 38. Infrastructure production

Architecture recommandée :

```text
             INTERNET
                 │
                 ▼
           Cloudflare
                 │
                 ▼
          Nginx / Caddy
                 │
        ┌────────┴─────────┐
        ▼                  ▼
   Backend API          Admin Web
        │
   ┌────┴────────────┐
   ▼                 ▼
PostgreSQL          Redis
   │
   ▼
Backups

Backend
   │
   └──────────► Cloudflare R2
```

---

# 39. Docker

Développement :

```text
docker-compose
├── postgres
├── redis
└── backend
```

Production :

```text
backend container
```

PostgreSQL/Redis peuvent être managés ou séparés.

---

# 40. CI/CD

GitHub Actions :

```text
Pull Request
    ↓
npm ci
    ↓
lint
    ↓
typecheck
    ↓
tests
    ↓
build
```

Si erreur :

```text
pas de merge
```

---

# 41. Pipeline production

```text
merge main
   ↓
CI
   ↓
tests
   ↓
Docker image
   ↓
deployment staging
   ↓
validation
   ↓
production
```

---

# 42. Monitoring

Minimum :

```text
API uptime
latence
5xx
CPU
RAM
DB connections
disk
```

Ajouter :

```text
Sentry
```

pour erreurs frontend/backend.

---

# 43. Logs

Logs structurés :

```text
timestamp
requestId
userId
method
route
status
duration
```

Interdit :

```text
password
token
authorization header
```

---

# 44. Audit log

Actions importantes :

```text
artisan vérifié
artisan suspendu
rôle modifié
demande assignée
statut changé
réclamation résolue
```

---

# 45. Backup

PostgreSQL :

```text
backup quotidien
```

Rétention possible :

```text
7 quotidiens
4 hebdomadaires
3 mensuels
```

Tester la restauration.

---

# 46. Documentation globale

```text
docs/
│
├── ARCHITECTURE.md
├── BACKEND.md
├── FRONTEND.md
├── DATABASE.md
├── API.md
├── SECURITY.md
├── DEPLOYMENT.md
├── BACKUP_RESTORE.md
└── CONTRIBUTING.md
```

---

# 47. Schéma global simplifié

```text
                          ┌───────────────┐
                          │    CLIENT     │
                          └───────┬───────┘
                                  │
                                  ▼
                         ┌────────────────┐
                         │ MOBILE / WEB   │
                         └───────┬────────┘
                                 │
                                 ▼
                          ┌──────────────┐
                          │ REST API     │
                          │ NestJS       │
                          └──────┬───────┘
                                 │
       ┌─────────────────────────┼─────────────────────────┐
       │                         │                         │
       ▼                         ▼                         ▼
┌─────────────┐           ┌────────────┐            ┌─────────────┐
│ PostgreSQL  │           │   Redis    │            │  R2 / S3    │
│             │           │            │            │             │
│ Users       │           │ Cache      │            │ Images      │
│ Artisans    │           │ Rate Limit │            │ Documents   │
│ Requests    │           │ Queue      │            │ Attachments │
│ Quotes      │           └────────────┘            └─────────────┘
│ Complaints  │
└─────────────┘
       │
       ▼
┌─────────────────┐
│ Backup / Restore│
└─────────────────┘
```

---

# 48. Priorité de réalisation

Ordre recommandé :

```text
1. Architecture projet
2. PostgreSQL + Prisma
3. Auth
4. Utilisateurs
5. Artisans
6. Catégories/services
7. Recherche
8. Demandes
9. Devis
10. Réclamations
11. Dashboard
12. Upload
13. Notifications
14. Audit logs
15. Tests
16. Sécurité
17. Staging
18. Production
```

---

# 49. Architecture recommandée à conserver

Kidima ne doit PAS devenir :

```text
microservices
Kubernetes
Kafka
Elasticsearch
20 services différents
```

à ce stade.

Utiliser un :

```text
MODULAR MONOLITH
```

NestJS.

C’est-à-dire :

```text
1 backend
+
modules bien séparés
+
1 PostgreSQL
+
1 Redis
```

C’est largement suffisant pour lancer et faire évoluer Kidima.

---

# 50. Architecture finale

```text
KIDIMA
│
├── Mobile / Web Marketplace
│   ├── Accueil
│   ├── Recherche
│   ├── Artisans
│   ├── Demandes
│   ├── Devis
│   └── Réclamations
│
├── Admin
│   ├── Dashboard
│   ├── Artisans
│   ├── Demandes
│   ├── Devis
│   ├── Signalements
│   └── Utilisateurs
│
├── Backend
│   ├── Auth
│   ├── Users
│   ├── Artisans
│   ├── Categories
│   ├── Services
│   ├── Requests
│   ├── Quotes
│   ├── Complaints
│   ├── Notifications
│   ├── Dashboard
│   ├── Audit
│   └── Uploads
│
├── PostgreSQL
│
├── Redis
│
├── R2 / S3
│
├── Notifications
│
└── Infrastructure
    ├── Docker
    ├── Nginx / Caddy
    ├── CI/CD
    ├── Monitoring
    ├── Backups
    └── Security
```

# Décision d’architecture

Pour Kidima, l’architecture recommandée est :

**Frontend mobile-first Expo + administration séparée + backend NestJS en monolithe modulaire + PostgreSQL + Prisma + Redis + stockage objet R2/S3 + REST API versionnée + RBAC + audit + CI/CD + Docker.**

Elle reste suffisamment simple pour qu’un stagiaire puisse la maintenir, tout en étant assez propre pour évoluer en véritable produit.