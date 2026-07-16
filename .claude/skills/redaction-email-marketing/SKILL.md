---
name: redaction-email-marketing
description: Rédige des emails et séquences (bienvenue, nurturing, relance de lead) orientés conversion, adaptés au ton de marque. À utiliser quand un lead doit être relancé ou qu'une séquence email doit être créée, en coordination avec le sous-agent CRM.
---

# Rédaction email marketing

## Déclenchement

À utiliser quand `crm-agent` (via `nurturing-relances-leads`) identifie un besoin de relance email, ou lors de la mise en place d'une séquence de bienvenue pour de nouveaux leads.

## Comportement attendu

1. Clarifier l'objectif de l'email (bienvenue, relance, nurturing, réactivation) avant de rédiger.
2. Rédiger un objet clair et non trompeur, cohérent avec le contenu réel du message.
3. Un seul CTA principal par email, aligné avec l'étape du parcours du lead.
4. Adapter le ton à la marque (`CLAUDE.md`) sans jargon générique de template email.
5. Ne jamais inventer une donnée personnalisée (nom, historique) non présente dans les données CRM/Supabase disponibles.
6. Sauvegarder le contenu dans Supabase (`content_assets`), lié au lead concerné si applicable (`leads`).

## Outils associés

- `supabase_query` (`scripts/supabase_query.js`) — récupérer les données réelles du lead
- `supabase_upsert` (`scripts/supabase_upsert.js`)

L'envoi effectif dépend de l'outil CRM/email configuré (`fetch_crm_leads` / intégration email — pas encore construits dans cette version MVP) ; le signaler si l'envoi automatisé n'est pas encore possible.
