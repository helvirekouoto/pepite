---
name: tests-ab
description: Conçoit et suit des tests A/B sur une page ou un élément de conversion (titre, CTA, mise en page) à partir d'une hypothèse claire et mesurable. À utiliser quand une amélioration de conversion proposée mérite d'être validée par la donnée plutôt qu'appliquée à l'aveugle.
---

# Tests A/B

## Déclenchement

À utiliser quand `optimisation-conversion` identifie une amélioration dont l'effet est incertain et mesurable, et qu'il est possible de comparer deux versions.

## Comportement attendu

1. Formuler une hypothèse claire : quel changement, quel effet attendu, sur quelle métrique.
2. Définir la durée ou le volume de trafic nécessaire avant de tirer une conclusion — ne pas conclure trop tôt.
3. Documenter la version de contrôle et la version testée avant de publier.
4. Suivre les résultats via GA4/Supabase et comparer objectivement, sans biais de confirmation.
5. Trancher clairement à la fin du test (garder, abandonner, ou itérer) et documenter pourquoi.
6. Enregistrer l'hypothèse, la méthode et le résultat dans Supabase (`growth_experiments`).

## Outils associés

- `fetch_ga4_report` (`scripts/fetch_ga4_report.js`)
- `github_commit_changes` / `github_open_pr_or_push` pour déployer les variantes
- `supabase_upsert` (`scripts/supabase_upsert.js`)

Ne jamais annoncer un résultat de test avant d'avoir un volume de données suffisant pour conclure.
