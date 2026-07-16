---
name: suivi-roi-attribution-leads
description: Relie chaque lead généré à la campagne, au contenu ou à la page d'origine, pour mesurer le retour réel de chaque action marketing. À utiliser lors de la revue de performance, pour savoir quelles actions produisent effectivement des leads.
---

# Suivi et attribution ROI des leads

## Déclenchement

À utiliser lors de la revue de performance (`analyse-performance`), pour relier les leads de la table `leads` aux contenus/campagnes de `content_assets` et `landing_pages`.

## Comportement attendu

1. Relier chaque lead à sa source précise : page, contenu ou campagne d'origine — pas juste un canal générique.
2. Calculer, à partir des données réellement disponibles, quelles actions ont produit des leads qualifiés (pas seulement du trafic).
3. Ne jamais extrapoler un ROI chiffré sans donnée de coût réelle — si le coût d'une action n'est pas connu, comparer en volume de leads plutôt qu'en ROI monétaire inventé.
4. Identifier les contenus/pages qui génèrent des leads de façon disproportionnée par rapport à leur trafic — signal fort à réutiliser.
5. Transmettre les constats à `anticipation-croissance` et `strategie-acquisition-canaux`.
6. Enregistrer l'attribution dans Supabase (`growth_experiments` ou `marketing_metrics`).

## Outils associés

- `supabase_query` / `supabase_upsert`
- `fetch_ga4_report` (`scripts/fetch_ga4_report.js`)

Cette compétence mesure l'attribution après coup ; elle ne qualifie pas le lead lui-même (`qualification-scoring-leads`).
