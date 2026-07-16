---
name: analyse-comportementale-cohortes
description: Segmente les visiteurs/leads par cohorte (source, période, comportement) pour détecter des différences de qualité entre canaux ou campagnes que les moyennes globales masquent. À utiliser quand une analyse de performance globale ne suffit pas à expliquer un résultat.
---

# Analyse comportementale par cohorte

## Déclenchement

À utiliser quand `analyse-performance` montre un résultat agrégé qui ne suffit pas à décider quoi faire (ex. trafic en hausse mais conversion globale stable — est-ce vrai pour tous les canaux ?).

## Comportement attendu

1. Segmenter les visiteurs/leads par une dimension pertinente (source, campagne, période, device).
2. Comparer le comportement entre segments plutôt que de se fier à la moyenne globale.
3. Identifier si un segment tire la performance globale vers le haut ou le bas.
4. Ne pas sur-interpréter un petit échantillon comme une tendance fiable.
5. Transmettre les segments significatifs à `strategie-acquisition-canaux` ou `optimisation-conversion` selon le cas.
6. Enregistrer l'analyse dans Supabase (`marketing_metrics`).

## Outils associés

- `fetch_ga4_report` (`scripts/fetch_ga4_report.js`)
- `supabase_query` / `supabase_upsert`

Cette compétence approfondit un signal déjà détecté ; elle ne remplace pas la revue de performance générale.
