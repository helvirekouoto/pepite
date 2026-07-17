---
stepsCompleted: [step-01]
inputDocuments: ['_bmad-output/planning-artifacts/prds/prd-pepite-2026-07-17/prd.md', '_bmad-output/planning-artifacts/architecture/architecture-pepite-2026-07-17/ARCHITECTURE-SPINE.md']
---

# Back-office CMS pour Cadeau Malin - Epic Breakdown

## Overview

Ce document décompose le PRD (`prd-pepite-2026-07-17`) et l'architecture spine associée en epics et stories implémentables. Pas de document UX distinct (aucun run `bmad-ux` — projet interne mono-utilisateur, cadré comme capability spec par le PRD lui-même, §2.3 en confirme le choix).

## Requirements Inventory

### Functional Requirements

FR-1: Helvire peut se connecter au back-office via Google Sign-In (Supabase Auth), refus si email différent du propriétaire.
FR-2: Helvire peut voir la liste de toutes les fiches de contenu existantes (type, titre, chemin), reflétant l'état réel du repo.
FR-3: Helvire peut filtrer la liste par type (catégorie / article / produit).
FR-4: Helvire peut modifier le texte d'une fiche existante et voir un aperçu avant publication.
FR-5: Helvire peut publier une modification, aboutissant à un commit + push réel sur le repo.
FR-6: Le back-office détecte un conflit si la fiche a été modifiée par Pépite après le chargement de l'éditeur, et prévient avant de publier.
FR-7: Chaque publication depuis le back-office est journalisée dans `agent_logs` avec un identifiant distinct des actions de Pépite.

### NonFunctional Requirements

NFR1 (sécurité, §4.4 du PRD) : aucune action de publication n'est possible sans passer par l'authentification propriétaire (FR-1).
NFR2 (réactivité, SM-1 du PRD) : une correction de contenu prend moins de 5 minutes de bout en bout (connexion → édition → publication → en ligne).
NFR3 (non-interférence, SM-2/SM-C1 du PRD) : le back-office ne doit jamais devenir un second mécanisme de publication concurrent non coordonné avec le heartbeat autonome de Pépite.

### Additional Requirements (Architecture)

- **Pas de starter template** — projet brownfield existant, conventions déjà en place à respecter (voir `docs/index.md`), pas d'amorçage greenfield.
- AD-1 : toute publication passe par une table Supabase `manual_content_edits` (statut `pending`/`applied`/`conflict`) — jamais d'écriture git directe depuis le client.
- AD-2 : le back-office ne parle qu'à Supabase (Auth + table) en écriture, et aux pages publiques en lecture seule (fetch direct).
- AD-3 : le relais réutilise tel quel `scripts/github_commit_changes.js` + `scripts/github_open_pr_or_push.js` (pas de logique git dupliquée) ; `status = 'applied'` seulement après push réussi.
- AD-4 : détection de conflit par hash sha256 (`base_content_hash` capturé au chargement, recalculé par le relais avant écriture).
- AD-5 : un second job `CronCreate` dédié (cadence 1-2 min), séparé du heartbeat marketing (~3h), exécute uniquement la file d'attente.
- AD-6 : RLS sur `manual_content_edits` restreinte à `authenticated` + email exact du propriétaire (jamais `anon`).
- AD-7 : lecture directe des pages publiées (pas de duplication de contenu dans Supabase pour la lecture).
- Convention `file_path` : toujours relatif à la racine du repo (ex. `site/blog/x.html`), format attendu par `assertInsideRepo()`.
- Convention commit : préfixe `chore(back-office):` pour distinguer des commits Pépite.
- Convention journalisation : `agent_logs.agent = 'back-office-manuel'`.
- Déploiement : `site/admin.html` dans le même déploiement GitHub Pages, `meta robots noindex` comme `dashboard.html`. Aucun nouveau secret (réutilise la clé SSH VPS existante).

### UX Design Requirements

Aucune — pas de document UX distinct pour ce projet (capability spec, mono-utilisateur, voir Architecture §Design Paradigm).

### FR Coverage Map

| FR | Couvert par (Epic.Story) |
| --- | --- |
| FR-1 | 1.1 |
| FR-2 | 1.2 |
| FR-3 | 1.2 |
| FR-4 | 2.1 |
| FR-5 | 2.2, 3.1 |
| FR-6 | 3.1 |
| FR-7 | 3.2 |

## Epic List

1. **Epic 1 — Accès et inventaire du contenu** (FR-1, FR-2, FR-3)
2. **Epic 2 — Édition et aperçu** (FR-4, prépare FR-5)
3. **Epic 3 — Publication fiable et traçable** (FR-5, FR-6, FR-7, AD-1 à AD-7)

## Epic 1: Accès et inventaire du contenu

Donner à Helvire un accès sécurisé au back-office et une vue fidèle de tout le contenu existant du site, condition préalable à toute édition.

### Story 1.1: Authentification propriétaire

As a propriétaire du site (Helvire),
I want me connecter au back-office via mon compte Google,
So that seul moi puisse accéder au contenu et le modifier.

**Acceptance Criteria:**

