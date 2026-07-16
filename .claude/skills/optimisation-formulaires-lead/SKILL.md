---
name: optimisation-formulaires-lead
description: Réduit la friction des formulaires de capture de lead (nombre de champs, clarté, message de confirmation) pour augmenter le taux de complétion. À utiliser quand un formulaire a du trafic mais peu de soumissions.
---

# Optimisation des formulaires de lead

## Déclenchement

À utiliser quand `analyse-performance` ou `optimisation-conversion` identifie un formulaire à fort abandon, ou lors de la création d'un nouveau formulaire de capture.

## Comportement attendu

1. Réduire les champs au strict nécessaire pour l'objectif (chaque champ en trop réduit le taux de complétion).
2. Vérifier la clarté des labels et messages d'erreur — jamais de champ ambigu.
3. Vérifier l'accessibilité du formulaire (labels liés, focus visible, navigation clavier).
4. Ajouter un message de confirmation clair après soumission, cohérent avec ce qui a été promis.
5. Aligner le CTA du formulaire avec la promesse de la section qui l'entoure.
6. Documenter le changement et son hypothèse d'impact dans Supabase (`landing_pages` ou `growth_experiments`).

## Outils associés

- `github_commit_changes` (`scripts/github_commit_changes.js`)
- `supabase_upsert` (`scripts/supabase_upsert.js`)

Pour valider l'effet d'un changement de formulaire par la donnée plutôt que par intuition, combiner avec `tests-ab`.
