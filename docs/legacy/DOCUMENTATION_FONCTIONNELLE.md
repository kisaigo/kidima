# Documentation fonctionnelle — Kidima

**Version :** 0.2 — cadrage fonctionnel  
**Produit :** plateforme de découverte et de mise en relation avec des artisans  
**Référence de maquette :** `index.html`, `app.js`, `styles.css`  
**Statut :** seule la colonne « maquette » décrit du comportement déjà développé.

## 1. Objet et statut des exigences

Ce document sépare :
- **M — maquette :** fonction testable aujourd’hui dans la page statique ;
- **C — cible :** capacité proposée pour un pilote réel ;
- **À décider :** exigence nécessitant une décision métier, une recherche utilisateur ou une revue réglementaire.

La maquette n’est ni un annuaire opérationnel ni un canal de demandes. Ses profils sont fictifs. Les formulaires n’envoient ni ne sauvegardent rien.

## 2. Objectifs et non-objectifs

### Objectifs fonctionnels du produit cible
- Permettre de trouver des options pertinentes par métier et zone.
- Réduire les efforts de description répétée d’un besoin.
- Faciliter une réponse claire du prestataire sur disponibilité et devis.
- Donner un moyen de vérifier la fraîcheur du profil et de signaler un problème.
- Permettre à l’équipe de maintenir la qualité du répertoire et de traiter les demandes.

### Non-objectifs de la première cible à valider
- Réaliser les travaux ou certifier de manière absolue les compétences.
- Fixer le prix à la place des parties.
- Traiter un paiement, fournir un crédit ou retenir des fonds.
- Garantir la disponibilité, la qualité ou la sécurité de chaque intervention.
- Publier des avis ouverts sans mécanisme d’authenticité et de contestation.

## 3. Rôles et droits envisagés

| Rôle | Capacités cibles | Limites proposées |
|---|---|---|
| Visiteur | Rechercher et consulter les profils publics | Ne voit pas les coordonnées qui ne sont pas consenties à la diffusion |
| Client | Créer une demande, suivre son statut, la retirer, signaler un problème | Ne consulte que ses demandes et les réponses liées |
| Artisan | Gérer son profil, ses zones/métiers, disponibilité et répondre aux demandes attribuées | Ne consulte que les demandes qui lui sont transmises |
| Opérateur | Aider à inscrire/actualiser des profils, orienter et traiter les signalements | Accès nominatif, limité aux tâches assignées et journalisé |
| Administrateur | Gérer comptes opérateurs, catégories, zones et décisions de modération | Accès renforcé ; actions sensibles tracées |

Les comptes, rôles et contrôles d’accès ne sont pas implémentés dans la maquette.

## 4. Information architecture proposée

### Parcours public
1. Accueil et recherche.
2. Résultats avec filtres (métier, ville/quartier, éventuellement disponibilité).
3. Fiche artisan, détails de service et statut de profil.
4. Demande de devis/contact.
5. Confirmation et instructions pour la suite.
6. Page d’aide, confidentialité et signalement.

### Parcours artisan
1. Présentation du service et conditions de participation.
2. Inscription assistée ou formulaire de profil.
3. Consentement et confirmation de contact.
4. Revue par l’équipe et publication.
5. Réception d’une demande par canal retenu.
6. Réponse, mise à jour du profil et suspension éventuelle.

### Parcours administration
1. Connexion avec accès nominatif.
2. Revue de profils et de justificatifs selon politique de conservation.
3. File de demandes et signalements.
4. Historique des changements et décisions.
5. Indicateurs opérationnels agrégés.

Ces parcours sont une cible, pas des écrans disponibles.

## 5. Fonctionnalités de la maquette existante

| ID | Fonction | Comportement observé | État |
|---|---|---|---|
| M-01 | Accueil | Titre, proposition de valeur et illustrations CSS/emoji | Présent |
| M-02 | Recherche texte | Filtre nom, catégorie, ville et quartier dans les données locales | Présent |
| M-03 | Raccourcis populaires | Remplissent le champ et amènent à la liste | Présent |
| M-04 | Filtre ville | Valeurs intégrées : N'Djaména, Moundou, Sarh, Abéché | Présentées comme démo, pas couverture réelle |
| M-05 | Filtre métier | Tout voir, Électricité, Plomberie, Téléphone, Menuiserie, Autre | Présent |
| M-06 | Combinaison | La recherche, la ville et le métier se combinent | Présent |
| M-07 | Résultats | Cartes générées avec six enregistrements codés en dur, compteur | Présent ; profils fictifs |
| M-08 | État vide | Affiche texte et action d’effacement | Présent |
| M-09 | Demande de devis | Ouvre le dialogue et présélectionne le métier d’une carte | Présent ; aucune transmission |
| M-10 | Validation | Les trois champs du dialogue sont requis par HTML | Présent ; validation navigateur uniquement |
| M-11 | Confirmation | Indique explicitement que la demande n’est pas envoyée/sauvegardée | Présent |
| M-12 | Responsive | Règles CSS pour largeur <= 900 px et <= 650 px | Présent, non certifié par audit visuel complet |
| M-13 | Avis, contact, connexion, administration | Aucun parcours réel | Absent |

