# MISSION

Tu travailles sur **Kidima**, une plateforme qui met en relation des particuliers avec des artisans locaux.

Le frontend existe déjà et les principales routes sont fonctionnelles.
Le backend sera développé séparément.

Ta mission est donc **uniquement de transformer le frontend existant en une application extrêmement professionnelle, cohérente, moderne, rassurante, responsive et prête à être présentée à des utilisateurs, partenaires ou investisseurs.**

Tu dois travailler directement dans le projet existant.

Ne recrée pas inutilement toute l'application si les composants et routes existent déjà.

Commence par auditer l'existant, puis améliore progressivement :

- architecture UI ;
- design system ;
- navigation ;
- responsive ;
- composants ;
- hiérarchie visuelle ;
- typographie ;
- espacements ;
- états ;
- formulaires ;
- cartes ;
- tableaux ;
- UX mobile ;
- accessibilité ;
- cohérence entre toutes les pages.

---

# 1. OBJECTIF PRODUIT

Kidima doit donner immédiatement cette impression :

> Une plateforme locale fiable, humaine et moderne qui permet de trouver rapidement un artisan de confiance et de demander un service sans complexité.

L'interface doit inspirer :

- confiance ;
- proximité ;
- simplicité ;
- sérieux ;
- qualité ;
- sécurité ;
- accessibilité.

L'application ne doit surtout pas avoir l'apparence :

- d'un template générique ;
- d'un dashboard SaaS standard ;
- d'un projet étudiant ;
- d'un site généré automatiquement ;
- d'une accumulation de cartes ;
- d'une interface trop colorée ;
- d'un clone d'Uber, Airbnb ou Fiverr.

Créer une identité propre à Kidima.

---

# 2. STYLE VISUEL GÉNÉRAL

Conserver l'esprit actuel de Kidima :

## Palette principale

Fond général :

`#F5F4ED`

Vert principal :

`#1B604B`

Vert texte profond :

`#183A31`

Jaune / accent :

`#F7C65C`

Ajouter si nécessaire des nuances cohérentes :

- vert très clair pour backgrounds ;
- ivoire ;
- blanc cassé ;
- gris neutres ;
- gris texte ;
- rouge doux pour erreurs ;
- orange doux pour états d'attente ;
- bleu discret pour informations.

Ne pas multiplier les couleurs.

Utiliser le jaune principalement pour :

- CTA principal ;
- mise en avant ;
- éléments interactifs importants.

Le vert doit porter :

- la marque ;
- la navigation active ;
- les titres importants ;
- les confirmations ;
- les éléments de confiance.

---

# 3. DESIGN SYSTEM

Construire ou consolider un vrai design system.

Créer des tokens réutilisables pour :

- couleurs ;
- backgrounds ;
- bordures ;
- rayons ;
- ombres ;
- spacing ;
- typographie ;
- tailles ;
- états interactifs ;
- breakpoints.

Éviter les valeurs CSS arbitraires répétées partout.

## Rayons

Utiliser des arrondis modernes mais pas excessifs :

- petits composants : 10–12 px ;
- inputs : 12–14 px ;
- cards : 16–20 px ;
- grandes sections : 20–28 px.

Ne pas transformer chaque bloc en carte arrondie.

---

# 4. TYPOGRAPHIE

Utiliser une typographie moderne, très lisible et chaleureuse.

Exemples adaptés :

- Inter ;
- Manrope ;
- Plus Jakarta Sans ;
- Geist ;
- éventuellement une combinaison cohérente si déjà disponible.

Hiérarchie recommandée :

H1 desktop :
44–64 px selon la page.

H1 mobile :
32–40 px.

H2 :
28–36 px.

H3 :
20–24 px.

Body :
15–17 px.

Texte secondaire :
13–15 px.

Toujours respecter :

- lisibilité ;
- line-height confortable ;
- largeur maximale des paragraphes ;
- contraste suffisant.

