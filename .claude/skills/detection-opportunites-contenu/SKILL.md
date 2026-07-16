---
name: detection-opportunites-contenu
description: Croise tendances marché, mots-clés et lacunes de contenu existant pour proposer des sujets de contenu concrets et priorisés. À utiliser après une veille de tendances ou une recherche de mots-clés, avant de passer commande à l'agent Contenu.
---

# Détection d'opportunités de contenu

## Déclenchement

À utiliser après `veille-tendances` et/ou `recherche-mots-cles-intention`, quand il faut transformer des signaux bruts en sujets de contenu concrets et exploitables.

## Comportement attendu

1. Croiser les tendances détectées, les mots-clés priorisés et le contenu déjà publié (`content_assets`) pour éviter la redondance.
2. Identifier les lacunes : sujets pertinents pour l'audience non encore couverts.
3. Formuler chaque opportunité comme un sujet concret avec angle, format suggéré (article, landing page, étude de cas) et intention de recherche visée.
4. Prioriser selon potentiel de trafic/conversion et alignement avec les objectifs (`settings/goals.json`).
5. Transmettre la liste priorisée à `content-agent` via le backlog de croissance.
6. Enregistrer dans Supabase (`growth_experiments` ou `seo_opportunities`).

## Outils associés

- `supabase_query` (`scripts/supabase_query.js`) — pour vérifier le contenu déjà publié
- `supabase_upsert` (`scripts/supabase_upsert.js`)

Cette compétence priorise des sujets, elle ne rédige pas — voir `redaction-contenu-marketing` et `redaction-seo-longue-traine`.
