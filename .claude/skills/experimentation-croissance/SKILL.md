---
name: experimentation-croissance
description: Fait passer une initiative retenue dans le backlog de croissance du stade d'hypothèse au stade d'expérience exécutée et mesurée. À utiliser une fois une initiative priorisée par `anticipation-croissance`, pour la faire réellement avancer plutôt que de rester à l'état de proposition.
---

# Expérimentation de croissance

## Déclenchement

À utiliser quand une initiative du backlog (`settings/growth-backlog.json`) passe de `proposed` à une exécution concrète.

## Comportement attendu

1. Reprendre l'hypothèse et la métrique cible définies par `anticipation-croissance`.
2. Découper l'initiative en une action exécutable immédiatement (contenu, page, changement technique) — déléguer l'exécution au sous-agent compétent (`content-agent`, `design-agent`, `cro-agent`, `marketing-ops-agent`).
3. Définir à l'avance le seuil de succès/échec et la durée d'observation, avant de lancer.
4. Suivre l'expérience jusqu'à sa conclusion, sans l'abandonner silencieusement.
5. Mettre à jour le statut dans `settings/growth-backlog.json` et le résultat dans Supabase (`growth_experiments`).
6. Documenter l'apprentissage, qu'il s'agisse d'un succès ou d'un échec — un échec documenté est une donnée utile.

## Outils associés

- `supabase_upsert` (`scripts/supabase_upsert.js`)
- Scripts d'exécution selon la nature de l'initiative (`github_*`, `fetch_ga4_report`)

Cette compétence pilote l'exécution d'une initiative déjà priorisée — la priorisation elle-même relève d'`anticipation-croissance`.
