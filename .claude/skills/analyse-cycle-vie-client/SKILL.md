---
name: analyse-cycle-vie-client
description: Regarde au-delà du premier lead pour identifier des opportunités de rétention, réactivation ou expansion parmi les leads/clients déjà connus. À utiliser une fois que des leads existent dans Supabase, en complément de l'acquisition pure.
---

# Analyse du cycle de vie client

## Déclenchement

À utiliser dès que la table `leads` contient des entrées exploitables, en complément de `strategie-acquisition-canaux` — croître ne se limite pas à acquérir de nouveaux leads.

## Comportement attendu

1. Vérifier l'état des leads existants (`leads`) : statut, ancienneté, source, dernière interaction.
2. Identifier les leads qualifiés non convertis depuis longtemps — candidats à une relance (`nurturing-relances-leads`).
3. Identifier des opportunités d'expansion ou de réactivation si le modèle business le permet.
4. Ne jamais recommander une action de rétention/expansion non applicable au modèle business réel (vérifier le positionnement avant de proposer).
5. Prioriser ces opportunités aux côtés des initiatives d'acquisition, selon impact/effort/confiance.
6. Enregistrer les constats dans Supabase (`growth_experiments`).

## Outils associés

- `supabase_query` / `supabase_upsert`
- `fetch_crm_leads` (`scripts/fetch_crm_leads.js` — pas encore construit dans cette version MVP)

Cette compétence s'appuie sur les données réelles de `leads` — ne pas halluciner un volume de clients existants non vérifié.
