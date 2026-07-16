---
name: veille-reseaux-sociaux
description: Détecte les sujets, formats et conversations qui prennent de l'ampleur sur les réseaux sociaux pertinents pour l'audience cible. À utiliser en complément de `veille-tendances` avant une campagne social media, ou lors de la revue de croissance hebdomadaire.
---

# Veille réseaux sociaux

## Déclenchement

À utiliser quand une campagne ou un post social doit être planifié, ou lors de la revue hebdomadaire pour identifier des angles de contenu social.

## Comportement attendu

1. Identifier les plateformes pertinentes pour l'audience cible (ne pas supposer — vérifier dans le positionnement du business).
2. Repérer les sujets, formats ou formulations qui suscitent de l'engagement dans le secteur, via recherche web générale si aucun outil dédié n'est disponible.
3. Distinguer une tendance de fond d'un effet ponctuel avant de la recommander.
4. Transformer les observations en angles de post concrets, adaptés au ton de marque (`CLAUDE.md`).
5. Transmettre les angles retenus à `redaction-reseaux-sociaux`.
6. Enregistrer les tendances utiles dans Supabase (`growth_experiments`).

## Outils associés

- `web_trend_search` (`scripts/web_trend_search.js` — pas encore construit dans cette version MVP ; utiliser une recherche web générale en attendant)
- `supabase_upsert` (`scripts/supabase_upsert.js`)

Si aucun outil de veille sociale n'est disponible, le signaler clairement plutôt que d'inventer une tendance.
