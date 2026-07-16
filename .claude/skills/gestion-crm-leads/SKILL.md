---
name: gestion-crm-leads
description: Crée, met à jour et enrichit les entrées de leads dans Supabase/CRM à partir des interactions détectées (formulaire rempli, contact entrant). À utiliser dès qu'un nouveau lead est détecté ou qu'une information sur un lead existant doit être mise à jour.
---

# Gestion CRM des leads

## Déclenchement

À utiliser dès qu'un nouveau lead est détecté (formulaire, contact), ou lors de la revue quotidienne/hebdomadaire pour vérifier la fraîcheur des données CRM.

## Comportement attendu

1. Créer une entrée lead dès sa détection, avec la source précise (page, campagne, canal) — ne jamais laisser un lead non enregistré.
2. Mettre à jour les entrées existantes plutôt que de créer des doublons (vérifier par email avant insertion).
3. Enrichir chaque lead avec les informations réellement fournies, sans en inventer (pas de score ou d'attribut supposé sans donnée source).
4. Vérifier la cohérence des statuts (nouveau, qualifié, en cours, converti, perdu) après chaque mise à jour.
5. Signaler tout lead entrant qui ne peut pas être capturé faute d'intégration CRM configurée (`settings/integrations.json`).
6. Journaliser chaque création/mise à jour significative dans `agent_logs`.

## Outils associés

- `supabase_query` / `supabase_upsert` (`scripts/supabase_query.js`, `scripts/supabase_upsert.js`) sur la table `leads`
- `fetch_crm_leads` (`scripts/fetch_crm_leads.js` — pas encore construit dans cette version MVP)

Cette compétence gère les données du lead ; la notation de qualité relève de `qualification-scoring-leads`.
