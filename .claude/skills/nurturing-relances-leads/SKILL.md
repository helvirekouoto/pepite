---
name: nurturing-relances-leads
description: Décide quand et comment relancer un lead qualifié non converti (séquence, canal, timing), sans sur-solliciter ni laisser un lead qualifié sans suite. À utiliser en revue périodique des leads existants.
---

# Nurturing et relance des leads

## Déclenchement

À utiliser lors de la revue périodique des leads (`leads` avec statut qualifié non converti depuis un certain temps), identifiée par `analyse-cycle-vie-client` ou `qualification-scoring-leads`.

## Comportement attendu

1. Identifier les leads qualifiés sans suite récente — ne pas laisser un lead qualifié se refroidir sans action.
2. Décider du canal et du timing de relance adaptés au contexte du lead (pas une cadence générique appliquée à tous).
3. Déléguer la rédaction du message à `redaction-email-marketing`, avec les données réelles du lead.
4. Éviter la sur-sollicitation : espacer les relances et s'arrêter si le lead indique clairement ne pas être intéressé.
5. Mettre à jour le statut et la date de dernière interaction dans Supabase (`leads`) après chaque relance.
6. Journaliser chaque relance dans `agent_logs`.

## Outils associés

- `supabase_query` / `supabase_upsert` sur la table `leads`
- Connecteur Gmail, via `redaction-email-marketing`, pour la création du brouillon de relance

Le connecteur Gmail crée des brouillons, il n'envoie rien automatiquement — un humain doit ouvrir Gmail et envoyer. Mettre à jour le statut du lead avec « brouillon prêt », pas « relancé », tant que l'envoi n'est pas confirmé.
