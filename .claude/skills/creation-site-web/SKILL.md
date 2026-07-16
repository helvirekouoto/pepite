---
name: creation-site-web
description: Conçoit et publie un site web complet à partir d'une idée de business (positionnement, structure des pages, design, contenu, CTA). À utiliser quand aucun site n'existe encore pour le projet, ou qu'un utilisateur donne une idée de business et demande un nouveau site. Une fois le site publié, la boucle de croissance autonome (SEO, contenu, CRO, growth, CRM) prend le relais sans intervention supplémentaire.
---

# Création de site web

## Déclenchement

À utiliser quand :
- un utilisateur donne une idée de business et demande un site ;
- aucun site n'existe encore dans le repo (pas de dossier `site/`) ;
- un site existant doit être entièrement refondu (rare — préférer `optimisation-conversion` pour des ajustements ciblés sur un site déjà en ligne).

## Comportement attendu

1. **Clarifier le positionnement** à partir de l'idée de business : quel problème est résolu, pour qui (ICP), quelle promesse unique, quel ton de marque. Ne pas inventer d'informations factuelles sur l'entreprise (prix, preuves sociales, coordonnées) qui n'ont pas été fournies — utiliser des placeholders explicites (`[À compléter]`) plutôt que d'halluciner.
2. **Définir la structure du site** : au minimum une page d'accueil complète (hero, offre/bénéfices, preuve sociale, CTA, contact/lead capture). Ajouter d'autres pages seulement si l'idée de business le justifie (ex. page tarifs, page à propos, blog pour du contenu SEO).
3. **Partir du gabarit** `site-template/` (voir `README.md` du gabarit) plutôt que de tout écrire depuis zéro. Le gabarit applique déjà les principes de design ci-dessous ; l'adapter au positionnement et à l'identité de marque plutôt que de le réinventer.
4. **Appliquer ces principes de design non négociables** :
   - Une seule proposition de valeur claire, visible sans scroll (above the fold), avec un CTA principal répété à chaque section clé.
   - Hiérarchie visuelle nette (échelle typographique cohérente, un seul poids d'accent), espace blanc généreux — pas de surcharge.
   - Mobile-first, responsive réel (tester en largeur étroite), contrastes conformes accessibilité (WCAG AA minimum).
   - HTML sémantique, CSS pur (variables CSS pour les couleurs/typo), zéro dépendance JS lourde ni framework de build — le site doit rester déployable tel quel (cohérent avec le choix VPS/sans Next.js/Vercel de Pépite lui-même).
   - Performance : images optimisées ou différées, pas de scripts inutiles, temps de chargement minimal.
   - Un formulaire ou point de contact clair pour la génération de leads (aligné avec la table Supabase `leads`).
5. **Rédiger le contenu** en s'appuyant sur la compétence `redaction-contenu-marketing` (copie orientée conversion, pas de remplissage générique) et sur `veille-tendances`/`analyse-performance` si des mots-clés ou intentions de recherche sont déjà connus.
6. **Publier** via la compétence `publication-automatique` : `github_create_branch` → écrire les fichiers du site sous `site/` → `github_commit_changes` → `github_open_pr_or_push` (mode `direct_push` par défaut, voir `settings/approval-policy.json`).
7. **Journaliser** dans Supabase : la structure et les pages créées dans `landing_pages`, le contenu rédigé dans `content_assets`, un résumé de l'action dans `agent_logs`.
8. **Déclencher la suite en autonomie** : une fois le site publié, activer immédiatement — sans attendre une nouvelle demande — les sous-agents SEO, Contenu, Growth, CRM et Analytics Performance pour démarrer la boucle de croissance standard décrite dans `CLAUDE.md` (analyser, prioriser, créer, publier, mesurer, apprendre, recommencer).

## Outils associés

- `github_create_branch` (`scripts/github_create_branch.js`)
- `github_commit_changes` (`scripts/github_commit_changes.js`)
- `github_open_pr_or_push` (`scripts/github_open_pr_or_push.js`)
- `supabase_upsert` (`scripts/supabase_upsert.js`)
- Gabarit de départ : `site-template/`

## Ce que cette compétence ne fait pas

- Elle ne remplace pas `optimisation-conversion` (ajustements ciblés sur un site déjà en ligne et déjà mesuré).
- Elle n'invente pas de contenu factuel sur l'entreprise : toute information manquante doit être demandée à l'utilisateur ou signalée comme placeholder, jamais inventée.
