---
name: redaction-reseaux-sociaux
description: Rédige des posts courts adaptés aux codes de chaque plateforme sociale, à partir des angles identifiés par la veille. À utiliser après `veille-reseaux-sociaux` ou lors de la publication du calendrier de contenu hebdomadaire.
---

# Rédaction réseaux sociaux

## Déclenchement

À utiliser après `veille-reseaux-sociaux`, ou selon la cadence définie dans `settings/content-calendar.json`.

## Comportement attendu

1. Adapter le format et le ton au code de la plateforme visée (pas un simple copier-coller d'un article long).
2. Aller droit à l'accroche : la première ligne doit donner envie de lire la suite.
3. Un message clair par post — ne pas empiler plusieurs idées.
4. Inclure un CTA ou une invitation à l'engagement cohérente avec l'objectif (trafic, notoriété, leads).
5. Rester fidèle aux faits établis sur l'entreprise — ne jamais inventer un chiffre ou un résultat non vérifié pour rendre le post plus percutant.
6. Sauvegarder dans Supabase (`content_assets`).

## Outils associés

- `supabase_upsert` (`scripts/supabase_upsert.js`)

La publication effective sur les plateformes sociales dépend d'une intégration dédiée non encore construite dans cette version MVP — le signaler si demandé.
