---
name: qualification-scoring-leads
description: Évalue la qualité de chaque lead (score, degré de correspondance avec l'ICP, signal d'intention) pour prioriser le suivi commercial. À utiliser après `gestion-crm-leads`, dès qu'un lead a des données suffisantes pour être évalué.
---

# Qualification et scoring des leads

## Déclenchement

À utiliser après l'enregistrement d'un lead (`gestion-crm-leads`), avant toute action de relance ou de suivi.

## Comportement attendu

1. Évaluer chaque lead selon des critères explicites (correspondance ICP, source, signal d'intention exprimé) — pas une impression subjective.
2. Attribuer un statut de qualification clair (qualifié / à confirmer / hors cible) et justifier pourquoi.
3. Ne jamais qualifier un lead comme « qualifié » sans donnée réelle à l'appui.
4. Prioriser le suivi des leads qualifiés dans les communications proposées à `nurturing-relances-leads`.
5. Réévaluer le score si de nouvelles informations arrivent sur un lead existant.
6. Mettre à jour le champ de statut dans Supabase (`leads`) et journaliser dans `agent_logs`.

## Outils associés

- `supabase_query` / `supabase_upsert` sur la table `leads`

Cette compétence évalue la qualité du lead ; la création/mise à jour des données brutes relève de `gestion-crm-leads`.
