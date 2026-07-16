---
name: optimisation-technique-nouveau-site
description: Vérifie la performance, l'accessibilité et le SEO technique d'un site avant sa première publication (temps de chargement, sémantique HTML, meta tags, responsive réel). À utiliser juste avant de publier un site nouvellement créé.
---

# Optimisation technique d'un nouveau site

## Déclenchement

À utiliser juste avant la publication d'un site créé via `creation-site-web`, comme dernière vérification avant `publication-automatique`.

## Comportement attendu

1. Vérifier que chaque page a un `<title>` et une meta description uniques et pertinents (pas de duplication, pas de balises vides).
2. Vérifier la sémantique HTML (un seul `<h1>` par page, hiérarchie de titres logique, landmarks `header`/`main`/`footer`).
3. Vérifier qu'aucune dépendance externe lourde n'a été ajoutée sans raison (le gabarit est volontairement sans dépendance).
4. Tester le rendu à largeur mobile étroite (pas seulement desktop réduit) et vérifier l'absence de débordement horizontal.
5. Vérifier les attributs `alt` des images et le contraste des textes sur boutons/CTA.
6. Signaler tout écart au principe de performance avant de publier, plutôt que de publier puis corriger.

## Outils associés

- `github_commit_changes` (`scripts/github_commit_changes.js`)
- `supabase_upsert` (`scripts/supabase_upsert.js`) — journaliser les vérifications effectuées

Cette compétence ne remplace pas `optimisation-conversion`, qui intervient après coup sur un site déjà en ligne avec des données de trafic réelles.
