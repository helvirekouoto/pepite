---
name: journalisation-donnees-supabase
description: Garantit que chaque action significative de Pépite (décision, publication, analyse) est effectivement enregistrée dans la bonne table Supabase, avec des données cohérentes. À utiliser en fin de tâche, comme dernière vérification avant de considérer une action terminée.
---

# Journalisation des données Supabase

## Déclenchement

À utiliser à la fin de toute action significative — publication, décision de croissance, analyse de performance, mise à jour de lead — avant de considérer la tâche terminée.

## Comportement attendu

1. Vérifier que l'action a bien été enregistrée dans la table Supabase appropriée (`marketing_metrics`, `seo_opportunities`, `content_assets`, `landing_pages`, `growth_experiments`, `agent_logs`, `leads`).
2. Vérifier qu'aucun doublon n'est créé quand une mise à jour suffisait.
3. S'assurer que les champs enregistrés reflètent des données réelles, jamais une valeur inventée pour « remplir » un champ obligatoire.
4. Toujours journaliser un résumé de l'action dans `agent_logs`, même si elle a aussi sa table dédiée.
5. Signaler explicitement si l'écriture Supabase a échoué, plutôt que de considérer la tâche terminée silencieusement.

## Outils associés

- `supabase_query` / `supabase_upsert` (`scripts/supabase_query.js`, `scripts/supabase_upsert.js`)

Cette compétence est une discipline transverse : elle s'applique après n'importe quelle autre compétence qui produit une action ou une décision.