Ne jamais mettre énormément de texte dans une carte étroite.

---

# 5. STRUCTURE RESPONSIVE

L'application doit être réellement responsive.

Tester au minimum :

- 320 px ;
- 375 px ;
- 390 px ;
- 430 px ;
- 768 px ;
- 1024 px ;
- 1280 px ;
- 1440 px.

Aucune page ne doit simplement être une version desktop compressée.

Mobile doit être pensé comme une vraie expérience mobile.

---

# 6. NAVIGATION DESKTOP

Sur desktop, créer une navigation propre et stable avec :

- logo Kidima ;
- Accueil ;
- Artisans ;
- Demandes ;
- Activité ;
- Profil.

Le lien actif doit être clairement identifiable.

Le header doit être :

- sobre ;
- compact ;
- éventuellement sticky ;
- avec une largeur maximale cohérente avec le contenu.

Éviter les énormes headers.

---

# 7. NAVIGATION MOBILE

Sur mobile :

utiliser une vraie bottom navigation fixe.

Onglets :

- Accueil ;
- Artisans ;
- Demandes ;
- Activité ;
- Profil.

Chaque entrée :

- icône ;
- label ;
- état actif clair.

Prévoir :

`padding-bottom: env(safe-area-inset-bottom)`

La bottom navigation ne doit jamais masquer le contenu.

Prévoir le padding inférieur nécessaire dans toutes les pages.

L'espace professionnel ne doit pas devenir un onglet principal.

L'administration ne doit jamais apparaître dans cette navigation.

---

# 8. ICÔNES

Utiliser une bibliothèque cohérente comme Lucide.

Ne jamais utiliser des emojis comme icônes principales de l'interface.

Les icônes doivent avoir :

- taille cohérente ;
- stroke cohérent ;
- alignement précis ;
- usage fonctionnel.

---

# 9. PAGE ACCUEIL `/`

Cette page doit devenir la meilleure page du produit.

Elle doit être accueillante, humaine et commerciale sans devenir une landing page marketing excessive.

## HERO

Créer une grande hero section.

Message principal suggéré :

**Trouvez un artisan de confiance près de chez vous.**

Sous-titre :

**Plomberie, électricité, menuiserie, couture et bien plus encore. Trouvez rapidement le professionnel adapté à votre besoin.**

Prévoir une zone visuelle avec éventuellement :

- photo d'un artisan ;
- composition éditoriale locale ;
- illustration professionnelle.

Éviter une image générique de startup.

## Recherche principale

Grande barre :

`Rechercher un métier, un service ou un quartier…`

Avec :

- icône recherche ;
- bouton Rechercher ;
- suggestions / catégories rapides.

## CTA principal

**Faire une demande**

Très visible.

## Catégories

Afficher plusieurs catégories :

- Plomberie ;
- Électricité ;
- Menuiserie ;
- Couture ;
- Peinture ;
- Climatisation.

Chaque catégorie doit avoir :

- icône ;
- nom ;
- éventuellement courte description.

## Artisans mis en avant

Créer des cards professionnelles comprenant uniquement les informations réellement disponibles.

Exemple :

- photo ;
- nom ;
- métier ;
- quartier / zone ;
- services courts ;
- CTA Voir le profil.

IMPORTANT :

Ne jamais afficher de fausses notes, disponibilité, badge vérifié, prix ou statistiques si ces données ne sont pas réellement présentes dans le prototype.

La maquette visuelle précédente contenait des notes et badges fictifs : **ne pas reproduire ces informations comme si elles existaient réellement.**

## Section demande

Ajouter une section :

**Vous avez un besoin précis ?**

Présenter le parcours :

1. décrivez le besoin ;
2. précisez le lieu ;
3. préparez votre demande.

CTA :

**Créer une demande**

---

# 10. PAGE ARTISANS `/artisans`

Cette page doit être pensée comme une vraie interface de recherche.

## Header

Titre :

**Trouver un artisan**

