---
name: recherche-mots-cles-intention
description: Identifie les mots-clés pertinents et leur intention de recherche (informationnelle, transactionnelle, navigationnelle) pour prioriser les sujets de contenu et les pages à créer/optimiser. À utiliser avant toute création de contenu SEO ou de nouvelle page.
---

# Recherche de mots-clés et d'intention

## Déclenchement

À utiliser avant de rédiger un contenu SEO (en amont de `redaction-seo-longue-traine`), ou lors de la revue de croissance hebdomadaire pour identifier de nouvelles opportunités.

## Comportement attendu

1. Identifier les mots-clés pertinents pour l'audience cible et le positionnement du business (voir contexte du site dans `landing_pages`/`content_assets`).
2. Classer chaque mot-clé par intention de recherche (info, comparaison, achat) pour éviter de créer un contenu qui ne correspond pas à ce que l'utilisateur cherche réellement.
3. Évaluer le potentiel (volume estimé, difficulté, alignement avec l'offre) sans inventer de chiffres non vérifiables — signaler clairement une estimation qualitative si aucun outil de volume n'est disponible.
4. Prioriser les mots-clés à fort potentiel et faible concurrence relative pour un site jeune.
5. Transmettre la liste priorisée à `redaction-seo-longue-traine` et à `anticipation-croissance`.
6. Enregistrer les mots-clés retenus dans Supabase (`seo_opportunities`).

## Outils associés

- `dataforseo_keyword_research` (`scripts/dataforseo_keyword_research.js` — pas encore construit dans cette version MVP)
- `semrush_domain_report` (`scripts/semrush_domain_report.js` — pas encore construit dans cette version MVP)
- `supabase_upsert` (`scripts/supabase_upsert.js`)

Si les outils de volume/difficulté ne sont pas encore disponibles, le signaler clairement plutôt que de simuler des chiffres.
