---
name: gestion-branches-versions-github
description: Gère l'hygiène du repo Git (branches, nommage, nettoyage post-merge, cohérence de l'historique) pour que le dépôt reste lisible malgré les publications fréquentes. À utiliser en complément de `publication-automatique`, notamment après un merge ou en cas d'accumulation de branches.
---

# Gestion des branches et versions GitHub

## Déclenchement

À utiliser après un `github_open_pr_or_push` en mode `direct_push` (nettoyer la branche mergée), ou périodiquement pour vérifier qu'aucune branche obsolète ne s'accumule.

## Comportement attendu

1. Nommer les branches de façon cohérente et descriptive (ex. `feat/...`, `content/...`, `fix/...`) plutôt que des noms génériques.
2. Supprimer localement et sur `origin` les branches déjà mergées dans `main` (`git branch -d`, `git push origin --delete`).
3. Vérifier avant toute suppression que la branche est bien mergée (jamais de suppression forcée sans vérification).
4. Garder des messages de commit explicites décrivant le pourquoi, pas juste le quoi.
5. Vérifier périodiquement que `main` reste dans un état déployable (pas de commit cassé laissé en place).

## Outils associés

- `git` local (via la clé SSH déjà configurée sur le VPS, remote `origin`)
- `github_open_pr_or_push` (`scripts/github_open_pr_or_push.js`)

Cette compétence maintient l'hygiène du dépôt ; la publication elle-même relève de `publication-automatique`.
