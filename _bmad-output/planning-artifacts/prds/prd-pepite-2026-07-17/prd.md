---
title: Back-office CMS pour Cadeau Malin
created: 2026-07-17
updated: 2026-07-17
status: final
---

# PRD: Back-office CMS pour Cadeau Malin
*Working title — confirm.*

## 0. Document Purpose

Ce PRD cadre un back-office web permettant à Helvire (propriétaire de Cadeau Malin) de consulter et modifier le contenu du site sans éditer directement les fichiers HTML ni utiliser `git`. Il s'adresse à Helvire, et sert de base au futur travail d'architecture (`bmad-architecture`) et de découpage en epics/stories (`bmad-create-epics-and-stories`). Le projet est brownfield — voir `docs/index.md` pour le contexte complet du site existant et de l'agent Pépite qui le fait vivre.

## 1. Vision

Aujourd'hui, tout le contenu de Cadeau Malin (articles, fiches produit, catégories) est créé et modifié par Pépite, un agent autonome qui édite directement des fichiers HTML statiques puis publie via `git`/SSH. C'est efficace pour l'agent, mais Helvire n'a aujourd'hui aucun moyen de corriger lui-même une coquille, ajuster un texte, ou consulter précisément ce qui existe sans ouvrir les fichiers du repo.

Le back-office donne à Helvire une fenêtre directe sur le contenu réel du site — le consulter, le corriger, publier le changement — sans jamais toucher à un fichier `.html` ou une commande `git`. Il ne remplace pas Pépite : l'agent continue de créer et publier du contenu de façon autonome comme aujourd'hui. Le back-office est un filet humain complémentaire, pas une nouvelle voie de création de contenu à grande échelle.

## 2. Target User

### 2.1 Jobs To Be Done
- En tant que propriétaire du site, je veux corriger une coquille ou ajuster un texte sans dépendre de Pépite ni toucher à `git`.
- En tant que propriétaire, je veux voir en un coup d'œil tout le contenu existant (quelles pages, quelles catégories, quels produits) sans naviguer dans l'arborescence de fichiers du repo.
- En tant que propriétaire, je veux être sûr qu'une modification manuelle ne sera pas silencieusement écrasée ou dupliquée par le prochain cycle heartbeat de Pépite.

### 2.2 Non-Users (v1)
- Pépite elle-même n'a pas besoin de ce back-office — elle garde son accès direct aux fichiers et à `git`, plus rapide et plus flexible pour elle.
- Pas d'autre utilisateur humain que Helvire en v1 (pas de multi-compte, pas de rôles).

### 2.3 Key User Journeys

- **UJ-1. Helvire corrige une coquille repérée sur le site en production.**
  - **Persona + contexte :** Helvire, propriétaire de Cadeau Malin, remarque une faute dans un titre d'article en lisant le site publié.
  - **État d'entrée :** authentifié (Google Sign-In, déjà connecté ou reconnexion rapide), sur `/admin`.
  - **Parcours :** ouvre la liste des pages → cherche/filtre l'article concerné → ouvre l'éditeur de contenu → corrige le texte → clique "Publier".
  - **Climax :** un message confirme la publication et indique un lien vers le commit / la page en ligne mise à jour.
  - **Résolution :** la page publique reflète la correction en quelques minutes (délai de build GitHub Pages).
  - **Edge case :** si Pépite est en train de modifier le même fichier au même moment (cycle heartbeat en cours), le back-office doit détecter le conflit et prévenir Helvire plutôt que d'écraser silencieusement.

- **UJ-2. Helvire consulte l'état du contenu avant de demander une action à Pépite.**
  - **Persona + contexte :** Helvire veut vérifier si une catégorie ou un produit existe déjà avant de demander à Pépite d'en créer un (éviter une redondance).
  - **État d'entrée :** authentifié, sur `/admin`.
  - **Parcours :** ouvre la liste des pages, filtre par type (catégorie / blog / produit) → repère ce qui existe déjà.
  - **Climax :** Helvire a la réponse sans avoir à demander à Pépite ou fouiller le repo GitHub.
  - **Résolution :** décision éclairée sur la prochaine demande à Pépite.

## 3. Glossary

- **Back-office** — l'interface web décrite par ce PRD, réservée à Helvire.
- **Fiche de contenu** — une page du site (catégorie, article de blog, ou fiche produit) telle que représentée dans le back-office : titre, chemin de fichier, type, date de dernière modification, statut de publication.
- **Publication** — l'action de committer et pousser (`git push`) une modification vers `main`, déclenchant le déploiement GitHub Pages. Identique au mécanisme déjà utilisé par Pépite (`scripts/github_commit_changes.js` + `scripts/github_open_pr_or_push.js`).
- **Cycle heartbeat** — l'itération autonome récurrente de Pépite (voir `docs/integration-architecture.md`), qui peut créer ou modifier des fiches de contenu indépendamment du back-office.
- **Conflit d'édition** — situation où le back-office et un cycle heartbeat modifient la même fiche de contenu de façon concurrente.

