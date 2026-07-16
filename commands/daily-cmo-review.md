# daily-cmo-review

Revue marketing quotidienne. Objectif : produire un état des lieux court et actionnable, et exécuter immédiatement toute action simple et évidente.

## Étapes

1. Charger la compétence `analyse-performance`.
2. Analyser GA4 via `fetch_ga4_report` (trafic, sources, pages vues) sur les 7 derniers jours et depuis le début de la fenêtre d'objectif (2 mois, voir `settings/goals.json`).
3. Analyser Search Console si `fetch_gsc_report` est disponible (sinon le signaler et continuer sans).
4. Vérifier les leads CRM via `fetch_crm_leads` si disponible (sinon vérifier la table Supabase `leads` via `supabase_query`).
5. Comparer les résultats cumulés aux objectifs : 100+ visiteurs / 2 mois, 5 leads qualifiés / 2 mois.
6. Identifier 1 à 3 actions prioritaires selon le principe de décision de `CLAUDE.md` (impact, rapidité, simplicité, mesurabilité, réutilisation des apprentissages).
7. Si une action est simple et évidente (ex. corriger une meta description, republier un CTA plus clair), l'exécuter automatiquement via la compétence `publication-automatique`, dans les limites de `settings/approval-policy.json`.
8. Enregistrer le rapport (constats, actions prises, actions proposées) dans Supabase — table `agent_logs`, et mettre à jour `marketing_metrics` avec les chiffres du jour.

## Sortie attendue

Un résumé court (quelques lignes) au format :
- Trafic et leads cumulés vs objectifs.
- 1 à 3 constats clés.
- Actions exécutées automatiquement aujourd'hui (le cas échéant).
- Actions proposées pour la suite, avec impact attendu.