Description courte.

Ajouter le nombre de résultats :

`24 artisans`

## Recherche

Barre principale :

`Nom, métier, service ou quartier…`

## Filtres

Filtres accessibles et lisibles :

- métier ;
- quartier.

Desktop :

possible sidebar légère ou barre horizontale.

Mobile :

bouton **Filtres** ouvrant un bottom sheet / modal.

Afficher les filtres actifs sous forme de chips supprimables.

Ajouter :

**Réinitialiser**

## Cards

Créer des cards modernes.

Éviter des cards trop hautes.

Informations :

- photo ;
- nom ;
- métier ;
- zone ;
- services ;
- CTA.

Sur desktop :

grid 2 ou 3 colonnes selon largeur.

Sur mobile :

une colonne.

## État vide

Si aucun résultat :

titre :

**Aucun artisan ne correspond à vos critères**

texte explicatif.

bouton :

**Réinitialiser les filtres**

---

# 11. FICHE ARTISAN `/artisan/[slug]`

Cette page doit être particulièrement rassurante.

Créer un header profil avec :

- photo ;
- nom ;
- métier ;
- zone ;
- description courte.

Ajouter une section :

## Services proposés

Cards ou liste structurée.

Puis :

## À propos

Puis éventuellement :

## Zone d'intervention

IMPORTANT :

Pour les données absentes, ne jamais inventer.

Afficher explicitement :

- Avis : non disponibles dans cette démonstration.
- Disponibilité : non renseignée.
- Vérification : statut non disponible.
- Tarifs : communiqués après échange.
- Horaires : non renseignés.

Ces informations doivent être présentées proprement, sans donner l'impression d'un bug.

CTA principal :

**Faire une demande à cet artisan**

Ce bouton doit ouvrir `/demande` avec les informations métier / artisan déjà préparées si le routing actuel le permet.

Sur mobile :

prévoir éventuellement un CTA sticky en bas.

---

# 12. NOUVELLE DEMANDE `/demande`

Cette page est essentielle.

Créer une expérience guidée en **6 étapes** :

1. métier ;
2. service ;
3. lieu fictif ;
4. période ;
5. coordonnées fictives ;
6. récapitulatif.

## Desktop

Utiliser un stepper horizontal propre.

## Mobile

Stepper compact avec :

`Étape 2 sur 6`

et progression visuelle.

Chaque étape doit être focalisée.

Éviter d'afficher toutes les questions en même temps.

## Étape métier

Cartes sélectionnables :

- plomberie ;
- électricité ;
- menuiserie ;
- couture ;
- etc.

## Étape service

Options liées au métier.

## Étape lieu

Mention claire :

**Les informations saisies sont fictives et utilisées uniquement pour l'aperçu local.**

## Étape période

Utiliser de grandes options simples :

- dès que possible ;
- cette semaine ;
- date à définir.

## Étape coordonnées

Champs fictifs avec indication explicite de démonstration.

Ne jamais inciter à renseigner de vraies informations personnelles dans ce prototype.

## Étape récapitulatif

Créer un résumé particulièrement propre :

- métier ;
- service ;
- lieu ;
- période ;
- coordonnées d'exemple.

Boutons :

- Retour ;
- Modifier ;
- Prévisualiser la demande.

Ne jamais afficher un texte qui laisse croire que la demande a réellement été transmise.

Utiliser par exemple :

**Aucune demande n'est envoyée : ceci est un aperçu local de démonstration.**

---

# 13. PAGE ACTIVITÉ `/demandes`

Cette page regroupe les exemples de demandes et devis.

Titre :

**Mon activité**

Créer des tabs :

- Tout ;
- Demandes ;
- Devis.

Ajouter éventuellement compteurs.

Chaque élément doit être une card / ligne claire avec :

- référence ;
- type ;
- métier ;
- date ;
- statut fictif ;
- résumé.

Prévoir des statuts visuels sobres :