## 6. Parcours cible détaillé : rechercher un artisan

### Préconditions
Le profil est publié, consentant, dans une catégorie active et dont les informations n’ont pas dépassé la règle de fraîcheur définie.

### Scénario nominal
1. Le client choisit un métier ou saisit une expression.
2. Il sélectionne éventuellement une ville ou un quartier.
3. Le système retourne des profils correspondant aux critères et indique si aucun n’est disponible.
4. Chaque résultat affiche le métier, la zone publique, les services proposés, l’état de profil explicable et la date d’actualisation.
5. Le client ouvre une fiche et choisit de demander un devis ou de contacter l’artisan selon les règles de confidentialité.

### Scénarios alternatifs
- Aucun profil : proposer une demande d’assistance ou l’élargissement de la zone, sans inventer de résultat.
- Profil ancien : masquer, avertir, ou demander confirmation selon la politique décidée.
- Offre insuffisante : expliquer l’absence de couverture et proposer un canal réel de demande d’aide.
- Recherche ambiguë : proposer des catégories similaires sans supprimer le texte saisi.

## 7. Parcours cible détaillé : demander un service

### Données minimales proposées
- Catégorie ou métier.
- Description du besoin.
- Ville/quartier approximatif.
- Créneau ou urgence, seulement si nécessaire au service.
- Moyen de réponse (téléphone ou autre canal accepté).
- Consentement explicite à transmettre les informations nécessaires au(x) artisan(s) concerné(s).

Ne pas demander une adresse exacte au premier écran. Si elle devient nécessaire, expliquer qui la recevra et à quel moment.

### Scénario nominal
1. Le client déclenche une demande depuis la recherche ou une fiche.
2. Le métier est prérempli si le contexte le permet.
3. Le client décrit le travail et la zone ; les champs requis et leur usage sont clairement affichés.
4. Le système confirme le consentement et transmet la demande selon la politique de distribution choisie.
5. Une confirmation indique ce qui a été transmis, à qui/combien de prestataires et comment retirer la demande.
6. L’artisan accepte, refuse ou demande une précision.
7. Le client est averti et choisit librement s’il souhaite poursuivre.

### Scénarios d’exception
- Échec d’envoi : ne pas afficher « demande envoyée » ; permettre de réessayer sans créer de doublon.
- Aucun artisan correspondant : garder le client informé et offrir une option sans promettre de rappel qui n’existe pas.
- Refus ou absence de réponse : permettre une nouvelle orientation ou fermer la demande avec son accord.
- Demande sensible ou hors périmètre : orienter vers le canal d’assistance, ne pas transmettre automatiquement.
- Retrait : cesser les notifications ultérieures et indiquer les limites de suppression de données déjà communiquées.

## 8. Statuts métier proposés

### Profil artisan
`brouillon → en_revue → publié → suspendu → archivé`

Transitions sensibles (publication, suspension, restauration) autorisées seulement aux rôles prévus et consignées. Un artisan peut demander la correction, le retrait ou la suspension de son profil.

### Demande
`brouillon → soumise → à_orienter → transmise → réponse_reçue → en_contact → conclue`

Issues possibles : `sans_réponse`, `refusée`, `annulée`, `signalée`, `fermée`. L’existence d’un statut ne signifie pas que Kidima garantit la prestation. Définir qui peut faire évoluer chaque état et ce qui est visible à chaque acteur.

### Signalement
`reçu → en_examen → action_requise → résolu` ou `classé_sans_suite`, avec motif, responsable et horodatage interne. Protéger les données des personnes mentionnées et éviter l’affichage public d’accusations.

## 9. Exigences fonctionnelles cible (priorités proposées)

Priorités : **P0** nécessaire pour un pilote fiable ; **P1** utile peu après ; **P2** à différer. Les priorités sont à confirmer avec l’équipe.

