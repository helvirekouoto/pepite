---
name: architecture-information-site
description: Définit la structure des pages et l'arborescence d'un site (sitemap, hiérarchie de navigation, pages nécessaires vs superflues) à partir d'un positionnement de business. À utiliser avant de commencer le design visuel, une fois le positionnement clarifié par `creation-site-web`.
---

# Architecture de l'information du site

## Déclenchement

À utiliser après avoir clarifié le positionnement (compétence `creation-site-web`), avant d'écrire le HTML/CSS — pour décider quelles pages créer et comment les relier.

## Comportement attendu

1. Déterminer les pages strictement nécessaires pour l'objectif du site (au minimum : accueil complet ; ajouter tarifs, à propos, blog ou études de cas seulement si le business model le justifie — ne pas multiplier les pages sans raison).
2. Définir la hiérarchie de navigation (menu principal, footer, liens internes) en priorisant le chemin vers le CTA principal.
3. Prévoir l'emplacement des points de capture de lead (formulaire, CTA) sur chaque page selon son rôle dans le tunnel.
4. Anticiper la structure SEO de base (une intention de recherche principale par page, pas de cannibalisation entre pages).
5. Documenter l'arborescence retenue avant de passer à `design-systeme-visuel` et à la rédaction.

## Outils associés

- `supabase_upsert` (`scripts/supabase_upsert.js`) — pour consigner la structure retenue dans `landing_pages`.

Cette compétence ne rédige pas le contenu ni ne code le design — voir `redaction-contenu-marketing` et `design-systeme-visuel`.