- brouillon ;
- en attente ;
- proposition reçue ;
- terminé ;
- annulé.

Ne pas utiliser des couleurs agressives.

Au clic :

ouvrir un détail.

## Vue détail

Présenter :

- résumé ;
- artisan éventuel ;
- chronologie ;
- informations associées ;
- historique illustratif.

Toujours signaler que ces données sont des exemples de démonstration.

---

# 14. RÉCLAMATIONS `/reclamations`

Créer une vraie page structurée.

Titre :

**Réclamations**

Sous-titre expliquant que les éléments sont fictifs.

Filtres :

- toutes ;
- ouvertes ;
- en cours ;
- clôturées.

Cards ou tableau responsive contenant :

- référence ;
- motif ;
- date ;
- statut ;
- service concerné.

Au clic :

ouvrir le détail avec :

- résumé ;
- demande associée ;
- historique ;
- statut.

Afficher clairement :

**Aucun signalement réel n'a été envoyé depuis cette démonstration.**

Ajouter éventuellement un bouton de création uniquement s'il existe déjà fonctionnellement ; sinon ne pas introduire un faux workflow.

---

# 15. PROFIL `/profil`

Cette page représente le compte unique Kidima.

Ne jamais créer un deuxième compte pour l'artisan.

Le même utilisateur peut être :

- client ;
- artisan.

Créer :

## Header profil

- avatar ;
- nom fictif ;
- statut compte de démonstration.

## Section Compte

- informations de profil ;
- activité ;
- demandes ;
- devis ;
- réclamations.

## Section Activité professionnelle

Carte :

**Vous proposez aussi vos services ?**

Si le profil professionnel est activé :

**Gérer mon espace professionnel**

Sinon :

**Activer mon activité professionnelle**

Mais cela reste le même compte.

Ajouter une mention expliquant :

**Votre activité professionnelle est liée à votre compte Kidima. Aucun second compte n'est nécessaire.**

---

# 16. ESPACE PROFESSIONNEL `/pro`

Créer une expérience différente sans casser le design global.

Desktop :

sidebar locale possible à l'intérieur de l'espace professionnel.

Mobile :

tabs / navigation secondaire scrollable.

Sections :

- Vue d'ensemble ;
- Profil professionnel ;
- Services ;
- Disponibilités ;
- Demandes reçues ;
- Devis envoyés.

---

# 17. `/pro` — VUE D'ENSEMBLE

Créer quelques indicateurs simples.

Par exemple :

- demandes d'exemple ;
- devis préparés ;
- profil complété ;
- services configurés.

Ne jamais utiliser des chiffres présentés comme données réelles.

Ajouter explicitement une mention :

**Données de démonstration**

Afficher :

- prochaines actions ;
- demandes récentes ;
- aperçu du profil.

---

# 18. `/pro` — PROFIL PROFESSIONNEL

Créer une vraie page d'édition UI.

Sections :

- photo ;
- métier ;
- description ;
- zone d'intervention ;
- expérience éventuelle ;
- informations publiques.

Ajouter état d'aperçu.

Toute modification doit rester temporaire.

Afficher :

**Ces modifications ne sont pas publiées et disparaîtront à la fermeture de la démonstration.**

---

# 19. `/pro` — SERVICES

Afficher la liste des services.

Chaque service :

- nom ;
- description ;
- catégorie ;
- état local.

Permettre éventuellement :

- ajouter ;
- modifier ;
- masquer.

Mais aucune modification ne doit prétendre être enregistrée sur un serveur.

---

# 20. `/pro` — DISPONIBILITÉS

Créer une UI claire et simple.

Éviter les calendriers complexes si aucune logique réelle n'existe.

Utiliser éventuellement :

- jours de semaine ;
- disponible / indisponible ;
- créneaux fictifs.

Ajouter :

**Disponibilités de démonstration, non publiées.**

---

# 21. `/pro` — DEMANDES REÇUES

