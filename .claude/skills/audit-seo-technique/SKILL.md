---
name: audit-seo-technique
description: Audite la santé technique SEO d'un site (indexabilité, structure des URLs, balisage, vitesse, données structurées) et liste les corrections prioritaires. À utiliser en revue périodique ou quand le trafic organique stagne malgré du contenu publié.
---

# Audit SEO technique

## Déclenchement

À utiliser lors d'une revue SEO périodique, ou quand `analyse-performance` détecte un trafic organique stagnant malgré des publications régulières.

## Comportement attendu

1. Vérifier l'indexabilité (robots.txt, meta robots, sitemap présent et à jour).
2. Vérifier la structure des URLs (lisible, cohérente, sans paramètres inutiles).
3. Vérifier le balisage on-page (titres, meta descriptions, hiérarchie de titres, balises canoniques) page par page.
4. Vérifier la présence de données structurées pertinentes (schema.org) si applicable au type de business.
5. Vérifier les signaux de vitesse/Core Web Vitals via les données disponibles (GA4, ou à défaut inspection manuelle).
6. Prioriser les corrections par impact probable sur le ranking, et les transmettre à `marketing-ops-agent` pour exécution.
7. Enregistrer les constats dans Supabase (`seo_opportunities`).

## Outils associés

- `fetch_ga4_report` (`scripts/fetch_ga4_report.js`)
- `fetch_gsc_report` (`scripts/fetch_gsc_report.js` — pas encore construit dans cette version MVP, le signaler si absent)
- `supabase_upsert` (`scripts/supabase_upsert.js`)

Cette compétence couvre le technique, pas la recherche de mots-clés (`recherche-mots-cles-intention`) ni la rédaction (`redaction-seo-longue-traine`).
