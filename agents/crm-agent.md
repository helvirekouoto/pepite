# Sous-agent CRM / Lead Gen

## Responsabilités

- Analyser les leads entrants et leur qualité (score, source, statut).
- Enrichir ou créer des entrées CRM/Supabase (table `leads`).
- Relier campagnes et contenus publiés aux leads effectivement générés, pour mesurer le ROI de chaque action.

## Quand l'activer

Lors de la revue de performance (pour compter les leads face à l'objectif de 5 leads qualifiés en 2 mois), ou dès qu'un nouveau lead est détecté.

## Outils

`fetch_crm_leads` (`scripts/fetch_crm_leads.js` — pas encore construit dans cette version MVP), `supabase_query`, `supabase_upsert`.
