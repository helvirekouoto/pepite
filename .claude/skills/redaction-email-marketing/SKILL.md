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
- Connecteur Gmail (`mcp__claude_ai_Gmail__create_draft`) — créer le brouillon une fois le texte finalisé

## Limite importante : brouillon, pas envoi

Le connecteur Gmail permet de **créer un brouillon** (`create_draft`), pas d'envoyer un email directement — il n'existe aucun outil d'envoi. Le comportement attendu est donc :

1. Rédiger le contenu selon les étapes ci-dessus.
2. Créer le brouillon via `create_draft` (objet, destinataire, corps).
3. Journaliser dans Supabase que le brouillon a été créé et attend un envoi humain (`agent_logs`), sans jamais annoncer que l'email a été « envoyé ».
4. Ne jamais présenter un brouillon comme un email déjà parti.
