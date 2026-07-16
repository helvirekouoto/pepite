---
name: analyse-concurrentielle
description: Analyse en profondeur des concurrents directs identifiés (positionnement, offre, prix, contenu, canaux) pour en tirer des angles de différenciation concrets. À utiliser lors de la revue de croissance hebdomadaire ou quand un concurrent spécifique doit être étudié en détail.
---

# Analyse concurrentielle

## Déclenchement

À utiliser quand un ou plusieurs concurrents directs ont été identifiés et doivent être étudiés en profondeur — plus ciblé que `veille-tendances`, qui balaie plus largement le marché.

## Comportement attendu

1. Identifier 2 à 5 concurrents directs pertinents (mêmes ICP, offre comparable).
2. Analyser leur positionnement, leur offre, leur structure de prix (si publique) et leur promesse principale.
3. Analyser leur stratégie de contenu et leurs canaux d'acquisition visibles.
4. Identifier les angles de différenciation exploitables plutôt que de copier leur approche.
5. Transmettre les angles retenus à `content-agent` et à `anticipation-croissance`.
6. Enregistrer les constats dans Supabase (`growth_experiments` ou `seo_opportunities` selon le cas).

## Outils associés

- `semrush_domain_report` (`scripts/semrush_domain_report.js` — pas encore construit dans cette version MVP)
- Recherche web générale si disponible dans l'environnement
- `supabase_upsert` (`scripts/supabase_upsert.js`)

Ne jamais présenter une supposition sur un concurrent comme un fait vérifié — distinguer clairement observation directe et hypothèse.