Créer une liste professionnelle.

Champs :

- client fictif ;
- service ;
- zone ;
- période ;
- statut ;
- action.

Au clic :

détail avec possibilité visuelle de :

- consulter ;
- préparer un devis ;
- décliner.

Mais les actions doivent être clairement locales / fictives.

---

# 22. `/pro` — DEVIS ENVOYÉS

Créer une liste avec :

- référence ;
- demande ;
- client ;
- montant d'exemple ;
- date ;
- statut.

Status possibles :

- brouillon ;
- envoyé ;
- accepté ;
- refusé.

Si des montants apparaissent, préciser qu'ils sont fictifs.

---

# 23. REDIRECTION `/menu`

L'ancienne route :

`/menu`

doit automatiquement rediriger vers :

`/profil`

Ne pas afficher de page intermédiaire.

---

# 24. REDIRECTION `/book`

L'ancienne route :

`/book`

redirige vers :

`/demande`

Conserver si présents les paramètres :

- artisan ;
- métier.

Par exemple :

`/book?artisan=xxx&metier=plomberie`

doit transmettre ces informations au nouveau parcours.

---

# 25. PAGE `+not-found`

Créer une vraie page 404 élégante.

Titre :

**Cette page n'existe pas**

Texte :

**Le lien utilisé semble incorrect ou la page a été déplacée.**

Actions :

- Retour à l'accueil ;
- Parcourir les artisans.

Ajouter une illustration ou un élément graphique léger.

---

# 26. ADMIN `apps/admin/index.html`

IMPORTANT :

L'administration reste complètement séparée de l'application utilisateur.

Elle ne doit jamais apparaître dans la navigation principale.

Créer une maquette admin moderne avec :

sidebar desktop :

- Vue d'ensemble ;
- Artisans ;
- Demandes ;
- Devis ;
- Réclamations ;
- Utilisateurs ;
- Audit ;
- Paramètres.

Header :

- recherche ;
- environnement démo ;
- profil admin fictif.

## Dashboard

Afficher des widgets tels que :

- artisans ;
- demandes ;
- devis ;
- réclamations.

Mais inscrire clairement :

**Données fictives de démonstration**

Créer éventuellement :

- courbe d'activité illustrative ;
- répartition des métiers ;
- dernières actions.

## Tables

Tables professionnelles :

- checkbox ;
- identité ;
- statut ;
- date ;
- actions.

Ajouter :

- recherche ;
- filtre ;
- pagination visuelle.

IMPORTANT :

Aucune action administrative réelle ne doit être simulée comme si elle avait été exécutée.

Les boutons peuvent afficher :

**Action non disponible dans cette maquette.**

---

# 27. COMPOSANTS À STANDARDISER

Créer ou améliorer des composants réutilisables :

- Button ;
- IconButton ;
- Input ;
- SearchInput ;
- Select ;
- Textarea ;
- Checkbox ;
- Radio ;
- Switch ;
- Badge ;
- Avatar ;
- Tabs ;
- Modal ;
- BottomSheet ;
- Drawer ;
- Card ;
- EmptyState ;
- LoadingState ;
- Skeleton ;
- Alert ;
- Toast ;
- Stepper ;
- Breadcrumb ;
- PageHeader ;
- SectionHeader ;
- FilterChip ;
- ArtisanCard ;
- RequestCard ;
- QuoteCard ;
- ComplaintCard.

Éviter de dupliquer les mêmes structures page par page.

---

# 28. BOUTONS

Définir 4 variantes maximum :

## Primary

Jaune Kidima.

Utilisé pour la principale action de la page.

## Secondary

Vert ou outline.

## Ghost

Navigation ou actions mineures.

## Danger

Uniquement pour actions destructrices.

Hauteur recommandée :

44–48 px.

Les boutons mobile critiques doivent être faciles à toucher.

---

# 29. FORMULAIRES

Tous les formulaires doivent comporter :

