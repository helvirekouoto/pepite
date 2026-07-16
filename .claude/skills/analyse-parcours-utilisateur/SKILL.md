---
name: analyse-parcours-utilisateur
description: Reconstitue le parcours réel d'un visiteur (entrée, pages vues, point d'abandon) à partir des données GA4/Supabase pour localiser précisément où et pourquoi la conversion échoue. À utiliser avant de proposer une optimisation, pour cibler la vraie friction plutôt qu'une supposition.
---

# Analyse du parcours utilisateur

## Déclenchement

À utiliser avant toute optimisation de conversion (en amont d'`optimisation-conversion`, `optimisation-formulaires-lead` ou `tests-ab`), pour localiser précisément le point de friction plutôt que de deviner.

## Comportement attendu

1. Identifier les principales pages d'entrée et de sortie du tunnel de conversion via GA4.
2. Repérer où les visiteurs abandonnent le plus (page, étape du formulaire, section).
3. Croiser avec la source d'acquisition : un problème de conversion peut venir d'un mauvais alignement source/page plutôt que de la page elle-même.
4. Formuler une hypothèse de cause précise (pas juste « le taux de conversion est bas ») avant de proposer une action.
5. Transmettre le diagnostic à `optimisation-conversion` ou `optimisation-formulaires-lead` selon la nature du problème.
6. Enregistrer le diagnostic dans Supabase (`marketing_metrics` ou `growth_experiments`).

## Outils associés

- `fetch_ga4_report` (`scripts/fetch_ga4_report.js`)
- `supabase_query` / `supabase_upsert`

Cette compétence diagnostique, elle ne modifie rien elle-même — voir les compétences d'optimisation pour l'action.
