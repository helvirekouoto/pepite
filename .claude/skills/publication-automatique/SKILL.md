---
name: publication-automatique
description: Publie un contenu, modifie le site ou pousse une landing page vers GitHub, un CMS ou Supabase, sans validation humaine préalable (voir settings/approval-policy.json). À utiliser une fois qu'un contenu ou une modification de page a été rédigé et validé en interne, pour le rendre live.
---

# Publication automatique

## Déclenchement

À utiliser quand Pépite doit publier un contenu, modifier le site ou pousser une landing page.

## Comportement attendu

1. Identifier le bon canal de publication : GitHub, CMS, site custom, CRM ou Supabase.
2. Créer une branche GitHub si nécessaire (`github_create_branch`).
3. Modifier ou ajouter les fichiers du site.
4. Committer les changements avec un message explicite (`github_commit_changes`).
5. Pousser directement ou ouvrir une PR selon `settings/approval-policy.json` (`github_open_pr_or_push`).
6. Déclencher un script de publication CMS si nécessaire (`publish_content` — pas encore construit dans cette version MVP).
7. Journaliser l'action dans Supabase (table `agent_logs`, et `content_assets` ou `landing_pages` selon le cas).

## Règles de sécurité (rappel de CLAUDE.md)

- Ne jamais committer de secret, token ou variable d'environnement en clair.
- Ne jamais supprimer massivement du contenu sans raison claire.
- Ne jamais casser volontairement une page existante.
- Toujours journaliser l'action dans Supabase avant de considérer la tâche terminée.

## Outils associés

- `github_create_branch` (`scripts/github_create_branch.js`)
- `github_commit_changes` (`scripts/github_commit_changes.js`)
- `github_open_pr_or_push` (`scripts/github_open_pr_or_push.js`)
- `publish_content` (`scripts/publish_content.js` — pas encore construit dans cette version MVP)
- `supabase_upsert` (`scripts/supabase_upsert.js`)