- label visible ;
- placeholder seulement si utile ;
- état focus ;
- erreur ;
- helper text ;
- état disabled ;
- état sélectionné.

Ne jamais utiliser uniquement un placeholder comme label.

Prévoir une largeur maximale confortable.

---

# 30. ÉTATS UI

Toutes les pages importantes doivent avoir des états cohérents :

- normal ;
- hover ;
- focus ;
- active ;
- disabled ;
- loading ;
- empty ;
- error ;
- success.

Créer des skeletons pour les listes même si les données actuelles sont locales.

Cela prépare l'application au futur backend.

---

# 31. MICRO-INTERACTIONS

Ajouter des transitions très légères :

- hover cards ;
- boutons ;
- apparition modal ;
- ouverture filtres ;
- changement tabs.

Durée :

150–250 ms environ.

Pas d'animations excessives.

Respecter :

`prefers-reduced-motion`.

---

# 32. ACCESSIBILITÉ

Respecter autant que possible WCAG AA.

Vérifier :

- contraste ;
- labels ;
- aria-label ;
- navigation clavier ;
- focus visible ;
- taille des zones tactiles ;
- ordre logique ;
- textes alternatifs.

Ne jamais retirer l'outline sans alternative.

---

# 33. RESPONSIVE DES TABLES

Pour l'administration ou les vues professionnelles :

desktop :

table classique.

Mobile :

transformer les lignes en cards lisibles ou permettre un scroll horizontal réellement utilisable.

Ne jamais réduire une table desktop jusqu'à rendre le texte illisible.

---

# 34. IMAGES

Utiliser des proportions constantes.

Artisans :

`aspect-ratio` cohérent.

Prévoir :

- fallback ;
- object-fit cover ;
- skeleton ;
- avatar placeholder.

Optimiser la taille des images.

Ne jamais déformer les portraits.

---

# 35. COPYWRITING

Corriger également les textes faibles ou trop techniques.

Le ton Kidima doit être :

- simple ;
- chaleureux ;
- professionnel ;
- direct.

Éviter :

- jargon technique ;
- phrases longues ;
- promesses non prouvées.

Par exemple, ne pas écrire :

**Artisans vérifiés**

si aucune vérification réelle n'existe.

Préférer :

**Découvrez les profils disponibles**

ou :

**Artisans présentés dans cette démonstration**

lorsque nécessaire.

---

# 36. NE PAS INVENTER DE DONNÉES

Règle absolue.

Ne jamais inventer et afficher comme réels :

- notes ;
- nombre d'avis ;
- nombre de missions ;
- artisans vérifiés ;
- disponibilité en temps réel ;
- prix réels ;
- distance réelle ;
- géolocalisation réelle ;
- transactions ;
- demandes envoyées ;
- notifications ;
- utilisateurs actifs.

Les données fictives doivent être identifiables comme telles lorsqu'elles pourraient induire l'utilisateur en erreur.

---

# 37. ARCHITECTURE

Avant toute grosse modification :

1. analyser la structure du projet ;
2. identifier les routes ;
3. identifier les composants existants ;
4. identifier la navigation ;
5. identifier le système de styles ;
6. identifier les composants dupliqués ;
7. comprendre les limitations Expo / React Native Web utilisées par le projet.

Ensuite, réutiliser au maximum l'existant.

Ne pas introduire une dépendance lourde uniquement pour quelques composants.

Ne pas casser :

- typecheck ;
- lint ;
- Expo ;
- export web ;
- navigation.

---

# 38. NETTOYAGE

Supprimer ou corriger :

- styles dupliqués ;
- composants morts ;
- imports inutiles ;
- textes temporaires ;
- placeholders incohérents ;
- boutons sans fonction ;
- espacements arbitraires ;
- couleurs hardcodées contradictoires ;
- tailles de texte incohérentes.

---

# 39. QUALITÉ DU CODE

Le résultat doit être maintenable.

Éviter :

