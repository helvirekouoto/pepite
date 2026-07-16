---
name: redaction-seo-longue-traine
description: Rédige des articles et pages structurés pour répondre précisément à une intention de recherche identifiée (mots-clés longue traîne), avec un objectif de ranking organique. À utiliser après `recherche-mots-cles-intention`, pour du contenu spécifiquement orienté SEO plutôt que conversion pure.
---

# Rédaction SEO longue traîne

## Déclenchement

À utiliser quand un mot-clé ou une intention de recherche précise a été identifié (`recherche-mots-cles-intention`) et qu'un article ou une page doit être rédigé pour y répondre.

## Comportement attendu

1. Répondre directement et clairement à l'intention de recherche visée dès l'introduction — pas de remplissage avant la réponse.
2. Structurer le contenu avec une hiérarchie de titres cohérente avec le mot-clé principal et ses variantes.
3. Intégrer naturellement le vocabulaire et les questions associées à l'intention de recherche, sans sur-optimisation artificielle.
4. Inclure un CTA pertinent vers l'offre, sans casser la valeur informative du contenu.
5. Vérifier qu'aucune page existante ne cible déjà la même intention (éviter la cannibalisation).
6. Sauvegarder dans Supabase (`content_assets`) avec le mot-clé cible associé.

## Outils associés

- `supabase_upsert` (`scripts/supabase_upsert.js`)
- `supabase_query` (`scripts/supabase_query.js`) — vérifier les pages existantes avant publication

La publication effective relève de `publication-automatique`, pas de cette compétence.
