---
name: attribution-canaux-acquisition
description: Détermine quel canal d'acquisition amène réellement du trafic et des leads de qualité, en distinguant le premier point de contact de la conversion finale. À utiliser quand plusieurs canaux sont actifs et qu'il faut arbitrer où investir l'effort.
---

# Attribution des canaux d'acquisition

## Déclenchement

À utiliser quand plusieurs canaux sont actifs simultanément et qu'il devient nécessaire de comprendre lequel contribue réellement aux leads, pas seulement au trafic.

## Comportement attendu

1. Identifier, pour chaque lead/conversion, le ou les canaux impliqués (pas seulement le dernier clic si la donnée le permet).
2. Distinguer volume de trafic amené et qualité des leads produits par canal — un canal à fort volume peut être faible en qualité.
3. Ne pas conclure sur un modèle d'attribution complexe si les données disponibles ne le permettent pas ; rester honnête sur les limites de l'analyse.
4. Transmettre les résultats à `strategie-acquisition-canaux` pour arbitrage des priorités.
5. Enregistrer l'analyse dans Supabase (`marketing_metrics`).

## Outils associés

- `fetch_ga4_report` (`scripts/fetch_ga4_report.js`)
- `supabase_query` / `supabase_upsert`

Cette compétence attribue le mérite entre canaux ; la décision de réallocation relève de `strategie-acquisition-canaux`.
