---
name: strategie-acquisition-canaux
description: Évalue quels canaux d'acquisition (organique, social, email, partenariats) méritent l'effort à un stade donné, à partir des données de performance disponibles. À utiliser lors de la revue de croissance hebdomadaire, ou quand un canal existant plafonne.
---

# Stratégie d'acquisition par canal

## Déclenchement

À utiliser lors de la revue de croissance hebdomadaire, ou quand `analyse-performance` montre qu'un canal d'acquisition stagne ou sous-performe.

## Comportement attendu

1. Lister les canaux actifs et leur contribution réelle au trafic/leads (`marketing_metrics`), pas une estimation générique.
2. Identifier le ou les canaux avec le meilleur ratio effort/résultat au stade actuel du projet (voir `settings/goals.json`).
3. Ne pas recommander d'ouvrir un nouveau canal tant qu'un canal existant a du potentiel non exploité.
4. Proposer une réallocation d'effort priorisée (impact/effort/confiance), pas une liste de canaux à essayer sans ordre.
5. Transmettre la priorisation à `anticipation-croissance` pour intégration au backlog.
6. Enregistrer l'analyse dans Supabase (`growth_experiments`).

## Outils associés

- `fetch_ga4_report` (`scripts/fetch_ga4_report.js`)
- `supabase_query` / `supabase_upsert`

Ne jamais recommander un canal payant ou une intégration non configurée comme si elle était déjà disponible — vérifier `settings/integrations.json`.