- énormes composants ;
- duplication ;
- inline styles massifs ;
- conditions UI répétées ;
- hacks responsive.

Séparer si nécessaire :

- components ;
- screens ;
- layouts ;
- data ;
- hooks ;
- constants ;
- theme ;
- utils.

Mais ne pas réarchitecturer tout le projet sans raison.

---

# 40. VALIDATION FINALE

Après modifications, vérifier au minimum :

- TypeScript ;
- lint ;
- build / export Expo Web ;
- navigation ;
- routes ;
- redirections ;
- comportement mobile ;
- comportement desktop ;
- absence d'overflow ;
- bottom navigation ;
- formulaires ;
- filtres ;
- état vide ;
- modals ;
- page 404 ;
- admin HTML ;
- absence de warnings importants.

Exécuter également :

`git diff --check`

Corriger toutes les erreurs détectées avant de terminer.

---

# 41. CRITÈRES DE RÉUSSITE

Le travail est réussi uniquement si :

1. toutes les pages semblent appartenir au même produit ;
2. l'interface semble conçue par une vraie équipe produit ;
3. mobile et desktop semblent avoir été conçus séparément puis harmonisés ;
4. aucun écran important ne semble vide ou improvisé ;
5. chaque page possède une hiérarchie visuelle claire ;
6. les CTA sont immédiatement compréhensibles ;
7. les formulaires sont simples ;
8. les informations fictives ne sont jamais présentées comme réelles ;
9. le frontend reste fonctionnel ;
10. l'interface ne ressemble pas à un template généré automatiquement.

---

# 42. ORDRE DE TRAVAIL

Travaille dans cet ordre :

### Phase 1 — Audit

Analyse l'ensemble du frontend existant.

Fais l'inventaire des routes, composants, styles et problèmes UX.

### Phase 2 — Foundations

Corrige :

- thème ;
- spacing ;
- typography ;
- buttons ;
- inputs ;
- cards ;
- navigation ;
- layouts.

### Phase 3 — Navigation

Refais :

- header desktop ;
- bottom nav mobile ;
- navigation pro.

### Phase 4 — Pages principales

Refais :

1. Accueil ;
2. Artisans ;
3. Fiche artisan ;
4. Demande.

### Phase 5 — Compte

Refais :

5. Activité ;
6. Réclamations ;
7. Profil.

### Phase 6 — Espace professionnel

Refais intégralement `/pro`.

### Phase 7 — Cas secondaires

Corrige :

- `/menu` ;
- `/book` ;
- `+not-found`.

### Phase 8 — Admin

Refais `apps/admin/index.html`.

### Phase 9 — Responsive & polish

Passe chaque écran en :

- mobile ;
- tablette ;
- desktop.

### Phase 10 — QA

Exécute les vérifications techniques et corrige les problèmes.

---

# 43. IMPORTANT — AUTONOMIE

Ne me demande pas de valider chaque petite modification.

Analyse le projet et prends les décisions UI/UX nécessaires.

Si quelque chose existe déjà et fonctionne correctement, améliore-le plutôt que de le remplacer sans raison.

Si une fonctionnalité nécessite un backend inexistant, crée uniquement l'expérience frontend et indique clairement son caractère fictif.

Ne simule pas de persistance réelle.

---

# 44. LIVRABLE FINAL

À la fin, donne-moi un rapport synthétique comprenant :

- pages refaites ;
- nouveaux composants créés ;
- design system mis en place ;
- améliorations responsive ;
- améliorations UX ;
- éléments volontairement laissés fictifs ;
- tests exécutés ;
- résultats du typecheck ;
- résultats du lint ;
- résultat de l'export web ;
- résultat de `git diff --check` ;
- éventuels éléments qui nécessiteront le futur backend.

Le frontend final doit être **beau, cohérent, crédible, rapide et particulièrement confortable sur smartphone**, car Kidima doit fonctionner naturellement aussi bien pour les clients que pour les artisans.