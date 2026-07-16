# create-website-from-idea

Crée un site web complet à partir d'une idée de business, puis lance la boucle de croissance autonome (SEO, contenu, growth, CRM, analytics) sans attendre de nouvelle demande.

## Entrée attendue

Une idée de business en langage libre, avec le plus de détails possible : problème résolu, cible, offre, ton de marque, informations factuelles disponibles (nom, coordonnées, preuves sociales). Ne jamais inventer les informations manquantes — les demander ou les laisser en placeholder.

## Étapes

1. Charger la compétence `creation-site-web`.
2. Vérifier qu'aucun site n'existe déjà (`site/` absent du repo). S'il existe déjà, s'arrêter et proposer plutôt `optimisation-conversion` sur l'existant.
3. Clarifier le positionnement (problème, ICP, promesse, ton) à partir de l'idée fournie.
4. Copier et adapter `site-template/` vers `site/` (design, structure, contenu — voir principes de design dans la compétence).
5. Rédiger le contenu réel (compétence `redaction-contenu-marketing`), en remplaçant tous les placeholders par du contenu vérifié ou en les signalant explicitement à l'utilisateur s'ils manquent.
6. Publier via `github_create_branch` → `github_commit_changes` → `github_open_pr_or_push` (compétence `publication-automatique`).
7. Journaliser dans Supabase (`landing_pages`, `content_assets`, `agent_logs`).
8. Enchaîner immédiatement sur la boucle de croissance standard (`CLAUDE.md` → « Boucle de croissance ») : activer Analytics Performance, SEO, Tendances, Contenu, CRO et Growth pour que le reste du travail (SEO, génération de leads, optimisation) continue en autonomie, selon `settings/approval-policy.json`.

## Sortie attendue

- Confirmation que le site est publié (lien du commit/PR).
- Résumé des placeholders restants à compléter par l'utilisateur (le cas échéant).
- Premières actions de croissance déjà engagées ou planifiées par les sous-agents.
