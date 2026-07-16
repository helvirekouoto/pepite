# Gabarit de site — Pépite

Base de départ pour toute création de site à partir d'une idée de business (compétence `creation-site-web`). HTML sémantique + CSS pur, zéro dépendance, zéro étape de build — déployable tel quel sur n'importe quel hébergement statique.

## Comment l'utiliser

1. Copier `index.html` et `styles.css` dans `site/` à la racine du repo (pas dans `site-template/` — ce dossier reste le gabarit de référence, jamais modifié directement).
2. Remplacer chaque `[placeholder entre crochets]` par du contenu réel. Ne jamais inventer un chiffre, un témoignage ou une coordonnée non fournie — laisser le placeholder ou demander l'information plutôt que d'halluciner.
3. Adapter l'identité visuelle dans les variables CSS en haut de `styles.css` (`--color-accent`, `--font-sans`, etc.) selon la marque — ne pas casser le système d'espacement/hiérarchie qui garantit un design propre.
4. Ajouter des pages supplémentaires seulement si l'idée de business le justifie (ex. tarifs, à propos, blog SEO), en réutilisant les mêmes classes CSS pour rester cohérent.
5. Publier via `github_create_branch` → `github_commit_changes` → `github_open_pr_or_push` (voir compétence `publication-automatique`).

## Principes déjà appliqués (à ne pas régresser)

- Une seule proposition de valeur visible sans scroll, CTA principal répété.
- Mobile-first, responsive réel, contrastes accessibles (AA), `prefers-color-scheme` géré.
- Aucune dépendance JS/CSS externe, aucun build — juste des fichiers statiques.
- Formulaire de contact structuré (labels liés, champs requis) pour la génération de leads.
