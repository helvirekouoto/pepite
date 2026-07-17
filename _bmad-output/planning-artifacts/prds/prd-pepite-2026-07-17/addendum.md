# Addendum — Back-office CMS pour Cadeau Malin

Contenu technique/exploratoire qui n'a pas sa place dans le corps du PRD (capacités, pas implémentation), mais qui doit nourrir `bmad-architecture`.

## Options considérées pour l'approche générale

| Option | Effort | Nouvelle dépendance | Build step | Verdict |
|---|---|---|---|---|
| **Interface custom légère** (retenue) | Faible | Aucune | Aucun | Réutilise Supabase Auth (déjà en place pour `dashboard.html`) et `scripts/github_commit_changes.js` (déjà en place pour Pépite) |
| CMS git-based tout fait (Static CMS, Sveltia CMS) | Élevé | Oui (outil tiers) | Probable | Rejeté : ces outils attendent du contenu markdown+frontmatter, pas du HTML brut — refactor des 30 pages existantes nécessaire avant même de commencer |
| Back-office sur stockage Supabase central | Élevé | Mécanisme de sync à construire | Oui | Rejeté pour v1 : le plus structurant, changerait la façon dont Pépite elle-même produit le contenu aujourd'hui — risque de complexifier ce qui fonctionne déjà |

Recherche de marché (2026) : Decap CMS (ex-Netlify CMS) n'est plus activement maintenu ; Static CMS et Sveltia CMS sont les alternatives actives recommandées pour ce pattern (admin SPA à `/admin`, commit direct vers GitHub). Confirmé non retenu ici pour la raison de structure de contenu ci-dessus, mais à garder en tête si le site migre un jour vers du contenu templaté.

Sources : [Static CMS](https://staticcms.org/), [Sveltia CMS](https://github.com/decaporg/decap-cms) (mentionné comme remplaçant actif dans la recherche), [statichunt.com — Git-Based Headless CMS](https://statichunt.com/blog/git-based-headless-cms).

## Piste technique pour le mécanisme de publication (Open Question 1 du PRD)

**Option a (file d'attente Supabase, relayée par l'agent) — piste privilégiée à date :**
- Table Supabase dédiée (ex. `manual_content_edits`) : `file_path`, `new_content`, `requested_at`, `status` (`pending`/`applied`/`conflict`), `base_file_hash` (pour la détection de conflit FR-6).
- Le back-office écrit une ligne dans cette table au clic "Publier".
- Un mécanisme côté agent (le heartbeat existant peut vérifier cette table à chaque cycle, ou un script dédié invocable manuellement par l'utilisateur via Telegram) applique la modification : compare `base_file_hash` au hash actuel du fichier, écrit le fichier si pas de conflit, commit+push via `scripts/github_commit_changes.js` + `scripts/github_open_pr_or_push.js` (réutilisation directe, zéro nouveau code de publication), marque la ligne `applied`.
- Avantage : zéro nouvelle surface d'authentification/déploiement, réutilise 100% de l'existant. Inconvénient : publication non instantanée (dépend du prochain cycle heartbeat, ou nécessite de demander explicitement à Pépite via Telegram de traiter la file d'attente immédiatement).

**Option b (service de push immédiat) — rejetée pour v1 :**
- Nécessiterait soit une Edge Function Supabase avec une clé de déploiement Git en secret (surface d'attaque supplémentaire, complexité de signature/auth Git depuis Deno), soit un petit serveur HTTP sur le VPS exposé publiquement (le VPS n'expose aujourd'hui aucun port applicatif — changement d'infrastructure non trivial).
- Retenue comme option v2 si la latence de l'option (a) s'avère gênante à l'usage réel.

## Rationale rejet "édition par champs structurés" (v1)

Chaque type de page (catégorie, article, fiche produit) suit une convention HTML stricte mais non formalisée en schéma (voir `docs/component-inventory.md`). Parser fiablement chaque page en champs structurés (titre, meta description, cartes produit individuelles) demanderait soit un parseur HTML dédié par type de page, soit une migration vers un format structuré (frontmatter) — les deux sont un investissement d'architecture réel, non justifié tant que l'usage réel du back-office (fréquence, nature des corrections) n'est pas observé. D'où la décision v1 : texte brut + aperçu, champs structurés en v2 si le besoin se confirme.
