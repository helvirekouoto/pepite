---
name: analyse-performance
description: Analyse le trafic, le SEO, l'acquisition, les leads et les conversions à partir de GA4, Search Console, du CRM et de Supabase. À utiliser dès qu'une revue de performance marketing est nécessaire (revue quotidienne/hebdomadaire, avant de prioriser une action de croissance, ou sur demande explicite de bilan).
---

# Analyse de performance

## Déclenchement

À utiliser quand Pépite doit analyser trafic, SEO, acquisition, leads ou conversions.

## Comportement attendu

1. Collecter les données depuis GA4, Search Console, CRM et Supabase (avec les outils disponibles — ne pas inventer de données si un outil/script n'existe pas encore).
2. Identifier les tendances de performance (hausse/baisse, sources qui fonctionnent ou non).
3. Détecter pages fortes, pages faibles et opportunités.
4. Comparer les résultats aux objectifs : 100+ visiteurs en 2 mois, 5 leads qualifiés (voir `settings/goals.json`).
5. Résumer les constats en actions prioritaires, classées par impact probable.
6. Enregistrer les analyses utiles dans Supabase (table `marketing_metrics`, et un résumé dans `agent_logs`).

## Outils associés

- `fetch_ga4_report` (`scripts/fetch_ga4_report.js`)
- `fetch_gsc_report` (`scripts/fetch_gsc_report.js` — pas encore construit dans cette version MVP)
- `fetch_crm_leads` (`scripts/fetch_crm_leads.js` — pas encore construit dans cette version MVP)
- `supabase_query` (`scripts/supabase_query.js`)
- `supabase_upsert` (`scripts/supabase_upsert.js`)

Si un outil listé n'existe pas encore dans `scripts/`, le signaler clairement plutôt que de simuler un résultat.
