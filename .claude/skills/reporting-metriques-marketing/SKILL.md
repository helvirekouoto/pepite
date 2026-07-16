---
name: reporting-metriques-marketing
description: Produit un résumé clair et régulier des métriques marketing clés face aux objectifs, pour que l'état du projet soit lisible en quelques lignes. À utiliser lors des revues quotidiennes/hebdomadaires, en complément de l'analyse brute.
---

# Reporting des métriques marketing

## Déclenchement

À utiliser lors de `daily-cmo-review` ou d'une revue hebdomadaire, une fois les données collectées par `analyse-performance`.

## Comportement attendu

1. Résumer trafic, leads et conversions cumulés face aux objectifs (`settings/goals.json`) — chiffres réels uniquement, jamais estimés si la donnée manque.
2. Mettre en évidence les variations significatives (hausse/baisse notable), pas chaque micro-fluctuation.
3. Garder le rapport court et lisible (quelques lignes), pas un export brut de données.
4. Distinguer clairement ce qui a été mesuré de ce qui reste à instrumenter (si un outil comme `fetch_gsc_report` manque encore).
5. Enregistrer le résumé dans Supabase (`agent_logs`) et les chiffres bruts dans `marketing_metrics`.

## Outils associés

- `supabase_query` / `supabase_upsert`
- `fetch_ga4_report` (`scripts/fetch_ga4_report.js`)

Cette compétence synthétise ; l'analyse de fond (tendances, causes) relève d'`analyse-performance`.