| ID | Priorité | Exigence cible | Critère de réussite |
|---|---|---|---|
| C-01 | P0 | Administrer métiers et zones actifs | Une recherche n’utilise que les valeurs maintenues par l’équipe |
| C-02 | P0 | Créer/modifier un profil avec consentement | Consentement, auteur et date sont conservés |
| C-03 | P0 | Mettre en revue avant publication | Un profil non approuvé n’est pas public |
| C-04 | P0 | Rechercher par métier et zone | Seuls les profils publiés et admissibles sont retournés |
| C-05 | P0 | Soumettre une demande avec confirmation | Succès uniquement après réception côté serveur |
| C-06 | P0 | Transmettre une demande avec consentement | L’information n’est partagée qu’aux destinataires expliqués |
| C-07 | P0 | Empêcher doublons et abus élémentaires | Réessai/erreur ne crée pas de demandes inattendues |
| C-08 | P0 | Signaler un profil ou incident | Signalement reçu, état consultable par l’équipe, aucune accusation publiée automatiquement |
| C-09 | P0 | Retirer/suspendre un profil | Le profil cesse d’apparaître publiquement dans le délai d’exploitation défini |
| C-10 | P0 | Assistance et information de confidentialité | L’utilisateur sait contacter l’équipe et comprendre l’usage de ses données |
| C-11 | P1 | Notification d’artisan et de client | Envoi, échec et préférence de canal traçables sans fuite de données |
| C-12 | P1 | Réponse artisan (accepter/refuser/préciser) | Le statut et les messages sont associés à la bonne demande |
| C-13 | P1 | Retour après service | La demande de retour n’est adressée qu’aux parties concernées |
| C-14 | P1 | Recherche tolérante aux accents et alias | Les alias validés renvoient les catégories attendues |
| C-15 | P2 | Favoris, disponibilité détaillée, recommandation avancée | À considérer seulement après preuves d’usage |
| C-16 | P2 | Paiement, réservation, assurance ou garantie | Exclu tant qu’un modèle et les obligations ne sont pas étudiés |

## 10. Règles métier

- Les profils de démonstration ne doivent jamais être exposés en environnement réel.
- Seuls les profils avec consentement actif, statut publié et fraîcheur conforme sont visibles.
- La zone affichée publiquement est approximative ; pas d’adresse du domicile sans nécessité et consentement distinct.
- Un profil « confirmé » décrit uniquement les contrôles réellement effectués et leur date.
- La demande est transmise uniquement après information et accord du client.
- Ne pas transmettre une demande à un nombre illimité d’artisans ; décider du mécanisme et l’expliquer au client.
- Le client choisit librement d’accepter une réponse et de convenir des modalités.
- Les tarifs indiqués sont des devis des prestataires, avec unité, inclusions et durée de validité si la plateforme les affiche.
- Les commentaires/avis ne sont pas publiés avant définition de l’éligibilité, modération, droit de réponse et recours.
- Les actions opérateur affectant un profil ou une plainte sont tracées.

## 11. Critères d’acceptation de la maquette

1. Au chargement, les profils s’affichent avec l’étiquette « Exemple » et la note de démonstration.
2. Rechercher `plomberie` retourne le profil plomberie correspondant.
3. Choisir N'Djaména et Électricité montre seulement le résultat qui satisfait les deux filtres.
4. Un terme improbable affiche l’état vide et permet de restaurer la liste.
5. Un raccourci populaire remplit la recherche et rafraîchit les résultats.
6. Le bouton « Demander un devis » d’une carte ouvre le dialogue et présélectionne la catégorie.
7. Le navigateur empêche la soumission si un champ requis est vide.
8. Après validation, la page indique qu’aucune demande n’a été envoyée ni stockée.
9. Le dialogue peut être fermé par son bouton et le comportement natif clavier du navigateur.
10. Le document reste navigable au clavier et les annonces d’état sont présentes dans le DOM.

## 12. Exigences non fonctionnelles cible

- **Mobile-first :** recherche et demande utilisables sur un téléphone d’entrée de gamme.
- **Réseau :** limiter les ressources, permettre le chargement essentiel avec débit faible et gérer les erreurs de transmission.
- **Disponibilité :** définir une cible de service adaptée au budget et au caractère non urgent du produit ; ne pas promettre un SLA avant capacité d’exploitation.
- **Confidentialité :** minimisation, consentement, durée de conservation et suppression documentés.
- **Sécurité :** authentification des rôles internes/artisans si des données privées existent, autorisation serveur, limitation d’abus et traçabilité.
- **Accessibilité :** labels, clavier, contraste testé, zoom, lecteur d’écran, langage simple et erreurs compréhensibles.
- **Compatibilité :** définir les navigateurs et appareils du pilote à partir des utilisateurs réels.
- **Localisation :** valider les langues, accents, formats de numéro, convention de ville/quartier et éventuelle interface audio.

## 13. Hors périmètre/points à décider avant développement réel

- Authentification obligatoire pour client ou demande sans compte.
- Communication : téléphone dévoilé, relais humain, messagerie ou lien vers un canal externe.
- Choix et configuration des notifications, opt-in et coût.
- Critères d’artisan publiable et preuve admissible par catégorie.
- Gestion des artisans mineurs, personnes vulnérables et services à risque.
- Durée de conservation des demandes et justificatifs.
- Règles des avis, frais, visibilité sponsorisée et litiges.
- Langues et format de description (texte, audio, photo).
