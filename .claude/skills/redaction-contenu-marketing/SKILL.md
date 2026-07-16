---
name: redaction-contenu-marketing
description: Rédige ou améliore des contenus marketing orientés SEO et conversion (articles, landing pages, sections de page, emails, posts). À utiliser dès qu'un contenu doit être écrit ou réécrit, après avoir identifié un sujet via l'analyse de performance ou la veille de tendances.
---

# Rédaction contenu marketing

## Déclenchement

À utiliser quand Pépite doit rédiger ou améliorer un contenu marketing.

## Comportement attendu

1. Rédiger des contenus orientés SEO et conversion, jamais du remplissage.
2. Produire articles, landing pages, sections de page, emails ou posts selon le besoin.
3. Adapter le ton à la marque (créatif, direct, orienté impact business — voir `CLAUDE.md`).
4. Intégrer les mots-clés et tendances identifiés par les compétences `analyse-performance` et `veille-tendances`.
5. Structurer le contenu avec titres clairs, CTA et promesse explicite.
6. Sauvegarder brouillons, versions et contenus publiés dans Supabase (table `content_assets`).

## Outils associés

- `supabase_upsert` (`scripts/supabase_upsert.js`)

La publication effective du contenu (GitHub, CMS) relève de la compétence `publication-automatique`, pas de celle-ci.
