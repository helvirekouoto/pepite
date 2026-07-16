---
name: veille-tendances
description: Détecte les tendances marché, SEO, contenu et concurrents, et les transforme en angles de contenu ou de campagne exploitables. À utiliser avant de choisir un sujet de contenu, de lancer une expérience de croissance, ou lors de la revue de croissance hebdomadaire.
---

# Veille tendances

## Déclenchement

À utiliser quand Pépite doit détecter tendances marché, SEO, contenu, concurrents ou mots-clés.

## Comportement attendu

1. Identifier les sujets émergents pertinents pour l'audience cible.
2. Analyser les tendances SEO et intentions de recherche.
3. Observer les concurrents et domaines similaires.
4. Transformer les tendances en angles de contenu ou campagnes concrets.
5. Prioriser les tendances selon leur potentiel de trafic et de conversion.
6. Enregistrer les tendances utiles dans Supabase (table `seo_opportunities` ou `growth_experiments` selon le cas).

## Outils associés

- `dataforseo_keyword_research` (`scripts/dataforseo_keyword_research.js` — pas encore construit dans cette version MVP)
- `semrush_domain_report` (`scripts/semrush_domain_report.js` — pas encore construit dans cette version MVP)
- `web_trend_search` (`scripts/web_trend_search.js` — pas encore construit dans cette version MVP ; en attendant, utiliser une recherche web générale si disponible dans l'environnement)
- `supabase_upsert` (`scripts/supabase_upsert.js`)

Si un outil listé n'existe pas encore dans `scripts/`, le signaler clairement plutôt que de simuler un résultat.
