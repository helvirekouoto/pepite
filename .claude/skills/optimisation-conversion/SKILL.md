---
name: optimisation-conversion
description: Améliore les landing pages, CTA, formulaires et parcours lead pour augmenter le taux de conversion. À utiliser quand une page a du trafic mais peu de conversions/leads, ou lors d'une revue de performance qui identifie une page faible.
---

# Optimisation conversion

## Déclenchement

À utiliser quand Pépite doit améliorer une landing page, un CTA, un formulaire ou un parcours lead.

## Comportement attendu

1. Identifier les pages avec faible conversion à partir des données GA4/Supabase.
2. Analyser comportement utilisateur et sources de trafic pour comprendre la friction.
3. Proposer ou appliquer des améliorations sur :
   - le titre ;
   - la promesse ;
   - le CTA ;
   - la preuve sociale ;
   - la structure ;
   - le formulaire ;
   - la friction ;
   - la clarté de l'offre.
4. Modifier les fichiers via GitHub si nécessaire (déléguer l'écriture au repo via `github_commit_changes`).
5. Stocker l'hypothèse et le résultat attendu/observé dans Supabase (table `landing_pages` ou `growth_experiments`).

## Outils associés

- `fetch_ga4_report` (`scripts/fetch_ga4_report.js`)
- `supabase_query` (`scripts/supabase_query.js`)
- `github_commit_changes` (`scripts/github_commit_changes.js`)
- `supabase_upsert` (`scripts/supabase_upsert.js`)