## 4. Features

### 4.1 Authentification et accès

**Description :** Le back-office est protégé par le même mécanisme que `site/dashboard.html` : Google Sign-In via Supabase Auth, avec une policy RLS restreignant l'accès à l'email exact d'Helvire. Aucun nouveau système d'authentification. [ASSUMPTION: le back-office vit sur une nouvelle page `site/admin.html`, gated de la même façon que `dashboard.html`, plutôt qu'une application séparée.]

**Functional Requirements:**

#### FR-1: Connexion réservée au propriétaire

Helvire peut se connecter au back-office via Google Sign-In. Réalise UJ-1, UJ-2.

**Consequences (testable):**
- Toute tentative de connexion avec un compte Google différent de l'email propriétaire affiche un écran de refus, sans accès au contenu.
- La session persiste selon le même comportement que `dashboard.html` (pas de re-authentification à chaque visite dans une même session navigateur).

**Out of Scope:** gestion de plusieurs comptes/rôles.

### 4.2 Liste des fiches de contenu

**Description :** Une vue listant toutes les fiches de contenu du site (`site/categories/*.html`, `site/blog/*.html`, `site/produits/*.html`, plus les pages spéciales comme `index.html`), filtrable par type. Réalise UJ-2.

**Functional Requirements:**

#### FR-2: Inventaire complet et à jour du contenu

Helvire peut voir la liste de toutes les fiches de contenu existantes, avec type, titre et chemin de fichier.

**Consequences (testable):**
- La liste reflète l'état réel du repo au moment du chargement (pas une copie figée qui peut diverger après un cycle heartbeat).
- Une fiche créée par Pépite lors du heartbeat le plus récent apparaît dans la liste sans action manuelle.

#### FR-3: Filtrage par type

Helvire peut filtrer la liste par type de fiche (catégorie / article / produit).

**Consequences (testable):**
- Le filtre réduit correctement la liste affichée sans rechargement de page complet.

### 4.3 Édition de contenu

**Description :** Depuis la liste, Helvire ouvre une fiche et modifie son contenu texte (titre, description, corps). [ASSUMPTION: v1 propose une édition en texte brut du fichier HTML avec aperçu, plutôt que des champs structurés par section — parser fiablement chaque type de page en champs distincts est un travail d'architecture significatif, mieux traité en v2 si le besoin se confirme à l'usage.] Réalise UJ-1.

**Functional Requirements:**

#### FR-4: Édition du contenu d'une fiche existante

Helvire peut modifier le texte d'une fiche de contenu existante et voir un aperçu avant publication.

**Consequences (testable):**
- L'aperçu charge `site/styles.css` (la même feuille de style que la page publiée) et affiche le contenu modifié rendu avec cette feuille de style, avant toute publication — le mécanisme exact (iframe, panneau côte-à-côte, etc.) dépend de l'approche d'édition retenue en architecture. [NOTE FOR PM: à préciser une fois l'architecture d'édition tranchée.]
- Aucune modification n'est publiée tant que Helvire n'a pas explicitement cliqué "Publier".

**Out of Scope:** création de nouvelles fiches de contenu depuis le back-office (v1 = édition de l'existant uniquement) ; édition par champs structurés (titre/description/CTA séparément).

### 4.4 Publication

**Description :** Un clic "Publier" doit aboutir à un commit + push réel vers `main`, identique en résultat à ce que fait Pépite aujourd'hui — sans exposer de nouveau service public non authentifié. [ASSUMPTION: le mécanisme précis (file d'attente Supabase relayée par l'agent, ou autre) est une décision d'architecture, pas de ce PRD — voir Open Questions.] Réalise UJ-1.

**Functional Requirements:**

#### FR-5: Publication déclenchée par l'utilisateur

Helvire peut publier une modification, qui aboutit à un commit + push effectif sur le repo `helvirekouoto/pepite`.

**Consequences (testable):**
- Après publication, la modification est visible dans l'historique `git log` du repo avec un message de commit clair identifiant qu'elle vient du back-office (pas confondue avec un commit Pépite).
- La page modifiée est en ligne sur `https://helvirekouoto.github.io/pepite/` dans un délai raisonnable (déploiement GitHub Pages standard).

#### FR-6: Détection de conflit avec le cycle heartbeat

Si la fiche a été modifiée par Pépite après le chargement de l'éditeur par Helvire, le back-office prévient avant de publier plutôt que d'écraser silencieusement. Réalise edge case UJ-1.

**Consequences (testable):**
- Une modification concurrente (fichier changé côté repo entre le chargement et la publication) déclenche un avertissement explicite, pas un écrasement silencieux.

**Feature-specific NFRs:**
- Sécurité : aucune action de publication ne doit être possible sans passer par FR-1 (authentification propriétaire).

### 4.5 Journalisation

**Description :** Toute action du back-office (connexion, édition, publication) est journalisée dans Supabase (`agent_logs`), avec un `agent` distinct (ex. `back-office-manuel`) pour que Pépite puisse distinguer une modification manuelle d'une modification issue de son propre cycle heartbeat lors de son audit habituel.

**Functional Requirements:**

#### FR-7: Traçabilité des actions manuelles

Chaque publication depuis le back-office est enregistrée dans `agent_logs` avec un identifiant distinct des actions de Pépite.

**Consequences (testable):**
- Le cycle heartbeat de Pépite (qui audite `agent_logs`/`content_assets` avant d'agir, voir `docs/integration-architecture.md`) peut voir qu'une fiche a été modifiée manuellement récemment.

## 5. Non-Goals (Explicit)

- Le back-office ne remplace pas Pépite : la création autonome de contenu (nouvelles catégories, articles, fiches produit) reste le rôle de l'agent, pas du back-office.
- Pas de multi-utilisateur, pas de rôles/permissions différenciés en v1.
- Pas de gestion de médias/images (le site n'utilise que des icônes SVG inline, pas de bibliothèque d'images).
- Pas d'édition par champs structurés en v1 (voir FR-4 assumption) — édition texte brut + aperçu seulement.
- Pas de création de nouvelles fiches de contenu en v1 — édition de l'existant uniquement.
- Le back-office ne devient pas un second mécanisme de publication concurrent non coordonné avec Pépite — FR-6/FR-7 existent précisément pour éviter ça.

## 6. MVP Scope

### 6.1 In Scope
- Authentification Google Sign-In réutilisant le pattern `dashboard.html` (FR-1).
- Liste filtrable de toutes les fiches de contenu existantes (FR-2, FR-3).
- Édition texte brut avec aperçu d'une fiche existante (FR-4).
- Publication réelle (commit + push) avec détection de conflit (FR-5, FR-6).
- Journalisation Supabase distincte de celle de Pépite (FR-7).

### 6.2 Out of Scope for MVP
- Édition par champs structurés — différé en v2 si l'usage du texte brut s'avère limitant. [NOTE FOR PM: à réévaluer après quelques semaines d'usage réel du back-office par Helvire.]
- Création de nouvelles fiches de contenu depuis le back-office — différé, Pépite reste seule responsable de la création en v1.
- Gestion de médias/images.
- Multi-utilisateur.

## 7. Success Metrics

**Primary**
- **SM-1** : Une correction de contenu par Helvire prend moins de 5 minutes de bout en bout (connexion → édition → publication → en ligne), sans intervention de Pépite ni commande `git` manuelle. Valide FR-1, FR-4, FR-5.

**Secondary**
- **SM-2** : Zéro conflit silencieux constaté entre une édition manuelle et un cycle heartbeat sur une période de 30 jours d'usage. Valide FR-6, FR-7.

**Counter-metrics (do not optimize)**
- **SM-C1** : Le back-office ne doit pas devenir la voie principale de création de contenu (ça reviendrait à dupliquer/concurrencer le rôle de Pépite plutôt que de le compléter). Contrebalance une tentation d'élargir le scope vers la création plutôt que l'édition. Contrebalance SM-1.

## 8. Open Questions

1. Mécanisme technique exact de publication (FR-5) : le navigateur ne peut pas exécuter `git push` directement (site 100% statique, pas de serveur applicatif exposé). Deux directions identifiées, à trancher en architecture :
   a. Le back-office écrit la modification dans une table Supabase dédiée (file d'attente), et un mécanisme côté agent (heartbeat existant, ou un petit script dédié) la récupère et exécute réellement le commit+push via les scripts existants (`scripts/github_commit_changes.js`). Cohérent avec "aucune nouvelle dépendance", mais publication non instantanée (dépend du prochain passage de l'agent).
   b. Un nouveau mécanisme serveur (Edge Function avec clé de déploiement, ou petit service sur le VPS) exécute le push immédiatement depuis le clic "Publier". Publication instantanée, mais introduit une nouvelle surface technique (clé SSH/déploiement à sécuriser en dehors du contexte agent existant).
2. Détection de conflit (FR-6) : comparer un hash/timestamp du fichier au moment du chargement vs au moment de la publication — à spécifier précisément en architecture.
3. Le back-office vit-il à une URL publique non répertoriée (`site/admin.html`, comme `dashboard.html`) ou complètement hors du site public ? [ASSUMPTION: même approche que `dashboard.html`, à confirmer.]

## 9. Assumptions Index

- §4.1 — Le back-office vit sur une nouvelle page `site/admin.html`, gated comme `dashboard.html`.
- §4.3 — v1 propose une édition en texte brut avec aperçu, pas des champs structurés.
- §4.4 — Le mécanisme précis de publication est une décision d'architecture (voir Open Question 1), pas figée dans ce PRD.