**Given** je ne suis pas authentifié
**When** j'ouvre `site/admin.html`
**Then** je vois un écran de connexion Google Sign-In (identique au pattern de `dashboard.html`)
**And** aucun contenu n'est visible avant authentification

**Given** je me connecte avec un compte Google différent de l'email propriétaire
**When** l'authentification Supabase se termine
**Then** je vois un écran de refus explicite
**And** aucune donnée de `manual_content_edits` n'est accessible (RLS AD-6)

**Given** je me connecte avec le compte Google propriétaire
**When** l'authentification se termine
**Then** j'accède au contenu du back-office
**And** la session persiste comme sur `dashboard.html` (pas de re-authentification à chaque visite)

### Story 1.2: Liste filtrable des fiches de contenu

As a propriétaire authentifié,
I want voir toutes les fiches de contenu existantes et les filtrer par type,
So that je sache ce qui existe déjà avant de modifier ou de demander une action à Pépite.

**Acceptance Criteria:**

**Given** je suis authentifié sur le back-office
**When** la page se charge
**Then** je vois la liste de toutes les fiches (`site/categories/*.html`, `site/blog/*.html`, `site/produits/*.html`, pages spéciales) avec type, titre, chemin
**And** une fiche créée par Pépite lors du dernier cycle heartbeat apparaît sans action manuelle (FR-2)

**Given** la liste est affichée
**When** je sélectionne un filtre de type (catégorie / article / produit)
**Then** seules les fiches de ce type restent affichées, sans rechargement complet de page (FR-3)

## Epic 2: Édition et aperçu

Permettre à Helvire de modifier le contenu d'une fiche existante en confiance, avec un aperçu fidèle avant toute publication.

### Story 2.1: Édition texte brut avec aperçu

As a propriétaire authentifié,
I want ouvrir une fiche existante, modifier son contenu et voir un aperçu,
So that je corrige un texte sans risquer de publier une erreur de mise en forme.

**Acceptance Criteria:**

**Given** je sélectionne une fiche dans la liste (Story 1.2)
**When** l'éditeur s'ouvre
**Then** le contenu actuel est chargé par lecture directe de la page publiée (AD-2, AD-7) et un `base_content_hash` (sha256) est capturé (prépare AD-4)

**Given** je modifie le texte dans l'éditeur
**When** je consulte l'aperçu
**Then** l'aperçu charge `site/styles.css` et affiche le rendu du contenu modifié, fidèle à la page publiée (FR-4)

**Given** j'ai modifié le contenu
**When** je n'ai pas encore cliqué "Publier"
**Then** aucune modification n'est envoyée à Supabase ni publiée (FR-4)

## Epic 3: Publication fiable et traçable

Faire aboutir une édition à une publication réelle (commit + push), sans jamais écraser silencieusement le travail de Pépite, et avec une traçabilité complète.

### Story 3.1: Publication via file d'attente avec détection de conflit

As a propriétaire authentifié,
I want cliquer "Publier" et être protégé contre un écrasement silencieux,
So that je peux publier en confiance même si Pépite travaille en parallèle.

**Acceptance Criteria:**

**Given** j'ai édité une fiche (Story 2.1) et clique "Publier"
**When** l'action est déclenchée
**Then** une ligne est insérée dans `manual_content_edits` (`file_path` relatif au repo, `new_content`, `base_content_hash`, `status='pending'`) — jamais d'appel direct à git ou à l'API GitHub (AD-1, AD-2)

**Given** une ligne `pending` existe dans `manual_content_edits`
**When** le job `CronCreate` dédié (cadence 1-2 min, AD-5) s'exécute
**Then** il recalcule le hash sha256 du fichier réel dans le repo et le compare à `base_content_hash`

**Given** les hash correspondent (pas de conflit)
**When** le relais applique la modification
**Then** il écrit le fichier, committe et pousse via `scripts/github_commit_changes.js` + `scripts/github_open_pr_or_push.js` (AD-3), préfixe le message `chore(back-office):`, et ne marque `status='applied'` qu'après un push réussi

**Given** les hash ne correspondent pas (Pépite a modifié le fichier entre-temps)
**When** le relais détecte le mismatch
**Then** il marque `status='conflict'`, n'écrit rien, et Helvire voit un avertissement explicite au prochain chargement du back-office (FR-6)

### Story 3.2: Journalisation distincte pour l'audit de Pépite

As a système (Pépite, lors de son audit heartbeat),
I want que les publications manuelles soient journalisées distinctement,
So that le heartbeat autonome sache qu'une fiche a été modifiée manuellement récemment et ne la traite pas comme si elle ne l'avait pas été.

**Acceptance Criteria:**

**Given** une publication back-office aboutit (`status='applied'`, Story 3.1)
**When** le relais termine l'application
**Then** une ligne est insérée dans `agent_logs` avec `agent='back-office-manuel'`, distincte des agents `content-agent`/`marketing-ops-agent` utilisés par Pépite (FR-7)

**Given** le cycle heartbeat de Pépite s'exécute (audit habituel de `agent_logs`)
**When** il lit les entrées récentes
**Then** il peut identifier qu'une fiche a été modifiée par `back-office-manuel` et adapter son comportement en conséquence (ne pas dupliquer/écraser sans réévaluation)
