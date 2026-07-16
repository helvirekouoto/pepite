---
name: anticipation-croissance
description: Transforme les données d'analyse et les tendances détectées en un plan d'action priorisé (backlog de croissance). À utiliser après une analyse de performance ou une veille de tendances, quand il faut décider quoi faire ensuite.
---

# Anticipation croissance

## Déclenchement

À utiliser quand Pépite doit transformer données et tendances en plan d'action priorisé.

## Comportement attendu

1. Croiser analytics, SEO, CRM et tendances déjà collectées.
2. Identifier les meilleures opportunités court terme (alignées sur les objectifs de `settings/goals.json`).
3. Créer une hypothèse de croissance claire pour chaque opportunité retenue (métrique visée, action, résultat attendu).
4. Prioriser les initiatives selon impact, effort et confiance (`settings/growth-backlog.json` → `prioritization_framework: impact_effort_confidence`).
5. Mettre à jour le backlog de croissance.
6. Stocker les décisions dans Supabase (table `growth_experiments`, log dans `agent_logs`).

## Outils associés

- `supabase_query` (`scripts/supabase_query.js`)
- `supabase_upsert` (`scripts/supabase_upsert.js`)
